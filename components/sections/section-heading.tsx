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
  /** h1 when the heading opens the page (e.g. Contact's "What can we help with?") */
  as?: "h1" | "h2"
  /**
   * "scroll" (default): hooks for <SectionMotion> — the heading splits into rising lines,
   * eyebrow/intro rise as they scroll in. "load": for a heading on screen at first paint —
   * CSS entrance only, the heading visible from the first frame (LCP-safe).
   */
  motion?: "scroll" | "load"
}

/**
 * Numbered editorial heading: eyebrow, then the heading (left, cols 1–7) and the intro
 * (right, cols 9–12, sitting on the heading's last line) on desktop; stacked on phones.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  className,
  id,
  as: Heading = "h2",
  motion = "scroll",
}: SectionHeadingProps) {
  const dark = tone === "dark"
  const onLoad = motion === "load"
  const delay = (d: string) => (onLoad ? ({ "--d": d } as React.CSSProperties) : undefined)

  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6", className)}>
      <div className="lg:col-span-7">
        <p
          data-rise={onLoad ? undefined : true}
          style={delay("0.1s")}
          className={cn("eyebrow", onLoad && "rise-in", dark ? "text-gold" : "text-gold-text")}
        >
          {eyebrow}
        </p>
        <Heading
          id={id}
          data-split={onLoad ? undefined : true}
          style={delay("0.18s")}
          className={cn(
            "mt-5 text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[0.98]",
            onLoad && "settle",
            dark ? "text-cream" : "text-navy"
          )}
        >
          {title}
        </Heading>
      </div>
      {intro ? (
        <p
          data-rise={onLoad ? undefined : true}
          style={delay("0.3s")}
          className={cn(
            "max-w-[38ch] text-lg leading-relaxed lg:col-span-4 lg:col-start-9 lg:pb-2",
            onLoad && "rise-in",
            dark ? "text-cream/75" : "text-ink/80"
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}
