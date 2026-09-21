# Build & Engineering Log: Batik Smile Nusantara

> Chronological log of engineering milestones, benchmark audits, and architectural revisions.  
> Status: Active Ledger.

---

## Milestone 1: Benchmark Reverse-Engineering & Visual Asset Generation (2026-09-03)

### 1. Reverse-Engineering Engrasia (`https://engrasia.com`)
- Analyzed live Shopify Prestige 9.3.0 theme architecture.
- Identified core micro-design rules:
  - `border-radius: 0px` on all buttons, input fields, badges, and card containers.
  - Uppercase micro-tracking (`letter-spacing: 0.18em`) for quiet luxury elegance.
  - Typography: **Instrument Sans** paired with editorial serif headlines.
  - Slide-over drawer cart (`cartType: "drawer"`).
  - Clear product naming syntax: `NAME [TYPE]` (e.g. `INHYEON [OUTER]`).
  - Dual-engine separation of raw fabric ("Choose Your Batik") vs. bespoke tailoring services.

### 2. Company Profile & Brand Asset Synthesis
- Inspected official `COMPANY PROFILE.pdf` and verified:
  - Est. 2007, Semarang, Central Java.
  - Flagship Showroom (3 Floors): Jl. Simongan Raya No. 109, Pamularsih, Semarang.
  - Branch Store: Jl. Sukun Raya No. 23, Banyumanik, Semarang.
  - Service code: **3S 1C 1T & 1H** (*Senyum, Salam, Sapa, Cepat, Tanggap, Hati*).
  - Corporate & institutional tailoring without MOQ: RS Bhayangkara, RSUD dr. Adhyatma, weddings, family sarimbit.
  - Official WhatsApp: `081-390-8888-09` | Instagram: `@batiksmile.official`.
- Copied official brand logo to `public/brand/batik-smile-logo.png`.

### 3. Generated Initial High-End Editorial Assets
- `public/banners/hero_editorial_banner.jpg`: Modern tailored couple outside luxury Javanese pavilion.
- `public/banners/craftsmanship_canting_banner.jpg`: Macro artisan hands drawing hot wax with copper canting on Mori cloth.
- `public/banners/sarimbit_family_banner.jpg`: Harmonious family walking in botanical heritage courtyard.

### 4. Color System Formulated: Quad-Harmonic Palette
- **Hitam**: Obsidian Deep (`#111111`) & Charcoal Ink (`#1C1C1C`) — WCAG AAA 18.5:1 contrast.
- **Putih**: Pure Mori (`#FFFFFF`) & Mori Linen (`#FAF8F5`).
- **Gold**: Imperial Antique Gold (`#C5A059`) & Deep Ochre Gold (`#9E7D3B` for text).
- **Brown**: Deep Espresso (`#4A2E1B`) & Soga Matang (`#7C3F1D`).

### 5. Documentation Suite Aligned
- `PRD.md`: Dual-Engine commerce, 3-Tier collections, and verified showroom locations.
- `DESIGN.md`: Quad-Harmonic palette, 4 theme schemes, zero-radius architecture, and component directory.
- `SCHEMA.md`: GraphQL contracts, Metaobjects (`hero_banner`, `heritage_video`, `customer_testimonial`), and product Metafields.
- `ARCHITECTURE.md`: Component hierarchy, Oxygen runtime, and caching strategy.
- `TASKS.md`: Execution queue updated with detailed phase breakdown.
- `STATUS.md`: Delivery ledger transitioned to `READY`.
- `DECISIONS.md`: ADR-001 to ADR-005 recorded.
- `OBSERVABILITY.md`: Core Web Vitals budgets and edge health probes documented.
- `RELEASE.md`: Release manifest initialized (`REL-20260903-SPECS-V2`, Risk: `R0`).
- `AGENTS.md`: Comprehensive AI operational contract established.

---

## Milestone 2: Live Catalog Sync, 3-Tier Collection Partition, & Domain Verification (2026-09-03)

### 1. Legacy Product Purge & Clean Slate
- Verified Shopify CLI store access to `23ahbp-sq.myshopify.com` (`Shop ID: 81332240441`).
- Purged all 20 legacy products via GraphQL mutation `productDelete`.
- Confirmed automatic deletion of all 100 attached legacy media images (`productsCount: 0`).
- Deleted obsolete collection `sarimbit-batik-couple` (`Collection ID: 480516145209`).

### 2. 3-Tier Sarimbit Restructuring
- Updated existing Sarimbit collections to 3 clean, simple tiers:
  1. `Sarimbit Exclusive` (`sarimbit-exclusive` — ID: `480517193785`): Sutra Alam ATBM & Prada Tulis Emas.
  2. `Sarimbit Premium` (`sarimbit-premium` — ID: `480517390393`): Tenun Dobby Timbul & Katun Primisima Pesta.
  3. `Sarimbit Ekonomis` (`sarimbit-ekonomis` — ID: `480517455929`): Katun Primisima Daily.
- Enforced strict catalog rule: **Zero cross-tier duplicate collections** between Exclusive and Premium.

### 3. Curated Product Upload & Media Ingestion
- Analyzed `/Users/ongki/Downloads/Batik Smile/product_images/` (`prod_01` to `prod_20`).
- Applied **3-word minimalist title rule** across all 20 RTW products:
  - *Tunik Senyum Floral, Blus Royal Navy, Outer Terracotta Gold, Gamis Parang Kusumo, Kebaya Encim Modern, Daster Solo Series, Kemeja Motif Semarangan, Kemeja Sido Asih, Hem Dobby Maroon, Hem Lurik Hitam, Celana Sirwal Etnik, Sarimbit Sutra Pasangan, Sarimbit Royal Navy, Sarimbit Daily Keluarga, Sarimbit Kondangan Gold, Dress Anak Bunga, Hem Anak Pesisir, Setelan Surjan Anak, Kain Tenun Troso, Set Blangkon Semarang*.
- Generated rich SEO meta titles & descriptions for high conversion search visibility.
- Structured clean HTML descriptions celebrating fabric, furing hero lining, and bespoke symmetry.
- Ingested and linked all 100 high-res 4:5 lookbook images via `stagedUploadsCreate` and GCS upload.

### 4. WhatsApp High-Ticket Sarimbit Partitioning
- Analyzed `/Users/ongki/Downloads/WhatsApp Unknown 2026-09-03 at 11.43.35`.
- Identified 3 distinct couple sets (Female + Male outfits in showroom):
  - **Sarimbit Exclusive**: `Sarimbit Mustard Gold` (Mustard gold couple) & `Sarimbit Royal Navy` (Navy couple).
  - **Sarimbit Premium**: `Sarimbit Charcoal Hitam` (Charcoal black couple).
- Verified 0 overlap/duplication between Exclusive and Premium.

### 5. Multi-Channel Publication & Live Domain Verification
- Discovered 3 active publications: Online Store, Batik Smile Headless (Storefront API), and Batik Smile.
- Executed batch mutation `publishablePublish` across all 23 products (`All Published & ACTIVE: True`).
- Verified live DNS and Anycast edge response for **`https://batiksmile.com`** (`23.227.38.65`, HTTP/2 200, Oxygen edge cache).
- Codified Anti-Slop Visual Manifesto (Section 7) and Shopify Commerce Tone in `DESIGN.md`.

---

## Milestone 4: Standard Taxonomy Setup & Complete Company Profile Pages Deployment (2026-09-03)

### 1. Standard Product Taxonomy (Google Category) Configuration
- Identified that Google Product Taxonomy (`category`) was unconfigured (`null`) across all products.
- Queried official Shopify Taxonomy Categories for apparel, tops, sleepwear, dresses, outfits, textiles, and accessories.
- Executed batch GraphQL mutation updating all 23 live products to their exact official taxonomy categories (`All Categories Configured: True`):
  - *Tunics* (`aa-1-13-11`), *Blouses* (`aa-1-13-1`), *Cardigans* (`aa-1-13-3`), *Dresses* (`aa-1-4`), *Nightgowns* (`aa-1-17-3`), *Dress Shirts* (`aa-1-13-7-2`), *Shirts* (`aa-1-13-7`), *Pants* (`aa-1-12`), *Outfit Sets* (`aa-1-11`), *Baby & Children's Dresses* (`aa-1-25-3`), *Baby & Children's Outfits* (`aa-1-25-5`), *Fabric* (`ae-2-1-2-14-2`), *Hats* (`aa-2-17`).

### 2. Zero-Product Collection Fill (Zero Sarimbit Touched)
- Detected 7 empty collections (`Blazer Batik Wanita`, `Inner Busana Batik`, `Gamis Batik Anak`, `Kebaya Batik Anak`, `Jarik Anak`, `Babydoll Batik Anak`, `Sarung Batik Anak`).
- Populated all 7 collections using non-sarimbit RTW items (`Kebaya Encim Modern`, `Outer Terracotta Gold`, `Blus Royal Navy`, `Tunik Senyum Floral`, `Daster Solo Series`, `Setelan Surjan Anak`, `Dress Anak Bunga`, `Hem Anak Pesisir`, `Kain Tenun Troso`, `Celana Sirwal Etnik`).
- Verified: **0 empty collections remaining**, and **0 Sarimbit products added to these collections**.

### 3. Company Profile Page Extraction & Shopify Deployment
- Extracted and structured official data from `COMPANY PROFILE.pdf` (13 pages, est. 2007 Semarang).
- Formatted into Quiet Luxury semantic HTML with responsive grids and dignified microcopy.
- Deployed and published 11 complete Shopify pages on `23ahbp-sq.myshopify.com`:
  1. `/pages/tentang-kami`: Sejarah sejak 2007, Visi, Misi, dan Budaya Layanan **3S 1C 1T & 1H**.
  2. `/pages/layanan-seragam`: Pembuatan seragam korporat/instansi tanpa MOQ, mitra RS Bhayangkara & RSUD dr. Adhyatma Semarang.
  3. `/pages/fasilitas-store`: Showroom 3 Lantai Simongan (L1 Ready-to-Wear, L2 Galeri Kain & Sutra Lounge, L3 Kerajinan & Oleh-oleh).
  4. `/pages/lokasi-toko`: Outlet Simongan Pamularsih 109 & Banyumanik Sukun Raya 23, jam operasional, Google Maps link.
  5. `/pages/contact` & `/pages/hubungi-kami`: Layanan Customer Care & direct WhatsApp Concierge (`081-390-8888-09`).
  6. `/pages/panduan-ukuran`: Size Chart Butik Kemeja Pria (S–XXL), Tunik/Blus/Gamis Wanita (S–XXL), dan opsi Bespoke Sizing.
  7. `/pages/panduan-perawatan`: Panduan pencucian lerak, penjemuran teduh, setrika suhu sedang, dan penyimpanan alami akar wangi.
  8. `/pages/kebijakan-pengembalian`: Garansi Kepuasan & Tukar Size 100%.
  9. `/pages/kebijakan-pengiriman`: Kebijakan pengiriman aman dan Free Delivery.
  10. `/pages/syarat-dan-ketentuan`: Ketentuan layanan resmi.

---

## Milestone 3: Full-Width Refinement, Real Collection Sync, Featured Collections & Contrast Fix (2026-09-03)

### 1. Global Edge-to-Edge Full-Width Layout Shift
- Removed restrictive `max-w-7xl` containers across all major sections:
  - `Header.jsx`, `HeroEditorial.jsx`, `BestSellersTabs.jsx`, `HeritageVideoBanner.jsx`, `ChooseYourBatikGrid.jsx`, `ShoppableLookbook.jsx`, `CustomerLoveNotes.jsx`, `TrustGuaranteeBar.jsx`, `ShowroomO2O.jsx`, and `Footer.jsx`.
  - Applied consistent edge-to-edge luxury padding: `w-full px-4 sm:px-8 lg:px-12 xl:px-16`.

### 2. Aside & Drawer System Rebuild
- Replaced missing default Hydrogen `.overlay` CSS classes in `app/components/Aside.jsx`.
- Built high-performance slide-over cart and search drawers with 100% Tailwind utility classes (`fixed inset-0`, `backdrop-blur-sm`, `translate-x-0` transitions, `z-50`).

### 3. Header & Balanced 3-Column MegaMenu Architecture
- Simplified Header brand mark by removing adjacent text ("BATIK SMILE NUSANTARA"), enlarging logo mark to `h-10 sm:h-12`.
- Redesigned MegaMenu from cramped image block to a balanced 3-column architecture:
  - **Col 1 (5 cols)**: Official Collection Catalog with badge tags.
  - **Col 2 (4 cols)**: Curated Product Highlights with live prices in IDR.
  - **Col 3 (3 cols)**: Compact Editorial Card with WhatsApp Concierge CTA.
  - **Bottom Bar**: Guarantees (100% Asli, Bebas Tukar 7 Hari, Bespoke Tanpa MOQ) & Hotline.
- Eliminated horizontal viewport clipping by removing individual nav item `relative` anchors.
- Fixed duplicate hover underline by cleaning conflicting unlayered link decoration in CSS.

### 4. Real Shopify Collection Audit & Legacy Slug Purge
- Discovered that Shopify store `23ahbp-sq.myshopify.com` has 31 active collections:
  - Sarimbit: `sarimbit-exclusive` (Tier 1), `sarimbit-premium` (Tier 2), `sarimbit-ekonomis` (Tier 3).
  - Kain: `jarik-kain-batik` (Note: `kain-batik-tulis` does not exist in Shopify).
