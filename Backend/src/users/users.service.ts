import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        username: this.normalizeUsername(data.username),
      },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany({
      select: { id: true, username: true, role: true, avatar: true, createdAt: true },
      orderBy: { id: 'asc' },
    });
  }

  getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateUser(id: number, data: Prisma.UserUpdateInput) {
    const normalizedData =
      typeof data.username === 'string'
        ? { ...data, username: this.normalizeUsername(data.username) }
        : data;

    return this.prisma.user.update({ where: { id }, data: normalizedData });
  }

  removeUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  getUserByName(username: string) {
    return this.prisma.user.findUnique({
      where: { username: this.normalizeUsername(username) },
    });
  }

  private normalizeUsername(username: string) {
    return username.trim().toLowerCase();
  }
}
