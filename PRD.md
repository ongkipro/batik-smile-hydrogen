# PRD: Batik Smile Nusantara — Headless Shopify Hydrogen Storefront

> **Repository**: `ongkipro/batik-smile-hydrogen`  
> **Hydrogen Storefront (Production)**: `https://batiksmile.com` (and `www.batiksmile.com`)  
> **Checkout Domain (Online Store)**: `https://checkout.batiksmile.com`  
> **Customer Account Domain**: `https://account.batiksmile.com`  
> **Internal Store Domain**: `23ahbp-sq.myshopify.com`  
> **Hosting & Edge Runtime**: Shopify Oxygen Edge (Cloudflare Workers Runtime)  
> **Framework**: `@shopify/hydrogen` (^2026.4.x) + React Router v7 + Tailwind CSS v4  
> **Design Archetype**: Quiet Luxury Nusantara (Benchmarked against Engrasia / Prestige 9.3.0)

---

## 1. Executive Summary & Brand Positioning

**Batik Smile Nusantara** adalah butik batik modern dan spesialis sarimbit keluarga premium yang berdiri **Sejak 2007** di Semarang, Jawa Tengah.

### Showroom & Galeri Resmi:
- **Batik Smile Sampokong (3 Lantai)**: Jl. Simongan Raya No. 109, Pamularsih, Semarang
  - **Lantai 1**: Koleksi busana batik siap pakai (*Ready-to-Wear*) eksklusif & ruang ganti (*fitting room*) nyaman.
  - **Lantai 2**: Galeri kain batik otentik (tulis, dobby, sutra ATBM) dengan VIP lounge konsultasi pribadi.
  - **Lantai 3**: Galeri kerajinan khas & oleh-oleh premium Semarang (rotan, kalung, bros, blangkon).
- **Batik Smile Sukun**: Jl. Sukun Raya No. 23, Banyumanik, Semarang
- **Kontak Resmi**: WhatsApp Concierge `081-390-8888-09` | Instagram `@batiksmile_official` | Email `butik@batiksmile.com`

Storefront ini mengoperasikan **Dual-Engine Commercial Model & 6 Core Collections**:
1. **Ready-To-Wear (RTW) 3-Tier Collections**: Kemeja Pria, Dress/Blouse/Outer Wanita, dan Sarimbit Keluarga (`luxury-series`, `premium-series`, `ekonomi-series`).
2. **Specialist & Raw Fabric Collections ("Kain Batik", "Batik Anak", & "Aksesoris")**: Pilihan kain batik klasik hingga modern (`/collections/kain`) untuk kreasi busana personal, seragam, maupun sarimbit, serta koleksi anak (`/collections/batik-anak`) dan aksesoris etnik (`/collections/aksesoris`).

### Unique Selling Proposition (USP):
1. **Pelayanan Hangat Sepenuh Hati Sejak 2007**: Konsultasi personal yang ramah, responsif, dan terpercaya baik di showroom maupun secara online.
2. **Jasa Jahit Satuan & Seragam Tanpa Minimal Order**: Kualitas jahitan butik berstandar tinggi yang dipercaya oleh institusi besar (RS Bhayangkara, RSUD dr. Adhyatma) serta ribuan keluarga untuk wisuda, lamaran, dan resepsi.
3. **3-Tier Product & Collection Hierarchy**:
   - **Kasta I: Luxury Series** (`/collections/luxury-series` — Rp 1.250.000 – Rp 3.500.000+): Sutra Alam ATBM Halus, 100% Batik Indonesia & Lapisan Trikot. Kasta tertinggi dengan diferensiasi UI/UX bespoke VIP.
   - **Kasta II: Premium Series** (`/collections/premium-series` — Rp 650.000 – Rp 1.200.000): Tenun Dobby Timbul, 100% Batik Indonesia & Lapisan Trikot. Tampilan Quiet Luxury Soga Earth untuk resepsi dan perayaan formal.
   - **Kasta III: Ekonomi Series** (`/collections/ekonomi-series` — Rp 225.000 – Rp 550.000): 100% Katun Primisima Sanforized harian. Simpel, adem, dan terjangkau untuk silaturahmi keluarga.
   - **Aturan Koleksi**: Koleksi `luxury-series` dan `premium-series` strict terisolasi tanpa duplikasi produk lintas tier.
