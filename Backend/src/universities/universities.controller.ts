import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UniversitiesService } from 'src/universities/universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universityService: UniversitiesService) {}
  @Get()
  getAll() {
    return this.universityService.getAllUniversities();
  }

  @Post()
  create(@Body() data: Prisma.UniversityCreateInput) {
    return this.universityService.createUniversity(data);
  }
}
