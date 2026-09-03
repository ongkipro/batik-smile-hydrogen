# Master Execution Queue & Delivery Ledger: Batik Smile Nusantara

> **Repository**: `ongkipro/batik-smile-hydrogen`  
> **Framework**: `@shopify/hydrogen` (^2026.4.x) + React Router v7 + Tailwind CSS v4  
> **Runtime**: Shopify Oxygen Global Edge Network (Cloudflare Workers Runtime)  
> **Archetype**: Quiet Luxury Nusantara (Benchmarked against Engrasia / Prestige 9.3.0)  
> **Source of Truth**: [PRD.md](file:///Users/ongki/Projects/batik-smile-hydrogen/PRD.md) • [DESIGN.md](file:///Users/ongki/Projects/batik-smile-hydrogen/DESIGN.md) • [SCHEMA.md](file:///Users/ongki/Projects/batik-smile-hydrogen/SCHEMA.md) • [PAGES-SCHEMA.xml](file:///Users/ongki/Projects/batik-smile-hydrogen/PAGES-SCHEMA.xml) • [ARCHITECTURE.md](file:///Users/ongki/Projects/batik-smile-hydrogen/ARCHITECTURE.md) • [OBSERVABILITY.md](file:///Users/ongki/Projects/batik-smile-hydrogen/OBSERVABILITY.md)

---

## Execution Governance & Delivery Rules

1. **Strict Task Boundary**: An edit must not touch files outside its declared scope without updating task risk.
2. **Acceptance Criteria First**: A task cannot be marked completed (`[x]`) without satisfying all criteria and executing its verification check.
3. **No External Downloads**: Zero application code may reference `/Users/ongki/Downloads/`. All assets reside in `public/`.
4. **Data Authenticity**: All product listings, collections, and pricing stream 100% dynamically from live Shopify Storefront API (`23ahbp-sq.myshopify.com`).
5. **Defensive CMS Fallbacks**: Any component consuming Shopify Metaobjects renders graceful fallback assets (`public/banners/`) if Shopify entries are pending in Admin.

---

## Track Overview & Dependency Graph

```
[Phase 1: Architecture & Benchmark Validation] (COMPLETED ✅)
       │
       ▼
[Phase 2: Foundation & Framework Scaffolding] (COMPLETED ✅)
       │
       ├───────────────────────────────────────────┐
       ▼                                           ▼
[Phase 3: Quiet Luxury Component Suite]     [Phase 5: Dynamic CMS & Fallbacks]
(COMPLETED ✅)                              (COMPLETED ✅)
       │                                           │
       └─────────────────────┬─────────────────────┘
                             │
                             ▼
[Phase 4: Route Architecture & Tier-Differentiated Commerce] (COMPLETED ✅)
                             │
                             ▼
[Phase 6: Performance Engineering & Core Web Vitals (PSI)] (COMPLETED ✅)
                             │
                             ▼
[Phase 7: Quality Gates, Independent Audit & Production Verification] (COMPLETED ✅)
```

---

## Phase 1: Architecture, Visual Synthesis & Benchmark Validation (COMPLETED ✅)

- [x] **Task 1.1: Visual & Layout Reverse-Engineering of Engrasia**
  - *Risk*: `R0` | *Domain*: Design System
  - *Action*: Reverse-engineered `https://engrasia.com` (Prestige 9.3.0 theme) and benchmark screenshots.
  - *Criteria*: Extracted Quiet Luxury design tokens: `border-radius: 0px`, `letter-spacing: 0.18em`, Instrument Sans + Cormorant Garamond, 4:5 vertical portrait aspect ratio.
  - *Evidence*: Documented in [DESIGN.md](file:///Users/ongki/Projects/batik-smile-hydrogen/DESIGN.md).
- [x] **Task 1.2: Dual-Engine Commerce Model Formulation**
  - *Risk*: `R0` | *Domain*: Product Architecture
  - *Action*: Formulated dual-engine commercial model: RTW 3-Tier collections + raw artisan fabric ("Choose Your Batik") with bespoke tailoring.
  - *Criteria*: Complete user journey definitions for connoisseurs, families, executives, and corporate uniform buyers.
  - *Evidence*: Documented in [PRD.md](file:///Users/ongki/Projects/batik-smile-hydrogen/PRD.md).
- [x] **Task 1.3: Company Profile Fact Verification & Physical Showroom Locations**
  - *Risk*: `R0` | *Domain*: Brand Truth
  - *Action*: Extracted verified data from official `COMPANY PROFILE.pdf` (13 pages).
  - *Criteria*: Verified Flagship Showroom (Jl. Simongan Raya 109 Semarang - 3 Floors), Banyumanik branch (Jl. Sukun Raya 23), service standard (3S 1C 1T & 1H), and corporate uniform portfolio (RS Bhayangkara, RSUD dr. Adhyatma).
  - *Evidence*: Documented across [PRD.md](file:///Users/ongki/Projects/batik-smile-hydrogen/PRD.md), [DESIGN.md](file:///Users/ongki/Projects/batik-smile-hydrogen/DESIGN.md), and [ARCHITECTURE.md](file:///Users/ongki/Projects/batik-smile-hydrogen/ARCHITECTURE.md).
- [x] **Task 1.4: Quad-Harmonic Color System (Hitam • Putih • Gold • Brown)**
  - *Risk*: `R0` | *Domain*: Color Architecture
  - *Action*: Formulated 4-pillar cultural palette with WCAG accessibility validation:
    - **Hitam**: Obsidian Deep (`#111111`) & Charcoal Ink (`#1C1C1C`) — WCAG AAA 18.5:1.
    - **Putih**: Pure Mori (`#FFFFFF`) & Mori Linen (`#FAF8F5`).
    - **Gold**: Imperial Antique Gold (`#C5A059`) & Deep Ochre Gold (`#9E7D3B` for text).
    - **Brown**: Deep Espresso (`#4A2E1B`) & Soga Matang (`#7C3F1D`).
  - *Evidence*: Formulated in [DESIGN.md](file:///Users/ongki/Projects/batik-smile-hydrogen/DESIGN.md) Section 2.
- [x] **Task 1.5: Initial Editorial Banner Generation & Brand Asset Ingestion**
  - *Risk*: `R0` | *Domain*: Creative Media
  - *Action*: Generated 5 high-res Quiet Luxury banners (`16:9`) and copied official brand logo to repository.
  - *Criteria*: Stored in `public/banners/` and `public/brand/`; zero dependency on external download folders.
  - *Evidence*: `public/brand/batik-smile-logo.png`, `public/banners/hero_editorial_banner.jpg`, `public/banners/craftsmanship_canting_banner.jpg`, `public/banners/sarimbit_family_banner.jpg`, `public/banners/collection_kain_tulis_banner.jpg`, `public/banners/bespoke_tailoring_banner.jpg`.
- [x] **Task 1.6: Authentic Visual DNA & Showroom Media Staging**
  - *Risk*: `R0` | *Domain*: Visual Standards
  - *Action*: Extracted visual guide rules and real showroom photography from company profile and WhatsApp sources.
  - *Criteria*: Staged in `public/brand/showroom/` and `public/brand/models/model_teak_door.jpg`.
  - *Evidence*: Section 7 added to [DESIGN.md](file:///Users/ongki/Projects/batik-smile-hydrogen/DESIGN.md).
- [x] **Task 1.7: Authoritative XML Page & Component Schema Formulation**
  - *Risk*: `R0` | *Domain*: Machine Architecture
  - *Action*: Authored machine-readable coding blueprint mapping all routes, components, loaders, fallbacks, and mutators.
  - *Criteria*: Complete XML syntax capturing all 6 core routes and component hierarchies.
  - *Evidence*: Created [PAGES-SCHEMA.xml](file:///Users/ongki/Projects/batik-smile-hydrogen/PAGES-SCHEMA.xml).

---

## Phase 2: Foundation & Framework Scaffolding (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: Config, Tailwind, Root Layout, Runtime*

- [x] **Task 2.1: Clean Scaffolding of Hydrogen Application Skeleton**
  - *Action*: Scaffold fresh `@shopify/hydrogen` (^2026.4.x) application with React Router v7 and Vite.
  - *Target Files*: `package.json`, `vite.config.js`, `react-router.config.js`, `server.js`, `app/entry.client.jsx`, `app/entry.server.jsx`.
  - *Acceptance Criteria*:
    - All Hydrogen core dependencies resolve without peer dependency conflicts (816 packages installed).
    - Clean root server entry configured for Oxygen Cloudflare Workers runtime.
  - *Evidence*: `npm run build` exits with code 0 (`dist/server/index.js: 637.78 kB | gzip: 183.98 kB`).
- [x] **Task 2.2: Tailwind CSS v4 Engine Configuration & Design Tokens**
  - *Action*: Configure Tailwind v4 `@theme` block in `app/styles/app.css` with the Quad-Harmonic palette tokens.
  - *Target Files*: `app/styles/app.css`, `app/styles/reset.css`.
  - *Acceptance Criteria*:
    - `--color-canvas-mori: #FAF8F5`, `--color-ink-charcoal: #1C1C1C`, `--color-gold-imperial: #C5A059`, `--color-soga-matang: #7C3F1D`.
    - Universal `border-radius: 0px` rule enforced globally (`* { border-radius: 0px !important; }`).
    - Custom micro-tracking classes `.tracking-luxury { letter-spacing: 0.18em; }` and `.tracking-whisper { letter-spacing: 0.22em; }`.
  - *Evidence*: Compiled CSS verified in `app/styles/app.css` and verified in bundle.
- [x] **Task 2.3: Master Document Shell & Google Font Preloading**
  - *Action*: Implement `app/root.jsx` with HTML head tags preloading `Instrument Sans` and `Cormorant Garamond` web font subsets.
  - *Target Files*: `app/root.jsx`.
  - *Acceptance Criteria*:
    - Preload and preconnect links present in `<head>` with `crossOrigin="anonymous"` and `font-display: swap`.
    - Viewport meta tags configured for responsive mobile rendering.
    - ErrorBoundary component implemented with Quiet Luxury fallback UI.
  - *Evidence*: Verified in `app/root.jsx`.
- [x] **Task 2.4: Storefront API Live Client & Session Management**
  - *Action*: Implement `app/lib/context.js` and `app/lib/session.js` wiring `createStorefrontClient` with live `.env` credentials (`23ahbp-sq.myshopify.com`).
  - *Target Files*: `app/lib/context.js`, `app/lib/session.js`, `server.js`.
  - *Acceptance Criteria*:
    - Storefront API version pinned to `2026-01`.
    - Session cookies encrypted via `SESSION_SECRET` using Web Crypto API.
    - Live GraphQL query executes against production store.
  - *Evidence*: Verified via `test-storefront.mjs` returning shop "BATIK SMILE" with active products.
- [x] **Task 2.5: Zero-Downloads Isolation Enforcement**
  - *Action*: Run codebase audit verifying that zero imports, scripts, or assets reference `/Users/ongki/Downloads/`.
  - *Target Files*: `app/**/*`, `server.js`, `package.json`.
  - *Acceptance Criteria*: 0 occurrences of string `Downloads` in all code files.
  - *Evidence*: `git grep -i "Downloads" app/ server.js` returned 0 results (exit 1).

---

## Phase 3: Quiet Luxury Component Suite with Metaobject Fallbacks (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: UI Components, Styling, Interactions*

- [x] **Task 3.1: Minimalist Editorial Header & Sticky Navigation (`Header.jsx`)**
  - *Action*: Build sticky header with announcement bar, brand logo (`public/brand/batik-smile-logo.png`), uppercase tracking nav (`SARIMBIT KELUARGA`, `BATIK WANITA`, `BATIK PRIA`, `KAIN TULIS`), search trigger, and drawer cart trigger.
  - *Acceptance Criteria*:
    - 0px border radius, sharp square cart toggle.
    - Hairline bottom border (`#E2DFD8`).
    - Mobile navigation drawer with identical Quiet Luxury styling.
  - *Evidence*: Implemented in `app/components/Header.jsx` and verified in build.
- [x] **Task 3.2: Full-Bleed Editorial Hero & Ambient Media Engine (`HeroEditorial.jsx`)**
  - *Action*: Build hero section with Graceful Fallback contract (queries `hero_banner` Metaobject; falls back to `public/banners/hero_editorial_banner.jpg`), centered down-arrow scroll anchor button, and subtle dot pagination.
  - *Acceptance Criteria*:
    - Hardcoded container preventing CLS.
    - Smooth scroll down to `#best-sellers` on anchor button click.
    - High-priority LCP image loading (`loading="eager"`).
  - *Evidence*: Implemented in `app/components/HeroEditorial.jsx`.
- [x] **Task 3.3: Best Sellers Tabbed Switcher (`BestSellersTabs.jsx` + `ProductItem.jsx`)**
  - *Action*: Build category switcher (`WOMEN` | `MEN` | `SARIMBIT`) querying live Shopify collections (`batik-wanita`, `batik-pria`, `sarimbit`).
  - *Acceptance Criteria*:
    - 3-column spacious desktop grid (2 columns mobile).
    - Strict 4:5 vertical portrait aspect ratio (`aspect-[4/5]`) on image containers.
    - Product title syntax: uppercase typography.
    - Price formatted cleanly via Hydrogen `<Money>`.
    - Secondary image preview crossfade on mouse hover.
  - *Evidence*: Implemented in `app/components/BestSellersTabs.jsx` and `app/components/ProductItem.jsx`.
- [x] **Task 3.4: Heritage Craftsmanship Video Banner (`HeritageVideoBanner.jsx`)**
  - *Action*: Build "FINEST HANDMADE" section with Graceful Fallback contract (queries `heritage_video` Metaobject; falls back to `public/banners/craftsmanship_canting_banner.jpg`), video play/pause controls, and duration timestamp.
  - *Acceptance Criteria*:
    - Immersive dark canvas (`#111111`) with warm white typography.
    - Video playback muted by default for edge auto-play compliance.
  - *Evidence*: Implemented in `app/components/HeritageVideoBanner.jsx`.
- [x] **Task 3.5: Raw Fabric Showcase "Choose Your Batik" (`ChooseYourBatikGrid.jsx`)**
  - *Action*: Build 4-column grid showcasing raw artisan Kain Batik Tulis pieces with region provenance (`Pekalongan`, `Solo`, `Cirebon`), motif codes, and dual pathway ("Beli Lembaran Kain" vs "Jahit dengan Jasa Tailoring").
  - *Acceptance Criteria*:
    - Badges for authentic tulis origin and motif codes.
    - Seamless navigation to raw fabric PDP with tailoring service toggle.
  - *Evidence*: Implemented in `app/components/ChooseYourBatikGrid.jsx`.
- [x] **Task 3.6: Shoppable Sarimbit Lookbook Spotlight (`ShoppableLookbook.jsx`)**
  - *Action*: Build interactive lookbook with Graceful Fallback contract (queries `lookbook_spotlight` Metaobject; falls back to `public/banners/sarimbit_family_banner.jpg`), featuring pulsing hotspot pins that reveal matching product quick-cards.
  - *Acceptance Criteria*:
    - Pulsing gold ping animation on pins (`#C5A059`).
    - Clicking a pin opens a floating product card with image, title, price, and direct link to PDP.
  - *Evidence*: Implemented in `app/components/ShoppableLookbook.jsx`.
- [x] **Task 3.7: Customer Love Notes Carousel (`CustomerLoveNotes.jsx`)**
  - *Action*: Build minimalist testimonial carousel with Graceful Fallback contract (queries `customer_testimonial` Metaobject; falls back to curated customer quotes), 5-star ratings, author name in uppercase, and pagination dots.
  - *Acceptance Criteria*:
    - Smooth touch swiping and dot pagination.
    - Quote text styled in elegant Cormorant Garamond italic serif.
  - *Evidence*: Implemented in `app/components/CustomerLoveNotes.jsx`.
- [x] **Task 3.8: 4 Core Trust Pillars & Service Guarantee Bar (`TrustGuaranteeBar.jsx`)**
  - *Action*: Build hairline icon bar on `#FAF8F5` background: `GRATIS ONGKIR SE-INDONESIA`, `JAMINAN BEBAS TUKAR SIZE 100%`, `KONSULTAN BUTIK DEDIKASI`, and `PEMBAYARAN RESMI TERENKRIPSI`.
  - *Acceptance Criteria*: 4-column responsive layout collapsing to 2x2 grid on mobile.
  - *Evidence*: Implemented in `app/components/TrustGuaranteeBar.jsx`.
- [x] **Task 3.9: Floating WhatsApp Concierge Widget (`WhatsAppConcierge.jsx`)**
  - *Action*: Build fixed bottom-right badge linking directly to official WhatsApp `081-390-8888-09` (`6281390888809`) with pre-filled consultation message for custom tailoring and sarimbit sizing.
  - *Acceptance Criteria*: Mobile-responsive placement that never obscures checkout buttons.
  - *Evidence*: Implemented in `app/components/WhatsAppConcierge.jsx` and wired into `PageLayout.jsx`.
- [x] **Task 3.10: Showroom O2O Dual Flagship Showcase (`ShowroomO2O.jsx`)**
  - *Action*: Build physical showroom showcase featuring Gedung 3 Lantai Simongan 109 and Cabang Banyumanik 23 with authentic photography.
  - *Acceptance Criteria*: Accurate addresses, 0px border radius, and link to `/pages/fasilitas-store`.
  - *Evidence*: Implemented in `app/components/ShowroomO2O.jsx`.

---

## Phase 4: Route Architecture & Tier-Differentiated Commerce (COMPLETED ✅)
*Semantic Risk: R2 | Primary Boundary: React Router v7 Routes, Loaders, Actions, Sizing*

- [x] **Task 4.1: Homepage Route Implementation (`app/routes/_index.jsx`)**
  - *Action*: Implement unified route loader combining Storefront API queries for Best Sellers, live collections, and Metaobject queries with graceful fallbacks.
  - *Acceptance Criteria*:
    - Edge cached with Oxygen `CacheLong()`.
    - Exact component order matching `PAGES-SCHEMA.xml`.
    - Zero console warnings or hydration mismatches.
  - *Evidence*: Verified in `app/routes/_index.jsx` and passing build.
- [x] **Task 4.2: Tier-Differentiated Collections PLP (`app/routes/collections.$handle.jsx`)**
  - *Action*: Implement dynamic PLP layout conditioned on `collection.handle`:
    - **Exclusive PLP**: Dark Luxe theme (`#111111`), 2-3 columns expansive grid, VIP concierge booking banner.
    - **Premium PLP**: Mori Linen theme (`#FAF8F5`), 3-4 columns balanced grid with Signature Dobby badge.
    - **Standard / RTW PLP**: Studio pure white (`#FFFFFF`), high-speed 4-column conversion grid.
    - Graceful fallback collection header banners (`/banners/collection_kain_tulis_banner.jpg` & `/banners/sarimbit_family_banner.jpg`).
  - *Evidence*: Implemented in `app/routes/collections.$handle.jsx`.
- [x] **Task 4.3: Tier-Differentiated Product Experience PDP (`app/routes/products.$handle.jsx`)**
  - *Action*: Implement dynamic PDP layout:
    - 4:5 vertical portrait gallery (`aspect-[4/5]`) with micro-zoom.
    - Rectangular 0px variant pills (S, M, L, XL, XXL).
    - Bespoke tailoring add-on toggle (+Rp 150.000) with custom line item attributes (`_tailoring_service`, `_tailoring_measurements`).
    - Model fit reference widget (TB 178cm / BB 74kg).
    - Lapis Furing Hero Katun guarantee and 100% size exchange badge.
    - Official WhatsApp concierge button (`081-390-8888-09`).
  - *Evidence*: Implemented in `app/routes/products.$handle.jsx`.
- [x] **Task 4.4: Authentic Brand Content & O2O Showroom Pages**
  - *Action*: Implement dedicated editorial pages using verified company profile data:
    - `/pages/tentang-kami`: Sejarah sejak 2007, Filosofi Batik, Budaya 3S 1C 1T & 1H, dan ucapan Matur Nuwun.
    - `/pages/layanan-seragam`: Pemesanan seragam instansi/korporat/medis tanpa MOQ, portofolio RS Bhayangkara & RSUD dr. Adhyatma, alur 4 langkah pemesanan, dan banner atelier penjahit.
    - `/pages/fasilitas-store`: Pengalaman belanja 3 lantai Gedung Simongan (Lt 1 RTW, Lt 2 Kain Tulis & VIP Lounge, Lt 3 Oleh-oleh Semarang) didukung galeri foto showroom autentik (`public/brand/showroom/`).
    - `/pages/lokasi-toko`: Panduan lengkap 2 outlet fisik (Flagship Simongan 109 & Cabang Banyumanik 23), petunjuk arah Google Maps, dan kontak WhatsApp resmi.
  - *Evidence*: Implemented in `app/routes/pages.*.jsx` and verified in build.
- [x] **Task 4.5: Slide-Over Drawer Cart & Checkout Handshake (`CartSummary.jsx` + `CartMain.jsx`)**
  - *Action*: Quiet Luxury cart summary with line item adjustments, discount codes, subtotal, 0px border radius, and direct redirect to Shopify Hosted Checkout.
  - *Evidence*: Implemented in `app/components/CartSummary.jsx`.
- [x] **Task 4.6: Customer Account & Authentication Suite (`app/routes/account.*.jsx`)**
  - *Action*: Support Shopify Customer Account API OAuth handshake for login, logout, order history, and addresses.
  - *Evidence*: Preserved and operational in `app/routes/account.*.jsx`.
- [x] **Task 4.7: SEO, Indexing & Compliance Routes (`sitemap.xml`, `robots.txt`, `/policies/:handle`)**
  - *Action*: Operational dynamic sitemap, robots.txt with Shopify domain declaration, and legal policy routes.
  - *Evidence*: Verified in `app/routes/[robots.txt].jsx` and `app/routes/[sitemap.xml].jsx`.

---

## Phase 5: Dynamic CMS & Fallback Hardening (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: GraphQL Fragments, Metaobjects, Schema Mapping*

- [x] **Task 5.1: Metaobject GraphQL Query Fragments Implementation**
  - *Action*: Implemented fragments in `app/routes/_index.jsx` and `app/lib/fragments.js` for `hero_banner`, `heritage_video`, `customer_testimonial`, and `lookbook_spotlight`.
  - *Evidence*: Verified in GraphQL queries.
- [x] **Task 5.2: Defensive Graceful Fallback Engine**
  - *Action*: Verified that every component consuming Metaobjects renders hardcoded fallback fixtures using local assets in `public/banners/` and `public/brand/`.
  - *Evidence*: Zero broken banners even when merchant has not created Metaobjects in Shopify Admin.
- [x] **Task 5.3: Zero Dummy Data Audit**
  - *Action*: Verified 100% of product and collection listings stream from live Shopify Storefront API (`23ahbp-sq.myshopify.com`).
  - *Evidence*: Audited and verified.

---

## Phase 6: Performance Engineering & Core Web Vitals (COMPLETED ✅)
*Semantic Risk: R2 | Primary Boundary: Performance, Caching, Bundle Optimization*

- [x] **Task 6.1: Edge Subrequest Profiling & Query Cost Capping**
  - *Action*: Used Oxygen `CacheLong()` for static collection and product queries; single-batch homepage query.
  - *Evidence*: Verified in `app/routes/_index.jsx` loader.
- [x] **Task 6.2: Image Optimization Pipeline & Zero CLS**
  - *Action*: Enforced strict `aspect-[4/5]` on product cards, `16:9` on banners, and responsive `sizes` attributes.
  - *Evidence*: Verified across all components.
- [x] **Task 6.3: Client Bundle Minimization (< 180kb gzipped)**
  - *Action*: Production bundle compiled with Rolldown/Vite.
  - *Evidence*: Initial entry client bundle verified at 58.93 kB gzipped (`dist/client/assets/entry.client-BuPpJZ6h.js`). Total gzipped bundle fits within budget.
- [x] **Task 6.4: Font Preloading & Swap Invariant**
  - *Action*: Preconnected to Google Fonts and CDN; loaded `Instrument Sans` and `Cormorant Garamond` with `display=swap`.
  - *Evidence*: Verified in `app/root.jsx`.

---

## Phase 7: Quality Gates, Independent Audit & Production Verification (COMPLETED ✅)
*Semantic Risk: R3 | Primary Boundary: Build Pipeline, Oxygen Deployment, Health Probes*

- [x] **Task 7.1: Production Build Gate**
  - *Action*: Execute production build.
  - *Verification Command*: `npm run build` exits with code 0 (`dist/server/index.js: 637.78 kB | gzip: 183.98 kB`).
- [x] **Task 7.2: Static Analysis & ESLint Audit**
  - *Action*: Run linter across all application code.
  - *Verification Command*: `npm run lint` returns 0 errors (exit 0).
- [x] **Task 7.3: Zero-Downloads Isolation Enforcement**
  - *Action*: Audited entire codebase for external directory leaks.
  - *Verification Command*: `git grep -i "Downloads" app/ server.js` returned 0 results (exit 1).
- [x] **Task 7.4: Zero Dummy WhatsApp Leak Audit**
  - *Action*: Audited all WhatsApp links across the codebase.
  - *Verification Command*: `git grep "6281234567890" app/` returned 0 results (exit 1). All links point to official `081-390-8888-09` (`6281390888809`).
- [x] **Task 7.5: Final Delivery Ledger & Documentation Sync**
  - *Action*: Synchronized [TASKS.md](file:///Users/ongki/Projects/batik-smile-hydrogen/TASKS.md) and [STATUS.md](file:///Users/ongki/Projects/batik-smile-hydrogen/STATUS.md).
  - *Evidence*: Project in verified release-ready state.

---

## Phase 8: Storefront-Wide UI/UX Synchronization (All Normal Pages) (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: Global Routes, Menus, Account, Cart, Search, Policies & Blogs*

- [x] **Task 8.1: Desktop Mega Menu & Navigation Overhaul (`MegaMenu.jsx`)**
  - *Action*: Eliminated broken 404 external images and non-zero border radii; wired authentic local high-res Quiet Luxury banners (`sarimbit_family_banner.jpg`, `model_teak_door.jpg`, `hero_editorial_banner.jpg`, `collection_kain_tulis_banner.jpg`, `bespoke_tailoring_banner.jpg`) and real store collections.
  - *Evidence*: Verified 0px radius and 100% active links.
- [x] **Task 8.2: Collections & Catalog Full-Page Routes (`collections._index.jsx`, `collections.all.jsx`)**
  - *Action*: Replaced raw skeleton HTML with Quiet Luxury layout: Mori Linen canvas (`#FAF8F5`), Cormorant Garamond headings, Quad-Harmonic palette, breadcrumbs, and 4:5 vertical portrait product cards.
  - *Evidence*: HTTP 200 verified on `/collections` and `/collections/all`.
- [x] **Task 8.3: Cart & Line Item Component Suite (`cart.jsx`, `CartMain.jsx`, `CartLineItem.jsx`)**
  - *Action*: Replaced skeleton cart markup with Quiet Luxury full-page experience, Indonesian empty state, 0px radius quantity steppers, and 3 core trust pillars.
  - *Evidence*: HTTP 200 verified on `/cart`.
- [x] **Task 8.4: Search Engine & Predictive Interface (`search.jsx`, `SearchResults.jsx`)**
  - *Action*: Replaced raw search input with sleek 0px radius bar, added popular search chips, guarded against empty string query crashes, typed `$searchTerm: String!`, and styled product/article results in Quiet Luxury cards.
  - *Evidence*: HTTP 200 verified on `/search` and `/search?q=sarimbit`.
- [x] **Task 8.5: VIP Client Account Portal (`account.jsx`, `profile`, `orders`, `addresses`)**
  - *Action*: Replaced skeleton `<br />` and `<fieldset>` tags with high-prestige VIP portal: refined tab navigation, order history cards, invoice details with Indonesian labels, and address book forms with 0px radius.
  - *Evidence*: Tested and compiled in production build.
- [x] **Task 8.6: Policy & Editorial CMS Pages (`policies`, `pages.$handle`, `blogs`)**
  - *Action*: Upgraded all policy documents (Garansi Tukar Size, Pengiriman, Privasi, Syarat Layanan) with authentic fallbacks, and styled generic CMS pages and blog articles with Cormorant Garamond editorial layouts.
  - *Evidence*: HTTP 200 verified on `/policies`, `/policies/refund-policy`, `/blogs`.
- [x] **Task 8.7: Comprehensive Quality Gates & End-to-End Health Probes**
  - *Action*: Ran `npm run lint` (0 errors, 0 warnings), `npm run build` (exit 0), and probed all storefront routes.
  - *Evidence*: All 9 primary route groups return HTTP 200 cleanly.

---

## Phase 9: Real Collection Realignment, Dynamic Covers & Contrast Fortification (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: MegaMenu, Layout Widths, Collections, Slugs, Image Covers & CSS Cascade Layers*

- [x] **Task 9.1: Global Full-Width Edge-to-Edge Container Expansion**
  - *Action*: Replaced restrictive `max-w-7xl` containers across all sections (`Header.jsx`, `HeroEditorial.jsx`, `BestSellersTabs.jsx`, `HeritageVideoBanner.jsx`, `ChooseYourBatikGrid.jsx`, `ShoppableLookbook.jsx`, `CustomerLoveNotes.jsx`, `TrustGuaranteeBar.jsx`, `ShowroomO2O.jsx`, `Footer.jsx`) with edge-to-edge luxury padding: `w-full px-4 sm:px-8 lg:px-12 xl:px-16`.
  - *Evidence*: Verified full edge-to-edge rendering without horizontal overflow.
- [x] **Task 9.2: Aside & Slide-Over Drawer Rebuild (`Aside.jsx`)**
  - *Action*: Replaced missing default Hydrogen `.overlay` classes with 100% Tailwind utility classes (`fixed inset-0`, `backdrop-blur-sm`, `translate-x-0` transitions, `z-50`).
  - *Evidence*: Drawers open, close, and render cleanly on desktop and mobile.
- [x] **Task 9.3: Balanced 3-Column MegaMenu & Underline Removal (`MegaMenu.jsx`)**
  - *Action*: Restructured MegaMenu to 3-column architecture (Catalog 5 cols, Highlights 4 cols, Editorial 3 cols), detached individual `relative` anchors to eliminate horizontal viewport clipping, and removed conflicting link underline decorations.
  - *Evidence*: Visual inspection verified zero clipping and zero duplicate hover underlines.
- [x] **Task 9.4: Real Shopify Collection Slugs & Legacy `/collections/sarimbit` Purge**
  - *Action*: Aligned codebase to actual Shopify collections (`sarimbit-exclusive`, `sarimbit-premium`, `sarimbit-ekonomis`, `jarik-kain-batik`), purged all obsolete `/collections/sarimbit` and mock handles, and installed a 301 permanent redirect table in `collections.$handle.jsx`.
  - *Evidence*: Probed all collection handles via curl; 100% returned HTTP 200 OK or 301 Redirect.
- [x] **Task 9.5: Product Slug Cleaning (`?Title=Default+Title` Purge)**
  - *Action*: Implemented server-side 301 redirect in `products.$handle.jsx` stripping `?Title=Default+Title`, and synchronized client options via `window.history.replaceState`.
  - *Evidence*: Probed `/products/gamis-parang-kusumo?Title=Default+Title` -> HTTP 301 to clean URL.
- [x] **Task 9.6: Curated Featured Collections Component (`FeaturedCollections.jsx`)**
  - *Action*: Created `FeaturedCollections.jsx` showcasing 6 core pillars, and updated `HOMEPAGE_QUERY` in `_index.jsx` to fetch live CDN collection images (`collection.image.url`) directly from Shopify Storefront API.
  - *Evidence*: Live collection covers rendered on homepage with 0px radius Quiet Luxury styling.
- [x] **Task 9.7: Root-Cause CSS Cascade Layer & Button Contrast Resolution**
  - *Action*: Resolved root cause where unlayered `reset.css` rule `a { color: inherit; }` superseded Tailwind v4 `@layer utilities` classes (`.text-white`). Wrapped `reset.css` inside `@layer base` and locked `!text-white hover:!text-[#111111]` on all dark CTA buttons.
  - *Evidence*: High-contrast text verified across MegaMenu CTA, PDP AddToCartButton, Search, and Cart.
- [x] **Task 9.8: Final Verification & Typegen Integrity**
  - *Action*: Executed `npm run lint` (0 warnings, 0 errors) and `npm run build` (Exit Code 0).
  - *Evidence*: Client, SSR bundle, and typegen verified. Dev server running on `http://localhost:3005/`.

