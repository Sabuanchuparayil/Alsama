import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

const fleetTypeSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fleetType = await prisma.fleetType.findUnique({
      where: { id: params.id },
    });

    if (!fleetType) {
      return NextResponse.json({ error: 'Fleet type not found' }, { status: 404 });
    }

    return NextResponse.json(fleetType);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fleet type' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = fleetTypeSchema.parse(body);

    // If name is being updated, check for duplicates
    if (data.name) {
      const existing = await prisma.fleetType.findFirst({
        where: {
          name: data.name,
          id: { not: params.id },
        },
      });

      if (existing) {
        return NextResponse.json({ error: 'Fleet type with this name already exists' }, { status: 400 });
      }
    }

    const fleetType = await prisma.fleetType.update({
      where: { id: params.id },
      data,
    });

    const response = NextResponse.json(fleetType);
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Fleet type not found' }, { status: 404 });
    }
    console.error('Update fleet type error:', error);
    return NextResponse.json({ error: 'Failed to update fleet type' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if any vehicles are using this fleet type
    const vehiclesCount = await prisma.vehicle.count({
      where: {
        category: {
          in: await prisma.fleetType.findUnique({
            where: { id: params.id },
            select: { name: true },
          }).then(ft => ft ? [ft.name] : []),
        },
      },
    });

    if (vehiclesCount > 0) {
      return NextResponse.json({ 
        error: `Cannot delete fleet type. ${vehiclesCount} vehicle(s) are using this type. Please reassign or delete those vehicles first.` 
      }, { status: 400 });
    }

    await prisma.fleetType.delete({
      where: { id: params.id },
    });

    const response = NextResponse.json({ message: 'Fleet type deleted' });
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    return response;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Fleet type not found' }, { status: 404 });
    }
    console.error('Delete fleet type error:', error);
    return NextResponse.json({ error: 'Failed to delete fleet type' }, { status: 500 });
  }
}
