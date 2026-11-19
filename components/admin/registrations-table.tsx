"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { MessageCircle, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { formatNigerianPhone } from "@/lib/pre-registration"
import { externalLinkProps } from "@/lib/site"

export type Row = {
  id: string
  full_name: string
  email: string | null
  location: string
  phone: string
  registered: string
}

/** Searchable list. Table on desktop, stacked cards on phones. Search matches name, email, location or phone. */
export function RegistrationsTable({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState("")
  const q = useDeferredValue(query.trim().toLowerCase())
  const digits = q.replace(/\D/g, "")

  const filtered = useMemo(() => {
    if (!q) return rows
    return rows.filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        (r.email ?? "").includes(q) ||
        r.location.toLowerCase().includes(q) ||
        (digits.length >= 3 && r.phone.replace(/\D/g, "").includes(digits.replace(/^0/, ""))),
    )
  }, [rows, q, digits])

  if (rows.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-navy/20 bg-white/60 p-10 text-center">
        <p className="font-heading text-2xl text-navy">No pre-registrations yet</p>
        <p className="mt-2 text-slate">New sign-ups from the website will appear here.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="relative max-w-md">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate"
        />
        <label htmlFor="admin-search" className="sr-only">
          Search registrations
        </label>
        <Input
          id="admin-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, location or phone…"
          autoComplete="off"
          spellCheck={false}
          className="h-12 rounded-full border-navy/15 bg-white pr-4 pl-12 text-base md:text-base focus-visible:border-gold-large focus-visible:ring-[3px] focus-visible:ring-gold/40"
        />
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-slate">
        {q ? `${filtered.length} of ${rows.length} match` : `${rows.length} total`}
      </p>

      {/* Desktop table */}
      <div className="mt-5 hidden overflow-hidden rounded-[24px] border border-navy/10 bg-white md:block">
        <table className="w-full text-left text-[0.9375rem]">
          <thead className="bg-cream text-sm text-navy">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">
                Name
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Email
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Location
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Phone
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Registered
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/8">
            {filtered.map((r) => (
              <tr key={r.id} className="transition-colors hover:bg-paper">
                <td className="max-w-[16rem] px-5 py-4 font-medium break-words text-navy">{r.full_name}</td>
                <td className="max-w-[16rem] px-5 py-4 break-all">
                  <EmailLink email={r.email} />
                </td>
                <td className="max-w-[14rem] px-5 py-4 break-words text-ink/80">{r.location}</td>
                <td className="px-5 py-4">
                  <PhoneLink phone={r.phone} />
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-slate tabular-nums">{r.registered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone cards */}
      <ul className="mt-5 flex flex-col gap-3 md:hidden">
        {filtered.map((r) => (
          <li key={r.id} className="rounded-[20px] border border-navy/10 bg-white p-5">
            <p className="font-heading text-lg leading-tight font-semibold break-words text-navy">{r.full_name}</p>
            <p className="mt-1 text-[0.9375rem] break-all">
              <EmailLink email={r.email} />
            </p>
            <p className="mt-1 text-[0.9375rem] break-words text-ink/75">{r.location}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <PhoneLink phone={r.phone} />
              <span className="text-sm text-slate tabular-nums">{r.registered}</span>
            </div>
          </li>
        ))}
      </ul>

      {q && filtered.length === 0 && <p className="mt-6 text-slate">No one matches &ldquo;{query}&rdquo;.</p>}
    </div>
  )
}

function EmailLink({ email }: { email: string | null }) {
  if (!email) return <span className="text-slate">&mdash;</span>
  return (
    <a href={`mailto:${email}`} className="text-navy underline-offset-4 hover:underline">
      {email}
    </a>
  )
}

function PhoneLink({ phone }: { phone: string }) {
  return (
    <a
      href={`https://wa.me/${phone.replace(/\D/g, "")}`}
      {...externalLinkProps}
      className="inline-flex min-h-11 items-center gap-2 font-medium whitespace-nowrap text-whatsapp tabular-nums underline-offset-4 hover:underline"
    >
      <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4" />
      {formatNigerianPhone(phone)}
      <span className="sr-only"> (open in WhatsApp)</span>
    </a>
  )
}