- Purged all hardcoded references to obsolete `/collections/sarimbit` across the entire codebase.
- Replaced mock handles (`sarimbit-mahakarya-heritage`, `sarimbit-signature-elegance`, `sarimbit-essential-daily`, `sarimbit-batik-couple`) with real Shopify handles.
- Implemented HTTP 301 Permanent Redirect lookup table in `app/routes/collections.$handle.jsx` to gracefully route legacy bookmarks.

### 5. Clean Product Slugs (?Title=Default+Title Purge)
- Server-side: Added HTTP 301 permanent redirect in `app/routes/products.$handle.jsx` (`loadCriticalData`) stripping `?Title=Default+Title`.
- Client-side: Replaced `useSelectedOptionInUrlParam` with custom option sync using `window.history.replaceState`.
- Helper: Updated `app/lib/variants.js` `getVariantUrl` to ignore single-variant default titles.

### 6. Curated Featured Collections Component
- Created `app/components/FeaturedCollections.jsx` displaying 6 core collection pillars:
  - *Sarimbit Exclusive (Tier 1), Sarimbit Premium (Tier 2), Sarimbit Ekonomis (Tier 3), Busana Batik Wanita, Kemeja Batik Pria, Kain Batik & Jarik Tradisional*.
- Updated `HOMEPAGE_QUERY` in `app/routes/_index.jsx` to fetch live CDN collection images (`collection.image.url`) directly from Shopify Storefront API.
- Positioned immediately below Hero Editorial for instant collection discovery.

### 7. Root-Cause Resolution of Button Contrast Defect
- Discovered root cause of dark text on black buttons:
  - Unlayered CSS rule `a { color: inherit; }` in `reset.css` took precedence over Tailwind CSS v4 `@layer utilities` classes (`.text-white`), causing buttons to inherit dark body text (`#1C1C1C`).
- Restructured `reset.css` into `@layer base` and added explicit element styling defaults.
- Reinforced high-contrast white text (`!text-white hover:!text-[#111111]`) across all CTA buttons:
  - MegaMenu Column 3 CTA, BestSellersTabs View All, ChooseYourBatikGrid View All, ShoppableLookbook CTAs, Header Mobile Drawer, Search Drawer, Cart Drawer & Summary, PDP AddToCartButton, and Variant Size Pills.

### 8. Verification & Build Integrity
- Verified all collection URLs return HTTP 200 OK via curl.
- Linter: 0 warnings, 0 errors (`npm run lint`).
- Production Build: Clean client & SSR bundle, typegen verified (`npm run build` — Exit Code 0).

---

## Milestone 4: Quiet Luxury SVG Icons Upgrade & Mobile Navigation Polish
**Date**: 2026-09-03 | **Commit Target**: `feat: upgrade quiet luxury svg icons across footer pages & declutter mobile navigation`

### 1. Master Footer Quiet Luxury SVG Icons
- Upgraded `app/components/Footer.jsx` with handcrafted 1.5px fine-line Quiet Luxury SVG icons for showrooms, opening clocks, collection categories, boutique services, WhatsApp concierge, Instagram, and trust badges (100% Asli shield, Bebas Tukar repeat, Bebas Ongkir truck).

### 2. Information Pages Upgrade
- **Fasilitas Store (`pages.fasilitas-store.jsx`)**: Replaced raw emojis (`🚗`, `❄️`, `🕌`, `💳`) with architectural SVG icons in golden border containers (Parking, AC airflow, clean prayer room, payment methods), verified authentic showroom photography, and fortified button text contrast.
- **Tentang Kami (`pages.tentang-kami.jsx`)**: Embedded tailored SVG icons for 3S 1C 1T & 1H culture cards and 3 core value cards (Keaslian Motif, Kenyamanan Sejati, Bebas Minimal Order).
- **Lokasi Toko (`pages.lokasi-toko.jsx`)**: Added bespoke location pin, clock, facility, and WhatsApp icons to Simongan and Banyumanik store cards with high-contrast buttons.
- **Layanan Seragam (`pages.layanan-seragam.jsx`)**: Added tailored SVG icons to 3 core advantages (No MOQ, Hero Lining, Digital Sizing), corporate client portfolios (RS Bhayangkara, RSUD Tugurejo), and 4-step workflow.
- **Policies Index (`policies._index.jsx`)**: Dynamic SVG icons for refund, shipping, privacy, and terms documents.

### 3. Mobile Navigation De-clutter
- Hid floating sticky WhatsApp widget on mobile/tablet (`hidden lg:block` in `WhatsAppConcierge.jsx`) to avoid collision with the bottom mobile app navigation bar.
- Polished `MobileNavigation.jsx` with Quiet Luxury design tokens, zero-radius cart badge, and unified WA CS link.

### 4. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0.
- All footer routes return HTTP 200 OK locally.

---

## Milestone 5: Full Responsive & Adaptive Device Screening, Clean Card Badges, & Mobile Web App Architecture
**Date**: 2026-09-03 | **Execution**: Comprehensive All-Page Screening

### 1. Header & Navigation Simplification
- Focused desktop header & mega menu on exactly 4 clean pillars: `Sarimbit`, `Batik Pria`, `Batik Wanita`, and `Batik Anak`.
- Eliminated all "kasta" and "tier" nomenclature across submenus and badges.
- Synced mobile drawer navigation with the 4 primary focus categories on top.

### 2. Product Card Badges Removal (Pure Quiet Luxury)
- Removed all floating overlay badges (`SALE`, `Terbaru`, `Kain Tradisional`) from `ProductItem.jsx`, `ChooseYourBatikGrid.jsx`, and `BestSellersTabs.jsx`.
- Achieved 100% clean, unobstructed 4:5 portrait media presentation.

### 3. Mobile Web App Ergonomics & Device Adaptation
- **Mobile Navigation Bar (`MobileNavigation.jsx`)**: Removed Cart button (already present in header); retained Beranda, Kategori, Cari, and WA CS in an evenly spaced, clean 4-item bottom bar.
- **Safe Area Insets**: Added `viewport-fit=cover` in `root.jsx` and CSS `env(safe-area-inset-bottom)` / `env(safe-area-inset-top)` across `MobileNavigation.jsx`, `Footer.jsx`, `StickyMobileBar.jsx`, and `Aside.jsx`.
- **Eliminated `max-w-[100vw]` bug**: Replaced across all pages and components with `max-w-7xl` to prevent horizontal scrollbars and layout shifts on narrow mobile screens (360px - 430px).
- **Sticky Mobile Action Bar (`StickyMobileBar.jsx`)**: Updated to zero-radius architecture (`rounded-none`), Quiet Luxury tokens (`#111111`/`#C5A059`), and elevated above bottom bar with safe area padding.
- **All-Page Mobile Clearance**: Upgraded outer bottom padding (`pb-24 lg:pb-16` and safe-area calculation) across `collections.$handle.jsx`, `collections.all.jsx`, `collections._index.jsx`, `products.$handle.jsx`, `search.jsx`, `cart.jsx`, and all `/pages/*` and `/policies/*` routes.

### 4. Verification Evidence Across All Routes
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0.
- Probed 14 canonical storefront routes on local dev server (`http://localhost:3005/`): 100% returned HTTP 200 OK.

---

## Milestone 6: Centered Card Typography, Collection-Aware Related Products, & Mobile Header De-clutter
**Date**: 2026-09-03 | **Execution**: Polish & Product Synergy

### 1. Centered Card Typography (`ProductItem.jsx`)
- Aligned product title, product type, and price to center (`text-center items-center justify-center`) for balanced Quiet Luxury card symmetry.

### 2. Collection-Aware Related Products on PDP (`products.$handle.jsx`)
- Expanded Storefront API `PRODUCT_FRAGMENT` with `collections(first: 5)` and nested products.
- Dynamically resolved matching collection (prioritizing specific collections e.g. `sarimbit-exclusive`, `batik-pria`, `jarik-anak` over generic `shop`).
- Filtered out current product and displayed up to 4 related products from the exact same collection.
- Added direct collection link: `LIHAT SEMUA KOLEKSI {TITLE} →`.

### 3. Mobile Header Simplification (`Header.jsx`)
- Hidden search trigger on mobile header (`hidden lg:block`) since Search is already available in the sticky bottom app navigation bar.
- Surfaced Account icon on mobile header alongside Cart.
- Mobile header now cleanly displays: Brand Logo (left) + Account & Cart (right).

### 4. Verification
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0.
- Verified on local server:
  - `kain-tenun-troso` -> displays `Rekomendasi Jarik Anak` with matching products.
  - `sarimbit-mustard-gold` -> displays `Rekomendasi Sarimbit Exclusive`.
  - Mobile header search hidden, account icon visible.

---

## Milestone 7: Desktop Overlap Eradication (`ShoppableLookbook.jsx`), Container Max-Width Normalization, & Production Edge Deployment
**Date**: 2026-09-03 | **Execution**: Comprehensive Responsiveness Polish & Release

### 1. Shoppable Lookbook Desktop Overlap Eradication (`ShoppableLookbook.jsx`)
- Diagnosed collision cause on 1024px-1366px laptop screens: fixed 16:9 aspect ratio conflicted with taller detail card under `items-stretch`, and specification row labels collided horizontally with values in narrow 4-column space.
- Re-architected grid: `lg:col-span-7 xl:col-span-8` for photography with adaptive `lg:min-h-[480px] lg:aspect-auto`, and `lg:col-span-5 xl:col-span-4` for detail card.
- Re-structured specification rows: `flex-col sm:flex-row sm:items-baseline sm:justify-between` with `shrink-0` labels and right-aligned values to guarantee zero text overlap.
- Optimized CTAs: adjusted micro-tracking and padding (`text-[10px] sm:text-[11px] tracking-[0.16em] px-4`) so button text never wraps or clips awkwardly.

### 2. Global Section Container Max-Width Normalization
- Enforced `max-w-7xl mx-auto` across:
  - `BestSellersTabs.jsx`
  - `ChooseYourBatikGrid.jsx`
  - `FeaturedCollections.jsx`
  - `HeritageVideoBanner.jsx`
  - `TrustGuaranteeBar.jsx`
  - `ShoppableLookbook.jsx`
- Eliminated all remaining "3 kasta" and "tier 1/2/3" copy across `FeaturedCollections.jsx`.

### 3. Quiet Luxury Architecture for FamilyBundleBuilder (`FamilyBundleBuilder.jsx`)
- Replaced non-conforming `rounded-2xl` and `rounded-xl` with Quiet Luxury Zero-Radius `rounded-none`.
- Aligned palette to obsidian (`#111111`) and antique gold (`#C5A059`), and eliminated raw emoji.

### 4. Verification Evidence & Deployment
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0.
- All 14 tested canonical storefront routes return HTTP 200 OK.
- Pushed to GitHub repository `ongkipro/batik-smile-hydrogen` (`origin/main`) triggering automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions.

---

## Milestone 8: 5-Slide Editorial Hero Slider, Header Glass Effect & Microcopy Polish
**Date**: 2026-09-03 | **Execution**: Hero Visual Upgrade & Concierge Polish

### 1. 5-Slide Editorial Hero Slider (`HeroSlider.jsx`)
- Generated 5 high-fashion 16:9 photography assets saved at `public/banners/hero_slider_1.jpg` through `hero_slider_5.jpg` representing Royal Sarimbit, Haute Couture Women, Executive Men, Family Sarimbit, and Heritage Artisan Canting.
- Configured 4-second continuous smooth auto-rotation.
- Removed arrow buttons for clean cinematic immersion; retained zero-radius indicator bars and numerical counter `01 / 05`.
- Supported touch swipe gestures for mobile ergonomics.

### 2. Sticky Header Glassmorphism & Solid White Hover Synergy (`Header.jsx` & `MegaMenu.jsx`)
- Added scroll listener: when `scrollY > 20`, header activates dynamic frosted glass effect (`bg-white/80 backdrop-blur-xl border-b border-[#E2DFD8]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]`).
- Added hover & menu-open detection: transitions smoothly to pure solid white (`bg-white shadow-md border-b border-[#E2DFD8]`), aligning seamlessly with the Mega Menu dropdown panel.

### 3. De-cluttering & Microcopy Refinements
- Removed Family Bundle Builder from product details page (`products.$handle.jsx`).
- Cleaned Footer WhatsApp button to display only the official number (`081-390-8888-09`) without "WHATSAPP:" text prefix (`Footer.jsx`).
- Updated floating concierge button text to "KONSULTASI VIA WHATSAPP" (`WhatsAppConcierge.jsx`).

### 4. Verification & Production Deployment
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0.
- Pushed to `origin/main` for automated Shopify Oxygen Global Edge Network deployment.

---

## Milestone 9: Tailored Tier Architecture for Sarimbit Exclusive & Premium
**Date**: 2026-09-03 | **Execution**: High-Luxury Tier Separation & Card Specialization

### 1. Full-Bleed Cinematic Hero Banners with Background Image (`collections.$handle.jsx`)
- Re-architected collection header for `sarimbit-exclusive` and `sarimbit-premium` into full-bleed cinematic hero sections with background images and dramatic gradient scrims.
- Exclusive: Obsidian Dark Luxe (`#111111`) with `hero_slider_1.jpg`, dark gold gradient, and `RESERVASI VIP CONCIERGE →` CTA.
- Premium: Golden Hour Ambient Scrim with `sarimbit_family_banner.jpg` over a warm Champagne Gold Silk canvas (`#F3EDE2`), and `KONSULTASI BUSANA RESEPSI →` CTA.

