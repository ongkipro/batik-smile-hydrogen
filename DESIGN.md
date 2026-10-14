# Design System & Guidelines: Batik Smile Nusantara

> Luxury Heritage & Anti-Slop Design System for Shopify Hydrogen.  
> Benchmarked against **Engrasia (Prestige 9.3.0 Luxury Fashion Archetype)** and authentic Indonesian Haute Horlogerie & Batik Heritage.  
> Governed by `design-taste` (Storefront Mode, VAR: 5, MOT: 4, DEN: 4).

---

## 1. Design Philosophy: "Quiet Luxury Nusantara"

Inspired by the refined minimalism of **Engrasia** blended with the warmth of Indonesian Batik Heritage:
- **Zero-Radius Precision**: Sharp `border-radius: 0px` on all buttons, input fields, and luxury containers. We reject cartoonish pill shapes in favor of architectural high-fashion edges.
- **Zero-Box & Anti-Framing Streaming**: Content flows naturally on the unbleached Mori Linen (`#FAF8F5`) surface, separated by delicate hairline dividers (`#E2DFD8`) rather than nested boxed cards, drop-shadow bezels, or boxed badges.
- **Currency Purity (`formatRupiah`)**: All prices are formatted cleanly in Indonesian Rupiah without decimals `,00` (e.g. `Rp 1.680.000`), avoiding noisy trailing zeros.
- **Micro-Tracking & Whispered Caps**: Uppercase headings, navigation links, and button labels featuring `letter-spacing: 0.18em` to `0.22em`.
- **Restraint Over Clutter**: No neon countdown timers, no aggressive spin-to-win popups, no badge pollution. White/cream space is treated as a luxury material.
- **Tactile Material Honesty**: Every product card, video banner, and fabric swatch celebrates raw texture—from canting wax drips to cotton hero furing.

---

## 2. Color System: The Quad-Harmonic Palette (Hitam • Putih • Gold • Brown)

The visual tone of Batik Smile Nusantara is founded on four timeless pillars: **Hitam** (Obsidian Wibawa), **Putih** (Mori Purity), **Gold** (Prada Emas Prestige), and **Brown** (Soga Java Heritage).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           QUAD-HARMONIC MATRIX                              │
│                                                                             │
│   HITAM (Obsidian)     PUTIH (Mori Linen)     GOLD (Prada Emas)   BROWN (Soga Java) │
│       #111111               #FAF8F5               #C5A059             #7C3F1D       │
│   Authority & Ink       Airy Canvas & Space    Royal Prestige      Artisan Earth    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### A. Semantic Color Palette

| Pillar | Token Name | Hex Code | Tailwind Token | Semantic UI Application | Contrast Ratio |
|---|---|---|---|---|---|
| **HITAM** | **Obsidian Deep** | `#111111` | `bg-[#111111]` | Dark mode canvas, Mahakarya hero banner, footer background. | 18.5:1 on white (AAA) |
| **HITAM** | **Charcoal Ink** | `#1C1C1C` | `text-[#1C1C1C]` / `bg-[#1C1C1C]` | Primary typography, active tabs, sharp 0px luxury buttons. | 16.2:1 on white (AAA) |
| **HITAM** | **Muted Graphite** | `#5A5550` | `text-[#5A5550]` | Secondary microcopy, metadata, breadcrumbs, SKU codes. | 6.8:1 on white (AA) |
| **PUTIH** | **Pure Mori** | `#FFFFFF` | `bg-white` | Product cards, elevated modals, sticky nav, drawer cart background. | Base Canvas |
| **PUTIH** | **Mori Linen** | `#FAF8F5` | `bg-[#FAF8F5]` | Default body surface (warm unbleached cotton feel, anti-sterile). | Base Canvas |
| **PUTIH** | **Sand Parchment**| `#F4EFEA` | `bg-[#F4EFEA]` | Subtle section alternation (Best Sellers, Trust Guarantee bar). | 1.1:1 vs white |
| **GOLD** | **Imperial Gold** | `#C5A059` | `text-[#C5A059]` / `border-[#C5A059]` | Logo accents, Kasta I Mahakarya badges, filigree dividers, 5-star rating. | Visual Accent |
| **GOLD** | **Deep Ochre Gold**| `#9E7D3B`| `text-[#9E7D3B]` | Text-safe gold on light backgrounds (WCAG compliant). | 4.6:1 on white (AA) |
| **GOLD** | **Champagne Mist**| `#F7F2E7` | `bg-[#F7F2E7]` | Light champagne tint for VIP tag pills & alert callouts. | Subtle Wash |
| **BROWN** | **Deep Espresso** | `#4A2E1B` | `text-[#4A2E1B]` / `bg-[#4A2E1B]` | Grounded luxury brown, tailoring tags, leather cues. | 10.4:1 on white (AAA)|
| **BROWN** | **Soga Matang** | `#7C3F1D` | `text-[#7C3F1D]` / `bg-[#7C3F1D]` | Traditional Tingi bark dye, price highlights, button hover tone. | 6.5:1 on white (AA) |
| **BROWN** | **Soga Mist** | `#E8DCD1` | `border-[#E8DCD1]` | Hairline borders between artisan cards and fabric swatches. | 1.3:1 separator |
| **UTILITY**| **Emerald Trust** | `#25D366` | `bg-[#25D366]` | High-ticket WhatsApp Concierge floating action button. | Brand Standard |

