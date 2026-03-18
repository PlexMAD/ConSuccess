import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UniversitiesService } from 'src/universities/universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universityService: UniversitiesService) {}

  @Get()
  getAll() {
    return this.universityService.getAllUniversities();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: { name: string; cityId: number }) {
    return this.universityService.createUniversity(body.name, body.cityId);
  }
}
