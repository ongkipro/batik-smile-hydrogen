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

---

## Phase 10: Quiet Luxury SVG Icons Upgrade & Mobile Navigation De-clutter (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: Footer, Information Pages, Mobile Navigation, WhatsApp Concierge*

- [x] **Task 10.1: Master Footer Quiet Luxury SVG Icons (`Footer.jsx`)**
  - *Action*: Integrated fine-line 1.5px Quiet Luxury SVG icons for showroom buildings, operating clocks, catalog collections, boutique services, WhatsApp concierge, Instagram, and trust badges (100% Asli, Bebas Tukar, Bebas Ongkir).
  - *Evidence*: Rendered cleanly across desktop and mobile.
- [x] **Task 10.2: Showroom Amenities & Facilities Page Upgrade (`pages.fasilitas-store.jsx`)**
  - *Action*: Replaced raw emojis (`🚗`, `❄️`, `🕌`, `💳`) with custom SVG icons (parking, AC airflow, clean prayer room, payment methods), verified authentic showroom photography, and fortified button text contrast.
  - *Evidence*: Probed `/pages/fasilitas-store` -> HTTP 200.
- [x] **Task 10.3: Culture & Core Values Page Upgrade (`pages.tentang-kami.jsx`)**
  - *Action*: Integrated tailored SVG icons for 3S 1C 1T & 1H service culture and 3 core values (Keaslian Motif, Kenyamanan Sejati, Bebas Minimal Order).
  - *Evidence*: Probed `/pages/tentang-kami` -> HTTP 200.
- [x] **Task 10.4: Showroom Directory & Maps Upgrade (`pages.lokasi-toko.jsx`)**
  - *Action*: Added bespoke location pin, clock, facility, and WhatsApp icons to Simongan and Banyumanik store cards with high-contrast buttons.
  - *Evidence*: Probed `/pages/lokasi-toko` -> HTTP 200.
- [x] **Task 10.5: Bespoke Tailoring & Uniform Page Upgrade (`pages.layanan-seragam.jsx`)**
  - *Action*: Added tailored SVG icons to 3 core advantages (No MOQ, Hero Lining, Digital Sizing), corporate client portfolios (RS Bhayangkara, RSUD Tugurejo), and 4-step workflow.
  - *Evidence*: Probed `/pages/layanan-seragam` -> HTTP 200.
- [x] **Task 10.6: Dynamic Legal Policies Index Cards (`policies._index.jsx`)**
  - *Action*: Added dynamic SVG icons for refund, shipping, privacy, and terms documents.
  - *Evidence*: Probed `/policies` -> HTTP 200.
- [x] **Task 10.7: Mobile Navigation De-clutter & Sticky WhatsApp Concierge (`WhatsAppConcierge.jsx` + `MobileNavigation.jsx`)**
  - *Action*: Hid floating sticky WhatsApp widget on mobile/tablet (`hidden lg:block`) to prevent collision with the bottom sticky app navigation bar; polished `MobileNavigation.jsx` with Quiet Luxury design tokens, zero-radius cart badge, and unified WA CS link.
  - *Evidence*: Verified 0 visual collisions on mobile screens.
- [x] **Task 10.8: Quality Verification & Zero-Error Check**
  - *Action*: Ran `npm run lint` (0 errors) and `npm run build` (Exit Code 0).
  - *Evidence*: Production build succeeded.

---

## Phase 11: All-Page Responsive Screening, Clean Card Badges & Mobile Web App Refinement (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: All Routes, Header/MegaMenu, ProductItem, Mobile Navigation, Safe Area Insets*

- [x] **Task 11.1: Header & Mega Menu 4-Pillar Focus (`Header.jsx` + `MegaMenu.jsx`)**
  - *Action*: Streamlined header navigation to exactly 4 clean menus: `Sarimbit`, `Batik Pria`, `Batik Wanita`, and `Batik Anak`. Removed all "kasta" and "tier" nomenclature across subcategories and badges. Aligned mobile drawer with the 4 pillars.
  - *Evidence*: Verified 4 menus rendered in desktop header and mobile drawer.
