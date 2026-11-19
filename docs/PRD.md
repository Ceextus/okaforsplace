# Okafor's Place — Product Requirements Document (v1, pre-launch site)

> **For Claude Code:** read this whole file before writing code. Also read `AGENTS.md` (Next.js 16 has breaking changes — check `node_modules/next/dist/docs/` before using any Next API). Build in the order given in [§11 Build plan](#11-build-plan), one milestone at a time, and stop for review after each.

---

## 1. Overview

**Okafor's Place** is an Abuja-based community and business platform. Tagline: **Connect. Trade. Discover. Grow.**

It has three pillars, in this priority order (use it everywhere they're listed — hero tiles, section order and numbering, About, Register, Contact, footer, share image):

| Pillar | What it is today (v1) | Later |
|---|---|---|
| **1. Community & Networking** | A WhatsApp community. People message the administrator to be added. Networking, business conversations, updates and fun. | — |
| **2. The Middleman Consultancy** | Brings buyers and sellers together, facilitates communication, and helps review opportunities and transaction details before people commit money. | — |
| **3. Marketplace** | Enquiry-only. Buyers enquire about listings; sellers send product/service details, which are reviewed before being shared. | Searchable marketplace + online listing submission (out of scope for v1). |

**v1 goal:** a polished pre-launch website that explains the brand, collects **pre-registrations** (stored in Supabase), and routes every other enquiry to **WhatsApp**.

- Domain: `okaforsplace.com.ng`
- WhatsApp: **+234 902 850 3017** → `https://wa.me/2349028503017`
- Email: **TBD — not provided by client yet** (use a single constant so it can be filled in later; hide the email link while it's empty)
- Location: Abuja, Nigeria (FCT)

## 2. Goals & success criteria

1. Visitors understand in under 10 seconds what Okafor's Place is and its three pillars.
2. Visitors can pre-register (name, location, phone) in under 30 seconds on a phone.
3. Every page has a one-tap path to WhatsApp.
4. The site feels premium, trustworthy and local — not a generic template or "AI-made" page.
5. Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

## 3. Audience

- Abuja residents, professionals, traders and small-business owners.
- Mostly **mobile**, often arriving from a WhatsApp link, sometimes on slow mobile data. Design mobile-first; desktop must still look great.

## 4. Scope

### In scope (v1)
1. **Landing page** — `/`
2. **Pre-registration page** — `/register` (name, location, phone → Supabase)
3. **About us** — `/about`
4. **Contact us** — `/contact`
5. Shared header, footer, floating WhatsApp button, 404 page, SEO metadata, favicon/OG image.

### Out of scope (v1)
- Searchable marketplace, listing submission, user accounts/login, admin dashboard (pre-registrations are viewed in the Supabase dashboard), payments, blog, email sending.

## 5. Tech stack (already installed)

| Area | Choice |
|---|---|
| Framework | **Next.js 16.4** (App Router, React 19.3, TypeScript, Server Components by default) |
| Styling | **Tailwind CSS 4** (`app/globals.css`, `@theme`) |
| UI components | **shadcn/ui**, style `base-nova` on **Base UI** (`components.json`). Add components with `npx shadcn@latest add <name>`. Utility `cn` from `@/lib/utils`. |
| Icons | `lucide-react` |
| Animation | **GSAP 3** + `@gsap/react` (`useGSAP`), incl. `ScrollTrigger`. Client Components only. |
| Database | **Supabase** (Postgres) — to be connected; see §8 |
| Hosting | Vercel (assumed) |

Project skills in `.claude/skills/` — use them:
- `design-taste-frontend` — art direction for the pages. Suggested dials: **variance 5, motion 4, density 3** (calm, trustworthy, premium; not flashy).
- `shadcn` — always use the shadcn CLI/components instead of hand-writing UI primitives.
- `web-design-guidelines` — run an audit pass after each page.
- `vercel-react-best-practices` — follow while writing; review before shipping.
- `webapp-testing` — screenshot each page at 390px and 1440px and fix anything broken.

## 6. Brand & design system

### Colours (from the client's draft — keep these)
| Token | Hex | Use |
|---|---|---|
| `navy` | `#071D3B` | Primary brand, header/footer, headings, dark sections |
| `navy-2` | `#123765` | Secondary dark surfaces, hover on navy |
| `gold` | `#F3C96F` | Primary accent, primary buttons (navy text on gold) |
| `gold-deep` | `#D69F37` | Accent text on light backgrounds (eyebrows, highlighted words) |
| `cream` | `#FFF8E9` | Warm light sections, text on navy |
| `paper` | `#F5F7FB` | Page background |
| `ink` | `#12233C` | Body text |
| `muted` | `#617086` | Secondary text |
| `whatsapp` | `#12875B` | WhatsApp buttons only |

Map these into the shadcn CSS variables in `app/globals.css` (`--primary` = navy, `--accent` = gold, `--background` = paper, etc.) so shadcn components inherit the brand. Light mode only for v1. Check contrast: gold is for fills/large text, never small text on white (use `gold-deep` or navy instead).

### Typography
- **Outfit** (headings + logo font) via `next/font/google`, weights 500/600/700.
- **Manrope** (body/UI) via `next/font/google`, weights 400/500/600.
- Replace the default Geist fonts in `app/layout.tsx`. No Inter, no Arial.
- Eyebrow labels: uppercase, small, wide letter-spacing (as in the client draft).

### Logo (done — in `public/brand/`)
| File | Use |
|---|---|
| `logo.svg` | Full horizontal logo on light backgrounds |
| `logo-on-dark.svg` | Full logo on navy (header/footer) |
| `mark.svg`, `mark-on-dark.svg` | Symbol only (mobile header, small spaces) |
| `icon.svg` | App icon; also `app/icon.svg` (favicon) |

Do **not** use emoji as icons or logo (the client draft did — replace with lucide icons and the real logo).

### Imagery
- Hero photo: rooftop lounge over the Abuja skyline at dusk, from the client draft. Extract from `C:\Users\HP\Documents\okafors_place_sections_and_tabs_in_order.html` (embedded base64 JPEG, 2.6 MB), convert to optimised WebP/AVIF in `public/images/`, serve with `next/image`.
- The draft's handshake image is low-res and has a cropped-text artefact — **do not use**. Use licensed stand-ins (Unsplash/Pexels: Nigerian/African professionals, Abuja, marketplace, meetings) and list every stand-in in `public/images/CREDITS.md` so the client can replace them.
- All images: `next/image`, explicit sizes, meaningful `alt`, lazy below the fold, priority on the hero only.

### Motion (GSAP)
- Hero entrance (staggered headline/lead/buttons), gentle scroll reveals on sections, subtle hover micro-interactions.
- Respect `prefers-reduced-motion` (use `gsap.matchMedia()`; show content statically).
- Content must be visible without JS (no SEO/CLS loss) — animate `from` a hidden state only after hydration, or use `autoAlpha` with a no-JS fallback.
- Register plugins once in a client helper (e.g. `lib/gsap.ts`): `gsap.registerPlugin(useGSAP, ScrollTrigger)`.

### Loading states
- **Always skeleton loaders with a shimmer pulse — never spinners or blank space.** (Button submit state may show text like "Registering…" plus disabled state.)

## 7. Pages & content

Copy below is the client's latest wording — use it, tidy grammar lightly, don't invent claims. Every CTA labelled "WhatsApp" opens `wa.me` with a pre-filled message (see §9).

### 7.1 Global layout
- **Header (sticky, navy):** logo (`logo-on-dark.svg`; `mark-on-dark.svg` + "OKAFOR'S PLACE" on small screens) · nav: Home, About, Contact · primary CTA **"Pre-register"** (gold) → `/register`. Mobile: shadcn `Sheet` menu.
- **Footer (navy):** logo, tagline "Connect. Trade. Discover. Grow.", links (Home, About, Contact, Pre-register), "Community · Consultancy · Marketplace", WhatsApp number, email (when set), `okaforsplace.com.ng · © {current year} Okafor's Place`.
- **Floating WhatsApp button** (bottom-right, green, all pages except it must not cover the register form's submit button on mobile).
- **404 page** (`app/not-found.tsx`) in brand style with links home and to WhatsApp.

### 7.2 Landing page — `/`
Sections in order (pillars numbered 01 Community · 02 Consultancy · 03 Marketplace):

1. **Hero**
   - Eyebrow: "Welcome to our community"
   - H1: "Okafor's Place." (or "Connect. Trade. Grow." styled with a gold word — designer's call)
   - Sub: "Connect. Trade. Discover. Grow."
   - Lead: "A welcoming space for meaningful connections, business conversations, buying and selling, and guidance that helps you make more informed decisions."
   - CTAs: **Pre-register now** → `/register` (primary) · **Chat on WhatsApp** (secondary)
   - Small pre-launch note: "We're launching soon — pre-register to be among the first members."
   - Hero image (Abuja rooftop at dusk).
2. **More than a website — "A place to connect and grow"** (pillar 01)
   - Intro: "Meet people, exchange ideas, share updates and discover opportunities in a friendly community."
   - 3 cards:
     - **Community & networking** — "Connect with people, make friends, share ideas and build useful relationships."
     - **Business conversations** — "Discuss ideas, discover opportunities and grow your network."
     - **Updates & fun** — "Stay connected through conversations, updates and a welcoming community spirit."
   - CTA: **Ask to join on WhatsApp** — "Message the administrator and you can be added to the community."
3. **Guidance & facilitation — "The Middleman Consultancy"** (pillar 02)
   - Sub: "Your bridge to better-informed business decisions."
   - Body: "We help bring buyers and sellers together, facilitate communication and provide support with reviewing opportunities and transaction details before people commit their money."
   - **Disclaimer (must appear wherever the consultancy is described, visibly, not hidden):** "The scope of each review will be agreed in advance. Due diligence can reduce uncertainty, but it cannot guarantee an outcome or eliminate every risk."
   - CTA: **Request a consultation** (WhatsApp)
4. **Our approach — "Connect. Review. Proceed with clarity."** (follows the consultancy, same navy chapter)
   - "Clear communication, careful questions and practical support for buyers and sellers."
   - Render as 3 steps: **Connect** → **Review** → **Proceed with clarity** (short one-line description each, derived from the consultancy copy).
5. **Discover opportunities — "Marketplace"** (pillar 03)
   - Intro: "A place to showcase items and services, discover what is available and connect with people."
   - Two cards:
     - **Browse & discover — "Find what you're looking for."** "Explore products, services and business opportunities shared by the community." CTA: **Enquire about listings** (WhatsApp)
     - **For sellers & businesses — "Have something to offer?"** "Contact us with your product or service details. Listings can be reviewed before they are shared." CTA: **Submit an enquiry** (WhatsApp)
   - Small note: "A full searchable marketplace and online listing submissions are coming later."
6. **Pre-register CTA band** — "Be among the first to join Okafor's Place." → **Pre-register** button.
7. **Let's connect — "Have a question or an opportunity?"**
   - "Contact Okafor's Place directly on WhatsApp. Tell us what you need, and we'll get back to you."
   - Direct WhatsApp: +234 902 850 3017 · **Chat with us on WhatsApp** · **Email us** (when email set)

### 7.3 Pre-registration — `/register`
- Heading: "Pre-register for Okafor's Place" · short lead: "We're launching soon. Leave your details and we'll reach out when we open."
- Side panel/aside (desktop) or below form (mobile): what members get (community, consultancy, marketplace — one line each, in that order) + "Prefer WhatsApp? Chat with us".
- **Form** (shadcn `Field`/`Input`/`Button`, labels always visible, no placeholder-only labels):

| Field | Name | Type | Rules |
|---|---|---|---|
| Full name | `full_name` | text, `autocomplete="name"` | required, 2–80 chars, trimmed |
| Location | `location` | text, `autocomplete="address-level2"` | required, 2–80 chars; placeholder "e.g. Wuse 2, Abuja" |
| Phone number | `phone` | tel, `inputmode="tel"`, `autocomplete="tel"` | required, Nigerian number. Accept `0803…`, `803…`, `+234803…`, `234803…`, spaces/dashes. Normalise to E.164 `+234XXXXXXXXXX` (10 digits after 234, first digit 7/8/9). |
| (hidden honeypot) | `company` | text, visually hidden, `tabindex=-1` | must be empty, else silently "succeed" without saving |

- Submit via a **Server Action** with `useActionState`; validate on the server (zod or hand-written) and mirror the rules client-side for instant feedback. Show field-level errors with `aria-describedby`/`aria-invalid`.
- Pending state: button disabled, text "Registering…".
- **Success:** replace the form with a confirmation: "Thank you, {first name}! You're on the list. We'll contact you on {phone} when we launch." + **Join the WhatsApp community** CTA + link home.
- **Already registered** (unique phone): friendly message "This number is already on the list — we'll be in touch." (treat as success-ish, not an error).
- **Server error:** "Something went wrong. Please try again or message us on WhatsApp." with WhatsApp link. Never expose raw DB errors.
- Consent line under the button: "By pre-registering you agree that Okafor's Place may contact you about the launch." (No marketing pre-ticked boxes.)

### 7.4 About us — `/about`
- Hero: "About Okafor's Place" · "A welcoming space for meaningful connections, business conversations, buying and selling, and guidance that helps you make more informed decisions."
- **Our story / why we exist** — Abuja community bringing people, professionals and businesses together; trust and peace of mind before transacting. *(Client to supply founder story — use a clearly marked short placeholder paragraph built only from facts in this PRD; add an HTML comment `TODO(client): founder story`.)*
- **What we do** — the three pillars in more depth, in priority order (Community, Consultancy, Marketplace; reuse copy from §7.2 sections 2, 3 and 5), each with a CTA.
- **Our values** — Community & networking · Business opportunities · Peace & trust · Meaningful relationships (from client draft: "Meet and build valuable connections", "Find and share opportunities", "A reliable, supportive community", "Grow through trusted connections").
- **Our approach** — Connect → Review → Proceed with clarity (+ consultancy disclaimer).
- CTA band → `/register`.

### 7.5 Contact us — `/contact`
- Heading: "Let's connect" · "Have a question or an opportunity? Tell us what you need, and we'll get back to you."
- **Primary card:** WhatsApp +234 902 850 3017 — big **Chat on WhatsApp** button; number shown as `tel:` link too.
- **Quick-intent buttons** (each opens WhatsApp with its pre-filled message, §9): Join the community · Request a consultation · Enquire about a listing · Sell a product or service · General question.
- Email card (only when email constant is set).
- Location: "Abuja, Nigeria" (no map embed in v1).
- No contact form in v1 (WhatsApp is the channel).

## 8. Supabase (pre-registrations)

### 8.1 Table — run in Supabase SQL editor (save as `supabase/migrations/0001_pre_registrations.sql`)
```sql
create table if not exists public.pre_registrations (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null check (char_length(full_name) between 2 and 80),
  location    text not null check (char_length(location) between 2 and 80),
  phone       text not null unique check (phone ~ '^\+234[789][01]\d{8}$'),
  source      text not null default 'website',
  user_agent  text,
  created_at  timestamptz not null default now()
);

-- Lock the table down: RLS on, no policies for anon/authenticated.
-- Only the server (service role) can insert; only the dashboard can read.
alter table public.pre_registrations enable row level security;

create index if not exists pre_registrations_created_at_idx
  on public.pre_registrations (created_at desc);
```

### 8.2 Access pattern
- Insert **only from the Server Action** using a server-only Supabase client created with the **service role key** (`import 'server-only'` in `lib/supabase/server.ts`). Never ship the service key to the browser; no `NEXT_PUBLIC_` prefix on it.
- Install: `npm i @supabase/supabase-js server-only` (no auth helpers needed — no login in v1).
- Handle Postgres unique violation code `23505` → "already registered" message.
- Basic abuse protection: honeypot field + simple per-IP rate limit (e.g. max 5 submissions / 10 min, in-memory is acceptable for v1; note it resets per serverless instance).

### 8.3 Environment variables (`.env.local`, and in Vercel)
```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
NEXT_PUBLIC_SITE_URL=https://okaforsplace.com.ng
```
Provide `.env.example` with the same keys and empty values. `.env*.local` must stay git-ignored.

### 8.4 Viewing / exporting
The client views and exports (CSV) registrations from the Supabase Table Editor. No admin UI in v1.

## 9. WhatsApp links

Create one helper, e.g. `lib/site.ts`:
```ts
export const SITE = {
  name: "Okafor's Place",
  tagline: "Connect. Trade. Discover. Grow.",
  url: "https://okaforsplace.com.ng",
  whatsappNumber: "2349028503017",
  whatsappDisplay: "+234 902 850 3017",
  email: "", // TODO(client): add email; hide email links while empty
  location: "Abuja, Nigeria",
};
export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
```
Pre-filled messages:
| Intent | Message |
|---|---|
| General | "Hello Okafor's Place, I have a question." |
| Join community | "Hello, I'd like to be added to the Okafor's Place community." |
| Enquire listing | "Hello, I'd like to enquire about a listing on the Okafor's Place marketplace." |
| Sell | "Hello, I have a product/service I'd like to list on Okafor's Place." |
| Consultation | "Hello, I'd like to request a Middleman Consultancy session." |

WhatsApp links open in a new tab with `rel="noopener noreferrer"`.

## 10. Non-functional requirements

- **SEO:** per-page `metadata` (title template `%s | Okafor's Place`, descriptions), Open Graph + Twitter image (`app/opengraph-image` using the logo on navy), `sitemap.ts`, `robots.ts`, `metadataBase` from `NEXT_PUBLIC_SITE_URL`, `lang="en"`. JSON-LD `Organization` on home (name, url, logo, contactPoint with WhatsApp number, areaServed Abuja).
- **Accessibility:** WCAG 2.1 AA. Semantic landmarks, one H1 per page, visible focus rings, 44px tap targets, labelled icon buttons, form errors announced, colour contrast ≥ 4.5:1 for body text, reduced-motion respected.
- **Performance:** Server Components by default; client components only for animation, mobile menu and the form. Hero image ≤ 200 KB (AVIF/WebP). No layout shift from fonts (`next/font`) or images.
- **Responsive:** test at 360, 390, 768, 1024, 1440 px. No horizontal scroll.
- **Code quality:** TypeScript strict, ESLint clean, `npm run build` passes. Keep components small; shared sections in `components/sections/`, layout parts in `components/layout/`.

## 11. Build plan

Stop after each milestone for review.

1. **Foundation** — fonts, brand tokens in `globals.css` (shadcn variables mapped to brand), `lib/site.ts`, `lib/gsap.ts`, header (with mobile Sheet), footer, floating WhatsApp button, 404, base metadata. Extract & optimise hero image.
2. **Landing page** — all sections in §7.2 with GSAP entrance + scroll reveals.
3. **Pre-registration** — UI + client validation + Server Action; Supabase client; SQL migration file; `.env.example`. Works end-to-end once env vars are set (show a clear dev-only message if they are missing).
4. **About & Contact** pages.
5. **Polish** — SEO files, OG image, JSON-LD, `web-design-guidelines` audit, `vercel-react-best-practices` review, `webapp-testing` screenshots at 390 & 1440, Lighthouse check, fix everything.

## 12. Acceptance checklist

- [ ] All four pages built, linked from header/footer, responsive, no horizontal scroll.
- [ ] Pre-registration saves a row in Supabase with phone normalised to `+234…`; duplicate phone shows the friendly message; invalid input shows field errors; honeypot submissions are not saved.
- [ ] Service role key never appears in client bundles (`grep` the `.next/static` output).
- [ ] Consultancy disclaimer visible on Landing and About.
- [ ] Every WhatsApp CTA opens the correct pre-filled message.
- [ ] Email links hidden while `SITE.email` is empty.
- [ ] Reduced-motion users see no animation; content visible without JS.
- [ ] Skeleton loaders (shimmer) used for any loading UI; no spinners.
- [ ] `npm run build` and `npm run lint` pass; Lighthouse targets in §2 met.

## 13. Open questions for the client

1. **Email address** for "Email us".
2. **Founder/story** text and photo for About.
3. Should pre-registration also ask **what they're interested in** (Community / Consultancy / Marketplace)? (Not built in v1 unless confirmed — easy to add a `interests text[]` column.)
4. **Location:** free text (current plan) or a dropdown of Abuja areas / Nigerian states?
5. Real **photos** to replace stand-ins (community events, the team, Abuja).
6. **Launch date** — show a countdown on the landing page?
7. Logo approval (`public/brand/`).
