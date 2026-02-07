import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const pageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  metaTitle: z.string().optional().nullable(),
  metaDesc: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = pageSchema.parse(body);

    const page = await prisma.page.create({
      data,
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
