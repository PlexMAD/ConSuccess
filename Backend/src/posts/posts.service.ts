import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  getRecentPosts(limit = 20) {
    return this.prisma.post.findMany({
      where: { visible: true },
      include: {
        attachments: true,
        user: { select: { id: true, username: true, avatar: true } },
        subject: {
          select: {
            id: true,
            universityId: true,
            name: true,
            university: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  getPostsBySubject(subjectId: number) {
    return this.prisma.post.findMany({
      where: { subjectId, visible: true },
      include: { attachments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPostById(id: number) {
    const post = await this.prisma.post.findFirst({
      where: { id, visible: true },
      include: {
        attachments: true,
        user: { select: { id: true, username: true, avatar: true } },
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  getKnowledgePosts(limit = 20) {
    return this.prisma.post.findMany({
      where: { subjectId: null, visible: true },
      include: {
        attachments: true,
        user: { select: { id: true, username: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
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

  createKnowledgePost(
    userId: number,
    title: string,
    body: string,
    imageUrls: string[],
  ) {
    return this.prisma.post.create({
      data: {
        title,
        body,
        userId,
        attachments: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
      include: { attachments: true },
    });
  }

  async updatePost(
    id: number,
    userId: number,
    title: string,
    body: string,
    keepAttachmentIds: number[],
    newImageUrls: string[],
  ) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post || !post.visible) throw new NotFoundException('Post not found');
    if (post.userId !== userId) throw new ForbiddenException('Access denied');

    await this.prisma.attachment.deleteMany({
      where: { postId: id, id: { notIn: keepAttachmentIds } },
    });

    return this.prisma.post.update({
      where: { id },
      data: {
        title,
        body,
        attachments: {
          create: newImageUrls.map((url) => ({ url })),
        },
      },
      include: { attachments: true },
    });
  }

  async deletePost(id: number, userId: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post || !post.visible) throw new NotFoundException('Post not found');
    if (post.userId !== userId) throw new ForbiddenException('Access denied');

    return this.prisma.post.update({
      where: { id },
      data: { visible: false },
    });
  }
}
