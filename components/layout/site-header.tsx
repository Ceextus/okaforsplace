"use client"

import { useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { MobileMenu } from "@/components/layout/mobile-menu"
import { EASE, gsap, useGSAP } from "@/lib/gsap"
import { NAV_LINKS, externalLinkProps, isActivePath, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Floating pill nav (inspired by etail.me): a cream capsule inset from the screen edges,
 * floating over the hero photograph and every page below it. It looks the same at every
 * scroll position; it drops in once on load.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref.current ?? undefined)
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: EASE.enter } })
        tl.from("[data-nav-pill]", { yPercent: -140, autoAlpha: 0, duration: 1, clearProps: "transform" })
          .from("[data-nav-item]", { y: -10, autoAlpha: 0, duration: 0.6, stagger: 0.05, clearProps: "all" }, "-=0.55")
      })
    },
    { scope: ref }
  )

  return (
    <header ref={ref} className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-3 lg:pt-4">
      <div className="shell">
        <div
          data-nav-pill
          data-enter
          className="pointer-events-auto flex h-14 items-center justify-between gap-4 rounded-full border border-navy/8 bg-cream/96 pr-1.5 pl-4 shadow-[0_12px_40px_-16px_rgb(7_29_59/0.45)] backdrop-blur-xl supports-[not(backdrop-filter:blur(0))]:bg-cream lg:h-16 lg:pr-2 lg:pl-6"
        >
          <div data-nav-item>
            <Logo tone="light" />
          </div>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href)
                return (
                  <li key={link.href} data-nav-item>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-11 items-center px-4 text-[0.9375rem] font-medium text-navy transition-colors duration-150",
                        // underline draws left→right on hover; a 2px gold bar marks the current page
                        "after:absolute after:inset-x-4 after:bottom-2 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                        active
                          ? "after:scale-x-100 after:bg-gold-large"
                          : "text-navy/70 after:scale-x-0 after:bg-navy/40 hover:text-navy hover:after:scale-x-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 lg:gap-2">
            {/* GSAP animates these wrappers, never the buttons: the buttons' own CSS transform
                transitions (hover lift) would fight the tween and leave it stuck mid-way. */}
            <div data-nav-item className="hidden lg:block">
              <a
                href={waLink("general")}
                {...externalLinkProps}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-11 gap-2 px-4 text-navy hover:bg-navy/6"
                )}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4.5 text-whatsapp" />
                WhatsApp
              </a>
            </div>

            <div data-nav-item className="hidden lg:block">
              <Link
                href="/register"
                aria-current={isActivePath(pathname, "/register") ? "page" : undefined}
                className={cn(buttonVariants({ variant: "navy", size: "sm" }), "h-12 pr-2 pl-5")}
              >
                Pre-register
                <span className="grid size-8 place-items-center rounded-full bg-gold text-navy">
                  <ButtonArrow />
                </span>
              </Link>
            </div>

            <div data-nav-item className="lg:hidden">
              <MobileMenu pathname={pathname} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
