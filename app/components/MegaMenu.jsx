import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router';

/**
 * High-End Luxury Mega Menu for Batik Smile Nusantara
 * 3-Column Balanced Architecture:
 * - Col 1: Real Shopify Collections & Subcategories (Clean list with badges)
 * - Col 2: Curated Best-Seller Product Highlights (Thumbnails, titles, prices)
 * - Col 3: Editorial Heritage Story & Concierge Card (Compact proportion)
 * - Bottom Bar: Quality guarantees & official O2O WhatsApp hotline
 */
const SHOPIFY_MENU = {
  'Sarimbit (3 Kasta)': {
    title: '3 Kasta Sarimbit Keluarga',
    handle: 'sarimbit-exclusive',
    badge: 'Koleksi 3 Kasta Resmi',
    allHref: '/collections/sarimbit-exclusive',
    subcategories: [
      {
        name: 'Tier 1 • Sarimbit Exclusive (Sutra & Tulis)',
        href: '/collections/sarimbit-exclusive',
        badge: 'Royal Silk',
      },
      {
        name: 'Tier 2 • Sarimbit Premium (Katun Furing Pesta)',
        href: '/collections/sarimbit-premium',
        badge: 'Resepsi',
      },
      {
        name: 'Tier 3 • Sarimbit Ekonomis (Katun Harian Adem)',
        href: '/collections/sarimbit-ekonomis',
        badge: 'Primisima',
      },
      {
        name: 'Koleksi Pelengkap Batik Anak Pasangan',
        href: '/collections/batik-anak',
        badge: 'Keluarga',
      },
      {
        name: 'Panduan Memilih 3 Kasta Sarimbit',
        href: '/pages/tentang-kami',
        badge: 'Edukasi',
      },
      {
        name: 'Konsultasi Custom Jahit Ukur Badan',
        href: '/pages/layanan-seragam',
        badge: 'Bespoke',
      },
    ],
    featuredProducts: [
      {
        title: 'Sarimbit Mustard Gold',
        price: 'Rp 1.450.000',
        href: '/products/sarimbit-mustard-gold',
        image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/WhatsApp_Image_2026-09-01_at_18.47.23.jpg?v=1788413858',
        tag: 'Tier 1 Exclusive',
      },
      {
        title: 'Sarimbit Charcoal Hitam',
        price: 'Rp 785.000',
        href: '/products/sarimbit-charcoal-hitam',
        image: 'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/WhatsApp_Image_2026-09-01_at_18.47.24.jpg?v=1788413906',
        tag: 'Tier 2 Premium',
      },
    ],
    editorial: {
      image: '/banners/sarimbit_family_banner.jpg',
      eyebrow: '3 KASTA RESMI BUTIK',
      headline: 'Harmoni Busana Keluarga',
      description:
        'Tiga tingkatan kasta sarimbit: Exclusive (Sutra), Premium (Primisima Furing), dan Ekonomis (Harian). Tersedia fitting room privat di Simongan.',
      ctaText: 'KONSULTASI UKURAN KELUARGA',
      ctaHref: 'https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20sarimbit%20keluarga',
      isExternal: true,
    },
  },
  'Batik Wanita': {
    title: 'Busana Batik Wanita Modern',
    handle: 'batik-wanita',
    badge: 'Anggun & Berwibawa',
    allHref: '/collections/batik-wanita',
    subcategories: [
      {
        name: 'Blus Batik Wanita Lapis Furing',
        href: '/collections/blus-batik-wanita',
        badge: 'Kerja/Dinas',
      },
      {
        name: 'Gamis Batik Parang Muslimah',
        href: '/collections/gamis-batik-wanita',
        badge: 'Elegan',
      },
      {
        name: 'Dress & Terusan Batik Modern',
        href: '/collections/dress-batik-wanita',
      },
      {
        name: 'Outer & Tunik Batik Modern',
        href: '/collections/outer-batik-wanita',
        badge: 'Modern',
      },
      {
        name: 'Kebaya Encim & Adat Modern',
        href: '/collections/kebaya-batik-modern',
        badge: 'Klasik',
      },
      {
        name: 'Blazer Batik Eksekutif',
        href: '/collections/blazer-batik-wanita',
      },
    ],
    featuredProducts: [
      {
        title: 'Gamis Parang Kusumo',
        price: 'Rp 685.000',
        href: '/products/gamis-parang-kusumo',
        image: '/brand/models/model_teak_door.jpg',
        tag: 'Koleksi Mewah',
      },
      {
        title: 'Outer Terracotta Gold',
        price: 'Rp 450.000',
        href: '/products/outer-terracotta-gold',
        image: '/brand/models/model_outdoor_sunlight.jpg',
        tag: 'Desain Modern',
      },
    ],
    editorial: {
      image: '/brand/models/model_teak_door.jpg',
      eyebrow: 'SILUET KONTEMPORER',
      headline: 'Potongan Anggun & Nyaman',
      description:
        'Busana batik wanita dengan furing katun adem, dirancang untuk keanggunan jamuan resmi maupun kantor.',
      ctaText: 'LIHAT SEMUA BUSANA WANITA',
      ctaHref: '/collections/batik-wanita',
      isExternal: false,
    },
  },
  'Batik Pria': {
    title: 'Kemeja Pria Furing Hero',
    handle: 'batik-pria',
    badge: 'Lapis Furing Hero',
    allHref: '/collections/batik-pria',
    subcategories: [
      {
        name: 'Kemeja Motif Semarangan (Khas 2007)',
        href: '/products/kemeja-motif-semarangan',
        badge: 'Signature',
      },
      {
        name: 'Kemeja Sido Asih Tradisional',
        href: '/products/kemeja-sido-asih',
        badge: 'Klasik Halus',
      },
      {
        name: 'Hem Dobby Maroon Lengan Pendek',
        href: '/products/hem-dobby-maroon',
        badge: 'Casual Formal',
      },
      {
        name: 'Hem Lurik Hitam Nusantara',
        href: '/products/hem-lurik-hitam',
      },
      {
        name: 'Celana Sirwal Etnik Batik',
        href: '/products/celana-sirwal-etnik',
        badge: 'Etnik',
      },
      {
        name: 'Lihat Seluruh Kemeja Batik Pria',
        href: '/collections/batik-pria',
      },
    ],
    featuredProducts: [
      {
        title: 'Kemeja Motif Semarangan',
        price: 'Rp 525.000',
        href: '/products/kemeja-motif-semarangan',
        image: '/banners/hero_editorial_banner.jpg',
        tag: 'Best Seller',
      },
      {
        title: 'Hem Dobby Maroon',
        price: 'Rp 420.000',
        href: '/products/hem-dobby-maroon',
        image: '/banners/hero_editorial_banner.jpg',
        tag: 'Dobby Halus',
      },
    ],
    editorial: {
      image: '/banners/hero_editorial_banner.jpg',
      eyebrow: 'JAHITAN SAMBUNG MOTIF',
      headline: 'Saku & Pola Tanpa Terputus',
      description:
        'Setiap helai kemeja dirancang dengan saku sambung motif yang tidak terputus dan furing hero katun sejuk.',
      ctaText: 'JELAJAHI KEMEJA PRIA',
      ctaHref: '/collections/batik-pria',
      isExternal: false,
    },
  },
  'Kain Batik Tulis': {
    title: 'Galeri Lembaran Kain Tulis',
    handle: 'jarik-kain-batik',
    badge: 'Karya Mahakarya',
    allHref: '/collections/jarik-kain-batik',
    subcategories: [
      {
        name: 'Kain Sutra ATBM Tulis Halus',
        href: '/collections/jarik-kain-batik',
        badge: '1 of 1',
      },
      {
        name: 'Kain Katun Primisima Pola Kemeja',
        href: '/collections/jarik-kain-batik',
        badge: 'Pola Kemeja',
      },
      {
        name: 'Motif Parang, Kawung & Sidomukti',
        href: '/collections/jarik-kain-batik',
      },
      {
        name: 'Batik Cap Kombinasi & Timbul',
        href: '/collections/jarik-kain-batik',
      },
      {
        name: 'Pesan Jasa Jahit Butik Kilat',
        href: '/pages/layanan-seragam',
        badge: 'Bespoke',
      },
      {
        name: 'Lihat Seluruh Galeri Kain Lembaran',
        href: '/collections/jarik-kain-batik',
      },
    ],
    featuredProducts: [
      {
        title: 'Kain Tulis Sutra ATBM Halus',
        price: 'Rp 2.850.000',
        href: '/collections/jarik-kain-batik',
        image: '/banners/craftsmanship_canting_banner.jpg',
        tag: 'Koleksi Antik',
      },
      {
        title: 'Kain Katun Pola Kemeja Furing',
        price: 'Rp 650.000',
        href: '/collections/jarik-kain-batik',
        image: '/banners/collection_kain_tulis_banner.jpg',
        tag: 'Siap Jahit',
      },
    ],
    editorial: {
      image: '/banners/craftsmanship_canting_banner.jpg',
      eyebrow: 'CANTINGAN MALAM PANAS',
      headline: '100% Asli Tulis Pengrajin',
      description:
        'Kain mori primisima pilihan yang digores manual dengan malam panas. Dibuat oleh pengrajin legendaris Jawa Tengah.',
      ctaText: 'LIHAT KOLEKSI KAIN TULIS',
      ctaHref: '/collections/jarik-kain-batik',
      isExternal: false,
    },
  },
  'Layanan & Butik': {
    title: 'Layanan Butik & Showroom O2O',
    handle: 'layanan-butik',
    badge: 'Semarang Flagship',
    allHref: '/pages/fasilitas-store',
    subcategories: [
      {
        name: 'Pemesanan Seragam Dinas & RS (Bebas MOQ)',
        href: '/pages/layanan-seragam',
        badge: 'Tanpa Minimal',
      },
      {
        name: 'Layanan Jahit Kilat & Ukur Badan',
        href: '/pages/layanan-seragam',
        badge: '1 Hari',
      },
      {
        name: 'Fasilitas Gedung 3 Lantai Simongan',
        href: '/pages/fasilitas-store',
        badge: 'VIP Lounge',
      },
      {
        name: 'Lokasi Toko: Simongan & Banyumanik',
        href: '/pages/lokasi-toko',
      },
      {
        name: 'Kisah Perjalanan Sejak 2007',
        href: '/pages/tentang-kami',
      },
      {
        name: 'Panduan Garansi & Tukar Ukuran Bebas',
        href: '/policies/refund-policy',
      },
    ],
    featuredProducts: [
      {
        title: 'Seragam Batik Kantor & Instansi',
        price: 'Bebas Minimal Order',
        href: '/pages/layanan-seragam',
        image: '/banners/bespoke_tailoring_banner.jpg',
        tag: 'Layanan B2B',
      },
      {
        title: 'Gedung Flagship Simongan 109',
        price: 'Buka Setiap Hari 09-21',
        href: '/pages/fasilitas-store',
        image: '/brand/showroom/showroom_interior_textiles.jpeg',
        tag: 'Showroom 3 Lantai',
      },
    ],
    editorial: {
      image: '/brand/showroom/showroom_interior_textiles.jpeg',
      eyebrow: 'STANDAR 3S 1C 1T & 1H',
      headline: 'Senyum, Salam, Sapa & Hati',
      description:
        'Kunjungi butik fisik kami di Simongan dan nikmati ruang fitting privat ber-AC bersama seluruh keluarga besar Anda.',
      ctaText: 'HUBUNGI CONCIERGE RESMI',
      ctaHref: 'https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20layanan%20butik',
      isExternal: true,
    },
  },
};

