# PRD: Batik Smile Nusantara — Headless Shopify Hydrogen Storefront

> **Repository**: `ongkipro/batik-smile-hydrogen`  
> **Status**: Accepted & In Development  
> **Store Domain**: `23ahbp-sq.myshopify.com`  
> **Hosting & Edge Runtime**: Shopify Oxygen Edge (Cloudflare Workers Runtime)  
> **Framework**: `@shopify/hydrogen` (^2026.4.x) + React Router v7 + Tailwind CSS v4  

---

## 1. Executive Summary & Brand Positioning

**Batik Smile Nusantara** adalah butik batik modern dan spesialis sarimbit keluarga premium yang berakar di Semarang (Showroom Flagship 3 Lantai) dan Solo (Galeri Cagar Budaya Laweyan) sejak tahun 2007.

### Unique Selling Proposition (USP):
1. **3-Tier Collection Hierarchy**:
   - **Kasta I: Mahakarya Heritage** (Sutra Alam ATBM & Prada Tulis Emas — Rp 1.500.000 – Rp 3.500.000+)
   - **Kasta II: Signature Elegance** (Tenun Dobby Timbul & Desain Kontemporer — Rp 450.000 – Rp 1.200.000)
   - **Kasta III: Essential Daily** (Katun Primisima Sanforized — Rp 225.000 – Rp 450.000)
2. **Kenyamanan Standar Butik**: Seluruh kemeja pria dan dress wanita dilapisi furing katun hero halus yang adem dan menyerap keringat di iklim tropis.
3. **Presisi Sambung Pola**: Potongan motif simetris di saku depan, kerah, dan belahan kancing.
4. **Layanan O2O & Jahit Seragam**: Konsultasi custom sizing keluarga dan instansi korporat tanpa minimal order (3S 1C 1T 1H).

---

## 2. Core User Personas & Buyer Jobs

| Persona | Profil & Kebutuhan | Solusi di Storefront Hydrogen |
|---|---|---|
| **Ibu Rumah Tangga / Family Planner (30–50 th)** | Mencari sarimbit serasi untuk resepsi, lebaran, atau wisuda keluarga (Ayah, Ibu, 2 Anak). Frustrasi jika harus bolak-balik halaman produk untuk beli beda ukuran. | **Family Bundle Builder (PDP)**: 1 form multi-select untuk memilih ukuran seluruh anggota keluarga + 1-Click batch add to cart. |
| **Pria Profesional / Eksekutif (28–55 th)** | Butuh kemeja batik berwibawa untuk rapat kerja, kondangan, dan acara formal. Mengutamakan bahan adem dan furing halus. | **Koleksi Kemeja Signature Dobby & Mahakarya**: Filter ukuran cepat (S–XXL), microcopy fit model, dan checkout instan via Shopify. |
| **Koordinator Seragam Kantor / Panitia Nikah** | Mencari seragam instansi/keluarga besar puluhan potong dengan kepastian bahan, form ukur badan, dan garansi retur. | **Halaman Layanan Seragam & Quick WhatsApp**: Konsultasi langsung ke penjahit butik dengan auto-attach katalog produk. |

---

## 3. Information Architecture & Key Pages

