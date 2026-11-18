"use client"

import { useRef } from "react"
import { EASE, gsap, useGSAP } from "@/lib/gsap"

/**
 * Client wrapper that animates the server-rendered hero (children stay Server Components).
 *
 * 1. Entrance, once on load: the photo settles, grid lines draw down, then the lead, field,
 *    link, rooftop tile and foot cells (the headline's words rise with CSS — see RiseWord).
 * 2. Scroll (scrubbed to the scrollbar, runs back on the way up): the photo slowly zooms and
 *    sinks while the words lift and dim as the hero leaves the screen.
 * Reduced motion: nothing moves; the guard in layout.tsx never hides anything.
 */
export function HeroMotion({ children, ...props }: React.ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia(ref.current ?? undefined)

      mm.add("(prefers-reduced-motion: no-preference)", (mmCtx) => {
        // The headline itself rises with CSS (globals.css .rise-word); GSAP brings in the rest.
        const build = () => mmCtx.add(() => {
          const tl = gsap.timeline({
            defaults: { ease: EASE.enter },
            onComplete: () => document.documentElement.classList.add("js-enter-done"),
          })

          tl.from("[data-hero-media]", { scale: 1.14, duration: 2, ease: "expo.out" }, 0)
            .from("[data-hero-line]", { scaleY: 0, transformOrigin: "top", autoAlpha: 0, duration: 1.3, stagger: 0.08 }, 0.05)
            .from(
              "[data-hero-photo]",
              { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 0, duration: 1.1, ease: "expo.inOut" },
              0.55
            )
            .from("[data-hero-tile]", { yPercent: 40, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.8)
        })

        build()

        // Scroll-out: scrubbed, transform/opacity only.
        const st = gsap
          .timeline({
            scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 },
          })
          .to("[data-hero-media]", { scale: 1.12, yPercent: 10, ease: "none" }, 0)
          .to("[data-hero-content]", { yPercent: -12, opacity: 0.25, ease: "none" }, 0)
          .to("[data-hero-row]", { yPercent: -30, opacity: 0, ease: "none" }, 0)

        return () => {
          st.scrollTrigger?.kill()
        }
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  )
}
