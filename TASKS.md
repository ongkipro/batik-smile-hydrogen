# Tasks: Batik Smile Nusantara Hydrogen Storefront

> Canonical execution queue and progress tracking.

---

## Phase 1: Infrastructure & Pipeline Foundations (COMPLETED)
- [x] Scaffold Hydrogen project with `@shopify/hydrogen` (^2026.4.x), React Router v7, and Tailwind CSS v4.
- [x] Configure `.npmrc` (`allow-remote=all`) and `package.json` scripts.
- [x] Configure `.env` with live store domain (`23ahbp-sq.myshopify.com`) and Storefront Access Tokens.
- [x] Connect GitHub repository `ongkipro/batik-smile-hydrogen` and configure Oxygen deployment tokens.
- [x] Verify automated CI/CD deployment pipeline via GitHub Actions to Shopify Oxygen (Success).

---

## Phase 2: Design System & Core Luxury UI Components (COMPLETED)
- [x] Configure color palette: Mori Linen (`#FAF8F5`), Obsidian (`#141414`), Soga (`#8B3A14`), Gold (`#C5A059`), Tarum Indigo (`#14213D`).
- [x] Inject typography: *Cormorant Garamond* (Editorial Serif) and *Plus Jakarta Sans* (Modern Grotesk).
- [x] Build SVG filigree ornaments (`BatikDivider` and `BatikCorner`).
- [x] Build `AnnouncementBar` and `MegaMenu` with lookbook previews.
- [x] Build `HeroEditorial` with 4:5 portrait model lookbook card and dual CTAs.
- [x] Build `TierExperience` (Interactive 3-Tier switcher: Mahakarya, Signature, Essential).
- [x] Build `ShoppableLookbook` with pulsing interactive hotspot pins.
- [x] Build `CraftsmanshipZoom` (3 macro trust proof cards).
- [x] Build `ShowroomO2O` (Semarang Flagship & Solo Gallery).
- [x] Build `MobileNavigation` (Sticky app-style bottom bar).

---

## Phase 3: PDP, PLP, & Commerce Interactions (COMPLETED)
- [x] Build 4:5 vertical media gallery with zoom in PDP (`products.$handle.jsx`).
- [x] Build `FamilyBundleBuilder` (Multi-variant selector for Sarimbit sets).
- [x] Build `StickyMobileBar` (Floating purchase action bar on mobile).
- [x] Implement Dynamic 3-Tier Theme Engine in PLP (`collections.$handle.jsx`).
- [x] Add Objection Snapping microcopy across price, size picker, and CTA buttons.
- [x] Integrate 3-layer accordions (*Filosofi Motif*, *Bahan & Furing*, *Panduan Perawatan*).

---

## Phase 4: Final Verification & Staging (READY)
- [x] Run `npm run build` locally with zero errors (Exit 0).
- [x] Verify live dev server on `http://localhost:3001/`.
- [x] Commit and push full concept docs (`PRD.md`, `DESIGN.md`, `SCHEMA.md`, `ARCHITECTURE.md`, `TASKS.md`) to GitHub `main`.
