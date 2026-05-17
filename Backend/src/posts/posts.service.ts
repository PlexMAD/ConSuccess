import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

type Viewer = {
  id: number;
  role: string;
};

const PRIVILEGED_ROLES = ['ADMIN', 'MODERATOR'];
const DAILY_POST_LIMIT = 10;
const TOTAL_POST_LIMIT = 50;

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  getRecentPosts(limit = 20) {
    return this.prisma.post.findMany({
      where: { visible: true, isPrivate: false },
      include: {
        attachments: true,
        _count: { select: { likes: true } },
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
      orderBy: [{ likes: { _count: 'desc' } }, { createdAt: 'desc' }],
      take: limit,
    });
  }

  getPostsBySubject(subjectId: number) {
    return this.prisma.post.findMany({
      where: {
        subjectId,
        visible: true,
        isPrivate: false,
      },
      include: { attachments: true, _count: { select: { likes: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  getPrivatePostsBySubject(subjectId: number, userId: number) {
    return this.prisma.post.findMany({
      where: {
        subjectId,
        userId,
        visible: true,
        isPrivate: true,
      },
      include: { attachments: true, _count: { select: { likes: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPostById(id: number, viewer?: Viewer | null) {
    const post = await this.prisma.post.findFirst({
      where: { id, visible: true },
      include: {
        attachments: true,
        _count: { select: { likes: true } },
        user: { select: { id: true, username: true, avatar: true } },
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    if (
      post.isPrivate &&
      post.userId !== viewer?.id &&
      !PRIVILEGED_ROLES.includes(viewer?.role ?? '')
    ) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  getAllPostsForAdmin() {
    return this.prisma.post.findMany({
      include: {
        attachments: true,
        _count: { select: { likes: true } },
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
      orderBy: [{ visible: 'desc' }, { createdAt: 'desc' }],
    });
  }

  getKnowledgePosts(limit = 20) {
    return this.prisma.post.findMany({
      where: { subjectId: null, visible: true, isPrivate: false },
      include: {
        attachments: true,
        _count: { select: { likes: true } },
        user: { select: { id: true, username: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async createPost(
    subjectId: number,
    userId: number,
    title: string,
    body: string,
    attachmentUrls: string[],
    isPrivate = false,
  ) {
    await this.ensureDailyPostLimit(userId);

    return this.prisma.post.create({
      data: {
        title,
        body,
        isPrivate,
        subjectId,
        userId,
        attachments: {
          create: attachmentUrls.map((url) => ({ url })),
        },
      },
      include: { attachments: true, _count: { select: { likes: true } } },
    });
  }

  async createKnowledgePost(
    userId: number,
    title: string,
    body: string,
    attachmentUrls: string[],
    isPrivate = false,
  ) {
    await this.ensureDailyPostLimit(userId);

    return this.prisma.post.create({
      data: {
        title,
        body,
        isPrivate,
        userId,
        attachments: {
          create: attachmentUrls.map((url) => ({ url })),
        },
      },
      include: { attachments: true, _count: { select: { likes: true } } },
    });
  }

  async updatePost(
    id: number,
    userId: number,
    userRole: string,
    title: string,
    body: string,
    keepAttachmentIds: number[],
    newAttachmentUrls: string[],
    isPrivate?: boolean,
  ) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post || !post.visible) throw new NotFoundException('Post not found');
    if (post.userId !== userId && !['ADMIN', 'MODERATOR'].includes(userRole)) throw new ForbiddenException('Access denied');

    await this.prisma.attachment.deleteMany({
      where: { postId: id, id: { notIn: keepAttachmentIds } },
    });

    return this.prisma.post.update({
      where: { id },
      data: {
        title,
        body,
        ...(typeof isPrivate === 'boolean' ? { isPrivate } : {}),
        attachments: {
          create: newAttachmentUrls.map((url) => ({ url })),
        },
      },
      include: { attachments: true, _count: { select: { likes: true } } },
    });
  }

  async deletePost(id: number, userId: number, userRole: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post || !post.visible) throw new NotFoundException('Post not found');
    if (post.userId !== userId && !['ADMIN', 'MODERATOR'].includes(userRole)) throw new ForbiddenException('Access denied');

    return this.prisma.post.update({
      where: { id },
      data: { visible: false },
    });
  }

  async setPostPrivacy(
    subjectId: number,
    id: number,
    userId: number,
    isPrivate: boolean,
  ) {
    const post = await this.prisma.post.findFirst({ where: { id, subjectId } });
    if (!post || !post.visible) throw new NotFoundException('Post not found');
    if (post.userId !== userId) throw new ForbiddenException('Access denied');

    return this.prisma.post.update({
      where: { id },
      data: { isPrivate },
      include: {
        attachments: true,
        _count: { select: { likes: true } },
        user: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async setPostVisibility(id: number, visible: boolean) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    return this.prisma.post.update({
      where: { id },
      data: { visible },
      include: {
        attachments: true,
        _count: { select: { likes: true } },
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
    });
  }

  private async ensureDailyPostLimit(userId: number) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const postsToday = await this.prisma.post.count({
      where: {
        userId,
        createdAt: { gte: startOfDay },
      },
    });

    if (postsToday >= DAILY_POST_LIMIT) {
      throw new ForbiddenException(
        `Можно добавить не больше ${DAILY_POST_LIMIT} постов в день`,
      );
    }

    const totalPosts = await this.prisma.post.count({
      where: { userId },
    });

    if (totalPosts >= TOTAL_POST_LIMIT) {
      throw new ForbiddenException(
        `Можно добавить не больше ${TOTAL_POST_LIMIT} постов всего`,
      );
    }
  }
}