### 2. Differentiated Product Card Architecture (`ProductItem.jsx`)
- Introduced `variant="exclusive" | "premium" | "default"` prop into `ProductItem`.
- Exclusive Card: Obsidian dark card (`bg-[#181818] border border-[#C5A059]/35 hover:border-[#C5A059]`), Cormorant Garamond title, gold serif price, and `SUTRA ATBM • PRADA EMAS` badge.
- Premium Card: White studio card floating over champagne gold canvas with ambient gold glow (`shadow-[0_4px_20px_rgba(197,160,89,0.10)]`), border `border-[#C5A059]/40`, and `TENUN DOBBY • FURING HERO` badge.
- Default Card: Retained clean minimalist catalog presentation for `sarimbit-ekonomis` and general collections.

### 3. Verification Evidence & Deployment
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Local verification on `http://localhost:3005` returning correct markup for each tier.
- Pushed to `origin/main` for automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions.

---

## Milestone 10: Luxury 3-Column MegaMenu Redesign & Header Center Precision
**Date**: 2026-09-03 | **Execution**: Symmetrical 4-4-4 Grid Architecture, Middle Center Alignment, and Icon-Only Header Actions

### 1. Symmetrical 3-Column Mega Menu Architecture (`MegaMenu.jsx`)
- Re-architected mega menu dropdown into a symmetrical 4-4-4 12-column grid (`lg:col-span-4` each):
  - **Col 1 (Left)**: Subcategory navigation list with minimal 1.5px stroke gold outline icons (`crown`, `sparkle`, `leaf`, `scissors`, `shirt`, `dress`, `gem`, `family`) and contextual badges.
  - Specifically streamlined Sarimbit category list to exactly 3 concise collection names: `Sarimbit Exclusive`, `Sarimbit Premium`, and `Sarimbit Ekonomis`.
  - Upgraded bottom gateway button: removed count number `(12)`, elevated copy to `JELAJAHI SELURUH KOLEKSI`, and added zero-radius micro-interaction with rotating gold geometric diamond motif.
  - **Col 2 (Center)**: Recent arrivals list strictly capped at 3 products (`slice(0, 3)`), preventing vertical overflow or scrollbars while presenting crisp 4:5 image thumbnails, titles, prices, and direct links.
  - **Col 3 (Right)**: Modular Featured Spotlight banner with 16:10 editorial imagery, dark gradient scrim, boutique storytelling copy, and full-width CTA button.
- Bottom trust strip preserved with 3 official boutique guarantees and WhatsApp concierge hotline.

### 2. Desktop Header Middle Center Precision & Icon-Only Actions (`Header.jsx`)
- Rebalanced header layout to true mathematical middle center using symmetrical `flex-1 justify-start` (logo) and `flex-1 justify-end` (actions) with `flex-shrink-0 justify-center` (menu) in the center.
- Converted right-side action cluster into pure icon-only precision: removed `MASUK` text, unified Search and Account buttons with matching `p-2.5` padding and `w-5 h-5` hairline icons.

### 3. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Pushed to `origin/main` for automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions.

---

## Milestone 11: Dynamic Plain-Text Blog Editorial Engine Deployment (2026-09-03)

### 1. Plain-Text Semantic Blog Architecture
- Adhered to strict dynamic styling rule: Zero inline styles (`style="..."`) and zero hardcoded CSS classes (`class="..."`) inside blog article bodies.
- Utilized pure semantic `<p>` paragraphs to allow Hydrogen's Tailwind typography engine (`prose prose-neutral`) to style blog posts dynamically and natively.

### 2. 12 Thematic Editorial Articles Published
- Created 12 comprehensive articles in `gid://shopify/Blog/108131713081`:
  1. *Kisah Canting & Filosofi Batik Tulis Jawa*
  2. *5 Tips Memadukan Sarimbit Pasangan untuk Kondangan*
  3. *Mengenal Perbedaan Katun Primisima, Dobby, dan Sutra*
  4. *Makna Mendalam di Balik Motif Parang Kusumo dan Kawung*
  5. *Pentingnya Lapisan Furing Katun Hero pada Kemeja Batik*
  6. *Panduan Memilih Seragam Batik Kantor & Instansi*
  7. *Eksplorasi Batik Pesisiran: Dinamika Warna Cirebon & Pekalongan*
  8. *Cara Merawat Kain Batik Tulis Berharga Tinggi*
  9. *Kiat Tampil Percaya Diri dengan Tunik dan Outer Batik Modern*
  10. *Sejarah Batik Lasem: Akulturasi Budaya Tionghoa & Jawa*
  11. *Etika Mengenakan Busana Batik pada Acara Resmi Kenegaraan*
  12. *Mengenalkan Nilai Budaya Batik kepada Anak Sejak Dini*
- Each article features an official Shopify CDN featured image, author `Batik Smile Editorial`, summary, and `isPublished: true`.

---

## Milestone 12: Scattered Atelier Archival Cards, 5:4 Aspect Ratio & Quiet Luxury Load More (`collections._index.jsx`)
**Date**: 2026-09-03 | **Execution**: Atelier Moodboard Card Geometry (5:4 Landscape Ratio), Organic Tilt/Stagger, Mobile Optimization, and Zero-Radius Load More Pagination (pageBy: 9)

### 1. Artistic "Kartu Berantakan" Atelier Moodboard Architecture (`collections._index.jsx`)
- Re-architected `/collections` All Collections catalog from a rigid grid into an organic **Atelier Curated Archival Moodboard**:
  - Configured strict landscape 5:4 aspect ratio (`aspect-[5/4]`) for each archival card, delivering a panoramic, photographic editorial plate feel.
  - Implemented `SCATTER_STYLES` cycle: 12 distinct card personalities with subtle organic tilt angles (`-rotate-1` to `rotate-2`), vertical desktop offsets (`lg:translate-y-5`, `lg:-translate-y-4`), and translucent washi tape accents (`bg-[#F3EDE2]/85 border-[#C5A059]/40`).
  - **Tactile Interactive Physicality**: Unhovered cards sit casually like lookbook plates on an artisan cutting table; on hover, each card smoothly straightens up (`group-hover:rotate-0 group-hover:scale-[1.02]`), elevates with an ambient gold glow (`group-hover:shadow-[0_20px_45px_rgba(197,160,89,0.20)]`), and highlights with an antique gold border (`group-hover:border-[#C5A059]`).
  - **Archival Metadata Plates**: Each card features a serial badge (`ARC-01` to `ARC-12`), atelier stamp (`SERI I`, `HAUTE`, `WARISAN`, `ATELIER`, etc.), and curated fabric note.
  - Quick Category Anchors provided at top for rapid navigation (`SARIMBIT EXCLUSIVE`, `SARIMBIT PREMIUM`, `BATIK PRIA`, `BATIK WANITA`, `BATIK ANAK`), horizontally scrollable on mobile.
  - Optimized for mobile view: 1 column of 5:4 cards on mobile with safe micro-tilt (no overflow-x), transitioning to 2 columns on tablet and 3 columns on desktop.

### 2. Quiet Luxury Load More & Pagination Engine (`PaginatedResourceSection.jsx`)
- Overhauled unstyled hydrogen pagination links into an architectural zero-radius curated expansion bar:
  - Adjusted pagination batching to `pageBy: 9` for faster initial payload and consistent 3x3 grid increments.
  - Added gold diamond motif and curatorial label `KURASI ARSIP BUTIK`.
  - Upgraded NextLink to an obsidian & gold action button `JELAJAHI LEBIH BANYAK KOLEKSI ↓` with loading spinner animation (`MEMUAT ARSIP KOLEKSI...`).
  - Provided matching `LIHAT KOLEKSI SEBELUMNYA ↑` button when previous cursor exists.

### 3. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Pushed to `origin/main` for automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions.

---

## Milestone 13: Dual-Section Homepage Collection Hierarchy (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Signature 3-Tier Sarimbit Bento Grid (`SarimbitBentoSection.jsx`) & Symmetrical Personal Wardrobe Triptych (`PersonalWardrobeSection.jsx`)

### 1. Signature Sarimbit Asymmetric Bento Grid (`SarimbitBentoSection.jsx`)
- Positioned directly beneath `HeroSlider` to solidify Batik Smile's primary brand positioning as the #1 family sarimbit specialist.
- 12-Column Asymmetric Bento Grid Architecture:
  - **Dominant 7-Column Portrait Container (Left)**: *Sarimbit Exclusive* (`sarimbit-exclusive`) featuring deep obsidian container, subtle antique gold border (`border-[#C5A059]/40`), high-contrast dark gradient, and badge `◆ KASTA TERTINGGI • SUTRA ATBM & PRADA EMAS`.
  - **Stacked 5-Column Containers (Right)**: *Sarimbit Premium* (`sarimbit-premium`, `◆ RESEPSI & JAMUAN • TENUN DOBBY`) on top, and *Sarimbit Ekonomis* (`sarimbit-ekonomis`, `◆ HARIAN & KELUARGA • KATUN PRIMISIMA`) on the bottom.
  - Interactive tactile physics: Slow hover zoom (`scale-105 duration-700`), ambient gold shadow illumination, and zero-radius edge-to-edge action bars.

### 2. Symmetrical 3-Column Personal Wardrobe Triptych (`PersonalWardrobeSection.jsx`)
- Placed beneath `HeritageVideoBanner` to form a cohesive storytelling transition: after customers witness raw fabric canting and hero lining tailoring in the video, they are introduced to individual wardrobe pillars.
- 3 Dedicated Curated Pillars:
  1. *Kemeja Batik Pria* (`batik-pria`): Jahitan sambung motif & furing katun hero sejuk.
  2. *Busana Batik Wanita* (`batik-wanita`): Blus modern, tunik sutra, outer elegan, dan kebaya kontemporer.
  3. *Batik Anak & Tradisional* (`batik-anak`): Setelan surjan adat Jawa & hem katun ramah anak.
- Strictly preserved 4:5 vertical proportions, zero-radius architecture, and linen bottom action bars.

### 3. Route & Query Optimization (`app/routes/_index.jsx`)
- Expanded `HOMEPAGE_QUERY` collection limit to `collections(first: 20)` to ensure all 6 core pillars always retrieve their live Shopify CDN imagery.
- Re-ordered homepage layout: HeroSlider -> Sarimbit Bento -> Best Sellers Tabs -> Heritage Video -> Personal Wardrobe -> Choose Your Batik -> Lookbook -> Testimonials -> Trust -> Showroom.
- Updated `PAGES-SCHEMA.xml` and maintained backward compatibility in `FeaturedCollections.jsx`.

### 4. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).

---

## Milestone 14: Full-Cycle Editorial Blog System Deployment (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Homepage Journal Section, Curated Editorial Archive, and Dynamic Article View with Related Curations

### 1. Homepage Editorial Journal Section (`EditorialJournalSection.jsx` & `_index.jsx`)
- Integrated GraphQL query into `HOMEPAGE_QUERY` fetching 3 latest published articles dynamically from `blogs(first: 1)`.
- Crafted `EditorialJournalSection.jsx` using Quiet Luxury Zero-Radius standards:
  - 16:10 photography containers with subtle dark vignette overlays.
  - Indonesian date formatting (`Intl.DateTimeFormat('id-ID')`), author stamp (`Batik Smile Editorial`), and Cormorant Garamond headlines.
  - Multi-line clamp excerpts and interactive action links to `/blogs/${blogHandle}/${articleHandle}` and `/blogs`.
  - Positioned between `CustomerLoveNotes` and `TrustGuaranteeBar` for natural cultural storytelling rhythm.

### 2. Editorial Archive Catalog (`blogs._index.jsx` & `blogs.$blogHandle._index.jsx`)
- Transformed `/blogs` from an empty 1-category card into a rich **Editorial Journal Archive**:
  - Highlights the latest story as a grand **Featured Hero Card** (12-column split with high-definition photography).
  - Renders all subsequent articles in a balanced 3-column quiet luxury grid with `PaginatedResourceSection` pagination.
  - Aligned `blogs.$blogHandle._index.jsx` with matching Quiet Luxury tokens and full excerpt previews.

### 3. Dynamic Article Reading Journey (`blogs.$blogHandle.$articleHandle.jsx`)
- Upgraded single article template with:
  - Calculated reading time estimate (`⏱️ X MENIT BACA`).
  - Breadcrumb trail (`BERANDA / JURNAL / [JUDUL]`).
  - Polished typography using Tailwind typography engine (`prose prose-neutral`).
  - Fixed redirect handle mapping by including `handle` on `blog` and `articleByHandle`.
  - **Dynamic Related Articles Section**: Fetches and renders 3 related stories from the same blog to eliminate bounce rate.
  - Integrated WhatsApp Concierge consultation CTA banner.

### 4. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- All 4 blog endpoints verified returning HTTP 200 OK:
  - `http://localhost:3005/` (Homepage): 200 OK
  - `http://localhost:3005/blogs` (List Archive): 200 OK
  - `http://localhost:3005/blogs/news` (Category List): 200 OK
  - `http://localhost:3005/blogs/news/kisah-canting-filosofi-batik-tulis-jawa` (Dynamic Article): 200 OK

---

## Milestone 15: Homepage Streamlining & Section Pruning (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Elimination of Shoppable Lookbook and Dual Pathway Box for Optimized Conversion Rhythm

### 1. Removal of Shoppable Lookbook Hotspot Section
- Pruned `ShoppableLookbook` from `app/routes/_index.jsx` to prevent vertical fatigue and ensure the new **Editorial Journal** receives maximum visitor engagement.
- Removed `lookbookSpotlights` query from `HOMEPAGE_QUERY`, reducing client JavaScript bundle from 50.29 kB to 43.65 kB (13% payload reduction).

### 2. Pruning of Dual Commercial Pathway Box (`ChooseYourBatikGrid.jsx`)
- Removed the redundant 2-column box ("01. BELI PRODUK & KAIN LEMBARAN / 02. TAMBAH JASA BESPOKE TAILORING").
- Section now transitions smoothly from the editorial headline directly into the 8-product showcase grid with clean white canvas and zero visual clutter.

