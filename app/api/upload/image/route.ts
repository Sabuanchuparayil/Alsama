import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { v2 as cloudinary } from 'cloudinary';
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

    // Configure Cloudinary if credentials are provided
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64}`;

      try {
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: 'alsama',
          resource_type: 'image',
          transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        });

        // Save to media table
        const media = await prisma.media.create({
          data: {
            url: result.secure_url,
            filename: result.public_id,
            type: 'image',
          },
        });

        return NextResponse.json({ url: result.secure_url, id: media.id });
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return NextResponse.json({ error: 'Failed to upload image to Cloudinary' }, { status: 500 });
      }
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
      error: 'Image storage not configured. Please set Cloudinary environment variables.',
      hint: 'Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to Railway variables. Sign up for free at https://cloudinary.com',
      setupGuide: 'See IMAGE_STORAGE_SETUP.md for detailed instructions.',
    }, { status: 500 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
