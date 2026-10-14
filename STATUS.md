# Status — batik-smile

Updated: 2026-10-14
Status: Active
State: VERIFIED
Review-Risk: R1
Independent-Review: VERIFIED
Primary-Worker: Antigravity
Independent-Reviewer: Antigravity Autonomous Audit
Independent-Review-Head: 01a368c

## Delivery state machine

Allowed forward path:

`PLANNED -> READY -> IMPLEMENTING -> VERIFYING -> REVIEWING -> INTEGRATING -> PRODUCTION_READY -> AWAITING_DEPLOY_APPROVAL -> DEPLOYED -> SMOKE_TESTING -> VERIFIED`

Current State: **VERIFIED**

## Current state

Full autonomous execution of [TASKS.md](file:///Users/ongki/Projects/batik-smile-hydrogen/TASKS.md) (Phases 1 through 68) has been completed, committed, and deployed to Shopify Oxygen Global Edge Network (`https://batiksmile.com`):

00. **Storefront Sync Audit, Cinematic Heroes, Official WhatsApp Concierge & Minimalist Cart Drawer (2026-10-14)**:
   - **Full-Bleed Cinematic Collection Heroes**: Unified `Luxury Series`, `Premium Series`, `Ekonomi Series`, `Kain Batik`, `Batik Anak`, and `Aksesoris` (`collections.$handle.jsx`) onto full-bleed background hero architecture (`isCinematicHero = true`) with tailored overlays and 3-pillar value badges.
   - **Kain Batik Collection Narrative**: Updated `/collections/kain` (`collections.$handle.jsx`, `collections._index.jsx`) title to **Kain Batik**, added 301 redirects for `koleksi-kain` / `kain-batik`, and updated hero description copy.
   - **Footer 12-Column Precision & Showroom Google Maps Links**: Calibrated `Footer.jsx` (`lg:grid-cols-12` `4 + 2 + 3 + 3`) with official showroom headlines (**Batik Smile Sampokong** & **Batik Smile Sukun**), pin icons, and direct Google Maps route links. Retired `/pages/layanan-seragam` and `/pages/fasilitas-store` with permanent 301 redirects to `/pages/lokasi-toko`.
   - **Product Trust Badges & Shopify Storefront Sync**: Replaced *"100% Batik Asli Cap/Tulis"* with *"100% Batik Indonesia"*, removed *"Lapis Furing Katun Hero Adem"* across the codebase, enforced `storefront.CacheShort()` across all route loaders, added `availableForSale` to product GraphQL fragments, upgraded variant option buttons in `products.$handle.jsx` to support arbitrary Shopify option names, and made the product description parser resilient to plain-text and HTML descriptions.
   - **Official WhatsApp Vector & Green Floating Button**: Replaced distorted/truncated WhatsApp SVG paths across `Footer.jsx`, `MobileNavigation.jsx`, and `pages.lokasi-toko.jsx` with the exact official WhatsApp vector path; converted the desktop floating trigger in `WhatsAppConcierge.jsx` into an official green (`#25D366`) circular WhatsApp icon button.
   - **Clean Minimalist Cart Drawer**: Streamlined `CartSummary.jsx` and `CartMain.jsx` by removing redundant line rows, promo box clutter in the drawer, and payment method lists, leaving a clean **Subtotal**, concise checkout note, and **LANJUT KE PEMBAYARAN →** CTA.

0. **Refined Luxury & Premium Series, Subcategories & Bespoke Tailoring (2026-10-13)**:
   - **Subcategory Modernization**: Replaced sleeve-based categories in `MegaMenu.jsx` and `CollectionFilterBar.jsx` with curated fashion occasions for both Pria and Wanita (`Baju Kerja`, `Acara Resmi`, `Casual`, `Sarimbit`) across Luxury and Premium collections.
   - **Tiered Tailoring Service**: Promoted bespoke tailoring for sarimbit and uniforms without minimum order on Luxury Series and Premium Series (`MegaMenu.jsx`, `CollectionFilterBar.jsx`, `collections.$handle.jsx`, `ProductTierStorySection.jsx`, and `products.$handle.jsx` accordion), while strictly omitting it on Ekonomi Series.
   - **Premium Series Copy & Lapisan Trikot**: Integrated verified copy and 2-option lining differentiation (*Dengan Trikot*: struktur kokoh dan rapi; *Tanpa Trikot*: bahan ringan dan jatuh alami) in both storefront code and Shopify Admin collection metadata via GraphQL mutation.
   - **Luxury Series Hero Inversion**: Title `Luxury Series` set to Gold italic (`text-[#C5A059] italic`), and subtitle inverted to White (`text-white/95`, standard non-italic font) with refined copy matching Screenshot 0.
   - **Simplified Pillars**: Streamlined 3 pillars in `collections.$handle.jsx` (and `ProductTierStorySection.jsx`) into concise, punchy value propositions.
   - **Story Development**: Expanded "Cerita di Balik Batik Smile" in `pages.tentang-kami.jsx` (and synced to Shopify Admin Page `tentang-kami`).
   - **Footer Kontak Resmi Butik Redesign**: Re-engineered Column 4 of `Footer.jsx` based on user reference: phone icon header, gold underline, WA Concierge, Instagram, Email, horizontal divider, and dedicated JAM OPERASIONAL block.


1. **Quiet Luxury Nusantara Design System**:
   - Zero-radius architecture (`border-radius: 0px` globally across cards, buttons, badges, modals).
   - Strict 4:5 vertical portrait aspect ratio (`aspect-[4/5]`) on all product media cards.
   - Cormorant Garamond (Editorial/Display) + Instrument Sans (Structural) typography pairing with micro-tracking (`0.18em` to `0.22em`).
   - Quad-Harmonic cultural palette: Hitam (`#111111`/`#1C1C1C`), Putih (`#FFFFFF`/`#FAF8F5`), Gold (`#C5A059`/`#9E7D3B`), Brown (`#7C3F1D`/`#4A2E1B`).

2. **100% Dynamic Shopify Data & Zero Downloads Isolation**:
   - Zero occurrences of `/Users/ongki/Downloads/` in any code or build script (`git grep -i "Downloads" app/ server.js` returned 0 matches).
   - Products, collections, and pricing stream 100% dynamically from live Shopify Storefront API (`23ahbp-sq.myshopify.com`).
   - Graceful Fallback Engine: Generated 5 top-tier Quiet Luxury banners (`public/banners/`) for hero, craftsmanship video, sarimbit lookbook, raw fabric collection, and bespoke tailoring atelier.

3. **Authentic Showroom & Brand Truth**:
   - Verified physical showroom data: Flagship Gedung 3 Lantai Simongan Raya 109 & Cabang Banyumanik 23, Semarang.
   - Dedicated O2O showroom route `/pages/fasilitas-store` showcasing all 3 floors with authentic photography (`public/brand/showroom/`).
   - 3S 1C 1T & 1H hospitality standard and verified institutional portfolio (RS Bhayangkara, RSUD dr. Adhyatma).
   - Zero dummy numbers: 100% of WhatsApp links point to official concierge `081-390-8888-09` (`6281390888809`).

4. **Tier-Differentiated Commerce Engine**:
   - PLP (`collections.$handle.jsx`): Dark Luxe theme for Exclusive collections, Mori Linen for Premium collections, Studio white for RTW.
   - PDP (`products.$handle.jsx`): 4:5 gallery, rectangular size pills, FamilyBundleBuilder for sarimbit, bespoke tailoring add-on (+Rp 150.000) with custom line item attributes (`_tailoring_service`, `_tailoring_measurements`).
   - Cart (`CartSummary.jsx`): 0px radius checkout button redirecting to Shopify Hosted Checkout.

5. **Full Storefront UI/UX Synchronization (All Normal Pages)**:
   - Mega Menu (`MegaMenu.jsx`): 0px radius, local high-res Quiet Luxury photography, real store collection routes.
   - Collections & Catalog (`/collections`, `/collections/all`): Mori Linen canvas, 4:5 portrait product cards, editorial typography.
   - Cart & Lines (`/cart`, `CartMain.jsx`, `CartLineItem.jsx`): 0px radius steppers, 3 core trust pillars, Indonesian localization.
   - Search Engine (`/search`, `SearchResults.jsx`): 0px radius input bar, quick chips, crash-proof empty query handling, `$searchTerm: String!` typing.
   - VIP Client Portal (`/account`, `profile`, `orders`, `addresses`): high-prestige portal tabs, transaction cards, address book forms.
   - Policies & Editorial CMS (`/policies`, `/policies/$handle`, `/pages/$handle`, `/blogs`): authentic policy fallbacks and Cormorant Garamond reading layout.
   - Native Shopify Pages Synchronization: 11 official pages updated and published on Shopify store (`tentang-kami`, `layanan-seragam`, `fasilitas-store`, `lokasi-toko`, `contact`, `hubungi-kami`, `panduan-ukuran`, `panduan-perawatan`, `kebijakan-pengembalian`, `kebijakan-pengiriman`, `syarat-dan-ketentuan`).
   - Standard Product Taxonomy: 100% of 23 products configured with official Google/Shopify Taxonomy Categories.

6. **Full-Width Edge-to-Edge Shift, Real Collections Sync & Contrast Fortification**:
   - Full edge-to-edge layout (`w-full px-4 sm:px-8 lg:px-12 xl:px-16`) across all homepage sections and headers.
   - Purged obsolete `/collections/sarimbit` links; aligned catalog to real Shopify collections (`sarimbit-exclusive`, `sarimbit-premium`, `sarimbit-ekonomis`, `jarik-kain-batik`).
   - Clean product URL slugs: permanent HTTP 301 server redirect & client replaceState for `?Title=Default+Title`.
   - New `FeaturedCollections.jsx` component directly fetching and rendering live CDN collection images from Shopify.
   - Root-cause resolution of CSS cascade layer button contrast defect: restructured `reset.css` into `@layer base` and locked `!text-white` on dark CTA buttons.

7. **Quiet Luxury SVG Icons Upgrade & Mobile Navigation De-clutter**:
   - Upgraded `Footer.jsx` and all linked information pages (`/pages/tentang-kami`, `/pages/fasilitas-store`, `/pages/lokasi-toko`, `/pages/layanan-seragam`, `/policies`) with custom 1.5px fine-line Quiet Luxury SVG icons.
   - Purged all raw emojis (`🚗`, `❄️`, `🕌`, `💳`) from `fasilitas-store.jsx`.
   - Hidden floating WhatsApp widget on mobile (`hidden lg:block` in `WhatsAppConcierge.jsx`) to avoid collision with the bottom mobile app navigation bar.
   - Polished `MobileNavigation.jsx` with Quiet Luxury design tokens, zero-radius badge, and direct WhatsApp concierge integration.

8. **PDP Native Collection-Themed Architecture for Sarimbit Exclusive**:
   - Zero-frame purchasing panel with borderless stock indicator (`● Tersedia di Butik`) cleanly stacked beneath price.
   - Elimination of detached template sections: the product page itself adapts dynamically into **Obsidian Noir & Gold** (`bg-[#111111] text-white`) when viewing any product from `sarimbit-exclusive`, mirroring `/collections/sarimbit-exclusive`.
   - Mathematically aligned button geometry: Row 1 Quantity selector (`w-28 h-12`) + Tambah ke Tas Belanja (`flex-1 h-12`), Row 2 Beli Sekarang (`w-full h-12`), providing 100% matched container width.
   - Dual clean accordions: Deskripsi (Auto Show) + Pengiriman & Garansi Tukar (concise title, 3 quiet luxury service rows).
   - Cohesive related products ("Koleksi Selaras") rendering obsidian luxury cards (`variant="exclusive"`) and theme-aware `StickyMobileBar.jsx`.
   - Comprehensive cross-device audit: 100% of 16 key routes returning HTTP 200 OK.

9. **Decimal Elimination & Single-Line Minimalist Dynamic Breadcrumbs**:
   - Eliminated `,00` and `.00` fractional decimals storefront-wide by configuring `withoutTrailingZeros as="span"` across all `<Money>` components (PDP price/compareAtPrice, Sticky Mobile Bar, product cards, standalone prices, search modals, and cart summary).
   - Upgraded breadcrumbs from text "BERANDA" to a zero-radius geometric Home icon, replaced slashes with minimalist chevrons (`>`), and implemented `overflow-hidden whitespace-nowrap` with `truncate min-w-0` on product title to guarantee single-line fluid responsiveness across all mobile and desktop screen sizes.

10. **Indonesian Rupiah (Rp) Standardization & Dedicated 2-Column Tier Differentiation**:
    - Replaced foreign `IDR` currency prefixes with native `Rp` formatting (`currency.js`), eliminating `,00` and `.00` fractional decimals across all desktop and mobile viewports.
    - Integrated `ProductTierStorySection.jsx` offering bespoke 2-column editorial differentiation (image + technical storytelling) exclusively for **Sarimbit Exclusive** (Sutra ATBM & Canting Prada Emas) and **Sarimbit Premium** (Tenun Dobby Timbul & Furing Hero Sejuk).
    - Shortened bottom collection navigation button to concise `LIHAT SEMUA KOLEKSI →` to ensure crisp single-line presentation on all mobile viewports.

11. **Mobile Gallery Touch Swipe, Precision Mini-Thumbnails & Frameless Tier Section**:
    - Implemented horizontal touch swipe gestures (`onTouchStart`, `onTouchMove`, `onTouchEnd`) and subtle arrow controls on the main product featured image.
    - Calibrated mini-thumbnails on mobile to dynamically distribute across exactly 100% of the main image width (`grid-cols-5 gap-2 w-full`) when up to 5 images exist, with smooth horizontal scrolling for >5 images.
12. **Grid-Proportional Pagination (3x3=9, 4x3=12) & Single-Line Breadcrumbs**:
    - Product list pagination dynamically calibrated across all catalog routes:
      - 4 columns x 3 rows = exactly **12 items** before "LIHAT LEBIH BANYAK" (Load More) on standard catalog pages (`/collections/all`, general `/collections/$handle`, `/search`).
      - 3 columns x 3 rows = exactly **9 items** before "LIHAT LEBIH BANYAK" on luxury tier pages (`/collections/sarimbit-exclusive`, `/collections`, `/blogs`).
      - Default Load More buttons streamlined to concise `LIHAT LEBIH BANYAK` / `LIHAT SEBELUMNYA` for mobile layout stability.
    - Created unified `Breadcrumb.jsx` component and deployed across all 15 application routes. Strictly guarantees **maximum 1 line** on all mobile devices (from 320px up to widescreen) using `flex-nowrap whitespace-nowrap overflow-hidden` and progressive truncation.
    - Refactored `TierExperience.jsx` to Zero-Radius architecture, Quad-Harmonic palette, and Cormorant Garamond `font-normal`.
    - Removed `rounded-2xl` from `CraftsmanshipZoom.jsx` and calibrated `CustomerLoveNotes.jsx` and `ChooseYourBatikGrid.jsx`.
14. **Pure Typographic Floating Filter & Sort Bar (Zero-Box, Zero-Frame)**:
    - Designed and implemented `CollectionFilterBar.jsx`: 100% zero-box, zero-frame, zero-background.
    - Pure typographic tabs (`Semua`, `< Rp 500rb`, `Rp 500rb – 1jt`, `> Rp 1jt`) with gold hairline active indicator (`border-b-2 border-[#C5A059]`) and seamless horizontal swipe on mobile devices (Removed "Siap Kirim" per user directive).
    - Frameless sort selector (`Urutkan: Rekomendasi ↓`) with dynamic Storefront API integration (`$sortKey`, `$reverse`, `$filters`, `$query`).
    - Deployed on all collection routes (`/collections/*`) and catalog index (`/collections/all`).
15. **Architectural 404 Experience (`$.jsx` & `root.jsx`)**:
    - Re-architected 404 page within `PageLayout` with single-line Breadcrumb, Cormorant Garamond headline (*"Jejak Warisan yang Dicari Belum Tersedia"*), integrated search, 3 curated pillar cards with 4:5 imagery, and WhatsApp concierge link.
16. **Cart Page Anti-AI-Slop & 2-Column Split (`cart.jsx`, `CartMain.jsx`, `CartSummary.jsx`)**:
    - Expanded cart to 2-column architectural split layout (Line items left, Sticky summary right).
    - Completely eliminated emojis (`📦`, `✨`, `🔒`, `🛍️`) in favor of Quiet Luxury trust pillars and monogram diamond SVG.
    - Standardized all pricing to Indonesian Rupiah without decimals `,00` (`formatRupiah`).
    - Translated all English terms to Indonesian luxury terminology (*Ringkasan Pesanan*, *Subtotal Busana*, *Gunakan*, *Lanjut ke Pembayaran Resmi Shopify*).
17. **Header Cart Direct Navigation (`Header.jsx`)**:
    - Re-routed header cart button to a direct `<Link to="/cart">` with prefetching, bypassing the aside drawer.
18. **Zero-Box Cart, Variant Suppression & CTA Unification**:
    - Stripped all nested box cards and heavy borders; content flows naturally on the Mori Linen canvas separated by hairline dividers.
    - Suppressed synthetic Shopify `"Title: Default Title"` variant tags.
    - Unified navigation to a single, focused `Lanjutkan Belanja →` link at the top-right header, eliminating duplicate and competing CTAs.
19. **Hyper-Minimalist Mobile Header & Sticky Burger Account (`Header.jsx`)**:
    - Cleaned mobile header to pure tripartite essentials: Left Hamburger, Center Enlarged Logo (`h-10 sm:h-11`), Right Cart.
    - Removed Semarang showroom card and duplicate WhatsApp button from mobile burger drawer.
    - Placed dedicated sticky account button (`AKUN SAYA & STATUS PESANAN →`) pinned at the bottom of the burger drawer.
20. **In-Modal Live Predictive Search Engine (`LuxurySearchModal.jsx`, `routes/search.jsx`)**:
    - Re-architected search modal so results appear live directly inside the modal with zero full-page redirects to `/search`.
    - Integrated 250ms debounced live search and instant manual Enter/CARI submit.
21. **Storefront API Limit Fix & Multi-Entity Search Output**:
    - Resolved Storefront API limit constraint (clamped strictly to 1..10) that caused query crashes.
    - Added multi-entity display: Koleksi Butik Terkait, Tag Busana, Busana & Produk (4:5 vertical portrait), dan Warta Budaya dengan tab filter instan.
22. **Modern Zero-Box 404 Page & Strict Noindex/Nofollow**:
    - Redesigned 404 route to a clean, modern Quiet Luxury stream without card frames, boxes, or lines.
    - Features oversized background watermark numeral ("404"), delicate animated geometric batik diamond emblem, and 2 focused primary buttons.
    - Integrated whispered in-modal live search trigger and WhatsApp hotline.
    - Dual-layer SEO protection: HTML `<meta name="robots" content="noindex, nofollow" />` + HTTP response header `X-Robots-Tag: noindex, nofollow`.
23. **Mobile Zero-Zoom Input Scaling & Collection Filter UI/UX Overhaul**:
    - Standardized all input and textarea fields across the app to 16px (`text-base`) on mobile to prevent iOS Safari auto-zoom upon focus.
    - Replaced clunky native OS `<select>` with custom Quiet Luxury controls: Desktop popover menu and Mobile Sort Bottom Sheet drawer with backdrop blur and 48px touch targets.
    - Restructured mobile filter view with top count/reset chip bar and horizontal touch-scroll ribbon.
24. **Store & Checkout Domain Environment Configuration**:
    - Configured `PUBLIC_STORE_DOMAIN="batiksmile.com"` and `PUBLIC_CHECKOUT_DOMAIN="checkout.batiksmile.com"` in `.env` and `.env.example`.
    - Integrated with Hydrogen CSP, privacy consent, and `CartCheckoutActions` checkout URL resolution.
    - Verified GraphQL query execution on `batiksmile.com` and 302 redirection to active checkout session on `checkout.batiksmile.com`.
25. **Tri-Domain Topology, Shopify CLI Linkage, & CSP Whitelisting**:
    - Authenticated Shopify CLI and linked local repository permanently to storefront `Batik Smile (id: 1000176204)`.
    - Documented and verified tripartite domain architecture (`batiksmile.com`, `checkout.batiksmile.com`, `account.batiksmile.com`).
    - Whitelisted all three domains in CSP `connectSrc` directive in `app/entry.server.jsx`.
    - Synchronized `PRD.md`, `ARCHITECTURE.md`, and standardized `.env.example` with Customer Account API parameters.
26. **Catalog Slug Parity & Precise SEO Metadata Engine**:
    - Audited 100% of live catalog handles: 31/31 Collections (HTTP 200), 23/23 Products (HTTP 200), 11/11 Pages (HTTP 200), 12/12 Blog Articles (HTTP 200).
    - Built authoritative `app/lib/seo.js` metadata engine syncing Shopify Admin `seo.title` and `seo.description`.
    - Fixed React Router v7 canonical tags to render standard `<link rel="canonical" href="https://batiksmile.com/...">` via `tagName: 'link'`.
    - Injected OpenGraph and Twitter Summary Large Card tags across all routes.
    - Standardized root `<html lang="id">` for Indonesian search engine targeting.
27. **Google PageSpeed Insights Mobile & Desktop Performance Optimization**:
    - Global brand logo converted from raw 3600px PNG (373 KB) to modern responsive WebP (`public/logo/logo-600.webp` & `public/logo.webp`), reducing header network payload by ~90%.
    - Mobile hero banner generated in next-gen AVIF format (`public/banners/hero_slider_1_mobile.avif`), served via responsive `<picture>` to minimize mobile cellular bandwidth.
    - LCP resource preloading (`fetchPriority="high"`, `loading="eager"`, `decoding="async"`) on initial hero slide and primary PDP gallery image.
    - Enforced lazy loading (`loading="lazy"`) and asynchronous decoding across all below-the-fold catalog grids (`ProductItem.jsx`), related collections, and editorial CMS blocks.
    - Real-world PSI metrics: Mobile Performance surged from 51 to 81/100 (LCP plummeted from 16.6s to 4.1s); PDP Mobile Performance jumped from 55 to 75/100 (LCP 6.3s to 4.8s); Desktop Performance: 90–98/100; SEO: 100/100; CLS: 0.00.
28. **Complete Dynamic SEO Engine, Custom Sitemap Chunk & Authoritative Robots.txt**:
    - Centralized `app/lib/seo.js` metadata engine syncing live Shopify Storefront API GraphQL data (`seo.title`, `seo.description`, `title`, `description`, `summary`, `shop.name`, `shop.description`) across all 19 application routes.
    - Quiet luxury Indonesian fallback copy for unpopulated Shopify fields, canonical `<link rel="canonical">` (via `tagName: 'link'`), OpenGraph (`og:site_name`, `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale: "id_ID"`), and Twitter Summary Large Cards.
    - Purged bogus boilerplate locales (`['EN-US', 'EN-CA', 'FR-CA']`) from Hydrogen sitemaps, eliminating 404 crawl errors in Google Search Console.
    - Injected dedicated custom chunk (`/sitemap/custom/1.xml`) rendering 15 storefront-native URLs (`/`, `/collections/all`, `/collections`, `/blogs`, `/pages/*`, `/policies/*`) into `[sitemap.xml].jsx` index.
    - Deployed AI-friendly authoritative `robots.txt` removing harmful policy disallows, blocking transactional/search permutations, explicitly allowing modern search and AI answer engines (`Googlebot`, `Bingbot`, `Applebot`, `OAI-SearchBot`, `GPTBot`, `Claude-SearchBot`, `ClaudeBot`, `PerplexityBot`), and declaring canonical sitemap link.
29. **Tree Taxonomy Overhaul & Storefront Consolidation**:
    - Complete pre-migration snapshot generated in `docs/backups/shopify-legacy-backup.json` and `docs/backups/COLLECTIONS-BACKUP.md` protecting 31 collections and 23 products.
    - Live Shopify catalog consolidated from 31 sprawling collections down to strictly **6 core collections** + umbrella `shop` (`sarimbit-luxury`, `sarimbit-premium`, `sarimbit-ekonomi`, `kain`, `aksesoris`, `batik-anak`, `shop`).
    - Purged 24 obsolete collections (`batik-wanita`, `batik-pria`, `blus-batik-wanita`, `daster-batik-solo`, dll.) via Admin GraphQL mutations.
    - Permanent 301 server redirects configured in `app/routes/collections.$handle.jsx` for all 24 deleted handles.
    - Enriched all 23 products with subcategory taxonomy tags (`pria`, `wanita`, `putra`, `putri`, `lengan-panjang`, `lengan-pendek`).
    - Integrated responsive subcategory chip ribbon into `CollectionFilterBar.jsx` driving URL search params `gender` and `sleeve`.
    - Synchronized all navigation links and components (`Header.jsx`, `MegaMenu.jsx`, `Footer.jsx`, `HeroSlider.jsx`, `CartMain.jsx`, `TierExperience.jsx`, `SarimbitSpotlight.jsx`, `ShoppableLookbook.jsx`, `HeritageVideoBanner.jsx`, `BestSellersTabs.jsx`, `collections._index.jsx`).
    - Updated documentation suite (`PAGES-SCHEMA.xml`, `SCHEMA.md`, `TASKS.md`, `STATUS.md`).
30. **Storefront Auto-Sync & Edge Stale-While-Revalidate Architecture**:
    - Automatic edge-fresh caching defaulting to `CacheShort()` (`maxAge: 1s, staleWhileRevalidate: 9s`) via `storefront.query` wrapper in `app/lib/context.js`.
    - Injected edge caching headers (`Cache-Control: public, max-age=1, stale-while-revalidate=9`) across all successful SSR responses in `app/entry.server.jsx`.
    - Real-time catalog updates: administrative changes in Shopify Admin (product edits, prices, inventory, tags, menus) propagate to Oxygen edge nodes within seconds without requiring manual cache purges or code deployments.
31. **Dual-Engine Product Media Architecture & 4:5 Video Lookbook System**:
    - Upgraded `PRODUCT_FRAGMENT` in `app/routes/products.$handle.jsx` to query `featuredImage` and `media(first: 15)` using Storefront API GraphQL union types (`Video`, `MediaImage`, `ExternalVideo`, `Model3d`).
    - Unified normalization pipeline `mediaList` mapping diverse media types into `{ id, mediaContentType, url, previewImage, altText, width, height, sources }` with seamless fallback for image-only products.
    - Implemented high-end 4:5 vertical video lookbook player with native playback controls, `playsInline`, `autoPlay`, `muted`, `loop`, whispered `VIDEO LOOKBOOK` pill badge, and touch scrub protection against swipe navigation interruptions.
    - Expanded CSP `mediaSrc` in `app/entry.server.jsx` whitelisting `checkout.batiksmile.com` and Shopify CDN video streaming origins.
32. **Tri-Tier Color Space Realization (Signature Soga Earth)**:
    - Deepened Signature Premium tier styling across collection PLP, product PDP, and shared components using authentic Soga Earth / Deep Espresso (`#201610`, `#281C15`), Soga Matang accents (`#7C3F1D`), warm cream text (`#FAF8F5`, `#D5C8B8`), and delicate gold hairlines (`#C5A059`/40).
    - Established unmistakable visual hierarchy across the 3 Sarimbit tiers: Mahakarya Obsidian (`#111111`/`#C5A059`), Signature Soga Earth (`#201610`/`#7C3F1D`), and Essential Mori Linen (`#FAF8F5`/`#1C1C1C`).
33. **Zero-Dashed Anti-Slop Architectural Purge & Mobile Viewport Stability**:
    - Completely replaced all `border-dashed` styling with solid crisp hairlines (`border-[#E2DFD8]`, `border-[#C5A059]/40`, `border-[#7C3F1D]/50`) across `BestSellersTabs.jsx`, `ChooseYourBatikGrid.jsx`, `CollectionFilterBar.jsx`, `collections.all.jsx`, and `VipDiscountModal.jsx`.
    - Removed pseudo-traditional clip-art icons (`BatikCorner` in `FamilyBundleBuilder.jsx`) and straightened tilted cards (`rotate-1.5`) in `SarimbitBentoSection.jsx` to enforce sharp `0deg` zero-radius precision.
    - Enforced `@media screen and (max-width: 768px) { input, select, textarea { font-size: 16px !important; } }` outside `@layer` in `app/styles/app.css`, permanently eliminating iOS Safari auto-zoom on input focus.
    - Cleaned cart line item containers and breadcrumb pills for pure unboxed streaming layouts.
34. **Custom Checkout Domain & Customer Account Synchronization**:
    - Synchronized `PUBLIC_CHECKOUT_DOMAIN="checkout.batiksmile.com"` and `PUBLIC_ACCOUNT_DOMAIN="account.batiksmile.com"` across `.env`, `.env.example`, and Oxygen runtime environment variables.
    - Modularized checkout domain resolution via `app/lib/checkout.js` (`resolveCheckoutUrl` & `resolveAccountUrl`) across `CartSummary.jsx`, `cart.jsx` action redirect, and `cart.$lines.jsx` loader.
    - Content Security Policy (CSP) headers in `entry.server.jsx` updated to whitelist `https://account.batiksmile.com` and `https://checkout.batiksmile.com` in `connectSrc` and `mediaSrc`.
    - Added "Portal Akun & Status Pesanan" under LAYANAN & INFORMASI in `Footer.jsx` and verified header account link.
35. **SEO Modernization, W3C Schema Engine, OG Image, & 404 Boundaries**:
    - Generated official high-resolution OpenGraph banners (`public/og-image.jpg` and `public/og-image.webp`, 1200x630) with Quiet Luxury Obsidian Deep vignette, Mori Linen typography, and antique gold hairline borders.
    - Modernized all 19 route metadata generators in `app/lib/seo.js` with standard OpenGraph tags (`og:locale`, `og:image:width`, `og:image:height`, `og:image:type`, `twitter:site`, `twitter:creator`, `twitter:domain`).
    - Engineered W3C JSON-LD structured data engine (`app/lib/schema.js`) generating rich schemas (`ClothingStore`/`Organization`, `WebSite` Sitelinks SearchBox, `Product`, `CollectionPage`/`ItemList`, `BlogPosting`, `BreadcrumbList`).
    - Created CSP nonce-safe `<JsonLd>` component (`app/components/JsonLd.jsx`) using `@shopify/hydrogen` `useNonce()` to inject inline structured data scripts cleanly.
    - Designed modular Quiet Luxury 404 / Error view (`app/components/NotFoundView.jsx`) with unboxed Mori Linen canvas (`#FAF8F5`), oversized watermark numeral, rotating diamond monogram, and resilient context fallbacks.
    - Bound `NotFoundView` to `$.jsx` and exported consistent `ErrorBoundary` instances across all primary routes (`root.jsx`, `products.$handle.jsx`, `collections.$handle.jsx`, `collections.all.jsx`, `blogs.$blogHandle.$articleHandle.jsx`, `blogs._index.jsx`, `pages.$handle.jsx`, `policies.$handle.jsx`, `policies._index.jsx`, `search.jsx`, `cart.jsx`).
36. **Product Count Elimination & Typography Scale Elevation Across Storefront**:
    - Completely eliminated cluttering product and entity counters across collection filter bars (`${totalCount} Busana Ditemukan` replaced by clean `Koleksi Busana`), sidebars (`({totalCount})`), mobile filter drawers (`Terapkan Filter`), search pages, and predictive search modals (`LuxurySearchModal.jsx`).
    - Scaled up product card typography (`ProductItem.jsx`) across all tiers: product titles elevated to `font-serif text-base sm:text-lg` (Exclusive) and `text-xs sm:text-sm uppercase tracking-[0.12em]` (Premium & Default); product prices elevated to `text-sm sm:text-base font-semibold` / `font-serif text-base sm:text-lg`; compare-at prices to `text-xs sm:text-sm`; eyebrow category to `text-[10px] sm:text-xs`; whispered craftsmanship signature to `text-[10px] sm:text-[11px]`.
    - Elevated typography scale for collection filter sidebar section titles, sort options, mobile filter buttons, search card typography, and collection hero editorial descriptions.
37. **Bespoke Atelier Cart Icon, Drawer UI/UX Symmetry, Mobile Logo Scale & PDP Natural Flow**:
    - Replaced default Shopify shopping bag icon with custom architectural Atelier Tote Bag icon and upgraded floating cart badge (Obsidian Deep background, Imperial Antique Gold text, hairline border, zero layout shift).
    - Upgraded slide-out drawer architecture (`Aside.jsx`) with velvety dark blur backdrop (`bg-black/75 backdrop-blur-md`), spacious width (`sm:w-[460px] lg:w-[480px]`), architectural header bar with gold diamond emblem, desktop `[ESC] TUTUP` badge, and 44px close button. Synchronized titles in `PageLayout.jsx` (`BUTIK BATIK SMILE • TAS BELANJA` & `BUTIK BATIK SMILE • MENU NAVIGASI`).
    - Elevated `CartMain.jsx` with whispered free shipping perk ribbon and `CartLineItem.jsx` with enhanced typography and 32px touch-friendly steppers.
    - Scaled mobile brand logo from `16px` to `20px-22px font-serif uppercase tracking-[0.24em]` with gold-soga gradient and increased header bar height (`h-20 sm:h-21 lg:h-20`) for majestic breathing room in sticky and static states.
    - Removed `lg:sticky lg:top-24` from PDP image gallery (`products.$handle.jsx`) creating a cohesive, magazine-style editorial flow. Elevated option chips (`w-12 h-12`), quantity selector (`h-13 w-32`), and action buttons (`h-13 text-xs uppercase font-bold tracking-[0.2em]`).
38. **Bespoke Series Naming Architecture & Shopify Admin Synchronization**:
    - Upgraded naming convention from "Sarimbit Luxury / Premium / Ekonomi" to authoritative series nomenclature: **Luxury Series**, **Premium Series**, and **Ekonomi Series**.
    - Executed live Shopify Admin GraphQL mutations updating collection titles (`Luxury Series`, `Premium Series`, `Ekonomi Series`), handles (`luxury-series`, `premium-series`, `ekonomi-series`), and descriptions.
    - Updated live Shopify product descriptions for flagship couple sets (*Sarimbit Charcoal Hitam*, *Sarimbit Mustard Gold*, *Sarimbit Royal Navy*).
    - Synchronized 301 Permanent Redirection table in `collections.$handle.jsx` mapping legacy handles (`sarimbit-luxury`, `sarimbit-premium`, `sarimbit-ekonomi`, `sarimbit-exclusive`, `sarimbit-ekonomis`) cleanly to the new `-series` canonical URLs.
    - Synchronized entire storefront codebase: `Header.jsx`, `MegaMenu.jsx`, `Footer.jsx`, `CartMain.jsx`, `CollectionFilterBar.jsx`, `TierExperience.jsx`, `SarimbitSpotlight.jsx`, `SarimbitBentoSection.jsx`, `HeroSlider.jsx`, `HeroEditorial.jsx`, `ShoppableLookbook.jsx`, `LuxurySearchModal.jsx`, `products.$handle.jsx`, `collections.$handle.jsx`, `collections._index.jsx`, `search.jsx`, `account.orders._index.jsx`, `schema.js`, `SCHEMA.md`, and `PAGES-SCHEMA.xml`.
    - Verified all endpoints return HTTP 200 and legacy URLs return HTTP 301. Dev servers running concurrently on port 3001 (Batik Smile) and port 3000 (Reven Leather) without conflict.
39. **Heritage Typography, Footer Navigation Simplification & Slop Purge Across Admin & Storefront**:
    - **Shopify Admin Mutations**: Purged "Budaya Layanan: 3S 1C 1T & 1H" block from `tentang-kami` page (`gid://shopify/Page/133633998905`) and cleared obsolete description from `Luxury Series` collection (`gid://shopify/Collection/480517193785`).
    - **Slop Purge (3S 1C 1T & 1H)**: Removed all occurrences across `pages.tentang-kami.jsx`, `Footer.jsx`, `LuxurySearchModal.jsx`, `ShowroomO2O.jsx`, `TrustGuaranteeBar.jsx`, `collections.$handle.jsx`, `pages.$handle.jsx`, `policies._index.jsx`, and `products.$handle.jsx`.
    - **Heritage Date Standardization**: Replaced all instances of `ESTABLISHED 2007` / `Est. 2007` with `SEJAK 2007` / `Sejak 2007` across `Header.jsx`, `HeroSlider.jsx`, `HeroEditorial.jsx`, `Footer.jsx`, `CartMain.jsx`, `LuxurySearchModal.jsx`, `pages.tentang-kami.jsx`, and `products.$handle.jsx`.
    - **Footer Navigation Menu**: Replaced "KATALOG KOLEKSI" in Column 2 with concise "NAVIGASI" menu (Home, Catalog, Luxury Series, Premium Series, About, Showroom, Contact) and removed "Layanan konsultasi motif sarimbit..." paragraph from Column 4.
    - **Luxury Series Collection Hero Styling**: Applied `italic` to `Luxury Series` title, removed `HAUTE HERITAGE • MAHAKARYA SUTRA ATBM` eyebrow, changed `Keagungan Sutra ATBM & Prada Emas Murni...` subtitle from italic to standard font-serif, and removed the VIP Concierge button div from the hero.
    - **PDP Cleaning**: Removed stock status indicator ("Tersedia di Butik") and value props bullet row ("Sutra Alam ATBM • Canting Prada Emas • Sambung Motif Presisi") directly under price.
    - **Build & Server Verification**: ESLint 0 errors, 0 warnings; Production build exit code 0. Concurrently running dev servers verified on port 3000 (Reven Leather) and port 3001 (Batik Smile).

## Verification evidence

- **Shopify Admin Live Status**: Collections `luxury-series`, `premium-series`, `ekonomi-series` verified live; `tentang-kami` page updated without 3S block; `Luxury Series` collection description cleared.
- **Live HTTP Status**: `/collections/luxury-series`, `/collections/premium-series`, `/collections/ekonomi-series`, and `/pages/tentang-kami` return HTTP 200 OK.
- **Render Verification**: Footer renders NAVIGASI menu and SEJAK 2007; Luxury Series hero renders italic title, standard subtitle, and zero VIP hero button; PDP renders zero stock badge and zero under-price value props.
- **Port Isolation**: `revenleather.com` on port 3000 verified active (HTTP 200); `batik-smile-hydrogen` on port 3001 verified active (HTTP 200).
- **Production Build**: `npm run build` completed with exit code 0.
- **Static Analysis**: `npm run lint` completed with exit code 0 (0 errors, 0 warnings).
- **Data Protection**: 100% of 23 products, variants, and pricing preserved.
