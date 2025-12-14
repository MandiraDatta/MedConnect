import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorLoginService {
  constructor(private prisma: PrismaService) {}

  // -------------------------------
  // EMAIL SIGNUP
  // -------------------------------
  async createNormalDoctorLogin(data: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.doctorLogin.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  // -------------------------------
  // EMAIL LOGIN ✅
  // -------------------------------
  async login(email: string, password: string) {
    const doctor = await this.prisma.doctorLogin.findUnique({
      where: { email },
    });

    if (!doctor || !doctor.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // update last login
    await this.prisma.doctorLogin.update({
      where: { id: doctor.id },
      data: { lastLoginAt: new Date() },
    });

    return doctor;
  }

  // -------------------------------
  // SUPABASE METHODS (UNCHANGED)
  // -------------------------------
  async createDoctorLogin(data: any) {
    return this.prisma.doctorLogin.create({ data });
  }

  async findBySupabaseId(id: string) {
    return this.prisma.doctorLogin.findUnique({
      where: { supabaseId: id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.doctorLogin.findUnique({
      where: { email },
    });
  }

  async updateDoctorLogin(id: number, data: any) {
    return this.prisma.doctorLogin.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    return this.prisma.doctorLogin.findMany();
  }
}

