import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
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
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
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
}
