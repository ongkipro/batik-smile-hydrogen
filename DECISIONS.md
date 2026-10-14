# Architecture Decision Records: Batik Smile Nusantara

> Authoritative architectural, design, and commerce decisions for `ongkipro/batik-smile-hydrogen`.  
> Status: Canonical Record.

---

## ADR-001: Headless Shopify Hydrogen on Oxygen vs. Monolithic Liquid Theme

- **Status**: Accepted (2026-09-01)
- **Context**: Batik Smile Nusantara requires ultra-fast sub-second edge page loads, custom family bundle builders (multi-variant selection in 1 PDP), tier-differentiated PLP/PDP layouts, and interactive hotspot lookbooks that are difficult to build performantly within Shopify Liquid's server-rendered constraints.
- **Decision**: Adopt `@shopify/hydrogen` (^2026.4.x) running on React Router v7 and deployed to Shopify Oxygen Global Edge Network (Cloudflare Workers Runtime).
- **Consequences**:
  - *Positive*: Sub-50ms TTFB edge caching (`CacheLong`, `CacheShort`), zero-cost edge hosting bundled with Shopify, full React component ecosystem, and zero CMS overhead.
  - *Negative*: Developer must maintain GraphQL Storefront API queries and edge hydration manually. Liquid apps must use Storefront API or Web Pixels.

---

## ADR-002: Quiet Luxury Nusantara Design Archetype (Prestige 9.3.0 Benchmark)

- **Status**: Accepted (2026-09-03)
- **Context**: Visual references from Engrasia (`https://engrasia.com`, built on Prestige 9.3.0) and high-end Indonesian batik ateliers demand a calm, authoritative, and uncluttered aesthetic. Standard e-commerce templates rely on bright badges, discount countdowns, and bubbly pill buttons that destroy luxury brand equity.
- **Decision**: Implement the **Quiet Luxury Nusantara** design standard:
  1. Strict `border-radius: 0px` on all buttons, input fields, badges, and cards.
  2. Micro-tracking (`letter-spacing: 0.18em` to `0.22em`) on uppercase headings and navigation.
  3. Typography pairing: **Cormorant Garamond** (Editorial serif) + **Instrument Sans** (Modern geometric).
  4. Quad-Harmonic color palette: **Hitam** (`#111111` / `#1C1C1C`), **Putih** (`#FFFFFF` / `#FAF8F5`), **Gold** (`#C5A059` / `#9E7D3B`), and **Brown** (`#4A2E1B` / `#7C3F1D`).
  5. Strict 4:5 vertical portrait aspect ratio (`aspect-[4/5]`) for all garment photography.
- **Consequences**:
  - *Positive*: Instant high-fashion brand perception, high average order value (AOV) conversion, and perfect visual harmony with handcrafted batik textiles.
  - *Negative*: Requires disciplined restraint; aggressive conversion popups are prohibited.

---

## ADR-003: Dual-Engine Commerce Model (RTW + Raw Fabric & Bespoke Tailoring)

- **Status**: Accepted (2026-09-03)
- **Context**: Batik Smile operates two distinct customer journeys based on its Semarang flagship store (Lantai 1 RTW, Lantai 2 Galeri Kain & Lounge):
  1. Ready-To-Wear (RTW) shoppers wanting immediate delivery of kemeja, dress, or sarimbit.
  2. Textile connoisseurs wanting authentic Kain Batik Tulis (Pekalongan, Solo, Cirebon, Lasem) with custom tailoring (*jahit kustom tanpa minimal order*).
- **Decision**: Architecture supports dual-engine checkout:
  1. Standard RTW flow via variant selection.
  2. "Choose Your Batik" flow: buy raw fabric pieces directly OR attach bespoke tailoring service attributes into the cart line item.
- **Consequences**:
  - *Positive*: Captures both instant impulse buyers and high-ticket bespoke custom tailoring revenue.
  - *Negative*: Requires order notes and line item attributes (`_tailoring_sizing`, `_furing_choice`) passed cleanly to Shopify Checkout.

---

## ADR-004: 3-Tier Differentiated Commerce Architecture

