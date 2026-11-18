/**
 * Pre-registration rules (PRD §7.3), shared by the client form (instant feedback) and the
 * Server Action (the real check). Keep in sync with the CHECKs in
 * supabase/migrations/0001_pre_registrations.sql.
 */

export type Field = "full_name" | "location" | "phone"
export type FieldErrors = Partial<Record<Field, string>>
export type Values = Record<Field, string>

export type RegisterState =
  | { status: "idle"; values?: Values }
  | { status: "invalid"; errors: FieldErrors; values: Values }
  | { status: "success"; firstName: string; phone: string }
  | { status: "duplicate"; phone: string }
  | { status: "error"; message: string; values: Values }

/** Nigerian mobile → E.164 (+234XXXXXXXXXX), or null if it isn't one. */
export function normalizeNigerianPhone(raw: string): string | null {
  let digits = raw.replace(/[\s\-().]/g, "")
  if (digits.startsWith("+")) digits = digits.slice(1)
  if (!/^\d+$/.test(digits)) return null
  if (digits.startsWith("234")) digits = digits.slice(3)
  else if (digits.startsWith("0")) digits = digits.slice(1)
  return /^[789][01]\d{8}$/.test(digits) ? `+234${digits}` : null
}

/** +2348031234567 → +234 803 123 4567 */
export function formatNigerianPhone(e164: string): string {
  const m = /^\+234(\d{3})(\d{3})(\d{4})$/.exec(e164)
  return m ? `+234 ${m[1]} ${m[2]} ${m[3]}` : e164
}

export function readValues(formData: FormData): Values {
  const get = (k: Field) => String(formData.get(k) ?? "").trim().replace(/\s+/g, " ")
  return { full_name: get("full_name"), location: get("location"), phone: get("phone") }
}

export function validateField(field: Field, value: string): string | undefined {
  const v = value.trim()
  switch (field) {
    case "full_name":
      if (!v) return "Enter your full name."
      if (v.length < 2 || v.length > 80) return "Your name should be between 2 and 80 characters."
      return
    case "location":
      if (!v) return "Enter where you are, e.g. Wuse 2, Abuja."
      if (v.length < 2 || v.length > 80) return "Your location should be between 2 and 80 characters."
      return
    case "phone":
      if (!v) return "Enter your phone number."
      if (!normalizeNigerianPhone(v)) return "Enter a valid Nigerian mobile number, e.g. 0803 123 4567."
      return
  }
}

export function validate(values: Values): FieldErrors {
  const errors: FieldErrors = {}
  for (const f of ["full_name", "location", "phone"] as const) {
    const e = validateField(f, values[f])
    if (e) errors[f] = e
  }
  return errors
}
