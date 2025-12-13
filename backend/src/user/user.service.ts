import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { email: string; name?: string; supabaseId: string }) {
    return this.prisma.user.create({ data });
  }

  async findBySupabaseId(id: string) {
    return this.prisma.user.findUnique({
      where: { supabaseId: id },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async createNormalUser(data: { email: string; password: string }) {
  return this.prisma.user.create({
    data: {
      email: data.email,
      password: data.password,   // You can hash later
    }
  });
}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(id: number, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}

