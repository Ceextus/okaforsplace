"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const loadSheet = () => import("@/components/layout/mobile-menu-sheet")
const MobileMenuSheet = dynamic(loadSheet, { ssr: false })

/**
 * Mobile menu: a labelled "Menu" pill opening a near-full-height bottom sheet
 * (design: 56px+ rows, WhatsApp number, actions in the thumb zone).
 * The sheet (and Base UI's dialog) loads on first intent — touch, hover or focus on the
 * button — so it costs nothing on page load.
 */
export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={() => void loadSheet()}
        onTouchStart={() => void loadSheet()}
        onFocus={() => void loadSheet()}
        onClick={() => {
          setMounted(true)
          setOpen(true)
        }}
        aria-label="Open menu"
        className={cn(buttonVariants({ variant: "navy", size: "icon" }), "size-11 hover:translate-y-0 lg:hidden")}
      >
        {/* Hamburger icon only (no text label on mobile); the aria-label names it */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {mounted && <MobileMenuSheet open={open} onOpenChange={setOpen} pathname={pathname} returnFocus={buttonRef} />}
    </>
  )
}
