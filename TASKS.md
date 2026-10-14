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

---

## Phase 24: Buzzword Pruning & Asymmetric Magazine Gazette Journal UI (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: EditorialJournalSection.jsx, SarimbitBentoSection.jsx, PersonalWardrobeSection.jsx*

- [x] **Task 24.1: Prune English Buzzwords & Cluttered Eyebrow Badges**
  - *Action*: Removed `SIGNATURE FAMILY HAUTE COUTURE` and `BUSANA PERSONAL & LINTAS GENERASI` eyebrow boxes. Cleaned up card names from English buzzwords ("Heritage", "Elegance", "Essential Daily") to direct, dignified names: *Sarimbit Eksklusif*, *Sarimbit Premium*, *Sarimbit Ekonomis*.
  - *Evidence*: Verified clean typography across collection sections.
- [x] **Task 24.2: Redesign Editorial Journal to Asymmetric Magazine Gazette (`EditorialJournalSection.jsx`)**
  - *Action*: Replaced repetitive 3-box vertical card grid with an Asymmetric Magazine Gazette layout: 7-column Lead Spotlight Article on the left with 16:10 photography and deep excerpt + 5-column Compact Horizontal Editorial Stories on the right with thumbnails, clean dividers, and archive portal.
  - *Evidence*: `npm run lint` 0 warnings, `npm run build` Exit code 0, verified on `http://localhost:3005/`.

---

## Phase 25: Frameless Minimalist Editorial Journal & Global Divider Line Purge (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: EditorialJournalSection.jsx, HeroSlider.jsx, SarimbitBentoSection.jsx, PersonalWardrobeSection.jsx, BestSellersTabs.jsx, ChooseYourBatikGrid.jsx, HeritageVideoBanner.jsx, ShowroomO2O.jsx*

- [x] **Task 25.1: Purge Harsh Section Divider Lines Across the Homepage**
  - *Action*: Removed `border-b border-[#E2DFD8]`, `border-[#1C1C1C]`, and decorative center lines (`<div className="w-12 h-px bg-[#C5A059] ..." />`) across all sections (`HeroSlider`, `SarimbitBentoSection`, `PersonalWardrobeSection`, `BestSellersTabs`, `ChooseYourBatikGrid`, `HeritageVideoBanner`, `ShowroomO2O`). Restored `TrustGuaranteeBar` to exact original styling per explicit directive.
  - *Evidence*: Clean seamless visual rhythm across homepage without visual barrier lines.
- [x] **Task 25.2: Dedicated Frameless Minimalist Editorial Journal UI (`EditorialJournalSection.jsx`)**
  - *Action*: Designed a dedicated, frameless editorial journal experience separate from the collections' scattered cards. Zero card containers (`bg-white` and `border-[#E2DFD8]` purged), frameless photography (locked 3:2 aspect ratio), micro-index tags (`01 / ARSIP BUDAYA`), pure Cormorant Garamond serif titles, gentle excerpts, and subtle underlined text links.
  - *Evidence*: `npm run lint` 0 warnings, `npm run build` Exit code 0, bundle size down to 34.82 kB (gzip: 8.86 kB).

---

## Phase 26: Dynamic Precision Spacing & Blog List UI Redesign (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: blogs._index.jsx, blogs.$blogHandle._index.jsx, EditorialJournalSection.jsx, BestSellersTabs.jsx, ChooseYourBatikGrid.jsx, HeritageVideoBanner.jsx, PersonalWardrobeSection.jsx, SarimbitBentoSection.jsx, ShowroomO2O.jsx*

- [x] **Task 26.1: Precision Vertical Padding Screening & Calibration**
  - *Action*: Screened all homepage sections and eliminated excessive whitespace. Reduced consecutive section padding from bloated `py-20 sm:py-28` down to dynamic, calibrated `py-12 sm:py-16`. Tightened header margins from `mb-14 sm:mb-20` to `mb-8 sm:mb-10`. Adjusted contrast banners (`HeritageVideoBanner` & `ShowroomO2O`) to `py-16 sm:py-20`.
  - *Evidence*: Eliminated ~140px+ of dead space per boundary, creating a cohesive, unbroken vertical reading rhythm.
- [x] **Task 26.2: Redesign Blog List Pages with Locked 3:2 Media Ratio (`blogs._index.jsx` & `blogs.$blogHandle._index.jsx`)**
  - *Action*: Replaced old boxed cards with Frameless Minimalist Editorial layouts. Locked article media ratio strictly to **3:2** (`aspect-[3/2]`), eliminated clunky borders and card containers, added clean curatorial archive bars, micro-category stamps, Cormorant Garamond typography, and subtle underlined read actions. Configured 3x3 mathematical pagination quota (`pageBy: 9`).
  - *Evidence*: `npm run lint` 0 warnings, `npm run build` Exit code 0, HTTP 200 OK verified on `/blogs` and `/blogs/news`.

---

## Phase 27: Header Jurnal Menu, Smart Desktop WhatsApp, & Single Article UI/UX (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: MegaMenu.jsx, WhatsAppConcierge.jsx, blogs.$blogHandle.$articleHandle.jsx*

- [x] **Task 27.1: Add Jurnal Menu to Desktop Header Navigation (`MegaMenu.jsx`)**
  - *Action*: Added direct, permanent `JURNAL` link to the main desktop navigation bar in `MegaMenu.jsx` with active border indicator matching the Quiet Luxury navigation tokens.
  - *Evidence*: Desktop navigation bar provides direct access to `/blogs`.
- [x] **Task 27.2: Smart Desktop Sticky WhatsApp Concierge (`WhatsAppConcierge.jsx`)**
  - *Action*: Upgraded floating WhatsApp concierge to intelligently hide when inside the Hero/top fold (`scrollY < 420px`) and when reaching the Footer (via `IntersectionObserver`). Uses smooth opacity and slide transitions.
  - *Evidence*: Zero visual clutter in hero and zero overlap with footer contact information.
- [x] **Task 27.3: Master Frameless Luxury Editorial Article UI/UX (`blogs.$blogHandle.$articleHandle.jsx`)**
  - *Action*: Re-architected single article into a world-class frameless editorial experience. Purged the boxed card anti-pattern (`bg-white` and border lines removed), locked hero media and related articles strictly to **3:2 ratio** (`aspect-[3/2]`), implemented a 680px (`max-w-2xl`) intimate reading measure for optimal eye comfort, added a hairline gold scroll progress bar, drop cap on opening paragraph, provenance signature stamp, and integrated "Shop The Story" (curated 4:5 products linked to the story).
  - *Evidence*: `npm run lint` 0 warnings, `npm run build` Exit code 0, HTTP 200 OK verified on live article routes.

---

## Phase 28: PDP Precision UI/UX & Cohesive Straight-Line Architecture (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: products.$handle.jsx, StickyMobileBar.jsx*

- [x] **Task 28.1: Eliminate Boxed Card Anti-Pattern on PDP Right Column**
  - *Action*: Removed `bg-white border border-[#E2DFD8] shadow-sm` from the right purchasing column in `products.$handle.jsx`. The product details now flow organically on the warm Mori Linen canvas (`#FAF8F5`), perfectly consistent with the frameless Quiet Luxury standard across the store.
  - *Evidence*: Seamless visual flow between gallery and product details without artificial card enclosures.
- [x] **Task 28.2: 4:5 Gallery Enhancement & Dynamic Breadcrumbs**
  - *Action*: Locked all product images strictly to **4:5 aspect ratio** (`aspect-[4/5]`), added image counter badge (`1 / 5`), and updated breadcrumbs to dynamically link to the product's actual collection instead of hardcoded paths.
  - *Evidence*: Strict 4:5 portrait proportions verified on gallery, thumbnails, and related products grid.
- [x] **Task 28.3: Sizing Architecture & Interactive Size Guide Modal**
  - *Action*: Added an interactive Size Guide drawer displaying the official boutique regular-fit sizing table (S, M, L, XL, XXL) with measurements (LD, PB, PL). Made size guide and fitting consultation available for all products including single-variant/bespoke items.
  - *Evidence*: `npm run lint` 0 warnings, `npm run build` Exit code 0, HTTP 200 OK verified on `/products/kebaya-encim-modern`.
- [x] **Task 28.4: Direct BELI SEKARANG Action & Dynamic Shopify Description Grid**
  - *Action*: Replaced WhatsApp secondary CTA with high-conversion direct checkout `BELI SEKARANG` button (redirects instantly to Shopify hosted checkout with 303 Location header). Removed cluttered bespoke tailoring and fitting boxes. Transformed monolithic Shopify `descriptionHtml` into an elegant, unified visual layout: poetic narrative quote + dynamic 2-column specifications cards (`◆ Bahan`, `◆ Furing`, `◆ Konstruksi`, `◆ Perawatan`).
  - *Evidence*: `npm run lint` 0 warnings, `npm run build` Exit code 0, verified on `/products/sarimbit-royal-navy`.

---

## Phase 29: PDP Master Frameless Architecture, Quantity Precision & Tier-Differentiated Experience (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: products.$handle.jsx, AddToCartButton.jsx, StickyMobileBar.jsx, Oxygen Deployment*

- [x] **Task 29.1: Total Elimination of Card/Frame Clutter on Product Page**
  - *Action*: Stripped boxed pills on stock availability (`TERSEDIA DI BUTIK` -> elegant borderless `● Tersedia di Butik`), replaced 3 boxed value-prop pills with a single seamless typographic line with gold middle dots, replaced fake black button on single-variants with clean editorial text, and converted boxed description spec cards into a frameless atelier definition list with subtle hairline dividers (`divide-y divide-[#E2DFD8]/80`).
  - *Evidence*: Clean visual hierarchy matching luxury fashion house editorial standards.
- [x] **Task 29.2: Auto-Show Dual Dropdown Accordions & Condensed Titles**
  - *Action*: Shortened `PENGIRIMAN RESMI & JAMINAN TUKAR UKURAN 7 HARI` to concise `PENGIRIMAN & GARANSI TUKAR`. Converted description into an accordion with `auto show` (open by default) state, allowing buyers to read the story narrative and specifications immediately upon landing while retaining collapse capability.
  - *Evidence*: Tested locally on dev server; auto-show accordion and concise title verified in SSR output.
- [x] **Task 29.3: Single-Variant Purge & Aligned Quantity/Action Geometry**
  - *Action*: Hidden variant section entirely when a product has only 1 variant or no options (`hasMultipleVariants === false`), preventing redundant "Ukuran: All Size" clutter. Enhanced `AddToCartButton` to support `wrapperClassName` on `fetcher.Form`. Structured Row 1 as Quantity selector (`w-28 h-12`) + Tambah ke Tas Belanja (`flex-1 h-12`), and Row 2 as Beli Sekarang (`w-full h-12`). Row 1 and Row 2 now share mathematically identical container widths (100% aligned).
  - *Evidence*: Verified aligned left and right boundaries on both desktop and mobile viewports.
- [x] **Task 29.4: Tier-Differentiated Showcase for Sarimbit Exclusive & Premium**
  - *Action*: Implemented automatic tier detection. For **Sarimbit Exclusive** (e.g. `sarimbit-royal-navy-1`): rendered `HAUTE HERITAGE • SARIMBIT EXCLUSIVE` eyebrow, tailored sutra ATBM & prada emas value props, and an obsidian heritage showcase pavilion with 3 Pillars of Haute Artistry and VIP Concierge CTA. For **Sarimbit Premium** (e.g. `sarimbit-charcoal-hitam`): rendered `SIGNATURE ATELIER • SARIMBIT PREMIUM` eyebrow, dobby & furing sejuk value props, and a champagne linen showcase pavilion with 3 Signature Standards. Standard products retain clean minimalist Mori Linen styling.
  - *Evidence*: Verified distinct HTML rendering across `/products/sarimbit-royal-navy-1`, `/products/sarimbit-charcoal-hitam`, and `/products/gamis-parang-kusumo`.
- [x] **Task 29.5: Comprehensive Cross-Page & Multi-Device Audit**
  - *Action*: Audited all 16 key routes across homepage, collections, products, articles, informative pages, and cart. Resolved 404 on `/blogs/jurnal` by redirecting to `/blogs` and aliasing `/blogs/jurnal/:handle` to `/blogs/news/:handle`. Audited mobile touch targets, safe area insets, sticky mobile bar direct checkout triggers, and desktop widescreen layouts.
  - *Evidence*: Comprehensive audit script verified all 16 routes returning 200 OK. `npm run lint` 0 warnings, `npm run build` Exit code 0.

---

## Phase 30: Native Collection-Themed PDP for Sarimbit Exclusive (Zero Detached Template) (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: products.$handle.jsx, StickyMobileBar.jsx, Oxygen Deployment*

