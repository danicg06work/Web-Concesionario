import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.carModel.createMany({
    data: [
      {
        name: '750S',
        category: 'Supercar',
        powerLabel: '750hp',
        powerHp: 750,
        imageUrl: 'https://website-images.mclaren.com/2554/mclaren-side-models-menu-750s.png',
        description: 'La referencia en rendimiento puro.',
      },
      {
        name: 'Artura Spider',
        category: 'Hybrid',
        powerLabel: '700hp',
        powerHp: 700,
        imageUrl: 'https://website-images.mclaren.com/3219/mclaren-side-models-menu-artura-spider.jpg',
        description: 'La emoción de la conducción a cielo abierto.',
      },
      {
        name: 'GTS',
        category: 'GT',
        powerLabel: '635hp',
        powerHp: 635,
        imageUrl: 'https://website-images.mclaren.com/2555/mclaren-side-models-menu-gts.png',
        description: 'Superdeportivo usable a diario.',
      },
      {
        name: 'MCLAREN W1',
        category: 'Ultimate',
        powerLabel: '1300hp',
        powerHp: 1300,
        imageUrl: 'https://website-images.mclaren.com/2556/mclaren-side-models-menu-w1.jpg',
        description: 'De lo virtual a la realidad.',
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
