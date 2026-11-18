import { SectionMotion } from "@/components/motion/section-motion"
import { ApproachSteps } from "@/components/sections/approach-steps"
import { ConsultancyDisclaimer } from "@/components/sections/consultancy-disclaimer"
import { SectionHeading } from "@/components/sections/section-heading"

/**
 * Our approach (PRD §7.2 section 5). Continues the consultancy's navy ground, so the
 * Middleman story reads as one dark chapter: what it is, then how it works.
 */
export function ApproachSection({ withDisclaimer = false }: { withDisclaimer?: boolean }) {
  return (
    <SectionMotion
      id="approach"
      aria-labelledby="approach-title"
      className="bg-navy pt-8 pb-24 text-cream lg:pt-16 lg:pb-40"
    >
      <div className="shell">
        <SectionHeading
          id="approach-title"
          tone="dark"
          eyebrow="Our approach"
          title={
            <>
              Connect. Review. <span className="text-gold">Proceed with clarity.</span>
            </>
          }
          intro="Clear communication, careful questions and practical support for buyers and sellers."
        />
        <div className="mt-16 lg:mt-24">
          <ApproachSteps />
        </div>
        {withDisclaimer && (
          <div data-rise className="mt-14 max-w-3xl lg:mt-20">
            <ConsultancyDisclaimer />
          </div>
        )}
      </div>
    </SectionMotion>
  )
}