### 3. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Storefront response verified HTTP 200 OK.

---

## Milestone 16: Modern Search UI/UX & Mobile Navigation Overhaul (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Luxury Search Command-Palette & Native-Feel Mobile Menu Upgrade

### 1. Modern Luxury Search Modal (`LuxurySearchModal.jsx` & `PageLayout.jsx`)
- Replaced the narrow 420px right-side drawer with a luxury command-palette overlay on desktop and a full-screen search view on mobile.
- Features:
  - Grand search input with gold search icon, clear button, and ESC keyboard shortcut support.
  - Trending search chips (`Sarimbit Mahakarya`, `Kemeja Furing Hero`, `Batik Wanita Sutra`, `Kain Batik Tulis`, etc.) with instant one-tap search.
  - Responsive multi-faceted predictive results: 4-column product grid with 4:5 photography and formatted IDR prices, collection pills, and editorial cultural journal articles.
  - Replaced `SearchAside` in `PageLayout.jsx`.

### 2. Architectural Mobile Navigation Drawer (`Header.jsx` & `Aside.jsx`)
- Replaced the plain text list in `HeaderMenu` with a comprehensive Quiet Luxury navigation menu:
  - Interactive accordion for **Trilogi Sarimbit Keluarga** (Mahakarya Eksklusif, Signature Premium, Essential Ekonomis).
  - Categorized individual wardrobe links with subtitle descriptions.
  - Prominent **Warta & Jurnal Budaya** card linking directly to `/blogs`.
  - Physical showroom footprint card (Simongan 109 & Banyumanik 23, Buka Setiap Hari 08:00–21:00 WIB).
  - Official WhatsApp Concierge consultation CTA button.
  - Updated `Aside.jsx` so the burger menu slides in naturally from the left, while the cart slides in from the right.

### 3. Mobile Sticky Navigation & Header Optimization (`MobileNavigation.jsx` & `Header.jsx`)
- Added **Jurnal** (`/blogs`) to the mobile sticky bottom bar (`Beranda`, `Kategori`, `Cari`, `Jurnal`, `WA CS`).
- Made search icon visible on both mobile and desktop headers for immediate discoverability.

### 4. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- All endpoints tested and verified returning HTTP 200 OK.

---

## Milestone 17: Mobile Menu Decluttering & Curated Search Products (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Elimination of Informal Emojis, Drawer Search Pruning, and Un-Boxed Modern Search Grid

### 1. Mobile Drawer Menu Decluttering (`Header.jsx`)
- Pruned redundant in-menu search input from `HeaderMenu` to maximize clean vertical rhythm.
- Purged all informal emojis/emoticons (`👑`, `✨`, `🌿`, `📍`, `⏰`).
- Introduced bespoke 1.5-stroke vector SVG icons for categories (Pria, Wanita, Anak, Kain Tulis, Jurnal, Showroom, Clock).
- Implemented high-contrast quiet luxury typography with minimal status pill stamps (`EKSKLUSIF`, `PREMIUM`, `EKONOMIS`).

### 2. Modern Un-Boxed Search & Recommended Product Grid (`LuxurySearchModal.jsx`)
- Eliminated clunky boxed framing around trending search keywords in favor of clean, bullet-separated inline text links (`•`).
- Introduced preloaded curated product cards: when opening search in the empty state, the modal automatically displays **REKOMENDASI KOLEKSI BUTIK** with 4 real product cards (2 cols on mobile, 4 cols on desktop) complete with 4:5 imagery, titles, and IDR prices.
- Removed search icon emoji (`🔍`).
- Guarded initial fetcher call with `hasLoadedInitial` ref to ensure single-cycle preloading and zero lint warnings.

### 3. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).

---

## Milestone 18: Scattered Atelier Collection Cards & Testimonial Section Removal (2026-09-03)
**Date**: 2026-09-03 | **Execution**: 3-Pillar Scattered Moodboard Cards for Sarimbit & Personal Wardrobe + Testimonial Pruning

### 1. Scattered Atelier Cards for Trilogi Sarimbit (`SarimbitBentoSection.jsx`)
- Replaced the rigid Bento grid with a 3-pillar scattered atelier moodboard design matching `collections._index.jsx`.
- Features organic card rotation angles (`-rotate-2`, `rotate-1.5`, `-rotate-1`), washi tape overlay accents (`bg-[#F3EDE2]/85`), archival plates (`SRM-01`, `SRM-02`, `SRM-03`), category stamps (`EKSKLUSIF`, `PREMIUM`, `EKONOMIS`), and smooth hover un-tilting with gold glow shadows.

### 2. Scattered Atelier Cards for Busana Personal (`PersonalWardrobeSection.jsx`)
- Upgraded the 3 personal wardrobe pillars (Batik Pria, Batik Wanita, Batik Anak & Tradisional) to organic scattered cards with alternating tilts, washi tape pins, archival plates (`WDR-01`, `WDR-02`, `WDR-03`), and high-contrast editorial scrims.

### 3. Removal of Customer Testimonials Section (`_index.jsx` & `PAGES-SCHEMA.xml`)
- Completely pruned `CustomerLoveNotes` component render, import, and `customerTestimonials` GraphQL query from homepage.
- Reduced client JavaScript bundle from 43.65 kB to **37.34 kB** (14.5% payload reduction).

### 4. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- All endpoints tested and verified returning HTTP 200 OK.

---

## Milestone 19: English Buzzwords Pruning & Asymmetric Magazine Gazette Journal UI (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Elimination of Redundant Fluff Eyebrows & Asymmetric Editorial Journal Layout

### 1. Pruning English Fluff & Cluttered Badges
- Pruned `SIGNATURE FAMILY HAUTE COUTURE` and `BUSANA PERSONAL & LINTAS GENERASI` small boxes that elongated page lines.
- Cleaned up buzzwords ("Heritage", "Elegance", "Essential Daily") into natural, authentic luxury names: *Sarimbit Eksklusif*, *Sarimbit Premium*, *Sarimbit Ekonomis*.

### 2. Asymmetric Magazine Gazette Journal Layout (`EditorialJournalSection.jsx`)
- Solved card grid fatigue by converting the 3-column boxed blog section into an Asymmetric Magazine Gazette:
  - **7-Column Dominant Lead Article**: Large 16:10 editorial photo with dark vignette, `ULASAN UTAMA` badge, date/author metadata, large serif headline, 3-line excerpt, and `BACA ULASAN LENGKAP →` action.
  - **5-Column Compact Horizontal Stories**: 2 companion articles arranged in compact horizontal rows with square thumbnails, `CATATAN 02` / `CATATAN 03` archival badges, clean typography, and a dashed quick-access card to the full archive.

### 3. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Storefront HTTP 200 OK verified on `http://localhost:3005/`.

---

## Milestone 20: Frameless Minimalist Editorial Journal & Global Divider Line Purge (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Elimination of Harsh Section Dividing Lines & Dedicated Frameless Journal Typography

### 1. Global Divider Line Purge Across Homepage
- Removed harsh horizontal section borders (`border-b border-[#E2DFD8]`, `border-[#1C1C1C]`) and decorative gold center bars (`<div className="w-12 h-px bg-[#C5A059] ..." />`) from `HeroSlider`, `SarimbitBentoSection`, `PersonalWardrobeSection`, `BestSellersTabs`, `ChooseYourBatikGrid`, `HeritageVideoBanner`, and `ShowroomO2O`.
- Restored `TrustGuaranteeBar` to exact original styling without alteration per user instruction.
- The entire homepage now flows seamlessly as one continuous Quiet Luxury canvas on Mori Linen (`#FAF8F5`).

### 2. Dedicated Frameless Minimalist Editorial Journal (`EditorialJournalSection.jsx`)
- Differentiated the journal from the collections' scattered cards: zero card containers (`bg-white` & `border-[#E2DFD8]` removed), zero box frames, and zero washi tape/tilt effects.
- Clean editorial 3-column stories featuring frameless 16:11 photography, archival numbering (`01 / ARSIP BUDAYA`), pure Cormorant Garamond serif headlines, and subtle underlined text action links.

### 3. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Client bundle size reduced to **34.89 kB** (gzip: 8.90 kB).
- Dev server HTTP 200 OK verified.

---

## Milestone 21: Dynamic Precision Spacing & Blog List UI Redesign (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Elimination of Dead Space Gaps & Redesign of Blog List Pages (3:2 Ratio)

### 1. Section Padding & Vertical Rhythm Calibration
- Conducted full-page spacing screening across all homepage sections:
  - Compressed consecutive section paddings from bloated `py-20 sm:py-28` to dynamic `py-12 sm:py-16`.
  - Tightened header bottom margins from `mb-14 sm:mb-20` to `mb-8 sm:mb-10`, ensuring section titles remain anchored to their content.
  - Calibrated full-bleed contrast sections (`HeritageVideoBanner` and `ShowroomO2O`) from `py-24 sm:py-32` to `py-16 sm:py-20`.
  - Result: Eliminated ~140px+ of cumulative dead space between section boundaries.

### 2. Frameless Minimalist Blog List Redesign (`blogs._index.jsx` & `blogs.$blogHandle._index.jsx`)
- Strictly locked all article media containers to **3:2** (`aspect-[3/2]`), matching classical 35mm editorial proportions.
- Completely removed clunky card containers (`bg-white`, border lines, and box shadows).
- Introduced clean curatorial archive bar, micro-index stamps, Cormorant Garamond serif headlines, and subtle underlined read actions.
- Client bundle for blog index reduced from 7.99 kB to **6.96 kB** (gzip: 2.17 kB).

### 3. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- HTTP 200 verified on `/blogs` and `/blogs/news`.

---

## Milestone 22: Header Jurnal Menu, Smart Desktop WhatsApp, & Single Article UI/UX (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Header Jurnal Integration, Smart Sticky WhatsApp, & High-Heritage Article Page Redesign

### 1. Header Desktop Navigation Integration (`MegaMenu.jsx`)
- Added direct permanent `JURNAL` link to the desktop master navigation bar in `MegaMenu.jsx`.
- Styled with active ochre gold border indicators, zero duplicate underlines, and uppercase micro-tracking.

### 2. Smart Desktop Sticky WhatsApp Concierge (`WhatsAppConcierge.jsx`)
- Implemented smart viewport visibility for the floating WhatsApp concierge in desktop view:
  - Hides automatically when inside the top Hero region (`scrollY < 420px`) to eliminate visual clutter on the main brand banner.
  - Hides automatically when reaching the Footer (detected via `IntersectionObserver`) to prevent overlapping footer contact links and addresses.
  - Uses fluid CSS opacity and vertical translate transitions.

### 3. Master Frameless Luxury Editorial Article UI/UX (`blogs.$blogHandle.$articleHandle.jsx`)
- Locked hero article image and related article cards strictly to **3:2** (`aspect-[3/2]`), validated against 35mm full-frame photography principles.
- Completely purged the boxed container anti-pattern (`bg-white` card and border lines removed), allowing the article to flow organically on the warm Mori Linen canvas.
- Implemented a comfortable 680px (`max-w-2xl`) intimate reading column (45-75 characters per line) to eliminate reader eye fatigue.
- Elevated reading typography & features:
  - Hairline Antique Gold scroll progress indicator fixed at window top.
  - Centered majestic Cormorant Garamond display headlines (`leading-[1.14]`).
  - Drop cap initial letter on opening paragraph in ochre gold.
  - Elegant serif blockquotes with antique gold accent borders.
  - Curator signature stamp and provenance footnote.
  - Minimalist WhatsApp share link with pre-filled greeting.
  - Curated "Shop The Story" collection showcasing 3 related pieces in 4:5 vertical portrait with live IDR pricing.
  - Frameless related articles grid with 3:2 locked aspect ratio.
  - Obsidian dark concierge banner with WhatsApp CTA to `081-390-8888-09`.

### 4. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- HTTP 200 OK verified on `/blogs/news/:articleHandle`.

---

## Milestone 23: PDP Precision UI/UX & Cohesive Straight-Line Architecture (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Elimination of PDP Boxed Container, 4:5 Vertical Gallery, and Interactive Sizing System

### 1. Frameless Quiet Luxury Purchasing Panel (`products.$handle.jsx`)
- Purged the boxed card anti-pattern (`bg-white border border-[#E2DFD8] shadow-sm`) from the right purchase column.
- Product information now flows seamlessly and directly on the Mori Linen canvas (`#FAF8F5`), perfectly pulling a straight visual line with the rest of the store.
- Elevated Cormorant Garamond display typography (`text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.14]`).
- Clear price presentation with IDR currency formatting, compare-at strike-through, and boutique stock availability badge.

### 2. Strict 4:5 Vertical Gallery System
- Locked all product media containers strictly to **4:5 portrait ratio** (`aspect-[4/5]`) across main viewer, thumbnails, and related products grid.
- Added smooth thumbnail switching with antique gold active ring and image counter badge (`1 / 5`).
- Dynamically resolved breadcrumbs based on the product's actual parent collection.

### 3. Sizing Architecture & Interactive Size Guide Modal
- Built an interactive Size Guide drawer displaying the official boutique regular-fit sizing table (S, M, L, XL, XXL) with measurements (Lingkar Dada, Panjang Baju, Panjang Lengan).
- Made size guide and WhatsApp fitting consultation available for all products including single-variant items.
- Eliminated the cluttered bespoke tailoring and model fitting boxes to create a clean, pristine purchasing interface.

