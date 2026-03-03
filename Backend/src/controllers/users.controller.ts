import { Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Post()
  create(data: Prisma.UserCreateInput) {
    return this.usersService.createUser(data);
  }
}
