import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  getSubjectsByUniversity(universityId: number) {
    return this.prisma.subject.findMany({ where: { universityId } });
  }

  createSubject(universityId: number, name: string) {
    return this.prisma.subject.create({ data: { name, universityId } });
  }
}
