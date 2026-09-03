# PRD: Batik Smile Nusantara — Headless Shopify Hydrogen Storefront

> **Repository**: `ongkipro/batik-smile-hydrogen`  
> **Store Domain (Internal)**: `23ahbp-sq.myshopify.com`  
> **Production Custom Domain**: `https://batiksmile.com` (and `www.batiksmile.com`)  
> **Hosting & Edge Runtime**: Shopify Oxygen Edge (Cloudflare Workers Runtime)  
> **Framework**: `@shopify/hydrogen` (^2026.4.x) + React Router v7 + Tailwind CSS v4  
> **Design Archetype**: Quiet Luxury Nusantara (Benchmarked against Engrasia / Prestige 9.3.0)

---

## 1. Executive Summary & Brand Positioning

**Batik Smile Nusantara** adalah butik batik modern dan spesialis sarimbit keluarga premium yang berdiri sejak tahun **2007** di Semarang, Jawa Tengah.

### Showroom & Galeri Resmi:
- **Flagship Showroom Simongan (3 Lantai)**: Jl. Simongan Raya No. 109, Pamularsih, Semarang
  - **Lantai 1**: Koleksi busana batik siap pakai (*Ready-to-Wear*) eksklusif & ruang ganti (*fitting room*) nyaman.
  - **Lantai 2**: Galeri kain batik otentik (tulis, dobby, sutra ATBM) dengan sofa lounge konsultasi pribadi.
  - **Lantai 3**: Galeri kerajinan khas & oleh-oleh premium Semarang (rotan, kalung, bros, blangkon).
- **Cabang Banyumanik**: Jl. Sukun Raya No. 23, Banyumanik, Semarang
- **Kontak Resmi**: WhatsApp Concierge `081-390-8888-09` | Instagram `@batiksmile.official`

Storefront ini mengoperasikan **Dual-Engine Commercial Model**:
1. **Ready-To-Wear (RTW) Collections**: Kemeja Pria, Dress/Blouse/Outer Wanita, dan Sarimbit Keluarga (3-Tier: Mahakarya, Signature, Essential).
2. **Haute Artistry & Custom Tailoring ("Kain + Jasa Jahit")**: Penjualan lembaran kain batik tulis otentik Nusantara ("Choose Your Batik") yang dapat dibeli tersendiri atau digabungkan langsung dengan layanan jahit kustom standar butik (*bespoke tailoring*).

### Unique Selling Proposition (USP):
1. **Filosofi Pelayanan 3S 1C 1T & 1H**: Senyum, Salam, Sapa, Cepat, Tanggap, dan selalu melayani dengan Hati.
2. **Jasa Jahit Satuan & Seragam Tanpa Minimal Order**: Kualitas jahitan butik berstandar tinggi yang dipercaya oleh institusi besar (RS Bhayangkara, RSUD dr. Adhyatma) serta ribuan keluarga untuk wisuda, lamaran, dan resepsi.
3. **3-Tier Product & Sarimbit Collection Hierarchy**:
   - **Kasta I: Sarimbit Exclusive** (`sarimbit-exclusive` — Rp 1.250.000 – Rp 3.500.000+): Sutra Alam ATBM Halus & Batik Tulis Prada Emas. Kasta tertinggi dengan diferensiasi UI/UX bespoke VIP.
   - **Kasta II: Sarimbit Premium** (`sarimbit-premium` — Rp 650.000 – Rp 1.200.000): Tenun Dobby Timbul & Katun Primisima Furing Pesta. Tampilan Quiet Luxury kontemporer untuk resepsi dan perayaan formal.
   - **Kasta III: Sarimbit Ekonomis** (`sarimbit-ekonomis` — Rp 225.000 – Rp 550.000): Katun Primisima Sanforized harian. Simpel, adem, dan terjangkau untuk silaturahmi keluarga.
   - **Aturan Koleksi**: Koleksi `sarimbit-exclusive` dan `sarimbit-premium` strict terisolasi tanpa duplikasi produk lintas tier.
