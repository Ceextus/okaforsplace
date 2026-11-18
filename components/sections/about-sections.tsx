import Image from "next/image"
import { HeartHandshake, MessageCircle, ShieldCheck, TrendingUp, Users } from "lucide-react"

import { SectionMotion } from "@/components/motion/section-motion"
import { ConsultancyDisclaimer } from "@/components/sections/consultancy-disclaimer"
import { SectionHeading } from "@/components/sections/section-heading"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { externalLinkProps, waLink, type WaIntent } from "@/lib/site"
import { cn } from "@/lib/utils"

/* ───────────────────────── Hero ───────────────────────── */

export function AboutHero() {
  return (
    <SectionMotion aria-labelledby="about-title" className="bg-cream pt-32 pb-20 lg:pt-44 lg:pb-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="lg:col-span-7">
            <p style={{ "--d": "0.1s" } as React.CSSProperties} className="rise-in eyebrow text-gold-text">
              About us
            </p>
            <h1
              id="about-title"
              style={{ "--d": "0.18s" } as React.CSSProperties}
              className="settle mt-5 text-[clamp(3rem,7vw,6.5rem)] leading-[0.94] text-navy"
            >
              A place built on <span className="text-gold-large">trust.</span>
            </h1>
          </div>
          <p
            style={{ "--d": "0.3s" } as React.CSSProperties}
            className="rise-in max-w-[40ch] text-lg leading-relaxed text-ink/80 lg:col-span-4 lg:col-start-9 lg:pb-3"
          >
            A welcoming space for meaningful connections, business conversations, buying and selling, and guidance that
            helps you make more informed decisions.
          </p>
        </div>

        {/* Wide photograph (LCP on About): visible at first paint, eager + high priority; drifts on scroll */}
        <div
          style={{ "--d": "0.25s" } as React.CSSProperties}
          className="settle relative mt-12 aspect-[4/3] overflow-hidden rounded-[28px] bg-navy sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/9]"
        >
          <div data-parallax="5" className="absolute inset-x-0 -inset-y-[7%]">
            <Image
              loading="eager"
              fetchPriority="high"
              src="/images/abuja-city-highway.jpg"
              alt="Elevated highway interchange curving through a green city skyline"
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover object-[60%_55%] lg:object-[60%_78%]"
            />
          </div>
        </div>
      </div>
    </SectionMotion>
  )
}

/* ───────────────────────── Our story ───────────────────────── */

export function AboutStory() {
  return (
    <SectionMotion aria-labelledby="story-title" className="bg-paper py-24 lg:py-40">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <p data-rise className="eyebrow text-gold-text">
            Our story
          </p>
          <h2 id="story-title" data-split className="mt-5 text-[clamp(3rem,6.4vw,6rem)] leading-[0.92]">
            Together, <span className="text-gold-large">we grow.</span>
          </h2>
        </div>

        {/*
          TODO(client): founder story + founder photo.
          Placeholder below is built only from facts in the PRD (Abuja; community, marketplace,
          consultancy; trust before transacting). Replace with the client's own words.
        */}
        <div className="flex flex-col gap-6 text-lg leading-relaxed text-ink/85 lg:col-span-6 lg:col-start-7 lg:pt-16">
          <p data-rise>
            Okafor&rsquo;s Place is an Abuja community that brings people, professionals and businesses together &mdash;
            to meet, talk business, buy and sell, and find opportunities worth pursuing.
          </p>
          <p data-rise>
            We started with a simple belief: people do better business when they know who they are dealing with. So
            alongside the community and the marketplace, we offer support with reviewing opportunities and transaction
            details before anyone commits their money.
          </p>
          <p data-rise className="font-heading text-2xl leading-snug font-medium text-navy">
            Trust and peace of mind come first. Everything else grows from there.
          </p>
        </div>
      </div>
    </SectionMotion>
  )
}

/* ───────────────────────── What we do ───────────────────────── */

type Pillar = {
  num: string
  eyebrow: string
  title: string
  body: string
  cta: string
  intent: WaIntent
  img: string
  alt: string
  position: string
  disclaimer?: boolean
}

