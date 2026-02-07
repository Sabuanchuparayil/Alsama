import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const bookingSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(1),
  serviceType: z.string().min(1),
  vehicleId: z.string().optional().nullable(),
  date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime()) && parsed >= new Date();
  }, {
    message: "Invalid date or date must be in the future",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format (use HH:MM)",
  }),
  pickupLocation: z.string().min(1),
  destination: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const booking = await prisma.booking.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        serviceType: data.serviceType,
        vehicleId: data.vehicleId || null,
        date: new Date(data.date),
        time: data.time,
        pickupLocation: data.pickupLocation,
        destination: data.destination || null,
        message: data.message || null,
        status: 'pending',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
