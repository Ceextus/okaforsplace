# Claude Design prompt — Okafor's Place (4 pages, mobile-first)

> Paste everything between the two lines into Claude Design. Attach these files with it:
> `public/brand/logo.svg`, `public/brand/logo-on-dark.svg`, `public/brand/mark.svg`, `public/brand/icon.svg`, and the hero photo `public/images/hero-abuja-dusk.jpg` (rooftop lounge over Abuja at dusk, extracted from the client's draft HTML).

---

Design a complete, production-quality website for **Okafor's Place** — 4 pages, each designed **first at mobile (390 × 844)** and then at **desktop (1440 wide)**. This is a showcase project: it must look like a 2026 studio-made site (the calibre of an Awwwards "Mobile Excellence" honourable mention), classy and confident, never like a template or an AI-generated page. It will be built in **Next.js 16 + Tailwind CSS 4 + shadcn/ui (Base UI, "base-nova" style) + GSAP**, so every component and animation must be realistic to build with those tools.

## 1. The brand in one paragraph
Okafor's Place is an Abuja (Nigeria) community and business platform. Tagline: **"Connect. Trade. Discover. Grow."** Three pillars: (1) **Community & Networking** — a WhatsApp community you join by messaging the administrator; (2) **Marketplace** — enquiry-only for now: buyers enquire about listings, sellers submit details that are reviewed before sharing; (3) **The Middleman Consultancy** — brings buyers and sellers together, facilitates communication, and helps review opportunities and transaction details before people commit money. The site is **pre-launch**: its main job is to collect pre-registrations and send every other enquiry to WhatsApp (+234 902 850 3017). The feeling: **trusted, warm, premium, local, calm confidence** — like a private members' club for business people, but welcoming, not exclusive.

## 2. Art direction
- **Direction name:** "Abuja After Hours" — deep navy evenings, warm gold light, cream paper. Editorial, spacious, quietly luxurious. Think of a premium private bank's site crossed with a modern hospitality brand, not a SaaS startup.
- **Composition:** one idea per screen. Big, confident typography; generous whitespace; strict 4-column mobile grid / 12-column desktop grid with consistent edges. Mix full-bleed photo moments with contained editorial blocks. Asymmetry is allowed on desktop (e.g. headline left, image offset right, overlapping a section edge) but stays orderly.
- **Taste dials:** design variance **5/10**, motion intensity **4/10**, visual density **3/10** — calm, airy, intentional.
- **2026 cues to use:** oversized display type with one gold-highlighted word; warm dark sections that make the gold glow; real photography with soft rounded corners (20–28px) and subtle grain-free shadows; thin hairline dividers; numbered editorial sections ("01 — Community"); pill buttons; small uppercase eyebrows with wide tracking; sticky, thumb-reachable actions on mobile; tasteful scroll-reveal choreography; content that answers "what is this and what do I do" within the first screen.
- **Do NOT use:** purple/blue gradients, glassmorphism everywhere, neon glows, 3D blobs, particle/shader backgrounds, generic stock "laptop on desk" images, emoji as icons, three identical feature cards with icons in circles as the only layout idea, centered-everything stacks, Inter or Arial, cartoon illustrations, fake testimonials, fake statistics, fake member counts, or pricing tables.

## 3. Design tokens (use exactly)
**Colours**
| Token | Hex | Use |
|---|---|---|
| Navy | `#071D3B` | Primary brand, dark sections, header/footer, headings on light |
| Navy 2 | `#123765` | Raised surfaces on navy, hover |
| Gold | `#F3C96F` | Primary buttons (navy text), highlights, the accent |
| Gold deep | `#D69F37` | Gold text on light backgrounds (eyebrows, highlighted word) |
| Cream | `#FFF8E9` | Warm light sections; text on navy |
| Paper | `#F5F7FB` | Default page background |
| Ink | `#12233C` | Body text |
| Muted | `#617086` | Secondary text |
| WhatsApp green | `#12875B` | WhatsApp buttons only |
| Hairline | `#071D3B` at 10% | Dividers, card borders |

Never put small gold text on white/cream (fails contrast) — use Gold deep or Navy. Body text contrast ≥ 4.5:1.

**Typography**
- Display & headings: **Outfit** (600/700), tight tracking (−0.03em to −0.045em), line-height 0.95–1.05 for display.
- Body & UI: **Manrope** (400/500/600), line-height 1.55–1.65.
- Mobile scale: display 44–52px · H2 32–36px · H3 22px · body 16–17px · small 14px · eyebrow 11–12px uppercase, tracking 0.16em.
- Desktop scale: display 88–112px · H2 52–60px · H3 26px · body 18px.
- Max line length 60–68 characters.

**Shape & spacing**
- Radius: buttons full pill; cards 20px mobile / 28px desktop; inputs 14px.
- Spacing base 4px. Section padding: 72–88px mobile, 128–160px desktop. Side gutter 20px mobile, 64–80px desktop, max content width 1240px.
- Shadows: very soft, navy-tinted (`0 20px 50px -20px rgba(7,29,59,.25)`), used sparingly.

**Logo** (attached SVGs): a solid "O" split diagonally into a navy half and a gold half, slightly offset — two sides meeting. Use `logo-on-dark.svg` in the navy header/footer, `mark.svg`/`mark-on-dark.svg` where space is tight. Do not redraw or restyle it.

**Icons:** Lucide line icons, 1.5px stroke, 20–24px. WhatsApp uses its official glyph only on WhatsApp buttons.

## 4. Mobile-first rules (non-negotiable)
Design every page at **390px first**; desktop is an expansion, not the other way round.
1. **Thumb zone:** primary actions live in the bottom third. On mobile, show a **sticky bottom action bar** (safe-area aware, 64px + inset) with two buttons: **"Pre-register"** (gold, wide) and a **WhatsApp** icon button (green, square-ish pill). It slides away while scrolling down and returns on scroll up; it hides on the Register page while the form's own submit button is visible.
2. **Header on mobile:** 60px, navy, logo mark + wordmark left, a labelled **"Menu"** button right (not a bare hamburger). Menu opens a **full-height bottom sheet** (shadcn Sheet from the bottom) with large 56px nav rows (Home, About, Contact, Pre-register), WhatsApp number, and close button reachable at the bottom.
3. **Tap targets ≥ 48px**, 8px minimum gap between them. No hover-only information.
4. **Type never smaller than 14px**; body 16px+ (prevents iOS zoom on inputs — inputs must be 16px).
5. **No horizontal scroll** at 360px. Horizontal carousels allowed only with visible peeking next card and snap points, never for critical info.
6. **First screen must show:** what Okafor's Place is, the tagline, and the "Pre-register" action — without scrolling, at 390 × 844.
7. **Fast on Nigerian mobile data:** one hero photo per page, everything else lightweight; no autoplay video; no heavy effects.
8. Forms: one column, labels above fields, correct mobile keyboards (tel for phone), large inputs (56px tall), errors inline under each field.
9. Respect reduced motion: every animation has a static equivalent.

## 5. Signature moments (what makes it impressive)
Keep the site calm, but give it **three memorable, buildable moments**:
1. **"The Meeting" logo intro** — on first load of the home hero, the two halves of the logo "O" slide in from opposite sides and lock together (≈900ms, GSAP, power3.out), then the headline words rise in with a soft stagger. Plays once per session. This is the brand story in one second: two sides meeting.
2. **"Connect → Review → Proceed" approach line** — in the Our Approach section, a thin gold line draws itself down (mobile, vertical) / across (desktop, horizontal) as the user scrolls, lighting each numbered step as it arrives (GSAP ScrollTrigger, scrub).
3. **Pre-registration success** — after submitting, the form card flips to a confirmation where the logo "O" closes into a complete ring and a short gold confetti-free shimmer passes over "You're on the list." Elegant, not childish.
Everything else: quiet micro-interactions — buttons lift 2px with a shadow on hover, arrows nudge 3px right, cards' images zoom 1.03× slowly, links underline from left.

## 6. Global components
- **Header (desktop):** 76px, navy with a subtle bottom hairline, becomes slightly translucent + blurred after scrolling 40px. Logo left · nav centre (Home, About, Contact) · right: WhatsApp text link with number + gold **"Pre-register"** pill.
- **Footer:** navy, large faint "Connect. Trade. Discover. Grow." set in huge Outfit as a typographic band at the top of the footer (desktop: one line spanning the width; mobile: stacked 4 lines), then logo, short blurb, link columns (Explore: Home/About/Contact/Pre-register · Reach us: WhatsApp, Email, Abuja, Nigeria · Pillars: Community/Marketplace/Consultancy), bottom row "okaforsplace.com.ng · © 2026 Okafor's Place". Mobile: accordions are NOT needed — keep simple stacked lists.
- **Buttons:** Primary (gold bg, navy text), Secondary (navy outline on light / cream outline on dark), WhatsApp (green bg, white text, glyph), Text link with arrow. States: default, hover, focus-visible (2px gold ring with offset), pressed, disabled, loading ("Registering…" text — no spinners).
- **Loading:** any loading area uses **skeleton blocks with a shimmer pulse**, never spinners.
- **Eyebrow + numbered section header** pattern: "01 · COMMUNITY" small uppercase gold-deep, then the H2.

## 7. Pages — design each at 390px and 1440px

### Page 1 — Home `/`
1. **Hero (navy, full-height on mobile minus header)**
   - Mobile: eyebrow "WELCOME TO OUR COMMUNITY" · display headline **"Connect. Trade. Discover. *Grow.*"** stacked one word per line, "Grow." in gold · lead: "A welcoming space for meaningful connections, business conversations, buying and selling, and guidance that helps you make more informed decisions." · buttons stacked full-width: **Pre-register now** (gold) / **Chat on WhatsApp** (outline) · small cream note with a pulsing gold dot: "Launching soon in Abuja — pre-register to be among the first members." · the dusk rooftop photo sits beneath as a rounded card that bleeds slightly off the bottom into the next section.
   - Desktop: 12-col split — headline in cols 1–7 (display 104px, two lines: "Connect. Trade." / "Discover. *Grow.*"), photo cols 8–12 tall and rounded, overlapping the section's bottom edge; logo-meeting intro plays above the eyebrow.
2. **01 · Community — "A place to connect and grow"** (paper bg)
   - Intro: "Meet people, exchange ideas, share updates and discover opportunities in a friendly community."
   - Three pillars as an **editorial list, not boxed cards**: big number, title, one line, hairline between. Items: *Community & networking* — "Connect with people, make friends, share ideas and build useful relationships." · *Business conversations* — "Discuss ideas, discover opportunities and grow your network." · *Updates & fun* — "Stay connected through conversations, updates and a welcoming community spirit."
   - A soft green-tinted panel: WhatsApp glyph, "Ask to join on WhatsApp" + "Message the administrator and you can be added to the community." + green button.
   - Desktop: list in cols 1–7, a tall portrait photo of people networking at an evening event in cols 8–12.
3. **02 · Marketplace — "Discover opportunities"** (cream bg)
   - Intro: "A place to showcase items and services, discover what is available and connect with people."
   - Two large tiles: **Browse & discover — "Find what you're looking for."** "Explore products, services and business opportunities shared by the community." → *Enquire about listings* · **For sellers & businesses — "Have something to offer?"** "Contact us with your product or service details. Listings can be reviewed before they are shared." → *Submit an enquiry*. Each tile has a photo top (open market / small business owner).
   - Mobile: tiles stacked; desktop: side by side, second tile offset 64px lower.
   - Small "Coming soon" chip: "A full searchable marketplace and online listings are on the way."
4. **03 · Consultancy — "The Middleman Consultancy"** (navy bg, the premium moment)
   - Sub: "Your bridge to better-informed business decisions."
   - Body: "We help bring buyers and sellers together, facilitate communication and provide support with reviewing opportunities and transaction details before people commit their money."
   - A clearly visible bordered note (not tiny grey legal text): "The scope of each review will be agreed in advance. Due diligence can reduce uncertainty, but it cannot guarantee an outcome or eliminate every risk."
   - Button: **Request a consultation** (gold).
   - Desktop: photo (two professionals reviewing documents) cols 1–5, text cols 7–12.
5. **Our approach — "Connect. Review. Proceed with clarity."** (navy continues, then fades to paper)
   - "Clear communication, careful questions and practical support for buyers and sellers."
   - Three numbered steps on the self-drawing gold line (signature moment 2): **Connect** — we introduce the right buyer and seller. **Review** — we ask careful questions and look at the details with you. **Proceed with clarity** — you decide with a clearer picture.
6. **Pre-register band** (gold bg, navy text) — "Be among the first to join Okafor's Place." + navy button **Pre-register** + "It takes 30 seconds."
7. **Let's connect** (paper) — "Have a question or an opportunity?" "Contact Okafor's Place directly on WhatsApp. Tell us what you need, and we'll get back to you." Big tappable number "+234 902 850 3017", **Chat with us on WhatsApp**, **Email us**.
8. Footer.

### Page 2 — Pre-register `/register`
- **Mobile:** short navy top band with eyebrow "PRE-REGISTRATION", H1 "Be first through the door.", lead "We're launching soon. Leave your details and we'll reach out when we open." Then a cream **form card** that rises up over the band (negative margin, 28px top radius — like a bottom sheet):
  - Full name (autocomplete name) · Location (placeholder "e.g. Wuse 2, Abuja") · Phone number with a fixed **🇳🇬 +234** prefix segment and tel keyboard (accepts 0803… or 803…).
  - Full-width gold **Pre-register** button, consent line under it: "By pre-registering you agree that Okafor's Place may contact you about the launch."
  - Below the card: "What you'll get" — three compact rows (Community, Marketplace, Consultancy) and "Prefer WhatsApp? Chat with us →".
- **Desktop:** two columns — left (cols 1–5): navy panel, H1, lead, "What you'll get" list, the dusk photo small at the bottom; right (cols 7–12): the form card, vertically centred.
- **Design all states:** empty · focused field · inline error ("Enter a valid Nigerian phone number") · submitting ("Registering…", disabled) · **success** (signature moment 3: "Thank you, Ada! You're on the list. We'll contact you on +234 803 123 4567 when we launch." + **Join the WhatsApp community** + Back home) · **already registered** ("This number is already on the list — we'll be in touch.") · server error with WhatsApp fallback.

### Page 3 — About `/about`
1. **Hero (cream):** eyebrow "ABOUT US" · H1 "A place built on *trust.*" (gold-deep word) · lead "A welcoming space for meaningful connections, business conversations, buying and selling, and guidance that helps you make more informed decisions." · wide rounded photo of Abuja below.
2. **Our story** — editorial two-column on desktop (big pull-quote left: "Together, we grow." / story text right); single column on mobile. Story placeholder text clearly marked for the client's founder story; include a founder portrait placeholder (grey rounded rect labelled "Founder photo").
3. **What we do** — the three pillars as large alternating rows (image + text, alternating sides on desktop; image-above-text on mobile), each with its CTA.
4. **Our values** (navy) — 2×2 grid on mobile, 4 across on desktop, each with a Lucide icon in gold, title, one line: *Community & networking* — "Meet and build valuable connections." · *Business opportunities* — "Find and share opportunities." · *Peace & trust* — "A reliable, supportive community." · *Meaningful relationships* — "Grow through trusted connections."
5. **Our approach** — compact version of Connect → Review → Proceed + the consultancy note.
6. Pre-register band + footer.

### Page 4 — Contact `/contact`
1. **Hero (navy, short):** eyebrow "CONTACT" · H1 "Let's connect." · lead "Have a question or an opportunity? Tell us what you need, and we'll get back to you."
2. **Primary WhatsApp card** (overlapping the hero edge): green glyph, "Fastest reply on WhatsApp", the number large and tappable, **Chat on WhatsApp** full-width on mobile.
3. **"What can we help with?"** — five large intent rows/tiles, each opens WhatsApp with a pre-filled message: Join the community · Enquire about a listing · Sell a product or service · Request a consultation · General question. Mobile: full-width 64px rows with icon, label, arrow. Desktop: 3 + 2 grid of tiles.
4. **Other ways** — Email card (address TBD; design it with "hello@okaforsplace.com.ng" as placeholder), Location card "Abuja, Nigeria (FCT)", Hours card "We usually reply within a few hours."
5. Footer.

### Also design
- **404 page:** navy, the logo halves apart (not meeting), "This page wandered off." + Home and WhatsApp buttons.
- **Mobile menu sheet** open state.
- **Sticky mobile action bar** shown on every page.

## 8. Motion spec (GSAP — keep it buildable)
- Page load: header fades in; hero elements rise 24px + fade, stagger 0.08s, ease power3.out, total under 1.2s.
- Scroll reveals: sections' children rise 16–24px and fade in once at 80% viewport; images unmask with a clip-path from 8% inset to 0.
- Approach line: ScrollTrigger scrub.
- Hover: 200ms, ease-out. No parallax on mobile. No scroll-jacking. No cursor followers.
- `prefers-reduced-motion`: show everything static.

## 9. Imagery direction
Real-looking photography of **Nigerian / Abuja** people and places: professionals networking at an evening rooftop event, a small-business owner in her shop, an open market with fabrics and produce, two people reviewing documents at a café table, Abuja skyline with Aso Rock at golden hour. Warm, natural light, slightly cinematic grade toward navy shadows and gold highlights. Use the attached dusk rooftop photo as the home hero. No obvious AI artefacts, no handshake close-ups, no stock-cliché office shots.

## 10. Accessibility & quality
WCAG 2.1 AA: contrast, visible focus rings, one H1 per page, logical heading order, labelled icon buttons, form errors tied to fields, 48px targets, alt text for every image. Content readable without animation.

## 11. Deliverables
For each of the 4 pages (+ 404): a **390px mobile** frame and a **1440px desktop** frame, plus the key states listed (menu open, form states, success). Include a small style-guide frame: colours, type scale, buttons (all states), inputs (all states), cards, eyebrow/section header, skeleton loader. Use real copy from this prompt everywhere — no lorem ipsum.

---

## Sources used for the 2026 direction
- [DesignRush — Web Design Trends 2026](https://www.designrush.com/agency/website-design-development/trends/web-design-trends)
- [Muzli — Landing page design trends 2026](https://store.muz.li/articles/landing-page-design-trends-2026)
- [Graphic Design Junction — Landing Page Design Trends 2026](https://graphicdesignjunction.com/2026/01/landing-page-design-trends-2026/)
- [Zoho — Landing page design trends](https://www.zoho.com/landingpage/landing-page-design-trends.html)
- [Line25 — Web Design Trends 2026](https://line25.com/articles/web-design-trends-2026/)
- [Hostinger — Web design trends](https://www.hostinger.com/uk/tutorials/web-design-trends/)
- [StudioMeyer — Mobile-first design 2026](https://studiomeyer.io/en/blog/mobile-first-design-2026)
- [We Interactive — Mobile-first best practices 2026](https://we-interactive.com/mobile-first-web-design-best-practices-a-strategic-guide-for-2026/)
- [Awwwards — judging criteria incl. Mobile](https://www.awwwards.com/annual-awards/)
