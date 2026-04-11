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
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { imageUploadOptions } from 'src/utils/multer';
import { PostsService } from './posts.service';

@Controller('subjects/:subjectId/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getBySubject(@Param('subjectId', ParseIntPipe) subjectId: number) {
    return this.postsService.getPostsBySubject(subjectId);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5, imageUploadOptions))
  create(
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Body() body: { title: string; body: string },
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: { user: { id: number } },
  ) {
    const imageUrls = (files ?? []).map((f) => `/uploads/${f.filename}`);
    return this.postsService.createPost(
      subjectId,
      req.user.id,
      body.title,
      body.body,
      imageUrls,
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5, imageUploadOptions))
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
    const newImageUrls = (files ?? []).map((f) => `/uploads/${f.filename}`);
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
      newImageUrls,
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
