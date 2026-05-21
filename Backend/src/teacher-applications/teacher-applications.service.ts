import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role, TeacherApplicationStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeacherApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  getMyApplication(userId: number) {
    return this.prisma.teacherApplication.findUnique({
      where: { userId },
      include: {
        reviewer: {
          select: { id: true, username: true, role: true },
        },
      },
    });
  }

  getAllApplications() {
    return this.prisma.teacherApplication.findMany({
      include: {
        reviewer: {
          select: { id: true, username: true, role: true },
        },
        user: {
          select: { id: true, username: true, avatar: true, role: true },
        },
      },
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createApplication(
    userId: number,
    userRole: string,
    fullName: string,
    documentUrl: string,
  ) {
    if (userRole !== Role.USER) {
      throw new BadRequestException(
        'Заявку может отправить только обычный пользователь',
      );
    }

    const trimmedFullName = fullName.trim();
    if (!trimmedFullName) {
      throw new BadRequestException('Укажите ФИО');
    }

    const existing = await this.prisma.teacherApplication.findUnique({
      where: { userId },
    });

    if (existing?.status === TeacherApplicationStatus.PENDING) {
      throw new ConflictException('Заявка уже отправлена и ожидает проверки');
    }

    if (existing?.status === TeacherApplicationStatus.APPROVED) {
      throw new ConflictException('Заявка уже одобрена');
    }

    return this.prisma.teacherApplication.create({
      data: {
        userId,
        fullName: trimmedFullName,
        documentUrl,
      },
      include: {
        user: {
          select: { id: true, username: true, avatar: true, role: true },
        },
      },
    });
  }

  async approveApplication(id: number, reviewerId: number) {
    const application = await this.prisma.teacherApplication.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException('Заявка не найдена');
    }

    if (application.status !== TeacherApplicationStatus.PENDING) {
      throw new ConflictException('Заявка уже обработана');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: application.userId },
        data: { role: Role.TEACHER },
      });

      return tx.teacherApplication.update({
        where: { id },
        data: {
          status: TeacherApplicationStatus.APPROVED,
          reviewedAt: new Date(),
          reviewedById: reviewerId,
        },
        include: {
          reviewer: {
            select: { id: true, username: true, role: true },
          },
          user: {
            select: { id: true, username: true, avatar: true, role: true },
          },
        },
      });
    });
  }
}
