import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() req: { user: { id: number } }) {
    return this.likesService.getLikes(req.user.id);
  }

  @Post(':postId')
  @UseGuards(AuthGuard)
  add(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.likesService.addLike(req.user.id, postId);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.likesService.removeLike(req.user.id, postId);
  }
}
