import { isAdmin } from "@/lib/admin-session"
import { fetchAllRegistrations, formatRegisteredAt } from "@/lib/registrations"

/** CSV cell: quoted, quotes doubled, and spreadsheet formula injection neutralised (OWASP). */
function cell(value: string) {
  const v = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${v.replace(/"/g, '""')}"`
}

/** Phone as an Excel/Sheets text formula so "+234…" is shown as-is, not parsed as a number. */
function phoneCell(e164: string) {
  return `"=""${e164}"""`
}

export async function GET() {
  if (!(await isAdmin())) return new Response("Not signed in", { status: 401 })

  let rows
  try {
    rows = await fetchAllRegistrations()
  } catch (e) {
    console.error("[admin export]", e)
    return new Response("Could not load registrations. Please try again.", { status: 500 })
  }

  const header = ["Full name", "Email", "Location", "Phone (WhatsApp)", "Registered (Lagos time)", "Registered (ISO)"]
  const lines = [
    header.map(cell).join(","),
    ...rows.map((r) =>
      [
        cell(r.full_name),
        cell(r.email ?? ""),
        cell(r.location),
        phoneCell(r.phone),
        cell(formatRegisteredAt(r.created_at)),
        cell(r.created_at),
      ].join(","),
    ),
  ]
  // UTF-8 BOM so Excel reads names with accents correctly.
  const body = "﻿" + lines.join("\r\n") + "\r\n"
  const date = new Date().toISOString().slice(0, 10)

  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="okafors-place-pre-registrations-${date}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  })
}
