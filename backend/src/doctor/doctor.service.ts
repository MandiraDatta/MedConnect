import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async syncDoctor(data: { email: string; name?: string }) {
    const existing = await this.prisma.doctor.findUnique({
      where: { email: data.email },
    });

    if (existing) return existing;

    return this.prisma.doctor.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });
  }

  // 🔥 ADD BELOW (DO NOT MODIFY ABOVE)
  async getDoctorById(id: number) {
    return this.prisma.doctor.findUnique({
      where: { id },
    });
  }

  async updateDoctor(
    id: number,
    data: {
      name?: string;
      experience?: number;
      specialization?: string;
      bio?: string;
      profileImage?: string;
    },
  ) {
    return this.prisma.doctor.update({
      where: { id },
      data,
    });
  }
  async getRating(doctorId: number) {
  return this.prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { rating: true },
  });
}
async getExperience(doctorId: number) {
  return this.prisma.doctor.findUnique({
    where: { id: doctorId },
    select: { experience: true },
  });
}

}

