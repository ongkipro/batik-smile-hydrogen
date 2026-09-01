# Architecture: Batik Smile Nusantara Headless Storefront

> Production runtime: Shopify Hydrogen on Oxygen (Cloudflare Workers Runtime).  
> Framework: `@shopify/hydrogen` (^2026.4.x) + React Router v7 + Tailwind CSS v4.

---

## 1. System Context & Runtime Architecture

```
[Buyer Web Browser / Mobile Device]
                │
                ▼ (HTTPS / HTTP/3 Anycast)
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
│   ├── components/            # Luxury UI components
│   │   ├── AnnouncementBar.jsx
│   │   ├── BatikOrnaments.jsx # SVG filigree dividers & corner brackets
│   │   ├── CraftsmanshipZoom.jsx
│   │   ├── FamilyBundleBuilder.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HeroEditorial.jsx
│   │   ├── MegaMenu.jsx
│   │   ├── MobileNavigation.jsx
│   │   ├── ShoppableLookbook.jsx
│   │   ├── ShowroomO2O.jsx
│   │   ├── StickyMobileBar.jsx
│   │   └── TierExperience.jsx
│   ├── routes/                # React Router v7 nested routes
│   │   ├── _index.jsx         # Homepage
│   │   ├── collections.$handle.jsx # Dynamic 3-Tier PLP
│   │   ├── products.$handle.jsx    # PDP with Family Bundle & Gallery
│   │   ├── cart.jsx           # Cart page
│   │   ├── pages.layanan-seragam.jsx
│   │   ├── pages.tentang-kami.jsx
│   │   └── pages.lokasi-toko.jsx
│   ├── styles/
│   │   ├── app.css            # Tailwind CSS v4 entry & theme tokens
│   │   └── reset.css          # CSS reset
│   └── root.jsx               # Root layout, Google Fonts, Analytics Provider
├── .github/workflows/         # Official Shopify Oxygen CI/CD workflow
├── .env                       # Local environment variables (gitignored)
├── package.json               # Concrete dependencies & allowScripts
├── PRD.md                     # Product Requirements Document
├── DESIGN.md                  # Design System & Guidelines
├── SCHEMA.md                  # Shopify-Native Schema & GraphQL Contracts
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
