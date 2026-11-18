import { Suspense } from "react"
import type { Metadata } from "next"
import { Download, LogOut } from "lucide-react"

import { logoutAction } from "@/app/admin/actions"
import { LoginForm } from "@/components/admin/login-form"
import { RegistrationsTable, type Row } from "@/components/admin/registrations-table"
import { buttonVariants } from "@/components/ui/button"
import { isAdmin } from "@/lib/admin-session"
import { fetchAllRegistrations, formatRegisteredAt } from "@/lib/registrations"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

/**
 * /admin — the client's view of pre-registrations (password protected).
 * The shell is static; everything that reads the session cookie or the database streams in
 * inside <Suspense> (Cache Components), behind a shimmer skeleton.
 */
export default function AdminPage() {
  return (
    <section className="min-h-svh bg-navy pt-28 pb-20 text-cream lg:pt-36">
      <div className="shell">
        <Suspense fallback={<AdminSkeleton />}>
          <AdminGate />
        </Suspense>
      </div>
    </section>
  )
}

async function AdminGate() {
  if (!(await isAdmin())) return <LoginForm />

  let rows: Row[] = []
  let loadError = false
  try {
    rows = (await fetchAllRegistrations()).map((r) => ({
      id: r.id,
      full_name: r.full_name,
      location: r.location,
      phone: r.phone,
      registered: formatRegisteredAt(r.created_at),
    }))
  } catch (e) {
    console.error("[admin]", e)
    loadError = true
  }

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-gold">Admin</p>
          <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] text-cream">Pre-registrations</h1>
          {!loadError && (
            <p className="mt-3 text-lg text-cream/75">
              <span className="font-heading text-2xl font-semibold text-gold tabular-nums">{rows.length}</span>{" "}
              {rows.length === 1 ? "person has" : "people have"} pre-registered.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Plain <a>: the route handler responds with a file download */}
          <a
            href="/admin/export"
            download
            aria-disabled={rows.length === 0 || undefined}
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            <Download aria-hidden="true" strokeWidth={1.75} />
            Download CSV
          </a>
          <form action={logoutAction}>
            <button type="submit" className={cn(buttonVariants({ variant: "outline-dark", size: "lg" }), "w-full sm:w-auto")}>
              <LogOut aria-hidden="true" strokeWidth={1.75} />
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 rounded-[28px] bg-paper p-4 text-ink sm:p-8">
        {loadError ? (
          <p role="alert" className="p-6 text-center text-ink">
            Couldn&rsquo;t load the registrations right now. Please refresh the page in a moment.
          </p>
        ) : (
          <RegistrationsTable rows={rows} />
        )}
      </div>
      <p className="mt-6 text-sm text-cream/60">
        The CSV opens in Excel or Google Sheets. Times are shown in Lagos time (WAT).
      </p>
    </div>
  )
}

/** Loading state: skeleton blocks with a shimmer pulse (never a spinner). */
function AdminSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="shimmer h-4 w-20 rounded-full" />
      <div className="shimmer mt-5 h-12 w-72 max-w-full rounded-xl" />
      <div className="shimmer mt-4 h-5 w-56 rounded-full" />
      <div className="mt-10 rounded-[28px] bg-paper p-4 sm:p-8">
        <div className="shimmer-light h-12 w-full max-w-md rounded-full" />
        <div className="mt-6 flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer-light h-14 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
