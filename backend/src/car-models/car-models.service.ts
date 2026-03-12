import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';

@Injectable()
export class CarModelsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.carModel.findMany({
      orderBy: { id: 'asc' },
    });
  }

  create(data: CreateCarModelDto) {
    return this.prisma.carModel.create({ data });
  }
}
