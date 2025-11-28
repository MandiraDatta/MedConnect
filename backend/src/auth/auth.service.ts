import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async googleAuth(user: any) {
    const existing = await this.prisma.doctor.findUnique({
      where: { email: user.email }
    });

    if (existing) return existing;

    return this.prisma.doctor.create({
      data: {
        email: user.email,
        name: user.name,
        profileImage: user.image
      }
    });
  }
}
