import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class RecentPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getRecent(@Query('limit') limit?: string) {
    return this.postsService.getRecentPosts(limit ? parseInt(limit, 10) : 20);
  }
}