const PILLARS: Pillar[] = [
  {
    num: "01",
    eyebrow: "Community & networking",
    title: "A place to connect and grow",
    body: "Meet people, exchange ideas, share updates and discover opportunities in a friendly community. Message the administrator on WhatsApp and you can be added.",
    cta: "Ask to join on WhatsApp",
    intent: "join",
    img: "/images/networking-dinner.jpg",
    alt: "Guests seated at round tables during an evening networking dinner",
    position: "object-[55%_60%]",
  },
  {
    num: "02",
    eyebrow: "Marketplace",
    title: "Discover opportunities",
    body: "A place to showcase items and services, discover what is available and connect with people. Sellers send their product or service details, which can be reviewed before they are shared.",
    cta: "Enquire about listings",
    intent: "enquire",
    img: "/images/shop-owner.jpg",
    alt: "A shop owner smiling behind the counter of her provisions store",
    position: "object-[62%_40%]",
  },
  {
    num: "03",
    eyebrow: "The Middleman Consultancy",
    title: "Your bridge to better-informed decisions",
    body: "We help bring buyers and sellers together, facilitate communication and provide support with reviewing opportunities and transaction details before people commit their money.",
    cta: "Request a consultation",
    intent: "consultation",
    // Cropped below the door sign at the top of the original frame.
    img: "/images/consultancy-meeting.jpg",
    alt: "Two men in suits looking over details on a phone together",
    position: "object-[50%_62%]",
    disclaimer: true,
  },
]

export function AboutPillars() {
  return (
    <SectionMotion aria-labelledby="pillars-title" className="bg-cream py-24 lg:py-40">
      <div className="shell">
        <SectionHeading
          id="pillars-title"
          eyebrow="What we do"
          title={
            <>
              Three ways <span className="text-gold-large">we help</span>
            </>
          }
          intro="One community with three parts. Join in where it helps you most."
        />

        <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-32">
          {PILLARS.map((p, i) => (
            <article key={p.num} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-6">
              <div className={cn("lg:col-span-6", i % 2 && "lg:order-2 lg:col-start-7")}>
                <div data-wipe className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-navy">
                  <div data-parallax="6" className="absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      data-wipe-img
                      src={p.img}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={cn("object-cover", p.position)}
                    />
                  </div>
                </div>
              </div>

              <div className={cn("lg:col-span-5", i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
                <p data-rise className="flex items-center gap-3">
                  <span className="font-heading text-sm font-semibold text-gold-large tabular-nums">{p.num}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-gold-large/50" />
                  <span className="eyebrow text-gold-text">{p.eyebrow}</span>
                </p>
                <h3 data-split className="mt-5 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02]">
                  {p.title}
                </h3>
                <p data-rise className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink/80">
                  {p.body}
                </p>
                {p.disclaimer && (
                  <div data-rise className="mt-6">
                    <ConsultancyDisclaimer tone="light" />
                  </div>
                )}
                <div data-rise className="mt-8">
                  <a
                    href={waLink(p.intent)}
                    {...externalLinkProps}
                    className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
                  >
                    <MessageCircle aria-hidden="true" strokeWidth={1.75} />
                    {p.cta}
                    <ButtonArrow />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionMotion>
  )
}

/* ───────────────────────── Our values ───────────────────────── */

const VALUES = [
  {
    icon: Users,
    title: "Community & networking",
    text: "Meet and build valuable connections.",
  },
  {
    icon: TrendingUp,
    title: "Business opportunities",
    text: "Find and share opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Peace & trust",
    text: "A reliable, supportive community.",
  },
  {
    icon: HeartHandshake,
    title: "Meaningful relationships",
    text: "Grow through trusted connections.",
  },
] as const

export function AboutValues() {
  return (
    <SectionMotion aria-labelledby="values-title" className="bg-navy pt-24 pb-16 text-cream lg:pt-40 lg:pb-24">
      <div className="shell">
        <SectionHeading
          id="values-title"
          tone="dark"
          eyebrow="Our values"
          title={
            <>
              What we <span className="text-gold">stand for</span>
            </>
          }
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            // data-rise on the <li>; the card inside owns the hover transform.
            <li key={title} data-rise>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-cream/12 bg-navy-2/40 p-7 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:border-gold/50 hover:bg-navy-2/80 lg:min-h-[300px]">
                <span className="grid size-14 place-items-center rounded-2xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-7" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-7 font-heading text-sm font-semibold text-cream/30 tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-auto pt-10 text-[1.5rem] leading-tight text-cream">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream/70">{text}</p>
                {/* gold line draws along the card's foot on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-x-100"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionMotion>
  )
}
