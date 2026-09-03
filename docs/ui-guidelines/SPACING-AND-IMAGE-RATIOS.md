# Standar Presisi Spacing, Padding Antar-Section & Rasio Media Gambar
**Batik Smile Nusantara — Quiet Luxury Design System Contract**

> Dokumen ini adalah panduan resmi arsitektur visual untuk seluruh halaman storefront Batik Smile (Homepage, PDP, PLP, Blog, Cart, Account, Info Pages).

---

## 1. Golden Rules Padding & Spacing Antar-Section

### A. Masalah Dead Space (Padding Stacking)
Ketika garis sekat (`border-b border-[#E2DFD8]`) dihilangkan agar halaman terasa menyatu (*seamless*), penggunaan `py-20 sm:py-28` pada section-section yang bersebelahan akan **menumpuk** padding bawah (Section A) dan padding atas (Section B):
- `pb-20` (80px) + `pt-20` (80px) = **160px di Mobile** (terlalu renggang).
- `pb-28` (112px) + `pt-28` (112px) = **224px+ di Desktop** (terlalu banyak ruang kosong hampa).

### B. Rumus Presisi Spacing Antar-Section
1. **Section Berurutan dengan Latar Kanvas Sama (`#FAF8F5`)**:
   - Skala padding baku: **`py-12 sm:py-16`** (Mobile: 48px, Desktop: 64px).
   - Jarak gabungan antar-konten menjadi **96px–128px**, ideal dan dinamis.
2. **Margin Header Section ke Konten**:
   - Header title & subtitle tidak boleh melayang jauh dari kontennya.
   - Gunakan: **`mb-8 sm:mb-10`** (bukan `mb-14 sm:mb-20`).
3. **Banner Kontras Penuh (Dark Section `#111111`)**:
   - Contoh: Craftsmanship Video & Showroom O2O.
   - Gunakan: **`py-16 sm:py-20`** (bukan `py-24 sm:py-32`).
4. **Tombol Tindakan di Bawah Grid**:
   - Gunakan: **`mt-8 sm:mt-10`** (bukan `mt-16 sm:mt-20`).

---

## 2. Standar Rasio Media Gambar (Strict Aspect Ratios)

| Jenis Konten | Rasio Media Baku | Kode Tailwind | Catatan Penggunaan |
|---|---|---|---|
| **Katalog Produk & Pakaian** | **4:5 (Vertikal)** | `aspect-[4/5]` | PDP, PLP, Best Sellers, Koleksi All, Model Lookbook. Wajib mempertahankan proporsi anggun tubuh/busana. |
| **Artikel Jurnal & Blog** | **3:2 (Landscape 35mm)** | `aspect-[3/2]` | List Artikel (`/blogs`, `/blogs/:handle`), Lead Hero Article, dan Blog Section di Homepage. Tidak boleh acak-acakan. |
| **Koleksi Moodboard Atelier** | **4:5 (Vertikal Miring)** | `aspect-[4/5]` | Kartu Trilogi Sarimbit & Personal Wardrobe (kartu miring organik `-rotate-2`, `rotate-1.5` dengan selotip washi). |
| **Hero Slider Utama** | **90vh–95vh Full-Bleed** | `h-[85vh] lg:h-[95vh]` | Slider utama homepage dengan cover fit. |

---

## 3. Identitas Visual: Koleksi vs Blog

- **Koleksi Busana & Wastra**:
  - Menggunakan estetika **Scattered Atelier Moodboard** (kartu miring organik, aksen selotip washi, stempel plate arsip `SRM-01`, `WDR-01`, hover un-tilting).
- **Warta & Jurnal Kebudayaan**:
  - Menggunakan estetika **Frameless Minimalist Editorial** (tanpa kartu kotak, tanpa selotip washi, murni tipografi serif anggun, foto 3:2 bersih, nomor esai `01 / ARSIP BUDAYA`, dan tautan bergaris bawah halus).
