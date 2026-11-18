import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Required wherever the Middleman Consultancy is described (PRD §7.2, §12): visible,
 * full-contrast, never collapsed or hidden behind a toggle.
 */
export function ConsultancyDisclaimer({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const dark = tone === "dark"
  return (
    <aside
      aria-label="Important: scope and limits of the consultancy"
      className={cn(
        "flex gap-4 rounded-[20px] border p-5 sm:p-6",
        dark ? "border-gold/40 bg-navy-2/60" : "border-gold-large/35 bg-cream",
        className
      )}
    >
      <ShieldCheck
        aria-hidden="true"
        strokeWidth={1.5}
        className={cn("mt-0.5 size-6 shrink-0", dark ? "text-gold" : "text-gold-text")}
      />
      <p className={cn("text-[0.9375rem] leading-relaxed", dark ? "text-cream/90" : "text-ink")}>
        The scope of each review will be agreed in advance. Due diligence can reduce uncertainty, but it cannot
        guarantee an outcome or eliminate every risk.
      </p>
    </aside>
  )
}
