import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router';

/**
 * Minimalist Zero-Radius Quiet Luxury Category Icon
 * Crisp 1.5px hairline strokes for high-end boutique aesthetics
 */
function CategoryIcon({ type, className = 'w-3.5 h-3.5 text-[#C5A059] flex-shrink-0' }) {
  switch (type) {
    case 'crown':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M3 18h18v2H3v-2zM4 15l2-8 5 4 5-4 2 8H4z" />
          <circle cx="12" cy="6" r="1" fill="currentColor" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M12 3v18M3 12h18M6.5 6.5l11 11M17.5 6.5l-11 11" />
        </svg>
      );
    case 'leaf':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18c6 0 12-6 12-12-6 0-12 6-12 12zM6 18c3-3 6-5 12-6" />
        </svg>
      );
    case 'scissors':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path strokeLinecap="square" strokeLinejoin="miter" d="M20 4L8.7 15.3M8.7 8.7L20 20" />
        </svg>
      );
    case 'shirt':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
      );
    case 'dress':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M9 3h6v4l4 14H5l4-14V3zM9 7h6" />
        </svg>
      );
    case 'gem':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M6 3h12l4 6-10 12L2 9l4-6z" />
        </svg>
      );
    case 'family':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
  }
}

/**
 * Curated Luxury Navigation Architecture
 * Strict 3-Column Symmetrical Grid:
 * - Col 1: Categories + Icons + Direct Link to All Collections (/collections)
 * - Col 2: Recent Products (Strict 3 Items max, Zero Scroll)
 * - Col 3: Featured Collection Spotlight (Modular, Metaobject-Ready)
 */
