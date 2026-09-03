# Architecture: Batik Smile Nusantara Headless Storefront

> Production runtime: Shopify Hydrogen on Oxygen (Cloudflare Workers Runtime).  
> Framework: `@shopify/hydrogen` (^2026.4.x) + React Router v7 + Tailwind CSS v4.

---

## 1. System Context & Runtime Architecture

```
[Buyer Web Browser / Mobile Device]
       │
       ├──► https://batiksmile.com (Shopify Oxygen Edge / Headless Storefront)
       │       ├── Route Handler & SSR: React Router v7
       │       ├── UI Components & Tailwind v4 Styles
       │       ├── Subrequest Profiler & Edge Cache Layer (CacheLong, CacheShort)
       │       └── Server Session Storage (Opaque Cart Cookie)
       │
       ├──► https://checkout.batiksmile.com (Shopify Online Store Hosted Checkout)
       │       ├── Payment Gateways & Secure Credit Card / QRIS / VA
       │       ├── Indonesian Expedition Shipping & Address Autocomplete
       │       └── Order Confirmation & Receipt Hand-off
       │
       └──► https://account.batiksmile.com (Shopify New Customer Accounts)
               ├── Passwordless OTP / Email Customer Authentication
               ├── Order History & Real-Time Tracking
               └── Address Book & Customer Profile Management
```

---

## 2. Directory Structure

```
~/Projects/batik-smile-hydrogen/
├── app/
│   ├── assets/                # Favicon and brand SVG marks
│   ├── components/            # Quiet luxury UI components (Prestige/Engrasia archetype)
│   │   ├── AnnouncementBar.jsx      # Hairline top notification bar
│   │   ├── Aside.jsx                # Global drawer & modal coordination context
│   │   ├── BatikOrnaments.jsx       # SVG filigree dividers & corner brackets
│   │   ├── BestSellersTabs.jsx      # "OUR BEST SELLERS" tabbed switcher (Women | Men | Sarimbit)
│   │   ├── CartLineItem.jsx         # Zero-box cart line item with 4:5 thumbnail & formatRupiah
│   │   ├── CartMain.jsx             # 2-Column zero-box cart page container & empty state
│   │   ├── CartSummary.jsx          # Sticky order summary, discount form & trust assurance
│   │   ├── ChooseYourBatikGrid.jsx  # "CHOOSE YOUR BATIK" 4-column raw fabric gallery
│   │   ├── CollectionExclusive.jsx  # Dark champagne editorial header, 2-col expansive cards & artisan stories
│   │   ├── CollectionFilterBar.jsx  # Pure typographic filter bar & count badge
│   │   ├── CollectionPremium.jsx    # Mori linen balanced grid with signature dobby badges
│   │   ├── CraftsmanshipZoom.jsx    # Macro trust proof cards (Furing, Sambung Saku)
│   │   ├── CustomerLoveNotes.jsx    # "LOVE NOTES FROM OUR CUSTOMER" testimonial quote slider
│   │   ├── FamilyBundleBuilder.jsx  # Multi-variant PDP bundle selector
│   │   ├── Footer.jsx               # Minimalist luxury footer
│   │   ├── Header.jsx               # Tripartite mobile header & desktop editorial navigation
│   │   ├── HeritageVideoBanner.jsx  # "FINEST HANDMADE" craftsmanship video with player controls
│   │   ├── HeroEditorial.jsx        # Full-bleed lifestyle hero with scroll cue button
│   │   ├── LuxurySearchModal.jsx    # In-modal live predictive search with multi-entity tabs
│   │   ├── MobileNavigation.jsx     # Sticky bottom mobile action bar
│   │   ├── ProductExclusiveLayout.jsx # Ultra-zoom, digital certificate, bespoke tailoring & VIP concierge modal
│   │   ├── ProductItem.jsx          # Strict 4:5 vertical portrait product card
│   │   ├── ProductPremiumLayout.jsx   # Family bundle builder, model fit reference widget & full furing badge
│   │   ├── SarimbitBentoSection.jsx # 3 Scattered atelier moodboard cards
│   │   ├── ShoppableLookbook.jsx    # Interactive hotspot pins on family photography
│   │   ├── ShowroomO2O.jsx          # Flagship Simongan (3 Floors) & Banyumanik Showroom
│   │   ├── StickyMobileBar.jsx      # Floating smart mobile purchase bar
│   │   ├── TierExperience.jsx       # 3-Tier interactive collection switcher
│   │   ├── TrustGuaranteeBar.jsx    # 4 Core Trust Pillars (Free Delivery, Tukar Size, etc.)
│   │   └── WhatsAppConcierge.jsx    # Floating concierge consultation widget
│   ├── routes/                # React Router v7 nested routes
│   │   ├── _index.jsx               # Homepage (Editorial flow)
│   │   ├── collections.$handle.jsx  # Tier-Differentiated Dynamic PLP
│   │   ├── collections.all.jsx      # All Collections Catalog with 12 items/page pagination
│   │   ├── collections._index.jsx   # All Collections Directory
│   │   ├── products.$handle.jsx     # Tier-Differentiated Dynamic PDP
│   │   ├── cart.jsx                 # Dedicated 2-column zero-box cart page
│   │   ├── search.jsx               # Predictive search loader (clamped limit 1..10)
│   │   ├── pages.layanan-seragam.jsx # Bespoke tailoring & uniform service interactive route
│   │   ├── pages.tentang-kami.jsx   # Interactive brand story & 3S 1C 1T & 1H culture
│   │   ├── pages.fasilitas-store.jsx # 3-Storey Simongan Showroom visual tour
│   │   ├── pages.lokasi-toko.jsx    # Store locator, hours & interactive Google Maps
│   │   ├── pages.$handle.jsx        # Dynamic Shopify CMS Pages fallback loader
│   │   ├── blogs._index.jsx         # All blogs directory
│   │   ├── blogs.$blogHandle._index.jsx # Jurnal Batik editorial index (12 articles grid)
│   │   ├── blogs.$blogHandle.$articleHandle.jsx # Dynamic article reader (prose typography)
│   │   ├── policies._index.jsx      # Policies directory
│   │   ├── policies.$handle.jsx     # Dynamic policy reader (Privacy, Refund, Terms, Shipping)
│   │   └── $.jsx                    # Modern zero-box 404 page (noindex, nofollow)
│   ├── styles/
│   │   ├── app.css            # Tailwind CSS v4 entry & Quiet Luxury theme tokens
│   │   └── reset.css          # CSS reset
│   ├── entry.server.jsx       # Server entry with X-Robots-Tag 404 header enforcement
│   └── root.jsx               # Root layout, Google Fonts, and ErrorBoundary
├── .github/workflows/         # Official Shopify Oxygen CI/CD workflow
├── .env                       # Local environment variables (gitignored)
├── package.json               # Concrete dependencies & allowScripts
├── PRD.md                     # Product Requirements Document
├── DESIGN.md                  # Design System & Guidelines
├── SCHEMA.md                  # Shopify-Native Schema & GraphQL Contracts
├── PAGES-SCHEMA.xml           # Authoritative XML route and coding map per page
├── ARCHITECTURE.md            # System Architecture
└── TASKS.md                   # Canonical execution queue
```