4. **"Choose Your Batik" Raw Fabric Gallery**: Pilihan kain batik tulis asli pengrajin (Pekalongan, Cirebon, Solo, Lasem) dengan kode motif dan sertifikat keaslian.
5. **Kenyamanan Standar Butik**: Seluruh pakaian jadi dilapisi furing katun hero halus yang adem dan menyerap keringat di iklim tropis.
6. **Presisi Sambung Pola**: Potongan motif simetris di saku depan, kerah, dan belahan kancing.
7. **Concierge & Layanan O2O**: Konsultasi ukuran kustom dan pemesanan keluarga/seragam via WhatsApp Concierge interaktif (`081-390-8888-09`).

---

## 2. Core User Personas & Buyer Jobs

| Persona | Profil & Kebutuhan | Solusi di Storefront Hydrogen |
|---|---|---|
| **Pencinta Batik Mewah / Kolektor (30–60 th)** | Mencari kain batik tulis halus asli daerah dengan motif eksklusif untuk koleksi atau dijahit khusus. | **"Choose Your Batik" Gallery & Tailoring Service**: Grid kain 4 kolom dengan detail pengrajin, sertifikat motif, dan opsi jahit langsung. |
| **Ibu Rumah Tangga / Family Planner (30–50 th)** | Mencari sarimbit serasi untuk resepsi, lebaran, atau wisuda keluarga (Ayah, Ibu, Anak). Frustrasi dengan kerumitan checkout multi-halaman. | **Family Bundle Builder (PDP)**: Form multi-select ukuran seluruh anggota keluarga dalam 1 halaman + 1-Click batch add to cart. |
| **Pria Profesional / Eksekutif (28–55 th)** | Butuh kemeja batik berwibawa untuk rapat kerja, kondangan, dan acara formal. Mengutamakan kenyamanan furing dan siluet pas. | **Koleksi Kemeja Best Sellers & Microcopy Fit**: Tab switcher cepat, fit model reference (TB/BB), dan checkout instan via Shopify. |
| **Koordinator Seragam Kantor / Panitia Nikah** | Mencari seragam instansi/keluarga besar dengan kepastian bahan, form ukur badan, dan konsultasi privat. | **Halaman Layanan Seragam & Direct WhatsApp Concierge**: Konsultasi langsung ke penjahit butik dengan auto-attach katalog produk. |

---

## 3. Information Architecture & Key Pages (Engrasia Benchmark)

