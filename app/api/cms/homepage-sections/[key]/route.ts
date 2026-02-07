import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const sectionSchema = z.object({
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  buttonText: z.string().optional().nullable(),
  buttonLink: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const section = await prisma.homepageSection.findUnique({
      where: { sectionKey: params.key },
    });

    if (!section) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }

    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch section' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = sectionSchema.parse(body);

    // Use upsert to create or update
    const section = await prisma.homepageSection.upsert({
      where: { sectionKey: params.key },
      update: data,
      create: {
        sectionKey: params.key,
        ...data,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.homepageSection.delete({
      where: { sectionKey: params.key },
    });

    return NextResponse.json({ message: 'Section deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
  }
}
