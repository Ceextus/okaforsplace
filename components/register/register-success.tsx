"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { EASE, useMotion } from "@/lib/motion"
import type { RegisterState } from "@/lib/pre-registration"
import { externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

type Props = {
  state: Extract<RegisterState, { status: "success" | "duplicate" }>
}

const RING = "M9 32a23 23 0 1 0 46 0a23 23 0 1 0 -46 0ZM19.5 32a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0Z"

/**
 * Confirmation (signature moment 3): the logo's two halves close into one complete ring,
 * then a gold sheen passes once over the headline. Focus moves to the headline so screen
 * readers announce it. Reduced motion: the closed ring and headline, no sheen.
 */
export function RegisterSuccess({ state }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const ok = state.status === "success"

  // Focus the headline for screen readers right away (with or without motion).
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>("[data-success-title]")?.focus()
  }, [])

  // The visitor just submitted, so load GSAP now rather than at idle.
  useMotion(
    ref,
    ({ gsap }, root) => {
      gsap
        .timeline({ defaults: { ease: EASE.enter } })
        .from(root, { y: 16, autoAlpha: 0, duration: 0.6 })
        .fromTo("[data-ring-a]", { x: -16, y: 16 }, { x: 0, y: 0, duration: 0.9 }, 0.1)
        .fromTo("[data-ring-b]", { x: 16, y: -16 }, { x: 0, y: 0, duration: 0.9 }, 0.1)
        .fromTo("[data-ring-mark]", { rotate: -40, scale: 0.85 }, { rotate: 0, scale: 1, duration: 1.1 }, 0.1)
        .from("[data-success-rise]", { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, 0.55)
        .add(() => root.querySelector("[data-sheen]")?.classList.add("sheen-run"), 0.9)
    },
    { idle: false },
  )

  return (
    <div ref={ref} role="status" className="flex flex-col items-start">
      <div aria-hidden="true" data-ring-mark className="size-20">
        <svg viewBox="0 0 64 64" className="size-full">
          <g data-ring-a>
            {/* closed: no gap between halves */}
            <path d={RING} fillRule="evenodd" fill="#071D3B" clipPath="url(#ok-a)" />
          </g>
          <g data-ring-b>
            <path d={RING} fillRule="evenodd" fill="#F3C96F" clipPath="url(#ok-b)" />
          </g>
          <defs>
            <clipPath id="ok-a">
              <path d="M-40 -40H104L-40 104Z" />
            </clipPath>
            <clipPath id="ok-b">
              <path d="M104 104H-40L104 -40Z" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <h2 data-success-title tabIndex={-1} className="mt-8 text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] outline-none">
        {ok ? (
          <>
            Thank you, {state.firstName}!{" "}
            <span data-sheen className="sheen text-navy">
              You&rsquo;re on the list.
            </span>
          </>
        ) : (
          <span data-sheen className="sheen text-navy">
            You&rsquo;re already on the list.
          </span>
        )}
      </h2>

      <p data-success-rise className="mt-5 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink/80">
        {ok ? (
          <>
            We&rsquo;ll contact you on{" "}
            <strong className="font-semibold whitespace-nowrap text-navy">{state.phone}</strong> when we launch.
          </>
        ) : (
          <>
            This number (<strong className="font-semibold whitespace-nowrap text-navy">{state.phone}</strong>) is
            already on the list &mdash; we&rsquo;ll be in touch.
          </>
        )}
      </p>

      <div data-success-rise className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <a
          href={waLink("join")}
          {...externalLinkProps}
          className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }), "w-full sm:w-auto")}
        >
          <MessageCircle aria-hidden="true" strokeWidth={1.75} />
          Join the WhatsApp community
        </a>
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
          Back home
        </Link>
      </div>
    </div>
  )
}
