import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() req: { user: { id: number } }) {
    return this.favoritesService.getFavorites(req.user.id);
  }

  @Post(':postId')
  @UseGuards(AuthGuard)
  add(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.favoritesService.addFavorite(req.user.id, postId);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  remove(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.favoritesService.removeFavorite(req.user.id, postId);
  }
}
