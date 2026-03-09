import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { username: string; password: string }) {
    if (!signInDto || !signInDto.username || !signInDto.password) {
      throw new BadRequestException('No credentials provided');
    }
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() signInDto: { username: string; password: string }) {
    if (!signInDto || !signInDto.username || !signInDto.password) {
      throw new BadRequestException('No credentials provided');
    }
    return this.authService.register(signInDto.username, signInDto.password);
  }
}