---

## 3. Headless Hydrogen Dynamic Pages Architecture

In a modern headless Shopify storefront powered by Hydrogen and React Router v7, dynamic routes form the core commerce backbone:

### A. Dynamic Product Listing Pages (PLP — `/collections/$handle` & `/collections/all`)
- **Route**: `app/routes/collections.$handle.jsx` and `app/routes/collections.all.jsx`.
- **Parameter Resolution**: Resolves `$handle` against Shopify Storefront API `collection(handle: $handle)`.
- **Sort & Filter Management**: Parses URL query parameters (`sort`, `direction`) and maps them to Storefront API `ProductCollectionSortKeys` (`BEST_SELLING`, `CREATED`, `PRICE`, `REVERSE`).
- **Grid-Proportional Pagination**: Uses cursor-based pagination clamped to **12 items per page** (`pageBy: 12`), ensuring a harmonious 4-column x 3-row desktop grid without single orphaned cards.
- **Tier Differentiation Engine**: Evaluates handle and metafields (`custom.tier_kasta`) to dynamically render specialized layouts (`CollectionExclusive` for Mahakarya, `CollectionPremium` for Dobby, standard studio for RTW).
- **Single-Line Breadcrumbs**: `BERANDA / KOLEKSI / [COLLECTION TITLE]` with uppercase tracking.

