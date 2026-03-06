import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UniversitiesService {
  constructor(private readonly prisma: PrismaService) {}

  createUniversity(data: Prisma.UniversityCreateInput) {
    return this.prisma.university.create({ data });
  }

  getAllUniversities() {
    return this.prisma.university.findMany();
  }

  getUniversity(id: number) {
    return this.prisma.university.findUnique({ where: { id } });
  }

  updateUniversity(id: number, data: Prisma.UserUpdateInput) {
    return this.prisma.university.update({ where: { id }, data });
  }
}
