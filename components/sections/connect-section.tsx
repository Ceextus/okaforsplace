import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { SectionMotion } from "@/components/motion/section-motion"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { SITE, externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Let's connect (PRD §7.2 section 7). Paper ground.
 * Left: heading and lead. Right: the WhatsApp number set large (tappable), the WhatsApp
 * button, and email (only when SITE.email is set), location.
 */
export function ConnectSection() {
  return (
    <SectionMotion id="connect" aria-labelledby="connect-title" className="bg-paper py-24 lg:py-40">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-x-6">
        <div className="lg:col-span-6">
          <p data-rise className="eyebrow text-gold-text">
            Let&rsquo;s connect
          </p>
          <h2 id="connect-title" data-split className="mt-5 text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[0.98]">
            Have a question or an <span className="text-gold-large">opportunity?</span>
          </h2>
          <p data-rise className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink/80">
            Contact Okafor&rsquo;s Place directly on WhatsApp. Tell us what you need, and we&rsquo;ll get back to you.
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div data-rise>
            <p className="eyebrow flex items-center gap-2 text-slate">
              <Phone aria-hidden="true" strokeWidth={1.75} className="size-4" />
              Direct WhatsApp
            </p>
            <a
              href={`tel:+${SITE.whatsappNumber}`}
              className="group mt-3 inline-block font-heading text-[clamp(2rem,3.4vw,3.25rem)] leading-none font-semibold whitespace-nowrap text-navy"
            >
              <span className="bg-[linear-gradient(#b07d1e,#b07d1e)] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-2 transition-[background-size] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:bg-[length:100%_3px]">
                {SITE.whatsappDisplay}
              </span>
              <span className="sr-only"> (call)</span>
            </a>
          </div>

          <span aria-hidden="true" data-rule className="mt-8 block h-px bg-navy/12" />

          <div data-rise className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={waLink("general")}
              {...externalLinkProps}
              className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }), "w-full sm:w-auto")}
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.75} />
              Chat with us on WhatsApp
            </a>
            {SITE.email ? (
              <a
                href={`mailto:${SITE.email}`}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
              >
                <Mail aria-hidden="true" strokeWidth={1.75} />
                Email us
                <ButtonArrow />
              </a>
            ) : null}
          </div>

          <p data-rise className="mt-6 flex items-center gap-2 text-[0.9375rem] text-slate">
            <MapPin aria-hidden="true" strokeWidth={1.75} className="size-4 text-gold-text" />
            {SITE.location}
          </p>
        </div>
      </div>
    </SectionMotion>
  )
}
