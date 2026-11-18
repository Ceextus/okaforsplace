"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { MobileMenu } from "@/components/layout/mobile-menu"
import { NAV_LINKS, externalLinkProps, isActivePath, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Floating pill nav (inspired by etail.me): a cream capsule inset from the screen edges,
 * floating over the hero photograph and every page below it. It looks the same at every
 * scroll position; it drops in once on load (CSS: .nav-drop / .nav-item in globals.css).
 */
export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-3 lg:pt-4">
      <div className="shell">
        <div className="nav-drop pointer-events-auto flex h-14 items-center justify-between gap-4 rounded-full border border-navy/8 bg-cream pr-1.5 pl-4 shadow-[0_12px_40px_-16px_rgb(7_29_59/0.45)] lg:h-16 lg:pr-2 lg:pl-6">
          <div data-nav-item className="nav-item" style={{ "--d": "0.45s" } as React.CSSProperties}>
            <Logo tone="light" />
          </div>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link, i) => {
                const active = isActivePath(pathname, link.href)
                return (
                  <li
                    key={link.href}
                    data-nav-item
                    className="nav-item"
                    style={{ "--d": `${0.5 + i * 0.05}s` } as React.CSSProperties}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-11 items-center px-4 text-[0.9375rem] font-medium text-navy transition-colors duration-150",
                        // underline draws left→right on hover; a 2px gold bar marks the current page
                        "after:absolute after:inset-x-4 after:bottom-2 after:h-0.5 after:origin-left after:rounded-full after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                        active
                          ? "after:scale-x-100 after:bg-gold-large"
                          : "text-navy/70 after:scale-x-0 after:bg-navy/40 hover:text-navy hover:after:scale-x-100",
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
            <div data-nav-item className="nav-item hidden lg:block" style={{ "--d": "0.65s" } as React.CSSProperties}>
              <a
                href={waLink("general")}
                {...externalLinkProps}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-11 gap-2 px-4 text-navy hover:bg-navy/6",
                )}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4.5 text-whatsapp" />
                WhatsApp
              </a>
            </div>

            <div data-nav-item className="nav-item hidden lg:block" style={{ "--d": "0.7s" } as React.CSSProperties}>
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

            <div data-nav-item className="nav-item lg:hidden" style={{ "--d": "0.5s" } as React.CSSProperties}>
              <MobileMenu pathname={pathname} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
