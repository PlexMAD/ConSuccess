import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { PrismaModule } from './prisma.module';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}