- [x] **Task 11.2: Product Card Badges Removal (`ProductItem.jsx`, `ChooseYourBatikGrid.jsx`, `BestSellersTabs.jsx`)**
  - *Action*: Removed all floating overlay badges (`SALE`, `Terbaru`, `Kain Tradisional`) from all product cards across homepage, collection catalogs, and search results for a pure Quiet Luxury aesthetic.
  - *Evidence*: Rendered cards show pure 4:5 photography without stickers.
- [x] **Task 11.3: Mobile Sticky Navigation Bar Refinement (`MobileNavigation.jsx`)**
  - *Action*: Removed Cart button (already accessible in header); retained Beranda, Kategori, Cari, and WA CS in a clean 4-item bottom bar with `env(safe-area-inset-bottom)` support.
  - *Evidence*: Mobile bottom bar displays exactly `['Beranda', 'Kategori', 'Cari', 'WA CS']`.
- [x] **Task 11.4: Elimination of `max-w-[100vw]` Bug Across Codebase**
  - *Action*: Replaced `max-w-[100vw]` with `max-w-7xl` across all routes and components (`collections.$handle.jsx`, `collections.all.jsx`, `collections._index.jsx`, `products.$handle.jsx`, `TierExperience.jsx`, `SarimbitSpotlight.jsx`, `CraftsmanshipZoom.jsx`, `HeroSlider.jsx`) to prevent unwanted horizontal scrolling on mobile devices.
  - *Evidence*: Grep search for `max-w-[100vw]` returns 0 matches.
- [x] **Task 11.5: Sticky Mobile Action Bar Polish (`StickyMobileBar.jsx`)**
  - *Action*: Upgraded to zero-radius architecture (`rounded-none`), Quiet Luxury tokens (`#111111`/`#C5A059`), and elevated above the bottom bar with safe area padding.
  - *Evidence*: Mobile PDP displays sticky add-to-cart above bottom bar without overlap.
- [x] **Task 11.6: All-Page Responsive Mobile Clearance**
  - *Action*: Upgraded outer padding across `collections.*`, `products.$handle`, `search.jsx`, `cart.jsx`, and all `/pages/*` and `/policies/*` routes to `pt-10 pb-24 lg:pb-16` with safe-area calculations.
  - *Evidence*: All 14 tested canonical routes return HTTP 200 OK without content cut-off.
- [x] **Task 11.7: Production Verification**
  - *Action*: Ran `npm run lint` (0 errors) and `npm run build` (Exit Code 0).
  - *Evidence*: Production build verified clean.

---

## Phase 12: Card Typography Alignment, Collection-Aware Related Products, & Mobile Header De-clutter (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: ProductItem, PDP products.$handle, HeaderCtas*

- [x] **Task 12.1: Centered Card Typography & Pricing (`ProductItem.jsx`)**
  - *Action*: Aligned product title, product type, and price to center (`text-center items-center justify-center`) for balanced symmetry.
  - *Evidence*: Rendered cards show centered title and pricing.
- [x] **Task 12.2: Dynamic Collection-Aware Related Products on PDP (`products.$handle.jsx`)**
  - *Action*: Queried `collections(first: 5)` with nested products in `PRODUCT_FRAGMENT`. Implemented matching collection detection (favoring specific categories over generic shop/frontpage). Filtered out current product and rendered up to 4 related products from the exact same collection. Added "Lihat Semua Koleksi" link.
  - *Evidence*: Tested `/products/kain-tenun-troso` (returns `Rekomendasi Jarik Anak`) and `/products/sarimbit-mustard-gold` (returns `Rekomendasi Sarimbit Exclusive`).
- [x] **Task 12.3: Mobile Header Simplification (`Header.jsx`)**
  - *Action*: Hid search button on mobile (`hidden lg:block`) since Search is already in the sticky bottom menu. Surfaced customer Account icon on mobile header alongside Cart.
  - *Evidence*: Mobile header renders Logo + Account + Cart.
