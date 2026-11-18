"use client"

import { useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap"
import { externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Sticky bottom action bar on phones and tablets (< lg), in the thumb zone.
 * Hidden on the first screen (the hero carries its own actions), then it slides away while
 * scrolling down and returns on scroll up. Not shown on /register (the form's own submit
 * button must never be covered). Under reduced motion it jumps instead of sliding.
 */
export function MobileActionBar() {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const hidden = pathname === "/register" || pathname.startsWith("/admin")

  useGSAP(
    () => {
      const bar = ref.current
      if (!bar || hidden) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const show = (on: boolean) =>
        gsap.to(bar, {
          yPercent: on ? 0 : 130,
          duration: reduce ? 0 : on ? 0.45 : 0.3,
          ease: on ? "expo.out" : "power2.in",
          overwrite: true,
        })

      gsap.set(bar, { y: 0, yPercent: 130 }) // y: 0 drops the px offset GSAP parsed from the inline style
      let visible = false
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const pastHero = self.scroll() > window.innerHeight * 0.7
          const want = pastHero && self.direction === -1
          if (want !== visible) {
            visible = want
            show(want)
          }
        },
      })
      return () => st.kill()
    },
    { dependencies: [hidden], revertOnUpdate: true }
  )

  if (hidden) return null

  return (
    <div
      ref={ref}
      // Starts off-screen (no flash before hydration); GSAP reads this transform and takes over.
      style={{ transform: "translateY(130%)" }}
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <div className="mx-auto flex max-w-xl gap-2 rounded-full border border-navy/10 bg-cream/95 p-1.5 shadow-[0_18px_50px_-12px_rgb(7_29_59/0.55)] backdrop-blur-xl">
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