export function MegaMenu() {
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
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
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
                {/* Main 3-Column Balanced Grid */}
                <div className="grid grid-cols-12 gap-8 items-start">
                  
                  {/* Column 1: Subkategori & Koleksi Resmi (5 Kolom) */}
                  <div className="col-span-12 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2DFD8] pb-6 lg:pb-0 lg:pr-8">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#9E7D3B] uppercase">
                          KATALOG KOLEKSI RESMI
                        </span>
                        <NavLink
                          to={item.allHref}
                          onClick={() => setActiveTab(null)}
                          className="text-[10px] text-[#5A5550] hover:text-[#C5A059] font-medium uppercase tracking-[0.16em] no-underline"
                        >
                          LIHAT SEMUA &rarr;
                        </NavLink>
                      </div>

                      <ul className="space-y-1.5">
                        {item.subcategories.map((sub, idx) => (
                          <li key={idx}>
                            <NavLink
                              to={sub.href}
                              onClick={() => setActiveTab(null)}
                              className="group flex items-center justify-between py-2 px-3 border border-transparent hover:border-[#E2DFD8] hover:bg-[#FAF8F5] transition-all normal-case text-xs text-[#111111] hover:text-[#9E7D3B] no-underline"
                            >
                              <span className="font-light group-hover:translate-x-1 transition-transform">
                                {sub.name}
                              </span>
                              {sub.badge && (
                                <span className="text-[9px] px-2 py-0.5 bg-[#FAF8F5] text-[#9E7D3B] border border-[#E2DFD8] font-semibold uppercase tracking-wider">
                                  {sub.badge}
                                </span>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Column 2: Produk Pilihan Butik / Highlight Unggulan (4 Kolom) */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2DFD8] pb-6 lg:pb-0 lg:pr-8">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#9E7D3B] uppercase">
                          PRODUK UNGGULAN BUTIK
                        </span>
                        <span className="text-[9px] text-[#A69F96] uppercase tracking-wider">
                          READY STOCK
                        </span>
                      </div>

                      <div className="space-y-3">
                        {item.featuredProducts.map((prod, idx) => (
                          <NavLink
                            key={idx}
                            to={prod.href}
                            onClick={() => setActiveTab(null)}
                            className="group flex items-center gap-3.5 p-2 border border-[#E2DFD8] hover:border-[#C5A059] bg-[#FAF8F5] hover:bg-white transition-all no-underline"
                          >
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="w-14 h-16 object-cover aspect-[4/5] border border-[#E2DFD8] flex-shrink-0"
                            />
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#C5A059] mb-0.5">
                                {prod.tag}
                              </span>
                              <h5 className="font-serif text-xs font-medium text-[#111111] group-hover:text-[#9E7D3B] transition-colors truncate normal-case">
                                {prod.title}
                              </h5>
                              <span className="text-[11px] text-[#5A5550] font-light mt-0.5">
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

                  {/* Column 3: Compact Editorial Heritage Story & Concierge (3 Kolom) */}
                  <div className="col-span-12 lg:col-span-3 flex flex-col justify-between">
                    <div>
                      <div className="border border-[#E2DFD8] relative group overflow-hidden bg-[#111111] aspect-[16/10] mb-3">
                        <img
                          src={item.editorial.image}
                          alt={item.editorial.headline}
                          className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
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

                      <p className="text-[11px] text-[#5A5550] leading-relaxed font-light mb-4 normal-case">
                        {item.editorial.description}
                      </p>
                    </div>

                    {item.editorial.isExternal ? (
                      <a
                        href={item.editorial.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.18em] transition-colors text-center block no-underline shadow-sm cursor-pointer"
                      >
                        {item.editorial.ctaText} &rarr;
                      </a>
                    ) : (
                      <NavLink
                        to={item.editorial.ctaHref}
                        onClick={() => setActiveTab(null)}
                        className="w-full py-3 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.18em] transition-colors text-center block no-underline shadow-sm cursor-pointer"
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
    </nav>
  );
}
