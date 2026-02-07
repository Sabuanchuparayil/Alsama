import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Use Supabase Storage if configured
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
      );

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'alsama-images';

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      // Save to media table
      const media = await prisma.media.create({
        data: {
          url: publicUrl,
          filename: fileName,
          type: 'image',
        },
      });

      return NextResponse.json({ url: publicUrl, id: media.id });
    }

    // Fallback: Save to local public directory (for development/testing)
    // In production, you should use Supabase, AWS S3, Cloudinary, or similar
    if (process.env.NODE_ENV === 'development') {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      try {
        const publicDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(publicDir, { recursive: true });
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = path.join(publicDir, fileName);
        
        const arrayBuffer = await file.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(arrayBuffer));
        
        const publicUrl = `/uploads/${fileName}`;
        
        // Save to media table
        const media = await prisma.media.create({
          data: {
            url: publicUrl,
            filename: fileName,
            type: 'image',
          },
        });
        
        return NextResponse.json({ url: publicUrl, id: media.id });
      } catch (fsError) {
        console.error('Local file save error:', fsError);
      }
    }
    
    // Production fallback: Return error with helpful message
    return NextResponse.json({
      error: 'Image storage not configured. Please set SUPABASE_URL and SUPABASE_KEY environment variables, or use a cloud storage service like AWS S3, Cloudinary, or similar.',
      hint: 'For Railway deployment, configure Supabase Storage or add a cloud storage service.',
    }, { status: 500 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
