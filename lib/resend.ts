import { Resend } from 'resend';

// Dynamically handle missing keys for non-blocking local dev as authorized by user
const hasKey = !!process.env.RESEND_API_KEY;
export const resend = hasKey ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEmail(to: string, subject: string, message: string, replyTo: string) {
  if (!resend) {
    console.warn('[DEV] RESEND_API_KEY missing. Stubbing email dispatch logic:', { to, subject, message });
    return { success: true, dummy: true };
  }

  try {
    const data = await resend.emails.send({
      // "from" domain must be validated inside the Resend dashboard!
      from: 'Ayman Portfolio <onboarding@resend.dev>', 
      to: [to],
      subject: subject,
      reply_to: replyTo,
      text: message,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Core routing layout error sending email:', error);
    return { success: false, error };
  }
}