---

### B. Shopify Theme Scheme Mapping (Prestige 9.3.0 Compatible)

To align with modern luxury storefront architecture, components toggle between four pre-calibrated schemes:

1. **Scheme 1: Mori Linen (Default Daytime Storefront)**:
   - Canvas: `#FAF8F5` (Mori Linen)
   - Surface: `#FFFFFF` (Pure Mori)
   - Text: `#1C1C1C` (Charcoal Ink)
   - Accents: `#C5A059` (Imperial Gold) & `#7C3F1D` (Soga Matang)
   - Border: `#E2DFD8` (Warm Hairline)
   - Primary Action: `#1C1C1C` background with `#FFFFFF` text (hover: `#4A2E1B`)

2. **Scheme 2: Pure Studio (PLP & PDP Focus)**:
   - Canvas: `#FFFFFF` (Pure White)
   - Text: `#111111` (Deep Obsidian)
   - Price & Focus: `#7C3F1D` (Soga Matang)
   - Border: `#EAE8E4`

3. **Scheme 3: Mahakarya Obsidian Gold (Haute Heritage & Craftsmanship Video)**:
   - Canvas: `#111111` (Deep Obsidian)
   - Surface: `#1A1918` (Smoky Card)
   - Text: `#FBF9F5` (Warm Cream White)
   - Accents & Dividers: `#C5A059` (Imperial Gold)
   - Border: `rgba(197, 160, 89, 0.25)` (Hairline Gold 25%)
   - Primary Action: `#C5A059` background with `#111111` text (hover: `#DFC283`)

4. **Scheme 4: Signature Soga Earth (Signature Premium Sarimbit & Artisan Fabric Storytelling)**:
   - Canvas: `#201610` (Deep Soga Espresso) & `#281C15`
   - Surface / Cards: `#201610` with subtle `#C5A059`/40 hairline borders
   - Text: `#FAF8F5` (Mori Linen) & `#D5C8B8` (Warm Soga Sand)
   - Accents & Dividers: `#7C3F1D` (Soga Matang) & `#9E7D3B` (Deep Ochre Gold)
   - Border: `rgba(197, 160, 89, 0.40)` (Antique Gold Hairline 40%) or `#7C3F1D`/50
   - Primary Action: `#C5A059` background with `#111111` text (hover: `#DFC283`), or `#7C3F1D` (hover: `#4A2E1B`)

---

## 3. Typography Hierarchy

Pairing the clean precision of **Instrument Sans** (Prestige foundation) with the editorial authority of **Cormorant Garamond**:

```
Display & Editorial Headlines: Cormorant Garamond (Serif, Elegant, High-Heritage)
  ├── text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-wide (Hero & Manifesto)
  ├── text-2xl sm:text-3xl lg:text-4xl font-serif tracking-normal (Collection & Heritage Titles)
  └── text-xl sm:text-2xl font-serif italic (Artisan Quotes & Testimonial Excerpts)

Structural, UI, Microcopy & Buttons: Instrument Sans / Plus Jakarta Sans (Modern Geometric)
  ├── text-xs sm:text-sm font-sans uppercase tracking-[0.18em] font-medium (Nav Links, Badges, Tabs)
  ├── text-xs uppercase tracking-[0.2em] font-semibold (Buttons: border-radius 0px)
  ├── text-sm sm:text-base font-sans leading-relaxed text-neutral-700 (Product & Story Narrative)
  └── text-base sm:text-lg font-sans font-medium text-[#1C1C1C] (Price: "RP 1,680,000")
```

