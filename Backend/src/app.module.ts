import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UniversitiesController } from './universities/universities.controller';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { UniversitiesService } from './universities/universities.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UsersController, UniversitiesController],
  providers: [UsersService, UniversitiesService],
})
export class AppModule {}
