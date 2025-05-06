import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';  // Import AuthService
import { UnauthorizedException } from '@nestjs/common';  // Import UnauthorizedException
import { LoginDto } from 'src/users/dtos/login.dto';

@Controller('auth')  // Đặt đường dẫn chung cho các route của Auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Đăng nhập và trả về access_token
  @Post('sign-in')
  async signIn(@Body() body:LoginDto) {
    const { FullName, Password } = body;
    return await this.authService.signIn(FullName, Password);

  }
}
