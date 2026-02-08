import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { DoctorLoginService } from './doctorLogin.service';

@Controller('doctor-login')
export class DoctorLoginController {
  constructor(private doctorLoginService: DoctorLoginService) {}

  // -----------------------------------------
  // 🔥 CHANGE #1 — Add normal signup route
  // -----------------------------------------
  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    try {
      console.log('Signup request received:', body); // Debug log
      const doctor = await this.doctorLoginService.createNormalDoctorLogin(body);
      console.log('Doctor saved to DB:', doctor); // Debug log
      return { message: 'Signup successful', doctor };
    } catch (error) {
      console.error('Error saving doctor:', error);
      return { message: 'Signup failed', error: error.message };
    }
  }


  @Post('login')
async login(@Body() body: { email: string; password: string }) {
  const doctor = await this.doctorLoginService.login(body.email, body.password);
  return { message: 'Login successful', doctor };
}

  // -----------------------------------------
  // 🔥 CHANGE #2 — Keep Supabase register route
  // -----------------------------------------
  @Post('register')
  async register(@Body() body: { 
    email: string; 
    name?: string; 
    supabaseId: string;
    profileImage?: string; // For syncing to Doctor table later, but not for DoctorLogin
    //phone?: string;
  }) {
    console.log('Received register request:', body);
    const exists = await this.doctorLoginService.findBySupabaseId(body.supabaseId);
    
    if (exists) {
      console.log('Doctor login already exists, updating last login...');
      const updated = await this.doctorLoginService.updateDoctorLogin(exists.id, {
        name: body.name || exists.name,
        //phone: body.phone || exists.phone,
        lastLoginAt: new Date(),
      });
      return { message: 'Doctor login updated', doctor: updated };
    }

    console.log('Creating new doctor login...');
    
    const existingEmail = await this.doctorLoginService.findByEmail(body.email);
    if (existingEmail) {
      console.log('Doctor with email already exists. Linking Supabase ID...');
      return this.doctorLoginService.updateDoctorLogin(existingEmail.id, { 
        supabaseId: body.supabaseId,
        name: body.name || existingEmail.name,
        //phone: body.phone || existingEmail.phone,
        lastLoginAt: new Date(),
      });
    }

    // Sanitize body: remove profileImage because it's not in the DoctorLogin schema
    const { profileImage, ...loginData } = body;

    return this.doctorLoginService.createDoctorLogin({
      ...loginData,
      lastLoginAt: new Date(),
    });
  }

  @Get()
  async allDoctorLogins() {
    return this.doctorLoginService.findAll();
  }

  @Get('me/:supabaseId')
  async getDoctorBySupabaseId(@Param('supabaseId') supabaseId: string) {
    const doctor = await this.doctorLoginService.findBySupabaseId(supabaseId);
    if (!doctor) {
      return { error: 'Doctor not found' };
    }
    return doctor;
  }

  @Put('me/:supabaseId')
  async updateDoctorProfile(
    @Param('supabaseId') supabaseId: string,
    @Body() body: { name?: string; phone?: string; profileImage?: string }
  ) {
    const doctor = await this.doctorLoginService.findBySupabaseId(supabaseId);
    if (!doctor) {
      return { error: 'Doctor not found' };
    }
    
    return this.doctorLoginService.updateDoctorLogin(doctor.id, body);
  }
}



