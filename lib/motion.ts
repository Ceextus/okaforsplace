"use client"

import { useEffect, type RefObject } from "react"
import { onIdle } from "@/lib/idle"

/**
 * GSAP, loaded lazily. Nothing on the load path imports GSAP: entrances are CSS
 * (globals.css), and scroll motion is set up with `useMotion`, which fetches GSAP +
 * ScrollTrigger + SplitText (~160 KB) in separate chunks only after the visitor's first
 * scroll, touch, click or key press — every GSAP effect is scroll-driven, so nothing is lost,
 * and the load itself stays free of that parse/evaluate cost (Lighthouse TBT).
 */

export type Motion = {
  gsap: typeof import("gsap").gsap
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger
  SplitText: typeof import("gsap/SplitText").SplitText
}
type GsapContext = ReturnType<Motion["gsap"]["context"]>

/** Shared eases: one settle curve for entrances, no overshoot. */
export const EASE = {
  enter: "expo.out",
  ui: "power3.out",
  travel: "power2.inOut",
} as const

let loading: Promise<Motion> | null = null
let interacted: Promise<void> | null = null

/** Resolves on the first scroll / wheel / touch / pointer / key event (once per page load). */
function firstInteraction(): Promise<void> {
  interacted ??= new Promise((resolve) => {
    const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const
    const go = () => {
      events.forEach((e) => window.removeEventListener(e, go))
      resolve()
    }
    events.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }))
    // Restored scroll position (back/forward) counts as already interacted.
    if (window.scrollY > 0) go()
  })
  return interacted
}

export function loadMotion(): Promise<Motion> {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]).then(
    ([g, st, sp]) => {
      const gsap = g.gsap
      gsap.registerPlugin(st.ScrollTrigger, sp.SplitText)
      gsap.defaults({ ease: "power3.out", duration: 0.8 })
      return { gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText }
    }
  )
  return loading
}

/**
 * Run `setup` inside a gsap.context scoped to `ref`, after GSAP has loaded.
 * - Skipped entirely under prefers-reduced-motion (the markup is already the finished state).
 * - Default: waits for the visitor's first interaction, then an idle frame. Pass
 *   `{ idle: false }` for motion the user just triggered (e.g. a form's success state).
 * - Everything created inside — tweens, ScrollTriggers, SplitTexts — is reverted on unmount.
 *   Work started later (after fonts load etc.) must go through `ctx.add(() => …)`.
 */
export function useMotion<T extends HTMLElement>(
  ref: RefObject<T | null>,
  setup: (m: Motion, root: T, ctx: GsapContext) => void,
  { idle = true }: { idle?: boolean } = {}
) {
  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let ctx: GsapContext | undefined
    let dead = false
    const start = () =>
      void loadMotion().then((m) => {
        if (dead) return
        ctx = m.gsap.context((self) => setup(m, root, self), root)
      })
    let cancel: () => void = () => {}
    if (idle) firstInteraction().then(() => !dead && (cancel = onIdle(start, 300)))
    else start()

    return () => {
      dead = true
      cancel()
      ctx?.revert()
    }
    // setup is defined inline by callers and only meant to run once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
