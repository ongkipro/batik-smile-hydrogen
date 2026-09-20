import React, { useState } from 'react';
import { NavLink } from 'react-router';

const TIERS = [
  {
    id: 'mahakarya',
    tierNumber: 'KASTA I',
    name: 'Sarimbit Luxury',
    subname: 'Sutra ATBM & Prada Emas Tradisional',
    priceRange: 'Rp 1.500.000 – Rp 3.500.000+',
    badge: 'MAHAKARYA 1-OF-1',
    accentColor: '#C5A059',
    bgClass: 'bg-[#111111] text-white border-[#C5A059]/40',
    description:
      'Kasta tertinggi busana batik Nusantara. Ditenun tangan di atas serat sutra alam ATBM dengan sentuhan canting prada emas asli dan dilapisi furing sutra sejuk. Diciptakan khusus untuk resepsi pernikahan agung, akad sakral, dan jamuan kenegaraan.',
    specs: [
      { label: 'Material Utama', value: 'Sutra Alam ATBM & Canting Prada Emas' },
      { label: 'Lapisan Furing', value: 'Lapis Furing Sutra Halus Super Adem' },
      { label: 'Tingkat Ketelitian', value: 'Pola Sambung Presisi 100% Simetris' },
      { label: 'Karakter Busana', value: 'Kilau Ningrat Alami, Anggun & Berwibawa' },
    ],
    image: '/banners/craftsmanship_canting_banner.jpg',
    fallbackImage: '/banners/hero_editorial_banner.jpg',
    collectionUrl: '/collections/sarimbit-luxury',
  },
  {
    id: 'signature',
    tierNumber: 'KASTA II',
    name: 'Sarimbit Premium',
    subname: 'Tenun Dobby Timbul & Furing Hero',
    priceRange: 'Rp 500.000 – Rp 950.000',
    badge: 'STANDAR RESEPSI RESMI',
    accentColor: '#C5A059',
    bgClass: 'bg-[#181818] text-white border-white/15',
    description:
      'Harmoni kemewahan tekstur anyaman dobby timbul dan kenyamanan furing katun hero tropis. Tahan kusut untuk perhelatan pesta seharian, menjadikannya pilihan favorit keluarga untuk wisuda, lamaran, dan resepsi pernikahan.',
    specs: [
      { label: 'Material Utama', value: 'Tenun Katun Dobby Tekstur Timbul Mewah' },
      { label: 'Lapisan Furing', value: 'Lapis Furing Hero Katun Halus & Sejuk' },
      { label: 'Tingkat Ketelitian', value: 'Potongan Pola Presisi Antar Anggota' },
      { label: 'Garansi Butik', value: 'Bebas Tukar Ukuran 7 Hari Kalender' },
    ],
    image: '/banners/sarimbit_family_banner.jpg',
    fallbackImage: '/banners/hero_editorial_banner.jpg',
    collectionUrl: '/collections/sarimbit-premium',
  },
  {
    id: 'essential',
    tierNumber: 'KASTA III',
    name: 'Sarimbit Ekonomi',
    subname: 'Katun Primisima Halus Sejuk Harian',
    priceRange: 'Rp 350.000 – Rp 485.000',
    badge: 'KENYAMANAN HARIAN',
    accentColor: '#9E7D3B',
    bgClass: 'bg-white text-[#111111] border-[#E2DFD8]',
    description:
      'Koleksi busana sarimbit esensial berbahan 100% Katun Primisima halus yang sejuk dan menyerap keringat. Nyaman untuk agenda silaturahmi keluarga besar, seragam arisan, dan perayaan hari raya santai.',
    specs: [
      { label: 'Material Utama', value: '100% Katun Primisima Sanforized Halus' },
      { label: 'Kenyamanan', value: 'Adem, Ringan, & Menyerap Keringat' },
      { label: 'Pilihan Ukuran', value: 'Tersedia Lengkap Anak hingga Dewasa 5XL' },
      { label: 'Perawatan', value: 'Mudah Disetrika & Warna Tidak Pudar' },
    ],
    image: '/brand/models/model_teak_door.jpg',
    fallbackImage: '/banners/hero_editorial_banner.jpg',
    collectionUrl: '/collections/sarimbit-ekonomi',
  },
];

