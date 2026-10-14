# Batik Smile Nusantara — Headless Shopify Hydrogen Storefront

> **Butik Batik Modern & Spesialis Sarimbit Keluarga (Sejak 2007, Semarang)**  
> Built on **Shopify Hydrogen** (^2026.4.x) + **React Router v7** + **Tailwind CSS v4**  
> Deployed on **Shopify Oxygen Edge Network** (Cloudflare Workers Runtime)  
> Production Domain: **`https://batiksmile.com`** (Internal Store: `23ahbp-sq.myshopify.com`)

---

## 1. Quick Start Guide

### Prasyarat (*Prerequisites*):
- **Node.js**: Versi `22.x` atau `24.x` (disarankan via `mise` atau `nvm`)
- **Shopify CLI**: Versi `4.x+` (`npx shopify`)
- **Browser**: Chrome / Safari / Edge modern

### Langkah 1: Clone & Setup Environment

```bash
# Clone repositori (jika baru)
git clone https://github.com/ongkipro/batik-smile-hydrogen.git
cd batik-smile-hydrogen

# Salin file konfigurasi environment
cp .env.example .env
```

Pastikan file `.env` memuat kredensial Storefront API:
```env
PUBLIC_STORE_DOMAIN="23ahbp-sq.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="<your_storefront_access_token>"
PUBLIC_STOREFRONT_API_VERSION="2026-01"
PUBLIC_CHECKOUT_DOMAIN="23ahbp-sq.myshopify.com"
```

### Langkah 2: Install Dependencies

```bash
npm install
```

### Langkah 3: Menjalankan Server Development Lokal

```bash
# Jalankan Hydrogen dev server lokal (disarankan port 3001)
npm run dev -- --port 3001

# Atau sambungkan langsung ke store via Shopify CLI
npx shopify hydrogen dev --store 23ahbp-sq.myshopify.com
```

Buka browser di **`http://localhost:3001`**.

---

## 2. Command Reference

| Perintah | Deskripsi |
|---|---|
| `npm run dev -- --port 3001` | Menjalankan Hydrogen dev server lokal dengan Hot Module Replacement (HMR). |
| `npm run build` | Melakukan build production bundle untuk edge runtime Shopify Oxygen. |
| `npm run preview` | Menjalankan preview lokal dari hasil build production. |
| `npm run lint` | Melakukan audit linting ESLint pada seluruh komponen React Router. |
| `npx shopify hydrogen deploy` | Melakukan deployment manual langsung ke Shopify Oxygen Edge. |
| `npx shopify store execute -s 23ahbp-sq.myshopify.com -q "..."` | Menjalankan query/mutasi GraphQL Admin API langsung via Shopify CLI. |

---

## 3. Tech Stack & Architecture Highlights

- **Framework**: `@shopify/hydrogen` (^2026.4.x) — headless commerce framework resmi dari Shopify.
- **Routing & SSR**: React Router v7 framework mode (loaders, actions, optimistic UI, edge streaming).
- **Styling**: Tailwind CSS v4 dengan Quiet Luxury design tokens (sharp 0px borders, Mori Linen `#FAF8F5`, Obsidian `#111111`, Imperial Antique Gold `#C5A059`, Soga Matang `#7C3F1D`).
- **Typography**: Google Fonts — **Instrument Sans** (luxury wide tracking `0.18em`) & **Cormorant Garamond** (editorial serif headlines).
- **Edge Hosting & Real-Time Sync**: **Shopify Oxygen Global Edge Network** dengan `storefront.CacheShort()` (`max-age=1, stale-while-revalidate=9`) agar pembaruan Shopify Admin tersinkronisasi secara instan.
- **Data Architecture**: 100% Shopify-Native (GraphQL Storefront API, Metaobjects, dan Metafields).

---

## 4. Tier-Differentiated Commerce & 6 Core Collections

Storefront mengimplementasikan pengalaman belanja (UI/UX) dengan full-bleed cinematic background hero yang disesuaikan dengan kasta busana:

1. **Luxury Series** (`/collections/luxury-series`):
   - Aksen Obsidian Deep (`#111111`) & Imperial Antique Gold (`#C5A059`).
   - 2–3 kolom editorial card luas + kartu kisah pengrajin (*artisan stories*).
   - PDP dengan *100% Batik Indonesia*, *Lapisan Trikot* terstruktur, Ultra-Zoom serat sutra ATBM, digital certificate, dan VIP WhatsApp Concierge fitting modal.
2. **Premium Series** (`/collections/premium-series`):
   - Aksen Deep Soga Espresso (`#201610`), Soga Matang (`#7C3F1D`), & Mori Linen (`#FAF8F5`).
   - 3–4 kolom balanced boutique grid + *Lapisan Trikot* rapi & badge *Signature Dobby Timbul*.
   - PDP dengan *Family Bundle Builder* (multi-variant kemeja pria + dress wanita dalam 1 halaman).
3. **Ekonomi Series & Koleksi Spesialis** (`/collections/ekonomi-series`, `/collections/kain`, `/collections/batik-anak`, `/collections/aksesoris`):
   - Full-bleed cinematic editorial hero di seluruh 6 koleksi utama, high-speed conversion grid, dan minimalist slide-over cart drawer.

---

## 5. Dokumentasi Terkait

- **`PRD.md`**: Dokumen Spesifikasi Produk & User Journey lengkap.
- **`DESIGN.md`**: Design System, Visual Tokens, & Spesifikasi UI/UX Komponen.
- **`SCHEMA.md`**: Kontrak GraphQL Storefront API, Metaobjects, & Metafields.
- **`ARCHITECTURE.md`**: Diagram Sistem, Struktur Direktori, & Oxygen Lifecycle.
- **`TASKS.md`**: Canonical Execution Queue & Rincian Task Per Fase.
- **`STATUS.md`**: Status Delivery Ledger & Verifikasi Rilis.
- **`BUILD-LOG.md`**: Catatan Eksekusi Build, Audit, & Deployment Oxygen.
- **`DECISIONS.md`**: Architecture Decision Records (ADR-001 s/d ADR-016).
- **`OBSERVABILITY.md`**: Edge Runtime Probes, Caching, & Core Web Vitals.
- **`RELEASE.md`**: Manifest Rilis Produksi & Protokol Rollback.
- **`AUDIT-REPORT.md`**: Laporan Audit Produksi Komprehensif.

