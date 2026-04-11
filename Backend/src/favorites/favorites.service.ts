import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  getFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId, post: { visible: true } },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            subjectId: true,
            subject: { select: { id: true, universityId: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  addFavorite(userId: number, postId: number) {
    return this.prisma.favorite.create({ data: { userId, postId } });
  }

  removeFavorite(userId: number, postId: number) {
    return this.prisma.favorite.delete({
      where: { userId_postId: { userId, postId } },
    });
  }
}
