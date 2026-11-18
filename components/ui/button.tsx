import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/*
 * Brand buttons (style guide, "Buttons · all states"):
 * pill shape, lift 2px on hover, press back down, gold focus ring (global :focus-visible).
 * Use `buttonVariants()` on <Link>/<a> for navigation, <Button> for actions.
 * <Button> is a plain <button> (not Base UI's primitive) so importing this file never pulls
 * Base UI into the initial bundle; dialogs/sheets that need Base UI load it lazily.
 */
const buttonVariantsBase = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.125em]",
  {
    variants: {
      variant: {
        /* Primary — gold with navy text */
        default:
          "bg-gold text-navy hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 active:bg-[#e8b955] active:shadow-none",
        /* Navy — used on the gold band */
        navy: "bg-navy text-cream hover:-translate-y-0.5 hover:bg-navy-2 hover:shadow-lift active:translate-y-0 active:shadow-none",
        /* WhatsApp — the only place green is used */
        whatsapp:
          "bg-whatsapp text-white hover:-translate-y-0.5 hover:bg-[#0f744e] hover:shadow-lift active:translate-y-0 active:shadow-none",
        /* Secondary on light — navy outline */
        outline:
          "border-navy/80 bg-transparent text-navy hover:-translate-y-0.5 hover:bg-navy hover:text-cream active:translate-y-0",
        /* Secondary on dark — cream outline */
        "outline-dark":
          "border-cream/40 bg-transparent text-cream hover:-translate-y-0.5 hover:border-cream hover:bg-cream/5 active:translate-y-0",
        ghost: "hover:bg-muted hover:text-foreground",
        /* Text link with an arrow that nudges right */
        link: "rounded-none px-0 text-navy underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 text-[0.9375rem]",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-7 text-base",
        icon: "size-12",
        "icon-sm": "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** cva output passed through `cn` so variant classes override base ones (e.g. border colour). */
function buttonVariants({
  className,
  ...variants
}: VariantProps<typeof buttonVariantsBase> & { className?: string } = {}) {
  return cn(buttonVariantsBase(variants), className)
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariantsBase>) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariantsBase({ variant, size, className }))}
      {...props}
    />
  )
}

/** Arrow that nudges 3px right when its parent button/link is hovered. */
function ButtonArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "size-[1.1em] transition-transform duration-200 ease-out group-hover/button:translate-x-[3px] group-hover:translate-x-[3px]",
        className
      )}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export { Button, ButtonArrow, buttonVariants }
