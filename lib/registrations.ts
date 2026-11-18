import "server-only"
import { getSupabaseAdmin } from "@/lib/supabase/server"

export type Registration = {
  id: string
  full_name: string
  location: string
  phone: string
  created_at: string
}

/** Every pre-registration, newest first. Pages through Supabase's 1,000-row limit. */
export async function fetchAllRegistrations(): Promise<Registration[]> {
  const supabase = getSupabaseAdmin()
  if (!supabase) throw new Error("Supabase is not configured")
  const pageSize = 1000
  const rows: Registration[] = []
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("pre_registrations")
      .select("id, full_name, location, phone, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1)
    if (error) throw new Error(`${error.code} ${error.message}`)
    rows.push(...(data ?? []))
    if (!data || data.length < pageSize) return rows
  }
}

const dateFmt = new Intl.DateTimeFormat("en-NG", {
  timeZone: "Africa/Lagos",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

/** Formatted on the server in Lagos time, so the client renders the same text (no hydration mismatch). */
export function formatRegisteredAt(iso: string) {
  return dateFmt.format(new Date(iso))
}
