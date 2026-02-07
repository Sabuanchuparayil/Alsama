import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status ? { status } : {};

    const bookings = await prisma.booking.findMany({
      where,
      select: {
        id: true,
        customerName: true,
        customerEmail: true,
        customerPhone: true,
        serviceType: true,
        date: true,
        time: true,
        pickupLocation: true,
        destination: true,
        message: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        vehicle: {
          select: {
            id: true,
            name: true,
            category: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