const SHOPIFY_MENU = {
  'Luxury Series': {
    title: 'Luxury Series (Kasta Tertinggi)',
    handle: 'luxury-series',
    badge: 'Sutra Alam ATBM',
    tailoringNotice: 'Layanan Jahitan Sarimbit & Seragam (Tanpa Minimal Order)',
    subcategories: [
      {
        name: 'Pria • Baju Kerja',
        href: '/collections/luxury-series?gender=pria&category=baju-kerja',
        icon: 'shirt',
        badge: 'Kantor',
      },
      {
        name: 'Pria • Acara Resmi',
        href: '/collections/luxury-series?gender=pria&category=acara-resmi',
        icon: 'crown',
        badge: 'Formal',
      },
      {
        name: 'Pria • Casual',
        href: '/collections/luxury-series?gender=pria&category=casual',
        icon: 'sparkle',
        badge: 'Santai',
      },
      {
        name: 'Pria • Sarimbit',
        href: '/collections/luxury-series?gender=pria&category=sarimbit',
        icon: 'family',
        badge: 'Keluarga',
      },
      {
        name: 'Wanita • Baju Kerja',
        href: '/collections/luxury-series?gender=wanita&category=baju-kerja',
        icon: 'dress',
        badge: 'Kantor',
      },
      {
        name: 'Wanita • Acara Resmi',
        href: '/collections/luxury-series?gender=wanita&category=acara-resmi',
        icon: 'crown',
        badge: 'Pesta',
      },
      {
        name: 'Wanita • Casual',
        href: '/collections/luxury-series?gender=wanita&category=casual',
        icon: 'leaf',
        badge: 'Santai',
      },
      {
        name: 'Wanita • Sarimbit',
        href: '/collections/luxury-series?gender=wanita&category=sarimbit',
        icon: 'family',
        badge: 'Keluarga',
      },
    ],
    featuredProducts: [
      {
        title: 'Sarimbit Mustard Gold',
        price: 'Rp 1.450.000',
        href: '/products/sarimbit-mustard-gold',
        image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/WhatsApp_Image_2026-09-01_at_18.47.23.jpg?v=1788413858',
        tag: 'Luxury',
      },
      {
        title: 'Sarimbit Charcoal Hitam',
        price: 'Rp 1.250.000',
        href: '/products/sarimbit-charcoal-hitam',
        image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/WhatsApp_Image_2026-09-01_at_18.47.24.jpg?v=1788413906',
        tag: 'Luxury',
      },
      {
        title: 'Kemeja Motif Semarangan',
        price: 'Rp 525.000',
        href: '/products/kemeja-motif-semarangan',
        image: '/banners/hero_editorial_banner.jpg',
        tag: 'Signature',
      },
    ],
    editorial: {
      image: '/banners/sarimbit_family_banner.jpg',
      eyebrow: 'KASTA I • SUTRA ALAM ATBM',
      headline: 'Kemegahan Abadi Pelaminan',
      description:
        'Sentuhan canting prada emas dan tenun sutra ATBM halus. Pilihan busana kehormatan resepsi pernikahan dan jamuan kenegaraan.',
      ctaText: 'EKSPLORASI LUXURY SERIES',
      ctaHref: '/collections/luxury-series',
      isExternal: false,
    },
  },
  'Premium Series': {
    title: 'Premium Series (Tenun Dobby)',
    handle: 'premium-series',
    badge: 'Tenun Dobby Timbul',
    tailoringNotice: 'Layanan Jahitan Sarimbit & Seragam (Tanpa Minimal Order)',
    subcategories: [
      {
        name: 'Pria • Baju Kerja',
        href: '/collections/premium-series?gender=pria&category=baju-kerja',
        icon: 'shirt',
        badge: 'Kantor',
      },
      {
        name: 'Pria • Acara Resmi',
        href: '/collections/premium-series?gender=pria&category=acara-resmi',
        icon: 'crown',
        badge: 'Formal',
      },
      {
        name: 'Pria • Casual',
        href: '/collections/premium-series?gender=pria&category=casual',
        icon: 'sparkle',
        badge: 'Santai',
      },
      {
        name: 'Pria • Sarimbit',
        href: '/collections/premium-series?gender=pria&category=sarimbit',
        icon: 'family',
        badge: 'Keluarga',
      },
      {
        name: 'Wanita • Baju Kerja',
        href: '/collections/premium-series?gender=wanita&category=baju-kerja',
        icon: 'dress',
        badge: 'Kantor',
      },
      {
        name: 'Wanita • Acara Resmi',
        href: '/collections/premium-series?gender=wanita&category=acara-resmi',
        icon: 'crown',
        badge: 'Pesta',
      },
      {
        name: 'Wanita • Casual',
        href: '/collections/premium-series?gender=wanita&category=casual',
        icon: 'leaf',
        badge: 'Santai',
      },
      {
        name: 'Wanita • Sarimbit',
        href: '/collections/premium-series?gender=wanita&category=sarimbit',
        icon: 'family',
        badge: 'Keluarga',
      },
    ],
    featuredProducts: [
      {
        title: 'Sarimbit Sekar Jagad Dobby',
        price: 'Rp 785.000',
        href: '/products/sarimbit-charcoal-hitam',
        image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/WhatsApp_Image_2026-09-01_at_18.47.24.jpg?v=1788413906',
        tag: 'Premium',
      },
      {
        title: 'Hem Dobby Maroon',
        price: 'Rp 420.000',
        href: '/products/hem-dobby-maroon',
        image: '/banners/hero_editorial_banner.jpg',
        tag: 'Premium',
      },
      {
        title: 'Gamis Parang Kusumo',
        price: 'Rp 685.000',
        href: '/products/gamis-parang-kusumo',
        image: '/brand/models/model_teak_door.jpg',
        tag: 'Premium',
      },
    ],
    editorial: {
      image: '/banners/hero_editorial_banner.jpg',
      eyebrow: 'KASTA II • TENUN DOBBY',
      description:
        'Koleksi batik dengan pilihan bahan berkualitas yang menghadirkan kenyamanan dan tampilan elegan. Tersedia dengan opsi lapisan trikot untuk memberikan struktur yang lebih rapi dan kokoh, sesuai kebutuhan dan preferensi Anda.',
      ctaText: 'JELAJAHI PREMIUM SERIES',
      ctaHref: '/collections/premium-series',
      isExternal: false,
    },
  },
  'Ekonomi Series': {
    title: 'Ekonomi Series (Katun Primisima)',
    handle: 'ekonomi-series',
    badge: '100% Katun Adem',
    allHref: '/collections/ekonomi-series',
    subcategories: [
      {
        name: 'Pria Katun Lengan Panjang',
        href: '/collections/ekonomi-series?gender=pria&sleeve=lengan-panjang',
        icon: 'shirt',
        badge: 'Adem',
      },
      {
        name: 'Pria Katun Lengan Pendek',
        href: '/collections/ekonomi-series?gender=pria&sleeve=lengan-pendek',
        icon: 'sparkle',
        badge: 'Harian',
      },
      {
        name: 'Wanita Gamis & Blus Lengan Panjang',
        href: '/collections/ekonomi-series?gender=wanita&sleeve=lengan-panjang',
        icon: 'dress',
        badge: 'Silaturahmi',
      },
      {
        name: 'Wanita Terusan Lengan Pendek Santai',
        href: '/collections/ekonomi-series?gender=wanita&sleeve=lengan-pendek',
        icon: 'leaf',
        badge: 'Santai',
      },
    ],
    featuredProducts: [
      {
        title: 'Sarimbit Soga Lawasan',
        price: 'Rp 385.000',
        href: '/collections/ekonomi-series',
        image: '/banners/sarimbit_family_banner.jpg',
        tag: 'Ekonomi',
      },
      {
        title: 'Outer Terracotta Gold',
        price: 'Rp 450.000',
        href: '/products/outer-terracotta-gold',
        image: '/brand/models/model_outdoor_sunlight.jpg',
        tag: 'Ekonomi',
      },
      {
        title: 'Kemeja Sido Asih Tradisional',
        price: 'Rp 375.000',
        href: '/products/kemeja-sido-asih',
        image: '/banners/hero_editorial_banner.jpg',
        tag: 'Ekonomi',
      },
    ],
    editorial: {
      image: '/brand/models/model_teak_door.jpg',
      eyebrow: 'KASTA III • PRIMISIMA KATUN',
      description:
        'Koleksi batik dengan pilihan motif menarik dan desain yang praktis untuk berbagai kebutuhan. Mengutamakan fungsi, kenyamanan, dan harga yang terjangkau, koleksi ini menjadi pilihan tepat untuk pemakaian sehari-hari maupun seragaman tanpa meninggalkan karakter khas Batik Smile.',
      ctaText: 'LIHAT EKONOMI SERIES',
      ctaHref: '/collections/ekonomi-series',
      isExternal: false,
    },
  },
  Kain: {
    title: 'Kain Batik Tulis & Jarik Tradisional',
    handle: 'kain',
    badge: 'Canting Tangan Asli',
    allHref: '/collections/kain',
    subcategories: [
      {
        name: 'Kain Panjang Pola Keraton',
        href: '/collections/kain',
        icon: 'leaf',
        badge: 'Tulis',
      },
      {
        name: 'Jarik Wiru Tradisional',
        href: '/collections/kain',
        icon: 'gem',
        badge: 'Klasik',
      },
      {
        name: 'Koleksi Kain Batik Pilihan',
        href: '/collections/kain',
        icon: 'sparkle',
        badge: 'Pilihan',
      },
    ],
    featuredProducts: [
      {
        title: 'Kain Tulis Canting Tembaga',
        price: 'Rp 850.000',
        href: '/collections/kain',
        image: '/banners/collection_kain_tulis_banner.jpg',
        tag: 'Mahakarya',
      },
      {
        title: 'Jarik Parang Rusak Barong',
        price: 'Rp 650.000',
        href: '/collections/kain',
        image: '/banners/collection_kain_tulis_banner.jpg',
        tag: 'Keraton',
      },
    ],
    editorial: {
      image: '/banners/collection_kain_tulis_banner.jpg',
      eyebrow: 'LEMBARAN KAIN BATIK MAESTRO',
      headline: 'Goresan Malam Panas Canting Tangan',
      description:
        'Setiap helai kain mori ditenun dan digambar dengan ketekunan maestro pembatik Jawa Tengah. Siap dijahit menjadi busana impian Anda.',
      ctaText: 'LIHAT LEMBARAN KAIN',
      ctaHref: '/collections/kain',
      isExternal: false,
    },
  },
  Aksesoris: {
    title: 'Pelengkap Adat & Busana Tradisional',
    handle: 'aksesoris',
    badge: 'Aksesoris Budaya',
    allHref: '/collections/aksesoris',
    subcategories: [
      {
        name: 'Blangkon Tradisional Solo & Jogja',
        href: '/collections/aksesoris',
        icon: 'gem',
        badge: 'Adat',
      },
      {
        name: 'Selendang Batik & Sabuk Kamus',
        href: '/collections/aksesoris',
        icon: 'sparkle',
        badge: 'Pelengkap',
      },
    ],
    featuredProducts: [
      {
        title: 'Blangkon Solo Mondholan Halus',
        price: 'Rp 175.000',
        href: '/collections/aksesoris',
        image: '/banners/hero_editorial_banner.jpg',
        tag: 'Adat',
      },
    ],
    editorial: {
      image: '/banners/hero_editorial_banner.jpg',
      eyebrow: 'PELENGKAP WIBAWA NUSANTARA',
      headline: 'Kesempurnaan Penampilan Adat',
      description:
        'Lengkapi pesona busana adat Jawa dengan blangkon lipat halus dan aksesoris budaya nusantara pilihan butik Simongan.',
      ctaText: 'LIHAT SEMUA AKSESORIS',
      ctaHref: '/collections/aksesoris',
      isExternal: false,
    },
  },
  'Batik Anak': {
    title: 'Koleksi Batik Putra & Putri',
    handle: 'batik-anak',
    badge: 'Anak & Remaja',
    allHref: '/collections/batik-anak',
    subcategories: [
      {
        name: 'Batik Putra Lengan Panjang',
        href: '/collections/batik-anak?gender=putra&sleeve=lengan-panjang',
        icon: 'shirt',
        badge: 'Putra',
      },
      {
        name: 'Batik Putra Lengan Pendek',
        href: '/collections/batik-anak?gender=putra&sleeve=lengan-pendek',
        icon: 'sparkle',
        badge: 'Putra',
      },
      {
        name: 'Batik Putri Lengan Panjang',
        href: '/collections/batik-anak?gender=putri&sleeve=lengan-panjang',
        icon: 'dress',
        badge: 'Putri',
      },
      {
        name: 'Batik Putri Lengan Pendek',
        href: '/collections/batik-anak?gender=putri&sleeve=lengan-pendek',
        icon: 'leaf',
        badge: 'Putri',
      },
    ],
    featuredProducts: [
      {
        title: 'Setelan Surjan Anak',
        price: 'Rp 185.000',
        href: '/products/setelan-surjan-anak',
        image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/img_1_ba593dd2-e198-489c-adb4-60c3be2cd938.jpg?v=1788413033',
        tag: 'Adat Jawa',
      },
      {
        title: 'Hem Anak Pesisir',
        price: 'Rp 125.000',
        href: '/products/hem-anak-pesisir',
        image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/img_1_3938e8ab-eda3-4a36-8537-c26cc470f869.jpg?v=1788412999',
        tag: 'Katun Adem',
      },
      {
        title: 'Dress Anak Bunga Parang',
        price: 'Rp 145.000',
        href: '/collections/batik-anak',
        image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/img_1_ac3a4584-3e94-4fdd-ad0d-0a699714b9d9.jpg?v=1788412963',
        tag: 'Ceria Lembut',
      },
    ],
    editorial: {
      image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/img_1_ac3a4584-3e94-4fdd-ad0d-0a699714b9d9.jpg?v=1788412963',
      eyebrow: 'WARISAN SEJAK DINI',
      headline: 'Batik Anak Nyaman & Bernyawa',
      description:
        'Koleksi busana anak katun lembut adem, dirancang agar si kecil tetap bebas bergerak ceria di setiap momen penting keluarga.',
      ctaText: 'JELAJAHI BATIK ANAK',
      ctaHref: '/collections/batik-anak',
      isExternal: false,
    },
  },
};