- [x] **Task 12.4: Production Build & Lint Verification**
  - *Action*: Ran `npm run lint` (0 errors) and `npm run build` (Exit Code 0).
  - *Evidence*: Verified 0 lint warnings/errors and clean build bundle.

---

## Phase 13: Desktop Responsiveness Eradication, Container Normalization & Production Edge Deployment (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: ShoppableLookbook, FeaturedCollections, BestSellersTabs, ChooseYourBatikGrid, TrustGuaranteeBar, FamilyBundleBuilder, Oxygen Deployment*

- [x] **Task 13.1: Desktop Overlap Eradication in Shoppable Lookbook (`ShoppableLookbook.jsx`)**
  - *Action*: Fixed collision on 1024px-1366px desktop viewports. Replaced rigid 16:9 ratio with adaptive `lg:min-h-[480px] lg:aspect-auto` on photo container. Adjusted column split to `lg:col-span-7 xl:col-span-8` (image) and `lg:col-span-5 xl:col-span-4` (card). Re-architected spec rows with `flex-col sm:flex-row sm:items-baseline sm:justify-between` and `shrink-0` labels to prevent horizontal collision. Optimized CTA button font tracking and padding.
  - *Evidence*: Rendered without overlaps across all viewport widths.
- [x] **Task 13.2: Universal Container Max-Width Normalization**
  - *Action*: Wrapped section content in `max-w-7xl mx-auto` across `BestSellersTabs.jsx`, `ChooseYourBatikGrid.jsx`, `FeaturedCollections.jsx`, `HeritageVideoBanner.jsx`, `TrustGuaranteeBar.jsx`, and `ShoppableLookbook.jsx`.
  - *Evidence*: Verified no unbounded horizontal stretching on screens > 1440px.
- [x] **Task 13.3: Quiet Luxury Architectural Compliance for Family Bundle Builder (`FamilyBundleBuilder.jsx`)**
  - *Action*: Replaced non-conforming `rounded-2xl` and `rounded-xl` with Zero-Radius `rounded-none`, aligned colors with brand tokens, and removed emoji.
  - *Evidence*: Verified 0px border-radius styling.
- [x] **Task 13.4: Production Build Verification & Edge Deployment**
  - *Action*: Ran `npm run lint` (0 errors) and `npm run build` (Exit Code 0). Staged, committed, and pushed changes to `origin/main` to trigger automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions (`.github/workflows/oxygen-deployment-1000176204.yml`).
  - *Evidence*: Build successful, git committed and pushed.

---

## Phase 14: 5-Slide Hero Slider, Header Glassmorphism & Microcopy Synchronization (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: HeroSlider, Header, MegaMenu, Footer, WhatsAppConcierge, products.$handle*

- [x] **Task 14.1: 5-Slide Continuous Hero Slider (`HeroSlider.jsx`)**
  - *Action*: Generated 5 high-definition 16:9 photography assets. Integrated into `HeroSlider.jsx` with 4-second continuous rotation. Removed arrow buttons for clean edge-to-edge aesthetics while keeping zero-radius progress bars and mobile touch gestures.
  - *Evidence*: Local server verified returning all 5 slide assets in HTML.
- [x] **Task 14.2: Sticky Header Dynamic Scroll Glassmorphism & Solid White Hover Synergy (`Header.jsx` & `MegaMenu.jsx`)**
  - *Action*: Implemented scroll-aware frosted glassmorphism (`bg-white/80 backdrop-blur-xl border-b border-[#E2DFD8]/80`). Connected hover & mega-menu state so header becomes solid pure white (`bg-white`), creating a seamless connection with the Mega Menu dropdown.
  - *Evidence*: Verified state machine and zero visual friction.
- [x] **Task 14.3: Concierge Microcopy & PDP De-clutter**
  - *Action*: Removed Family Bundle Builder from `products.$handle.jsx`. Cleaned Footer WhatsApp button to display phone number without "WHATSAPP:" prefix. Changed floating button text to "KONSULTASI VIA WHATSAPP" in `WhatsAppConcierge.jsx`.
  - *Evidence*: Verified rendered markup.
