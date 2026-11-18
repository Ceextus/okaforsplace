import "server-only"
import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

/**
 * Minimal single-password admin session for the client's /admin page.
 * - Password lives in env ADMIN_PASSWORD (set it in Netlify; never commit it).
 * - Cookie value is `<expiry>.<hmac>`; the HMAC key is derived from ADMIN_PASSWORD and the
 *   service role key, so changing the password signs everyone out.
 * - httpOnly + secure + sameSite=lax, scoped to /admin.
 */

export const ADMIN_COOKIE = "okp_admin"
const MAX_AGE_S = 60 * 60 * 24 * 7 // 7 days

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function key() {
  return createHash("sha256")
    .update(`okp-admin-session:${process.env.ADMIN_PASSWORD}:${process.env.SUPABASE_SERVICE_ROLE_KEY}`)
    .digest()
}

function sign(payload: string) {
  return createHmac("sha256", key()).update(payload).digest("base64url")
}

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest()
  const hb = createHash("sha256").update(b).digest()
  return timingSafeEqual(ha, hb)
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD
  return Boolean(expected) && safeEqual(input, expected!)
}

export function newSessionValue() {
  const exp = String(Date.now() + MAX_AGE_S * 1000)
  return { value: `${exp}.${sign(exp)}`, maxAge: MAX_AGE_S }
}

function valid(value: string | undefined) {
  if (!value || !adminConfigured()) return false
  const [exp, sig] = value.split(".")
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false
  return safeEqual(sig, sign(exp))
}

/** True when the current request carries a valid admin session. */
export async function isAdmin() {
  return valid((await cookies()).get(ADMIN_COOKIE)?.value)
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/admin",
}
