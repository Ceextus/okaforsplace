"use server"

import { headers } from "next/headers"

import { getSupabaseAdmin } from "@/lib/supabase/server"
import {
  type RegisterState,
  formatNigerianPhone,
  normalizeNigerianPhone,
  readValues,
  validate,
} from "@/lib/pre-registration"

const GENERIC_ERROR = "Something went wrong. Please try again or message us on WhatsApp."

// Simple per-IP limit: 5 submissions / 10 minutes. In memory, so it resets per serverless
// instance — acceptable for v1 (PRD §8.2).
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // keep memory bounded
  return recent.length > MAX_PER_WINDOW
}

export async function registerAction(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const values = readValues(formData)
  const firstName = values.full_name.split(" ")[0] || "there"

  // Honeypot: bots fill the hidden "company" field. Pretend it worked; save nothing.
  if (String(formData.get("company") ?? "").trim()) {
    const p = normalizeNigerianPhone(values.phone)
    return { status: "success", firstName, phone: p ? formatNigerianPhone(p) : values.phone }
  }

  const errors = validate(values)
  if (Object.keys(errors).length) return { status: "invalid", errors, values }

  const phone = normalizeNigerianPhone(values.phone)!
  const h = await headers()
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown"
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Too many attempts. Please wait a few minutes, or message us on WhatsApp.",
      values,
    }
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    console.error("[pre-register] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set")
    return {
      status: "error",
      message:
        process.env.NODE_ENV === "production"
          ? GENERIC_ERROR
          : "Dev: Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local (see .env.example) and restart the dev server.",
      values,
    }
  }

  const { error } = await supabase.from("pre_registrations").insert({
    full_name: values.full_name,
    email: values.email,
    location: values.location,
    phone,
    user_agent: h.get("user-agent")?.slice(0, 300) ?? null,
  })

  if (error) {
    if (error.code === "23505") return { status: "duplicate", phone: formatNigerianPhone(phone) }
    console.error("[pre-register] insert failed:", error.code, error.message)
    return { status: "error", message: GENERIC_ERROR, values }
  }

  return { status: "success", firstName, phone: formatNigerianPhone(phone) }
}
