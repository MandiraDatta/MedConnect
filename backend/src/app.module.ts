import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorLoginModule } from './doctorLogin/doctorLogin.module';
import { ReportModule } from './reports/report.module';
import { SymptomModule } from './symptom/symptom.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    DoctorModule,
    DoctorLoginModule,
    ReportModule,
    SymptomModule,
    AiModule, // ✅ Gemini / AI correctly registered here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
