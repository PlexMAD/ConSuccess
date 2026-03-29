import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UniversitiesService {
  constructor(private readonly prisma: PrismaService) {}

  createUniversity(name: string, cityId: number, avatar?: string) {
    return this.prisma.university.create({
      data: { name, cityId, ...(avatar && { avatar }) },
      include: { city: true },
    });
  }

  getAllUniversities() {
    return this.prisma.university.findMany({ include: { city: true } });
  }

  getUniversity(id: number) {
    return this.prisma.university.findUnique({ where: { id }, include: { city: true } });
  }

  updateUniversity(id: number, data: Prisma.UniversityUpdateInput) {
    return this.prisma.university.update({ where: { id }, data });
  }
}
