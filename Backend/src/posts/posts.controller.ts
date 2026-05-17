import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { postAttachmentUploadOptions } from 'src/utils/multer';
import { PostsService } from './posts.service';

type Viewer = {
  id: number;
  role: string;
};

@Controller('subjects/:subjectId/posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getBySubject(@Param('subjectId', ParseIntPipe) subjectId: number) {
    return this.postsService.getPostsBySubject(subjectId);
  }

  @Get('private')
  @UseGuards(AuthGuard)
  getPrivateBySubject(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.postsService.getPrivatePostsBySubject(subjectId, req.user.id);
  }

  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { headers: { authorization?: string } },
  ) {
    const viewer = await this.getOptionalViewer(req);
    return this.postsService.getPostById(id, viewer);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5, postAttachmentUploadOptions))
  create(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Body() body: { title: string; body: string; isPrivate?: string },
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: { user: { id: number } },
  ) {
    const attachmentUrls = (files ?? []).map((f) => `/uploads/${f.filename}`);
    return this.postsService.createPost(
      subjectId,
      req.user.id,
      body.title,
      body.body,
      attachmentUrls,
      body.isPrivate === 'true',
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5, postAttachmentUploadOptions))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      title: string;
      body: string;
      isPrivate?: string;
      keepAttachmentIds?: string | string[];
    },
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: { user: { id: number; role: string } },
  ) {
    const newAttachmentUrls = (files ?? []).map((f) => `/uploads/${f.filename}`);
    const raw = body.keepAttachmentIds;
    const keepIds = Array.isArray(raw)
      ? raw.map(Number)
      : raw
        ? [Number(raw)]
        : [];
    return this.postsService.updatePost(
      id,
      req.user.id,
      req.user.role,
      body.title,
      body.body,
      keepIds,
      newAttachmentUrls,
      body.isPrivate === undefined ? undefined : body.isPrivate === 'true',
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number; role: string } },
  ) {
    return this.postsService.deletePost(id, req.user.id, req.user.role);
  }

  private async getOptionalViewer(req: {
    headers: { authorization?: string };
  }): Promise<Viewer | null> {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) return null;

    try {
      const payload = await this.jwtService.verifyAsync<Viewer>(token);
      return { id: payload.id, role: payload.role };
    } catch {
      return null;
    }
  }
}
