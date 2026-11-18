"use client"

import { useRef } from "react"
import { useMotion } from "@/lib/motion"

/**
 * Client wrapper for the server-rendered hero (children stay Server Components).
 *
 * 1. Entrance, once on load: pure CSS (globals.css: .hero-zoom, .line-draw, .rise-word,
 *    .rise-in, .clip-up), so it starts at first paint with no JavaScript on the LCP path.
 * 2. Scroll-out (GSAP, loaded at idle; scrubbed, runs back on the way up): the photo slowly
 *    zooms and sinks while the words lift and dim as the hero leaves the screen.
 * The scroll tweens target wrapper elements, never the elements that run CSS entrances
 * (a CSS animation's fill would override GSAP's inline transform).
 */
export function HeroMotion({ children, ...props }: React.ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null)

  useMotion(ref, ({ gsap }, root) => {
    gsap
      .timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 } })
      .to("[data-hero-media]", { scale: 1.12, yPercent: 10, ease: "none" }, 0)
      .to("[data-hero-content]", { yPercent: -12, opacity: 0.25, ease: "none" }, 0)
      .to("[data-hero-row]", { yPercent: -30, opacity: 0, ease: "none" }, 0)
  })

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  )
}
