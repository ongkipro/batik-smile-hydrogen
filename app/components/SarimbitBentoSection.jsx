import React from 'react';
import { Link } from 'react-router';

/**
 * SarimbitBentoSection: Signature 3-Tier Asymmetric Bento Grid
 * Dedicated to the 3 Sarimbit Pillars: Exclusive (7-col dominant), Premium (5-col top), and Ekonomis (5-col bottom).
 * 0px Radius, Quad-Harmonic Palette, Cormorant Garamond Typography.
 *
 * @param {{
 *   collections?: any[];
 * }} props
 */
export function SarimbitBentoSection({ collections = [] }) {
  // Verified CDN fallbacks matching Shopify inventory
  const defaultFallbackImages = {
    'sarimbit-exclusive':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_51f1e349-35df-4896-b08d-6290f84897d9.jpg?v=1786005734',
    'sarimbit-premium':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_d8691b10-ece8-4430-a8c6-d184fa0c467a.jpg?v=1786004716',
    'sarimbit-ekonomis':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_7d17a644-177e-4489-bcf6-490c3c74d39f.jpg?v=1786005749',
  };

  const sarimbitMetadata = {
    'sarimbit-exclusive': {
      title: 'Sarimbit Exclusive',
      subtitle:
        'Kemewahan tenun sutra ATBM berpola presisi dengan aksen prada emas berkilau untuk perhelatan teragung keluarga.',
      badge: 'KASTA TERTINGGI • SUTRA ATBM & PRADA EMAS',
      cta: 'JELAJAHI KOLEKSI EKSKLUSIF',
    },
    'sarimbit-premium': {
      title: 'Sarimbit Premium',
      subtitle:
        'Tekstur tenun dobby berpadu furing katun hero sejuk untuk kenyamanan resepsi dan jamuan formal.',
      badge: 'RESEPSI & JAMUAN • TENUN DOBBY',
      cta: 'LIHAT KOLEKSI PREMIUM',
    },
    'sarimbit-ekonomis': {
      title: 'Sarimbit Ekonomis',
      subtitle:
        'Katun primisima premium super sejuk untuk kebersamaan dan silaturahmi keluarga sehari-hari.',
      badge: 'HARIAN & KELUARGA • KATUN PRIMISIMA',
      cta: 'LIHAT KOLEKSI EKONOMIS',
    },
  };

  const getCollectionData = (handle) => {
    const found = collections.find((c) => c.handle === handle);
    const meta = sarimbitMetadata[handle];
    return {
      handle,
      title: meta.title,
      subtitle: meta.subtitle,
      badge: meta.badge,
      cta: meta.cta,
      imageUrl:
        found?.image?.url || defaultFallbackImages[handle] || '/banners/hero_editorial_banner.jpg',
      altText: found?.image?.altText || meta.title,
    };
  };

  const exclusive = getCollectionData('sarimbit-exclusive');
  const premium = getCollectionData('sarimbit-premium');
  const ekonomis = getCollectionData('sarimbit-ekonomis');

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-b border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            SIGNATURE FAMILY HAUTE COUTURE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-4 leading-tight">
            Trilogi Sarimbit Nusantara
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Pusat busana seragam keluarga nomor satu di Semarang sejak 2007. Terbagi dalam tiga kasta material terkurasi: Sutra ATBM kemewahan tertinggi, Tenun Dobby perhelatan resmi, dan Katun Primisima sejuk harian.
          </p>
        </div>

        {/* Asymmetric 12-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Dominant Left: Sarimbit Exclusive (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <Link
              to={`/collections/${exclusive.handle}`}
              className="group relative flex-1 flex flex-col bg-[#111111] border border-[#C5A059]/40 hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_16px_40px_rgba(197,160,89,0.18)]"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[580px] w-full overflow-hidden bg-[#111111]">
                <img
                  src={exclusive.imageUrl}
                  alt={exclusive.altText}
                  loading="eager"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />

                {/* Ambient Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                {/* Top Badge Stamp */}
                <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-md border border-[#C5A059]/60 text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                    <span className="text-xs leading-none">◆</span>
                    {exclusive.badge}
                  </span>
                </div>

                {/* Editorial Overlay Copy */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end text-white z-10">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white group-hover:text-[#C5A059] transition-colors leading-tight mb-2">
                    {exclusive.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E2DFD8] font-light leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none mb-4">
                    {exclusive.subtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                    <span>{exclusive.cta}</span>
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Architectural Bar */}
              <div className="p-4 sm:p-5 bg-[#161616] border-t border-[#C5A059]/30 flex items-center justify-between transition-colors group-hover:bg-[#1A1A1A]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E2DFD8] font-semibold group-hover:text-[#C5A059] transition-colors">
                  KOLEKSI PERHELATAN TERAGUNG
                </span>
                <span className="text-xs text-[#C5A059] transform group-hover:translate-x-1 transition-transform">
                  &bull;
                </span>
              </div>
            </Link>
          </div>

          {/* Right Dual Stack: Sarimbit Premium & Sarimbit Ekonomis (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
            {/* Top Right: Sarimbit Premium */}
            <Link
              to={`/collections/${premium.handle}`}
              className="group relative flex-1 flex flex-col bg-[#111111] border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(197,160,89,0.14)]"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[275px] w-full overflow-hidden bg-[#111111]">
                <img
                  src={premium.imageUrl}
                  alt={premium.altText}
                  loading="eager"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/70 backdrop-blur-md border border-[#C5A059]/40 text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#C5A059] font-bold">
                    <span className="text-[10px] leading-none">◆</span>
                    {premium.badge}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#C5A059] transition-colors leading-snug mb-1">
                    {premium.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#E2DFD8] font-light line-clamp-1 mb-2">
                    {premium.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
                    <span>{premium.cta}</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white border-t border-[#E2DFD8] flex items-center justify-between transition-colors group-hover:bg-[#FAF8F5]">
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#111111] font-semibold group-hover:text-[#C5A059] transition-colors">
                  RESEPSI & JAMUAN KELUARGA
                </span>
                <span className="text-xs text-[#C5A059]">&bull;</span>
              </div>
            </Link>

            {/* Bottom Right: Sarimbit Ekonomis */}
            <Link
              to={`/collections/${ekonomis.handle}`}
              className="group relative flex-1 flex flex-col bg-[#111111] border border-[#E2DFD8] hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(197,160,89,0.14)]"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[275px] w-full overflow-hidden bg-[#111111]">
                <img
                  src={ekonomis.imageUrl}
                  alt={ekonomis.altText}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/70 backdrop-blur-md border border-[#C5A059]/40 text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#C5A059] font-bold">
                    <span className="text-[10px] leading-none">◆</span>
                    {ekonomis.badge}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-[#C5A059] transition-colors leading-snug mb-1">
                    {ekonomis.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#E2DFD8] font-light line-clamp-1 mb-2">
                    {ekonomis.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
                    <span>{ekonomis.cta}</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white border-t border-[#E2DFD8] flex items-center justify-between transition-colors group-hover:bg-[#FAF8F5]">
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#111111] font-semibold group-hover:text-[#C5A059] transition-colors">
                  KENYAMANAN SEHARI-HARI
                </span>
                <span className="text-xs text-[#C5A059]">&bull;</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