---

## 4. Benchmark Components from Engrasia & Batik Smile Synthesis

### A. Minimalist Editorial Header & Mobile Calibration
- **Desktop Header**:
  - Logo left-aligned (`public/brand/batik-smile-logo.png`).
  - Navigation: Clean uppercase tracking (`VOGUE` • `SARIMBIT` • `KAIN TULIS` • `JASA JAHIT` • `TENTANG KAMI`).
  - Right Actions: In-Modal Search Trigger, Customer Account (`/account`), and Direct Cart Page Link (`/cart` with counter badge).
- **Mobile Header (Tripartite & Clutter-Free)**:
  - Left: Hamburger Menu Button (`lg:hidden`).
  - Center: Dead-center enlarged brand logo (`h-10 sm:h-11 w-auto max-w-[170px] sm:max-w-[200px]`, `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`).
  - Right: Cart Badge Icon (`Link to="/cart"`).
  - Search icon hidden on mobile (accessible via mobile sticky bottom bar `MobileNavigation.jsx`).
  - Account icon hidden on mobile header; relocated as a **Sticky bottom bar** inside the burger drawer (`[AKUN SAYA & STATUS PESANAN →]`).
- **Sticky Announcement Bar**: Subtle warm cream bar with single-sentence announcement or concierge WhatsApp link (`081-390-8888-09`).

### B. Full-Bleed Editorial Hero & Ambient Media
- **Primary Banner Asset**: `public/banners/hero_editorial_banner.jpg` (16:9 editorial couple in modern tailored batik outside luxury Javanese pavilion).
- Minimalist centered down-arrow scroll anchor button (`w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md`).
- Subtle pagination dots bottom right.
- *Future Enhancement*: Wireable to Shopify Metaobject `hero_banner`.

### C. Curated Best Sellers with Tab Switching ("OUR BEST SELLERS")
- Clean category switcher: `WOMEN` | `MEN` | `SARIMBIT` with bottom underline on active tab.
- 3-column spacious desktop grid (1-2 columns mobile).
- Strict **4:5 vertical portrait aspect ratio** (`aspect-[4/5]`) for full-body garment drape.
- **Product Title Syntax**: `NAME [TYPE]` in uppercase (e.g. `ELENA [SELENDANG]`, `INHYEON [OUTER]`, `DANADIPA [KEMEJA PRIA]`).
- Clean price formatting: `RP 1,680,000` (no clutter, no loud discount stamps).

### D. Heritage Craftsmanship Video Section ("FINEST HANDMADE")
- **Primary Media Asset**: `public/banners/craftsmanship_canting_banner.jpg` (16:9 macro canting & liquid wax on Mori cloth).
- Full-width immersive background video or high-res ambient imagery demonstrating authentic canting batik tulis.
- Overlay typography:
  - Subtitle: `PROUDLY MADE IN INDONESIA` (small, wide-tracked uppercase).
  - Main headline: `FINEST HANDMADE` (large, airy serif or tracked sans).
- Subtle video controls at bottom left (`play/pause`, time indicator `0:08 / 0:18`).
- *Future Enhancement*: Wireable to Shopify Metaobject `heritage_video`.

### E. Raw Fabric Showcase ("CHOOSE YOUR BATIK")
- Dedicated 4-column grid showcasing raw artisan Kain Batik Tulis pieces before tailoring.
- Product card details:
  - Title: Region + Motif Code (e.g. `BATIK TULIS PEKALONGAN K-K25L-V-667979`, `BATIK TULIS CIREBON K-K23L-V-460309`).
  - Price: e.g. `RP 1,600,000`.
- Clear user pathway: "Beli Kain Saja" OR "Jahit dengan Jasa Tailoring Butik".

### F. Shoppable Sarimbit Lookbook Spotlight
- **Primary Media Asset**: `public/banners/sarimbit_family_banner.jpg` (16:9 family portrait in botanical courtyard).
- Interactive pulsing hotspot pins connecting directly to matching Family Sarimbit PDPs.
- *Future Enhancement*: Wireable to Shopify Metaobject `lookbook_spotlight`.

