# Architecture: Batik Smile Nusantara Headless Storefront

> Production runtime: Shopify Hydrogen on Oxygen (Cloudflare Workers Runtime).  
> Framework: `@shopify/hydrogen` (^2026.4.x) + React Router v7 + Tailwind CSS v4.

---

## 1. System Context & Runtime Architecture

```
[Buyer Web Browser / Mobile Device] (https://batiksmile.com)
                │
                ▼ (HTTPS / HTTP/3 Anycast via Cloudflare Edge)
[Shopify Oxygen Global Edge Network] (server.js - Worker Runtime)
   ├── Route Handler & SSR: React Router v7
   ├── UI Components & Tailwind v4 Styles
   ├── Subrequest Profiler & Edge Cache Layer (CacheLong, CacheShort)
   └── Server Session Storage (Opaque Cart Cookie)
                │
                ▼ (GraphQL Storefront API with Private Access Token)
[Shopify Core Commerce Cloud] (23ahbp-sq.myshopify.com)
   ├── Products, Variants, Inventory & Collections
   ├── Metaobjects (Hero Banners, Lookbooks) & Metafields (Tier, Furing, Filosofi)
   ├── Cart Engine & Discounts
   └── Hosted Checkout & Web Pixels (Meta CAPI)
```

---

## 2. Directory Structure

```
~/Projects/batik-smile-hydrogen/
├── app/
│   ├── assets/                # Favicon and local brand marks
│   ├── components/            # Quiet luxury UI components (Prestige/Engrasia archetype)
│   │   ├── AnnouncementBar.jsx      # Hairline top notification bar
│   │   ├── BatikOrnaments.jsx       # SVG filigree dividers & corner brackets
│   │   ├── BestSellersTabs.jsx      # "OUR BEST SELLERS" tabbed switcher (Women | Men | Sarimbit)
│   │   ├── CartDrawer.jsx           # Slide-over drawer cart with free shipping bar & tailoring notes
│   │   ├── ChooseYourBatikGrid.jsx  # "CHOOSE YOUR BATIK" 4-column raw fabric gallery
│   │   ├── CraftsmanshipZoom.jsx    # Macro trust proof cards (Furing, Sambung Saku)
│   │   ├── CustomerLoveNotes.jsx    # "LOVE NOTES FROM OUR CUSTOMER" testimonial quote slider
│   │   ├── FamilyBundleBuilder.jsx  # Multi-variant PDP bundle selector
│   │   ├── Footer.jsx               # Minimalist luxury footer
│   │   ├── Header.jsx               # Wide-tracked editorial header with drawer triggers
│   │   ├── HeritageVideoBanner.jsx  # "FINEST HANDMADE" craftsmanship video with player controls
│   │   ├── HeroEditorial.jsx        # Full-bleed lifestyle hero with scroll cue button
│   │   ├── MobileNavigation.jsx     # Sticky bottom navigation bar
│   │   ├── ShoppableLookbook.jsx    # Interactive hotspot pins on family photography
│   │   ├── ShowroomO2O.jsx          # Flagship Simongan (3 Floors) & Banyumanik Showroom
│   │   ├── StickyMobileBar.jsx      # Floating smart mobile purchase bar
│   │   ├── TierExperience.jsx       # 3-Tier interactive collection switcher (Exclusive, Premium, Ekonomis)
│   │   ├── ProductExclusiveLayout.jsx # Ultra-zoom, digital certificate, bespoke tailoring & VIP concierge modal
│   │   ├── ProductPremiumLayout.jsx   # Family bundle builder, model fit reference widget & full furing badge
│   │   ├── CollectionExclusive.jsx    # Dark champagne editorial header, 2-col expansive cards & artisan stories
│   │   ├── CollectionPremium.jsx      # Mori linen balanced grid with signature dobby badges
│   │   ├── TrustGuaranteeBar.jsx    # 4 Core Trust Pillars (Free Delivery, Tukar Size, etc.)
│   │   └── WhatsAppConcierge.jsx    # Floating concierge consultation widget
│   ├── routes/                # React Router v7 nested routes
│   │   ├── _index.jsx               # Homepage (Editorial flow)
│   │   ├── collections.$handle.jsx  # Tier-Differentiated PLP (Exclusive, Premium, Ekonomis & Raw Fabric)
│   │   ├── products.$handle.jsx     # Tier-Differentiated PDP (Exclusive vs Premium vs Standard Layouts)
│   │   ├── cart.jsx                 # Full cart page fallback
│   │   ├── pages.layanan-seragam.jsx
│   │   ├── pages.tentang-kami.jsx
│   │   ├── pages.fasilitas-store.jsx
│   │   └── pages.lokasi-toko.jsx
│   ├── styles/
│   │   ├── app.css            # Tailwind CSS v4 entry & Quiet Luxury theme tokens
│   │   └── reset.css          # CSS reset
│   └── root.jsx               # Root layout, Google Fonts (Instrument Sans + Cormorant Garamond)
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

## 3. Deployment & CI/CD Lifecycle

- **Repository**: `https://github.com/ongkipro/batik-smile-hydrogen` (Private).
- **Trigger**: Every push to `main` branch.
- **Workflow**: `.github/workflows/oxygen-deployment-1000176204.yml`
- **Build Step**: `npm ci && npx shopify hydrogen deploy`
- **Output**: Automatic live deployment to Oxygen Edge in < 60 seconds.