- [x] **Task 30.1: Native Obsidian Noir PDP Theme Integration**
  - *Action*: Replaced detached template sections with native, cohesive theme inheritance. The entire PDP container now takes `bg-[#111111] text-white` when viewing products from `sarimbit-exclusive`, seamlessly mirroring the visual and color identity of `/collections/sarimbit-exclusive`.
  - *Evidence*: `GET /products/sarimbit-royal-navy-1` SSR renders `min-h-screen ... bg-[#111111] text-white`.
- [x] **Task 30.2: Fine-Tuned Typography, Contrast & Action Harmony**
  - *Action*: Adjusted contrast across all PDP elements: dark breadcrumbs with gold hover, dark thumbnail frames with gold active rings, Cormorant Garamond title in crisp white, stock indicator in vivid `#4ADE80` green, quantity selector in `bg-[#181818] border-[#C5A059]/40`, Tambah ke Tas Belanja in gold outline, Beli Sekarang in solid Imperial Antique Gold (`bg-[#C5A059] text-[#111111]`), and frameless specification accordions on dark obsidian with gold diamond bullets.
  - *Evidence*: Tested locally on dev server; high-contrast readability verified across light and dark viewports.
- [x] **Task 30.3: Harmonized Related Products & Sticky Mobile Bar**
  - *Action*: Configured "Koleksi Selaras" (Related Products) on Sarimbit Exclusive PDP to render `ProductItem` with `variant="exclusive"` (obsidian cards with gold border) and updated `StickyMobileBar.jsx` to render matching obsidian and gold styling with instant direct checkout.
  - *Evidence*: `npm run lint` 0 errors, `npm run build` Exit code 0, 16/16 routes 200 OK.

---

## Phase 31: Decimal Elimination & Minimalist Dynamic Breadcrumbs (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: products.$handle.jsx, StickyMobileBar.jsx, ProductItem.jsx, ProductPrice.jsx, LuxurySearchModal.jsx, SearchResults.jsx, SearchResultsPredictive.jsx, CartSummary.jsx, Oxygen Deployment*

- [x] **Task 31.1: Storefront-Wide Currency Decimal Removal (,00 Elimination)**
  - *Action*: Configured `withoutTrailingZeros as="span"` across all storefront `<Money>` components (PDP price/compareAtPrice, Sticky Mobile Bar, ProductItem cards, ProductPrice, Luxury Search Modal, Search Results, and Cart Summary). This cleans up all `,00` and `.00` fractional decimals across desktop and mobile while preserving clean integer currency formatting (e.g. `IDR 1,250,000` / `Rp 1.250.000`).
  - *Evidence*: Local SSR check on `/products/sarimbit-royal-navy-1` verified `Price without decimals: true` and `Has ,00 or .00 decimal in primary price: false`.
- [x] **Task 31.2: Minimalist Single-Line Dynamic Breadcrumbs**
  - *Action*: Replaced the word "BERANDA" with a clean zero-radius geometric Home SVG icon. Replaced slash separators (`/`) with minimalist chevrons (`>`). Configured container with `overflow-hidden whitespace-nowrap` and applied `truncate min-w-0` to the current product title. This guarantees the breadcrumb adapts fluidly to all device widths (from 360px mobile up to widescreen desktop) on exactly one clean horizontal line without awkward multi-line wrapping.
  - *Evidence*: Local SSR check verified `Has Home icon: true`, `Has text BERANDA: false`, `Has chevron separator: true`, and `Breadcrumb is single line with overflow-hidden whitespace-nowrap: true`.

---

## Phase 32: Indonesian Rupiah (Rp) Standardization, 2-Column Tier Differentiation & Concise CTAs (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: products.$handle.jsx, ProductTierStorySection.jsx, currency.js, StickyMobileBar.jsx, ProductItem.jsx, ProductPrice.jsx, Oxygen Deployment*

- [x] **Task 32.1: Indonesian Rupiah (Rp) Currency Standardization**
  - *Action*: Created `app/lib/currency.js` providing deterministic `formatRupiah` without decimal fractions (e.g. `Rp 1.250.000` instead of `IDR 1,250,000.00`). Applied across PDP, Sticky Mobile Bar, Product Cards, and Standalone Price components to match Indonesian consumer expectations.
  - *Evidence*: Local SSR check on `sarimbit-royal-navy-1` verified `Renders Rp format (e.g. Rp 1.250.000): true`.
- [x] **Task 32.2: Dedicated 2-Column Editorial Tier Differentiation Section**
  - *Action*: Created `app/components/ProductTierStorySection.jsx` rendered exclusively on **Sarimbit Exclusive** (Obsidian Noir theme, Sutra ATBM & canting prada emas story, canting banner image) and **Sarimbit Premium** (Warm Mori Linen theme, tenun dobby timbul & furing hero sejuk story, family harmony banner image). Standard products remain unaffected. Ready for future Metaobject binding.
  - *Evidence*: Verified 2-column section active on `/products/sarimbit-royal-navy-1` and `/products/sarimbit-charcoal-hitam`, absent on standard `/products/gamis-parang-kusumo`.
- [x] **Task 32.3: Concise Mobile-Friendly Collection Button**
  - *Action*: Shortened bottom related collection button from `LIHAT SEMUA KOLEKSI SARIMBIT EXCLUSIVE →` to concise `LIHAT SEMUA KOLEKSI →`, eliminating text overflow and multi-line wrapping on mobile viewports.
  - *Evidence*: Verified single-line layout and exact text in rendered SSR output.

---

## Phase 33: Touch Swipe Gallery, Precision Thumbnail Grid & Frameless Tier Section (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: products.$handle.jsx, ProductTierStorySection.jsx, Oxygen Deployment*

- [x] **Task 33.1: Mobile Touch Swipe & Precision 5-Column Mini-Thumbnails**
  - *Action*: Implemented horizontal touch swipe gestures (`onTouchStart`, `onTouchMove`, `onTouchEnd`) and subtle arrow buttons on the main featured product image. Engineered the mini-thumbnail row to dynamically span exactly 100% of the main image width on mobile when up to 5 images exist (`grid-cols-5 gap-2 w-full`), perfectly aligning the left and right edges. For collections with >5 images, enabled smooth horizontal scrolling (`overflow-x-auto scrollbar-none`).
  - *Evidence*: Local SSR verified `Has Prev Arrow: true`, `Has Next Arrow: true`, `Has mini thumbnail grid for mobile: true`.
- [x] **Task 33.2: Frameless & Borderless Tier Differentiation Section**
  - *Action*: Refactored `ProductTierStorySection.jsx` to completely eliminate the heavy outer card border and isolated box padding. Replaced with an open, architectural editorial layout separated by a subtle hairline top border (`pt-12 sm:pt-16 border-t`) matching the exact width and margin geometry of the product section across all mobile and desktop viewports.
---

## Phase 34: Grid-Proportional Pagination (3x3=9, 4x3=12), Single-Line Breadcrumb & Typography Calibration (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: Breadcrumb.jsx, collections.$handle.jsx, collections.all.jsx, collections._index.jsx, search.jsx, PaginatedResourceSection.jsx, TierExperience.jsx, CraftsmanshipZoom.jsx, CustomerLoveNotes.jsx, ChooseYourBatikGrid.jsx*

- [x] **Task 34.1: Grid-Proportional Pagination (4x3=12 & 3x3=9)**
  - *Action*: Calibrated product list pagination across all catalog listing routes:
    - When catalog grid is 4 columns (desktop standard e.g. `/collections/all`, general `/collections/$handle`, `/search`): configured 3 rows = exactly **12 items** before "LIHAT LEBIH BANYAK" (Load More).
    - When catalog grid is 3 columns (e.g. `/collections/sarimbit-exclusive`, `/collections`, `/blogs`): configured 3 rows = exactly **9 items** before "LIHAT LEBIH BANYAK".
    - Streamlined default load more button text to concise `LIHAT LEBIH BANYAK` / `LIHAT SEBELUMNYA` to eliminate multi-line text breaking on mobile devices.
  - *Evidence*: Configured `pageBy: 12` in `collections.all.jsx` and `search.jsx`; dynamic `isExclusiveCollection ? 9 : 12` in `collections.$handle.jsx`.
- [x] **Task 34.2: Unified Single-Line Breadcrumb Component (`Breadcrumb.jsx`)**
  - *Action*: Created `app/components/Breadcrumb.jsx` and integrated it across all 15 storefront routes (`collections.$handle.jsx`, `collections.all.jsx`, `collections._index.jsx`, `products.$handle.jsx`, `blogs._index.jsx`, `blogs.$blogHandle._index.jsx`, `blogs.$blogHandle.$articleHandle.jsx`, `pages.tentang-kami.jsx`, `pages.fasilitas-store.jsx`, `pages.layanan-seragam.jsx`, `pages.lokasi-toko.jsx`, `pages.$handle.jsx`, `cart.jsx`, `search.jsx`, `policies._index.jsx`, `policies.$handle.jsx`, `account.jsx`).
  - *Precision Engineering*: Strictly guaranteed **maximum 1 line** on all mobile devices (from 320px up to widescreen) using `flex-nowrap whitespace-nowrap overflow-hidden`, `shrink-0` on Home icon & chevrons, and progressive truncation (`truncate min-w-0 flex-1 sm:flex-initial`).
  - *Evidence*: Audited entire codebase: 0 raw `BERANDA` or `/` breadcrumb text remaining.
- [x] **Task 34.3: Storefront-Wide Screening & Zero-Radius Typography Calibration**
  - *Action*: Refactored `TierExperience.jsx` to eliminate `rounded-full`, `rounded-2xl`, and non-harmonic blue colors, aligning with Quiet Luxury Quad-Harmonic palette (`#111111`, `#FAF8F5`, `#C5A059`, `#7C3F1D`) and Cormorant Garamond `font-normal`. Removed `rounded-2xl` from `CraftsmanshipZoom.jsx`. Calibrated `CustomerLoveNotes.jsx` with Indonesian title and zero-radius pagination bars. Shortened button CTA in `ChooseYourBatikGrid.jsx`. Added typography utility classes to `app.css`.
  - *Evidence*: Zero-radius architecture verified.
---

## Phase 35: Standard Collection 2-Column Split Hero (Title & Narrative Left, 3:2 Image Right) (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: collections.$handle.jsx, Breadcrumb.jsx, Local Development Verification*

- [x] **Task 35.1: 2-Column Split Hero for General Collections (`collections.$handle.jsx`)**
  - *Action*: Re-architected standard collection page hero (`/collections/*`) into a 2-column Quiet Luxury editorial layout:
    - **Left Column**: Eyebrow `KATALOG BUSANA BATIK NUSANTARA`, collection title (`collection.title`), hairline gold divider, and description fetched directly from live Shopify Storefront API (`collection.description`), followed by atelier service highlights (`Jahit Bespoke Tanpa MOQ • Konsultasi Ukuran via WA • Garansi Butik Resmi`).
    - **Right Column**: Featured image with calibrated 3:2 landscape aspect ratio (`aspect-[3/2]`) preventing excessive vertical height, zero-radius architecture (`rounded-none`), subtle hover zoom (`group-hover:scale-105 duration-700`), hairline border `#E2DFD8`, and discreet atelier title tag.
    - **Exception Preserved**: `sarimbit-exclusive` and `sarimbit-premium` retain their full-bleed cinematic haute heritage hero sections intact.
    - **Breadcrumb Alignment**: Cleanly integrated `<Breadcrumb>` on its own row directly above the split hero layout.
  - *Evidence*: SSR node testing on `batik-pria` and `sarimbit-ekonomis` verified `Has aspect-[3/2]: true`, `Has 2-column grid: true`; on `sarimbit-exclusive` verified `Has HAUTE HERITAGE: true` and `Has aspect-[3/2]: false`.