- [x] **Task 14.4: Production Build & Automated Edge Deployment**
  - *Action*: Ran `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit Code 0). Staged, committed, and pushed to `origin/main` for automated deployment to Shopify Oxygen.
  - *Evidence*: Deployed and verified live.

---

## Phase 15: Tailored Tier Architecture for Sarimbit Exclusive & Premium (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: collections.$handle, ProductItem, Oxygen Deployment*

- [x] **Task 15.1: Full-Bleed Cinematic Hero Banners with Background Image (`collections.$handle.jsx`)**
  - *Action*: Converted standard header into full-bleed cinematic hero background sections for `sarimbit-exclusive` (Obsidian Noir with dark gold gradient) and `sarimbit-premium` (Golden Hour Scrim with warm Champagne Gold Silk canvas `#F3EDE2`).
  - *Evidence*: Local server verified returning `h-[62vh]` and `h-[58vh]` hero banners with background image and overlays.
- [x] **Task 15.2: Differentiated Product Card Architecture (`ProductItem.jsx`)**
  - *Action*: Implemented `variant="exclusive" | "premium" | "default"`. Exclusive cards feature dark obsidian containers with gold hairline borders and `SUTRA ATBM • PRADA EMAS` badge. Premium cards feature floating white studio cards with ambient gold glow (`shadow-[0_4px_20px_rgba(197,160,89,0.10)]`) and `TENUN DOBBY • FURING HERO` badge.
  - *Evidence*: Rendered correctly across `/collections/sarimbit-exclusive` and `/collections/sarimbit-premium`.
- [x] **Task 15.3: Production Build & Automated Edge Deployment**
  - *Action*: Ran `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit Code 0). Staged, committed, and pushed to `origin/main` for automated deployment to Shopify Oxygen.
  - *Evidence*: Deployed and verified live.

---

## Phase 16: Luxury 3-Column MegaMenu Redesign & Header Center Precision (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: MegaMenu, Header Navigation, Desktop Layout*

- [x] **Task 16.1: Symmetrical 3-Column Architecture & Category Refinement (`MegaMenu.jsx`)**
  - *Action*: Refactored MegaMenu into a 4-4-4 symmetrical grid. Column 1 houses subcategories with minimal 1.5px gold outline icons. Shortened Sarimbit list to 3 official collection handles (`Sarimbit Exclusive`, `Sarimbit Premium`, `Sarimbit Ekonomis`). Removed count `(12)` and elevated button to `JELAJAHI SELURUH KOLEKSI` with geometric rotating diamond hover. Column 2 houses strictly 3 recent products (no overflow/scrollbars). Column 3 houses the modular featured spotlight banner.
  - *Evidence*: `npm run lint` (0 errors) and `npm run build` (Exit Code 0).
- [x] **Task 16.2: Desktop Header Middle Center Alignment & Icon-Only Actions (`Header.jsx`)**
  - *Action*: Rebalanced desktop header to true mathematical center using balanced `flex-1 justify-start` and `flex-1 justify-end` containers flanking the middle `flex-shrink-0 justify-center` menu. Streamlined action cluster to icon-only (removed `MASUK` text, unified Search and Account buttons with matching `p-2.5` padding and `w-5 h-5` icons).
  - *Evidence*: Rendered cleanly, tested locally across breakpoints, 0 build warnings.
- [x] **Task 16.3: Production Build & Automated Edge Deployment**
  - *Action*: Run `npm run lint` and `npm run build`. Commit and push to `origin/main` for automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions.
  - *Evidence*: GitHub Actions Oxygen deployment workflow verified green.

---

## Phase 17: Scattered Atelier Moodboard & Luxury Pagination (`collections._index.jsx`) (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: All Collections Route, Pagination Component*

- [x] **Task 17.1: Artistic Scattered Moodboard Architecture & 5:4 Landscape Ratio (`collections._index.jsx`)**
  - *Action*: Configured landscape 5:4 aspect ratio (`aspect-[5/4]`) for full-bleed photography cards. Implemented 12 cyclic `SCATTER_STYLES` giving each card an artful organic tilt, vertical staggered offset, translucent washi tape accent, serial plate (`ARC-01` to `ARC-12`), and atelier wax stamp. Added tactile hover motion (straightens to `rotate-0`, expands with ambient gold glow). Added mobile-optimized 1-column layout and horizontal category anchor swipe bar. Set `pageBy: 9` for lightweight initial loading and 9-item pagination increments.
  - *Evidence*: Tested locally on `http://localhost:3005/collections`, verified rendering and transitions.
