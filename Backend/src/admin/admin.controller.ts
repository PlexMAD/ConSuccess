import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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

  @Patch('posts/:id/visibility')
  setPostVisibility(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { visible: boolean },
    @Req() req: { user: { role: string } },
  ) {
    if (!PRIVILEGED.includes(req.user.role)) {
      throw new ForbiddenException('Access denied');
    }
    if (typeof body.visible !== 'boolean') {
      throw new BadRequestException('visible must be a boolean');
    }
    return this.postsService.setPostVisibility(id, body.visible);
  }
}
