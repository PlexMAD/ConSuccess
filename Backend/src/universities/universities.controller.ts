import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { imageUploadOptions } from 'src/utils/multer';
import { UniversitiesService } from 'src/universities/universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universityService: UniversitiesService) {}

  @Get()
  getAll() {
    return this.universityService.getAllUniversities();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.universityService.getUniversity(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('logo', imageUploadOptions))
  create(
    @Body() body: { name: string; cityId: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const avatar = file ? `/uploads/${file.filename}` : undefined;
    return this.universityService.createUniversity(body.name, Number(body.cityId), avatar);
  }
}
