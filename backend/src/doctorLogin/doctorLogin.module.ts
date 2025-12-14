import { Module } from '@nestjs/common';
import { DoctorLoginService } from './doctorLogin.service';
import { DoctorLoginController } from './doctorLogin.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DoctorLoginController],
  providers: [DoctorLoginService],
  exports: [DoctorLoginService],
})
export class DoctorLoginModule {}