### G. Customer Love Notes & Trust Guarantees
- **Love Notes From Our Customer**: Minimalist testimonial quote carousel with author name in uppercase and pagination dots.
- **4 Core Trust Pillars** (clean hairline icon + uppercase label):
  1. `LOCAL FREE DELIVERY` (Bebas Ongkir Seluruh Nusantara)
  2. `SATISFIED OR REFUNDED` (Jaminan Kepuasan & Tukar Size)
  3. `TOP-NOTCH SUPPORT` (Konsultan Batik & Jahit Pribadi)
  4. `SECURE PAYMENTS` (Pembayaran Resmi Terenkripsi)
- **Floating WhatsApp Concierge**: Fixed bottom-right official green (`#25D366`) circular WhatsApp icon button (`w-14 h-14 rounded-full`) with direct link and modal for batik styling & bespoke measurement consultation (`081-390-8888-09`).

---

## 5. PDP & PLP Interaction Specifications

1. **PDP Media Gallery**:
   - Primary 4:5 vertical portrait viewer with zoom lens and 4:5 vertical video lookbook support.
   - Thumbnails aligned vertically or horizontally with hairline active border.
2. **Product Details & Sizing**:
   - Variant selector using clean square/rectangular pills (no rounded blobs).
   - Microcopy fit note: *"Model TB 178cm / BB 75kg mengenakan Size L • Garansi Tukar Size 100%"*.
   - Pre-order transparency: *"Pre-order products are generally shipped within 10-14 days after payment"*.
   - Fabric / Lining specification: *"100% Batik Indonesia • Dilengkapi Lapisan Trikot Halus"* (Luxury & Premium tiers).
3. **Clean Minimalist Slide-Over Cart Drawer (`layout === 'aside'`) & Dedicated `/cart` Page**:
   - **Slide-Over Cart Drawer (`Aside.jsx` + `CartSummary.jsx`)**: Streamlined minimalist footer showing only a single **Subtotal** row, a concise checkout note (*"Ongkos kirim & kode promo dihitung saat checkout."*), and a sharp **LANJUT KE PEMBAYARAN →** CTA button.
   - **Dedicated 2-Column Zero-Box Cart Page (`/cart`)**: Line items stream on the left, sticky order summary with discount code form and trust assurance on the right.
   - Zero-box Quiet Luxury streaming: Content flows directly on the unbleached Mori Linen canvas separated by hairline dividers (`#E2DFD8`).
   - Synthetic variant suppression: Automatically filters out non-informative `Title: Default Title`.

4. **In-Modal Live Predictive Search (`LuxurySearchModal.jsx`)**:
   - Zero redirects to `/search`; search queries execute in-modal with results displayed immediately.
   - 250ms debounced live search + instant Enter/CARI submit.
   - Clamped limit (1..10) strictly honoring Storefront API GraphQL constraints.
   - Multi-entity display: Koleksi Butik Terkait (collections), Tag Busana (tags), Busana & Produk (4:5 vertical portrait with `formatRupiah`), Warta Budaya (articles).
   - In-modal tabbed filtering: `Semua`, `Busana`, `Koleksi`, `Tag`, `Warta`.

---

## 6. Tier-Differentiated UI/UX Design System (Luxury vs. Premium vs. Ekonomi & Specialist)

To honor the value proposition and price tiering of Batik Smile Nusantara, storefront layouts and components adapt dynamically based on the product or collection tier (`luxury-series`, `premium-series`, `ekonomi-series`, `kain`, `batik-anak`, `aksesoris`).

### A. Visual Token Differentiation

| Token Parameter | Luxury Tier (`luxury-series`) | Premium Tier (`premium-series`) | Ekonomi & Specialist (`ekonomi-series`, `kain`, `batik-anak`, `aksesoris`) |
|---|---|---|---|
| **Accent Color** | Imperial Antique Gold (`#C5A059`) & Deep Ochre (`#9E7D3B`) | Soga Matang (`#7C3F1D`) & Deep Ochre Gold (`#9E7D3B`) | Charcoal Ink (`#1C1C1C`) & Muted Slate (`#5A5550`) |
| **Canvas / Background** | Obsidian Deep (`#111111`) or Charcoal Ink (`#1C1C1C`) with Gold hairlines | Deep Soga Espresso (`#201610`, `#281C15`) with Soga Matang & Gold hairlines | Mori Linen Light Canvas (`#FAF8F5`) with crisp `#E2DFD8` hairlines |
| **Typography Styling** | Cormorant Garamond Serif Headlines with wider tracking (`0.22em`), italicized motif names | Instrument Sans clean luxury uppercase (`0.18em`) with serif accents, text in `#FAF8F5` / `#D5C8B8` | Instrument Sans standard tracking (`0.14em`), text in `#1C1C1C` |
| **Tier Badge** | Gold-bordered badge: `MAHAKARYA EXCLUSIVE • SUTRA ATBM` (`#C5A059` on `#111111`) | Soga Gold badge: `SIGNATURE PREMIER • TENUN DOBBY` (`#FAF8F5` on `#201610`) | Minimal hairline badge: `ESSENTIAL DAILY` |
| **Border Treatment** | 0px sharp corners with subtle 1px `rgba(197, 160, 89, 0.40)` gold hairline | 0px sharp corners with 1px `rgba(197, 160, 89, 0.30)` or `#7C3F1D`/50 hairline | 0px sharp corners with subtle 1px `#E2DFD8` hairline |