- **Status**: Accepted (2026-09-03)
- **Context**: Products range from Rp 225.000 (daily cotton) to Rp 3.500.000+ (silk ATBM & prada gold). Presenting all products identically devalues the luxury tier and overwhelms budget shoppers.
- **Decision**: Structurally isolate collections and render specialized UI/UX components per tier:
  - **Kasta I: Exclusive** (`/collections/sarimbit-exclusive`): 2-to-3 column expansive editorial layout, Dark Champagne accents (`#A68A56`), artisan storytelling cards, and VIP WhatsApp booking banner. PDP features ultra-zoom and certificate of authenticity.
  - **Kasta II: Premium** (`/collections/sarimbit-premium`): 3-to-4 column Mori Linen balanced grid, "Signature Dobby" badges, and couple angle preview hover states. PDP features the *Family Bundle Builder*.
  - **Kasta III: Ekonomis / Daily** (`/collections/sarimbit-ekonomis` & RTW): High-speed conversion grid with direct add-to-bag cues.
- **Consequences**:
  - *Positive*: Matches buyer mindset per price point; maximizes conversion across all segments.
  - *Negative*: Strict catalog isolation required in Shopify Admin (no cross-tier duplicate handles).

---

## ADR-005: 100% Shopify-Native Dynamic Content Engine via Metaobjects

- **Status**: Accepted (2026-09-01)
- **Context**: The boutique owner and marketing team must be able to change hero banners, seasonal lookbooks, customer testimonials, and announcement bars without touching codebase files or paying for external headless CMS subscriptions (Sanity, Contentful, etc.).
- **Decision**: Map all dynamic components to native Shopify Metaobjects (`hero_banner`, `heritage_video`, `customer_testimonial`, `lookbook_spotlight`, `announcement_bar`, `showroom_info`) and product Metafields (`tier_kasta`, `fabric_origin`, `motif_code`, `material_furing`, `tailoring_eligible`).
- **Consequences**:
  - *Positive*: Zero extra monthly SaaS costs, single Shopify Admin login for staff, unified CDN asset hosting.
  - *Negative*: Requires graceful fallback defaults in React components if Metaobject records are empty.

---

## ADR-006: Canonical Custom Domain (`batiksmile.com`) & Sales Channel Publication Architecture

- **Status**: Accepted (2026-09-03)
- **Context**: The storefront operates on a custom brand domain (`https://batiksmile.com`) while routing Storefront API calls to internal Shopify myshopify subdomain (`23ahbp-sq.myshopify.com`). Products must be accessible simultaneously to the Online Store, the Headless Storefront API, and auxiliary Shopify channels.
- **Decision**:
  1. `https://batiksmile.com` (and `www.batiksmile.com`) is designated as the primary canonical production and checkout domain.
  2. `23ahbp-sq.myshopify.com` remains the internal Storefront API endpoint (`PUBLIC_STORE_DOMAIN`).
  3. All catalog products are published across all 3 active publications (`Online Store`, `Batik Smile Headless`, `Batik Smile`) via batch `publishablePublish`.
- **Consequences**:
  - *Positive*: Unified branding for buyers, zero SSL cert mismatch, seamless edge proxying via Cloudflare/Oxygen.
  - *Negative*: Domain changes must be synchronized in both Shopify Admin Domains and Cloudflare DNS records.

---

## ADR-007: Anti-Slop Visual Manifesto & Dignified Commerce Tone

- **Status**: Accepted (2026-09-03)
- **Context**: Generic AI-generated e-commerce templates rely on tacky neon countdown timers, fake live buyer popups, bubbly pill buttons, and heavy blurred drop-shadows that destroy luxury brand perception.
- **Decision**: Codify strict Anti-Slop & Dignified Commerce Rules in `DESIGN.md` (Section 7):
  1. `border-radius: 0px` strictly enforced across all elements (no bubbly blobs).
  2. Crisp 1px hairline borders (`#E5E0D8`) over blurred drop-shadows.
  3. Dignified luxury microcopy: `TAMBAH KE BAG` / `KONSULTASI UKURAN & JAHIT` (rejecting "Buy Now" / "Shop Now" slop).
  4. Prohibition of fake urgency tactics (no countdown timers, no fake scarcity popups).
  5. Authentic showroom photography strictly formatted to 4:5 vertical portrait aspect ratio.
- **Consequences**:
  - *Positive*: High trust, prestigious luxury brand equity, aligned with Engrasia / Prestige 9.3.0 benchmark.
  - *Negative*: Demands disciplined implementation; developers must resist adding default CSS framework rounded borders and generic components.

---

## ADR-008: CSS Cascade Layering (`@layer base`) for Reset Stylesheets to Prevent Utility Occlusion

