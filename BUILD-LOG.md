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


