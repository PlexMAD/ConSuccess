import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateUser(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  removeUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  getUserByName(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
