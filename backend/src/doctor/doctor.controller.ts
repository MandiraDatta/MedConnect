import { Controller, Post, Body } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post('sync')
  syncDoctor(@Body() body: { loginId: number; email: string; name?: string }) {
    return this.doctorService.syncDoctor(body);
  }
}
