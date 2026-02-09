import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')).transform(val => val === '' ? null : val),
  features: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        imageUrl: true,
        features: true,
        isActive: true,
      },
      where: {
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    const response = NextResponse.json(services);
    // Reduced cache time to 1 minute for faster updates
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    return response;
  } catch (error) {
    // Return empty array on database error for frontend compatibility
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
    const data = serviceSchema.parse(body);

    const service = await prisma.service.create({
      data,
    });

    const response = NextResponse.json(service, { status: 201 });
    // Clear cache by setting no-cache headers
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Create service error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
