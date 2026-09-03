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









