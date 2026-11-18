import Link from "next/link"
import { cacheLife } from "next/cache"
import { ArrowUpRight } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { FooterMotion } from "@/components/layout/footer-motion"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { SITE, externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/register", label: "Pre-register" },
] as const

const PILLARS = [
  { href: "/#community", label: "Community" },
  { href: "/#marketplace", label: "Marketplace" },
  { href: "/#consultancy", label: "Consultancy" },
] as const

/** Year captured into the static shell, refreshed daily (cache components: no bare new Date()). */
async function CopyrightYear() {
  "use cache"
  cacheLife("days")
  return <>{new Date().getFullYear()}</>
}

const linkClass =
  "relative inline-flex py-1.5 text-[0.9375rem] text-cream/75 transition-colors duration-150 hover:text-cream after:absolute after:bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:after:scale-x-100"

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-foot-rise>
      <h2 className="eyebrow font-sans text-gold">{title}</h2>
      <ul className="mt-5 flex flex-col gap-1">{children}</ul>
    </div>
  )
}

/**
 * Footer (navy). A huge faint tagline band opens it — each word slides in from alternating
 * sides as the footer scrolls in (scrubbed) — then logo + blurb + action, three link
 * columns, and the legal row. Extra bottom padding on phones clears the sticky action bar.
 */
export function SiteFooter() {
  const words = SITE.tagline.split(" ")
  return (
    <FooterMotion className="relative overflow-hidden bg-navy pb-28 text-cream lg:pb-10">
      {/* Tagline band */}
      <div aria-hidden="true" className="border-b border-cream/10 pt-20 pb-10 lg:pt-28 lg:pb-14">
        <p className="shell flex flex-col font-heading text-[clamp(3.5rem,17vw,6rem)] leading-[0.92] font-semibold lg:flex-row lg:justify-between lg:gap-[1.5vw] lg:text-[clamp(3rem,5.15vw,6.25rem)] lg:whitespace-nowrap">
          {words.map((w, i) => (
            <span
              key={w}
              data-foot-word
              data-dir={i % 2 ? "1" : "-1"}
              className={cn("block", i === words.length - 1 ? "text-gold/90" : "text-cream/[0.12]")}
            >
              {w}
            </span>
          ))}
        </p>
      </div>

      <div className="shell grid gap-12 pt-14 lg:grid-cols-12 lg:gap-x-6 lg:pt-20">
        <div data-foot-rise className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-[36ch] text-[0.9375rem] leading-relaxed text-cream/70">
            An Abuja community for meaningful connections, business conversations, buying and selling, and guidance
            before you commit.
          </p>
          <Link href="/register" className={cn(buttonVariants(), "mt-8")}>
            Pre-register
            <ButtonArrow />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          <Column title="Explore">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Pillars">
            {PILLARS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Reach us">
            <li>
              <a href={waLink("general")} {...externalLinkProps} className={cn(linkClass, "items-center gap-1.5")}>
                WhatsApp
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-3.5 text-gold" />
              </a>
            </li>
            <li>
              <a href={`tel:+${SITE.whatsappNumber}`} className={cn(linkClass, "whitespace-nowrap")}>
                {SITE.whatsappDisplay}
              </a>
            </li>
            {SITE.email ? (
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
            ) : null}
            <li className="py-1.5 text-[0.9375rem] text-cream/75">{SITE.location}</li>
          </Column>
        </div>
      </div>

      <div className="shell mt-16 lg:mt-20">
        <div className="flex flex-col gap-3 border-t border-cream/10 pt-6 text-sm text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {SITE.domain} · © <CopyrightYear /> {SITE.name}
          </p>
          <p>Community · Marketplace · Consultancy</p>
        </div>
      </div>
    </FooterMotion>
  )
}
