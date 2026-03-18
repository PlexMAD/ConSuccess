import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';
import { PrismaModule } from './prisma.module';
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
  controllers: [UsersController, UniversitiesController, CitiesController],
  providers: [UsersService, UniversitiesService, CitiesService],
})
export class AppModule {}
