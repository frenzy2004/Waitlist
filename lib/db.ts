import { sql } from '@vercel/postgres';

export interface WaitlistEntry {
  id: number;
  email: string;
  name: string | null;
  created_at: Date;
}

export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

export async function addToWaitlist(email: string, name?: string) {
  try {
    await sql`
      INSERT INTO waitlist (email, name)
      VALUES (${email}, ${name || null})
    `;
    return { success: true };
  } catch (error: any) {
    if (error.code === '23505') {
      // Unique constraint violation
      return { success: false, error: 'Email already registered' };
    }
    console.error('Error adding to waitlist:', error);
    return { success: false, error: 'Failed to add to waitlist' };
  }
}

export async function getWaitlistCount() {
  try {
    const result = await sql`SELECT COUNT(*) as count FROM waitlist`;
    return parseInt(result.rows[0].count, 10);
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return 0;
  }
}

export async function getAllWaitlistEntries() {
  try {
    const result = await sql<WaitlistEntry>`
      SELECT id, email, name, created_at
      FROM waitlist
      ORDER BY created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting waitlist entries:', error);
    return [];
  }
}
