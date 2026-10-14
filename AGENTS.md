# AI Agent Operating Contract: Batik Smile Nusantara

> Authoritative instructions for AI coding assistants working in this repository.  
> Governed by `user_global` rules, `design-taste`, and Shopify Hydrogen best practices.

---

## 1. Project Context & Brand Identity

- **Brand**: **Batik Smile Nusantara** (Sejak 2007, Semarang, Jawa Tengah).
- **Physical Showrooms**: 
  - **Batik Smile Sampokong (3 Lantai)**: Jl. Simongan Raya No. 109, Pamularsih, Semarang (Lt. 1: RTW & Fitting • Lt. 2: VIP Sutra & Lounge • Lt. 3: Suvenir).
  - **Batik Smile Sukun**: Jl. Sukun Raya No. 23, Banyumanik, Semarang.
- **Service Standard**: Pelayanan Hangat Sepenuh Hati & Presisi Jahitan Butik.
- **Commerce Model**: **6 Core Collections & Dual-Engine Commerce**:
  1. **Ready-To-Wear (RTW) 3-Tier**: `luxury-series` (Sutra ATBM & Lapisan Trikot), `premium-series` (Tenun Dobby & Lapisan Trikot), `ekonomi-series` (100% Katun Primisima).
  2. **Specialist & Raw Fabric Collections**: `kain` (**Kain Batik** — klasik hingga modern untuk busana personal, seragam, & sarimbit), `batik-anak`, dan `aksesoris`.
- **Official Channels**: WhatsApp Concierge `081-390-8888-09` | Instagram `@batiksmile_official` | Email `butik@batiksmile.com`.

---

## 2. Technology Stack & Edge Runtime

- **Framework**: `@shopify/hydrogen` (^2026.4.x) — headless commerce framework.
- **Routing & SSR**: React Router v7 framework mode (loaders, actions, optimistic UI, edge streaming).
- **Styling**: Tailwind CSS v4 with custom Quiet Luxury design tokens.
- **Hosting & Edge**: **Shopify Oxygen Global Edge Network** (Cloudflare Workers Runtime).
- **Commerce Backend**: Shopify Storefront API (GraphQL `2026-01`), 100% native Metaobjects & Metafields.

---

## 3. Quiet Luxury Nusantara Design System (Mandatory)

All frontend work must strictly adhere to [DESIGN.md](file:///Users/ongki/Projects/batik-smile-hydrogen/DESIGN.md):

1. **Zero-Radius Architecture (`border-radius: 0px`)**:
   - All buttons, input fields, badges, and card containers must have sharp `rounded-none` (`0px`) corners. No pill-shaped blobs.
2. **Micro-Tracking & Whispered Caps (`0.18em` to `0.22em`)**:
   - Headings, navigation links, and button labels use uppercase with wide tracking: `tracking-[0.18em]`.
3. **Typography Pairing**:
   - Display & Editorial: **Cormorant Garamond** (Serif, Elegant, High-Heritage).
   - Structural & Microcopy: **Instrument Sans** (Prestige foundation, clean geometric).
4. **Quad-Harmonic Palette**:
   - **Hitam**: Obsidian Deep (`#111111`) & Charcoal Ink (`#1C1C1C`).
   - **Putih**: Pure Mori (`#FFFFFF`) & Mori Linen (`#FAF8F5`).
   - **Gold**: Imperial Antique Gold (`#C5A059`) & Deep Ochre Gold (`#9E7D3B` for text).
   - **Brown**: Deep Espresso (`#4A2E1B`) & Soga Matang (`#7C3F1D`).
5. **Strict 4:5 Media Aspect Ratio (`aspect-[4/5]`)**:
   - All catalog grids, model lookbooks, and PDP primary imagery must preserve vertical 4:5 proportions.

---

## 4. Documentation Hierarchy & Single Source of Truth

Resolve all specifications through the repository documentation suite:

| Document | Purpose & Authority |
|---|---|
| [PRD.md](file:///Users/ongki/Projects/batik-smile-hydrogen/PRD.md) | Product requirements, user personas, dual-engine commerce, and features. |
| [DESIGN.md](file:///Users/ongki/Projects/batik-smile-hydrogen/DESIGN.md) | Design tokens, color system, typography, components, and anti-slop rules. |
| [SCHEMA.md](file:///Users/ongki/Projects/batik-smile-hydrogen/SCHEMA.md) | Storefront API GraphQL contracts, Metaobject schemas, and Metafields. |
| [PAGES-SCHEMA.xml](file:///Users/ongki/Projects/batik-smile-hydrogen/PAGES-SCHEMA.xml) | **Authoritative XML coding and route map per page** (hierarchy, queries, sections). |
| [ARCHITECTURE.md](file:///Users/ongki/Projects/batik-smile-hydrogen/ARCHITECTURE.md) | System architecture, directory structure, Oxygen runtime, and caching. |
| [TASKS.md](file:///Users/ongki/Projects/batik-smile-hydrogen/TASKS.md) | **Sole canonical execution queue**. Never create parallel task files. |
| [STATUS.md](file:///Users/ongki/Projects/batik-smile-hydrogen/STATUS.md) | Delivery ledger state machine and verification progress. |
| [DECISIONS.md](file:///Users/ongki/Projects/batik-smile-hydrogen/DECISIONS.md) | Architecture Decision Records (ADRs). |
| [OBSERVABILITY.md](file:///Users/ongki/Projects/batik-smile-hydrogen/OBSERVABILITY.md) | Edge runtime probes, Web Vitals, and tracking observability. |
| [RELEASE.md](file:///Users/ongki/Projects/batik-smile-hydrogen/RELEASE.md) | Release risk assessment, rollback commands, and deployment verification. |

---

## 5. Development & Code Discipline

1. **Lazy Senior Dev Rules**:
   - Write the minimum necessary code that works cleanly.
   - Do not create unrequested abstractions, extra wrapper classes, or speculative scaffolding.
   - Check existing helpers/components before creating new ones.
2. **Approval Gates (Always On)**:
   - Stop and request approval before running destructive commands (`rm -rf`, `git reset --hard`, destructive cleanups).
   - Never print `.env` or sensitive credentials to screen or commits.
   - No `Co-Authored-By` or AI-attribution trailers in Git commit messages.
3. **Verification Before Claiming Done**:
   - Never say "it works" without executing verification checks (`npm run build`, `npm run lint`).
   - Browser-visible UI must be verified for responsiveness and visual alignment.

