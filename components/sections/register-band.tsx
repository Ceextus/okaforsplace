"use client"

import { useRef } from "react"
import Link from "next/link"

import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { onIdle } from "@/lib/idle"
import { EASE, SplitText, gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/**
 * Pre-register band (PRD §7.2 section 6). Gold ground, navy words.
 * Motion: the logo's two halves start apart and slide together as the band crosses the
 * screen ("two sides meeting", scrubbed), while the headline's words rise in.
 */
export function RegisterBand() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia(root)
      // Set up when the main thread is idle: keeps scroll animations off the load path.
      const cancelIdle = onIdle(() =>
        mm.add("(prefers-reduced-motion: no-preference)", (ctx) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "center 62%",
                scrub: 0.8,
              },
            })
            .fromTo("[data-half-a]", { x: -22, y: 22 }, { x: 0, y: 0, ease: "power2.out" }, 0)
            .fromTo("[data-half-b]", { x: 22, y: -22 }, { x: 0, y: 0, ease: "power2.out" }, 0)
            .fromTo("[data-band-mark]", { rotate: -25 }, { rotate: 0, ease: "power2.out" }, 0)

          const words = () =>
            ctx.add(() => {
              SplitText.create("[data-band-title]", {
                type: "words",
                mask: "words",
                autoSplit: true,
                onSplit: (self) =>
                  gsap.from(self.words, {
                    yPercent: 110,
                    duration: 0.9,
                    ease: EASE.enter,
                    stagger: 0.05,
                    scrollTrigger: {
                      trigger: root,
                      start: "top 75%",
                      once: true,
                    },
                  }),
              })
            })
          if (document.fonts?.status === "loaded") words()
          else document.fonts.ready.then(() => words())

          gsap.from("[data-band-rise]", {
            y: 24,
            autoAlpha: 0,
            duration: 0.8,
            ease: EASE.enter,
            stagger: 0.08,
            delay: 0.3,
            clearProps: "transform",
            scrollTrigger: { trigger: root, start: "top 75%", once: true },
          })
        }),
      )
      return () => cancelIdle()
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      aria-labelledby="band-title"
      className="relative isolate overflow-hidden bg-gold text-navy [&_:focus-visible]:outline-navy"
    >
      {/* The mark: two halves of the "O" meeting */}
      {/* Outer div positions, inner div rotates (GPU-friendly: never transform the <svg> itself) */}
      <div
        aria-hidden="true"
        className="absolute -right-28 -bottom-40 -z-10 size-[22rem] opacity-90 sm:-right-16 lg:top-1/2 lg:right-[4%] lg:bottom-auto lg:size-[30rem] lg:-translate-y-1/2"
      >
        <div data-band-mark className="size-full will-change-transform">
          <svg viewBox="0 0 64 64" className="size-full">
            <defs>
              <clipPath id="band-a">
                <path d="M-40 -40H101.74L-40 101.74Z" />
              </clipPath>
              <clipPath id="band-b">
                <path d="M104 104H-37.74L104 -37.74Z" />
              </clipPath>
            </defs>
            <g data-half-a>
              <path
                d="M9 32a23 23 0 1 0 46 0a23 23 0 1 0 -46 0ZM19.5 32a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0Z"
                fillRule="evenodd"
                fill="#071D3B"
                fillOpacity="0.12"
                clipPath="url(#band-a)"
                transform="translate(-1.41 1.41)"
              />
            </g>
            <g data-half-b>
              <path
                d="M9 32a23 23 0 1 0 46 0a23 23 0 1 0 -46 0ZM19.5 32a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0Z"
                fillRule="evenodd"
                fill="#FFF8E9"
                fillOpacity="0.55"
                clipPath="url(#band-b)"
                transform="translate(1.41 -1.41)"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="shell py-24 lg:py-32">
        <p data-band-rise className="eyebrow text-navy/70">
          Pre-registration is open
        </p>
        <h2
          id="band-title"
          data-band-title
          className="mt-5 max-w-[16ch] text-[clamp(2.5rem,5.6vw,5rem)] leading-[0.98] text-navy"
        >
          Be among the first to join Okafor&rsquo;s Place.
        </h2>
        <div data-band-rise className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link href="/register" className={cn(buttonVariants({ variant: "navy", size: "lg" }), "w-full sm:w-auto")}>
            Pre-register
            <ButtonArrow />
          </Link>
          <p className="text-[0.9375rem] font-medium text-navy/80">It takes 30 seconds.</p>
        </div>
      </div>
    </section>
  )
}
