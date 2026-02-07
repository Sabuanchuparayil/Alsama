import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const heroSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  buttonText: z.string().optional().default('EXPLORE OUR FLEET'),
  buttonLink: z.string().optional().default('/fleet'),
  backgroundImageUrl: z.string().url().optional().nullable(),
  overlayOpacity: z.number().min(0).max(1).optional().default(0.4),
  isActive: z.boolean().optional().default(true),
  enableCarousel: z.boolean().optional().default(false),
  carouselInterval: z.number().int().min(1000).max(30000).optional().default(5000),
  carouselImages: z.array(z.string().url()).optional().default([]),
});

export async function GET(request: NextRequest) {
  try {
    const hero = await prisma.heroContent.findFirst({
      select: {
        id: true,
        title: true,
        subtitle: true,
        buttonText: true,
        buttonLink: true,
        backgroundImageUrl: true,
        overlayOpacity: true,
        isActive: true,
        enableCarousel: true,
        carouselInterval: true,
        carouselImages: true,
      },
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' },
    });

    // Return default if no hero content exists
    if (!hero) {
      return NextResponse.json({
        title: 'Experience Dubai in Unmatched Luxury',
        subtitle: 'Your journey to elegance begins here. Premium chauffeur services and exclusive vehicle rentals tailored for you.',
        buttonText: 'EXPLORE OUR FLEET',
        buttonLink: '/fleet',
        backgroundImageUrl: null,
        overlayOpacity: 0.4,
        isActive: true,
        enableCarousel: false,
        carouselInterval: 5000,
        carouselImages: [],
      });
    }

    // Ensure buttonLink and buttonText are never null/undefined
    const safeHero = {
      ...hero,
      buttonLink: hero.buttonLink || '/fleet',
      buttonText: hero.buttonText || 'EXPLORE OUR FLEET',
    };

    const response = NextResponse.json(safeHero);
    // Cache for 5 minutes, revalidate in background
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return response;
  } catch (error) {
    // Return default hero content if database error (e.g., table doesn't exist yet)
    return NextResponse.json({
      title: 'Experience Dubai in Unmatched Luxury',
      subtitle: 'Your journey to elegance begins here. Premium chauffeur services and exclusive vehicle rentals tailored for you.',
      buttonText: 'EXPLORE OUR FLEET',
      buttonLink: '/fleet',
      backgroundImageUrl: null,
      overlayOpacity: 0.4,
      isActive: true,
      enableCarousel: false,
      carouselInterval: 5000,
      carouselImages: [],
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = heroSchema.parse(body);

    // Deactivate all existing hero content
    await prisma.heroContent.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Create new hero content
    const hero = await prisma.heroContent.create({
      data,
    });

    return NextResponse.json(hero, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create hero content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = heroSchema.partial().parse(body);

    // Get current active hero
    const currentHero = await prisma.heroContent.findFirst({
      where: { isActive: true },
    });

    if (!currentHero) {
      return NextResponse.json({ error: 'No active hero content found' }, { status: 404 });
    }

    const hero = await prisma.heroContent.update({
      where: { id: currentHero.id },
      data,
    });

    return NextResponse.json(hero);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 });
  }
}
