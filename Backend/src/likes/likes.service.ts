import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  getLikes(userId: number) {
    return this.prisma.like.findMany({
      where: {
        userId,
        post: {
          visible: true,
          OR: [{ isPrivate: false }, { userId }],
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addLike(userId: number, postId: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
        visible: true,
        OR: [{ isPrivate: false }, { userId }],
      },
      select: { id: true },
    });
    if (!post) throw new NotFoundException('Post not found');

    return this.prisma.like.upsert({
      where: { userId_postId: { userId, postId } },
      update: {},
      create: { userId, postId },
    });
  }

  async removeLike(userId: number, postId: number) {
    await this.prisma.like.deleteMany({
      where: { userId, postId },
    });

    return { userId, postId };
  }
}
