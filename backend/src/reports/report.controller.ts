import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // ✅ Create report
  @Post()
  createReport(
    @Req() req,
    @Body()
    body: {
      title: string;
      description?: string;
    },
  ) {
    return this.reportService.createReport(req.user.id, body);
  }

  // ✅ Get all reports for logged-in doctor
  @Get()
  getMyReports(@Req() req) {
    return this.reportService.getReportsByDoctor(req.user.id);
  }

  // ✅ Count reports (dashboard card)
  @Get('count')
  getMyReportCount(@Req() req) {
    return this.reportService.countReportsByDoctor(req.user.id);
  }

  // ✅ Get single report
  @Get(':id')
  getReport(
    @Req() req,
    @Param('id') id: string,
  ) {
    return this.reportService.getReportById(Number(id), req.user.id);
  }

  // ✅ Delete report
  @Delete(':id')
  deleteReport(
    @Req() req,
    @Param('id') id: string,
  ) {
    return this.reportService.deleteReport(Number(id), req.user.id);
  }
}
