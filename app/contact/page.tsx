import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  MessageCircleQuestion,
  Phone,
  Search,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react"

import { SectionMotion } from "@/components/motion/section-motion"
import { SectionHeading } from "@/components/sections/section-heading"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { SITE, externalLinkProps, waLink, type WaIntent } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Have a question or an opportunity? Contact Okafor's Place directly on WhatsApp and we'll get back to you.",
}

const INTENTS: { intent: WaIntent; label: string; line: string; icon: LucideIcon }[] = [
  { intent: "join", label: "Join the community", line: "Ask the admin to add you", icon: Users },
  { intent: "enquire", label: "Enquire about a listing", line: "Ask about something you saw", icon: Search },
  { intent: "sell", label: "Sell a product or service", line: "Send us the details to review", icon: Store },
  { intent: "consultation", label: "Request a consultation", line: "The Middleman Consultancy", icon: Handshake },
  { intent: "general", label: "General question", line: "Anything else on your mind", icon: MessageCircleQuestion },
]

/* ───────── Hero ───────── */

function ContactHero() {
  return (
    <SectionMotion aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-navy text-cream">
      <div
        aria-hidden="true"
        className="absolute -top-56 right-[-15%] -z-10 size-[46rem] rounded-full bg-[radial-gradient(closest-side,rgb(243_201_111/0.13),transparent)]"
      />
      <div className="shell grid gap-6 pt-32 pb-40 lg:grid-cols-12 lg:items-end lg:gap-x-6 lg:pt-44 lg:pb-56">
        <div className="lg:col-span-7">
          <p style={{ "--d": "0.1s" } as React.CSSProperties} className="rise-in eyebrow text-gold">
            Contact
          </p>
          <h1
            id="contact-title"
            style={{ "--d": "0.18s" } as React.CSSProperties}
            className="settle mt-5 text-[clamp(3.25rem,8vw,7rem)] leading-[0.92] text-cream"
          >
            Let&rsquo;s <span className="text-gold">connect.</span>
          </h1>
        </div>
        <p
          style={{ "--d": "0.3s" } as React.CSSProperties}
          className="rise-in max-w-[38ch] text-lg leading-relaxed text-cream/75 lg:col-span-4 lg:col-start-9 lg:pb-3"
        >
          Have a question or an opportunity? Tell us what you need, and we&rsquo;ll get back to you.
        </p>
      </div>
    </SectionMotion>
  )
}

/* ───────── WhatsApp card (overlaps the hero) + photo ───────── */

function PrimaryCard() {
  return (
    <SectionMotion aria-label="Message us on WhatsApp" className="relative z-10">
      <div className="shell -mt-28 grid gap-6 lg:-mt-40 lg:grid-cols-12 lg:gap-x-6">
        <div style={{ "--d": "0.4s" } as React.CSSProperties} className="rise-in lg:col-span-7">
          <div className="flex h-full flex-col rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-36px_rgb(7_29_59/0.45)] sm:p-10 lg:p-12">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-whatsapp text-white">
                <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-7" />
              </span>
              <p className="eyebrow text-whatsapp">Fastest way to reach us</p>
            </div>
            <h2 className="mt-8 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]">Message us on WhatsApp</h2>
            <a
              href={`tel:+${SITE.whatsappNumber}`}
              className="group mt-4 inline-flex w-fit items-center gap-3 font-heading text-[clamp(1.625rem,7vw,3.25rem)] leading-none font-semibold whitespace-nowrap text-navy"
            >
              <span className="bg-[linear-gradient(#b07d1e,#b07d1e)] bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-2 transition-[background-size] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:bg-[length:100%_3px]">
                {SITE.whatsappDisplay}
              </span>
              <span className="sr-only"> (call)</span>
              <Phone
                aria-hidden="true"
                strokeWidth={1.75}
                className="hidden size-6 text-gold-large transition-transform duration-200 group-hover:-translate-y-0.5 sm:block"
              />
            </a>
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink/75">
              Contact Okafor&rsquo;s Place directly on WhatsApp. Tell us what you need, and we&rsquo;ll get back to you.
            </p>
            <div className="mt-auto pt-9">
              <a
                href={waLink("general")}
                {...externalLinkProps}
                className={cn(buttonVariants({ variant: "whatsapp", size: "lg" }), "w-full sm:w-auto")}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} />
                Chat on WhatsApp
                <ButtonArrow />
              </a>
            </div>
          </div>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="rise-in relative h-full min-h-[420px] overflow-hidden rounded-[28px] bg-navy">
            <div data-parallax="5" className="absolute inset-x-0 -inset-y-[7%]">
              <Image
                src="/images/hero-abuja-dusk.jpg"
                alt="Guests on a rooftop lounge over Abuja at dusk"
                fill
                sizes="40vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionMotion>
  )
}

