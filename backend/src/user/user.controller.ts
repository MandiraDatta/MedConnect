import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // -----------------------------------------
  // 🔥 CHANGE #1 — Add normal signup route
  // -----------------------------------------
  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    return this.userService.createNormalUser(body);
  }

  // -----------------------------------------
  // 🔥 CHANGE #2 — Keep Supabase register route
  // -----------------------------------------
  @Post('register')
  async register(@Body() body: { email: string; name?: string; supabaseId: string }) {
    console.log('Received register request:', body); // 🔍 Debug Log
    const exists = await this.userService.findBySupabaseId(body.supabaseId);
    
    if (exists) {
      console.log('User already exists:', exists); // 🔍 Debug Log
      return { message: 'User already exists', user: exists };
    }

    console.log('Creating new user...'); // 🔍 Debug Log
    
    // Check if user exists by email
    const existingEmail = await this.userService.findByEmail(body.email);
    if (existingEmail) {
      console.log('User with email already exists. Linking Supabase ID...');
      return this.userService.updateUser(existingEmail.id, { supabaseId: body.supabaseId });
    }

    return this.userService.createUser(body);
  }

  @Get()
  async allUsers() {
    return this.userService.findAll();
  }
}