- **Status**: Accepted (2026-09-03)
- **Context**: An unlayered CSS rule `a { color: inherit; }` in `reset.css` was overriding Tailwind CSS v4 `@layer utilities` classes (`.text-white`, `.text-[#C5A059]`). Under the W3C Cascade Layers specification, any unlayered style declaration takes absolute precedence over layered styles. This resulted in dark text appearing on dark buttons across the application.
- **Decision**:
  1. All reset and preflight rules in `reset.css` must be declared strictly within `@layer base`.
  2. Element-level color resets (`color: inherit`) on `a` tags must not be placed outside cascade layers.
  3. High-visibility dark CTA buttons must reinforce text contrast with explicit high-contrast classes (`!text-white hover:!text-[#111111]`).
- **Consequences**:
  - *Positive*: Tailwind utility classes work with 100% reliability, eliminating dark-on-dark button text rendering defects.
  - *Negative*: Developers must ensure all future custom global CSS rules are layered properly according to Tailwind v4 conventions.

---

## ADR-009: Real Shopify Collection Slugs & 6-Collection Tree Taxonomy Alignment

- **Status**: Accepted (2026-09-03, Updated 2026-10-14)
- **Context**: The storefront initially contained speculative mock collection handles (`sarimbit`, `sarimbit-mahakarya-heritage`, `sarimbit-signature-elegance`, `kain-batik-tulis`) and later 27 granular collection handles that fragmented discovery.
- **Decision**:
  1. The live Shopify catalog is consolidated into **6 Core Collections** (`luxury-series`, `premium-series`, `ekonomi-series`, `kain` [**Kain Batik**], `batik-anak`, `aksesoris`) plus the master catalog index (`shop`).
  2. All internal navigation links, MegaMenu entries, and query loaders point strictly to these canonical handles with optional URL filter parameters (`gender`, `sleeve`).
  3. An HTTP 301 Permanent Redirect lookup table (`LEGACY_COLLECTION_REDIRECTS` with 30+ legacy handles including `sarimbit-exclusive`, `sarimbit-premium`, `sarimbit-ekonomis`, `jarik-kain-batik`, `kain-batik-tulis`, `koleksi-kain`, `kain-batik`) is maintained in `app/routes/collections.$handle.jsx` to catch legacy bookmarks and redirect them cleanly without 404s.
  4. Product slugs with single-variant suffixes (`?Title=Default+Title`) are permanently redirected via 301 and cleaned in the client history.
- **Consequences**:
  - *Positive*: 100% HTTP 200/301 route integrity across the entire catalog; zero broken links.
  - *Negative*: Any future collection renames in Shopify Admin must be reflected in the redirect map.

---

## ADR-010: Storefront Auto-Sync via Default Edge Sub-Minute CacheShort & Stale-While-Revalidate Caching

- **Status**: Accepted (2026-09-20, Verified 2026-10-14)
- **Context**: Content, inventory, pricing, and tag updates made in Shopify Admin previously suffered from edge caching delays (up to 1 hour or 1 day under `CacheLong()`), requiring manual Cloudflare/Oxygen edge cache purges or redeployments to reflect changes.
- **Decision**:
  1. Intercept `storefront.query` within `app/lib/context.js` to automatically default all unconfigured queries to `storefront.CacheShort()` (`maxAge: 1s, staleWhileRevalidate: 9s`).
  2. In `app/entry.server.jsx`, inject edge caching headers (`Cache-Control: public, max-age=1, stale-while-revalidate=9`) into all successful SSR responses.
  3. Harmonize layout, navigation menu, collection, blog, policy, and static page loaders across `app/root.jsx` and `app/routes/*.jsx` from `CacheLong()` to `CacheShort()`.
- **Consequences**:
  - *Positive*: Storefront data updates in Shopify Admin reflect across the global Oxygen edge within seconds while retaining instant edge streaming performance for users.
  - *Negative*: Slightly increases Storefront API query traffic, well within Shopify API rate limits.

---

## ADR-011: Dual-Engine Product Media Architecture (Video Lookbook & Shopify Storefront API Media Normalization)