### 4. Direct "BELI SEKARANG" Action & Dynamic Shopify Description Grid
- Upgraded purchasing actions:
  - Primary CTA: `BELI SEKARANG` with instant 303 redirect to Shopify hosted checkout via `redirectTo="checkout"`.
  - Secondary CTA: `+ TAMBAH KE TAS BELANJA` adding items to cart seamlessly.
- Re-architected monolithic Shopify `descriptionHtml` into a cohesive, high-fashion presentation:
  - Cormorant Garamond serif italic narrative quote.
  - Dynamic 2-column specifications cards for all `<li>` elements (`◆ Bahan`, `◆ Furing`, `◆ Konstruksi`, `◆ Perawatan`).
  - Unified delivery & 7-day size guarantee accordion.

### 5. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- HTTP 200 OK verified on `/products/sarimbit-royal-navy` and `/products/kebaya-encim-modern`.

---

## Milestone 24: PDP Master Frameless Architecture, Quantity Geometry & Tier-Differentiated Experience (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Elimination of Frame Clutter, Auto-Show Dropdowns, Mathematical Width Alignment, Tier-Differentiated Showcase, and Full Cross-Device Audit

### 1. Total Purge of Box/Card Clutter on PDP (`products.$handle.jsx`)
- Stripped heavy boxed badge on stock availability (`TERSEDIA DI BUTIK` -> elegant borderless `● Tersedia di Butik` positioned directly beneath price).
- Replaced 3 boxed rectangular pills with a single continuous typographic value-prop line with antique gold middle dots.
- Converted boxed description specification cards into a frameless atelier definition list with delicate hairline dividers (`divide-y divide-[#E2DFD8]/80`).

### 2. Auto-Show Dual Dropdowns & Concise Service Guarantees
- Converted description and atelier specifications into an accordion with `auto show` (open by default) state, enabling instant reading while preserving collapse option.
- Shortened shipping accordion title from `PENGIRIMAN RESMI & JAMINAN TUKAR UKURAN 7 HARI` to punchy, elegant `PENGIRIMAN & GARANSI TUKAR`.
- Re-architected shipping content into 3 quiet luxury service rows with gold diamond markers (`◆ Pengiriman Cepat & Terlindungi`, `◆ Garansi Bebas Tukar Ukuran 7 Hari`, `◆ Layanan Konsultasi 3S 1C 1T & 1H`).

### 3. Single-Variant Clean State & Mathematical Width Precision (`AddToCartButton.jsx`)
- Hidden variant selector completely on single-variant or all-size products (`hasMultipleVariants === false`), eliminating empty containers or redundant buttons.
- Enhanced `AddToCartButton.jsx` to pass `wrapperClassName` onto Hydrogen's `fetcher.Form`.
- Row 1: Quantity Selector (`w-28 h-12`) + Tambah ke Tas Belanja (`flex-1 h-12`).
- Row 2: Beli Sekarang (`w-full h-12`).
- Result: Row 1 and Row 2 share mathematically identical widths (100% aligned left and right).

### 4. Tier-Differentiated Showcase for Sarimbit Exclusive & Premium
- Built automated tier classification based on parent collection, product handle, title, and price threshold (>= IDR 1M for Exclusive, IDR 500k-999k for Premium).
- **Sarimbit Exclusive**:
  - Eyebrow: `HAUTE HERITAGE • SARIMBIT EXCLUSIVE` with gold diamond badge.
  - Value Props: `Sutra Alam ATBM • Canting Prada Emas • Sambung Motif Presisi`.
  - Obsidian Heritage Showcase Pavilion (`bg-[#111111]`): 3 Pillars of Haute Artistry (Sutra ATBM 1-of-1, Canting Prada Emas, VIP Fitting) + VIP Concierge WhatsApp CTA.
- **Sarimbit Premium**:
  - Eyebrow: `SIGNATURE ATELIER • SARIMBIT PREMIUM` with ochre badge.
  - Value Props: `Tenun Dobby Timbul • Furing Katun Hero Adem • Sambung Motif Presisi`.
  - Champagne Linen Showcase Pavilion (`bg-[#F3EDE2]`): 3 Signature Standards (Dobby Timbul, Furing Katun Hero, Garansi 7 Hari) + Reception Consultation CTA.
- **Standard Batik**: Clean minimalist Mori Linen palette without superfluous tier banners.

### 5. Mobile Dynamic Action Bar & Comprehensive Multi-Device Audit
- Updated `StickyMobileBar.jsx` to trigger instant checkout via `BELI SEKARANG` with safe-area bottom insets above `MobileNavigation`.
- Audited all 16 key routes across homepage, collections, products, articles, informative pages, and cart.
- Added 301 permanent redirect from `/blogs/jurnal` to `/blogs` and `/blogs/jurnal/:handle` to `/blogs/news/:handle`.
- Verified 100% of routes return HTTP 200 OK.

### 6. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Pushed to `origin/main` for automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions.

---

## Milestone 25: Native Collection-Themed PDP for Sarimbit Exclusive (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Elimination of Detached Template Sections & Full Native Obsidian Noir PDP Theming Mirroring Sarimbit Exclusive Collection

### 1. Zero Detached Template Architecture (`products.$handle.jsx`)
- Removed the separate artificial showcase blocks that disrupted standard PDP flow.
- Integrated native, continuous theme inheritance: the product page itself adapts dynamically into **Obsidian Noir & Gold** (`bg-[#111111] text-white`) when viewing any product from `sarimbit-exclusive`.
- Transition between `/collections/sarimbit-exclusive` and `/products/sarimbit-royal-navy-1` is now 100% harmonious with zero visual shock.

### 2. High-Contrast Prestige Detailing
- Dynamic Breadcrumbs: `#A9A49C` with `#C5A059` hover and pure white active title.
- 4:5 Vertical Gallery: Obsidian backdrop with antique gold active ring (`ring-[#C5A059]`).
- Typography: Display titles in Cormorant Garamond crisp white, stock status in vivid green (`#4ADE80`), value props in `#E2DFD8]/85` with gold dots.
- Quantity Counter: Dark atelier container (`bg-[#181818] border-[#C5A059]/40 text-white`) with gold numeral count.
- Action Buttons: `+ TAMBAH KE TAS BELANJA` in gold outline on dark container; `BELI SEKARANG` in solid Imperial Antique Gold (`bg-[#C5A059] text-[#111111]`).
- Accordions: Seamless dark dividers (`border-[#262626] divide-[#262626]`), gold labels, and white values.

### 3. Synchronized Related Products & Sticky Mobile Bar
- Related Products ("Koleksi Selaras") renders `ProductItem` with `variant="exclusive"`.
- `StickyMobileBar.jsx` adapts to `bg-[#111111]/95 text-white border-[#C5A059]/40` with direct checkout CTA.

### 4. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Pushed to `origin/main` for automated deployment to Shopify Oxygen Global Edge Network via GitHub Actions.

---

## Milestone 26: Currency Decimal Removal & Minimalist Dynamic Breadcrumbs (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Storefront-Wide Currency Decimal Removal (,00) & Single-Line Fluid Responsive Breadcrumbs with Zero-Radius Home Icon & Minimalist Chevron

### 1. Decimal Trailing Zero Elimination (,00 Removal)
- Added `withoutTrailingZeros as="span"` to `<Money>` components across the entire storefront:
  - PDP Primary Price and Compare At Price (`products.$handle.jsx`)
  - Sticky Mobile Checkout Bar (`StickyMobileBar.jsx`)
  - Product Grid & Related Item Cards (`ProductItem.jsx`)
  - Standalone Product Price (`ProductPrice.jsx`)
  - Luxury Search Modal (`LuxurySearchModal.jsx`)
  - Search Catalog & Predictive Results (`SearchResults.jsx`, `SearchResultsPredictive.jsx`)
  - Shopping Bag Subtotal (`CartSummary.jsx`)
- Completely eliminates ugly `,00` and `.00` fractional decimals across desktop and mobile while preserving clean integer currency formatting (e.g. `IDR 1,250,000` / `Rp 1.250.000`).

### 2. Minimalist Single-Line Dynamic Breadcrumbs
- Replaced the word "BERANDA" with a clean zero-radius geometric Home SVG icon with hover transition.
- Replaced slash separators (`/`) with minimalist chevrons (`>`).
- Implemented `overflow-hidden whitespace-nowrap` on container and `truncate min-w-0` on product title to guarantee breadcrumbs fit seamlessly on exactly ONE horizontal line across all device screen widths (360px Android, 375px iPhone, 430px iPhone Pro Max, widescreen desktop).

### 3. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Local SSR check on `sarimbit-royal-navy-1` verified `Price without decimals: true` and single-line breadcrumb with Home icon active.

---

## Milestone 27: Indonesian Rupiah (Rp) Standardization & Dedicated 2-Column Tier Differentiation (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Deterministic Indonesian Rupiah (Rp) Formatting, Bespoke 2-Column Editorial Differentiation for Sarimbit Exclusive & Premium, and Concise Single-Line Collection CTA

### 1. Indonesian Rupiah (Rp) Currency Standardization (`currency.js`)
- Replaced foreign `IDR` currency prefixes with native `Rp` format familiar to Indonesian shoppers (e.g. `Rp 1.250.000` and `Rp 1.750.000`).
- Mathematical zero-decimal formatting eliminates all `,00` and `.00` across all devices without hydration mismatch.
- Applied across PDP, Sticky Mobile Action Bar, Catalog Cards, and Standalone Price components.

### 2. 2-Column Bespoke Editorial Tier Section (`ProductTierStorySection.jsx`)
- Rendered exclusively for **Sarimbit Exclusive** and **Sarimbit Premium** products.
- **Sarimbit Exclusive**: Obsidian Noir canvas with 4:5 canting & prada emas artisan imagery, mulberry silk ATBM narrative, and 3 technical pillars (Batik Tulis Prada Emas Murni, Presisi Sambung Pola 100% Simetris, and Layanan VIP Bespoke Tailoring).
- **Sarimbit Premium**: Warm Mori Linen canvas with 4:5 family harmony imagery, dobby timbul weave narrative, and 3 technical pillars (Tekstur Tenun Dobby Timbul, Lapis Furing Katun Hero Sejuk Tropis, and Garansi Bebas Tukar Ukuran 7 Hari).
- Excluded on standard products to preserve minimalist catalog flow.
- Prepared for direct Metaobject binding in future iterations.

### 3. Concise Single-Line Collection Navigation
- Shortened bottom collection button from `LIHAT SEMUA KOLEKSI SARIMBIT EXCLUSIVE →` to concise `LIHAT SEMUA KOLEKSI →`, guaranteeing zero text clipping or 2-line wraps on mobile viewports.

### 4. Verification Evidence
- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Local SSR check on `sarimbit-royal-navy-1` and `sarimbit-charcoal-hitam` verified `Renders Rp format: true`, `Has 2-Column Tier Section: true`, and `LIHAT SEMUA KOLEKSI →` single-line button.

---

## Milestone 28: Mobile Gallery Touch Swipe, Precision Mini-Thumbnails & Frameless Tier Section (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Horizontal Touch Swipe Gestures on Main Product Image, Precision 100% Width 5-Column Mini-Thumbnails on Mobile, and Frameless Tier Editorial Section

### 1. Mobile Touch Swipe & Interactive Navigation
- Added horizontal touch swipe gesture detection (`onTouchStart`, `onTouchMove`, `onTouchEnd`) with 40px threshold to navigate between product lookbook images seamlessly on mobile touchscreens.
- Added subtle, accessible `‹` and `›` arrow buttons for instant one-tap navigation on both mobile and desktop.
- Integrated active photo counter badge (e.g. `1 / 5`) in the lower corner of the main image.

### 2. Precision Mobile Mini-Thumbnails
- Engineered responsive thumbnail distribution on mobile:
  - If `<= 5` images: dynamically rendered as an exact multi-column grid (`grid-cols-5 gap-2 w-full`) spanning 100% of the main image width without horizontal scrollbars, gaps, or misalignments.
  - If `> 5` images: enables smooth horizontal scrolling (`overflow-x-auto scrollbar-none`) with 5 visible thumbnails per viewport width.
  - Desktop view preserves the elegant vertical column on the left (`sm:flex-col sm:w-20 sm:max-h-[660px]`).

### 3. Frameless & Borderless Tier Editorial Section (`ProductTierStorySection.jsx`)
- Removed the heavy outer border (`border-[#C5A059]/35`) and boxed card padding.
- Replaced with an open, architectural editorial layout with hairline top border (`pt-12 sm:pt-16 border-t`) that harmonizes seamlessly with the PDP product grid width (`w-full max-w-7xl`).

---

## Milestone 29: Grid-Proportional Pagination (3x3=9, 4x3=12), Single-Line Breadcrumbs & Typography Precision (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Grid-Proportional Dynamic Pagination, Unified Max-1-Line Breadcrumbs (`Breadcrumb.jsx`), Zero-Radius Architecture & Typography Screening

### 1. Grid-Proportional Catalog Pagination (4x3=12 & 3x3=9)
- Dynamically synchronized product list pagination across all storefront listing routes:
  - **4 Columns x 3 Rows = 12 Items**: Standard catalog grids (`/collections/all`, general `/collections/$handle`, `/search`) load exactly 12 items initially, with remaining items retrieved via "LIHAT LEBIH BANYAK" (Load More).
  - **3 Columns x 3 Rows = 9 Items**: 3-column grids (`/collections/sarimbit-exclusive`, `/collections`, `/blogs`) load exactly 9 items initially.
  - Streamlined `loadMoreText` default in `PaginatedResourceSection.jsx` to concise `LIHAT LEBIH BANYAK` / `LIHAT SEBELUMNYA`, eliminating awkward multi-line breaking on narrow mobile screens.

