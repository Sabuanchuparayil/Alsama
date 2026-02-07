import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

// Route segment config
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const contactInfoSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  whatsapp: z.string().min(1, 'WhatsApp number is required'),
  address: z.string().min(1, 'Address is required'),
});

export async function GET(request: NextRequest) {
  try {
    // Get contact info setting
    // Use findFirst to handle cases where record might not exist yet
    const contactInfo = await prisma.siteSettings.findFirst({
      where: { key: 'contact_info' },
    });

    if (!contactInfo) {
      // Return default values
      return NextResponse.json({
        email: 'info@alsama.ae',
        phone: '+971 4 123 4567',
        whatsapp: '+971 50 123 4567',
        address: 'Dubai, United Arab Emirates',
      });
    }

    const parsedValue = JSON.parse(contactInfo.value);
    
    const response = NextResponse.json(parsedValue);
    // Cache for 1 minute only, to allow quick updates
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    return response;
  } catch (error) {
    console.error('Get site settings error:', error);
    // Return default values on error
    return NextResponse.json({
      email: 'info@alsama.ae',
      phone: '+971 4 123 4567',
      whatsapp: '+971 50 123 4567',
      address: 'Dubai, United Arab Emirates',
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const contactInfo = contactInfoSchema.parse(body);

    // Upsert contact info
    await prisma.siteSettings.upsert({
      where: { key: 'contact_info' },
      update: {
        value: JSON.stringify(contactInfo),
      },
      create: {
        key: 'contact_info',
        value: JSON.stringify(contactInfo),
      },
    });

    return NextResponse.json(contactInfo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Update site settings error:', error);
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
