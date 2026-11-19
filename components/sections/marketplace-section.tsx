import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { SectionMotion } from "@/components/motion/section-motion"
import { SectionHeading } from "@/components/sections/section-heading"
import { ButtonArrow } from "@/components/ui/button"
import { externalLinkProps, waLink, type WaIntent } from "@/lib/site"
import { cn } from "@/lib/utils"

type Tile = {
  eyebrow: string
  title: string
  text: string
  cta: string
  intent: WaIntent
  img: string
  alt: string
  position: string
}

const TILES: Tile[] = [
  {
    eyebrow: "Browse & discover",
    title: "Find what you’re looking for.",
    text: "Explore products, services and business opportunities shared by the community.",
    cta: "Enquire about listings",
    intent: "enquire",
    // market-fabrics.jpg was dropped here: its fabric carries third-party brand marks.
    img: "/images/market-produce.jpg",
    alt: "A trader arranging peppers at her market stall behind piles of tomatoes",
    position: "object-[50%_68%]",
  },
  {
    eyebrow: "For sellers & businesses",
    title: "Have something to offer?",
    text: "Contact us with your product or service details. Listings can be reviewed before they are shared.",
    cta: "Submit an enquiry",
    intent: "sell",
    img: "/images/shop-owner.jpg",
    alt: "A shop owner smiling behind the counter of her provisions store",
    position: "object-[62%_40%]",
  },
]

/**
 * 03 · Marketplace (PRD §7.2 section 3).
 * Cream ground. Two linked photo tiles (whole tile opens WhatsApp with the matching
 * pre-filled message); on desktop the second sits 64px lower. Photos drift inside their
 * frames on scroll; on hover the tile lifts 2px, its photo zooms 1.03, the action underlines.
 */
export function MarketplaceSection() {
  return (
    <SectionMotion id="marketplace" aria-labelledby="marketplace-title" className="bg-cream py-24 lg:py-40">
      <div className="shell">
        <SectionHeading
          id="marketplace-title"
          eyebrow="03 · Marketplace"
          title={
            <>
              Discover <span className="text-gold-large">opportunities</span>
            </>
          }
          intro="A place to showcase items and services, discover what is available and connect with people."
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:items-start lg:gap-x-6">
          {TILES.map((tile, i) => (
            // [data-rise] lives on the wrapper: the tile itself has a CSS hover transform.
            <div key={tile.title} data-rise className={cn(i === 1 && "lg:mt-16")}>
              <a
                href={waLink(tile.intent)}
                {...externalLinkProps}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-navy/8 bg-[#fffdf8] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5 hover:border-navy/15 hover:shadow-[0_24px_48px_-24px_rgb(7_29_59/0.28)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[#e8dcc4]">
                  <div data-parallax="7" className="absolute inset-x-0 -inset-y-[9%]">
                    <Image
                      src={tile.img}
                      alt={tile.alt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className={cn(
                        "object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03]",
                        tile.position
                      )}
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-cream text-navy opacity-0 shadow-[0_10px_30px_-10px_rgb(7_29_59/0.5)] transition-[opacity,transform] duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 max-sm:opacity-100"
                  >
                    <ArrowUpRight strokeWidth={1.75} className="size-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <p className="eyebrow text-gold-text">{tile.eyebrow}</p>
                  <h3 className="mt-3 text-[1.75rem] leading-[1.08] sm:text-[2.125rem]">{tile.title}</h3>
                  <p className="mt-3 max-w-[44ch] text-[1.0625rem] leading-relaxed text-slate">{tile.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-navy">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1.5px]">
                      {tile.cta}
                    </span>
                    <ButtonArrow />
                    <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Coming soon note (under the first tile on desktop, sitting in the second tile's offset) */}
        <div data-rise className="mt-6 lg:-mt-10 lg:w-[calc(50%-12px)]">
          <p className="flex flex-col gap-3 rounded-[20px] border border-dashed border-navy/25 p-5 text-[0.9375rem] leading-relaxed text-ink/80 sm:flex-row sm:items-center sm:gap-4">
            <span className="eyebrow w-fit shrink-0 rounded-full bg-navy px-3 py-1.5 text-[0.6875rem] text-gold">
              Coming soon
            </span>
            A full searchable marketplace and online listing submissions are on the way.
          </p>
        </div>
      </div>
    </SectionMotion>
  )
}
