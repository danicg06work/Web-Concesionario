import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CarModelsService } from './car-models.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';

@Controller('car-models')
export class CarModelsController {
  constructor(private readonly carModelsService: CarModelsService) {}

  @Get()
  findAll() {
    return this.carModelsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateCarModelDto) {
    return this.carModelsService.create(data);
  }
}
