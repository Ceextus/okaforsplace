"use client"

import { useRef } from "react"
import { EASE, useMotion } from "@/lib/motion"

type SectionMotionProps = React.ComponentProps<"section">

/**
 * Scroll motion for a server-rendered section, driven by data attributes on its children:
 *
 *   [data-split]    heading: lines rise out of masks when it enters the screen (once)
 *   [data-rise]     block: rises 40px and fades in, batched with a stagger (once)
 *   [data-rule]     hairline: draws left → right (once)
 *   [data-develop]  photo frame: opens from an inset clip while its [data-develop-img]
 *                   comes up out of a faint grey print into colour and settles from 1.18 to 1
 *                   (scrubbed to the scrollbar, runs back on the way up)
 *   [data-wipe]     photo frame: uncovers left → right with a clip-path wipe (once), its
 *                   [data-wipe-img] settling from 1.15 to 1 at the same time
 *   [data-parallax="8"] layer inside a clipped photo frame: drifts from +8% to -8% of its
 *                   height as it crosses the screen (scrubbed). Make the layer taller than its
 *                   frame (e.g. -inset-y-[10%]) so no edge ever shows.
 *
 * Elements already on screen when the motion loads (idle time after first paint) are skipped.
 *
 * Rules: content is complete without JS and under reduced motion (nothing is hidden by CSS;
 * tweens only start from hidden after hydration). Never put [data-rise] on an element that
 * has its own CSS transform transition (buttons, hover-lift cards): wrap it instead.
 */
export function SectionMotion({ children, ...props }: SectionMotionProps) {
  const ref = useRef<HTMLElement>(null)

  useMotion(ref, ({ gsap, ScrollTrigger, SplitText }, root, ctx) => {
    // Content already on screen when motion starts is left alone (no visible → hidden →
    // visible blink); above-the-fold heroes animate with CSS from first paint instead.
    const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight
    // Photographs that develop (scrubbed)
    gsap.utils.toArray<HTMLElement>("[data-develop]", root).forEach((frame) => {
      const img = frame.querySelector("[data-develop-img]")
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: frame,
          start: "top 92%",
          end: "top 25%",
          scrub: 0.8,
        },
      })
      tl.fromTo(frame, { clipPath: "inset(9% 7% 9% 7% round 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)" }, 0)
      if (img) {
        tl.fromTo(
          img,
          {
            scale: 1.18,
            filter: "grayscale(1) contrast(0.8) brightness(1.18)",
          },
          {
            scale: 1,
            filter: "grayscale(0) contrast(1) brightness(1)",
          },
          0,
        )
      }
    })

    // Photo frames that wipe open (once)
    gsap.utils
      .toArray<HTMLElement>("[data-wipe]", root)
      .filter(below)
      .forEach((frame) => {
        const img = frame.querySelector("[data-wipe-img]")
        const tl = gsap.timeline({
          defaults: { duration: 1.5, ease: "expo.inOut" },
          scrollTrigger: { trigger: frame, start: "top 80%", once: true },
        })
        tl.fromTo(
          frame,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", clearProps: "clipPath" },
          0,
        )
        if (img) tl.from(img, { scale: 1.15, duration: 1.8, ease: "expo.out" }, 0.15)
      })

    // Photo layers drifting inside their frames (scrubbed)
    gsap.utils.toArray<HTMLElement>("[data-parallax]", root).forEach((layer) => {
      const amount = Number(layer.dataset.parallax) || 8
      gsap.fromTo(
        layer,
        { yPercent: amount },
        {
          yPercent: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: layer.parentElement ?? layer,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      )
    })

    // Hairlines
    gsap.utils
      .toArray<HTMLElement>("[data-rule]", root)
      .filter(below)
      .forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: EASE.travel,
          scrollTrigger: { trigger: rule, start: "top 90%", once: true },
        })
      })

    // Blocks that rise, in batches so neighbours stagger
    const risers = gsap.utils.toArray<HTMLElement>("[data-rise]", root).filter(below)
    if (risers.length) {
      gsap.set(risers, { y: 40, autoAlpha: 0 })
      ScrollTrigger.batch(risers, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: EASE.enter,
            stagger: 0.1,
            overwrite: true,
            clearProps: "transform",
          }),
      })
    }

    // Headings: split each one only as it nears the screen (one layout pass per heading,
    // never all up front), after the display face has loaded so lines break where they rest.
    // ctx.add(fn) keeps the late tweens inside this context, so they're cleaned up too.
    const splitHeadings = () =>
      ctx.add(() => {
        gsap.utils
          .toArray<HTMLElement>("[data-split]", root)
          .filter(below)
          .forEach((el) => {
            ScrollTrigger.create({
              trigger: el,
              start: "top bottom+=120",
              once: true,
              onEnter: () =>
                ctx.add(() => {
                  SplitText.create(el, {
                    type: "lines",
                    mask: "lines",
                    onSplit: (self) =>
                      gsap.from(self.lines, {
                        yPercent: 110,
                        duration: 1.05,
                        ease: EASE.enter,
                        stagger: 0.09,
                        scrollTrigger: { trigger: el, start: "top 85%", once: true },
                      }),
                  })
                }),
            })
          })
      })
    if (document.fonts?.status === "loaded") splitHeadings()
    else document.fonts.ready.then(() => splitHeadings())
  })

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  )
}