### 2. Unified Single-Line Breadcrumb System (`Breadcrumb.jsx`)
- Created canonical `app/components/Breadcrumb.jsx` replacing ad-hoc breadcrumb markup across 15 routes:
  - `collections.$handle.jsx`, `collections.all.jsx`, `collections._index.jsx`, `products.$handle.jsx`, `blogs._index.jsx`, `blogs.$blogHandle._index.jsx`, `blogs.$blogHandle.$articleHandle.jsx`, `pages.tentang-kami.jsx`, `pages.fasilitas-store.jsx`, `pages.layanan-seragam.jsx`, `pages.lokasi-toko.jsx`, `pages.$handle.jsx`, `cart.jsx`, `search.jsx`, `policies._index.jsx`, `policies.$handle.jsx`, `account.jsx`.
  - **Strict Single-Line Guarantee on Mobile**: Implemented `flex-nowrap whitespace-nowrap overflow-hidden`, zero-radius Home icon with `shrink-0`, micro-chevrons with `shrink-0`, intermediate link truncation (`max-w-[85px] sm:max-w-none truncate`), and active label truncation (`truncate min-w-0 flex-1 sm:flex-initial`). The breadcrumb never breaks into 2 lines on any mobile device from 320px up to 480px.

### 3. Storefront-Wide Screening & Zero-Radius Typography Calibration
- Refactored `TierExperience.jsx`:
  - Completely removed all `rounded-full`, `rounded-2xl`, and `rounded-xl` instances in favor of strict `rounded-none`.
  - Replaced non-harmonic `#14213D` blue highlights with Quad-Harmonic palette (`#111111`, `#FAF8F5`, `#C5A059`, `#7C3F1D`).
  - Calibrated Cormorant Garamond headings to `font-normal`.
- Refactored `CraftsmanshipZoom.jsx`:
  - Removed `rounded-2xl` on cards and pills.
  - Softened headings to `font-normal` with micro-tracked eyebrows.
- Calibrated `CustomerLoveNotes.jsx`:
  - Updated title to Indonesian `Kisah & Apresiasi Pelanggan` with eyebrow `TESTIMONI RESMI BUTIK`.
  - Replaced circular pagination dots with zero-radius geometric bars.
- Shortened long CTA in `ChooseYourBatikGrid.jsx` to concise `LIHAT SEMUA KOLEKSI →`.
- Added Quiet Luxury typography hierarchy utilities to `app/styles/app.css`.

### 4. Verification Evidence (Strictly Local Development First)
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Local dev server verification on `http://localhost:3005`: All 13 core routes returned HTTP 200 OK.
- Preserved local development state without git push or remote deploy, adhering strictly to user guidelines.

---

## Milestone 30: Standard Collection 2-Column Split Hero (2026-09-03)
**Date**: 2026-09-03 | **Execution**: 2-Column Split Hero Architecture (Left: Title & Narrative, Right: 3:2 Featured Image), Haute Hero Preservation for Sarimbit Exclusive/Premium

### 1. 2-Column Luxury Split Hero (`collections.$handle.jsx`)
- Re-architected standard collection pages (`/collections/*` for `batik-pria`, `batik-wanita`, `batik-anak`, `jarik-kain-batik`, `sarimbit-ekonomis`, etc.):
  - **Left Column**: High-prestige eyebrow `KATALOG BUSANA BATIK NUSANTARA`, collection title directly from Shopify (`collection.title`), hairline gold divider, and collection narrative directly from Shopify (`collection.description`), followed by atelier trust points (`Jahit Bespoke Tanpa MOQ • Konsultasi Ukuran via WA • Garansi Butik Resmi`).
  - **Right Column**: Featured collection image with calibrated 3:2 landscape aspect ratio (`aspect-[3/2]`), preventing excessive height and allowing catalog items to be visible above the fold, zero-radius architecture (`rounded-none`), subtle hover zoom (`group-hover:scale-105 duration-700`), hairline border `#E2DFD8`, and atelier collection tag.
- **Cinematic Haute Hero Preserved**: `sarimbit-exclusive` and `sarimbit-premium` retain their full-bleed cinematic hero sections intact.
- **Clean Breadcrumb Integration**: Breadcrumb positioned on its own dedicated row above the split hero.

### 2. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Local SSR check:
  - `batik-pria`: `Has aspect-[3/2]: true`, `Has 2-column grid: true`.
  - `sarimbit-exclusive`: `Has HAUTE HERITAGE: true`, `Has aspect-[3/2]: false`.
- Dev server `localhost:3005`: 7/7 collection routes return HTTP 200 OK.

---

## Milestone 31: Pure Typographic Floating Filter Bar & Oxygen Edge Deploy (2026-09-03)
**Date**: 2026-09-03 | **Execution**: 100% Zero-Box Typographic Floating Filter Bar (`CollectionFilterBar.jsx`), Storefront API Dynamic Sorting/Filtering, Edge Verification & Production Release

### 1. Pure Typographic Floating Filter Bar (`CollectionFilterBar.jsx`)
- Overhauled catalog toolbar into an ultra-minimalist, Quiet Luxury typographic navigation:
  - **100% Zero-Box, Zero-Frame, Zero-Background**: Stripped all button containers, grey background bands, and form boxes.
  - **Pure Text Tabs**: Horizontal stream of editorial text links (`Semua (count)`, `Siap Kirim`, `< Rp 500rb`, `Rp 500rb – 1jt`, `> Rp 1jt`).
  - **Gold Hairline Indicator**: Active tab is highlighted with an elegant antique gold bottom hairline (`border-b-2 border-[#C5A059] -mb-[15px] pb-2.5`).
  - **Frameless Sort Trigger**: Right side provides a pure text sort selector (`Urutkan: Rekomendasi ↓`) with options for latest, price low-to-high, price high-to-low, and alphabetical A-Z.
  - **Reset Action**: Whispered text action `Reset Filter` appears seamlessly when active filters exist.
  - **Full Mobile Responsiveness**: Smooth horizontal touch swipe without scrollbars.

### 2. Storefront API Dynamic Integration
- Wired URL search parameters (`sort`, `available`, `minPrice`, `maxPrice`) to Storefront API queries:
  - `collections.$handle.jsx`: Accepts `$sortKey: ProductCollectionSortKeys`, `$reverse: Boolean`, and `$filters: [ProductFilter!]`.
  - `collections.all.jsx`: Accepts `$sortKey: ProductSortKeys`, `$reverse: Boolean`, and `$query: String`.
  - Empty state with elegant apology and suggestion when no products match filter criteria.

### 3. Verification Evidence & Deployment
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Local SSR check: Tested `/collections/all`, `/collections/all?sort=price-asc`, `/collections/all?available=true`, `/collections/batik-pria`, and `/collections/sarimbit-exclusive`, all returning HTTP 200 OK with `FilterBar: true`.
- Staged all modified files and pushed to `origin/main` for automated Shopify Oxygen edge deployment.

---

## Milestone 32: Architectural 404 Page, 2-Column Split Cart & Anti-AI-Slop Overhaul (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Removal of "Siap Kirim" Tab, High-Prestige 404 Experience (`$.jsx` & `root.jsx`), 2-Column Split Cart Suite (`cart.jsx`, `CartMain.jsx`, `CartSummary.jsx`), Oxygen Edge Deploy

### 1. Removal of "Siap Kirim" Filter Tab (`CollectionFilterBar.jsx`)
- Streamlined pure typographic floating bar to clean price brackets and catalog count:
  - `Semua (count)`, `< Rp 500rb`, `Rp 500rb – 1jt`, `> Rp 1jt`.
  - Removed "Siap Kirim" and related availability URL param mutation.

### 2. Architectural 404 Gallery Experience (`$.jsx` & `root.jsx`)
- Implemented dedicated luxury 404 view within `PageLayout`:
  - **Single-Line Breadcrumb**: `[Home Icon] > KODE GALERI 404`.
  - **Cormorant Garamond Display**: *"Jejak Warisan yang Dicari Belum Tersedia"* with gold hairline divider.
  - **Embedded Search**: Clean zero-radius search bar targeting `/search`.
  - **Atelier Curated Triptych**: 3 vertical 4:5 image cards directing lost visitors to *Sarimbit Exclusive*, *Sarimbit Premium*, and *Kemeja Batik Pria*.
  - **Concierge Channel**: Direct WhatsApp link (`081-390-8888-09`) for personal assistance.
  - **Harmonized Root ErrorBoundary**: Refactored `root.jsx` to eliminate technical error jargon in favor of polished Quiet Luxury typography.

### 3. Cart Page Anti-AI-Slop & 2-Column Split (`cart.jsx`, `CartMain.jsx`, `CartSummary.jsx`)
- Overhauled cart into a 2-column Quiet Luxury suite:
  - **Desktop 2-Column Split**: Line items on left (`lg:col-span-7 xl:col-span-8`), sticky order summary on right (`lg:col-span-5 xl:col-span-4`).
  - **Zero Emojis**: Removed cartoon emojis (`📦`, `✨`, `🔒`, `🛍️`) in favor of Quiet Luxury trust pillars (*Garansi Keaslian Butik 100%*, *Bebas Penyesuaian Ukuran*, *Pembayaran & Proteksi Pengiriman*) and monogram diamond SVG.
  - **Indonesian Language Localization**: Replaced all English starter words (*Totals*, *Discounts*, *Remove*, *Subtotal*) with refined Indonesian atelier terminology (*Ringkasan Pesanan*, *Subtotal Busana*, *Voucher / Kode Promo*, *Gunakan*, *Hapus*, *Lanjut ke Pembayaran Resmi Shopify*).
  - **Deterministic Price Formatting**: Standardized subtotal and total to Indonesian Rupiah without decimals `,00` (`formatRupiah`).
  - **Atelier Empty State**: Displays inviting empty state with 3 recommended collection cards.

### 4. Verification Evidence & Deployment
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Local SSR check: Tested `/cart` (200 OK, 0 emojis, trust pillars verified) and `/koleksi-tidak-ada-xyz` (404 OK, editorial suite verified).
- Pushed to `origin/main` for automated Shopify Oxygen edge deployment.

---

## Milestone 33: Header Cart Direct Link, Zero-Box Cart & Variant Suppression (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Header Cart Link Routing, Zero-Box Cart Refactor, Synthetic Variant Option Suppression, CTA Unification, Mobile UI Calibration

### 1. Direct Header Cart Navigation (`Header.jsx`)
- Replaced the cart drawer button with an intentional `<Link to="/cart" prefetch="intent">`.
- Touching or clicking the header cart icon now instantly opens the `/cart` page without drawer animation.

### 2. Zero-Box & Anti-Framing Cart Overhaul (`CartMain.jsx` & `cart.jsx`)
- Stripped all nested box cards, heavy bezels, and widget frames (`bg-white border ... shadow-xs`).
- Left column flows organically on the Mori Linen canvas separated only by hairline dividers (`#E2DFD8`).
- Converted bottom boxed assurance cards into a single whispered horizontal line with gold dots.
- Replaced boxed payment chips in the order summary with clean typographic text.

### 3. Synthetic Variant Option Suppression (`CartLineItem.jsx`)
- Filtered out Shopify synthetic `"Title: Default Title"` option tags.
- Products with no custom variant options or with a single default variant now cleanly suppress the variant line rather than displaying raw technical text.

### 4. CTA Unification & Mobile Proportions
- Eliminated redundant duplicate calls to action ("Tambah Busana", duplicate "Lanjutkan Belanja" inside the list).
- Retained a single primary `Lanjutkan Belanja →` link at the top-right of the cart header.
- Calibrated mobile thumbnail proportions (`w-18 h-22 sm:w-22 sm:h-28 aspect-[4/5]`) and stepper dimensions (`w-6 h-6 sm:w-7 sm:h-7`) for comfortable touch usability without text clipping.

### 5. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Local SSR check: Tested `/cart` with zero duplicate CTAs, no "Default Title", and calibrated mobile responsiveness.

---

## Milestone 34: Mobile Header Logo Enlargement & Account Icon Swap (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Mobile Center Logo Calibration, Redundant Search Replacement, Account Icon Visibility

### 1. Mobile Logo Enlargement (`Header.jsx`)
- Scaled the mobile dead-center Batik Smile logo from `h-8 sm:h-9` up to `h-10 sm:h-11 w-auto max-w-[170px] sm:max-w-[200px]`.
- Fits with balanced authority inside the 80px (`h-20`) header, providing high-contrast brand recognition without spilling over the navigation actions.

### 2. Search Button Swap for Account Icon (`Header.jsx`)
- Replaced the redundant mobile search trigger (`hidden lg:flex`) with the Customer Account icon (`/account`), since search is already prominently housed in the mobile sticky bottom navigation bar (`MobileNavigation.jsx`).
- Mobile header now presents a clean tripartite layout:
  - Left: Hamburger Menu (`lg:hidden`).
  - Center: Enlarged Batik Smile Brand Logo.
  - Right: Customer Account Icon + Cart Navigation Badge.

### 3. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- SSR node audit: `Has enlarged mobile logo: true`, `Search is hidden on mobile: true`.

---

## Milestone 35: Hyper-Minimalist Mobile Header & Sticky Burger Account (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Account Icon Removal from Mobile Header, Burger Drawer Showroom & WA Card Removal, Sticky Account Action Addition

### 1. Hyper-Minimalist Mobile Header (`Header.jsx`)
- Removed the account icon from mobile header (`hidden lg:flex`).
- Mobile header now achieves pure Quiet Luxury minimalism with zero icon clutter:
  - Left: Hamburger Menu (`lg:hidden`).
  - Center: Enlarged Batik Smile Brand Logo (Dead-center, `h-10 sm:h-11`).
  - Right: Cart Badge Icon (`Link to="/cart"`).

