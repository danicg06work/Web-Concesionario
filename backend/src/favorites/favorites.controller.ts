import { Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import type { JwtPayload } from '../auth/auth.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  list(@CurrentUser() user: JwtPayload) {
    return this.favoritesService.listByUser(user.sub);
  }

  @Post(':carModelId')
  add(
    @CurrentUser() user: JwtPayload,
    @Param('carModelId', ParseIntPipe) carModelId: number,
  ) {
    return this.favoritesService.add(user.sub, carModelId);
  }

  @Delete(':carModelId')
  remove(
    @CurrentUser() user: JwtPayload,
    @Param('carModelId', ParseIntPipe) carModelId: number,
  ) {
    return this.favoritesService.remove(user.sub, carModelId);
  }
}
