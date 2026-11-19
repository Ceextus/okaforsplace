import type { Metadata } from "next"

import { AboutHero, AboutPillars, AboutStory, AboutValues } from "@/components/sections/about-sections"
import { ApproachSection } from "@/components/sections/approach-section"
import { RegisterBand } from "@/components/sections/register-band"

export const metadata: Metadata = {
  title: "About us",
  description:
    "Okafor's Place is an Abuja community bringing people, professionals and businesses together: community, the Middleman Consultancy and marketplace.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutPillars />
      <AboutValues />
      <ApproachSection withDisclaimer />
      <RegisterBand />
    </>
  )
}
