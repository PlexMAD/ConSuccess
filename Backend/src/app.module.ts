import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin/admin.controller';
import { AuthModule } from './auth/auth.module';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { LikesController } from './likes/likes.controller';
import { LikesService } from './likes/likes.service';
import { PrismaModule } from './prisma.module';
import { KnowledgePostsController } from './posts/knowledge-posts.controller';
import { PostsController } from './posts/posts.controller';
import { RecentPostsController } from './posts/recent-posts.controller';
import { PostsService } from './posts/posts.service';
import { SubjectsController } from './subjects/subjects.controller';
import { SubjectsService } from './subjects/subjects.service';
import { TeacherApplicationsController } from './teacher-applications/teacher-applications.controller';
import { TeacherApplicationsService } from './teacher-applications/teacher-applications.service';
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
  controllers: [
    AdminController,
    UsersController,
    UniversitiesController,
    CitiesController,
    SubjectsController,
    PostsController,
    RecentPostsController,
    KnowledgePostsController,
    FavoritesController,
    LikesController,
    TeacherApplicationsController,
  ],
  providers: [
    UsersService,
    UniversitiesService,
    CitiesService,
    SubjectsService,
    PostsService,
    FavoritesService,
    LikesService,
    TeacherApplicationsService,
  ],
})
export class AppModule {}
