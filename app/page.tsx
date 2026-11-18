import { ApproachSection } from "@/components/sections/approach-section"
import { CommunitySection } from "@/components/sections/community-section"
import { ConnectSection } from "@/components/sections/connect-section"
import { ConsultancySection } from "@/components/sections/consultancy-section"
import { HomeHero } from "@/components/sections/home-hero"
import { MarketplaceSection } from "@/components/sections/marketplace-section"
import { RegisterBand } from "@/components/sections/register-band"
import { SITE } from "@/lib/site"

/** JSON-LD Organization (PRD §10). Escapes "<" so the JSON can never close the script tag. */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  slogan: SITE.tagline,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/brand/icon.svg`,
  areaServed: { "@type": "City", name: "Abuja", containedInPlace: { "@type": "Country", name: "Nigeria" } },
  address: { "@type": "PostalAddress", addressLocality: "Abuja", addressRegion: "FCT", addressCountry: "NG" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: `+${SITE.whatsappNumber}`,
    url: `https://wa.me/${SITE.whatsappNumber}`,
    areaServed: "NG",
    availableLanguage: ["English"],
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <HomeHero />
      <CommunitySection />
      <MarketplaceSection />
      <ConsultancySection />
      <ApproachSection />
      <RegisterBand />
      <ConnectSection />
    </>
  )
}