```
[Storefront Root: /]
  ├── [AnnouncementBar]: Minimalist single-line notification & direct WhatsApp link
  ├── [Header]:
  │     ├── Logo: Tracked luxury serif "B A T I K  S M I L E"
  │     ├── Desktop Nav: VOGUE | SARIMBIT | KAIN TULIS | JASA JAHIT | TENTANG KAMI
  │     └── Actions: User Account, Search Modal, Drawer Cart Trigger
  ├── [/] (Homepage Editorial Flow):
  │     ├── HeroEditorial: Full-bleed lifestyle imagery/video + centered down-arrow scroll cue
  │     ├── BestSellersTabs: "OUR BEST SELLERS" tabbed switcher (WOMEN | MEN | SARIMBIT) in 3-col portrait grid
  │     ├── HeritageVideoBanner: "FINEST HANDMADE" / "PROUDLY MADE IN INDONESIA" video section with player controls
  │     ├── ChooseYourBatik: "CHOOSE YOUR BATIK" 4-col raw fabric grid (Pekalongan, Solo, Cirebon)
  │     ├── ShoppableLookbook: Hotspot pins pada foto keluarga (Metaobject: lookbook_spotlight)
  │     ├── LoveNotesTestimonials: "LOVE NOTES FROM OUR CUSTOMER" quote slider
  │     ├── TrustGuarantees: 4 core pillars (Free Delivery, Tukar Size, Top Support, Secure Payment)
  │     └── ShowroomO2O: Flagship Simongan (3 Lantai) & Cabang Banyumanik Semarang
  ├── [/collections/:handle] (PLP — Tier-Differentiated UI/UX):
  │     ├── [Exclusive Collection: /collections/sarimbit-exclusive]:
  │     │     ├── Dark-Luxe / Antique Champagne Gold Hero Banner (`#A68A56`)
  │     │     ├── 2-Column to 3-Column expansive editorial card layout with generous whitespace
  │     │     ├── "Mahakarya Nusantara" gold seal badge & artisan origin storytelling block
  │     │     └── Private VIP WhatsApp Concierge booking banner
  │     ├── [Premium Collection: /collections/sarimbit-premium]:
  │     │     ├── Mori Linen canvas (`#FAF8F5`) with crisp Obsidian borders (`#1C1C1C`)
  │     │     ├── 3-Column to 4-Column responsive grid with "Signature Dobby" tier badge
  │     │     └── Fast Family Sarimbit Filter & Quick Fabric Preview Drawer
  │     └── [Standard / Ekonomis Collections]:
  │           ├── High-speed conversion grid with direct add-to-bag cues
  │           └── Regional and garment type filter chips
  ├── [/products/:handle] (PDP — Tier-Differentiated UI/UX):
  │     ├── [Exclusive Tier PDP (Sutra / Mahakarya)]:
  │     │     ├── Full-bleed 4:5 vertical portrait viewer with micro-zoom & fabric drape video
  │     │     ├── Antique Champagne Gold trim badge: "MAHAKARYA EXCLUSIVE • SUTRA ATBM"
  │     │     ├── Sertifikat Keaslian Motif digital seal & Garansi Bahan Tulis Asli
  │     │     ├── Direct VIP Concierge Booking modal (Private fitting di Showroom / Home visit)
  │     │     └── Bespoke Tailoring measurement form & Premium Wooden Gift Box option
  │     ├── [Premium Tier PDP (Dobby / Signature)]:
  │     │     ├── Clean Quiet Luxury 4:5 vertical media gallery with thumbnail carousel
  │     │     ├── "SIGNATURE PREMIER" badge + Full Furing Hero guarantee card
  │     │     ├── FamilyBundleBuilder (Multi-variant selector kemeja pria + dress/tunik wanita dalam 1 PDP)
  │     │     └── Interactive Model Fit Reference (TB/BB slider) + Sizing Chart drawer
  │     └── [Ekonomis / Daily Tier PDP]:
  │           ├── Minimalist 3-word product title display (`NAME [TYPE]`)
  │           ├── Rectangular variant selector pills with instant stock feedback
  │           └── Fast 1-click cart drawer addition
  ├── [Drawer Cart] (Prestige Slide-Over UX):
  │     ├── Free Shipping tier progress bar
  │     ├── Optimistic line quantity mutations
  │     ├── Bespoke tailoring notes field (Catatan Jahitan & Ukuran)
  │     └── Direct Shopify Hosted Checkout
  └── [/pages/:handle]:
        ├── /pages/tentang-kami (Kisah Butik Sejak 2007 & Budaya 3S 1C 1T 1H)
        ├── /pages/layanan-seragam (Layanan Jahit Kustom & Korporat Tanpa Minimal Order)
        ├── /pages/fasilitas-store (Showroom & Fasilitas Belanja 3 Lantai Simongan)
        ├── /pages/lokasi-toko (Showroom Simongan & Cabang Banyumanik Semarang)
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

1. **Quiet Luxury Visual Standards**: Zero border radius (`0px`), uppercase tracked typography (`0.18em`), 4:5 vertical portrait aspect ratio.
2. **100% Shopify-Native**: Semua konten dinamis dikelola via Metaobjects & Metafields tanpa ketergantungan CMS luar.
3. **Zero-Cost Edge Hosting**: Berjalan di atas **Shopify Oxygen Edge Runtime** (Cloudflare Workers platform).
4. **Slide-Over Drawer Cart**: Optimistic mutations tanpa layout shift, didukung free shipping threshold bar dan kolom catatan jahit custom.
5. **Interactive WhatsApp Concierge**: Integrasi seamless untuk konsultasi motif, fitting, dan pemesanan keluarga/seragam.
