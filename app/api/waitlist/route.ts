import { NextRequest, NextResponse } from 'next/server';
import { addToWaitlist, getWaitlistCount } from '@/lib/db';
import { sendWaitlistNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Add to waitlist
    const result = await addToWaitlist(email, name);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Get updated count
    const count = await getWaitlistCount();

    // Send email notification (don't wait for it)
    sendWaitlistNotification(email, name, count).catch(console.error);

    return NextResponse.json({
      success: true,
      count,
      message: 'Successfully joined the waitlist!'
    });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await getWaitlistCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Get count error:', error);
    return NextResponse.json(
      { error: 'Failed to get count' },
      { status: 500 }
    );
  }
}