4. **Koleksi Kain Batik (`/collections/kain`)**: Beragam pilihan kain batik dengan motif dan warna yang memikat, mulai dari sentuhan klasik hingga desain modern—cocok untuk kreasi busana personal, seragam, maupun kebutuhan sarimbit.
5. **Kenyamanan Standar Butik**: Busana Luxury dan Premium dilapisi **Lapisan Trikot** halus dan terstruktur yang rapi serta nyaman di iklim tropis.
6. **Presisi Sambung Pola**: Potongan motif simetris di saku depan, kerah, dan belahan kancing.
7. **Concierge & Layanan O2O**: Konsultasi ukuran kustom dan pemesanan keluarga/seragam via tombol mengambang WhatsApp resmi warna hijau (`#25D366` — `081-390-8888-09`).

---

## 2. Core User Personas & Buyer Jobs

| Persona | Profil & Kebutuhan | Solusi di Storefront Hydrogen |
|---|---|---|
| **Pencinta Batik Mewah / Kolektor (30–60 th)** | Mencari kain batik tulis halus asli daerah dengan motif eksklusif untuk koleksi atau dijahit khusus. | **"Choose Your Batik" Gallery & Koleksi Kain Batik (`/collections/kain`)**: Grid kain dengan detail pengrajin, kode motif, dan konsultasi jahit butik. |
| **Ibu Rumah Tangga / Family Planner (30–50 th)** | Mencari sarimbit serasi untuk resepsi, lebaran, atau wisuda keluarga (Ayah, Ibu, Anak). Frustrasi dengan kerumitan checkout multi-halaman. | **Family Bundle Builder (PDP)**: Form multi-select ukuran seluruh anggota keluarga dalam 1 halaman + 1-Click batch add to cart. |
| **Pria Profesional / Eksekutif (28–55 th)** | Butuh kemeja batik berwibawa untuk rapat kerja, kondangan, dan acara formal. Mengutamakan kenyamanan lapisan trikot dan siluet pas. | **Koleksi Kemeja Best Sellers & Microcopy Fit**: Tab switcher cepat, fit model reference (TB/BB), dan checkout instan via Shopify. |
| **Koordinator Seragam Kantor / Panitia Nikah** | Mencari seragam instansi/keluarga besar dengan kepastian bahan, form ukur badan, dan konsultasi privat. | **Showroom O2O & Direct WhatsApp Concierge**: Konsultasi langsung ke penjahit butik via WhatsApp Concierge resmi. |

---

## 3. Information Architecture & Key Pages (Engrasia Benchmark)

