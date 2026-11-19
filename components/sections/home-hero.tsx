import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Smartphone } from "lucide-react"

import { HeroMotion } from "@/components/sections/hero-motion"
import { externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

const PILLARS = [
  {
    href: "#community",
    num: "01",
    title: "Community & networking",
    line: "Join the WhatsApp community",
    img: "/images/networking-evening-event.jpg",
  },
  {
    href: "#consultancy",
    num: "02",
    title: "Middleman Consultancy",
    line: "Support before you commit money",
    img: "/images/consultancy-documents.jpg",
  },
  {
    href: "#marketplace",
    num: "03",
    title: "Marketplace",
    line: "Enquire, or list what you sell",
    img: "/images/market-produce.jpg",
  },
] as const

function RiseWord({ i, className, children }: { i: number; className?: string; children: React.ReactNode }) {
  return (
    <span className="rise-mask">
      <span className={cn("rise-word", className)} style={{ animationDelay: `${0.1 + i * 0.07}s` }}>
        {children}
      </span>
    </span>
  )
}

/**
 * Home hero — "Abuja After Hours".
 * Full-bleed dusk skyline, a 4-column hairline grid over it (desktop), the headline and an
 * inline pre-register field (bottom-left), the client's rooftop photo as a linked tile, and the
 * three pillars as grid cells along the foot. Motion lives in <HeroMotion>.
 */
export function HomeHero() {
  return (
    <HeroMotion
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy text-cream"
    >
      {/* Photograph + tint (never hidden; settles on load, drifts on scroll) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <div className="hero-zoom absolute inset-0">
            <Image
              src="/images/abuja-skyline-dusk.jpg"
              alt=""
              fill
              sizes="100vw"
              quality={60}
              loading="eager"
              fetchPriority="high"
              className="object-cover object-[50%_65%]"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#071d3b_0%,rgb(7_29_59/0.88)_38%,rgb(7_29_59/0.35)_72%,rgb(7_29_59/0.55)_100%)] lg:bg-[linear-gradient(90deg,rgb(7_29_59/0.94)_0%,rgb(7_29_59/0.72)_42%,rgb(7_29_59/0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 hidden h-72 bg-linear-to-t from-navy/90 to-transparent lg:block" />
      </div>

      {/* Hairline grid (inspired by editorial grid heroes) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="shell grid h-full grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{ "--d": `${0.05 + i * 0.08}s` } as React.CSSProperties}
              className={cn(
                "line-draw border-l border-cream/10 last:border-r",
                i > 1 && "hidden lg:block",
                i === 1 && "border-r lg:border-r-0",
              )}
            />
          ))}
        </div>
      </div>

      <div className="shell relative flex flex-1 flex-col pt-28 lg:pt-28">
        <div className="grid flex-1 lg:grid-cols-4">
          {/* Words + action */}
          <div
            data-hero-content
            className="flex flex-col justify-end pb-[max(2rem,env(safe-area-inset-bottom))] lg:col-span-3 lg:pr-12 lg:pb-12"
          >
            <p
              style={{ "--d": "0.2s" } as React.CSSProperties}
              className="rise-in inline-flex w-fit items-center gap-2.5 rounded-full border border-cream/15 bg-navy/75 py-2 pr-4 pl-3 text-sm font-medium text-cream/90"
            >
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold/70 motion-reduce:hidden" />
                <span className="relative size-2.5 rounded-full bg-gold" />
              </span>
              Launching soon in Abuja, FCT
            </p>

            <h1
              id="hero-title"
              className="mt-6 max-w-[11ch] font-heading text-[clamp(3.25rem,min(7vw,11vh),6.75rem)] leading-[0.95] font-semibold tracking-[-0.015em] text-cream sm:max-w-none"
            >
              {/* Words rise out of masks with CSS alone (.rise-word in globals.css): the LCP
                  element paints at first frame instead of waiting for JS. */}
              <RiseWord i={0}>Connect.</RiseWord> <RiseWord i={1}>Trade.</RiseWord> <br className="hidden sm:block" />
              <RiseWord i={2}>Discover.</RiseWord>{" "}
              <RiseWord i={3} className="text-gold">
                Grow.
              </RiseWord>
            </h1>

            <p
              style={{ "--d": "0.6s" } as React.CSSProperties}
              className="rise-in mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-cream/80 lg:max-w-[40rem] lg:text-lg"
            >
              A welcoming space for meaningful connections, business conversations, buying and selling, and guidance
              that helps you make more informed decisions.
            </p>

            {/* Inline pre-register field: sends the number on to /register (works without JS) */}
            <form
              style={{ "--d": "0.7s" } as React.CSSProperties}
              action="/register"
              method="get"
              className="rise-in mt-7 w-full max-w-[30rem]"
            >
              <label htmlFor="hero-phone" className="mb-2.5 block text-sm font-medium text-cream/75">
                Pre-register with your number. It takes 30 seconds.
              </label>
              <div className="group/field flex h-16 items-center gap-3 rounded-full bg-cream pr-2 pl-5 text-navy shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] transition-shadow duration-200 focus-within:ring-4 focus-within:ring-gold/45">
                <span className="flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-semibold">
                  <Smartphone aria-hidden="true" strokeWidth={1.75} className="size-4.5 text-gold-text" />
                  +234
                </span>
                <span aria-hidden="true" className="h-6 w-px bg-navy/15" />
                <input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="803 123 4567…"
                  className="h-full min-w-0 flex-1 bg-transparent text-base text-navy outline-none placeholder:text-slate focus-visible:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Pre-register with this number"
                  className="group/go grid size-12 shrink-0 place-items-center rounded-full bg-gold text-navy transition-[transform,background-color] duration-150 hover:bg-[#e8b955] active:scale-95"
                >
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={2}
                    className="size-5 transition-transform duration-200 group-hover/go:translate-x-[3px]"
                  />
                </button>
              </div>
            </form>

            <a
              href={waLink("general")}
              {...externalLinkProps}
              style={{ "--d": "0.8s" } as React.CSSProperties}
              className="rise-in group mt-5 inline-flex w-fit items-center gap-2 py-2 text-[0.9375rem] font-semibold text-cream"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
                Or chat with us on WhatsApp
              </span>
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-4.5 text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Client's rooftop photo as a linked tile (desktop) */}
          <a
            href={waLink("join")}
            {...externalLinkProps}
            style={{ "--d": "0.55s" } as React.CSSProperties}
            className="clip-up group relative hidden self-end overflow-hidden lg:block lg:h-[min(46vh,360px)]"
          >
            <Image
              src="/images/hero-abuja-dusk.jpg"
              alt="Guests on a rooftop lounge over Abuja at dusk"
              fill
              sizes="(min-width: 1024px) 25vw, 1px"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-linear-to-t from-navy/95 via-navy/30 to-transparent" />
            <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
              <span>
                <span className="eyebrow block text-gold">Join the community</span>
                <span className="mt-2 block font-heading text-lg leading-tight font-semibold xl:text-[1.375rem]">
                  Ask the admin on WhatsApp
                </span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-navy transition-transform duration-200 group-hover:-translate-y-0.5">
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-5" />
              </span>
            </span>
          </a>
        </div>

        {/* Foot row of grid cells: one fact + the three pillars (desktop) */}
        <div data-hero-row className="hidden h-[168px] grid-cols-4 border-t border-cream/10 lg:grid">
          <div
            style={{ "--d": "0.8s" } as React.CSSProperties}
            className="rise-in flex flex-col justify-between bg-gold p-5 text-navy xl:p-6"
          >
            <span className="eyebrow text-navy/70">Three ways in</span>
            <p className="font-heading text-[1.375rem] leading-[1.08] font-semibold xl:text-[1.75rem]">
              One community, three ways to take part.
            </p>
          </div>

          {PILLARS.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              style={{ "--d": `${0.88 + i * 0.08}s` } as React.CSSProperties}
              className="rise-in group relative isolate flex flex-col justify-between overflow-hidden border-l border-cream/10 p-5 text-cream xl:p-6 transition-colors duration-300 hover:text-navy focus-visible:text-navy"
            >
              {/* cream fill rises from the cell's foot on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="relative size-9 overflow-hidden rounded-full ring-2 ring-cream/20 transition-[box-shadow] group-hover:ring-navy/10">
                    <Image
                      src={p.img}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="eyebrow text-gold transition-colors duration-300 group-hover:text-gold-text">
                    {p.num}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-6 opacity-70 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:opacity-100"
                />
              </span>
              <span>
                <span className="block font-heading text-lg leading-tight font-semibold xl:text-[1.375rem]">
                  {p.title}
                </span>
                <span className="mt-1 block text-sm opacity-75">{p.line}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </HeroMotion>
  )
}