- [x] **Task 17.2: Quiet Luxury Zero-Radius Load More Engine (`PaginatedResourceSection.jsx`)**
  - *Action*: Upgraded hydrogen pagination into an architectural expansion bar with gold diamond motif, `JELAJAHI LEBIH BANYAK KOLEKSI ↓` button with animated gold spinner (`MEMUAT ARSIP KOLEKSI...`), and previous link support.
  - *Evidence*: `npm run lint` (0 errors) and `npm run build` (Exit Code 0).
- [x] **Task 17.3: Production Build & Automated Edge Deployment**
  - *Action*: Run `npm run lint` and `npm run build`. Commit and push to `origin/main` for automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions.
  - *Evidence*: GitHub Actions Oxygen deployment workflow verified green.

---

## Phase 18: Live Catalog Optimization, WhatsApp Sarimbit Partitioning, Standard Taxonomy & Semantic Blog Engine (COMPLETED ✅)
*Semantic Risk: R0 (Catalog Sync & Content Engine) | Primary Boundary: Shopify Admin GraphQL, Storefront Catalog, Blog Articles*

- [x] **Task 18.1: Complete Store Product Purge & Clean Slate**
  - *Action*: Purged all 20 legacy products and verified automatic deletion of 100 attached media items. Deleted obsolete collection `sarimbit-batik-couple` (`ID: 480516145209`).
  - *Evidence*: `productsCount: 0` verified, zero orphaned media remaining.
- [x] **Task 18.2: 20 Minimalist 3-Word RTW Products Upload & 100 Image Ingestion**
  - *Action*: Ingested 100 4:5 lookbook images from `/Users/ongki/Downloads/Batik Smile/product_images/`. Applied strictly 3-word minimalist titles, rich SEO metadata, and quiet luxury HTML descriptions.
  - *Evidence*: 20 products verified with exactly 5 images each and 3-word titles.
- [x] **Task 18.3: WhatsApp High-Ticket Sarimbit 50/50 Partitioning (Zero Duplication)**
  - *Action*: Analyzed `/Users/ongki/Downloads/WhatsApp Unknown 2026-09-03 at 11.43.35` and created 3 couple sets: 2 sets in `sarimbit-exclusive` (*Mustard Gold*, *Royal Navy*) and 1 set in `sarimbit-premium` (*Charcoal Hitam*). Enforced zero cross-tier duplicate collections.
  - *Evidence*: Verified `sarimbit-exclusive` has 2 products, `sarimbit-premium` has 1 product, overlap = 0.
- [x] **Task 18.4: Zero-Product Collection Auto-Population (Zero Sarimbit Added)**
  - *Action*: Populated 7 empty collections (`Blazer Batik Wanita`, `Inner Busana Batik`, `Gamis Batik Anak`, `Kebaya Batik Anak`, `Jarik Anak`, `Babydoll Batik Anak`, `Sarung Batik Anak`) using non-sarimbit RTW items.
  - *Evidence*: 0 empty collections remaining, 0 Sarimbit items in these 7 collections.
- [x] **Task 18.5: Standard Product Taxonomy / Google Category 100% Configuration**
  - *Action*: Mapped and updated all 23 live products to official Shopify/Google Standard Product Taxonomy categories (`Tunics`, `Blouses`, `Cardigans`, `Dresses`, `Nightgowns`, `Dress Shirts`, `Shirts`, `Pants`, `Outfit Sets`, `Baby & Children's Dresses`, `Baby & Children's Outfits`, `Fabric`, `Hats`).
  - *Evidence*: Verified `All Categories Configured: True` via GraphQL query.