### 2. Burger Drawer Cleanup & Sticky Account Bar (`Header.jsx`)
- Removed the Semarang showroom card and duplicate WhatsApp button from the mobile burger navigation drawer.
- Implemented a dedicated sticky bottom bar in the burger drawer:
  - Fixed above the drawer bottom: `AKUN SAYA & STATUS PESANAN →` (`NavLink to="/account"`).
  - Users can browse all collections and services, while their account access remains permanently anchored and accessible at the bottom of the drawer.

### 3. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- SSR node audit: `Showroom card removed: true`, `WA button removed: true`, `Sticky account in burger menu: true`, `Account icon hidden on mobile header: true`.

---

## Milestone 36: In-Modal Live Predictive Search Engine (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Pure In-Modal Search Architecture, Data Contract Normalization, Tabbed Category Filtering, Mobile UX Polish

### 1. In-Modal Search Engine (`LuxurySearchModal.jsx`)
- Eliminated all full-page redirects (`navigate('/search')`). When users type or submit (Enter or "CARI" button), results appear instantly directly inside the modal dialog without reloading or leaving the active screen.
- Integrated a smooth 250ms debounce for responsive live typing + instant manual trigger.
- Added in-modal category filter tabs (`Semua`, `Busana`, `Koleksi`, `Warta`).
- Direct product navigation: clicking any search result item navigates straight to its detail page (`/products/${handle}`) and dismisses the modal.

### 2. Data Contract Normalization (`routes/search.jsx`)
- Normalized `predictiveSearch` return payload so both direct properties (`result.products`, `result.collections`, `result.articles`) and nested `result.items` are returned consistently.

### 3. Quiet Luxury Search UI & Mobile Calibration
- Strict 4:5 vertical imagery (`aspect-[4/5]`) for all product search cards with `formatRupiah` pricing and brand eyebrows.
- Full-screen responsive layout on mobile with thumb-friendly sticky search bar and clear button.
- Trending wastra keyword shortcuts (`Sarimbit Mahakarya`, `Kemeja Furing Hero`, etc.) that execute search on click.

### 4. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- Verified in-modal search execution with zero page reloads.

---

## Milestone 37: Predictive Search Limit Clamping & Multi-Entity Output (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Storefront API Limit Fix (1..10), Multi-Entity Output (Products, Collections, Tags, Articles), Quiet Luxury Polish

### 1. Root Cause Diagnosis & Fix
- Storefront API strictly requires `limit` for `predictiveSearch` to be between 1 and 10. The previous parameter of `limit: 12` caused Shopify to return a GraphQL error, leading to `Cannot convert undefined or null to object` and returning HTTP 500 on live search requests.
- Clamped `limit` to `Math.min(10, Math.max(1, limit))` in both backend loader and frontend modal.

### 2. Multi-Entity Search Output (`LuxurySearchModal.jsx`, `routes/search.jsx`)
- Added `tags` to `PREDICTIVE_SEARCH_PRODUCT_FRAGMENT` and extracted unique tags from matching items.
- Enhanced in-modal display to feature:
  1. **Koleksi Butik Terkait**: Dedicated cards with collection banner/monogram and direct links (e.g. "Daster Batik Solo").
  2. **Tag Busana**: Clickable tag pills to refine search.
  3. **Busana & Produk**: Strict 4:5 vertical portrait cards with `formatRupiah` pricing and brand eyebrows (e.g. "Daster Solo Series").
  4. **Warta & Jurnal Budaya**: Editorial links.
  5. **Tabbed Filtering**: `Semua`, `Busana`, `Koleksi`, `Tag`, `Warta`.

### 3. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- Verified live query: `q=daster` returns HTTP 200 with "Daster Solo Series" and "Daster Batik Solo". Verified "sarimbit", "kemeja", "wanita" all returning HTTP 200 and live results.

---

## Milestone 38: Modern Zero-Box 404 Page & Strict Noindex/Nofollow (2026-09-03)
**Date**: 2026-09-03 | **Execution**: Zero-Box 404 Redesign, Background Watermark & Animated Monogram, In-Modal Search Shortcut, Noindex/Nofollow Dual Enforcement

### 1. Modern Clean 404 Experience (`routes/$.jsx`)
- Stripped all cluttered recommendation cards, nested boxes, and border frames.
- Replaced with a spacious Quiet Luxury stream:
  - Background: Oversized semi-transparent watermark numeral ("404") in Cormorant Garamond.
  - Delicate floating/rotating geometric diamond monogram emblem in antique gold (`#C5A059`).
  - Cormorant Garamond headline: *"Jejak Wastra Belum Tersedia"*.
  - Hairline gold divider and poetic explanatory narrative.
  - Two focused primary CTA buttons: `KEMBALI KE BERANDA →` and `JELAJAHI KOLEKSI`.
  - Whispered live search trigger: `Atau Cari Busana Tertentu →` (seamlessly triggers in-modal search via `open('search')`).
  - WhatsApp concierge hotline: `081-390-8888-09`.

### 2. Dual-Layer Noindex, Nofollow SEO Enforcement
- In `routes/$.jsx`: Configured HTML `<meta name="robots" content="noindex, nofollow" />`.
- In `entry.server.jsx`: Added automated HTTP response header `X-Robots-Tag: noindex, nofollow` on all 404 status codes.

### 3. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- SSR node test verified: HTTP 404 status, `X-Robots-Tag: noindex, nofollow`, HTML `<meta name="robots" content="noindex, nofollow">`, and zero boxed cards.

---

## Milestone 39: Mobile Input Zero-Zoom Scaling & Collection Filter UI/UX Overhaul (2026-09-03)
**Date**: 2026-09-03 | **Execution**: 16px Mobile Input Scaling, Anti-Slop Filter & Sort Overhaul, Mobile Sort Bottom Sheet, Desktop Custom Popover

### 1. Mobile Input & Textarea 16px Font Scaling (`text-base sm:text-*`)
- Standardized all input and textarea fields across the app to use `text-base` (16px) on mobile viewports to prevent iOS Safari auto-zoom upon focus.
- Updated fields:
  - `LuxurySearchModal.jsx`: Search input scaled from `text-sm` to `text-base sm:text-lg`.
  - `CartMain.jsx`: Cart note textarea scaled from `text-xs` to `text-base sm:text-xs`.
  - `CartSummary.jsx`: Discount code input scaled from `text-xs` to `text-base sm:text-xs`.
  - `routes/search.jsx`: Standalone search input scaled from `text-xs` to `text-base sm:text-sm`.
  - `routes/account.profile.jsx`: Name inputs scaled from `text-xs` to `text-base sm:text-xs`.
  - `routes/account.addresses.jsx`: Address form inputs scaled from `text-xs` to `text-base sm:text-xs`.
  - `routes/account.orders._index.jsx`: Order search input scaled from `text-xs` to `text-base sm:text-xs`.

### 2. Collection Filter & Sort Mobile Overhaul (`CollectionFilterBar.jsx`)
- Replaced native OS `<select>` dropdown with bespoke Quiet Luxury components:
  - **Desktop**: Custom popover menu with sharp 0px corners, gold bullet indicators, and outside click listener.
  - **Mobile**: Touch-first Sort Bottom Sheet drawer with backdrop blur, 48px touch targets, antique gold checkmarks, and body scroll locking.
  - **Mobile Layout**: Split into top status row (count + active filter reset chip + sort trigger button) and bottom horizontal touch-scroll filter ribbon.

### 3. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- Verified elimination of `<select>` element and proper mobile layout rendering.

---

## Milestone 40: Store & Checkout Domain Environment Configuration (2026-09-04)
**Date**: 2026-09-04 | **Execution**: `PUBLIC_STORE_DOMAIN` and `PUBLIC_CHECKOUT_DOMAIN` configuration

### 1. Environment Variables Configuration
- Configured `.env` and `.env.example`:
  - `PUBLIC_STORE_DOMAIN="batiksmile.com"`
  - `PUBLIC_CHECKOUT_DOMAIN="checkout.batiksmile.com"`
- Updated `root.jsx` loader to expose `publicCheckoutDomain` and pass `consent.checkoutDomain`.
- Updated `CartSummary.jsx` (`CartCheckoutActions`) to resolve checkout URLs to `checkout.batiksmile.com`.

### 2. Verification Evidence
- Tested Storefront API GraphQL queries against `https://batiksmile.com/api/2026-01/graphql.json` (Status 200).
- Verified cart generation returning `checkoutUrl` directly on `checkout.batiksmile.com`.
- Verified HTTP 302 redirect from `/cart/c/...` to live checkout session `/checkouts/cn/.../id-id`.
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.

---

## Milestone 41: Tri-Domain Architecture, Shopify CLI Linkage, & CSP Whitelisting (2026-09-04)
**Date**: 2026-09-04 | **Execution**: Tri-domain verification, Shopify CLI storefront linking, CSP connectSrc expansion, and environment template standardization

### 1. Authoritative Domain Mapping
- Storefront: `https://batiksmile.com` (and `www.batiksmile.com`) on Shopify Oxygen Edge.
- Checkout: `https://checkout.batiksmile.com` on Shopify Core Online Store.
- Customer Accounts: `https://account.batiksmile.com` on Shopify New Customer Accounts.

### 2. Shopify CLI Linkage
- Authenticated with `23ahbp-sq.myshopify.com` as `ongkiardiansyah@gmail.com`.
- Linked local project to storefront `Batik Smile (id: 1000176204)`.
- Verified non-interactive commands (`shopify hydrogen env list`).

### 3. Content Security Policy (CSP) Updates (`entry.server.jsx`)
- Expanded `connectSrc` directive to explicitly whitelist:
  - `https://account.batiksmile.com`
  - `https://checkout.batiksmile.com`
  - `https://batiksmile.com`

### 4. Verification Evidence
- `dig` and `curl -sI` verified all 3 domains active with proper SSL and HTTP response codes.
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- Oxygen Deployment Workflow `#33800203770` succeeded in 49s.

---

## Milestone 42: Catalog Slug Parity Audit & 100% Precise SEO Metadata Engine (2026-09-04)
**Date**: 2026-09-04 | **Execution**: Comprehensive inventory audit of Shopify Core catalog, verification of slug routing in Hydrogen, and implementation of authoritative SEO/OpenGraph metadata engine (`app/lib/seo.js`)

### 1. Live Catalog Audit & Verification
- **Collections (31/31 PASSED - HTTP 200)**: All 31 collection handles from Shopify Admin verified responsive.
- **Products (23/23 PASSED - HTTP 200)**: All 23 product handles from Shopify Admin verified responsive.
- **Pages (11/11 PASSED - HTTP 200)**: All 11 pages (custom and dynamic CMS) verified responsive.
- **Articles (12/12 PASSED - HTTP 200)**: All 12 cultural wastra articles under `/blogs/news/*` verified responsive.

