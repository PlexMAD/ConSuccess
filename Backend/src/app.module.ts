import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UniversitiesController } from './controllers/universities.controller';
import { UsersController } from './controllers/users.controller';
import { AuthModule } from './modules/auth.module';
import { PrismaModule } from './prisma.module';
import { UniversitiesService } from './services/universities.service';
import { UsersService } from './services/users.service';

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