- [x] **Task 18.6: 11 Official Shopify Pages Deployed from Company Profile**
  - *Action*: Extracted `COMPANY PROFILE.pdf` and updated/created 11 live published pages on Shopify: `tentang-kami`, `layanan-seragam`, `fasilitas-store`, `lokasi-toko`, `contact`, `hubungi-kami`, `panduan-ukuran`, `panduan-perawatan`, `kebijakan-pengembalian`, `kebijakan-pengiriman`, `syarat-dan-ketentuan`.
  - *Evidence*: Verified 11 published pages on `23ahbp-sq.myshopify.com`.
- [x] **Task 18.7: 12 Plain-Text Semantic Blog Articles Deployed to Shopify**
  - *Action*: Created 12 plain-text editorial articles in `gid://shopify/Blog/108131713081` without custom inline HTML/CSS, attached Shopify CDN featured images, and set author `Batik Smile Editorial`.
  - *Evidence*: Verified 12 articles live in `news` blog with `All 12 Articles Valid, Published, and Image Attached: True`.

---

## Phase 19: Dual-Section Homepage Collection Hierarchy (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: SarimbitBentoSection, PersonalWardrobeSection, _index.jsx, PAGES-SCHEMA.xml*

- [x] **Task 19.1: Signature Sarimbit Asymmetric Bento Grid (`SarimbitBentoSection.jsx`)**
  - *Action*: Created `SarimbitBentoSection.jsx` positioned directly under `HeroSlider`. Dedicated to the 3 Sarimbit tiers (`sarimbit-exclusive`, `sarimbit-premium`, `sarimbit-ekonomis`). Desktop 12-column asymmetric bento layout: dominant 7-column portrait card for Sarimbit Exclusive with gold hairline accents, and 5-column dual-stacked cards for Sarimbit Premium and Sarimbit Ekonomis. Zero-radius architecture (`rounded-none`), slow ambient hover transitions, and quiet luxury typography.
  - *Evidence*: Verified rendering on desktop and mobile viewports.
- [x] **Task 19.2: Personal Wardrobe & Multi-Generational Triptych (`PersonalWardrobeSection.jsx`)**
  - *Action*: Created `PersonalWardrobeSection.jsx` positioned after `HeritageVideoBanner`. Features the 3 personal collection pillars: `batik-pria` (Jahitan Sambung Motif & Furing Hero), `batik-wanita` (Blus Modern, Tunik, Kebaya), and `batik-anak` (Setelan Adat & Hem Katun Lembut). Symmetrical 3-column grid with quiet luxury cards, 4:5 vertical proportions, and gold micro-accents.
  - *Evidence*: Verified clean grid alignment and responsiveness.
- [x] **Task 19.3: Homepage Route Integration & GraphQL Query Synchronization (`app/routes/_index.jsx`)**
  - *Action*: Updated `HOMEPAGE_QUERY` in `_index.jsx` to fetch `collections(first: 20)` ensuring all 6 collections are retrieved with live Shopify images. Re-ordered homepage sections to establish the dual-section rhythm: Hero -> Sarimbit Bento -> Best Sellers Tabs -> Heritage Video -> Personal Wardrobe -> Choose Your Batik -> Lookbook -> Testimonials -> Trust -> Showroom. Updated `PAGES-SCHEMA.xml`.
  - *Evidence*: Page loader returns complete collection set and renders both sections flawlessly.
- [x] **Task 19.4: Production Build Verification & Automated Edge Deployment**
  - *Action*: Ran `npm run lint` and `npm run build`.
  - *Evidence*: `npm run build` exits with code 0, clean Vite + Hydrogen SSR bundle.

---

## Phase 20: Full-Cycle Editorial Blog System (Homepage, List & Dynamic Article) (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: EditorialJournalSection, blogs._index, blogs.$blogHandle._index, blogs.$blogHandle.$articleHandle, _index.jsx*

