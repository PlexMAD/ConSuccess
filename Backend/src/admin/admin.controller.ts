import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostsService } from 'src/posts/posts.service';

const PRIVILEGED = ['ADMIN', 'MODERATOR'];

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly postsService: PostsService) {}

  @Get('posts')
  getAllPosts(@Req() req: { user: { role: string } }) {
    if (!PRIVILEGED.includes(req.user.role)) {
      throw new ForbiddenException('Access denied');
    }
    return this.postsService.getAllPostsForAdmin();
  }

  @Delete('posts/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number; role: string } },
  ) {
    if (!PRIVILEGED.includes(req.user.role)) {
      throw new ForbiddenException('Access denied');
    }
    return this.postsService.deletePost(id, req.user.id, req.user.role);
  }
}