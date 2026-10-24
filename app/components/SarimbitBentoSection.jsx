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
    'luxury-series':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_51f1e349-35df-4896-b08d-6290f84897d9.jpg?v=1786005734',
    'premium-series':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_d8691b10-ece8-4430-a8c6-d184fa0c467a.jpg?v=1786004716',
    'ekonomi-series':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_7d17a644-177e-4489-bcf6-490c3c74d39f.jpg?v=1786005749',
    'sarimbit-luxury':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_51f1e349-35df-4896-b08d-6290f84897d9.jpg?v=1786005734',
    'sarimbit-premium':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_d8691b10-ece8-4430-a8c6-d184fa0c467a.jpg?v=1786004716',
    'sarimbit-ekonomi':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_7d17a644-177e-4489-bcf6-490c3c74d39f.jpg?v=1786005749',
  };

  const sarimbitPillars = [
    {
      handle: 'luxury-series',
      title: 'Luxury Series',
      subtitle:
        'Koleksi Luxury Batik Smile yang merepresentasikan kemewahan, keanggunan, dan kualitas dalam setiap detail untuk melengkapi momen berharga.',
      stamp: 'LUXURY',
      plate: 'SRM-01',
      note: '',
      cta: 'JELAJAHI LUXURY',
    },
    {
      handle: 'premium-series',
      title: 'Premium Series',
      subtitle:
        'Tekstur tenun dobby dengan opsi lapisan trikot kokoh untuk kenyamanan resepsi pernikahan dan jamuan resmi.',
      stamp: 'PREMIUM',
      plate: 'SRM-02',
      note: 'TENUN DOBBY & LAPIS TRIKOT',
      cta: 'LIHAT PREMIUM',
    },
    {
      handle: 'ekonomi-series',
      title: 'Ekonomi Series',
      subtitle:
        'Katun primisima premium super adem untuk kehangatan silaturahmi dan busana kasual keluarga sehari-hari.',
      stamp: 'EKONOMI',
      plate: 'SRM-03',
      note: 'KATUN PRIMISIMA SEJUK',
      cta: 'LIHAT EKONOMI',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
            PILIHAN KASTA BUSANA KELUARGA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            Trilogi Koleksi Busana
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Pusat busana seragam keluarga nomor satu di Semarang sejak 2007. Terbagi dalam tiga kasta material: Sutra ATBM kemewahan tertinggi, Tenun Dobby perhelatan resmi, dan Katun Primisima sejuk harian.
          </p>
        </div>

        {/* 3 Architectural Luxury Pillar Cards (Clean, Rectilinear, Zero-Radius) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2 pb-2">
          {sarimbitPillars.map((pillar, idx) => {
            const found = collections.find((c) => c.handle === pillar.handle);
            const displayTitle = found?.title || pillar.title;
            const imageUrl =
              found?.image?.url ||
              defaultFallbackImages[pillar.handle] ||
              '/banners/hero_editorial_banner.jpg';
            const altText = found?.image?.altText || displayTitle;

            const isPillarPremium = pillar.handle === 'premium-series' || pillar.handle === 'sarimbit-premium';
            const isPillarLuxury = pillar.handle === 'luxury-series' || pillar.handle === 'sarimbit-luxury';

            return (
              <div
                key={pillar.handle}
                className="relative group transition-all duration-300"
              >
                {/* Strict 4:5 Portrait Curated Card (Rectilinear & Minimalist) */}
                <Link
                  to={`/collections/${pillar.handle}`}
                  className={`block relative aspect-[4/5] bg-[#111111] overflow-hidden border transition-all duration-500 no-underline shadow-xs hover:shadow-md ${
                    isPillarPremium
                      ? 'border-[#7C3F1D]/50 hover:border-[#C5A059]'
                      : isPillarLuxury
                      ? 'border-[#C5A059]/40 hover:border-[#C5A059]'
                      : 'border-[#E2DFD8] hover:border-[#C5A059]'
                  }`}
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
                  <div
                    className={`absolute inset-0 p-5 sm:p-7 flex flex-col justify-end text-white ${
                      isPillarPremium
                        ? 'bg-gradient-to-t from-[#20140D]/95 via-[#2E1D13]/55 to-black/25'
                        : 'bg-gradient-to-t from-black/95 via-black/45 to-black/20'
                    }`}
                  >
                    {/* Bottom Bar: Collection Editorial Info */}
                    <div>
                      {pillar.note && (
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-1">
                          ARSIP BUTIK &bull; {pillar.note}
                        </span>
                      )}

                      <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug text-white group-hover:text-[#C5A059] transition-colors mb-2">
                        {displayTitle}
                      </h3>

                      <p className="text-[11px] text-[#E2DFD8]/85 font-light line-clamp-2 mb-3.5">
                        {pillar.subtitle}
                      </p>

                      {/* Action Line */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-white/20">
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white group-hover:text-[#C5A059] transition-colors flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 group-hover:rotate-45 transition-transform duration-300 ${
                              isPillarPremium ? 'bg-[#D5B066]' : 'bg-[#C5A059]'
                            }`}
                          />
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
