"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Sticky bottom action bar on phones and tablets (< lg), in the thumb zone.
 * Hidden on the first screen (the hero carries its own actions), then it slides away while
 * scrolling down and returns on scroll up. Not shown on /register (the form's own submit
 * button must never be covered) or /admin. A CSS transition does the sliding (no GSAP);
 * reduced motion makes it jump (global rule in globals.css).
 */
export function MobileActionBar() {
  const pathname = usePathname()
  const hidden = pathname === "/register" || pathname.startsWith("/admin")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hidden) return
    let lastY = window.scrollY
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        if (Math.abs(y - lastY) < 6) return // ignore jitter
        setVisible(y > window.innerHeight * 0.7 && y < lastY)
        lastY = y
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [hidden])

  if (hidden) return null

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform lg:hidden",
        visible
          ? "translate-y-0 duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]"
          : "translate-y-[130%] duration-300 ease-[cubic-bezier(0.55,0,1,0.45)]"
      )}
    >
      <div className="mx-auto flex max-w-xl gap-2 rounded-full border border-navy/10 bg-cream p-1.5 shadow-[0_18px_50px_-12px_rgb(7_29_59/0.55)]">
        <Link href="/register" className={cn(buttonVariants(), "h-[52px] flex-1")}>
          Pre-register
          <ButtonArrow />
        </Link>
        <a
          href={waLink("general")}
          {...externalLinkProps}
          aria-label="Chat on WhatsApp"
          className={cn(buttonVariants({ variant: "whatsapp" }), "h-[52px] w-[72px] px-0")}
        >
          <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-6" />
        </a>
      </div>
    </div>
  )
}
