import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with this email, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    // Delete any existing tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, used: false },
    });

    // Create new reset token
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // Generate reset URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/admin/reset-password?token=${token}`;

    // Send email if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'AL SAMA <noreply@alsama.ae>',
          to: user.email,
          subject: 'Reset Your Password - AL SAMA',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #DC143C;">Reset Your Password</h2>
              <p>You requested to reset your password for your AL SAMA admin account.</p>
              <p>Click the button below to reset your password:</p>
              <a href="${resetUrl}" style="display: inline-block; background-color: #DC143C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
                Reset Password
              </a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #666;">${resetUrl}</p>
              <p style="color: #999; font-size: 12px; margin-top: 30px;">
                This link will expire in 1 hour. If you didn't request this, please ignore this email.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
        // Continue even if email fails - return the token for manual reset
      }
    }

    // Return success (don't expose if user exists)
    return NextResponse.json({
      message: 'If an account exists with this email, a password reset link has been sent.',
      // In development, return the token for testing
      ...(process.env.NODE_ENV === 'development' && { token, resetUrl }),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