```
[Storefront Root: /]
  ├── [AnnouncementBar]: Minimalist single-line notification & direct WhatsApp link
  ├── [Header]:
  │     ├── Logo: Tracked luxury serif "B A T I K  S M I L E" (Desktop left-aligned, Mobile dead-center enlarged h-10/h-11)
  │     ├── Desktop Nav: HOME | LUXURY SERIES | PREMIUM SERIES | EKONOMI SERIES | KAIN | ANAK | AKSESORIS | SHOWROOM
  │     ├── Mobile Burger Drawer: Accordion collections, cultural journals, boutique services & sticky customer account footer
  │     └── Actions:
  │           ├── Desktop: Search Trigger (Modal), Customer Account (/account), Cart Drawer / Direct Cart
  │           └── Mobile: Clean Tripartite (Hamburger Left, Center Logo, Cart Right)
  ├── [/] (Homepage Editorial Flow):
  │     ├── HeroEditorial: Full-bleed lifestyle imagery/video + centered down-arrow scroll cue
  │     ├── SarimbitBentoSection: 3 Scattered atelier moodboard cards (Luxury Series, Premium Series, Ekonomi Series)
  │     ├── BestSellersTabs: "OUR BEST SELLERS" tabbed switcher (WOMEN | MEN | SARIMBIT) in 3-col portrait grid
  │     ├── HeritageVideoBanner: "FINEST HANDMADE" craftsmanship video with player controls
  │     ├── ChooseYourBatik: "CHOOSE YOUR BATIK" 4-col raw fabric grid (Pekalongan, Solo, Cirebon)
  │     ├── ShoppableLookbook: Hotspot pins pada foto keluarga (Metaobject: lookbook_spotlight)
  │     ├── LoveNotesTestimonials: "LOVE NOTES FROM OUR CUSTOMER" quote slider
  │     ├── TrustGuarantees: 4 core pillars (Free Delivery, Tukar Size, Top Support, Secure Payment)
  │     └── ShowroomO2O: Batik Smile Sampokong (3 Lantai) & Batik Smile Sukun Semarang + Google Maps
  ├── [/collections/:handle] & [/collections/all] (Dynamic PLP — Full-Bleed Cinematic Hero Across All 6 Core Collections):
  │     ├── Pure Typographic Filter Bar (SEMUA, TERBARU, HARGA RENDAH, HARGA TINGGI + Gender & Lengan filters)
  │     ├── Full-Bleed Cinematic Dark Editorial Hero (`isCinematicHero = true` across all collections)
  │     ├── Single-Line Breadcrumb (BERANDA / KOLEKSI / [TITLE])
  │     ├── Grid-Proportional Pagination (12 items per page = 4 columns x 3 rows)
  │     ├── [Luxury Series: /collections/luxury-series]:
  │     │     ├── Dark-Luxe / Imperial Antique Gold Hero Banner (`#C5A059`)
  │     │     ├── 2-Column to 3-Column expansive editorial card layout with generous whitespace
  │     │     ├── "Mahakarya Nusantara" gold seal badge & artisan origin storytelling block
  │     │     └── Private VIP WhatsApp Concierge booking banner
  │     ├── [Premium Series: /collections/premium-series]:
  │     │     ├── Deep Soga Espresso (`#201610`) & Mori Linen (`#FAF8F5`) with Soga Matang accents (`#7C3F1D`)
  │     │     ├── 3-Column to 4-Column responsive grid with "Signature Dobby" tier badge
  │     │     └── Fast Family Sarimbit Filter & Quick Fabric Preview
  │     └── [Ekonomi Series & Specialist Collections: /collections/ekonomi-series, /collections/kain, /collections/batik-anak, /collections/aksesoris]:
  │           ├── Full-bleed cinematic editorial hero (including "Kain Batik" custom narrative)
  │           └── High-speed 4-column conversion grid on Mori Linen canvas
  ├── [/products/:handle] (Dynamic PDP — Tier-Differentiated UI/UX):
  │     ├── Mobile Touch-Swipe Gallery (snap-x horizontal scroll), 4:5 video lookbook & 4:5 vertical portrait thumbnails
  │     ├── Indonesian Rupiah currency formatting without decimals `,00` (`formatRupiah`)
  │     ├── [Luxury Tier PDP (Sutra / Mahakarya)]:
  │     │     ├── Full-bleed 4:5 vertical portrait viewer with micro-zoom & fabric drape video
  │     │     ├── Imperial Antique Gold trim badge: "100% BATIK INDONESIA • LAPISAN TRIKOT"
  │     │     ├── Sertifikat Keaslian Motif digital seal & Garansi Bahan Asli
  │     │     ├── Direct VIP Concierge Booking modal (Private fitting di Showroom / Home visit)
  │     │     └── Bespoke Tailoring measurement form & Premium Wooden Gift Box option
  │     ├── [Premium Tier PDP (Dobby / Signature)]:
  │     │     ├── Clean Quiet Luxury 4:5 vertical media gallery with thumbnail carousel
  │     │     ├── "SIGNATURE PREMIER" badge + Lapisan Trikot guarantee card
  │     │     ├── FamilyBundleBuilder (Multi-variant selector kemeja pria + dress/tunik wanita dalam 1 PDP)
  │     │     └── Interactive Model Fit Reference (TB/BB slider) + Sizing Chart drawer
  │     └── [Ekonomi / Daily Tier PDP]:
  │           ├── Minimalist 3-word product title display (`NAME [TYPE]`)
  │           ├── Rectangular variant selector pills with instant stock feedback
  │           └── Sticky Mobile Buy Bar for friction-free conversion
  ├── [Slide-Over Cart Drawer (Aside) & Dedicated /cart Page]:
  │     ├── Clean Minimalist Cart Drawer (`layout === 'aside'`): Single Subtotal row, concise note (*"Ongkos kirim & kode promo dihitung saat checkout."*), and `LANJUT KE PEMBAYARAN →` CTA
  │     ├── Dedicated 2-Column `/cart` Page: Line Items Left, Sticky Order Summary Right with discount input & checkout handoff
  │     ├── Zero-Box Streaming (Stripped nested card boxes, borders, and shadows)
  │     └── Synthetic Variant Suppression (Automatically hides `Title: Default Title`)
  ├── [In-Modal Live Predictive Search Engine] (LuxurySearchModal.jsx):
  │     ├── Pure in-modal instant search (Zero redirects to /search page)
  │     ├── 250ms debounced live search + instant Enter/CARI submit
  │     ├── Clamped limit (1..10) honoring Storefront API GraphQL constraints
  │     ├── Multi-Entity Output: Koleksi Butik Terkait, Tag Busana, Busana & Produk (4:5 portrait), Warta Budaya
  │     ├── Tabbed In-Modal Filtering: `Semua`, `Busana`, `Koleksi`, `Tag`, `Warta`
  │     └── Popular trending wastra keywords (*Daster Batik Solo*, *Sarimbit Mahakarya*, etc.)
  ├── [/*] (Modern Zero-Box 404 Experience — $.jsx):
  │     ├── Ethereal Quiet Luxury layout with oversized background watermark numeral ("404")
  │     ├── Delicate rotating/floating geometric batik diamond monogram emblem in antique gold
  │     ├── Card-free and frame-free open Mori Linen canvas
  │     ├── Two focused primary buttons (`KEMBALI KE BERANDA →`, `JELAJAHI KOLEKSI`)
  │     ├── Whispered in-modal live search trigger and WhatsApp concierge link
  │     └── Strict dual-layer SEO protection: HTML `<meta name="robots" content="noindex, nofollow" />` + HTTP `X-Robots-Tag: noindex, nofollow`
  └── [/pages/:handle]:
        ├── /pages/tentang-kami (Kisah & Filosofi Sejak 2007)
        ├── /pages/lokasi-toko (Batik Smile Sampokong & Batik Smile Sukun + Google Maps)
        ├── /pages/layanan-seragam & /pages/fasilitas-store (Retired — 301 Redirected to /pages/lokasi-toko)
        ├── /pages/contact & /pages/hubungi-kami (Customer Care & WhatsApp Concierge)
        ├── /pages/panduan-ukuran (Panduan Ukuran Pria, Wanita, Anak & Bespoke Fitting)
        ├── /pages/panduan-perawatan (Panduan Perawatan Batik Tulis, Dobby, & Sutra ATBM)
        ├── /pages/kebijakan-pengembalian (Garansi Kepuasan & Tukar Size 100%)
        ├── /pages/kebijakan-pengiriman (Kebijakan Pengiriman & Free Delivery)
        └── /pages/syarat-dan-ketentuan (Ketentuan Layanan Resmi)
  └── [/blogs/:blogHandle]:
        ├── /blogs/news (Jurnal Batik Nusantara — Index Grid 12 Artikel Editorial)
        └── /blogs/news/:articleHandle (Single Article Editorial View dengan dynamic typography prose)
```

---

## 4. Merchant Dynamic Content Engine (Shopify Metaobjects Strategy)

| Section Frontend | Tipe Metaobject | Lokasi di Shopify Admin | Field yang Dikelola Merchant |
|---|---|---|---|
| **Hero Slider & Banner Utama** | `hero_banner` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Hero Banner** | `title`, `subtitle`, `badge`, `image_desktop`, `image_mobile`, `cta_text`, `cta_link`, `video_url` |
| **Top Announcement Bar** | `announcement_bar` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Announcement Bar** | `message`, `highlight_text`, `link_url`, `whatsapp_number` |
| **Heritage Craftsmanship Video** | `heritage_video` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Heritage Video** | `subtitle`, `headline`, `video_url`, `poster_image`, `duration_text` |
| **Customer Testimonials** | `customer_testimonial` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Customer Testimonial** | `quote`, `customer_name`, `city`, `rating`, `purchased_item` |
| **Shoppable Lookbook Spotlight** | `lookbook_spotlight` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Lookbook Spotlight** | `headline`, `family_photo`, `hotspots_json` (titik pin, judul, harga, link produk) |
| **Showroom & Jam Operasional** | `showroom_info` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Showroom Info** | `city`, `address`, `hours`, `facilities`, `google_maps_url`, `whatsapp_contact` |

---

## 5. Technical Non-Negotiables

1. **Quiet Luxury Visual Standards**: Zero border radius (`0px`), uppercase tracked typography (`0.18em`), 4:5 vertical portrait aspect ratio (`aspect-[4/5]`), zero-box card streaming.
2. **100% Shopify-Native**: Semua konten dinamis dikelola via Metaobjects & Metafields tanpa ketergantungan CMS luar.
3. **Zero-Cost Edge Hosting**: Berjalan di atas **Shopify Oxygen Edge Runtime** (Cloudflare Workers platform).
4. **Dedicated Full-Page Cart (`/cart`)**: 2-Column layout dengan zero-box streaming, synthetic variant suppression, dan direct handoff ke Shopify Hosted Checkout.
5. **In-Modal Live Predictive Search**: Instan tanpa page reload, clamped limit (1..10), multi-entity output (koleksi, tag, busana, warta).
6. **Strict 404 Noindex/Nofollow**: Dual-layer SEO protection (HTML `<meta name="robots">` + HTTP `X-Robots-Tag` header).
7. **Interactive WhatsApp Concierge**: Integrasi seamless untuk konsultasi motif, fitting, dan pemesanan keluarga/seragam (`081-390-8888-09`).