/* ───────── What can we help with? ───────── */

function Intents() {
  return (
    <SectionMotion aria-labelledby="intents-title" className="bg-paper pt-24 pb-20 lg:pt-36 lg:pb-28">
      <div className="shell">
        <SectionHeading
          id="intents-title"
          eyebrow="Pick a topic"
          title={
            <>
              What can we <span className="text-gold-large">help with?</span>
            </>
          }
          intro="Each option opens WhatsApp with a message already written. Add your details and send."
        />

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-6">
          {INTENTS.map(({ intent, label, line, icon: Icon }, i) => (
            // [data-rise] on the <li>: the link owns the hover transform.
            <li key={intent} data-rise className={cn("lg:col-span-2", i > 2 && "lg:col-span-3")}>
              <a
                href={waLink(intent)}
                {...externalLinkProps}
                className="group relative isolate flex min-h-16 items-center gap-4 overflow-hidden rounded-[20px] border border-navy/10 bg-white px-5 py-4 transition-[transform,box-shadow,border-color,color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:border-navy hover:text-cream hover:shadow-[0_24px_48px_-24px_rgb(7_29_59/0.45)] focus-visible:text-cream lg:min-h-[200px] lg:flex-col lg:items-start lg:rounded-[24px] lg:p-7"
              >
                {/* navy fill rises from the foot on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-navy transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                />
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream text-gold-text transition-colors duration-300 group-hover:bg-gold group-hover:text-navy group-focus-visible:bg-gold group-focus-visible:text-navy lg:size-12">
                  <Icon aria-hidden="true" strokeWidth={1.75} className="size-5 lg:size-6" />
                </span>
                <span className="flex-1 lg:mt-auto lg:flex-none">
                  <span className="block font-heading text-[1.125rem] leading-tight font-semibold lg:text-[1.5rem]">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate transition-colors duration-300 group-hover:text-cream/70 group-focus-visible:text-cream/70">
                    {line}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-5 shrink-0 text-navy/50 transition-[transform,color] duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-gold lg:absolute lg:top-7 lg:right-7 lg:size-6"
                />
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  )
}

/* ───────── Other ways ───────── */

function OtherWays() {
  return (
    <SectionMotion aria-labelledby="other-title" className="bg-cream py-20 lg:py-28">
      <div className="shell">
        <h2 id="other-title" data-split className="text-[clamp(2rem,3.6vw,3rem)] leading-[1.02]">
          Other ways to reach us
        </h2>
        <div className={cn("mt-10 grid gap-4 sm:grid-cols-2 lg:gap-6", SITE.email && "lg:grid-cols-3")}>
          <div data-rise className="flex gap-5 rounded-[24px] border border-navy/10 bg-white/60 p-7">
            <MapPin aria-hidden="true" strokeWidth={1.5} className="size-7 shrink-0 text-gold-text" />
            <div>
              <h3 className="text-xl leading-tight">Location</h3>
              <p className="mt-1.5 text-[1.0625rem] text-ink/80">Abuja, Nigeria (FCT)</p>
            </div>
          </div>

          {SITE.email ? (
            <div data-rise>
              <a
                href={`mailto:${SITE.email}`}
                className="group flex h-full gap-5 rounded-[24px] border border-navy/10 bg-white/60 p-7 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-navy/30"
              >
                <Mail aria-hidden="true" strokeWidth={1.5} className="size-7 shrink-0 text-gold-text" />
                <span>
                  <span className="block font-heading text-xl leading-tight font-semibold text-navy">Email us</span>
                  <span className="mt-1.5 block text-[1.0625rem] text-ink/80 underline-offset-4 group-hover:underline">
                    {SITE.email}
                  </span>
                </span>
              </a>
            </div>
          ) : null}

          <div data-rise>
            <Link
              href="/register"
              className="group flex h-full items-center justify-between gap-5 rounded-[24px] bg-navy p-7 text-cream transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgb(7_29_59/0.6)]"
            >
              <span>
                <span className="block font-heading text-xl leading-tight font-semibold">Not a member yet?</span>
                <span className="mt-1.5 block text-[1.0625rem] text-cream/75">Pre-register in 30 seconds.</span>
              </span>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold text-navy">
                <ButtonArrow />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </SectionMotion>
  )
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <PrimaryCard />
      <Intents />
      <OtherWays />
    </>
  )
}
