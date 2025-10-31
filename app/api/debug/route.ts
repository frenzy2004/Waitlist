import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    hasPostgresUrl: !!process.env.POSTGRES_URL,
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
  };

  return NextResponse.json({
    status: 'ok',
    environment: envVars,
    message: 'Debug endpoint working'
  });
}