- [x] **Task 35.2: Local Production Verification**
  - *Action*: Executed `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0). Tested all collection routes on `localhost:3005` returning HTTP 200. Local development state strictly maintained without auto-push or deploy.
  - *Evidence*: 100% verified locally.

---

## Phase 36: Pure Typographic Floating Filter & Sort Bar (Zero-Box, Zero-Frame) (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: CollectionFilterBar.jsx, collections.$handle.jsx, collections.all.jsx, Edge Deploy*

- [x] **Task 36.1: Zero-Box Pure Typographic Floating Bar (`CollectionFilterBar.jsx`)**
  - *Action*: Engineered an ultra-minimalist, Quiet Luxury filter and sort bar positioned directly above the product catalog:
    - **100% Zero-Box, Zero-Frame, Zero-Background**: Eliminated all form boxes, button borders, and grey container strips.
    - **Pure Typographic Text Tabs**: Left side renders airy, horizontal typographic tabs (`Semua`, `Siap Kirim`, `< Rp 500rb`, `Rp 500rb – 1jt`, `> Rp 1jt`) with a discrete gold hairline underline on the active tab (`border-b-2 border-[#C5A059]`) and smooth touch scroll on mobile.
    - **Frameless Sort Trigger**: Right side provides a borderless typographic sort selector (`Urutkan: Rekomendasi ↓`) with options for latest, price ascending/descending, and alphabetical ordering.
    - **Reset Filter Action**: Whispered text action (`Reset Filter`) appears seamlessly when active filters exist.
    - **Dark Theme Adaptation**: Fully harmonized for `sarimbit-exclusive` Noir styling with antique gold accents.
  - *Evidence*: Component compiled and integrated into `collections.$handle.jsx` and `collections.all.jsx`.
- [x] **Task 36.2: Storefront API Integration (`collections.$handle.jsx` & `collections.all.jsx`)**
  - *Action*: Wired URL search params (`sort`, `available`, `minPrice`, `maxPrice`) to Storefront API queries:
    - In `collections.$handle.jsx`: Injected `$sortKey`, `$reverse`, and `$filters: [ProductFilter!]` into `COLLECTION_QUERY`.
    - In `collections.all.jsx`: Injected `$sortKey`, `$reverse`, and `$query: String` (Storefront query syntax) into `CATALOG_QUERY`.
  - *Evidence*: Tested `/collections/all?sort=price-asc`, `/collections/all?available=true`, and `/collections/batik-pria?sort=latest` on `localhost:3005`, all returning HTTP 200 with dynamic filtered results.
- [x] **Task 36.3: Verification & Edge Deployment Authorization**
  - *Action*: Executed `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0). Staged only modified project files, committed with clean message (no AI attribution trailers), and pushed to `main` for Oxygen edge deployment.

---

## Phase 37: Architectural 404 Page, 2-Column Split Cart & Anti-AI-Slop Overhaul (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: $.jsx, root.jsx, cart.jsx, CartMain.jsx, CartSummary.jsx, CollectionFilterBar.jsx, Edge Deploy*

- [x] **Task 37.1: Removal of "Siap Kirim" from Collection Filter Bar (`CollectionFilterBar.jsx`)**
  - *Action*: Removed the "Siap Kirim" tab and availability filter logic from `CollectionFilterBar.jsx`. The pure typographic floating bar now cleanly features: `Semua (count)`, `< Rp 500rb`, `Rp 500rb – 1jt`, `> Rp 1jt`, and the frameless sort selector.
  - *Evidence*: Verified on `/collections/batik-pria` via SSR node test: `Filter bar has NO Siap Kirim: true`.
- [x] **Task 37.2: Architectural 404 Experience (`app/routes/$.jsx` & `app/root.jsx`)**
  - *Action*: Re-architected 404 / Not Found handling into a high-prestige Quiet Luxury editorial gallery:
    - **Header & Navigation Preserved**: Implemented inside `PageLayout` with guaranteed single-line Breadcrumb (`KODE GALERI 404`).
    - **Editorial Narrative**: Cormorant Garamond headline (*"Jejak Warisan yang Dicari Belum Tersedia"*), antique gold divider, and curatorial explanation.
    - **Integrated Search**: Minimalist zero-radius search bar targeting `/search`.
    - **Curated Triptych**: 3 high-heritage collection cards (*Sarimbit Exclusive*, *Sarimbit Premium*, *Kemeja Batik Pria*) with vertical 4:5 imagery.
    - **Concierge Link**: Direct access to WhatsApp Concierge `081-390-8888-09`.
    - **Root ErrorBoundary**: Refactored `root.jsx` to eliminate technical error jargon in favor of polished Quiet Luxury typography.
  - *Evidence*: Tested `/halaman-tidak-ada` returning HTTP 404 with full 404 editorial suite.
- [x] **Task 37.3: Cart Page Anti-AI-Slop Overhaul (`cart.jsx`, `CartMain.jsx`, `CartSummary.jsx`)**
  - *Action*: Transformed the cart experience from generic eCommerce components into an architectural 2-column Quiet Luxury suite:
    - **2-Column Split Layout on Desktop**: Expanded container to `max-w-7xl`, placing line items on the left (`lg:col-span-7 xl:col-span-8`) and sticky order summary on the right (`lg:col-span-5 xl:col-span-4`).
    - **Eliminated Emojis & Generic Cards**: Replaced `📦`, `✨`, `🔒`, `🛍️` with Quiet Luxury Trust Pillars (*Garansi Keaslian Butik 100%*, *Bebas Penyesuaian Ukuran*, *Pembayaran & Proteksi Pengiriman*).
    - **Indonesian Cultural Terminology**: Replaced `Totals`, `Discounts`, `Remove` with *Ringkasan Pesanan*, *Subtotal Busana*, *Voucher / Kode Promo*, *Hapus*, and *Lanjut ke Pembayaran Resmi Shopify*.
    - **Deterministic Currency**: Formatted all totals using `formatRupiah` without `,00` decimals.
    - **Atelier Empty State**: Elevated empty cart with monogram diamond SVG and 3 curated collection cards.
  - *Evidence*: Tested `/cart` returning HTTP 200 with zero emojis and 2-column layout active.
- [x] **Task 37.4: Verification, Commit & Oxygen Edge Deployment**
  - *Action*: Executed `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0). Staged modified files, committed with clean message (no AI attribution trailers), and pushed to `main` for Oxygen edge deployment.

---

## Phase 38: Header Cart Direct Link, Zero-Box Cart & Variant Suppression (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: Header.jsx, cart.jsx, CartMain.jsx, CartLineItem.jsx, CartSummary.jsx*

- [x] **Task 38.1: Header Cart Direct Link (`Header.jsx`)**
  - *Action*: Converted `CartBadge` button into a direct `<Link to="/cart" prefetch="intent">`. Clicking the cart icon in the header now navigates directly to the cart page without triggering the aside drawer/slide-over.
  - *Evidence*: Verified on `/` with node test: `Header cart has direct Link to /cart: true`.
- [x] **Task 38.2: Zero-Box & Anti-Framing Cart Overhaul (`CartMain.jsx` & `cart.jsx`)**
  - *Action*: Stripped all nested box cards, heavy bezels, and widget frames (`bg-white border ... shadow-xs`). Content now flows seamlessly across the Mori Linen canvas separated only by delicate hairline dividers (`#E2DFD8`). Replaced the 3 bottom boxed cards with a single whispered horizontal assurance line with antique gold accents.
  - *Evidence*: Verified via SSR render inspection: zero card containers and zero boxed pill chips in order summary.
- [x] **Task 38.3: Synthetic Variant Suppression (`CartLineItem.jsx`)**
  - *Action*: Filtered out synthetic Shopify `"Title: Default Title"` option tags. When a product has no custom variant options or uses the single default variant, the line is cleanly hidden rather than displaying raw technical text.
  - *Evidence*: Verified on `/cart` via node test: `Cart contains Default Title: false`.
- [x] **Task 38.4: CTA Unification & Mobile Calibration (`cart.jsx` & `CartMain.jsx`)**
  - *Action*: Eliminated redundant duplicate calls to action ("Tambah Busana", duplicate "Lanjutkan Belanja" at top and bottom). Focused on a single, clean `Lanjutkan Belanja →` link at the top-right of the cart header. Calibrated mobile thumbnail proportions (`w-18 h-22 sm:w-22 sm:h-28 aspect-[4/5]`) and stepper dimensions (`w-6 h-6 sm:w-7 sm:h-7`) for comfortable touch usability without text clipping.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0).
- [x] **Task 38.5: Mobile Header Logo Center Positioning (`Header.jsx`)**
  - *Action*: Re-architected mobile header layout with absolute dead-center positioning for the Batik Smile brand logo (`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden`), while retaining left-aligned logo on desktop screens (`hidden lg:flex`).
  - *Evidence*: SSR HTML audit verified `Has mobile centered logo container: true` and `Has desktop logo container: true`.
- [x] **Task 38.6: Mobile Header Logo Enlargement & Account Icon Swap (`Header.jsx`)**
  - *Action*: Enlarged mobile center logo from `h-8 sm:h-9` to `h-10 sm:h-11 w-auto max-w-[170px] sm:max-w-[200px]` for bold brand presence.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0).
- [x] **Task 38.7: Hyper-Minimalist Mobile Header & Sticky Burger Account (`Header.jsx`)**
  - *Action*: Stripped the account icon from mobile header (`hidden lg:flex`), establishing an ultra-clean tripartite mobile header (Left: Hamburger, Center: Enlarged Logo, Right: Cart). In the mobile burger menu drawer (`HeaderMenu`), removed the Semarang showroom card and duplicate WhatsApp button, placing a dedicated sticky account button (`AKUN SAYA & STATUS PESANAN →`) pinned at the bottom.
  - *Evidence*: SSR node test verified `Showroom card removed: true`, `WA button removed: true`, `Sticky account in burger menu: true`, `Account icon hidden on mobile header: true`.

---

## Phase 39: In-Modal Live Predictive Search Engine (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: LuxurySearchModal.jsx, routes/search.jsx*

- [x] **Task 39.1: In-Modal Live Search Architecture (`LuxurySearchModal.jsx`)**
  - *Action*: Re-architected search modal to render live results directly inside the modal without opening or navigating to `/search` (both desktop and mobile viewports). Eliminated `navigate('/search')` and replaced with in-modal live queries via `fetcher.submit` with 250ms debounce and instant Enter/CARI button submission.
  - *Evidence*: Verified that modal handles typing and submit completely in-modal without triggering page navigation.
- [x] **Task 39.2: Data Contract Normalization (`routes/search.jsx`)**
  - *Action*: Fixed the data contract disparity in `predictiveSearch` so that both flat properties (`result.products`, `result.collections`, `result.articles`) and nested `result.items` are returned concurrently, ensuring full compatibility with the search modal.
  - *Evidence*: Tested predictive search returns complete dataset with products, collections, and articles.
- [x] **Task 39.3: Quiet Luxury Search UX & Mobile Responsiveness (`LuxurySearchModal.jsx`)**
  - *Action*: Upgraded search UI with tabbed category filtering, strict 4:5 vertical portrait product imagery with `formatRupiah` pricing and brand eyebrows, zero-radius architecture, and fullscreen mobile modal.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0).
- [x] **Task 39.4: Storefront API Limit Fix & Multi-Entity Output (Products, Collections, Tags) (`LuxurySearchModal.jsx`, `routes/search.jsx`)**
  - *Action*: Diagnosed root cause of query failures ("Cannot convert undefined or null to object") where Storefront API strictly rejected `limit: 12` (must be within 1..10). Clamped limit to `Math.min(10, Math.max(1, limit))` in both backend loader and frontend modal. Added `tags` extraction to predictive search fragment and modal rendering. Formatted multi-entity results including Koleksi Butik (`collections`), Tag Busana (`tags`), and Busana (`products`).
  - *Evidence*: Verified queries for "daster", "kemeja", "sarimbit", and "wanita" all returning HTTP 200 with both products ("Daster Solo Series") and collections ("Daster Batik Solo").

---

## Phase 40: Modern Clean 404 Experience & Strict Noindex/Nofollow (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: routes/$.jsx, entry.server.jsx*

- [x] **Task 40.1: Modern Zero-Box 404 UI/UX (`routes/$.jsx`)**
  - *Action*: Redesigned 404 page with a clean, modern Quiet Luxury aesthetic. Removed all cluttered product recommendation cards, heavy image boxes, and border frames. Designed an ethereal layout featuring oversized background watermark numeral ("404"), delicate rotating/floating geometric batik diamond monogram emblem, Cormorant Garamond display typography, and two focused primary buttons (`KEMBALI KE BERANDA →`, `JELAJAHI KOLEKSI`).
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (Exit code 0).
- [x] **Task 40.2: In-Modal Live Search Integration (`routes/$.jsx`)**
  - *Action*: Connected whispered search trigger on 404 to open the new in-modal predictive search engine (`open('search')`), allowing users to find specific motifs or products without cluttering the 404 view.
  - *Evidence*: Verified in-modal search trigger functionality on 404 view.
- [x] **Task 40.3: Strict Noindex, Nofollow SEO Enforcement (`routes/$.jsx`, `entry.server.jsx`)**
  - *Action*: Implemented dual-layer SEO protection: (1) HTML meta tag `<meta name="robots" content="noindex, nofollow" />` in route meta, and (2) HTTP response header `X-Robots-Tag: noindex, nofollow` on all 404 responses in `entry.server.jsx`.
  - *Evidence*: Node SSR test verified HTTP status 404, `X-Robots-Tag: noindex, nofollow` header, and HTML `<meta name="robots" content="noindex, nofollow">`.

---

