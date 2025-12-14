import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorLoginModule } from './doctorLogin/doctorLogin.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, DoctorModule, DoctorLoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