export function TierExperience() {
  const [activeTierId, setActiveTierId] = useState('signature');
  const activeTier = TIERS.find((t) => t.id === activeTierId) || TIERS[1];
  const isDark = activeTier.id === 'mahakarya' || activeTier.id === 'signature';

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-t border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
            PANDUAN KASTA MATERIAL BUTIK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-tight mb-3">
            Panduan Sarimbit Tiga Kasta
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Pahami perbedaan mutu material kain, furing, dan tingkat ketelitian karya kami agar Anda
            menemukan pilihan sarimbit yang paling sesuai untuk momen sakral keluarga.
          </p>
        </div>

        {/* 3-Tier Interactive Switcher Tabs (Zero-radius architectural bar) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-[#E2DFD8] bg-white p-1 max-w-full overflow-x-auto scrollbar-none">
            {TIERS.map((tier) => {
              const isActive = tier.id === activeTierId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActiveTierId(tier.id)}
                  className={`px-4 sm:px-6 py-2.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#5A5550] hover:text-[#111111] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span className="text-[#C5A059] mr-1.5">{tier.tierNumber}</span>
                  <span>{tier.name.split(' (')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tier Showcase Card (Zero-Radius 2-Column Luxury Bento) */}
        <div
          className={`border p-6 sm:p-10 lg:p-12 transition-all duration-500 relative overflow-hidden ${activeTier.bgClass}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: 4:5 Portrait Model Image */}
            <div className="lg:col-span-5 relative group overflow-hidden">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111111]">
                <img
                  src={activeTier.image}
                  onError={(e) => {
                    e.currentTarget.src = activeTier.fallbackImage;
                  }}
                  alt={activeTier.name}
                  width="800"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] bg-black/85 text-white border border-white/20 backdrop-blur-xs">
                    {activeTier.badge}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A059] bg-black/85 px-2 py-1 border border-[#C5A059]/40">
                    {activeTier.tierNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Specification & Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-[#C5A059] block mb-1.5">
                  {activeTier.tierNumber} &bull; {activeTier.subname}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal mb-2 leading-snug">
                  {activeTier.name}
                </h3>

                <div className="text-lg sm:text-2xl font-medium mb-5 font-sans text-[#C5A059]">
                  {activeTier.priceRange}
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-light ${isDark ? 'text-[#E2DFD8]/85' : 'text-[#5A5550]'}`}>
                  {activeTier.description}
                </p>

                {/* Specs Matrix (Zero-Radius) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs">
                  {activeTier.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 border ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAF8F5] border-[#E2DFD8]'
                      }`}
                    >
                      <span className="block text-[9px] uppercase tracking-wider font-semibold opacity-60 mb-0.5">
                        {spec.label}
                      </span>
                      <span className="font-medium text-[11px]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons (Zero-Radius) */}
              <div className="flex flex-wrap items-center gap-3.5">
                <NavLink
                  to={activeTier.collectionUrl}
                  className={`px-7 py-3.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] transition-all no-underline ${
                    isDark
                      ? 'bg-[#C5A059] hover:bg-white text-[#111111]'
                      : 'bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111]'
                  }`}
                >
                  LIHAT KOLEKSI &rarr;
                </NavLink>

                <a
                  href={`https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20tertarik%20konsultasi%20koleksi%20${encodeURIComponent(
                    activeTier.name,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-6 py-3.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] border transition-all no-underline ${
                    isDark
                      ? 'border-white/30 hover:border-white text-white hover:bg-white/10'
                      : 'border-[#111111]/30 hover:border-[#111111] text-[#111111] hover:bg-black/5'
                  }`}
                >
                  KONSULTASI VIA WHATSAPP &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
