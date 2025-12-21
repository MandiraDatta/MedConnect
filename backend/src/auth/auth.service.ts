import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { supabase } from '../supabase/supabase.client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // 1) Email + Password Login
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    const user = data.user;

    // check if doctor exists in Prisma
    const existing = await this.prisma.doctor.findUnique({
      where: { email: user.email! },
    });

    if (existing) return existing;

    // create doctor if not found
    return this.prisma.doctor.create({
      data: {
        email: user.email!,
        name: user.user_metadata.full_name ?? '',
        profileImage: user.user_metadata.avatar_url ?? '',
      },
    });
  }

  // 2) Keep your Google Auth logic as-is
  async googleAuth(user: any) {
    const existing = await this.prisma.doctor.findUnique({
      where: { email: user.email },
    });

    if (existing) return existing;

    return this.prisma.doctor.create({
      data: {
        email: user.email,
        name: user.name,
        profileImage: user.image,
      },
    });
  }
}

