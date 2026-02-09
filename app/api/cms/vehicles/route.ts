import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const vehicleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'), // Now accepts any string from fleet types
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')).transform(val => val === '' ? null : val),
  price: z.number().optional().nullable(),
  features: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        imageUrl: true,
        price: true,
        features: true,
        isActive: true,
      },
      where: {
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    const response = NextResponse.json(vehicles);
    // Cache for 5 minutes, revalidate in background
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
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
    const data = vehicleSchema.parse(body);

    const vehicle = await prisma.vehicle.create({
      data,
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Create vehicle error:', error);
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
