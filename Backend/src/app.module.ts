import { Module } from '@nestjs/common';
import { UniversitiesController } from './controllers/universities.controller';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from './prisma.module';
import { UniversitiesService } from './services/universities.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, UniversitiesController],
  providers: [UsersService, UniversitiesService],
})
export class AppModule {}