- **Status**: Accepted (2026-09-20)
- **Context**: Product pages originally only queried static images (`images(first: 10)` in `PRODUCT_FRAGMENT`). Products with rich video lookbooks (e.g., `sarimbit-charcoal-hitam`) could not render their high-fashion video presentations.
- **Decision**:
  1. Upgrade `PRODUCT_FRAGMENT` in `app/routes/products.$handle.jsx` to query `featuredImage` and `media(first: 15)` using Storefront API GraphQL unions (`Video`, `MediaImage`, `ExternalVideo`, `Model3d`).
  2. Implement a robust `mediaList` normalizer converting diverse media types into a unified structure `{ id, mediaContentType, url, previewImage, altText, width, height, sources }`.
  3. Build an editorial 4:5 vertical video player with native controls, `playsInline`, `autoPlay`, `muted`, `loop`, a whispered `VIDEO LOOKBOOK` pill badge, and seekbar touch protection to prevent swipe interference on touchscreens.
  4. Design Quiet Luxury video thumbnails with centered semi-transparent obsidian badges (`#111111`/70) and Imperial Antique Gold play icons (`#C5A059`).
- **Consequences**:
  - *Positive*: Provides an immersive Haute Artistry editorial lookbook experience with seamless fallback for image-only products, preserving strict 4:5 vertical proportions.
  - *Negative*: Video assets require higher bandwidth, mitigated by default muted autoplay and CDN streaming sources.

---

## ADR-012: Tri-Tier Color Space Realization (Signature Soga Earth Elevation)

- **Status**: Accepted (2026-09-20)
- **Context**: The 3-tier Sarimbit catalog (`luxury-series`, `premium-series`, `ekonomi-series`) lacked clear visual differentiation for the middle tier (Signature Premium), which previously resembled the dark obsidian palette of the top tier (Mahakarya Exclusive).
- **Decision**:
  1. Anchor the three collection tiers with distinct, authentic Nusantara luxury color palettes:
     - **Luxury Series (`luxury-series`)**: Obsidian Deep (`#111111`) + Charcoal Ink (`#1C1C1C`) + Imperial Antique Gold (`#C5A059`).
     - **Premium Series (`premium-series`)**: Deep Soga Espresso (`#201610`, `#281C15`) + Soga Matang accents (`#7C3F1D`, `#9E7D3B`) + warm Mori cream text (`#FAF8F5`, `#D5C8B8`) + delicate gold hairlines (`#C5A059`/40).
     - **Ekonomi Series (`ekonomi-series`)**: Mori Linen (`#FAF8F5`) + Charcoal Ink (`#1C1C1C`) + crisp light hairlines (`#E2DFD8`).
  2. Systematically apply the Signature Soga Earth palette across all key touchpoints: `collections.$handle.jsx`, `products.$handle.jsx`, `StickyMobileBar.jsx`, `ProductItem.jsx`, and `ProductTierStorySection.jsx`.
- **Consequences**:
  - *Positive*: Immediate visual hierarchy and storytelling that celebrates natural Javanese soga dye heritage while elevating average order value (AOV).
  - *Negative*: Requires careful token consistency across components to maintain contrast compliance.

---

## ADR-013: Mobile Viewport Stability & Anti-Auto-Zoom Engine

- **Status**: Accepted (2026-09-20)
- **Context**: On iOS Mobile Safari, focusing any input field with a font size smaller than `16px` triggers automatic viewport zooming, disorienting users and breaking the editorial aesthetic.
- **Decision**:
  1. Define a global CSS override in `app/styles/app.css` placed outside `@layer` to ensure unconditional specificity:
     `@media screen and (max-width: 768px) { input, select, textarea { font-size: 16px !important; } }`.
  2. Configure mobile filter inputs in `CollectionFilterBar.jsx` with responsive typography (`text-base sm:text-xs`).
- **Consequences**:
  - *Positive*: Permanently prevents disruptive auto-zooming on all mobile devices across search, filters, modals, and forms.
  - *Negative*: Form inputs must be designed with sufficient vertical padding to accommodate 16px font sizes cleanly on small displays.

---

## ADR-014: Zero-Dashed Anti-Slop Architectural Purge & Solid Hairline Elevation

- **Status**: Accepted (2026-09-20)
- **Context**: Dashed borders (`border-dashed`), tilted cards (`rotate-1.5`), floating clip-art ornaments (`BatikCorner`), and heavy box wrappers in cart items violated the Quiet Luxury Nusantara Design System, creating a casual, cluttered aesthetic ("design slop").
- **Decision**:
  1. Eliminate all dashed borders across `BestSellersTabs.jsx`, `ChooseYourBatikGrid.jsx`, `CollectionFilterBar.jsx`, `collections.all.jsx`, and `VipDiscountModal.jsx`, replacing them with crisp solid hairlines (`border-[#E2DFD8]`, `border-[#C5A059]/40`, `border-[#7C3F1D]/50`).
  2. Remove all floating pseudo-traditional clip-art ornaments (`BatikCorner` in `FamilyBundleBuilder.jsx`).
  3. Straighten tilted playful cards in `SarimbitBentoSection.jsx` to sharp `0deg` zero-radius geometry.
  4. Remove boxed tier tag badges from `Breadcrumb.jsx` to preserve editorial minimalism.
  5. Remove unnecessary card border wrappers from `CartLineItem.jsx` and `CartMain.jsx` for clean, unboxed streaming line items.