### B. Collection Listing Page (PLP) Differentiation (Full-Bleed Cinematic Heroes)

All 6 core collections render a **full-bleed cinematic background hero (`isCinematicHero = true`)**:

1. **Luxury Series PLP (`/collections/luxury-series`)**:
   - **Editorial Hero Banner**: Immersive, full-width cinematic hero with dark obsidian luxury styling and gold typography: *"Koleksi Mahakarya Pasangan Sutra Alam & Batik Tulis Eksklusif"*.
   - **Expansive Grid Layout**: 2-column (desktop) / 1-column (mobile) portrait format allowing each lookbook photograph maximum visual breathing space.
   - **Artisan Narrative Cards**: Interspersed between products, highlighting maestro canting stories, philosophy of motif, and heritage authenticity.
   - **VIP Concierge Anchor**: Banner offering private showroom fitting reservations at **Batik Smile Sampokong** or **Batik Smile Sukun**.

2. **Premium Series PLP (`/collections/premium-series`)**:
   - **Deep Soga Earth Cinematic Header**: Deep Soga Espresso canvas (`#201610`) with Soga Matang accents and warm cream typography (`#FAF8F5`, `#D5C8B8`).
   - **Balanced 3-to-4 Column Grid**: Professional high-end boutique display with hover state showcasing complementary couple angles.
   - **Fabric Guarantee Micro-Badges**: Badges indicating `TENUN DOBBY TIMBUL` and `LAPISAN TRIKOT`.

3. **Ekonomi Series & Specialist PLPs (`/collections/ekonomi-series`, `/collections/kain`, `/collections/batik-anak`, `/collections/aksesoris`)**:
   - Full-bleed dark cinematic hero header (with `/collections/kain` titled **Kain Batik** and featuring curated editorial copy on motif & color versatility) followed by a high-performance 4-column grid on Mori Linen (`#FAF8F5`).

### C. Product Detail Page (PDP) Differentiation

1. **Luxury PDP Architecture (`ProductExclusiveLayout`)**:
   - **Ultra-Zoom & Video Drape**: 4:5 vertical gallery with high-resolution texture zoom highlighting real ATBM silk threads and wax crackle textures.
   - **Material Badges**: `100% Batik Indonesia` & `Lapisan Trikot`.
   - **Certificate of Authenticity**: Collapsible digital certificate detailing motif name, artisan origin, and batch authenticity code.
   - **Direct VIP WhatsApp Concierge Modal**: Prominent button inviting private fitting consultation.
   - **Bespoke Tailoring Toggle**: Interactive checkbox allowing customers to request personalized sleeve/body length alterations directly before checkout.
   - **Packaging Upgrade**: Complimentary luxury wooden gift box presentation indicator.

2. **Premium PDP Architecture (`ProductPremiumLayout`)**:
   - **Family Bundle Builder**: Interactive multi-piece selector where buyers can select male shirt size (S-XXL) and female tunik/dress size in a unified interface.
   - **Model Fit Reference Widget**: Interactive TB/BB visual scale with guidance for formal reception fitting.
   - **Lapisan Trikot Guarantee**: Prominent assurance card guaranteeing structured silhouette and tropical comfort.

3. **Standard PDP Architecture (`ProductStandardLayout`)**:
   - Clean minimalist 3-word title display, rectangular size pills, `100% Batik Indonesia` assurance, and instantaneous minimalist drawer cart slide-over.

---

## 7. Anti-Slop Visual Manifesto & Shopify Commerce Tone Rules

To prevent generic AI templates, SaaS aesthetics, and low-trust dropshipping clutter, every frontend surface in Batik Smile Nusantara must strictly comply with these rules:

