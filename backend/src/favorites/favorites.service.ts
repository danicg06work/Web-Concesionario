import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async listByUser(userId: number) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: { carModel: true },
      orderBy: { createdAt: 'desc' },
    });

    return favorites.map((favorite) => favorite.carModel);
  }

  async add(userId: number, carModelId: number) {
    const model = await this.prisma.carModel.findUnique({ where: { id: carModelId } });

    if (!model) {
      throw new NotFoundException('Modelo no encontrado');
    }

    await this.prisma.favorite.upsert({
      where: {
        userId_carModelId: {
          userId,
          carModelId,
        },
      },
      update: {},
      create: {
        userId,
        carModelId,
      },
    });

    return this.listByUser(userId);
  }

  async remove(userId: number, carModelId: number) {
    await this.prisma.favorite.deleteMany({
      where: {
        userId,
        carModelId,
      },
    });

    return this.listByUser(userId);
  }
}
