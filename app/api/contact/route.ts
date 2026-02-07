import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // If Resend is configured, send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'noreply@alsama.ae',
          to: process.env.CONTACT_EMAIL || 'info@alsama.ae',
          subject: `[AL SAMA Contact] ${data.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send contact email:', emailError);
        // Don't fail the request if email sending fails
      }
    }

    // Log the contact submission for reference
    console.log('📧 Contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'Thank you for your message. We will get back to you shortly!' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}
