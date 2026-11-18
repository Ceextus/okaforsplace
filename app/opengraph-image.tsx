import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { SITE } from "@/lib/site"

// Shared by every page that doesn't define its own (PRD §10: the logo on navy).
export const alt = "Okafor's Place — Connect. Trade. Discover. Grow. An Abuja community, marketplace and consultancy."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const RING =
  "M9 32a23 23 0 1 0 46 0a23 23 0 1 0 -46 0ZM19.5 32a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0Z"
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><clipPath id="a"><path d="M-40 -40H101.74L-40 101.74Z"/></clipPath><clipPath id="b"><path d="M104 104H-37.74L104 -37.74Z"/></clipPath></defs><path d="${RING}" fill-rule="evenodd" fill="#FFF8E9" clip-path="url(#a)" transform="translate(-1.41 1.41)"/><path d="${RING}" fill-rule="evenodd" fill="#F3C96F" clip-path="url(#b)" transform="translate(1.41 -1.41)"/></svg>`

// Read at module level (as in the Next docs) so the image is prerendered at build time.
const clash = await readFile(join(process.cwd(), "app/fonts/ClashDisplay-Semibold.ttf"))

export default async function OpengraphImage() {
  const mark = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`
  const words = SITE.tagline.split(" ")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 10%, #123765 0%, #071D3B 55%)",
          color: "#FFF8E9",
          fontFamily: "Clash",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={76} height={76} alt="" />
          <div style={{ fontSize: 34, letterSpacing: 6, textTransform: "uppercase" }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", columnGap: 30, fontSize: 112, lineHeight: 1, maxWidth: 980 }}>
          {words.map((w, i) => (
            <span key={w} style={{ color: i === words.length - 1 ? "#F3C96F" : "#FFF8E9" }}>
              {w}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "rgba(255,248,233,0.7)" }}>
          <span>Community · Marketplace · Consultancy</span>
          <span style={{ color: "#F3C96F" }}>{SITE.domain}</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Clash", data: clash, style: "normal", weight: 600 }] }
  )
}