- **Consequences**:
  - *Positive*: Restores uncompromised high-fashion editorial prestige, strictly upholding DESIGN.md zero-radius and architectural minimalism standards.
  - *Negative*: Developers and designers must not introduce casual playful CSS decorations into the production codebase.

---

## ADR-015: Full-Bleed Cinematic Collection Heroes, Showroom Nomenclature & Retired Route Consolidation

- **Status**: Accepted (2026-10-14)
- **Context**: Collection headers needed a unified full-bleed cinematic presentation across all 6 core collections, showroom naming required standardization to **Batik Smile Sampokong** and **Batik Smile Sukun** with direct Google Maps links, material terminology needed updating from `Furing Katun Hero` to `Lapisan Trikot` and `100% Batik Indonesia`, and standalone pages `/pages/layanan-seragam` and `/pages/fasilitas-store` were retired.
- **Decision**:
  1. Enable `isCinematicHero = true` across all collections in `app/routes/collections.$handle.jsx`, rendering full-bleed background photography with dark gradient overlays for `luxury-series`, `premium-series`, `ekonomi-series`, `kain` (**Kain Batik**), `batik-anak`, and `aksesoris`.
  2. Standardize showroom names across `Footer.jsx`, `ShowroomO2O.jsx`, and `pages.lokasi-toko.jsx` to **Batik Smile Sampokong** (Jl. Simongan Raya No. 109) and **Batik Smile Sukun** (Jl. Sukun Raya No. 23) with interactive Google Maps pin links.
  3. Permanently 301-redirect `/pages/layanan-seragam` and `/pages/fasilitas-store` to `/pages/lokasi-toko` and remove their links from the footer.
  4. Replace `Furing Katun Hero` with `Lapisan Trikot` (for Luxury & Premium) and `100% Batik Asli Cap/Tulis` with `100% Batik Indonesia` across PDP and storefront copy.
- **Consequences**:
  - *Positive*: Cohesive cinematic collection entry experience, accurate showroom branding, and cleaner footer navigation.
  - *Negative*: Legacy links to retired pages rely on 301 redirects to `/pages/lokasi-toko`.

---

## ADR-016: Official WhatsApp Vector Geometry & Clean Minimalist Cart Drawer UI/UX

- **Status**: Accepted (2026-10-14)
- **Context**:
  1. Custom/truncated WhatsApp SVG paths in the footer and mobile navigation appeared distorted, and the desktop floating WhatsApp pill button (`KONSULTASI VIA WHATSAPP`) occupied excessive horizontal screen space.
  2. The slide-over Cart Drawer (`CartSummary.jsx` / `CartMain.jsx`) was visually overloaded with multi-row shipping/insurance breakdowns, a promo code form, trust badges, and payment method lists.
- **Decision**:
  1. Standardize all WhatsApp icons across `Footer.jsx`, `MobileNavigation.jsx`, `pages.lokasi-toko.jsx`, and `WhatsAppConcierge.jsx` to the complete, mathematically exact official WhatsApp SVG path (`M12.04 2c-5.46 0-9.91 4.45-9.91 9.91...`).
  2. Replace the desktop floating text pill in `WhatsAppConcierge.jsx` with a clean, universally recognizable official green (`#25D366`) circular WhatsApp icon button (`w-14 h-14 rounded-full`).
  3. Streamline the slide-over Cart Drawer (`layout === 'aside'`) in `CartSummary.jsx` and `CartMain.jsx` to display only a single **Subtotal** row, a concise checkout note (*"Ongkos kirim & kode promo dihitung saat checkout."*), and a sharp **LANJUT KE PEMBAYARAN →** CTA button.
- **Consequences**:
  - *Positive*: Crisp brand iconography, unobtrusive floating concierge trigger, and a fast, frictionless luxury Cart Drawer experience.
  - *Negative*: Discount codes are entered on the dedicated `/cart` page or directly within Shopify Hosted Checkout rather than inside the compact slide-over drawer.


