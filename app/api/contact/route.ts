import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
    if (!recipient) {
      console.warn('CONTACT_RECIPIENT_EMAIL is missing in environment variables. Falling back to stub.');
    }

    const compiledMessage = `
    New Cinematic Narrative Form Submission:
    
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Message:
    ${message}
    
    ---
    Reply directly to this email chain to communicate with ${name}.
    `;

    const result = await sendEmail(
      recipient || 'aymanaqeelvk@gmail.com',
      `[Narrative] ${subject} — from ${name}`,
      compiledMessage,
      email
    );

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