- [x] **Task 20.1: Homepage Editorial Journal Component (`EditorialJournalSection.jsx`) & Loader Query**
  - *Action*: Created `EditorialJournalSection.jsx` showcasing 3 latest editorial articles on Homepage. Connected GraphQL query in `_index.jsx` to fetch live blog articles from Shopify Storefront API. Zero-radius cards with 16:10 photography, Indonesian dates, Cormorant Garamond headlines, rich excerpts, and direct links to `/blogs/${blogHandle}/${articleHandle}` and `/blogs`.
  - *Evidence*: Verified HTTP 200 and markup rendering on `http://localhost:3005/`.
- [x] **Task 20.2: Premium Editorial Blog Listing & Direct Article Catalog (`blogs._index.jsx` & `blogs.$blogHandle._index.jsx`)**
  - *Action*: Upgraded `/blogs` from empty 1-card blog list to a comprehensive editorial archive. Queried primary blog articles directly with featured hero article banner, category filter pills, 3-column quiet luxury article grid, and `PaginatedResourceSection` pagination. Aligned `blogs.$blogHandle._index.jsx` with matching Quiet Luxury styling.
  - *Evidence*: Verified HTTP 200 rendering on `http://localhost:3005/blogs` and `http://localhost:3005/blogs/news`.
- [x] **Task 20.3: Dynamic Article Reading Experience with Related Curations (`blogs.$blogHandle.$articleHandle.jsx`)**
  - *Action*: Upgraded single article view with calculated reading time estimate, social share/WhatsApp link, polished typography (`prose prose-neutral`), fixed redirect handle mapping, and dynamic related articles section at bottom fetching 3 other articles from the same blog.
  - *Evidence*: Verified HTTP 200 rendering on `http://localhost:3005/blogs/news/kisah-canting-filosofi-batik-tulis-jawa`.
- [x] **Task 20.4: Production Build Verification & Automated Edge Deployment**
  - *Action*: Ran `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0).
  - *Evidence*: All 4 blog routes return HTTP 200 cleanly.

---

## Phase 21: Homepage Streamlining & Section Pruning (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: _index.jsx, ChooseYourBatikGrid.jsx, PAGES-SCHEMA.xml*

- [x] **Task 21.1: Removal of Shoppable Lookbook Hotspot Section from Homepage**
  - *Action*: Removed `ShoppableLookbook` import, loader extraction, and JSX render block from `app/routes/_index.jsx` to streamline scroll depth and focus visitor attention on the new Editorial Journal section. Removed `lookbookSpotlights` query from `HOMEPAGE_QUERY`, reducing client payload by 13% (from 50.29 kB to 43.65 kB).
  - *Evidence*: Verified removal from homepage HTML on `http://localhost:3005/`.
- [x] **Task 21.2: Pruning of Dual Commercial Pathway Box from ChooseYourBatikGrid (`ChooseYourBatikGrid.jsx`)**
  - *Action*: Removed the 2-column box ("01. BELI PRODUK & KAIN LEMBARAN / 02. TAMBAH JASA BESPOKE TAILORING") from `ChooseYourBatikGrid.jsx`. The section now transitions directly and cleanly from the editorial headline into the 8-product showcase grid.
  - *Evidence*: Rendered without banner box, 0 visual clutters.
- [x] **Task 21.3: Quality Verification & Production Build**
  - *Action*: Ran `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0).
  - *Evidence*: Verified HTTP 200 on `http://localhost:3005/`.

---

## Phase 22: Modern Search UI/UX & Mobile Navigation Overhaul (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: LuxurySearchModal.jsx, PageLayout.jsx, Header.jsx, Aside.jsx, MobileNavigation.jsx*

- [x] **Task 22.1: Modern Desktop Command-Palette & Mobile Full-Screen Search (`LuxurySearchModal.jsx`)**
  - *Action*: Replaced the narrow 420px right slide-over search with a modern luxury search modal. On desktop: grand centered top overlay with auto-focus, ESC shortcut, trending search chips (`Sarimbit Mahakarya`, `Kemeja Furing Hero`, etc.), and multi-faceted live results (products, collections, blog articles). On mobile: full-screen native feel with sticky header and vertical scroll.
  - *Evidence*: Replaced `SearchAside` in `PageLayout.jsx`, verified live on `http://localhost:3005/`.