### A. Anti-Slop Visual Rules (What We NEVER Do)
1. **NO Cartoonish Border Radius**: Strictly `border-radius: 0px` across all buttons, variant pills, modals, inputs, and image containers (except the official circular WhatsApp floating icon button). Architectural sharp edges only.
2. **NO Exaggerated Drop Shadows**: Reject heavy blurred SaaS shadows (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1)`). Containers are distinguished by crisp 1px hairline borders (`border: 1px solid #E5E0D8` on light, `border: 1px solid rgba(197,160,89,0.25)` on dark).
3. **NO AI Slop Gradients**: No generic purple/blue/violet tech gradients (`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`). We only use natural unbleached Mori Linen (`#FAF8F5`), Obsidian (`#111111`), Imperial Antique Gold (`#C5A059`), and Soga Java (`#7C3F1D`).
4. **NO Cheap Urgency Tactics**: No ticking countdown timers, no fake live viewer counters, no "Someone in Jakarta just bought this!" popups, and no aggressive spin-to-win wheels. Luxury trusts the buyer; it does not pressure them.
5. **NO Generic Stock Photography**: All imagery comes from authentic Batik Smile Semarang showroom and catalog shoots. Every image respects the vertical **4:5 aspect ratio (1080×1350 px)**.
6. **NO Dashed Borders (`border-dashed`)**: All borders, dividers, and card frames must be solid crisp hairlines (`border-[#E2DFD8]`, `border-[#C5A059]/40`, `border-[#7C3F1D]/50`). Dashed borders resemble coupons or draft wireframes, destroying luxury prestige.
7. **NO Tilted or Rotated Cards**: Cards sit perfectly square at `0deg` zero-radius geometry. Reject playful scrapbooking angles (`rotate-1.5`, `rotate-2`).
8. **NO Floating Clip-Art Ornaments**: Floating pseudo-traditional batik stamp vectors (e.g. `BatikCorner`) are strictly banned. Heritage is communicated through authentic physical textiles, photography, and disciplined typography.
9. **NO Boxed Breadcrumb Badges**: Breadcrumbs flow as an unboxed, fluid horizontal stream separated by whispered slashes (`/`), guaranteeing single-line responsiveness.
10. **NO Boxed Line Item Wrappers in Cart**: Cart line items stream unboxed directly on the Mori Linen canvas separated only by delicate hairlines.
11. **Vertical 4:5 Video Lookbook Protocol**:
    - Product video lookbooks must strictly preserve the 4:5 vertical proportion (`aspect-[4/5]`).
    - Video players feature whispered gold-bordered pill badges (`VIDEO LOOKBOOK`), native controls, `playsInline`, `autoPlay`, `muted`, `loop`.
    - Gallery thumbnails for video media feature centered semi-transparent dark badges (`#111111`/70) with Imperial Antique Gold play icons (`#C5A059` `▶ VIDEO`).
    - Mobile seekbar touch scrubbing must be isolated from swipe navigation to prevent accidental card switching.


### B. Shopify Commerce Tone & Interaction Conventions
1. **Dignified Luxury Microcopy (No "Buy Now / Shop Now" Slop)**:
   - Primary CTA: `TAMBAH KE BAG` or `MASUKKAN KERANJANG` (dignified, intentional).
   - High-Ticket Tailoring CTA: `KONSULTASI UKURAN & JAHIT` or `RESERVASI FITTING PRIVAT`.
   - Navigation CTA: `JELAJAHI KOLEKSI`, `LIHAT DETAIL`, `PILIH MOTIF`.
2. **Progressive Enhancement & Semantic Baseline (Dawn/Prestige Heritage)**:
   - Use semantic HTML tags: `<nav>`, `<header>`, `<main>`, `<article>`, `<dialog>`, `<form>`, `<button>`.
   - Never render a `<div onClick=...>` when a `<button>` or `<a>` is the correct semantic element.
   - Clean hydration: static editorial text and initial product grids render server-side instantly; client islands hydrate only interactive surfaces (Drawer Cart, Family Bundle Builder, Predictive Search, Image Zoom).
3. **Clean Minimalist Slide-Over Drawer Cart**:
   - Clicking bag/cart smoothly slides in from right (`translateX`).
   - Displays unboxed line items and a compact minimalist footer: **Subtotal**, concise shipping/promo note (*"Ongkos kirim & kode promo dihitung saat checkout."*), and **LANJUT KE PEMBAYARAN →** CTA.
   - Direct handoff to Shopify Hosted Checkout (`/checkout`) with zero intermediary redirect friction.