## Phase 41: Mobile View Zero-Zoom Input Scaling & Collection Filter UI/UX Overhaul (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: CollectionFilterBar.jsx, LuxurySearchModal.jsx, CartMain.jsx, CartSummary.jsx, search.jsx, account.*.jsx*

- [x] **Task 41.1: Mobile Input 16px Font Scaling (`text-base sm:text-*`)**
  - *Action*: Standardized all `<input>` and `<textarea>` fields across the application to have at least `16px` (`text-base`) on mobile viewports, avoiding iOS Safari and mobile browser auto-zoom upon focus. Updated search bar in `LuxurySearchModal.jsx`, cart note textarea in `CartMain.jsx`, voucher code input in `CartSummary.jsx`, search input in `search.jsx`, and profile/address/order form inputs in `routes/account.*.jsx`.
  - *Evidence*: Verified 16px mobile styling; zero auto-zoom on mobile devices.
- [x] **Task 41.2: Collection Filter & Sort Mobile Overhaul (`CollectionFilterBar.jsx`)**
  - *Action*: Completely eliminated AI-slop clunky OS native `<select>` dropdown. Replaced with bespoke Quiet Luxury controls: (1) Desktop custom popover menu with gold bullet indicators, (2) Mobile Sort Bottom Sheet drawer with backdrop blur, 48px thumb touch targets, and antique gold checkmarks, (3) Mobile top status bar with item count and active filter reset chips, (4) Touch-friendly horizontal ribbon for price tabs with edge bleed and no scrollbar.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings), `npm run build` (Exit code 0), and SSR test verified `<select>` elimination and mobile bottom sheet integration.

---

## Phase 42: Tri-Domain Architecture, Shopify CLI Linkage, & CSP Whitelisting (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: entry.server.jsx, root.jsx, CartSummary.jsx, .env.example, PRD.md, ARCHITECTURE.md*

- [x] **Task 42.1: Authoritative Tri-Domain Topology Mapping & Verification**
  - *Action*: Mapped and verified the tripartite domain topology across Shopify Admin and Hydrogen:
    - `batiksmile.com` / `www.batiksmile.com`: Production headless storefront on Shopify Oxygen Edge.
    - `checkout.batiksmile.com`: Shopify Core Online Store Hosted Checkout.
    - `account.batiksmile.com`: Shopify New Customer Accounts passwordless portal.
  - *Evidence*: `dig` and `curl -sI` verified all 3 domains active with valid SSL, correct CNAME routing, and proper HTTP response headers.
- [x] **Task 42.2: Shopify CLI Authentication & Storefront Linkage**
  - *Action*: Authenticated Shopify CLI for store `23ahbp-sq.myshopify.com` via account `ongkiardiansyah@gmail.com`. Linked local repository to Hydrogen Storefront `Batik Smile (id: 1000176204)` enabling seamless non-interactive `shopify hydrogen env list` execution.
  - *Evidence*: `shopify hydrogen env list` outputs Production and Preview environments successfully.
- [x] **Task 42.3: Content Security Policy (CSP) Multi-Domain Whitelisting (`app/entry.server.jsx`)**
  - *Action*: Extended `createContentSecurityPolicy` in `entry.server.jsx` with `connectSrc` explicitly whitelisting `https://account.batiksmile.com`, `https://checkout.batiksmile.com`, and `https://batiksmile.com`, preventing any browser cross-domain blocking during checkout or customer auth.
  - *Evidence*: `npm run build` and node CSP test verified compliant `connect-src` header generation.
- [x] **Task 42.4: Standardized Environment Template (`.env.example`)**
  - *Action*: Standardized `.env.example` with the full suite of production keys including `PUBLIC_STOREFRONT_ID`, `SHOP_ID`, `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID`, and `PUBLIC_CUSTOMER_ACCOUNT_API_URL`.
  - *Evidence*: Verified `.env.example` completeness against Shopify official headless specifications.

---

## Phase 43: Complete Catalog Parity Audit & 100% Precise SEO Metadata Engine (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/lib/seo.js, products.$handle.jsx, collections.$handle.jsx, collections.all.jsx, pages.$handle.jsx, pages.*.jsx, blogs.*.jsx, root.jsx*

- [x] **Task 43.1: Live Catalog Inventory & Slug Parity Audit**
  - *Action*: Audited all 31 collections, 23 products, 11 pages, and 12 blog articles live in Shopify Core. Tested each endpoint against Hydrogen routing.
  - *Evidence*: 100% slug parity achieved: 31/31 collections (Status 200), 23/23 products (Status 200), 11/11 pages (Status 200), 12/12 articles (Status 200).
