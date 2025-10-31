import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendWaitlistNotification(
  email: string,
  name: string | undefined,
  totalCount: number
) {
  try {
    if (!resend) {
      console.warn('Resend API key not configured, skipping email notification');
      return { success: false, error: 'Email service not configured' };
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'frenzyman2024@gmail.com';

    await resend.emails.send({
      from: 'BizLocate Waitlist <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Waitlist Signup - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">🎉 New Waitlist Signup!</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${name ? `<p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Total Signups:</strong> ${totalCount}</p>
            <p style="margin: 10px 0; color: #6b7280;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This email was sent from your BizLocate waitlist form.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