- [x] **Task 22.2: Mobile Burger Navigation Drawer Redesign (`Header.jsx` & `Aside.jsx`)**
  - *Action*: Upgraded `HeaderMenu` from a plain list to an architectural mobile menu with: quick in-menu search bar, collapsible Sarimbit 3-tier accordion, individual wardrobe categories with subtitle descriptions, prominent Warta & Jurnal Kebudayaan card, physical showroom footprint details (Simongan & Banyumanik), and a direct WhatsApp Concierge CTA button. Updated `Aside.jsx` so the burger menu opens naturally from the left.
  - *Evidence*: Verified interactive rendering and drawer sliding.
- [x] **Task 22.3: Mobile Sticky Navigation & Header Integration (`MobileNavigation.jsx` & `Header.jsx`)**
  - *Action*: Added Jurnal Kebudayaan (`/blogs`) to the mobile sticky bottom bar (Beranda, Kategori, Cari, Jurnal, WA CS). Enabled search button visibility in the mobile top header.
  - *Evidence*: Verified all 5 bottom navigation touchpoints active.
- [x] **Task 22.4: Production Verification & Build Integrity**
  - *Action*: Ran `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0).
  - *Evidence*: Clean compilation of Vite + Hydrogen SSR bundle.
- [x] **Task 22.5: Mobile Menu Decluttering & Modern Recommended Product Search Cards**
  - *Action*: Removed search input and informal emojis/emoticons from mobile drawer menu (`Header.jsx`), replacing them with sharp vector SVG icons and quiet luxury typography. Upgraded `LuxurySearchModal.jsx` by eliminating boxy framing on trending keywords and introducing preloaded curated product cards (2 columns on mobile, 4 on desktop) in the empty state.
  - *Evidence*: `npm run lint` 0 warnings, `npm run build` Exit code 0, verified on dev server.

---

## Phase 23: Scattered Atelier Collection Cards & Testimonial Section Removal (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: SarimbitBentoSection.jsx, PersonalWardrobeSection.jsx, _index.jsx, PAGES-SCHEMA.xml*

- [x] **Task 23.1: Transform Sarimbit Pillars to Scattered Atelier Moodboard Cards (`SarimbitBentoSection.jsx`)**
  - *Action*: Converted rigid Bento grid into a 3-pillar scattered atelier moodboard layout matching `collections._index.jsx` with organic tilts (`-rotate-2`, `rotate-1.5`, `-rotate-1`), translucent archival washi tape accents, archival plate tags (`SRM-01`, `SRM-02`, `SRM-03`), category stamps (`EKSKLUSIF`, `PREMIUM`, `EKONOMIS`), and hover un-tilting.
  - *Evidence*: Verified HTTP 200 on `http://localhost:3005/`.
- [x] **Task 23.2: Transform Personal Wardrobe Pillars to Scattered Atelier Moodboard Cards (`PersonalWardrobeSection.jsx`)**
  - *Action*: Converted symmetrical wardrobe triptych into organic scattered atelier cards with alternating rotation angles, washi tape, and archival plates (`WDR-01`, `WDR-02`, `WDR-03`).
  - *Evidence*: Verified HTTP 200 on `http://localhost:3005/`.
- [x] **Task 23.3: Removal of Customer Testimonials Section from Homepage (`_index.jsx` & `PAGES-SCHEMA.xml`)**
  - *Action*: Removed `CustomerLoveNotes` component render, import, and `customerTestimonials` GraphQL query from `_index.jsx`. Reduced client JS bundle from 43.65 kB to 37.34 kB (14.5% payload reduction).
  - *Evidence*: Verified removal from homepage HTML on `http://localhost:3005/`.
- [x] **Task 23.4: Production Build Verification & Type Safety**
  - *Action*: Ran `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0).
  - *Evidence*: Clean compilation of Vite + Hydrogen SSR bundle.







