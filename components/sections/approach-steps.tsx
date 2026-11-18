"use client"

import { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import { onIdle } from "@/lib/idle"

const STEPS = [
  {
    title: "Connect",
    text: "We introduce the right buyer and seller, and open the conversation.",
  },
  {
    title: "Review",
    text: "We ask careful questions and look at the opportunity and transaction details with you.",
  },
  {
    title: "Proceed with clarity",
    text: "You decide with a clearer picture, before any money is committed.",
  },
] as const

/**
 * Connect → Review → Proceed with clarity.
 * A gold line draws itself between the steps as you scroll (vertical on phones, horizontal
 * on desktop), lighting each numbered dot and its words as it arrives. Scrubbed to the
 * scrollbar, so it runs back on the way up.
 * Without JS / with reduced motion every step shows fully lit (that is the markup's state;
 * GSAP sets the unlit state inline only when it is going to animate).
 */
export function ApproachSteps() {
  const ref = useRef<HTMLOListElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia(root)

      // Set up when the main thread is idle: keeps scroll animations off the load path.
      const cancelIdle = onIdle(() =>
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root)
          const dot = (s: HTMLElement) => s.querySelector("[data-step-dot]")
          const words = (s: HTMLElement) => s.querySelectorAll("[data-step-words]")
          const fill = (s: HTMLElement) => s.querySelector("[data-step-fill]")

          steps.forEach((s) => {
            gsap.set(dot(s), {
              backgroundColor: "#071d3b",
              borderColor: "rgb(255 248 233 / 0.3)",
              scale: 0.8,
            })
            gsap.set(s.querySelector("[data-step-core]"), { scale: 0 })
            gsap.set(words(s), { opacity: 0.55 })
            if (fill(s)) gsap.set(fill(s), { scale: 0 })
          })

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              end: "bottom 40%",
              scrub: 0.6,
            },
          })

          steps.forEach((s) => {
            tl.to(dot(s), {
              backgroundColor: "#f3c96f",
              borderColor: "#f3c96f",
              scale: 1,
              duration: 0.25,
            })
              .to(s.querySelector("[data-step-core]"), { scale: 1, duration: 0.2 }, "<")
              .to(words(s), { opacity: 1, duration: 0.3 }, "<")
            if (fill(s)) tl.to(fill(s), { scale: 1, duration: 1 })
          })
        }),
      )
      return () => cancelIdle()
    },
    { scope: ref },
  )

  return (
    <ol ref={ref} className="grid gap-12 lg:grid-cols-3 lg:gap-6">
      {STEPS.map((step, i) => {
        const last = i === STEPS.length - 1
        return (
          <li key={step.title} data-step className="relative pl-14 lg:pt-16 lg:pl-0">
            {/* segment to the next step: down (phone) / across (desktop) */}
            {!last && (
              <span
                aria-hidden="true"
                className="absolute top-3 left-3 h-[calc(100%+3rem)] w-px bg-cream/15 lg:top-3 lg:left-3 lg:h-px lg:w-[calc(100%+1.5rem)]"
              >
                <span data-step-fill className="absolute inset-0 origin-top bg-gold lg:origin-left" />
              </span>
            )}

            {/* dot */}
            <span
              aria-hidden="true"
              data-step-dot
              className="absolute top-0 left-0 z-10 grid size-6 place-items-center rounded-full border-2 border-gold bg-gold"
            >
              <span data-step-core className="size-2 rounded-full bg-navy" />
            </span>

            <div data-step-words>
              <span className="font-heading text-[3.5rem] leading-none font-semibold text-gold tabular-nums lg:text-[4.5rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[1.75rem] leading-tight text-cream lg:text-[2rem]">{step.title}</h3>
              <p className="mt-3 max-w-[32ch] text-[1.0625rem] leading-relaxed text-cream/70">{step.text}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
