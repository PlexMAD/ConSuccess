import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SubjectsService } from './subjects.service';

@Controller('universities/:universityId/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  getByUniversity(@Param('universityId', ParseIntPipe) universityId: number) {
    return this.subjectsService.getSubjectsByUniversity(universityId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Param('universityId', ParseIntPipe) universityId: number,
    @Body() body: { name: string },
  ) {
    return this.subjectsService.createSubject(universityId, body.name);
  }
}
