"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

// Register once for the whole app. Import gsap and plugins from here, never from "gsap" directly.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

gsap.defaults({ ease: "power3.out", duration: 0.8 })

/** Shared eases: one settle curve for entrances, no overshoot (motion.md). */
export const EASE = {
  enter: "expo.out",
  ui: "power3.out",
  travel: "power2.inOut",
} as const

export { gsap, ScrollTrigger, SplitText, useGSAP }
