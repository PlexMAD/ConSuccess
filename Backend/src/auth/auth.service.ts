import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareWithHash, encrypt } from 'src/utils/crypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.getUserByName(username);
    if (!user) {
      throw new BadRequestException('Not found user with given name');
    }
    if (!(await compareWithHash(pass, user.passwordHash))) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, pass: string) {
    const passwordHash = await encrypt(pass);
    const createdUser = await this.usersService.createUser({
      username,
      passwordHash,
    });
    const payload = { id: createdUser.id, username: createdUser.username };

    if (createdUser) {
      return { access_token: await this.jwtService.signAsync(payload) };
    }
  }
}