### B. Dynamic Product Detail Pages (PDP — `/products/$handle`)
- **Route**: `app/routes/products.$handle.jsx`.
- **Variant & Inventory Resolution**: Resolves `$handle` and matches selected option query parameters (`Color`, `Size`) to concrete `ProductVariant` instances with real-time `availableForSale` checks.
- **Media Presentation**: Strict 4:5 vertical portrait aspect ratio (`aspect-[4/5]`) with mobile touch-swipe (`snap-x`) gallery and thumbnail synchronization.
- **Indonesian Currency Purity**: Standardized `formatRupiah` avoiding noisy `,00` decimals.
- **Synthetic Variant Suppression**: Automatically hides generic options (`Title: Default Title`) when products have no merchant-defined options.
- **Tier-Differentiated PDP**: Renders `ProductExclusiveLayout` (gold trim, digital certificate, bespoke tailoring notes, private fitting modal) or `ProductPremiumLayout` (bundle builder, model fit reference, furing guarantee).
- **Friction-Free Mobile Conversion**: Sticky mobile purchase bar with instant variant switcher and cart handoff.

### C. Dynamic Storefront CMS Pages (`/pages/$handle`)
- **Route**: Specific high-touch routes take precedence (`pages.tentang-kami.jsx`, `pages.layanan-seragam.jsx`, `pages.fasilitas-store.jsx`, `pages.lokasi-toko.jsx`).
- **Dynamic Fallback**: `app/routes/pages.$handle.jsx` dynamically queries Shopify Storefront API `page(handle: $handle)` to render any merchant-created CMS page (e.g. `panduan-ukuran`, `kebijakan-pengembalian`) with Quiet Luxury typography prose.

### D. Dynamic Cultural Journal & Blogs (`/blogs/$blogHandle/$articleHandle`)
- **Route**: `app/routes/blogs.$blogHandle.$articleHandle.jsx`.
- **Editorial Experience**: Queries `article(handle: $articleHandle)` with author metadata, publication dates, high-resolution imagery, and clean typography prose styling.

### E. Dynamic Policies (`/policies/$handle`)
- **Route**: `app/routes/policies.$handle.jsx`.
- **Legal Compliance**: Resolves `shop.privacyPolicy`, `shop.refundPolicy`, `shop.termsOfService`, and `shop.shippingPolicy` natively from Shopify Admin settings.

### F. In-Modal Live Predictive Search (`/search` & `LuxurySearchModal.jsx`)
- **Component**: `app/components/LuxurySearchModal.jsx` coordinated by `Aside.jsx`.
- **No Page Navigation**: Eliminates full-page redirects. Results render live directly inside the modal dialog on both mobile and desktop.
- **Storefront API Clamped Limit**: Strictly enforces `limit: 1..10` to prevent Storefront API GraphQL query rejections.
- **Multi-Entity Normalization**: Returns structured collections, clickable tag chips, 4:5 portrait products, and editorial articles with tabbed in-modal filtering.

### G. Dynamic 404 Catch-All (`app/routes/$.jsx`)
- **Route**: `app/routes/$.jsx` catches all unmatched URLs.
- **Zero-Box Luxury Experience**: Ethereal layout featuring oversized background watermark numeral ("404"), delicate floating antique gold batik diamond emblem, and focused dual CTAs.
- **Dual-Layer SEO Defense**:
  1. HTML Document Meta: `<meta name="robots" content="noindex, nofollow" />`.
  2. Edge HTTP Header: `X-Robots-Tag: noindex, nofollow` automatically injected in `app/entry.server.jsx` on all 404 status codes.

---

## 4. React Router v7 Framework Mode & Single Fetch Semantics

Hydrogen runs on React Router v7 framework mode:
- **Single Fetch Data Flow**: Route loaders return plain data objects directly (`return await searchPromise`) rather than wrapping in `Response.json(...)`. This enables React Router's single fetch pipeline to serialize, stream, and populate `useFetcher` data smoothly without header conflict.
- **Edge Header Delegation**: Response status codes and headers (such as `X-Robots-Tag` and `Content-Security-Policy`) are unified and finalized at `app/entry.server.jsx`.

---

## 5. Deployment & CI/CD Lifecycle

- **Repository**: `https://github.com/ongkipro/batik-smile-hydrogen` (Private).
- **Trigger**: Every push to `main` branch.
- **Workflow**: `.github/workflows/oxygen-deployment-1000176204.yml`
- **Build Step**: `npm ci && npx shopify hydrogen deploy`
- **Output**: Automatic live deployment to Shopify Oxygen Global Edge in < 60 seconds.
