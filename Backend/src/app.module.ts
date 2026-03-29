import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { PrismaModule } from './prisma.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { SubjectsController } from './subjects/subjects.controller';
import { SubjectsService } from './subjects/subjects.service';
import { UniversitiesController } from './universities/universities.controller';
import { UniversitiesService } from './universities/universities.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UsersController, UniversitiesController, CitiesController, SubjectsController, PostsController, FavoritesController],
  providers: [UsersService, UniversitiesService, CitiesService, SubjectsService, PostsService, FavoritesService],
})
export class AppModule {}
