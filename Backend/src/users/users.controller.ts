import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma, Role } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() req: { user: { role: string } }) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
    return this.usersService.getAllUsers();
  }

  @Patch(':id/role')
  @UseGuards(AuthGuard)
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { role: Role },
    @Req() req: { user: { role: string } },
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
    return this.usersService.updateUser(id, { role: body.role });
  }

  @Post()
  create(data: Prisma.UserCreateInput) {
    return this.usersService.createUser(data);
  }

  @Patch(':id/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: { user: { id: number } },
  ) {
    if (req.user.id !== id) {
      throw new ForbiddenException('Cannot update another user\'s avatar');
    }
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    const avatar = `/uploads/${file.filename}`;
    await this.usersService.updateUser(id, { avatar });
    return { avatar };
  }
}
