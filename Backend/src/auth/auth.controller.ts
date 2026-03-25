import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async me(@Req() req: Request) {
    const { id, username } = req['user'] as { id: number; username: string };
    const user = await this.usersService.getUser(id);
    return { id, username, avatar: user?.avatar ?? null };
  }
}
