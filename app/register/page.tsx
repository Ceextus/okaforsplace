import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight, Handshake, MessageCircle, Store, Users } from "lucide-react"

import { SectionMotion } from "@/components/motion/section-motion"
import { RegisterForm } from "@/components/register/register-form"
import { externalLinkProps, waLink } from "@/lib/site"

export const metadata: Metadata = {
  title: "Pre-register",
  description: "We're launching soon. Pre-register for Okafor's Place and we'll reach out when we open.",
}

const PERKS = [
  { icon: Users, title: "Community", text: "Join the WhatsApp community for networking, updates and fun." },
  { icon: Store, title: "Marketplace", text: "Enquire about listings, or share what you sell." },
  { icon: Handshake, title: "Consultancy", text: "Support reviewing opportunities before you commit money." },
] as const

function Perks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p data-rise className="eyebrow text-gold">
        What you&rsquo;ll get
      </p>
      <ul className="mt-5">
        {PERKS.map(({ icon: Icon, title, text }) => (
          <li key={title} data-rise className="flex gap-4 border-t border-cream/12 py-4 last:border-b">
            <Icon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-6 shrink-0 text-gold" />
            <p className="text-[0.9375rem] leading-relaxed text-cream/75">
              <span className="block font-heading text-lg font-semibold text-cream">{title}</span>
              {text}
            </p>
          </li>
        ))}
      </ul>
      <a
        data-rise
        href={waLink("join")}
        {...externalLinkProps}
        className="group mt-6 inline-flex items-center gap-2 py-2 font-semibold text-cream"
      >
        <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-5 text-gold" />
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
          Prefer WhatsApp? Chat with us
        </span>
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-4 text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <SectionMotion aria-labelledby="register-title" className="relative isolate overflow-hidden bg-navy text-cream">
      <div
        aria-hidden="true"
        className="absolute -top-48 -left-40 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(243_201_111/0.12),transparent)]"
      />
      <div className="shell grid gap-12 pt-32 pb-20 lg:grid-cols-12 lg:gap-x-6 lg:pt-40 lg:pb-32">
        {/* Left: heading, perks, photo */}
        <div className="lg:col-span-5">
          <p style={{ "--d": "0.1s" } as React.CSSProperties} className="rise-in eyebrow text-gold">
            Pre-registration
          </p>
          <h1
            id="register-title"
            style={{ "--d": "0.18s" } as React.CSSProperties}
            className="settle mt-5 text-[clamp(2.75rem,5.4vw,5rem)] leading-[0.96] text-cream"
          >
            Be first through <span className="text-gold">the door.</span>
          </h1>
          <p
            style={{ "--d": "0.3s" } as React.CSSProperties}
            className="rise-in mt-6 max-w-[40ch] text-lg leading-relaxed text-cream/75"
          >
            We&rsquo;re launching soon. Leave your details and we&rsquo;ll reach out when we open.
          </p>

          <Perks className="mt-12 hidden lg:block" />

          <div data-wipe className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[20px] lg:block">
            <Image
              data-wipe-img
              src="/images/hero-abuja-dusk.jpg"
              alt="Guests on a rooftop lounge over Abuja at dusk"
              fill
              sizes="(min-width: 1024px) 34vw, 1px"
              className="object-cover object-[50%_60%]"
            />
          </div>
        </div>

        {/* Right: the form card */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div style={{ "--d": "0.35s" } as React.CSSProperties} className="rise-in lg:sticky lg:top-28">
            <div className="rounded-[28px] bg-cream p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-10">
              <RegisterForm />
            </div>
          </div>
        </div>

        <Perks className="lg:hidden" />
      </div>
    </SectionMotion>
  )
}
