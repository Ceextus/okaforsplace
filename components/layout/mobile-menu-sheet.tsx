"use client"

import type { RefObject } from "react"
import Link from "next/link"
import { ArrowRight, MessageCircle, X } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { NAV_LINKS, SITE, externalLinkProps, isActivePath, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

const MENU_LINKS = [...NAV_LINKS, { href: "/register", label: "Pre-register" }] as const

/**
 * The mobile menu's bottom sheet. Loaded on demand (see mobile-menu.tsx) so Base UI's dialog
 * code isn't in the initial bundle. Focus returns to the Menu button on close.
 */
export default function MobileMenuSheet({
  open,
  onOpenChange,
  pathname,
  returnFocus,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  pathname: string
  returnFocus: RefObject<HTMLButtonElement | null>
}) {
  const close = () => onOpenChange(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        finalFocus={returnFocus}
        className={cn(
          "h-[calc(100dvh-12px)] gap-0 rounded-t-[28px] border-0 bg-navy p-0 text-cream shadow-none",
          "duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=bottom]:data-ending-style:translate-y-full data-[side=bottom]:data-starting-style:translate-y-full data-ending-style:opacity-100 data-starting-style:opacity-100",
        )}
      >
        <div aria-hidden="true" className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-cream/25" />

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-(--gutter) pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            <Logo onClick={close} />
            <SheetTitle className="eyebrow text-gold">Menu</SheetTitle>
          </div>

          <nav aria-label="Mobile" className="mt-8">
            <ul>
              {MENU_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href)
                return (
                  <li key={link.href} className="border-b border-cream/12">
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex min-h-16 items-center justify-between py-3 font-heading text-[2rem] leading-none font-semibold tracking-[-0.01em] transition-colors",
                        active ? "text-gold" : "text-cream hover:text-gold",
                      )}
                    >
                      {link.label}
                      <ArrowRight
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={cn(
                          "size-6 transition-transform duration-200 group-hover:translate-x-[3px]",
                          active ? "text-gold" : "text-cream/70",
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-7">
            <p className="eyebrow text-gold">WhatsApp</p>
            <a
              href={waLink("general")}
              {...externalLinkProps}
              className="mt-3 inline-block font-heading text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] text-cream"
            >
              {SITE.whatsappDisplay}
            </a>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            <a
              href={waLink("general")}
              {...externalLinkProps}
              onClick={close}
              className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }), "w-full")}
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.75} />
              Chat on WhatsApp
            </a>
            <SheetClose className={cn(buttonVariants({ variant: "outline-dark", size: "lg" }), "w-full")}>
              <X aria-hidden="true" strokeWidth={1.75} />
              Close menu
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
