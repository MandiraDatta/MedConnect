import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  // ✅ Create a new report for logged-in doctor
  async createReport(
    doctorId: number,
    data: {
      title: string;
      description?: string;
    },
  ) {
    return this.prisma.report.create({
      data: {
        title: data.title,
        description: data.description,
        doctorId,
      },
    });
  }

  // ✅ Get all reports of logged-in doctor
  async getReportsByDoctor(doctorId: number) {
    return this.prisma.report.findMany({
      where: { doctorId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ✅ Count total reports of logged-in doctor
  async countReportsByDoctor(doctorId: number) {
    return this.prisma.report.count({
      where: { doctorId },
    });
  }

  // ✅ Get single report (ownership check)
  async getReportById(id: number, doctorId: number) {
    return this.prisma.report.findFirst({
      where: {
        id,
        doctorId,
      },
    });
  }

  // ✅ Delete report (only own reports)
  async deleteReport(id: number, doctorId: number) {
    return this.prisma.report.deleteMany({
      where: {
        id,
        doctorId,
      },
    });
  }
}
