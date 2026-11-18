"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import { ADMIN_COOKIE, adminConfigured, cookieOptions, newSessionValue, passwordMatches } from "@/lib/admin-session"

export type LoginState = { error?: string }

// Brute-force brake: 8 attempts per IP per 15 minutes (in memory, per server instance).
const WINDOW_MS = 15 * 60 * 1000
const attempts = new Map<string, number[]>()

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminConfigured()) return { error: "The admin password isn't set up yet. Add ADMIN_PASSWORD in the hosting settings." }

  const h = await headers()
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown"
  const now = Date.now()
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= 8) return { error: "Too many attempts. Please wait 15 minutes and try again." }

  if (!passwordMatches(String(formData.get("password") ?? ""))) {
    recent.push(now)
    attempts.set(ip, recent)
    return { error: "That password isn't right. Please try again." }
  }

  attempts.delete(ip)
  const { value, maxAge } = newSessionValue()
  ;(await cookies()).set(ADMIN_COOKIE, value, { ...cookieOptions, maxAge })
  redirect("/admin")
}

export async function logoutAction() {
  ;(await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" })
  redirect("/admin")
}
