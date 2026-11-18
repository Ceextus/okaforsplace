import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import localFont from "next/font/local"
import Script from "next/script"

import { MobileActionBar } from "@/components/layout/mobile-action-bar"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { SITE } from "@/lib/site"
import "./globals.css"

// Clash Display (Indian Type Foundry, Fontshare free licence — see app/fonts/ClashDisplay-LICENSE.txt)
const clash = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_NG",
    url: "./",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#071D3B",
}

/*
 * Entrance guard: before first paint, elements marked [data-enter] are hidden so GSAP can
 * animate them in without a flash. Skipped under reduced motion; a 2.5s fallback reveals
 * everything if scripts are slow or fail, so content is never lost.
 */
const enterGuard = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('js-enter');setTimeout(function(){d.classList.add('js-enter-done')},2500)}catch(e){}})()`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${clash.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <Script id="enter-guard" strategy="beforeInteractive">
          {enterGuard}
        </Script>
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-gold px-5 py-3 font-semibold text-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  )
}
