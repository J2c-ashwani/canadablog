import { Pool } from 'pg';

let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // You can add additional configuration here if needed, such as SSL:
      // ssl: { rejectUnauthorized: false }
    });
  } catch (err) {
    console.warn('Failed to initialize PostgreSQL pool:', err);
  }
}

export async function query(text: string, params?: any[]) {
  if (!pool) {
    throw new Error('Database pool not initialized. Check DATABASE_URL.');
  }
  return pool.query(text, params);
}

export function getPool() {
  return pool;
}
