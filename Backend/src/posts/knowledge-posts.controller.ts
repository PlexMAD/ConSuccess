import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { postAttachmentUploadOptions } from 'src/utils/multer';
import { PostsService } from './posts.service';

@Controller('knowledge-posts')
export class KnowledgePostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(@Query('limit') limit?: string) {
    return this.postsService.getKnowledgePosts(limit ? Number(limit) : 20);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5, postAttachmentUploadOptions))
  create(
    @Body() body: { title: string; body: string },
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: { user: { id: number } },
  ) {
    const attachmentUrls = (files ?? []).map((f) => `/uploads/${f.filename}`);
    return this.postsService.createKnowledgePost(
      req.user.id,
      body.title,
      body.body,
      attachmentUrls,
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
}
