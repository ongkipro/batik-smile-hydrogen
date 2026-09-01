import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { BatikDivider, BatikCorner } from './BatikOrnaments';

const TIERS = [
  {
    id: 'mahakarya',
    tierNumber: 'KASTA I',
    name: 'Mahakarya Heritage',
    subname: 'Sutra ATBM & Prada Emas Tradisional',
    priceRange: 'Rp 1.500.000 – Rp 3.500.000+',
    badge: 'Koleksi Eksklusif Terbatas',
    accentColor: '#C5A059',
    bgClass: 'bg-[#0F0F0F] text-white border-neutral-800',
    description:
      'Kasta tertinggi busana batik Nusantara. Ditenun tangan di atas sutra alam ATBM dengan sentuhan prada emas asli dan dilapisi furing sutra halus. Diciptakan khusus untuk resepsi pernikahan agung, jamuan kenegaraan, dan momen bersejarah keluarga.',
    specs: [
      { label: 'Material', value: 'Sutra Alam ATBM & Prada Tulis Tangan' },
      { label: 'Furing', value: 'Lapis Furing Sutra Halus Super Adem' },
      { label: 'Ketelitian', value: 'Canting Tulis Manual 3-4 Bulan Pengerjaan' },
      { label: 'Karakter', value: 'Kilau Mewah, Jatuh Elegan, Sangat Berwibawa' },
    ],
    image:
      'https://cdn.shopify.com/s/files/1/0669/5606/7032/files/sarimbit-mahakarya.webp?v=1740920000',
    fallbackImage:
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
    collectionUrl: '/collections/sarimbit-mahakarya-heritage',
  },
  {
    id: 'signature',
    tierNumber: 'KASTA II',
    name: 'Signature Elegance',
    subname: 'Tenun Dobby Timbul & Desainer Modern',
    priceRange: 'Rp 450.000 – Rp 1.200.000',
    badge: 'Pilihan Terfavorit (Best Seller)',
    accentColor: '#38BDF8',
    bgClass: 'bg-[#14213D] text-white border-blue-900/40',
    description:
      'Harmoni sempurna antara tekstur motif dobby timbul dan desain kontemporer modern. Dilengkapi furing hero katun yang adem dan menyerap keringat, menjadikannya pilihan favorit keluarga untuk wisuda, lamaran, dan hari raya.',
    specs: [
      { label: 'Material', value: 'Tenun Katun Dobby Bertekstur Timbul' },
      { label: 'Furing', value: 'Lapis Furing Hero Katun Adem Anti-Gerah' },
      { label: 'Ketelitian', value: 'Batik Cap Kombinasi Tulis Presisi' },
      { label: 'Karakter', value: 'Tekstur Mewah, Tegap Berstruktur, Elegan' },
    ],
    image:
      'https://cdn.shopify.com/s/files/1/0669/5606/7032/files/sarimbit-signature.webp?v=1740920000',
    fallbackImage:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    collectionUrl: '/collections/sarimbit-signature-elegance',
  },
  {
    id: 'essential',
    tierNumber: 'KASTA III',
    name: 'Essential Daily',
    subname: 'Katun Primisima Halus & Nyaman Harian',
    priceRange: 'Rp 225.000 – Rp 450.000',
    badge: 'Kenyamanan Harian Maksimal',
    accentColor: '#9E4719',
    bgClass: 'bg-white text-neutral-900 border-neutral-200/80 shadow-sm',
    description:
      'Koleksi busana batik esensial berbahan 100% Katun Primisima Sanforized. Lembut di kulit, tidak mudah kusut, dan tidak susut setelah dicuci. Sangat ideal untuk busana kerja kantor harian, mengajar, dan pertemuan santai.',
    specs: [
      { label: 'Material', value: '100% Katun Primisima Unggul 50s' },
      { label: 'Furing', value: 'Tersedia Pilihan Non-Furing & Furing Ringan' },
      { label: 'Ketelitian', value: 'Batik Cetak Tradisional Halus Anti-Luntur' },
      { label: 'Karakter', value: 'Ringan, Dingin di Kulit, Mudah Disetrika' },
    ],
    image:
      'https://cdn.shopify.com/s/files/1/0669/5606/7032/files/sarimbit-essential.webp?v=1740920000',
    fallbackImage:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    collectionUrl: '/collections/sarimbit-essential-daily',
  },
];

export function TierExperience() {
  const [activeTierId, setActiveTierId] = useState('signature');
  const activeTier = TIERS.find((t) => t.id === activeTierId) || TIERS[1];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9E4719] font-bold">
            Pembeda Nilai Utama
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-3 text-neutral-900 leading-tight">
            Sarimbit Nusantara 3 Kasta
          </h2>
          <BatikDivider variant="soga" className="my-3" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Pahami perbedaan material kain, furing, dan tingkat ketelitian karya kami agar Paduka
            menemukan pilihan sarimbit yang paling sesuai untuk setiap momen sakral keluarga.
          </p>
        </div>

        {/* 3-Tier Interactive Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-neutral-200/70 border border-neutral-300/60 shadow-inner max-w-full overflow-x-auto">
            {TIERS.map((tier) => {
              const isActive = tier.id === activeTierId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActiveTierId(tier.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-md'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-white/50'
                  }`}
                >
                  <span className="opacity-70 text-[10px] mr-1.5">{tier.tierNumber}</span>
                  <span>{tier.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tier Showcase Card (Dynamic 2-Column Luxury Bento) */}
        <div
          className={`rounded-2xl border p-8 sm:p-12 transition-all duration-500 relative overflow-hidden ${activeTier.bgClass}`}
        >
          <BatikCorner position="top-left" variant="gold" size={40} className="top-4 left-4 z-10 opacity-70" />
          <BatikCorner position="bottom-right" variant="gold" size={40} className="bottom-4 right-4 z-10 opacity-70" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: 4:5 Portrait Model Image */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-neutral-800">
                <img
                  src={activeTier.image}
                  onError={(e) => {
                    e.currentTarget.src = activeTier.fallbackImage;
                  }}
                  alt={activeTier.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md text-white border border-white/10"
                    style={{ color: activeTier.accentColor }}
                  >
                    {activeTier.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Detailed Specification & Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em] block mb-1"
                  style={{ color: activeTier.accentColor }}
                >
                  {activeTier.tierNumber} • {activeTier.subname}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3 leading-snug">
                  {activeTier.name}
                </h3>

                <div className="text-xl sm:text-2xl font-bold mb-6 font-sans" style={{ color: activeTier.accentColor }}>
                  {activeTier.priceRange}
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-8 opacity-90 font-sans">
                  {activeTier.description}
                </p>

                {/* Specs Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-xs">
                  {activeTier.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-black/10 dark:bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                      <span className="block text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-0.5">
                        {spec.label}
                      </span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <NavLink
                  to={activeTier.collectionUrl}
                  className="px-8 py-4 rounded bg-[#9E4719] hover:bg-[#7A320C] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
                >
                  Jelajahi Katalog {activeTier.name} &rarr;
                </NavLink>

                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Batik%20Smile%2C%20saya%20tertarik%20dengan%20koleksi%20${encodeURIComponent(
                    activeTier.name,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-4 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider border border-white/20 transition-all text-center"
                >
                  Tanya Konsultan Kasta Ini
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
