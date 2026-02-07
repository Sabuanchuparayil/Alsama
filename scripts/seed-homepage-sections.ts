import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedHomepageSections() {
  const sections = [
    {
      sectionKey: 'luxury-choice',
      title: 'Luxury Choice',
      description: 'Choose from our wide range of luxury vehicles for your next trip.',
      buttonText: 'Book Now',
      buttonLink: '/book',
      isActive: true,
      order: 0,
    },
    {
      sectionKey: 'fleet-preview',
      title: 'Our Fleet',
      description: 'Explore our premium collection of luxury vehicles',
      buttonText: 'View All Vehicles',
      buttonLink: '/fleet',
      isActive: true,
      order: 1,
    },
    {
      sectionKey: 'services-preview',
      title: 'Our Services',
      description: 'Premium transportation solutions for every occasion',
      buttonText: 'View All Services',
      buttonLink: '/services',
      isActive: true,
      order: 2,
    },
  ];

  try {
    for (const section of sections) {
      await prisma.homepageSection.upsert({
        where: { sectionKey: section.sectionKey },
        update: section,
        create: section,
      });
      console.log(`✅ ${section.sectionKey} section seeded`);
    }

    console.log('\n✅ All homepage sections seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding sections:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedHomepageSections();
