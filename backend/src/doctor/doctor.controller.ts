import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}
   @Get('me')
  getMyProfile(@Req() req) {
    return this.doctorService.getDoctorById(req.user.id);
  }

  @Post('sync')
  syncDoctor(@Body() body: { email: string; name?: string }) {
    return this.doctorService.syncDoctor(body);
  }
}
