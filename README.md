# Batik Smile Nusantara — Headless Shopify Hydrogen Storefront

> **Butik Batik Modern & Spesialis Sarimbit Keluarga (Est. 2007, Semarang)**  
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
# Jalankan Hydrogen dev server lokal
npm run dev

# Atau sambungkan langsung ke store via Shopify CLI
npx shopify hydrogen dev --store 23ahbp-sq.myshopify.com
```

Buka browser di **`http://localhost:3000`**.

---

## 2. Command Reference

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan Hydrogen dev server lokal dengan Hot Module Replacement (HMR). |
| `npm run build` | Melakukan build production bundle untuk edge runtime Shopify Oxygen. |
| `npm run preview` | Menjalankan preview lokal dari hasil build production. |
| `npm run lint` | Melakukan audit linting ESLint pada seluruh komponen React Router. |
| `npx shopify hydrogen deploy` | Melakukan deployment manual langsung ke Shopify Oxygen Edge. |
| `npx shopify store execute -s 23ahbp-sq.myshopify.com -q "..."` | Menjalankan query/mutasi GraphQL Admin API langsung via Shopify CLI. |

---

## 3. Tech Stack & Architecture Highlights

- **Framework**: `@shopify/hydrogen` (^2026.4.x) — headless commerce framework resmi dari Shopify.
- **Routing & SSR**: React Router v7 framework mode (loaders, actions, optimistic UI, edge streaming).
- **Styling**: Tailwind CSS v4 dengan Quiet Luxury design tokens (sharp 0px borders, Mori Linen `#FAF8F5`, Obsidian `#1C1C1C`, Antique Champagne Gold `#A68A56`).
- **Typography**: Google Fonts — **Instrument Sans** (luxury wide tracking `0.18em`) & **Cormorant Garamond** (editorial serif headlines).
- **Edge Hosting**: **Shopify Oxygen Global Edge Network** (latency <50ms Anycast CDN).
- **Data Architecture**: 100% Shopify-Native (GraphQL Storefront API, Metaobjects, dan Metafields).

---

## 4. Tier-Differentiated Commerce (Exclusive vs. Premium vs. Ekonomis)

Storefront mengimplementasikan pengalaman belanja (UI/UX) yang disesuaikan dengan kasta busana:

1. **Sarimbit Exclusive** (`/collections/sarimbit-exclusive`):
   - Aksen Dark Luxe & Antique Champagne Gold (`#A68A56`).
   - 2–3 kolom editorial card luas + kartu kisah pengrajin (*artisan stories*).
   - PDP dengan Ultra-Zoom serat sutra ATBM, digital certificate, dan direct VIP WhatsApp Concierge fitting modal.
2. **Sarimbit Premium** (`/collections/sarimbit-premium`):
   - Aksen Mori Linen & Obsidian (`#1C1C1C`).
   - 3–4 kolom balanced boutique grid + badge *Signature Dobby Timbul*.
   - PDP dengan *Family Bundle Builder* (multi-variant kemeja pria + dress wanita dalam 1 halaman).
3. **Sarimbit Ekonomis & RTW** (`/collections/sarimbit-ekonomis` & RTW):
   - Aksen Neutral Sand, high-speed conversion grid, dan 1-click cart drawer.

---

## 5. Dokumentasi Terkait

- **`PRD.md`**: Dokumen Spesifikasi Produk & User Journey lengkap.
- **`DESIGN.md`**: Design System, Visual Tokens, & Spesifikasi UI/UX Komponen.
- **`SCHEMA.md`**: Kontrak GraphQL Storefront API, Metaobjects, & Metafields.
- **`ARCHITECTURE.md`**: Diagram Sistem, Struktur Direktori, & Oxygen Lifecycle.
- **`TASKS.md`**: Canonical Execution Queue & Rincian Task Per Fase.
- **`STATUS.md`**: Status Delivery Ledger & Verifikasi Rilis.
