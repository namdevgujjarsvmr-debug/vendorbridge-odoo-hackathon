import pg from "pg";

const { Pool } = pg;

let pool;
let schemaReady;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined,
    });
  }

  return pool;
}

export async function ensureAuthSchema() {
  if (!schemaReady) {
    schemaReady = initAuthSchema();
  }

  return schemaReady;
}

async function initAuthSchema() {
  const db = getPool();

  await db.query(`
    create extension if not exists pgcrypto;

    create table if not exists app_users (
      id uuid primary key default gen_random_uuid(),
      name text not null,
      email text not null unique,
      password_hash text not null,
      role text not null default 'Procurement Lead',
      company text not null default 'SupplySaathi',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );
  `);

  const seedEmail = process.env.AUTH_SEED_EMAIL ?? "admin@supplysaathi.in";
  const seedPassword = process.env.AUTH_SEED_PASSWORD ?? "SupplySaathi@123";

  await db.query(
    `
      insert into app_users (name, email, password_hash, role, company)
      values (
        'Priya Mehta',
        $1,
        crypt($2, gen_salt('bf', 10)),
        'Procurement Lead',
        'SupplySaathi'
      )
      on conflict (email) do nothing;
    `,
    [seedEmail.toLowerCase(), seedPassword],
  );
}
