import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { externalLinkProps, waLink } from "@/lib/site"

export default function NotFound() {
  return (
    <section className="bg-navy text-cream">
      <div className="shell flex min-h-svh flex-col justify-center pt-32 pb-20 lg:items-center lg:text-center">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="mt-5 text-[2.75rem] font-semibold tracking-[-0.015em] text-cream sm:text-6xl lg:text-[5.5rem] lg:leading-[0.98]">
          This page
          <br />
          wandered <span className="text-gold">off.</span>
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg text-cream/75">
          The link may be old, or the page has moved. Let&rsquo;s get you back to the right place.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Back to home
            <ButtonArrow />
          </Link>
          <a
            href={waLink("general")}
            {...externalLinkProps}
            className={buttonVariants({ variant: "outline-dark", size: "lg" })}
          >
            <MessageCircle aria-hidden="true" strokeWidth={1.75} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
