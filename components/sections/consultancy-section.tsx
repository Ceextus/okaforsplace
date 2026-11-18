import Image from "next/image"

import { SectionMotion } from "@/components/motion/section-motion"
import { ConsultancyDisclaimer } from "@/components/sections/consultancy-disclaimer"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

/** What the consultancy does — taken straight from the client's body copy, nothing added. */
const POINTS = [
  "Bring buyers and sellers together",
  "Facilitate communication between both sides",
  "Support with reviewing opportunities and transaction details",
] as const

/**
 * 03 · The Middleman Consultancy (PRD §7.2 section 4) — the navy, premium moment.
 * Photo (cols 1–5) wipes open on scroll and drifts inside its frame; text (cols 7–12).
 * The disclaimer is required wherever the consultancy is described: keep it visible,
 * full-contrast and never collapsed.
 */
export function ConsultancySection() {
  return (
    <SectionMotion
      id="consultancy"
      aria-labelledby="consultancy-title"
      className="relative isolate overflow-hidden bg-navy py-24 text-cream lg:py-40"
    >
      {/* faint gold glow behind the text column */}
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(243_201_111/0.12),transparent)]"
      />

      <div className="shell grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-6">
        {/* Photograph */}
        <div className="lg:col-span-5">
          <div data-wipe className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-navy-2">
            <div data-parallax="6" className="absolute inset-x-0 -inset-y-[8%]">
              <Image
                data-wipe-img
                src="/images/consultancy-documents.jpg"
                alt="Two women at a table reviewing and signing documents together"
                fill
                sizes="(min-width: 1024px) 78vw, 200vw"
                className="object-cover object-[55%_50%]"
              />
            </div>
          </div>
        </div>

        {/* Words */}
        <div className="lg:col-span-6 lg:col-start-7">
          <p data-rise className="eyebrow text-gold">
            03 · Consultancy
          </p>
          <h2
            id="consultancy-title"
            data-split
            className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] text-cream"
          >
            The Middleman <span className="text-gold">Consultancy</span>
          </h2>
          <p data-rise className="mt-6 font-heading text-[1.375rem] leading-snug font-medium text-cream sm:text-2xl">
            Your bridge to better-informed business decisions.
          </p>
          <p data-rise className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-cream/75">
            We help bring buyers and sellers together, facilitate communication and provide support with reviewing
            opportunities and transaction details before people commit their money.
          </p>

          <ul className="mt-8">
            {POINTS.map((point) => (
              <li key={point} className="relative">
                <span aria-hidden="true" data-rule className="absolute inset-x-0 top-0 h-px bg-cream/15" />
                <div data-rise className="flex items-baseline gap-4 py-4">
                  <span aria-hidden="true" className="h-0.5 w-4 shrink-0 translate-y-[-0.3em] rounded-full bg-gold" />
                  <span className="text-[1.0625rem] text-cream/90">{point}</span>
                </div>
              </li>
            ))}
            <li aria-hidden="true" data-rule className="h-px bg-cream/15" />
          </ul>

          {/* Required disclaimer — visible, bordered, readable */}
          <div data-rise className="mt-8">
            <ConsultancyDisclaimer />
          </div>

          <div data-rise className="mt-10">
            <a
              href={waLink("consultation")}
              {...externalLinkProps}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Request a consultation
              <ButtonArrow />
            </a>
          </div>
        </div>
      </div>
    </SectionMotion>
  )
}
