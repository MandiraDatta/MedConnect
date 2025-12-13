import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async syncDoctor(data: { loginId: number; email: string; name?: string }) {
    // Check if already exists
    const existing = await this.prisma.doctor.findUnique({
      where: { doctorloginId: data.loginId },
    });

    if (existing) return existing;

    // Create new doctor profile
    return this.prisma.doctor.create({
      data: {
        doctorloginId: data.loginId,
        email: data.email,
        name: data.name,
      },
    });
  }
}
