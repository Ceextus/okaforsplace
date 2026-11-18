"use client"

import { useRef } from "react"
import { EASE, useMotion } from "@/lib/motion"

/**
 * Footer motion: the tagline words slide in from alternating sides (scrubbed, desktop and
 * phone), then the columns rise once. Reduced motion / no JS: the footer stands as written.
 */
export function FooterMotion({ children, ...props }: React.ComponentProps<"footer">) {
  const ref = useRef<HTMLElement>(null)

  useMotion(ref, ({ gsap, ScrollTrigger }, root) => {
    gsap.utils.toArray<HTMLElement>("[data-foot-word]", root).forEach((word) => {
      gsap.fromTo(
        word,
        { xPercent: 28 * Number(word.dataset.dir ?? 1), opacity: 0.2 },
        {
          xPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "top 35%",
            scrub: 0.7,
          },
        },
      )
    })

    const risers = gsap.utils.toArray<HTMLElement>("[data-foot-rise]", root)
    gsap.set(risers, { y: 32, autoAlpha: 0 })
    ScrollTrigger.batch(risers, {
      start: "top 92%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: EASE.enter,
          stagger: 0.08,
          clearProps: "transform",
        }),
    })
  })

  return (
    <footer ref={ref} {...props}>
      {children}
    </footer>
  )
}
