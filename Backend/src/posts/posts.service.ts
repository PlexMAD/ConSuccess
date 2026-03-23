import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  getPostsBySubject(subjectId: number) {
    return this.prisma.post.findMany({
      where: { subjectId },
      include: { attachments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  getPostById(id: number) {
    return this.prisma.post.findUniqueOrThrow({
      where: { id },
      include: { attachments: true },
    });
  }

  createPost(
    subjectId: number,
    userId: number,
    title: string,
    body: string,
    imageUrls: string[],
  ) {
    return this.prisma.post.create({
      data: {
        title,
        body,
        subjectId,
        userId,
        attachments: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
      include: { attachments: true },
    });
  }
}