- [x] **Task 43.2: Authoritative SEO Metadata Engine (`app/lib/seo.js`)**
  - *Action*: Created centralized metadata generator respecting Shopify Admin `seo.title` and `seo.description`, absolute canonical `<link rel="canonical">` (via `tagName: 'link'`), OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`, `og:price`), Twitter large cards, and `<html lang="id">`.
  - *Evidence*: Verified HTML `<head>` outputs on products, collections, pages, and blog articles matching Shopify search engine listings.
- [x] **Task 43.3: Production Build & Lint Verification**
  - *Action*: Executed `npm run lint` and `npm run build`.
  - *Evidence*: 0 lint errors, production build exit code 0.

---

## Phase 44: Google PageSpeed Insights Mobile & Desktop Performance Optimization (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: public/logo/, public/banners/, HeroSlider.jsx, products.$handle.jsx, ProductItem.jsx*

- [x] **Task 44.1: Brand Logo WebP Optimization (`public/logo/logo-600.webp` & `public/logo.webp`)**
  - *Action*: Converted raw 3600px PNG brand logo (373 KB) into modern responsive WebP format (`public/logo/logo-600.webp` and `public/logo.webp`), slashing logo network transfer weight by ~90% while maintaining crisp 2x retina clarity. Updated references in `Header.jsx`, `Footer.jsx`, `LuxurySearchModal.jsx`, and mobile navigation drawer.
  - *Evidence*: Logo transfer size reduced from 373 KB to 38 KB; zero pixelation on high-DPI displays.
- [x] **Task 44.2: Mobile Hero Banner AVIF Generation & Responsive Picture (`HeroSlider.jsx`)**
  - *Action*: Generated next-gen AVIF mobile hero banner (`public/banners/hero_slider_1_mobile.avif`) tailored for mobile device widths and cellular networks. Integrated responsive `<picture>` markup in `HeroSlider.jsx` serving AVIF on mobile (`media="(max-width: 768px)"`) and full-res imagery on desktop.
  - *Evidence*: Mobile hero image payload dropped significantly; verified responsive source switching via DevTools.
- [x] **Task 44.3: High-Priority LCP Preload & PDP Priority Fetching (`HeroSlider.jsx`, `products.$handle.jsx`)**
  - *Action*: Applied `fetchPriority="high"`, `loading="eager"`, and `decoding="async"` on the initial hero slide to accelerate First Contentful Paint (FCP) and Largest Contentful Paint (LCP). Added `fetchPriority="high"` on the primary PDP gallery image.
  - *Evidence*: LCP dropped from 16.6s to 4.1s on Mobile PageSpeed simulation.
- [x] **Task 44.4: Enforced Lazy-Loading Across Below-The-Fold Grids (`ProductItem.jsx`)**
  - *Action*: Enforced `loading="lazy"` and `decoding="async"` across all catalog product item cards (`ProductItem.jsx`), related products ("Koleksi Selaras"), and editorial CMS content blocks.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings), `npm run build` (exit code 0), and verified zero render-blocking media requests below the fold. Real-world PSI: Mobile jumped from **51 &rarr; 81 / 100**, PDP Mobile from **55 &rarr; 75 / 100**, Desktop **90 – 98 / 100**, SEO **100 / 100**, CLS **0.00**.

---

## Phase 45: Dynamic Multi-Route SEO Engine, Custom Sitemap Chunk, & Authoritative Robots.txt (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/lib/seo.js, app/routes/sitemap.*, app/routes/[robots.txt].jsx, app/routes/_index.jsx, app/routes/pages.*, app/routes/collections.*, app/routes/blogs.*, app/routes/policies.*, app/routes/search.jsx, app/routes/cart.jsx, app/routes/$.jsx*

- [x] **Task 45.1: Dynamic Shopify SEO Generators Across All Routes (`app/lib/seo.js`)**
  - *Action*: Built complete dynamic metadata engine in `app/lib/seo.js` querying live Storefront API data (`seo.title`, `seo.description`, `title`, `description`, `summary`, `shop.name`, `shop.description`). Wired across all 19 application routes (Home, collections, products, custom & CMS pages, blogs, policies, search, cart, 404) with quiet luxury Indonesian fallback copy, OpenGraph, Twitter Large Cards, and canonical `<link rel="canonical">` (via `tagName: 'link'`).
  - *Evidence*: Tested and verified `<head>` meta tags across all route types matching Shopify Admin listings.
- [x] **Task 45.2: Clean Sitemaps & Dedicated Custom Chunk (`sitemap.$type.$page[.xml].jsx`, `[sitemap.xml].jsx`)**
  - *Action*: Removed boilerplate fake locales (`['EN-US', 'EN-CA', 'FR-CA']`) that caused 404 crawl errors in Google Search Console. Created dedicated custom sitemap chunk (`params.type === 'custom'`) serving 15 storefront-native URLs (`/`, `/collections/all`, `/collections`, `/blogs`, `/pages/*`, `/policies/*`) with defined `<priority>` and `<changefreq>`. Appended `<sitemap><loc>https://batiksmile.com/sitemap/custom/1.xml</loc></sitemap>` into sitemap index.
  - *Evidence*: Verified `/sitemap.xml`, `/sitemap/custom/1.xml`, and `/sitemap/pages/1.xml` returning valid XML with zero fake hreflangs.
- [x] **Task 45.3: Modern Crawl & AI-Friendly Robots.txt (`[robots.txt].jsx`)**
  - *Action*: Removed harmful `Disallow: /policies/`. Added disallows for transactional paths (`/checkout`, `/checkouts/`, `/cart`, `/account`) and filter/sort URL permutations. Explicitly allowed major search engines (`Googlebot`, `Bingbot`, `Applebot`) and modern AI search/answer engine bots (`OAI-SearchBot`, `GPTBot`, `Claude-SearchBot`, `ClaudeBot`, `PerplexityBot`). Added `Sitemap: https://batiksmile.com/sitemap.xml`.
  - *Evidence*: Verified `/robots.txt` output matches authoritative specification.
- [x] **Task 45.4: Oxygen Production Edge Deployment & Verification**
  - *Action*: Pushed commit `ba645fc` to `origin/main` and deployed to Shopify Oxygen Global Edge Network (`https://batiksmile.com`). Conducted live HTTP curl checks across all updated endpoints.
  - *Evidence*: All live URLs verified returning HTTP 200 with dynamic metadata and proper XML/txt headers. Zero background dev servers running.

---

## Phase 46: Tree Taxonomy Overhaul, Store Consolidation, & Frontend Synchronisation (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: Shopify Collections, Product Tags, app/components/*, app/routes/collections.*, PAGES-SCHEMA.xml, SCHEMA.md*

- [x] **Task 46.1: Full Store Snapshot & Data Protection**
  - *Action*: Created pre-migration backup of all 31 legacy collections and 23 products into `docs/backups/shopify-legacy-backup.json` and `docs/backups/COLLECTIONS-BACKUP.md`. Preserved every product ID, variant, SKU, and original tag configuration.
  - *Evidence*: Snapshot persisted in repository; zero data loss.
- [x] **Task 46.2: Live Shopify Core Collection Refactoring**
  - *Action*: Renamed core collections via GraphQL Admin mutations (`Sarimbit Exclusive` &rarr; `Sarimbit Luxury`, `Sarimbit Ekonomis` &rarr; `Sarimbit Ekonomi`, `Jarik & Kain Batik` &rarr; `Kain`, `Blangkon Tradisional` &rarr; `Aksesoris`). Purged 24 obsolete collections (`batik-wanita`, `batik-pria`, `blus-batik-wanita`, `daster-batik-solo`, etc.) consolidating catalog strictly into 6 core collections + umbrella `shop`.
  - *Evidence*: Live query returns exactly 7 collections (`sarimbit-luxury`, `sarimbit-premium`, `sarimbit-ekonomi`, `kain`, `aksesoris`, `batik-anak`, `shop`).
- [x] **Task 46.3: Product Tags & Cross-Category Enrichment**
  - *Action*: Injected tree taxonomy tags (`pria`, `wanita`, `putra`, `putri`, `lengan-panjang`, `lengan-pendek`) across all 23 products. Cleaned up misplaced items in Aksesoris and Sarimbit Ekonomi.
  - *Evidence*: Product tag inspection verified 100% compliant with subcategory filter parameters.
- [x] **Task 46.4: Hydrogen Navigation, Components & Subcategory Filter Ribbon**
  - *Action*: Updated navigation across `Header.jsx`, `MegaMenu.jsx`, `Footer.jsx`, `HeroSlider.jsx`, `CartMain.jsx`, `TierExperience.jsx`, `SarimbitSpotlight.jsx`, `ShoppableLookbook.jsx`, `HeritageVideoBanner.jsx`, `BestSellersTabs.jsx`, and `CollectionFilterBar.jsx`. Added instant subcategory filter ribbon (Gender & Sleeve chips) driving URL search params `gender` and `sleeve`.
  - *Evidence*: Zero obsolete collection handle links remaining across `app/`.
- [x] **Task 46.5: SEO 301 Redirections & Schema Contracts**
  - *Action*: Configured permanent 301 server redirects in `app/routes/collections.$handle.jsx` for all 24 obsolete handles. Updated `PAGES-SCHEMA.xml` and `SCHEMA.md` with the authoritative 6-collection tree taxonomy.
  - *Evidence*: `npm run codegen` generated types cleanly; `npm run lint` (0 errors, 0 warnings); `npm run build` (exit code 0).

---

## Phase 47: PDP Video Prioritization as 2nd Mini-Thumbnail & Cross-Device Autoplay (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: products.$handle.jsx, BUILD-LOG.md, Oxygen Edge*

- [x] **Task 47.1: 2nd Mini-Thumbnail Video Prioritization (`app/routes/products.$handle.jsx`)**
  - *Action*: Engineered media curation logic in `mediaList` memo. When a product possesses video assets (e.g. `sarimbit-charcoal-hitam`), the primary featured photo is anchored at index 0 (1st thumbnail / cover image), and the first video lookbook is explicitly prioritized at index 1 (**2nd mini-thumbnail**). Subsequent photography and secondary assets follow naturally. If no video exists, standard catalog photo order is preserved without alteration.
  - *Evidence*: Verified array order on live Shopify Storefront data for `sarimbit-charcoal-hitam` yielding `[MediaImage 1, Video, MediaImage 2]`.
- [x] **Task 47.2: Desktop & Mobile Autoplay Engine with Audio Control**
  - *Action*: Implemented `videoRef = useRef(null)` and dynamic `useEffect` to trigger programmatic `.play()` immediately upon thumbnail selection or swipe navigation. Standardized HTML5 `<video>` properties (`autoPlay`, `playsInline`, `muted={isMuted}`, `controls`, `controlsList="nodownload"`) to conform strictly with iOS Safari and Android Chrome autoplay security policies. Integrated helper `getAutoplayEmbedUrl` for iframe external videos (`autoplay=1&mute=1&playsinline=1`). Added Quiet Luxury floating audio toggle button (`SUARA MATI` / `SUARA AKTIF`) styled in obsidian noir and antique gold with zero-radius geometry (`rounded-none`).
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 48: AI Slop Elimination, Breadcrumb Architecture Elevation, & Precision Mobile Calibration (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/components/*, app/routes/products.$handle.jsx, BUILD-LOG.md*

- [x] **Task 48.1: Codebase AI Slop Purge & 100% Zero-Radius Conformity**
  - *Action*: Audited entire `app/` directory for generic SaaS patterns, rounded corners, and brand naming discrepancies. Replaced stock `rounded-full` indicator dot in `app/routes/products.$handle.jsx` line 726 with `rounded-none`. Refactored `app/components/SarimbitSpotlight.jsx` to completely eliminate `rounded-2xl`, `rounded-full`, SaaS blue `#1B2A4A`, amber accents, and drop shadows, bringing it fully into the Quad-Harmonic palette (`#111111`, `#181818`, `#FAF8F5`, `#C5A059`) with sharp zero-radius geometry. Verified zero instances of "Batik Smile Nusantara" in frontend components; standardized exclusively on "Batik Smile".
  - *Evidence*: `rg --pcre2 "rounded-(?!none)" app/` returned zero matches.
- [x] **Task 48.2: High-Fashion Single-Line Fluid Breadcrumb Architecture (`app/components/Breadcrumb.jsx`)**
  - *Action*: Replaced generic SVG chevrons with high-fashion whispered slash `/` separators (`text-[#B0AAA0]/70` on light, `text-[#C5A059]/40` on dark). Upgraded to semantic `<ol>` and `<li>` structure with `aria-label="Navigasi Breadcrumb"` and `aria-current="page"`. Implemented single-line fluid touch scroll (`overflow-x-auto scrollbar-none py-1 -my-1`), guaranteeing zero multi-line wrap on mobile viewports down to 320px width. Added zero-radius home icon and `BERANDA` label.
  - *Evidence*: Verified single-line rendering across all 19 application routes consuming the shared breadcrumb.
- [x] **Task 48.3: Precision Mobile View Calibration (Burger Menu, Search Modal, Cart & Navigation)**
  - *Action*:
    - **Burger Menu Drawer (`Header.jsx`)**: In-drawer quick search trigger, category descriptors, VIP WhatsApp Concierge direct contact strip, and 44px touch targets.
    - **Drawer Container (`Aside.jsx`)**: Enforced dynamic mobile viewport height `h-[100dvh] max-h-[100dvh]` and 44px close touch target (`w-11 h-11 min-w-[44px] min-h-[44px]`).
    - **Luxury Search Modal (`LuxurySearchModal.jsx`)**: Enforced `h-[100dvh] max-h-[100dvh]`, 44px close target, and dynamic mobile safe area padding `pb-[max(0.75rem,env(safe-area-inset-bottom))]`.
    - **Cart Drawer & Page (`CartLineItem.jsx`, `CartSummary.jsx`)**: Enforced strict vertical 4:5 image thumbnails (`aspect-[4/5]`), enlarged stepper touch targets (`w-7 h-7`), and applied Quiet Luxury Soga Matang (`#7C3F1D`) hover states on delete and voucher remove actions.
    - **Mobile Bottom Navigation (`MobileNavigation.jsx`)**: Updated SVG stroke attributes to architectural `square` and `miter`.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 49: Clean Luxury Modern Breadcrumb Navigation (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/components/Breadcrumb.jsx, app/routes/collections.$handle.jsx, app/routes/products.$handle.jsx*

- [x] **Task 49.1: Clean Luxury Modern Unboxed Architecture (`app/components/Breadcrumb.jsx`)**
  - *Action*: Refactored breadcrumb into a pristine, unboxed, frameless horizontal editorial stream. Removed bulky container bezels and heavy badge chips. Integrated whispered micro-labels (`✦ LUXURY /`, `◈ PREMIUM /`, `∎ EKONOMI /`), refined slash separators with generous spacing (`mx-2 sm:mx-3`), and curated typography pairings (Cormorant Garamond serif active leaf on Luxury, crisp Mori Linen on Premium). Preserved single-line touch scroll with hidden scrollbar.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings).
- [x] **Task 49.2: Collection & Product Route Integration (`collections.$handle.jsx`, `products.$handle.jsx`)**
  - *Action*: Injected `collectionTier` calculation into `collections.$handle.jsx` and passed `tier={collectionTier}` to both cinematic Haute Hero and standard catalog hero. Integrated `productTier` into `products.$handle.jsx` to preserve continuity between collection pages and PDP.
  - *Evidence*: Verified build with `npm run build` (exit code 0).

---

## Phase 50: Mobile Burger Menu Streamlining & Search Trigger Removal (COMPLETED ✅)
*Semantic Risk: R0 | Primary Boundary: app/components/Header.jsx*

- [x] **Task 50.1: Remove In-Drawer Search Bar from Mobile Menu (`app/components/Header.jsx`)**
  - *Action*: Removed the redundant quick search bar container from `HeaderMenu` drawer. Mobile search remains cleanly accessible via the persistent mobile bottom bar (`MobileNavigation.jsx`). Streamlined drawer structure directly into Brand Heritage Stamp &rarr; Kategori Utama &rarr; VIP WhatsApp Concierge &rarr; Layanan Showroom &rarr; Sticky Akun Saya.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 51: Mobile Burger Drawer Elevation: Clean Minimalist Modern Luxury Editorial Stream (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/components/Header.jsx, app/components/Aside.jsx, app/components/PageLayout.jsx*

- [x] **Task 51.1: Complete Purge of AI Slop from Mobile Menu Drawer (`app/components/Header.jsx`)**
  - *Action*: Completely eliminated repetitive box borders (`border-b border-[#E2DFD8]/40`, `hover:bg-white`), generic right arrows (`&rarr;`), verbose catalog descriptions (`item.desc`), tacky `3 LANTAI` box badge, rigid section dividers, loud green WhatsApp CTA banner, and sticky bottom black button brick.
  - *Evidence*: `app/components/Header.jsx` verified clean of box borders, arrows, and green banners.
- [x] **Task 51.2: Pristine Editorial Typography & Whispered Brand Architecture**
  - *Action*: Implemented confident editorial typography (`font-serif text-2xl sm:text-[26px] font-normal tracking-wide text-[#111111] hover:text-[#9E7D3B]`) for primary collections (`Sarimbit Luxury`, `Sarimbit Premium`, `Sarimbit Ekonomi`, `Batik Anak`, `Kain`, `Aksesoris`, `Koleksi Terlaris`, `Semua Koleksi`). Added whispered brand heritage stamp (`BUTIK BATIK SMILE`, `Semarang • Est. 2007`), delicate hairline gold divider (`w-10 h-px bg-[#C5A059]/40`), whispered secondary editorial navigation, and understated VIP Concierge (`081-390-8888-09`) and Account links.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings).
- [x] **Task 51.3: Drawer Container Background & Header Unification (`Aside.jsx`, `PageLayout.jsx`)**
  - *Action*: Unified drawer header background to Mori Linen (`bg-[#FAF8F5]` on mobile drawer) to create an unbroken, seamless editorial canvas. Simplified drawer header title to whispered, minimalist `MENU` with wide tracking (`tracking-[0.22em]`).
  - *Evidence*: `npm run build` exits with code 0 (Vite SSR + Oxygen bundle created in 874ms).

---

## Phase 52: Video Playback CSP Authorization & Short URL Slug Resolution (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/entry.server.jsx, app/routes/$.jsx*

- [x] **Task 52.1: CSP Video Source Authorization (`app/entry.server.jsx`)**
  - *Action*: Resolved browser Content Security Policy media blocking (`MEDIA_ELEMENT_ERROR: Media load rejected by URL safety check`) by adding explicit `mediaSrc` directives for `'self'`, `https://cdn.shopify.com`, `https://checkout.batiksmile.com`, `https://batiksmile.com`, `https://*.shopify.com`, `https://*.myshopify.com`, `data:`, and `blob:`.
  - *Evidence*: Verified via Headless Chrome CDP yielding HTTP 206 Partial Content, `readyState: 4`, `paused: false`, `currentTime > 1.6s`, and `error: null`.
- [x] **Task 52.2: Short URL Single-Segment Slug Resolution (`app/routes/$.jsx`)**
  - *Action*: Upgraded catch-all route `$.jsx` with `SLUG_CHECK_QUERY` to intelligently resolve single-segment root slugs (e.g. `/sarimbit-charcoal-hitam`). Redirects valid product slugs via 302 to `/products/:handle` (and collections/pages to their respective canonical paths) instead of throwing 404.
  - *Evidence*: `curl -I http://localhost:3001/sarimbit-charcoal-hitam` verified returning `302 Found` with `location: /products/sarimbit-charcoal-hitam`.

---

## Phase 53: Mobile Input Auto-Zoom Elimination & VIP 25% Discount Modal (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/styles/app.css, app/components/Footer.jsx, app/components/VipDiscountModal.jsx, app/components/PageLayout.jsx*

- [x] **Task 53.1: Global Mobile Input Auto-Zoom Prevention (`app/styles/app.css`, `app/components/Footer.jsx`)**
  - *Action*: Enforced `@media screen and (max-width: 768px) { input, select, textarea { font-size: 16px !important; } }` in `app/styles/app.css` to permanently eliminate iOS Safari and mobile browser auto-zooming on input and textarea focus. Explicitly updated footer email input to `text-base sm:text-sm`.
  - *Evidence*: Computed styles verified in mobile viewport yielding exact `16px` font-size on all mobile inputs.
- [x] **Task 53.2: VIP 25% Discount Email Newsletter Modal (`app/components/VipDiscountModal.jsx`, `app/components/PageLayout.jsx`)**
  - *Action*: Engineered Quiet Luxury Zero-Radius popup modal with Quad-Harmonic palette (`#FAF8F5`, `#111111`, `#C5A059`, `#7C3F1D`). Integrated non-intrusive delayed trigger (6s delay or 30% scroll), localStorage claim/cooldown persistence, accessible backdrop, ESC key dismiss, and dynamic voucher reveal for code `BATIK25` with one-click copy and auto-apply direct link.
  - *Evidence*: Headless Chrome emulation confirmed modal trigger, email submission, and voucher display. `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 54: Storefront Auto-Sync Architecture & Edge Caching Harmonization (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/lib/context.js, app/entry.server.jsx, app/root.jsx, app/routes/pages.*.jsx*

- [x] **Task 54.1: Storefront API Auto-Sync Query Interceptor (`app/lib/context.js`)**
  - *Action*: Implemented query wrapper on `storefront.query` in Hydrogen context creation to automatically default unconfigured cache strategies to `storefront.CacheShort()` (`maxAge: 1s, staleWhileRevalidate: 9s`). Ensures changes made in Shopify Admin reflect on the storefront within seconds.
  - *Evidence*: Local and edge queries verify sub-minute data freshness.
- [x] **Task 54.2: Edge Response Cache-Control Header Injection (`app/entry.server.jsx`)**
  - *Action*: Configured SSR response headers with `Cache-Control: public, max-age=1, stale-while-revalidate=9` for all successful responses to leverage Cloudflare / Oxygen edge caching without serving stale content.
  - *Evidence*: Verified HTTP response headers on live endpoints.
- [x] **Task 54.3: Root & Content Route Cache Harmonization (`app/root.jsx`, `app/routes/pages.*.jsx`)**
  - *Action*: Migrated root layouts, navigation menus, and static CMS pages from `CacheLong()` to `CacheShort()`.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 55: Product Media Architecture & 4:5 Video Lookbook System (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/routes/products.$handle.jsx, Storefront API GraphQL, Video Component*

- [x] **Task 55.1: Storefront API GraphQL Union Ingestion (`app/routes/products.$handle.jsx`)**
  - *Action*: Upgraded `PRODUCT_FRAGMENT` to query `featuredImage` and `media(first: 15)` using Storefront API GraphQL union types (`Video`, `MediaImage`, `ExternalVideo`, `Model3d`), fetching MP4 and HLS sources, mime types, resolutions, and preview images.
  - *Evidence*: Live query for `sarimbit-charcoal-hitam` returns native `Video` media object with MP4 streaming sources.
- [x] **Task 55.2: Normalized Media List Normalizer (`mediaList`)**
  - *Action*: Implemented robust normalizer extracting unified `{ id, mediaContentType, url, previewImage, altText, width, height, sources }` objects with seamless fallback for image-only products.
  - *Evidence*: Verified unified data structure across diverse product media catalogs.
- [x] **Task 55.3: Editorial 4:5 Video Lookbook Player Component**
  - *Action*: Created vertical 4:5 aspect ratio (`aspect-[4/5]`) video container with native controls, `playsInline`, `autoPlay`, `muted`, `loop`, whispered `VIDEO LOOKBOOK` gold badge, and touch scrub protection against swipe navigation interruptions.
  - *Evidence*: Playback verified in desktop and mobile viewports with zero layout shifts.
- [x] **Task 55.4: Quiet Luxury Gallery Video Thumbnails**
  - *Action*: Designed video thumbnail indicators featuring semi-transparent dark badges (`#111111`/70) with centered Imperial Antique Gold play icons (`#C5A059` `▶ VIDEO`).
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 56: Tri-Tier Color Space (Signature Soga Earth) & Zero-Dashed Anti-Slop Elevation (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/components/*, app/routes/collections.$handle.jsx, app/routes/products.$handle.jsx, app/styles/app.css*

- [x] **Task 56.1: Signature Soga Earth Palette Realization**
  - *Action*: Deepened Signature Premium tier styling across collection PLP, product PDP, and shared components using authentic Soga Earth / Deep Espresso (`#201610`, `#281C15`), Soga Matang accents (`#7C3F1D`), warm cream text (`#FAF8F5`, `#D5C8B8`), and delicate gold hairlines (`#C5A059`/40). Differentiated the 3 tiers (Mahakarya Obsidian, Signature Soga Earth, Essential Mori Linen).
  - *Evidence*: Visual hierarchy verified across `collections.$handle.jsx`, `products.$handle.jsx`, `StickyMobileBar.jsx`, and `ProductTierStorySection.jsx`.
- [x] **Task 56.2: Zero-Dashed Anti-Slop Purge**
  - *Action*: Completely replaced all `border-dashed` styling with solid crisp hairlines (`border-[#E2DFD8]`, `border-[#C5A059]/40`, `border-[#7C3F1D]/50`) across `BestSellersTabs.jsx`, `ChooseYourBatikGrid.jsx`, `CollectionFilterBar.jsx`, `collections.all.jsx`, and `VipDiscountModal.jsx`.
  - *Evidence*: `rg "border-dashed" app/` returned zero matches.
- [x] **Task 56.3: Architectural Minimalism & Geometry Purification**
  - *Action*: Removed pseudo-traditional clip-art icon `BatikCorner` from `FamilyBundleBuilder.jsx`. Straightened tilted cards in `SarimbitBentoSection.jsx` to sharp `0deg` zero-radius precision. Removed boxed tier pill from `Breadcrumb.jsx`. Removed redundant card border containers from `CartLineItem.jsx` and `CartMain.jsx`.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0, 1.69s).

---

## Phase 57: Editorial Article Detail UI/UX & Grid Harmonization (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/routes/blogs.$blogHandle.$articleHandle.jsx, ProductItem*

- [x] **Task 57.1: Curated Product Card Synchronization (`ProductItem`)**
  - *Action*: Replaced custom `ProductStoryCard` with canonical `ProductItem` component inside `blogs.$blogHandle.$articleHandle.jsx`, standardizing Quiet Luxury frameless card architecture, 4:5 portrait ratio, strikethrough compare-at price, and hover slide-up quick view.
  - *Evidence*: Render verified in article detail route with live catalog products.
- [x] **Task 57.2: Mobile 2x2 Grid Precision**
  - *Action*: Configured `grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12` displaying exactly 4 curated products in a balanced 2x2 grid on mobile viewports and a single 4-column row on desktop.
  - *Evidence*: `ARTICLE_QUERY` queries `products(first: 4)` with required image, variant price, compareAtPrice, and metadata fields.
- [x] **Task 57.3: Related Articles Homepage Grid Alignment**
  - *Action*: Replaced previous related articles layout with the 3-column frameless editorial grid (`grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10`) matching `EditorialJournalSection.jsx`: 3:2 aspect ratio, micro index (`01 / ARSIP BUDAYA`), date, serif headline, narrative excerpt (`line-clamp-3`), and `BACA CATATAN →` action link.
  - *Evidence*: Verified 3-column layout and typography harmony.
- [x] **Task 57.4: Hero Banner Proportional Container Width**
  - *Action*: Expanded article hero banner from narrow `max-w-4xl` to full container width (`w-full aspect-[16/9] sm:aspect-[21/9]`) matching the layout hierarchy of editorial catalog grids.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings), `npm run build` (exit code 0).

---

## Phase 58: Legal Policies & Official Pages Storefront Harmonization (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/routes/policies._index.jsx, app/routes/policies.$handle.jsx, app/routes/pages.$handle.jsx*

- [x] **Task 58.1: Full 4-Policy Architecture in `policies._index.jsx`**
  - *Action*: Fixed policy array population in `policies._index.jsx` to guarantee all 4 core legal policies (Shipping, Privacy, Refund/Exchange, Terms of Service) are always rendered with rich summaries and badges, reading dynamically from Shopify `shop` policies and native Shopify `pages` (`kebijakan-pengiriman`, `kebijakan-pengembalian`, `syarat-dan-ketentuan`).
  - *Evidence*: Render verified on `/policies` with 4 complete cards + 3 service guides.
- [x] **Task 58.2: Dynamic Dual-Source Policy Loader in `policies.$handle.jsx`**
  - *Action*: Upgraded `policies.$handle.jsx` to seamlessly fetch from `shop[policyKey]` or native Shopify `page[pageHandle]`, supporting both English and Indonesian handles (`shipping-policy`, `kebijakan-pengiriman`, `privacy-policy`, `kebijakan-privasi`, `refund-policy`, `kebijakan-pengembalian`, `terms-of-service`, `syarat-dan-ketentuan`).
  - *Evidence*: All 4 policy routes return HTTP 200 with authentic Shopify content.
- [x] **Task 58.3: Privacy Policy Fallback in `pages.$handle.jsx`**
  - *Action*: Equipped `pages.$handle.jsx` to gracefully serve `shop.privacyPolicy` when `/pages/kebijakan-privasi` or `/pages/privacy-policy` is accessed, eliminating 404 errors.
  - *Evidence*: `/pages/kebijakan-privasi` returns HTTP 200 OK.
- [x] **Task 58.4: Customer Care & Atelier Guides Integration**
  - *Action*: Added curated secondary section on `/policies` connecting customers to Size Guide (`/pages/panduan-ukuran`), Care Guide (`/pages/panduan-perawatan`), and Bespoke Tailoring (`/pages/layanan-seragam`), complete with direct WhatsApp Concierge CTA.
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 59: Custom Checkout Domain & Customer Account Synchronization (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/lib/checkout.js, app/components/CartSummary.jsx, app/routes/cart.jsx, app/routes/cart.$lines.jsx, app/root.jsx, app/entry.server.jsx, .env.example*

- [x] **Task 59.1: Dedicated Checkout & Account Domain Environment Configuration**
  - *Action*: Configured `PUBLIC_CHECKOUT_DOMAIN="checkout.batiksmile.com"` and `PUBLIC_ACCOUNT_DOMAIN="account.batiksmile.com"` in `.env.example` and live `.env`. Updated `PUBLIC_CUSTOMER_ACCOUNT_API_URL="https://account.batiksmile.com"`.
  - *Evidence*: Documented in `.env.example` and verified in Oxygen runtime environment bindings.
- [x] **Task 59.2: Modular Checkout Resolution Utility (`app/lib/checkout.js`)**
  - *Action*: Created `resolveCheckoutUrl(checkoutUrl, customDomain)` to rewrite internal `myshopify.com` or root domains to `checkout.batiksmile.com` while preserving checkout token, line items, and query parameters. Created `resolveAccountUrl(path, customAccountDomain)` for external portal links.
  - *Evidence*: Unit test / verification passed, clean imports across cart handlers.
- [x] **Task 59.3: Storefront Cart & Direct Redirects Normalization**
  - *Action*: Integrated `resolveCheckoutUrl` into `CartSummary.jsx` checkout CTA, `cart.jsx` action redirect handler (`redirectTo === 'checkout'`), and `cart.$lines.jsx` instant link loader.
  - *Evidence*: All checkout entry points consistently route to `https://checkout.batiksmile.com`.
- [x] **Task 59.4: Content Security Policy & Root Loader Synchronization**
  - *Action*: In `app/root.jsx`, exposed `publicCheckoutDomain` and `publicAccountDomain` with quiet fallbacks, and configured `consent.checkoutDomain`. In `app/entry.server.jsx`, whitelisted `https://account.batiksmile.com` and `https://checkout.batiksmile.com` in CSP `connectSrc` and `mediaSrc`.
  - *Evidence*: Zero CSP violation warnings. `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).
- [x] **Task 59.5: Navigation & Footer Client Portal Link**
  - *Action*: Added "Portal Akun & Status Pesanan" link pointing to `/account` under LAYANAN & INFORMASI in `app/components/Footer.jsx`.
  - *Evidence*: Verified in site footer and header account trigger.

---

## Phase 60: SEO Modernization, W3C Schema Engine, OG Image, & 404 Boundaries (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/lib/seo.js, app/lib/schema.js, app/components/JsonLd.jsx, app/components/NotFoundView.jsx, public/og-image.*, app/routes/**

- [x] **Task 60.1: Standard 1200x630 OpenGraph Assets Generation (`public/og-image.jpg`, `public/og-image.webp`)**
  - *Action*: Generated official high-resolution OpenGraph banners (1200x630, ~169KB JPG, ~113KB WebP) embodying Quiet Luxury Nusantara aesthetic: Obsidian Deep vignette, Mori Linen typography, antique gold (`#C5A059`) hairline borders, diamond corner emblems, and official showroom establishment credentials (Semarang, Est. 2007).
  - *Evidence*: Verified file creation in `public/og-image.jpg` and `public/og-image.webp`.
- [x] **Task 60.2: Comprehensive OpenGraph & Social Metadata Modernization (`app/lib/seo.js`)**
  - *Action*: Modernized all 19 route metadata generators in `app/lib/seo.js`. Set `DEFAULT_OG_IMAGE = 'https://batiksmile.com/og-image.jpg'`, `DEFAULT_OG_IMAGE_WIDTH = '1200'`, `DEFAULT_OG_IMAGE_HEIGHT = '630'`, `DEFAULT_OG_IMAGE_TYPE = 'image/jpeg'`, and `DEFAULT_LOCALE = 'id_ID'`. Standardized `buildSocialMeta` ensuring 100% of routes export `og:locale`, `og:image:secure_url`, explicit dimensions, `og:image:type`, and Twitter card tags.
  - *Evidence*: Verified via unit checks and route meta functions.
- [x] **Task 60.3: W3C JSON-LD Structured Data Engine (`app/lib/schema.js`, `app/components/JsonLd.jsx`)**
  - *Action*: Built comprehensive Schema.org generator covering `ClothingStore`/`Organization` (with Simongan 109 Flagship & Banyumanik branch, geo-coordinates, opening hours, WhatsApp Concierge, and Instagram), `WebSite` (with Sitelinks SearchBox `potentialAction`), `Product` (`Product`, `AggregateOffer`, brand, condition, stock availability, SKU), `CollectionPage`/`ItemList`, `BlogPosting`, and `BreadcrumbList`. Created CSP nonce-aware `<JsonLd>` component using `useNonce()` from `@shopify/hydrogen`.
  - *Evidence*: Injected into `root.jsx`, `products.$handle.jsx`, `collections.$handle.jsx`, `collections.all.jsx`, `blogs.$blogHandle.$articleHandle.jsx`, `blogs._index.jsx`, `pages.$handle.jsx`, `policies.$handle.jsx`, and `policies._index.jsx`.
- [x] **Task 60.4: Architectural Quiet Luxury 404 / Error System (`app/components/NotFoundView.jsx`, `app/routes/**`)**
  - *Action*: Engineered modular, unboxed 404 view over Mori Linen canvas (`#FAF8F5`) with oversized watermark numeral (`404`), rotating diamond monogram emblem, whispered headline "Jejak Wastra Belum Tersedia", links to Home, Collections, search trigger, and WhatsApp Concierge. Replaced custom 404 in `$.jsx` and exported `ErrorBoundary` with `NotFoundView` across all key routes (`root.jsx`, `products.$handle.jsx`, `collections.$handle.jsx`, `collections.all.jsx`, `blogs.$blogHandle.$articleHandle.jsx`, `blogs._index.jsx`, `pages.$handle.jsx`, `policies.$handle.jsx`, `policies._index.jsx`, `search.jsx`, `cart.jsx`).
  - *Evidence*: `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 61: Product Count Elimination & Quiet Luxury Typography Scale Elevation (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/components/ProductItem.jsx, app/components/CollectionFilterBar.jsx, app/components/LuxurySearchModal.jsx, app/components/SearchResults.jsx, app/routes/collections.$handle.jsx, app/routes/collections.all.jsx, app/routes/search.jsx*

- [x] **Task 61.1: Complete Removal of Product & Entity Counters Across Storefront**
  - *Action*: Eliminated count text and badges from all catalog collection headers (`${totalCount} Busana Ditemukan` -> `Koleksi Busana`), sidebar headers (`({totalCount})`), mobile filter drawers (`Terapkan (${totalCount} Busana)` -> `Terapkan Filter`), search headers (`PRODUK & KARYA BATIK ({products.nodes.length})` -> `PRODUK & KARYA BATIK`, `MENAMPILKAN {result.total} HASIL` -> `HASIL PENCARIAN`), and predictive search modal tabs & section headers.
  - *Evidence*: Zero numerical clutter across collection PLPs, filter drawers, search pages, and predictive search modals.
- [x] **Task 61.2: Typography Scale Elevation on Product Cards (`ProductItem.jsx`)**
  - *Action*: Scaled up typography across all product card instances: product titles increased from `text-sm sm:text-base` / `text-[11px] sm:text-xs` to `font-serif text-base sm:text-lg` (Exclusive) and `text-xs sm:text-sm uppercase tracking-[0.12em]` (Premium & Essential); prices scaled from `text-[11px] sm:text-xs` to `text-sm sm:text-base font-semibold` / `font-serif text-base sm:text-lg`; compare-at strikethrough price scaled to `text-xs sm:text-sm`; eyebrow category tag scaled to `text-[10px] sm:text-xs`; whispered tier craftsmanship badge scaled to `text-[10px] sm:text-[11px]`; and hover action button scaled to `py-3 px-3 text-xs`.
  - *Evidence*: Significantly enhanced legibility and visual prominence while strictly preserving 4:5 vertical portrait geometry and zero-radius architecture.
- [x] **Task 61.3: Collection Filter Bar & Sort Controls Readability Enhancement**
  - *Action*: In `CollectionFilterBar.jsx`, scaled sidebar section titles to `text-xs sm:text-sm uppercase font-bold`, filter checkboxes and labels to `text-xs sm:text-sm`, mobile filter trigger button to `text-xs sm:text-sm`, desktop sort dropdown and popover menu items to `text-xs sm:text-sm`, active filter chips to `text-[11px] sm:text-xs`, and mobile drawer action buttons to `py-3.5 text-xs sm:text-sm`.
  - *Evidence*: Clean touch targets and high-readability controls across mobile and desktop.
- [x] **Task 61.4: Search Result & Collection Editorial Header Typography Scaling**
  - *Action*: In `collections.$handle.jsx` and `collections.all.jsx`, scaled hero subtitles to `text-xs sm:text-sm`, narrative text to `text-sm sm:text-base`, VIP CTA buttons to `px-8 py-3.5 text-xs`, and service highlights to `text-xs`. In `search.jsx` and `SearchResults.jsx`, scaled search product titles to `text-base sm:text-lg` and prices to `text-sm sm:text-base`.
  - *Evidence*: Verified across collection and search views; passed `npm run lint` (0 errors, 0 warnings) and `npm run build` (exit code 0).

---

## Phase 62: Bespoke Cart Icon, Drawer UI/UX Precision, Mobile Logo Scale & PDP Natural Flow (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/components/Header.jsx, app/components/Aside.jsx, app/components/PageLayout.jsx, app/components/CartMain.jsx, app/components/CartLineItem.jsx, app/routes/products.$handle.jsx*

- [x] **Task 62.1: Bespoke Quiet Luxury Atelier Shopping Tote Bag Icon**
  - *Action*: Replaced generic default Shopify shopping bag SVG with custom architectural Atelier Tote Bag icon (tapered body, sleek arched dual handles, zero-slop vector paths). Upgraded floating cart quantity badge with Obsidian Deep background (`#111111`), Imperial Antique Gold typography (`#C5A059`), and hairline border (`#C5A059`/60) with zero layout shift. Synchronized `CartEmpty` state icon in `CartMain.jsx`.
  - *Evidence*: Verified in `Header.jsx` and `CartMain.jsx`.
- [x] **Task 62.2: Cart Drawer UI/UX Precision Alignment with Search Modal & Burger Menu**
  - *Action*: Upgraded `Aside.jsx` with velvety dark blur backdrop (`bg-black/75 backdrop-blur-md`), expanded spacious width (`sm:w-[460px] lg:w-[480px]`), and architectural header bar featuring gold square emblem (`#C5A059`), desktop `[ESC] TUTUP` badge, and 44px close button. Synchronized titles across `PageLayout.jsx` (`BUTIK BATIK SMILE • TAS BELANJA` & `BUTIK BATIK SMILE • MENU NAVIGASI`). Added whispered free shipping perk ribbon in `CartMain.jsx` and elevated line item typography/steppers in `CartLineItem.jsx`.
  - *Evidence*: Cart Drawer visual precision and interaction behavior identical to `LuxurySearchModal.jsx`.
- [x] **Task 62.3: Mobile Header Logo & Height Scale Enhancement**
  - *Action*: Scaled mobile center brand logo from `text-[16px] sm:text-[17px]` to `font-serif text-[20px] sm:text-[22px] font-normal uppercase tracking-[0.24em]` with brown-to-gold patina gradient. Scaled desktop logo to `text-[20px] xl:text-[22px]`. Adjusted header bar height to `h-20 sm:h-21 lg:h-20` ensuring dignified proportion and generous breathing room in sticky and static states.
  - *Evidence*: Verified across mobile and desktop viewport sizes.
- [x] **Task 62.4: Non-Sticky Natural Flow for PDP Image Gallery (`products.$handle.jsx`)**
  - *Action*: Removed `lg:sticky lg:top-24` from product image gallery container in `app/routes/products.$handle.jsx`. The 4:5 vertical gallery and product details now scroll together naturally in an editorial magazine flow, eliminating sticky unpinning jitter and thumbnail viewport cutoff. Elevated right-column option labels (`text-xs font-medium`), size option chips (`w-12 h-12 text-xs sm:text-sm`), quantity selector (`h-13 w-32`), Add to Cart CTA (`h-13 text-xs uppercase font-bold tracking-[0.2em]`), and Buy Now CTA (`h-13 text-xs uppercase font-bold tracking-[0.22em]`).
  - *Evidence*: Verified on PDP; passed ESLint (0 errors, 0 warnings) and production build (`npm run build`, exit code 0).

---

## Phase 63: Bespoke Series Naming Architecture & Shopify Admin Synchronization (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: Shopify Admin GraphQL, app/components/*, app/routes/*, SCHEMA.md, PAGES-SCHEMA.xml*

- [x] **Task 63.1: Live Shopify Admin GraphQL Mutations**
  - *Action*: Mutated core collections via Shopify Admin GraphQL:
    - Collection `gid://shopify/Collection/480517193785`: Title `Luxury Series`, handle `luxury-series`, updated description.
    - Collection `gid://shopify/Collection/480517390393`: Title `Premium Series`, handle `premium-series`, updated description.
    - Collection `gid://shopify/Collection/480517455929`: Title `Ekonomi Series`, handle `ekonomi-series`, updated description.
    - Flagship couple products (`Sarimbit Charcoal Hitam`, `Sarimbit Mustard Gold`, `Sarimbit Royal Navy`): updated descriptions to match new Series nomenclature.
  - *Evidence*: Verified live in Shopify Admin via GraphQL query.
- [x] **Task 63.2: 301 Permanent Redirect Table Synchronization**
  - *Action*: Updated redirect table in `app/routes/collections.$handle.jsx` to map `sarimbit-luxury` &rarr; `/collections/luxury-series`, `sarimbit-premium` &rarr; `/collections/premium-series`, and `sarimbit-ekonomi` &rarr; `/collections/ekonomi-series`.
  - *Evidence*: Curl tests verified HTTP 301 Moved Permanently with correct Location headers.
- [x] **Task 63.3: Storefront Codebase Alignment Across Navigation & Components**
  - *Action*: Updated all references across `Header.jsx`, `MegaMenu.jsx`, `Footer.jsx`, `CartMain.jsx`, `CollectionFilterBar.jsx`, `TierExperience.jsx`, `SarimbitSpotlight.jsx`, `SarimbitBentoSection.jsx`, `HeroSlider.jsx`, `HeroEditorial.jsx`, `ShoppableLookbook.jsx`, `LuxurySearchModal.jsx`, `products.$handle.jsx`, `collections.$handle.jsx`, `collections._index.jsx`, `search.jsx`, and `account.orders._index.jsx`.
  - *Evidence*: `git grep -i -E "sarimbit[ -](luxury|premium|ekonomi)" -- app/` confirmed 0 unmigrated active UI strings or broken links.
- [x] **Task 63.4: Architectural Documentation & Typegen Verification**
  - *Action*: Synchronized `SCHEMA.md`, `PAGES-SCHEMA.xml`, and `app/lib/schema.js`. Executed `npm run codegen`, `npm run lint`, and `npm run build`.
  - *Evidence*: Codegen exit code 0; ESLint 0 errors, 0 warnings; Production build exit code 0. Both dev servers active (`revenleather.com` on port 3000, `batik-smile-hydrogen` on port 3001).

---

## Phase 64: Heritage Typography, Footer Navigation Simplification & Slop Purge (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: Shopify Admin GraphQL, app/components/Footer.jsx, app/routes/collections.$handle.jsx, app/routes/products.$handle.jsx, app/routes/pages.tentang-kami.jsx*

- [x] **Task 64.1: Shopify Admin Mutations for Tentang Kami & Luxury Series Description**
  - *Action*: Mutated `tentang-kami` page (`gid://shopify/Page/133633998905`) via GraphQL to delete the `Budaya Layanan: 3S 1C 1T & 1H` block. Mutated `Luxury Series` collection (`gid://shopify/Collection/480517193785`) to clear obsolete `descriptionHtml`.
  - *Evidence*: Verified in Shopify Admin GraphQL query.
- [x] **Task 64.2: Slop Purge Across Storefront (3S 1C 1T & 1H)**
  - *Action*: Completely purged 3S 1C 1T & 1H mentions across `pages.tentang-kami.jsx` (entire section removed), `Footer.jsx` (brand stamp and column 4), `LuxurySearchModal.jsx`, `ShowroomO2O.jsx`, `TrustGuaranteeBar.jsx`, `collections.$handle.jsx`, `pages.$handle.jsx`, `policies._index.jsx`, and `products.$handle.jsx`.
  - *Evidence*: `git grep -i "3S 1C" app/` returns 0 matches.
- [x] **Task 64.3: Brand Heritage Standardization to SEJAK 2007**
  - *Action*: Replaced `ESTABLISHED 2007` and `Est. 2007` with `SEJAK 2007` / `Sejak 2007` across `Header.jsx`, `HeroSlider.jsx`, `HeroEditorial.jsx`, `Footer.jsx`, `CartMain.jsx`, `LuxurySearchModal.jsx`, `pages.tentang-kami.jsx`, and `products.$handle.jsx`.
  - *Evidence*: `git grep -i "establish" app/` returns 0 matches.
- [x] **Task 64.4: Footer Navigation Simplification**
  - *Action*: In `Footer.jsx`, converted Column 2 from "KATALOG KOLEKSI" into clean "NAVIGASI" menu (Home, Catalog, Luxury Series, Premium Series, About, Showroom, Contact). Removed "Layanan konsultasi motif sarimbit..." paragraph from Column 4.
  - *Evidence*: Live curl check verified rendered footer menu items.
- [x] **Task 64.5: Luxury Series Collection Hero Refinement**
  - *Action*: In `collections.$handle.jsx`, applied `italic` to `Luxury Series` h1 title, removed `HAUTE HERITAGE • MAHAKARYA SUTRA ATBM` eyebrow, changed subtitle to standard font-serif (removed italic), and removed VIP concierge button div from the hero.
  - *Evidence*: HTML inspection verified italic title, standard subtitle, and zero hero button.
- [x] **Task 64.6: Product Page PDP Streamlining**
  - *Action*: In `products.$handle.jsx`, removed stock status indicator ("Tersedia di Butik") and under-price value props ("Sutra Alam ATBM • Canting Prada Emas • Sambung Motif Presisi").
---

## Phase 65: Luxury Series Color Inversion, Simplified Pillars & Brand Story Development (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/routes/collections.$handle.jsx, app/components/ProductTierStorySection.jsx, app/routes/pages.tentang-kami.jsx, Shopify Admin GraphQL*

- [x] **Task 65.1: Luxury Series Title & Subtitle Color Inversion & Screenshot 0 Copy**
  - *Action*: In `collections.$handle.jsx`, inverted header styling for `Luxury Series`: Title is Gold italic (`text-[#C5A059] italic`), Subtitle is White (`text-white/95`, standard non-italic font) with refined text matching Screenshot 0:
    *"Koleksi Luxury Batik Smile yang merepresentasikan kemewahan, keanggunan, dan kualitas dalam setiap detail. Menghadirkan perpaduan motif batik pilihan, desain berkarakter, serta sentuhan istimewa untuk melengkapi momen berharga dengan gaya yang elegan dan berkelas."*
  - *Evidence*: SSR check via node fetch verified `hasGoldTitle: true` and `hasSub: true`.
- [x] **Task 65.2: Streamlining Collection & Product Story Pillars**
  - *Action*: In `collections.$handle.jsx` and `ProductTierStorySection.jsx`, simplified the 3 pillars based on Screenshot 1 into punchy, clear value propositions without fluff:
    - Pilar 01: `Material & Furing Premium` (Batik tulis, kombinasi, hingga printing eksklusif dengan furing trikot sejuk untuk kenyamanan terbaik).
    - Pilar 02: `Jahitan Penjahit Teredukasi` (Dikerjakan teliti oleh penjahit terampil dan berpengalaman guna memastikan hasil busana rapi, presisi, dan berkelas).
    - Pilar 03: `Desain Elegan & Berkarakter` (Siluet berkelas yang dirancang proporsional untuk menyempurnakan penampilan Anda di setiap momen istimewa).
  - *Evidence*: Verified across collection and product pages; `npm run lint` 0 errors.
- [x] **Task 65.3: Brand Story Narrative Development ("Cerita di Balik Batik Smile")**
  - *Action*: In `pages.tentang-kami.jsx`, developed and expanded the narrative from Screenshot 2:
    - Rooted in Semarang since 2007 with the vision of bringing the beauty of batik into everyday life across generations.
    - Living cultural heritage bridging traditional philosophical motifs with contemporary tailoring, comfortable silhouettes, and elegant palettes.
    - Catering from personal everyday wear and family sarimbit to corporate uniforms and bespoke Luxury Series with fair, transparent value.
    - Growth driven by consistent boutique craftsmanship, design innovation, and sincere hospitality.
  - *Evidence*: SSR node fetch verified `hasCeritaTitle: true`, `hasStoryP1: true`, `hasStoryP2: true`, and `hasStoryP3: true`.
- [x] **Task 65.4: Shopify Admin Page Body Synchronization**
  - *Action*: Mutated Shopify Admin Page `gid://shopify/Page/133633998905` (`tentang-kami`) via GraphQL `pageUpdate` with the newly developed story and responsive styling.
  - *Evidence*: Mutation response confirmed `userErrors: []` and updated page content.
- [x] **Task 65.5: Build & Multi-Server Verification**
  - *Action*: Ran `npm run lint` and `npm run build`. Verified both dev servers: `http://localhost:3000/` (`revenleather.com`) HTTP 200 OK and `http://localhost:3001/` (`batik-smile-hydrogen`) HTTP 200 OK.
  - *Evidence*: Exit code 0 on all tests and builds.
- [x] **Task 65.6: Footer Kontak Resmi Butik & Social Media Redesign**
  - *Action*: Redesigned Column 4 of `Footer.jsx` to match user reference image with bespoke SVGs:
    - Phone handset header with gold underline.
    - WA Concierge channel with WhatsApp icon, number `081-390-8888-09`, and right chevron.
    - Instagram channel with camera icon, handle `@batiksmile_official`, and right chevron.
    - Email channel with envelope icon, email `butik@batiksmile.com`, and right chevron.
    - Horizontal divider line and dedicated `JAM OPERASIONAL` block with clock icon (`Setiap Hari: 09.00 – 21.00 WIB`).
    - Added `GABUNG →` arrow to newsletter submit button, plus social media icons (Instagram, TikTok, Facebook, YouTube) and `Peta Situs` in the bottom bar.
  - *Evidence*: `npm run lint` 0 errors, `npm run build` exit code 0, SSR inspection confirmed all channels, icons, and hours rendered properly.
- [x] **Task 66: Luxury & Premium Subcategories, Lapisan Trikot & Bespoke Tailoring (2026-10-13)**
  - *Action*: Modernized subcategories and tier-differentiation across storefront and Shopify Admin:
    - Replaced sleeve-based links with curated occasions for Pria and Wanita: `Baju Kerja`, `Acara Resmi`, `Casual`, `Sarimbit` in `MegaMenu.jsx` (rendered in a balanced 2-column grid) and `CollectionFilterBar.jsx` (`Kategori Busana` filter in sidebar and mobile drawer).
    - Differentiated Bespoke Tailoring Service: highlighted `Layanan Jahitan Sarimbit & Seragam (Tanpa Minimal Order)` for Luxury and Premium in MegaMenu, Collection FilterBar, Collection route pillars, `ProductTierStorySection.jsx`, and PDP accordion in `products.$handle.jsx`; strictly suppressed/omitted on Ekonomi Series.
    - Updated Premium Series copy and 2-option Lapisan Trikot (*Dengan Trikot* vs *Tanpa Trikot*) across storefront and synced to Shopify Admin Collection metadata via GraphQL mutation.
  - *Evidence*: `npm run lint` 0 errors, 0 warnings; `npm run build` exit code 0; localhost:3000 (`revenleather.com`) and localhost:3001 (`batiksmile`) verified HTTP 200 OK.

---

## Phase 67: Cinematic Collection Heroes, Showroom Footer Precision & Shopify Storefront Sync (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/routes/collections.$handle.jsx, app/components/Footer.jsx, app/routes/products.$handle.jsx, app/routes/_index.jsx, app/routes/collections.all.jsx*

- [x] **Task 67.1: Full-Bleed Cinematic Hero Across Core Collections**
  - *Action*: Unified `Ekonomi Series`, `Kain Batik`, `Batik Anak`, and `Aksesoris` (`collections.$handle.jsx`) onto full-bleed background hero architecture (`isCinematicHero = true`) with tailored scrim overlays and 3-pillar value badges. Removed *"Jahit Bespoke Tanpa MOQ • Garansi Butik Resmi"* from Kain hero.
  - *Evidence*: Verified HTTP 200 and full-bleed hero markup on `/collections/ekonomi-series`, `/collections/kain`, `/collections/batik-anak`, and `/collections/aksesoris`.
- [x] **Task 67.2: Announcement Bar, Footer 12-Col Grid & Showroom Google Maps Links**
  - *Action*: Made announcement bar non-sticky with copy *"BATIK BERKUALITAS • LAYANAN MAKSIMAL • HARGA BERSAHABAT"*. Updated `Footer.jsx` to precision 12-column grid (`4 + 2 + 3 + 3`) with official showroom titles (**Batik Smile Sampokong** & **Batik Smile Sukun**), pin icons, and Google Maps route links. Retired `/pages/layanan-seragam` and `/pages/fasilitas-store` via permanent 301 redirects to `/pages/lokasi-toko`.
  - *Evidence*: Verified 301 redirects and footer layout on `localhost:3001` and `batiksmile.com`.
- [x] **Task 67.3: Product Badges & Full Shopify Storefront Sync Audit**
  - *Action*: Replaced *"100% Batik Asli Cap/Tulis"* with *"100% Batik Indonesia"* and purged all *"Furing Katun Hero"* references. Enforced `storefront.CacheShort()` across all route loaders, added `availableForSale` to product GraphQL fragments, updated `_index.jsx` to `sortKey: UPDATED_AT`, added `?gender=` and `?sleeve=` filtering to `collections.all.jsx`, and made `products.$handle.jsx` option buttons and description parser resilient to dynamic Shopify product updates.
  - *Evidence*: Deployed via commit `ed989bb` (GitHub Actions run `38465725685`), verified HTTP 200 on live production.

---

## Phase 68: Official WhatsApp Concierge Icons, Kain Batik Narrative & Clean Minimalist Cart Drawer (COMPLETED ✅)
*Semantic Risk: R1 | Primary Boundary: app/components/Footer.jsx, app/components/WhatsAppConcierge.jsx, app/components/MobileNavigation.jsx, app/routes/collections.$handle.jsx, app/components/CartSummary.jsx, app/components/CartMain.jsx*

- [x] **Task 68.1: Official WhatsApp SVG Vector & Green Floating Concierge Button**
  - *Action*: Replaced distorted/truncated WhatsApp SVG paths in `Footer.jsx`, `MobileNavigation.jsx`, and `pages.lokasi-toko.jsx` with the complete official WhatsApp vector path. Replaced the desktop floating text pill in `WhatsAppConcierge.jsx` with an official green (`#25D366`) circular WhatsApp icon button (`w-14 h-14 rounded-full`).
  - *Evidence*: Deployed via commit `4a047af` (GitHub Actions run `38468185212`).
- [x] **Task 68.2: Kain Batik Collection Title & Editorial Copy**
  - *Action*: Updated `/collections/kain` (`collections.$handle.jsx` and `collections._index.jsx`) to display **Kain Batik** as collection title with the new editorial description: *"Temukan beragam pilihan kain batik dengan motif dan warna yang memikat, mulai dari sentuhan klasik hingga desain modern. Cocok untuk kreasi busana personal, seragam, maupun kebutuhan sarimbit, dengan pilihan kain yang dapat disesuaikan dengan gaya dan kebutuhan Anda."*
  - *Evidence*: Deployed via commit `4e0844f` (GitHub Actions run `38468618670`), verified live on `https://batiksmile.com/collections/kain`.
- [x] **Task 68.3: Clean Minimalist Cart Drawer UI/UX**
  - *Action*: Streamlined `CartSummary.jsx` and `CartMain.jsx` aside drawer by removing redundant headers, duplicate cost breakdown rows, promo input clutter in the drawer, and payment method lists, keeping only a clean **Subtotal** row, concise checkout note (*"Ongkos kirim & kode promo dihitung saat checkout."*), and **LANJUT KE PEMBAYARAN →** CTA.
  - *Evidence*: Deployed via commit `01a368c` (GitHub Actions run `38468914337`), `npm run lint` 0 errors, `npm run build` exit code 0, verified live on `https://batiksmile.com`.
