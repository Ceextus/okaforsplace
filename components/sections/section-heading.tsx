import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  /** e.g. "01 · Community" */
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  /** "dark" for navy grounds */
  tone?: "light" | "dark"
  className?: string
  id?: string
}

/**
 * Numbered editorial heading: eyebrow, then the h2 (left, cols 1–7) and the intro (right,
 * cols 9–12, sitting on the heading's last line) on desktop; stacked on phones.
 * Motion hooks for <SectionMotion>: the h2 splits into rising lines, eyebrow/intro rise.
 */
export function SectionHeading({ eyebrow, title, intro, tone = "light", className, id }: SectionHeadingProps) {
  const dark = tone === "dark"
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6", className)}>
      <div className="lg:col-span-7">
        <p data-rise className={cn("eyebrow", dark ? "text-gold" : "text-gold-text")}>
          {eyebrow}
        </p>
        <h2
          id={id}
          data-split
          className={cn(
            "mt-5 text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[0.98]",
            dark ? "text-cream" : "text-navy"
          )}
        >
          {title}
        </h2>
      </div>
      {intro ? (
        <p
          data-rise
          className={cn(
            "max-w-[38ch] text-lg leading-relaxed lg:col-span-4 lg:col-start-9 lg:pb-2",
            dark ? "text-cream/75" : "text-ink/80"
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
