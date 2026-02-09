import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedFleetTypes() {
  console.log('🌱 Seeding fleet types...');

  const defaultTypes = [
    { name: 'SUV', description: 'Sport Utility Vehicles', order: 0, isActive: true },
    { name: 'Sedan', description: 'Luxury Sedans', order: 1, isActive: true },
    { name: 'Sports', description: 'Sports Cars', order: 2, isActive: true },
  ];

  for (const type of defaultTypes) {
    try {
      await prisma.fleetType.upsert({
        where: { name: type.name },
        update: type,
        create: type,
      });
      console.log(`✅ Seeded fleet type: ${type.name}`);
    } catch (error) {
      console.error(`❌ Error seeding ${type.name}:`, error);
    }
  }

  console.log('✨ Fleet types seeding completed!');
}

seedFleetTypes()
  .catch((error) => {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
