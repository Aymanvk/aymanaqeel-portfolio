import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
    if (!recipient) {
      console.warn('CONTACT_RECIPIENT_EMAIL is missing in environment variables. Falling back to stub.');
    }

    const compiledMessage = `
    New Message Received Form Submission:
    
    Email: ${email}
    Message:
    ${message}
    
    ---
    Reply directly to this email chain to communicate with the prospect.
    `;

    const result = await sendEmail(
      recipient || 'fallback@example.com',
      `[Portfolio] Inquiry from ${email}`,
      compiledMessage,
      email
    );

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to route transaction' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal configuration error' }, { status: 500 });
  }
}
