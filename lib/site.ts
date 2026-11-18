export const SITE = {
  name: "Okafor's Place",
  tagline: "Connect. Trade. Discover. Grow.",
  description:
    "A welcoming Abuja community for meaningful connections, business conversations, buying and selling, and guidance for more informed decisions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://okaforsplace.com.ng",
  domain: "okaforsplace.com.ng",
  whatsappNumber: "2349028503017",
  whatsappDisplay: "+234 902 850 3017",
  email: "", // TODO(client): add email; email links stay hidden while this is empty
  location: "Abuja, Nigeria",
} as const

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

/** Pre-filled WhatsApp messages (PRD §9). */
export const WA_MESSAGES = {
  general: "Hello Okafor's Place, I have a question.",
  join: "Hello, I'd like to be added to the Okafor's Place community.",
  enquire: "Hello, I'd like to enquire about a listing on the Okafor's Place marketplace.",
  sell: "Hello, I have a product/service I'd like to list on Okafor's Place.",
  consultation: "Hello, I'd like to request a Middleman Consultancy session.",
} as const

export type WaIntent = keyof typeof WA_MESSAGES

export function waLink(intent: WaIntent | (string & {}) = "general") {
  const message = intent in WA_MESSAGES ? WA_MESSAGES[intent as WaIntent] : intent
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** Props for any link that opens WhatsApp (new tab, no opener). */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const

/** True when `href` is the current page (or a parent section of it). */
export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
}
