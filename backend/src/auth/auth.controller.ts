import { Controller, Post, Body,Get,Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  googleLogin(@Body() body: any) {
    return this.authService.googleAuth(body);
  }

  @Post('login')
login(@Body() body: { email: string; password: string }) {
  return this.authService.login(body.email, body.password);
}

@Get('me')
getMe(@Req() req) {
  return req.user; // comes from JWT/session
}


}