### 2. SEO & Metadata Engine Calibration (`app/lib/seo.js`)
- Integrated Shopify Admin `seo.title` and `seo.description` into all page types.
- Fixed React Router v7 canonical tags to render standard `<link rel="canonical" href="https://batiksmile.com/...">` via `tagName: 'link'`.
- Added OpenGraph (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`, `og:site_name`, `og:price`) and Twitter Summary Large Cards across products, collections, pages, and articles.
- Updated root `<html lang="id">` for Indonesian language targeting.

### 3. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- Node HTML inspection verified exact reproduction of Shopify Admin search engine listing titles.

---

## Milestone 43: Google PageSpeed Insights Mobile & Desktop Performance Optimization (2026-09-04)
**Date**: 2026-09-04 | **Execution**: Global Brand Logo WebP Conversion, Mobile Hero AVIF Generation, LCP Resource Preloading, Enforced Below-The-Fold Lazy-Loading, and PSI Metric Verification

### 1. Global Brand Logo WebP Optimization
- Converted raw unoptimized 3600px PNG logo (`public/brand/batik-smile-logo.png`, 373 KB) into modern responsive WebP assets (`public/logo/logo-600.webp` and `public/logo.webp`).
- Reduced header network payload by ~90% while retaining razor-sharp 2x retina clarity on mobile viewports.
- Integrated into `Header.jsx`, `Footer.jsx`, `LuxurySearchModal.jsx`, and mobile navigation drawer.

### 2. Mobile Hero Banner AVIF Generation & Responsive Picture
- Created next-gen AVIF mobile banner (`public/banners/hero_slider_1_mobile.avif`), tailored specifically for mobile screen dimensions and cellular network bandwidth.
- Implemented responsive `<picture>` markup in `HeroSlider.jsx` serving lightweight AVIF on mobile (`media="(max-width: 768px)"`) and full-res desktop imagery on larger viewports.

### 3. LCP Resource Preloading & PDP Priority Fetching
- Configured `fetchPriority="high"`, `loading="eager"`, and `decoding="async"` on the initial hero slide to accelerate First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
- Added `fetchPriority="high"` on the primary PDP gallery image in `products.$handle.jsx`.

### 4. Enforced Lazy-Loading Across Below-The-Fold Assets
- Enforced `loading="lazy"` and `decoding="async"` across all catalog product cards (`ProductItem.jsx`), related products ("Koleksi Selaras"), and editorial CMS content blocks.
- Guaranteed zero layout thrashing or render-blocking media downloads.

### 5. Verification Evidence & PSI Real-World Scores
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0.
- **Mobile Performance Jump**: Performance score surged from **51 &rarr; 81 / 100** (LCP dropped from 16.6s to 4.1s).
- **PDP Mobile Performance**: Jumped from **55 &rarr; 75 / 100** (LCP dropped from 6.3s to 4.8s).
- **Desktop Performance**: Scored **90 – 98 / 100** consistently across templates.
- **SEO Score**: **100 / 100** across mobile and desktop.
- **Cumulative Layout Shift (CLS)**: **0.00** (perfect stability).

---

## Milestone 44: Complete Dynamic SEO Engine, Custom Sitemap Chunk & Authoritative Robots.txt (2026-09-04)
**Date**: 2026-09-04 | **Execution**: Route-Wide Dynamic Shopify Storefront API SEO Integration (`app/lib/seo.js`), Bogus Locale Elimination, Custom Sitemap Chunk (`/sitemap/custom/1.xml`), AI-Friendly Authoritative Robots.txt (`/robots.txt`), and Live Oxygen Production Release

### 1. Centralized Dynamic SEO Metadata Engine (`app/lib/seo.js`)
- Authored a comprehensive suite of dynamic meta generators extracting live data from Shopify Storefront API:
  - `generateHomeMeta`: Dynamic `shop.name` and `shop.description` with quiet luxury branding.
  - `generateCollectionIndexMeta` & `generateCollectionMeta`: Catalog curation meta, handle-aware title/description, collection image, and canonical URL.
  - `generateProductMeta`: Product title, price formatted in IDR, stock status, primary imagery, and rich product schema.
  - `generatePageMeta`: Integrated `PAGE_SEO_QUERY` across `pages.tentang-kami.jsx`, `pages.fasilitas-store.jsx`, `pages.lokasi-toko.jsx`, `pages.layanan-seragam.jsx`, and dynamic `pages.$handle.jsx`.
  - `generateBlogsIndexMeta`, `generateBlogMeta`, and `generateArticleMeta`: Cultural wastra storytelling titles, summaries, and social share cards.
  - `generatePoliciesIndexMeta` & `generatePolicyMeta`: Official boutique legal policies with canonical mapping.
  - `generateSearchMeta`, `generateCartMeta`, and `generateNotFoundMeta`: Configured with strict `noindex, follow` or `noindex, nofollow` headers to safeguard crawl budget.
- Formatted OpenGraph (`og:site_name`, `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale: "id_ID"`), Twitter Summary Large Cards, and canonical tags via `tagName: 'link'`.

### 2. Clean Sitemaps & Dedicated Custom Chunk (`app/routes/sitemap.$type.$page[.xml].jsx` & `app/routes/[sitemap.xml].jsx`)
- Purged hardcoded fake locales (`['EN-US', 'EN-CA', 'FR-CA']`) from Hydrogen boilerplate that caused 404 crawl errors on Google Search Console.
- Implemented dedicated custom sitemap chunk (`params.type === 'custom'`) serving 15 storefront-native URLs (`/`, `/collections/all`, `/collections`, `/blogs`, `/pages/*`, `/policies/*`) with defined `<priority>` and `<changefreq>`.
- Injected `<sitemap><loc>https://batiksmile.com/sitemap/custom/1.xml</loc></sitemap>` into the XML sitemap index.

### 3. Authoritative Robots.txt Engine (`app/routes/[robots.txt].jsx`)
- Removed harmful `Disallow: /policies/` that blocked search engines from crawling trust policies.
- Blocked administrative and cart query parameters (`/checkout`, `/checkouts/`, `/cart`, `/account`, `/*?*sort_by=*`, `/*?*filter.*=*`, `/*?*+*`, `/*?*%2B*`).
- Explicitly allowed major search engines (`Googlebot`, `Bingbot`, `Applebot`) and modern AI search/answer engine crawlers (`OAI-SearchBot`, `GPTBot`, `Claude-SearchBot`, `ClaudeBot`, `PerplexityBot`).
- Declared canonical sitemap link: `Sitemap: https://batiksmile.com/sitemap.xml`.

### 4. Production Deployment & Live Verification
- Deployed commit `ba645fc` to Shopify Oxygen Global Edge (`https://batiksmile.com`).
- Live curl verification confirmed:
  - `https://batiksmile.com/robots.txt` &rarr; HTTP 200 with new AI-crawler directives and canonical sitemap.
  - `https://batiksmile.com/sitemap.xml` &rarr; HTTP 200 with `/sitemap/custom/1.xml` chunk.
  - `https://batiksmile.com/sitemap/custom/1.xml` &rarr; HTTP 200 rendering 15 storefront URLs.
  - `https://batiksmile.com/sitemap/pages/1.xml` &rarr; HTTP 200 with zero fake alternate hreflangs.
  - Core routes (`/`, `/collections/all`, `/products/sarimbit-royal-navy-1`, `/pages/tentang-kami`, `/policies/kebijakan-pengiriman`, `/search`, `404`) verified with dynamic metadata.

---

## Milestone 45: Product Video Prioritization as 2nd Mini-Thumbnail & Desktop/Mobile Autoplay (2026-09-21)
**Date**: 2026-09-21 | **Execution**: Media Ordering Prioritizing Video as 2nd Mini-Thumbnail (Index 1) on PDP, Desktop & Mobile Autoplay with Programmatic Audio Control, and Quiet Luxury Zero-Radius Video UI

### 1. 2nd Mini-Thumbnail Video Prioritization (`app/routes/products.$handle.jsx`)
- Refactored `mediaList` calculation in `React.useMemo`:
  - Automatically isolates product videos (`Video`, `ExternalVideo`) and photography (`MediaImage`).
  - When a product contains video media (e.g. `sarimbit-charcoal-hitam`), the primary featured photo is kept at index 0 (1st thumbnail / cover image), and the first video lookbook is explicitly prioritized at index 1 (**2nd mini-thumbnail**).
  - Subsequent photography and remaining media follow sequentially.
  - If a product does not contain video, standard image ordering is retained 100%.

### 2. Guaranteed Autoplay Across Desktop & Mobile Viewports
- Standardized autoplay compliance:
  - Added `videoRef = useRef(null)` with `useEffect` triggering programmatic `.play()` upon media switch.
  - Defaulted to `muted={isMuted}` (with `isMuted` initialized to `true`) and `playsInline` to satisfy strict iOS Safari and Android Chrome autoplay security policies.
  - Implemented automatic fallback retry if unmuted autoplay is rejected by browser policy.
  - Enhanced `ExternalVideo` embeds with automatic query injection (`autoplay=1&mute=1&playsinline=1`).
  - Bound direct thumbnail tap/click handler `handleSelectMedia` to instantly trigger video playback from start.

### 3. Quiet Luxury Nusantara Audio Control & Zero-Radius Badging
- Added an unobtrusive, elegant floating audio toggle button at the top-right of the video viewport (`SUARA MATI` / `SUARA AKTIF`) styled in obsidian noir (`bg-black/75 backdrop-blur-sm`), antique gold hairline border (`border-[#C5A059]/40`), and sharp zero-radius geometry (`rounded-none`).
- Updated the mini-thumbnail video play indicator badge to sharp zero-radius architecture (`rounded-none`).

### 4. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0 (Vite + Hydrogen SSR).
- Live Shopify Storefront API media query check on `sarimbit-charcoal-hitam` confirmed `gid://shopify/Video/41513996976185` with 1080p, 720p, and 480p MP4 sources.
- Node unit test verified exact array ordering `[MediaImage 1, Video, MediaImage 2]`.

---

## Milestone 46: Codebase AI Slop Purge, Breadcrumb Architecture Elevation, & Mobile View Calibration (2026-09-21)
**Date**: 2026-09-21 | **Execution**: Comprehensive AI Slop Purge across All Components, High-Fashion Single-Line Fluid Breadcrumbs, Precision Mobile Touch Targets & Architectural Geometry, and 100dvh Dynamic Viewport Support

### 1. Codebase-Wide AI Slop & Inconsistency Elimination
- Scanned entire repository (`app/`) for non-conformant styling, generic SaaS patterns, and rounded shapes:
  - Enforced 100% Zero-Radius compliance: Replaced stock `rounded-full` indicator dot in `app/routes/products.$handle.jsx` line 726 with `rounded-none`.
  - Refactored legacy `app/components/SarimbitSpotlight.jsx` to completely strip `rounded-2xl`, `rounded-full`, SaaS blue `#1B2A4A`, amber border, and heavy drop shadows. All cards now strictly use Quad-Harmonic palette (`#111111`, `#181818`, `#FAF8F5`, `#C5A059`) with `rounded-none`.
  - Audited brand naming copy: Verified zero instances of "Batik Smile Nusantara" in frontend components; standardized exclusively on **"Batik Smile"**.

### 2. Breadcrumb Architecture Elevation (`app/components/Breadcrumb.jsx`)
- Overhauled breadcrumb navigation to high-fashion atelier standards:
  - Replaced generic SVG chevrons with high-fashion whispered slash `/` separators (`text-[#B0AAA0]/70` on light surfaces, `text-[#C5A059]/40` on dark obsidian).
  - Upgraded to semantic `<ol>` and `<li>` structure with `aria-label="Navigasi Breadcrumb"` and `aria-current="page"`.
  - Single-line fluid touch scroll (`overflow-x-auto scrollbar-none py-1 -my-1`), guaranteeing zero awkward multi-line wraps on mobile viewports down to 320px width.
  - Root Home includes architectural zero-radius icon and `BERANDA` label on larger viewports.
  - Leaf active item max-width expanded (`max-w-[200px] sm:max-w-[360px] md:max-w-none`).

### 3. Mobile View UX Calibration (Burger Menu, Search Modal, Cart & Mobile Bar)
- **Burger Menu Mobile Drawer (`app/components/Header.jsx`)**:
  - Added material descriptors to navigation links (`Sutra ATBM & Prada Emas`, `Tenun Dobby & Furing Hero`, etc.).
  - Added In-Drawer Quick Search trigger bar (`CARI`) under the brand stamp.
  - Added dedicated VIP WhatsApp Concierge direct contact strip (`081-390-8888-09`).
  - Standardized touch target sizes to minimum 44px (`min-h-[44px]`) on all drawer navigation items.
- **Drawer Container (`app/components/Aside.jsx`)**:
  - Enforced dynamic mobile viewport height `h-[100dvh] max-h-[100dvh]` to eliminate iOS Safari floating URL bar jump and content cutoff.
  - Calibrated close button to minimum 44px touch target (`w-11 h-11 min-w-[44px] min-h-[44px]`).
- **Luxury Search Modal (`app/components/LuxurySearchModal.jsx`)**:
  - Upgraded mobile container to `h-[100dvh] max-h-[100dvh]`.
  - Calibrated close button to 44px touch area (`w-11 h-11 min-w-[44px] min-h-[44px]`).
  - Added dynamic mobile safe area padding `pb-[max(0.75rem,env(safe-area-inset-bottom))]` to the footer status bar.
- **Cart Drawer & Page (`app/components/CartLineItem.jsx` & `app/components/CartSummary.jsx`)**:
  - Calibrated thumbnail proportions to `w-20 sm:w-24 aspect-[4/5]`.
  - Enlarged stepper touch targets to `w-7 h-7` with smooth hover states.
  - Replaced generic red delete and voucher remove buttons with Quiet Luxury Soga Matang (`hover:text-[#7C3F1D]`).
- **Mobile Bottom Navigation (`app/components/MobileNavigation.jsx`)**:
  - Converted SVG stroke attributes from `round` to sharp architectural `square` and `miter`.

### 4. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0 (Vite SSR + Rolldown + React Router typegen).
- Confirmed zero occurrences of unauthorized `rounded-` classes across `app/`.

---

## Milestone 47: Clean Luxury Modern Breadcrumb Navigation (2026-09-21)
**Date**: 2026-09-21 | **Execution**: Pristine Unboxed & Frameless Editorial Stream Differentiating Luxury and Premium

### 1. Clean Luxury Modern Architecture (`app/components/Breadcrumb.jsx`)
- Refined breadcrumb away from boxy/heavy badges into a clean, unboxed, frameless editorial stream:
  - **Clean & Unboxed**: Eliminated bulky container boxes, heavy shadows, and chunky background bezels in favor of an organic horizontal editorial stream.
  - **Sarimbit Luxury (`tier="luxury"`)**:
    - Whispered mark & micro-label: `✦ LUXURY /` in pure Imperial Gold (`#C5A059`).
    - Home & Trail links: Luminous gold accents (`text-[#C5A059] hover:text-white`).
    - Separator: Whispered gold slash (`text-[#C5A059]/60 font-light`).
    - Active Leaf: Cormorant Garamond serif typography in pale warm gold (`text-[#FFF4D6]`).
  - **Sarimbit Premium (`tier="premium"`)**:
    - Whispered mark & micro-label: `◈ PREMIUM /` in warm ochre (`#D8B26E`).
    - Home & Trail links: Warm ochre & ivory sand (`text-[#D8B26E]`, `text-[#B8A995]`).
    - Separator: Whispered warm ochre slash (`text-[#9E7D3B]/50 font-light`).
    - Active Leaf: Clean Mori Linen geometric typography (`text-[#FAF8F5]`).
  - **Sarimbit Ekonomi (`tier="ekonomi"`)**:
    - Whispered mark & micro-label: `∎ EKONOMI /` in subtle Soga Earth (`#7C3F1D`).
    - Clean neutral tones on Mori Linen canvas.
  - **Default / General Routes**:
    - Pristine minimalist breadcrumb without tier mark (`BERANDA / KOLEKSI / ...`).

### 2. Verification Evidence
- `npm run lint`: 0 errors, 0 warnings.
- `npm run build`: Exit code 0 (Vite SSR + Oxygen bundle created in 918ms).
- Verified zero layout shift, seamless touch scroll on mobile viewports.






