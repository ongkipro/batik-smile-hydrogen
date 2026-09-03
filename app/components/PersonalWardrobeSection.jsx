import React from 'react';
import { Link } from 'react-router';

/**
 * PersonalWardrobeSection: 3-Pillar Scattered Atelier Moodboard
 * Organic tilted cards with washi tape accents, archival plates, and hover un-tilting.
 * Dedicated to individual & multi-generational wardrobe pillars:
 * 1. Batik Pria (Sambung Motif & Furing Hero)
 * 2. Batik Wanita (Blus, Dress & Kebaya Modern)
 * 3. Batik Anak & Tradisional (Surjan Adat & Katun Lembut)
 *
 * @param {{
 *   collections?: any[];
 * }} props
 */
export function PersonalWardrobeSection({ collections = [] }) {
  const defaultFallbackImages = {
    'batik-pria':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_pria_1785995886986.jpg?v=1786004442',
    'batik-wanita':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_wanita_cat_1786004365241.jpg?v=1786004433',
    'batik-anak':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_anak_cat_1786004381125.jpg?v=1786004452',
  };

  const wardrobePillars = [
    {
      handle: 'batik-pria',
      title: 'Kemeja Batik Pria',
      subtitle:
        'Potongan pola menyatu presisi berlapis furing katun hero penyerap keringat untuk wibawa pria terhormat.',
      stamp: 'BATIK PRIA',
      plate: 'WDR-01',
      note: 'JAHITAN SAMBUNG MOTIF',
      tilt: 'rotate-1.5 sm:rotate-2',
      offset: 'lg:-translate-y-3',
      tapePos: 'left-8 -top-2.5',
      tapeAngle: 'rotate-2',
      cta: 'JELAJAHI BATIK PRIA',
    },
    {
      handle: 'batik-wanita',
      title: 'Busana Batik Wanita',
      subtitle:
        'Blus modern, tunik sutra anggun, outer elegan, dan kebaya kontemporer berkarakter anggun mempesona.',
      stamp: 'BATIK WANITA',
      plate: 'WDR-02',
      note: 'ANGGUN KONTEMPORER',
      tilt: '-rotate-2 sm:-rotate-2.5',
      offset: 'lg:translate-y-4',
      tapePos: 'right-8 -top-2.5',
      tapeAngle: '-rotate-3',
      cta: 'JELAJAHI BATIK WANITA',
    },
    {
      handle: 'batik-anak',
      title: 'Batik Anak & Tradisional',
      subtitle:
        'Setelan surjan adat Jawa, kebaya cilik, dan katun lembut ramah kulit anak untuk merawat cinta warisan luhur.',
      stamp: 'ANAK & TRADISI',
      plate: 'WDR-03',
      note: 'WARISAN LINTAS GENERASI',
      tilt: 'rotate-1 sm:rotate-1.5',
      offset: 'lg:-translate-y-2',
      tapePos: 'left-1/2 -translate-x-1/2 -top-2.5',
      tapeAngle: 'rotate-1',
      cta: 'JELAJAHI BATIK ANAK',
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-b border-[#E2DFD8] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            Koleksi Busana Pria, Wanita &amp; Anak
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Jahitan sambung motif presisi, furing katun hero adem, dan kenyamanan siluet kontemporer untuk seluruh keluarga.
          </p>
        </div>

        {/* 3 Scattered Atelier Moodboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-4 pb-6">
          {wardrobePillars.map((pillar, idx) => {
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
