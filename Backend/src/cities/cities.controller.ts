import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getAll() {
    return this.citiesService.getAllCities();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body('name') name: string) {
    return this.citiesService.createCity(name);
  }
}
