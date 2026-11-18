import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
  /** "dark" = for navy backgrounds (cream + gold), "light" = for paper/cream backgrounds */
  tone?: "dark" | "light"
  className?: string
  onClick?: () => void
}

/**
 * Header/footer lockup: the split-"O" mark + "OKAFOR'S PLACE" set in wide-tracked Outfit,
 * as in the design frames. (The full SVG logos in /public/brand carry a tagline that is
 * unreadable at header size, so they're kept for print/OG use.)
 */
export function Logo({ tone = "dark", className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex shrink-0 items-center gap-2.5 rounded-md lg:gap-3", className)}
    >
      <Image
        src={tone === "dark" ? "/brand/mark-on-dark.svg" : "/brand/mark.svg"}
        alt=""
        width={64}
        height={64}
        loading="eager"
        className="size-8 lg:size-9"
      />
      <span
        translate="no"
        className={cn(
          "font-heading text-[0.9375rem] leading-none font-semibold tracking-[0.16em] whitespace-nowrap uppercase lg:text-base",
          tone === "dark" ? "text-cream" : "text-navy"
        )}
      >
        Okafor&rsquo;s Place
      </span>
    </Link>
  )
}