4. **Bilingual Elegance (Indonesian Warmth + Technical English)**:
   - Editorial headlines and welcoming microcopy in polished Bahasa Indonesia (*"Menenun Keanggunan Nusantara Sejak 2007"*).
   - International fashion terms remain in technical English (*Ready-to-Wear*, *Bespoke Tailoring*, *ATBM Silk*, *Pre-order*, *Quiet Luxury*).

### C. Luxury vs. Premium vs. Ekonomi Experience Matrix

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  COMMERCE EXPERIENCE HIERARCHY                                   │
├────────────────────┬─────────────────────────────┬───────────────────────────┬───────────────────┤
│ Dimensi UX         │ LUXURY SERIES               │ PREMIUM SERIES            │ EKONOMI / DAILY   │
├────────────────────┼─────────────────────────────┼───────────────────────────┼───────────────────┤
│ Target Buyer       │ Kolektor, Pejabat, Pengantin│ Resepsi, Kondangan, Kantor│ Harian, Santai    │
│ Target Collection  │ /collections/luxury-series  │ /collections/premium-ser..│ /collections/eko..│
│ Accent Tone        │ Imperial Antique Gold       │ Deep Soga & Terracotta    │ Warm Slate        │
│ Primary Action     │ Pesan / Konsultasi Fitting  │ Tambah Pasangan ke Bag    │ Masukkan Bag      │
│ Visual Breathing   │ 2 Kolom Luas (Editorial)    │ 3–4 Kolom Butik Seimbang  │ 4 Kolom Cepat     │
│ Proof of Quality   │ 100% Batik • Lapisan Trikot │ 100% Batik • Lapisan Tri..│ 100% Katun Adem   │
│ Packaging Cues     │ Luxury Wooden Gift Box      │ Premium Box Batik Smile   │ Kemasan Standar   │
└────────────────────┴─────────────────────────────┴───────────────────────────┴───────────────────┘
```

---

## 8. Authentic Brand Visual DNA & Photography Standards

Authoritative brand visual blueprint for Batik Smile Nusantara:

### A. Model Styling & Expression
1. **The "Smile" Essence**: Models display genuine, radiant smiles (*welcoming & cheerful*), embodying Batik Smile's warm hospitality since 2007.
2. **Female Styling (Hijab & Non-Hijab)**:
   - Hijab: Clean, crisp pashmina or square scarf in harmonious matching pastels or complementary tones (e.g. pastel pink for pink/red motifs, royal navy for mustard/gold motifs).
   - Bottom & Shoes: High-waist A-line black maxi skirt (`flowy maxi skirt`) or traditional jarik lilit, paired with pointed glitter kitten heels.
   - Accents: Minimalist white/silver watch, subtle ethnic chest brooch, natural fresh makeup.
3. **Male & Couple Sarimbit**:
   - Structured slim-fit cut, sharp stand-up collar, full smooth hero cotton lining.
   - Formal dark trousers and polished dress shoes.
   - Couple poses: Synchronous, affectionate, standing side-by-side with warm posture.

### B. Authentic Background Architecture
1. **Indoor Classic Modern**: Solid carved teak wood doors (*pintu jati ukir*) with antique brass handles, sheer white curtains, blue ceramic vase with dried floral arrangements, marble floors, and warm ambient light (3000K–4000K).
2. **Indoor Flagship Showroom**: Real 3-floor flagship showroom scenes (Jl. Simongan 109, Semarang) showing wooden hangers, central staircase to Floors 2 & 3, and fabric galleries.
3. **Semarang Heritage Outdoor**: Iconic cultural landmarks (e.g. Sam Poo Kong Temple with red vermillion pillars) for Mahakarya couture.

### C. Banner Composition Blueprint
- **Layout Ratio**: 60% Model/Product (right or center) + 40% Typography/Editorial Headline (left or top/bottom) ensuring zero text occlusion.
- **Color Grading**: Rich organic saturation: Deep Soga Brown, Royal Navy, Marun, Mustard Gold, and deep obsidian black.
- **Staged Local Assets**:
  - `public/brand/models/model_teak_door.jpg` (authentic model photo at teak door)
  - `public/brand/showroom/*.jpeg` (authentic 3-floor showroom photography)
