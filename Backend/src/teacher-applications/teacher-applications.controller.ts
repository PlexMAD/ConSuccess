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
import { AuthGuard } from 'src/auth/auth.guard';
import { imageUploadOptions } from 'src/utils/multer';
import { TeacherApplicationsService } from './teacher-applications.service';

const PRIVILEGED = ['ADMIN', 'MODERATOR'];

type RequestUser = {
  id: number;
  role: string;
};

@Controller('teacher-applications')
@UseGuards(AuthGuard)
export class TeacherApplicationsController {
  constructor(
    private readonly teacherApplicationsService: TeacherApplicationsService,
  ) {}

  @Get()
  getAll(@Req() req: { user: RequestUser }) {
    if (!PRIVILEGED.includes(req.user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return this.teacherApplicationsService.getAllApplications();
  }

  @Get('me')
  getMine(@Req() req: { user: RequestUser }) {
    return this.teacherApplicationsService.getMyApplication(req.user.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('document', imageUploadOptions))
  create(
    @Body() body: { fullName?: string },
    @UploadedFile() file: Express.Multer.File,
    @Req() req: { user: RequestUser },
  ) {
    if (!file) {
      throw new BadRequestException('Загрузите подтверждающий документ');
    }

    return this.teacherApplicationsService.createApplication(
      req.user.id,
      req.user.role,
      body.fullName ?? '',
      `/uploads/${file.filename}`,
    );
  }

  @Patch(':id/approve')
  approve(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: RequestUser },
  ) {
    if (!PRIVILEGED.includes(req.user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return this.teacherApplicationsService.approveApplication(id, req.user.id);
  }
}
