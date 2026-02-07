import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const sectionSchema = z.object({
  sectionKey: z.string().min(1),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  buttonText: z.string().optional().nullable(),
  buttonLink: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  order: z.number().optional().default(0),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';

    const sections = await prisma.homepageSection.findMany({
      select: {
        id: true,
        sectionKey: true,
        title: true,
        description: true,
        buttonText: true,
        buttonLink: true,
        isActive: true,
        order: true,
      },
      where: showAll ? {} : { isActive: true },
      orderBy: { order: 'asc' },
    });
    
    const response = NextResponse.json(sections);
    // Cache for 5 minutes, revalidate in background
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return response;
  } catch (error) {
    // Return empty array instead of error object to prevent frontend errors
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = sectionSchema.parse(body);

    const section = await prisma.homepageSection.create({
      data,
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}
