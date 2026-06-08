import { createServerFn } from "@tanstack/react-start";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { ensureAuthSchema, getPool } from "../db.server";

const devUser = {
  id: "dev-supplysaathi-user",
  name: "Priya Mehta",
  email: "admin@supplysaathi.in",
  role: "Procurement Lead",
  company: "SupplySaathi",
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().default(false),
});

function canUseDevAuth() {
  return process.env.NODE_ENV !== "production" && process.env.DISABLE_DEV_AUTH !== "true";
}

function signSession(user, rememberMe) {
  const expiresIn = rememberMe ? "30d" : "8h";
  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      company: user.company,
    },
    process.env.JWT_SECRET ?? "dev-supplysaathi-change-me",
    { expiresIn, issuer: "supplysaathi" },
  );

  return {
    ok: true,
    token,
    expiresIn,
    user,
    message: "Signed in successfully.",
  };
}

function tryDevLogin(email, password, rememberMe) {
  const seedEmail = (process.env.AUTH_SEED_EMAIL ?? devUser.email).toLowerCase();
  const seedPassword = process.env.AUTH_SEED_PASSWORD ?? "SupplySaathi@123";

  if (canUseDevAuth() && email === seedEmail && password === seedPassword) {
    return signSession({ ...devUser, email: seedEmail }, rememberMe);
  }

  return null;
}

export const loginUser = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();

    try {
      await ensureAuthSchema();

      const db = getPool();
      const result = await db.query(
        `
          select id, name, email, role, company
          from app_users
          where email = $1
            and password_hash = crypt($2, password_hash)
          limit 1;
        `,
        [email, data.password],
      );

      const user = result.rows[0];

      if (user) {
        return signSession(user, data.rememberMe);
      }
    } catch (error) {
      console.warn("PostgreSQL auth unavailable; trying local dev auth.", error);
      const devLogin = tryDevLogin(email, data.password, data.rememberMe);
      if (devLogin) return devLogin;
    }

    const devLogin = tryDevLogin(email, data.password, data.rememberMe);
    if (devLogin) return devLogin;

    return {
      ok: false,
      code: "INVALID_CREDENTIALS",
      message: "Use admin@supplysaathi.in and SupplySaathi@123 for local login.",
    };
  });
