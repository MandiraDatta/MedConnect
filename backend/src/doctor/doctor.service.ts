import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async syncDoctor(data: { email: string; name?: string }) {
    // Check if already exists
    const existing = await this.prisma.doctor.findUnique({
      where: { email: data.email },
    });

    if (existing) return existing;

    // Create new doctor profile
    return this.prisma.doctor.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });
  }
}
