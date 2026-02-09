import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const fleetTypeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const fleetTypes = await prisma.fleetType.findMany({
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    });
    
    const response = NextResponse.json(fleetTypes);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return response;
  } catch (error) {
    console.error('Get fleet types error:', error);
    return NextResponse.json({ error: 'Failed to fetch fleet types' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = fleetTypeSchema.parse(body);

    // Check if name already exists
    const existing = await prisma.fleetType.findUnique({
      where: { name: data.name },
    });

    if (existing) {
      return NextResponse.json({ error: 'Fleet type with this name already exists' }, { status: 400 });
    }

    const fleetType = await prisma.fleetType.create({
      data,
    });

    const response = NextResponse.json(fleetType, { status: 201 });
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Create fleet type error:', error);
    return NextResponse.json({ error: 'Failed to create fleet type' }, { status: 500 });
  }
}