```
[Storefront Root: /]
  ├── [AnnouncementBar]: Promo ongkir, garansi tukar size, WhatsApp CS (Metaobject: announcement_bar)
  ├── [Header & MegaMenu]: Navigasi asimetris 4 kategori + preview lookbook 4:5
  ├── [/] (Homepage):
  │     ├── HeroEditorial: Split hero wibawa + 4:5 portrait card (Metaobject: hero_banner)
  │     ├── TierExperience: 3-Tier interactive switcher (Mahakarya, Signature, Essential)
  │     ├── ShoppableLookbook: Hotspot pins pada foto keluarga (Metaobject: lookbook_spotlight)
  │     ├── CraftsmanshipZoom: 3 bukti kualitas butik (Furing, Sambung Saku, Pewarnaan)
  │     ├── Lorong Corak: Live grid produk terkurasi dari Storefront API
  │     └── ShowroomO2O: Keunggulan 3S 1C 1T 1H & peta showroom Semarang & Solo
  ├── [/collections/:handle] (PLP):
  │     └── Dynamic 3-Tier Theme Engine (Obsidian/Gold, Indigo Tarum, Mori Linen)
  ├── [/products/:handle] (PDP):
  │     ├── 4:5 Media Gallery + BatikCorner filigree
  │     ├── Variant pills + Objection snapping microcopy
  │     ├── FamilyBundleBuilder (Multi-variant Sarimbit selector)
  │     ├── Accordions (Filosofi Motif, Detail Bahan, Panduan Perawatan)
  │     └── StickyMobileBar (Floating purchase bar di HP)
  ├── [/cart] & [CartAside Drawer]:
  │     ├── Free Shipping Tier Progress Bar
  │     ├── Optimistic line quantity mutations (0ms lag)
  │     ├── Order Notes (Catatan Jahitan & Custom Size)
  │     └── Direct Shopify Checkout handoff
  └── [/pages/:handle]:
        ├── /pages/layanan-seragam (Layanan Jahit Kustom)
        ├── /pages/tentang-kami (Kisah Butik Sejak 2007)
        └── /pages/lokasi-toko (Showroom Semarang Flagship & Solo Gallery)
```

---

## 4. Merchant Dynamic Content Engine (Shopify Metaobjects Strategy)

Untuk memberikan kebebasan penuh kepada pemilik butik/marketing agar bisa **mengganti banner, promo musiman, dan konten visual tanpa menyentuh kode program**, seluruh bagian dinamis di-mapping ke **Shopify Metaobjects**:

| Section Frontend | Tipe Metaobject | Lokasi di Shopify Admin | Field yang Bisa Diganti Merchant |
|---|---|---|---|
| **Hero Slider & Banner Utama** | `hero_banner` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Hero Banner** | `title`, `subtitle`, `tier_badge`, `image` (4:5), `cta_text`, `cta_link`, `is_active` |
| **Top Announcement Bar** | `announcement_bar` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Announcement Bar** | `message`, `highlight_text`, `link_url`, `whatsapp_number` |
| **Shoppable Lookbook Spotlight** | `lookbook_spotlight` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Lookbook Spotlight** | `headline`, `family_photo` (16:9), `hotspots_json` (titik pin, nama baju, harga, handle produk) |
| **Mid-Page Promo Banner** | `promo_banner` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Promo Banner** | `badge`, `title`, `description`, `bg_image`, `button_label`, `button_url` |
| **Showroom & Jam Operasional** | `showroom_info` | **Content $\rightarrow$ Metaobjects $\rightarrow$ Showroom Info** | `city`, `address`, `hours`, `facilities`, `google_maps_url`, `whatsapp_contact` |

### Fallback Resilience Guarantee:
Setiap komponen Hydrogen dilengkapi **Graceful Fallback Defaults**. Jika Metaobject belum diisi oleh merchant atau koneksi API mengalami gangguan sementara, komponen akan menampilkan konten default butik yang elegan tanpa merusak layout atau menampilkan layar kosong.

---

## 5. Technical Non-Negotiables

1. **100% Shopify-Native**: Semua konten dinamis (Banner, Hero, Lookbook, Cerita Motif) dikelola lewat **Shopify Metaobjects** dan **Metafields**.
2. **Zero-Cost Edge Hosting**: Berjalan di atas **Shopify Oxygen Edge Runtime** (termasuk dalam langganan Shopify).
3. **Optimistic Cart UI**: Tidak ada layout shift atau spinner delay saat pembeli menambah atau mengubah jumlah baju di keranjang.
4. **Strict 4:5 Photography Ratio**: Memastikan seluruh visual model tampil proporsional layaknya majalah fashion mewah.
