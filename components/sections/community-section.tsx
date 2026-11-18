import Image from "next/image"
import { MessageCircle } from "lucide-react"

import { SectionMotion } from "@/components/motion/section-motion"
import { SectionHeading } from "@/components/sections/section-heading"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

const ITEMS = [
  {
    title: "Community & networking",
    text: "Connect with people, make friends, share ideas and build useful relationships.",
  },
  {
    title: "Business conversations",
    text: "Discuss ideas, discover opportunities and grow your network.",
  },
  {
    title: "Updates & fun",
    text: "Stay connected through conversations, updates and a welcoming community spirit.",
  },
] as const

/**
 * 01 · Community (PRD §7.2 section 2).
 * Paper ground. Heading row, then a tall photograph that develops from a grey print as it
 * scrolls in (the page's dealt "picture-develops" moment, film look) beside an editorial
 * numbered list and the WhatsApp join panel.
 */
export function CommunitySection() {
  return (
    <SectionMotion id="community" aria-labelledby="community-title" className="bg-paper py-24 lg:py-40">
      <div className="shell">
        <SectionHeading
          id="community-title"
          eyebrow="01 · Community"
          title={
            <>
              A place to connect <span className="text-gold-large">and grow</span>
            </>
          }
          intro="Meet people, exchange ideas, share updates and discover opportunities in a friendly community."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-6">
          {/* Photograph — develops on scroll */}
          <div className="lg:col-span-5">
            <div
              data-develop
              className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-navy lg:sticky lg:top-28"
            >
              <Image
                data-develop-img
                src="/images/networking-evening-event.jpg"
                alt="Two guests in traditional attire talking and smiling at an evening event"
                fill
                sizes="(min-width: 1024px) 56vw, 140vw"
                className="object-cover object-[60%_30%]"
              />
            </div>
          </div>

          {/* Numbered list + join panel */}
          <div className="flex flex-col lg:col-span-6 lg:col-start-7">
            <ol>
              {ITEMS.map((item, i) => (
                <li key={item.title} className="relative py-8 first:pt-0 lg:py-10 lg:first:pt-2">
                  {i > 0 && (
                    <span aria-hidden="true" data-rule className="absolute inset-x-0 top-0 h-px bg-navy/12" />
                  )}
                  <div data-rise className="grid grid-cols-[4.5rem_1fr] gap-x-4 sm:grid-cols-[6rem_1fr]">
                    <span
                      aria-hidden="true"
                      className="font-heading text-[2.75rem] leading-none font-semibold text-gold-large tabular-nums sm:text-[3.5rem]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-[1.5rem] leading-tight sm:text-[1.75rem]">{item.title}</h3>
                      <p className="mt-2 max-w-[42ch] text-[1.0625rem] leading-relaxed text-slate">{item.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <span aria-hidden="true" data-rule className="h-px bg-navy/12" />

            {/* Join panel */}
            <div data-rise className="mt-10 lg:mt-12">
              <div className="flex flex-col gap-6 rounded-[24px] border border-whatsapp/20 bg-[#e6f2ec] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-whatsapp text-white">
                    <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-[1.375rem] leading-tight">Ask to join on WhatsApp</h3>
                    <p className="mt-1.5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink/75">
                      Message the administrator and you can be added to the community.
                    </p>
                  </div>
                </div>
                <a
                  href={waLink("join")}
                  {...externalLinkProps}
                  className={cn(buttonVariants({ variant: "whatsapp" }), "w-full sm:w-auto")}
                >
                  Message the admin
                  <ButtonArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionMotion>
  )
}
