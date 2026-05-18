import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  getFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
        post: {
          visible: true,
          OR: [{ isPrivate: false }, { userId: userId }],
        },
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            subjectId: true,
            isPrivate: true,
            user: { select: { role: true } },
            subject: { select: { id: true, universityId: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addFavorite(userId: number, postId: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
        visible: true,
        OR: [{ isPrivate: false }, { userId: userId }],
      },
      select: { id: true },
    });
    if (!post) throw new NotFoundException('Post not found');

    return this.prisma.favorite.create({ data: { userId, postId } });
  }

  removeFavorite(userId: number, postId: number) {
    return this.prisma.favorite.delete({
      where: { userId_postId: { userId, postId } },
    });
  }
}
