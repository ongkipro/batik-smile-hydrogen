import React from 'react';
import { Link } from 'react-router';

/**
 * SarimbitBentoSection: 3-Pillar Scattered Atelier Moodboard
 * Organic tilted cards with washi tape accents, archival plates, and hover un-tilting.
 * Showcases:
 * 1. Sarimbit Mahakarya Heritage (Exclusive)
 * 2. Sarimbit Signature Elegance (Premium)
 * 3. Sarimbit Essential Daily (Ekonomis)
 *
 * @param {{
 *   collections?: any[];
 * }} props
 */
export function SarimbitBentoSection({ collections = [] }) {
  const defaultFallbackImages = {
    'sarimbit-luxury':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_51f1e349-35df-4896-b08d-6290f84897d9.jpg?v=1786005734',
    'sarimbit-premium':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_d8691b10-ece8-4430-a8c6-d184fa0c467a.jpg?v=1786004716',
    'sarimbit-ekonomi':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_7d17a644-177e-4489-bcf6-490c3c74d39f.jpg?v=1786005749',
  };

  const sarimbitPillars = [
    {
      handle: 'sarimbit-luxury',
      title: 'Sarimbit Luxury',
      subtitle:
        'Kemewahan tenun sutra ATBM berpola presisi dengan sentuhan prada emas untuk perhelatan teragung keluarga.',
      stamp: 'LUXURY',
      plate: 'SRM-01',
      note: 'SUTRA ATBM & PRADA EMAS',
      tilt: '-rotate-2 sm:-rotate-2.5',
      offset: 'lg:translate-y-2',
      tapePos: 'left-8 -top-2.5',
      tapeAngle: '-rotate-2',
      cta: 'JELAJAHI LUXURY',
    },
    {
      handle: 'sarimbit-premium',
      title: 'Sarimbit Premium',
      subtitle:
        'Tekstur tenun dobby berpadu furing katun hero sejuk untuk kenyamanan resepsi pernikahan dan jamuan resmi.',
      stamp: 'PREMIUM',
      plate: 'SRM-02',
      note: 'TENUN DOBBY & FURING HERO',
      tilt: 'rotate-1.5 sm:rotate-2',
      offset: 'lg:-translate-y-4',
      tapePos: 'right-8 -top-2.5',
      tapeAngle: 'rotate-3',
      cta: 'LIHAT PREMIUM',
    },
    {
      handle: 'sarimbit-ekonomi',
      title: 'Sarimbit Ekonomi',
      subtitle:
        'Katun primisima premium super adem untuk kehangatan silaturahmi dan busana kasual keluarga sehari-hari.',
      stamp: 'EKONOMI',
      plate: 'SRM-03',
      note: 'KATUN PRIMISIMA SEJUK',
      tilt: '-rotate-1 sm:-rotate-1.5',
      offset: 'lg:translate-y-3',
      tapePos: 'left-1/2 -translate-x-1/2 -top-2.5',
      tapeAngle: '-rotate-1',
      cta: 'LIHAT EKONOMI',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            Trilogi Koleksi Sarimbit
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Pusat busana seragam keluarga nomor satu di Semarang sejak 2007. Terbagi dalam tiga kasta material: Sutra ATBM kemewahan tertinggi, Tenun Dobby perhelatan resmi, dan Katun Primisima sejuk harian.
          </p>
        </div>

        {/* 3 Scattered Atelier Moodboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-2 pb-2">
          {sarimbitPillars.map((pillar, idx) => {
            const found = collections.find((c) => c.handle === pillar.handle);
            const imageUrl =
              found?.image?.url ||
              defaultFallbackImages[pillar.handle] ||
              '/banners/hero_editorial_banner.jpg';
            const altText = found?.image?.altText || pillar.title;

            return (
              <div
                key={pillar.handle}
                className={`relative group transition-all duration-500 ease-out ${pillar.offset} hover:z-30`}
              >
                {/* Translucent Archival Washi Tape Accent */}
                <div
                  aria-hidden="true"
                  className={`absolute ${pillar.tapePos} ${pillar.tapeAngle} z-20 w-14 sm:w-16 h-3 sm:h-3.5 bg-[#F3EDE2]/85 border border-[#C5A059]/40 backdrop-blur-xs shadow-xs pointer-events-none group-hover:opacity-60 transition-opacity`}
                />

                {/* Strict 4:5 Portrait Curated Card with Organic Tilt */}
                <Link
                  to={`/collections/${pillar.handle}`}
                  className={`block relative aspect-[4/5] bg-[#111111] overflow-hidden border border-[#E2DFD8] shadow-[0_8px_25px_rgba(0,0,0,0.07)] group-hover:shadow-[0_20px_45px_rgba(197,160,89,0.22)] group-hover:border-[#C5A059] transition-all duration-500 transform ${pillar.tilt} group-hover:rotate-0 group-hover:scale-[1.02] no-underline`}
                >
                  {/* Full-bleed Curated Photography */}
                  <img
                    src={imageUrl}
                    alt={altText}
                    width="800"
                    height="1000"
                    decoding="async"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 p-5 sm:p-7 flex flex-col justify-between text-white">
                    {/* Top Bar: Archival Plate & Stamp */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-[#C5A059] bg-black/80 px-2 py-0.5 border border-[#C5A059]/30 backdrop-blur-xs">
                        {pillar.plate}
                      </span>
                      <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white bg-[#C5A059] px-2 py-0.5 shadow-xs">
                        {pillar.stamp}
                      </span>
                    </div>

                    {/* Bottom Bar: Collection Editorial Info */}
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-1">
                        ARSIP BUTIK &bull; {pillar.note}
                      </span>

                      <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug text-white group-hover:text-[#C5A059] transition-colors mb-2">
                        {pillar.title}
                      </h3>

                      <p className="text-[11px] text-[#E2DFD8]/85 font-light line-clamp-2 mb-3.5">
                        {pillar.subtitle}
                      </p>

                      {/* Action Line */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-white/20">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white group-hover:text-[#C5A059] transition-colors flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:rotate-45 transition-transform duration-300" />
                          <span>{pillar.cta}</span>
                        </span>
                        <span className="text-[#C5A059] text-sm font-bold group-hover:translate-x-1.5 transition-transform duration-300">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