export function MegaMenu({ onMenuStateChange }) {
  const [activeTab, setActiveTab] = useState(null);
  const closeTimeoutRef = useRef(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (key) => {
    clearCloseTimeout();
    setActiveTab(key);
    onMenuStateChange?.(true);
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
      onMenuStateChange?.(false);
    }, 200);
  };

  return (
    <nav className="flex items-center justify-center gap-6 xl:gap-8 font-sans text-xs uppercase tracking-[0.16em]">
      {Object.keys(SHOPIFY_MENU).map((key) => {
        const item = SHOPIFY_MENU[key];
        const isOpen = activeTab === key;

        return (
          <div
            key={key}
            className="py-4"
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Top Level NavLink with Zero Duplicate Underline */}
            <NavLink
              to={item.allHref}
              className={({ isActive }) =>
                `transition-all duration-200 font-semibold pb-1.5 flex items-center gap-1.5 text-[11px] no-underline border-b-2 ${
                  isOpen || isActive
                    ? 'text-[#C5A059] border-[#C5A059]'
                    : 'text-[#111111] hover:text-[#C5A059] border-transparent'
                }`
              }
            >
              <span>{key}</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#C5A059]' : 'text-[#A69F96]'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" d="M6 9l6 6 6-6" />
              </svg>
            </NavLink>

            {/* Quiet Luxury Balanced Mega Menu Dropdown */}
            {isOpen && (
              <div
                className="absolute top-[80px] left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16 bg-white shadow-2xl border border-[#E2DFD8] p-6 lg:p-8 z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                onMouseEnter={() => clearCloseTimeout()}
                onMouseLeave={handleMouseLeave}
              >
                {/* Main 3-Column Symmetrical Grid (4 - 4 - 4) */}
                <div className="grid grid-cols-12 gap-8 items-start">
                  
                  {/* Column 1: Pilihan Kategori + Icon + Pintu All Collections (4 Kolom) */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2DFD8] pb-6 lg:pb-0 lg:pr-8">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#9E7D3B] uppercase">
                          PILIHAN KATEGORI
                        </span>
                        <span className="text-[9px] text-[#A69F96] tracking-wider uppercase font-semibold">
                          RESMI BUTIK
                        </span>
                      </div>

                      <ul className={item.subcategories.length > 4 ? 'grid grid-cols-1 sm:grid-cols-2 gap-1.5' : 'space-y-1.5'}>
                        {item.subcategories.map((sub, idx) => (
                          <li key={idx}>
                            <NavLink
                              to={sub.href}
                              onClick={() => setActiveTab(null)}
                              className="group flex items-center justify-between py-1.5 px-2 border border-transparent hover:border-[#E2DFD8] hover:bg-[#FAF8F5] transition-all normal-case text-xs text-[#111111] hover:text-[#9E7D3B] no-underline"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <CategoryIcon type={sub.icon} className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                                <span className="font-medium truncate group-hover:translate-x-0.5 transition-transform text-[11px]">
                                  {sub.name}
                                </span>
                              </div>
                              {sub.badge && (
                                <span className="text-[8px] px-1.5 py-0.5 bg-[#FAF8F5] text-[#9E7D3B] border border-[#E2DFD8] font-semibold uppercase tracking-wider flex-shrink-0 ml-1.5">
                                  {sub.badge}
                                </span>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>

                      {/* Tailoring Service Highlight (Luxury & Premium) */}
                      {item.tailoringNotice && (
                        <div className="mt-3 p-2.5 bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center gap-2 text-[10px]">
                          <CategoryIcon type="scissors" className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                          <span className="font-medium text-[#7D6433]">
                            {item.tailoringNotice}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Clean Architectural Gateway to All Collections */}
                    <div className="mt-5 pt-3.5 border-t border-[#E2DFD8]">
                      <NavLink
                        to="/collections"
                        onClick={() => setActiveTab(null)}
                        className="group flex items-center justify-between w-full py-2.5 px-3 border border-[#E2DFD8] hover:border-[#C5A059] bg-[#FAF8F5] hover:bg-[#111111] text-[#111111] hover:text-white transition-all duration-300 no-underline text-[10px] uppercase font-semibold tracking-[0.18em]"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:rotate-45 transition-transform duration-300" />
                          <span>JELAJAHI SELURUH KOLEKSI</span>
                        </span>
                        <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform duration-300">
                          &rarr;
                        </span>
                      </NavLink>
                    </div>
                  </div>

                  {/* Column 2: Rilis Terbaru / Recent Products (Strict 3 Items) (4 Kolom) */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2DFD8] pb-6 lg:pb-0 lg:pr-8">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#9E7D3B] uppercase">
                          RILIS TERBARU
                        </span>
                        <span className="text-[9px] text-[#C5A059] font-bold tracking-wider uppercase bg-[#111111] px-2 py-0.5">
                          NEW ARRIVALS
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {item.featuredProducts.slice(0, 3).map((prod, idx) => (
                          <NavLink
                            key={idx}
                            to={prod.href}
                            onClick={() => setActiveTab(null)}
                            className="group flex items-center gap-3 p-2 border border-[#E2DFD8] hover:border-[#C5A059] bg-[#FAF8F5] hover:bg-white transition-all no-underline"
                          >
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="w-12 h-14 object-cover aspect-[4/5] border border-[#E2DFD8] flex-shrink-0"
                            />
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#C5A059]">
                                {prod.tag}
                              </span>
                              <h5 className="font-serif text-xs font-medium text-[#111111] group-hover:text-[#9E7D3B] transition-colors truncate normal-case">
                                {prod.title}
                              </h5>
                              <span className="text-[11px] text-[#5A5550] font-light mt-0.5 font-sans">
                                {prod.price}
                              </span>
                            </div>
                            <span className="text-[#C5A059] group-hover:translate-x-0.5 transition-transform text-xs pr-1">
                              &rarr;
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Featured Spotlight / Metaobject-Ready Banner (4 Kolom) */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#9E7D3B] uppercase">
                          FEATURED SPOTLIGHT
                        </span>
                        <span className="text-[9px] text-[#A69F96] uppercase tracking-wider">
                          PILIHAN BUTIK
                        </span>
                      </div>

                      <div className="border border-[#E2DFD8] relative group overflow-hidden bg-[#111111] aspect-[16/10] mb-3">
                        <img
                          src={item.editorial.image}
                          alt={item.editorial.headline}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3.5 flex flex-col justify-end text-white">
                          <span className="text-[8px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-0.5">
                            {item.editorial.eyebrow}
                          </span>
                          <h4 className="font-serif text-sm font-normal leading-snug">
                            {item.editorial.headline}
                          </h4>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#5A5550] leading-relaxed font-light mb-3 normal-case line-clamp-2">
                        {item.editorial.description}
                      </p>
                    </div>

                    {item.editorial.isExternal ? (
                      <a
                        href={item.editorial.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.18em] transition-colors text-center block no-underline shadow-sm cursor-pointer"
                      >
                        {item.editorial.ctaText} &rarr;
                      </a>
                    ) : (
                      <NavLink
                        to={item.editorial.ctaHref}
                        onClick={() => setActiveTab(null)}
                        className="w-full py-2.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.18em] transition-colors text-center block no-underline shadow-sm cursor-pointer"
                      >
                        {item.editorial.ctaText} &rarr;
                      </NavLink>
                    )}
                  </div>
                </div>

                {/* Bottom Bar: Trust Guarantees & Hotline */}
                <div className="mt-6 pt-3.5 border-t border-[#E2DFD8] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#5A5550] uppercase tracking-[0.14em]">
                  <div className="flex items-center gap-3 text-[#5A5550]">
                    <span>&bull; Garansi 100% Batik Asli</span>
                    <span>&bull; Bebas Tukar Ukuran 7 Hari</span>
                    <span>&bull; Layanan Jahit Tanpa Minimal Order</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#9E7D3B] font-semibold">Hotline WhatsApp:</span>
                    <a
                      href="https://wa.me/6281390888809"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#111111] hover:text-[#C5A059] no-underline"
                    >
                      081-390-8888-09
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Jurnal Link (Direct Editorial Access) */}
      <div className="py-4">
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `transition-all duration-200 font-semibold pb-1.5 flex items-center gap-1.5 text-[11px] no-underline border-b-2 ${
              isActive
                ? 'text-[#C5A059] border-[#C5A059]'
                : 'text-[#111111] hover:text-[#C5A059] border-transparent'
            }`
          }
        >
          <span>JURNAL</span>
        </NavLink>
      </div>
    </nav>
  );
}

