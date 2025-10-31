import { NextResponse } from 'next/server';
import { getAllWaitlistEntries } from '@/lib/db';

export async function GET() {
  try {
    const entries = await getAllWaitlistEntries();
    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}
