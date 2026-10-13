import React from 'react';
import { NavLink } from 'react-router';

/**
 * SarimbitSpotlight: Quiet Luxury 3-Tier Architecture
 * 100% Zero-Radius, Quad-Harmonic Palette, Hairline Dividers.
 */
export function SarimbitSpotlight() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] text-[#111111]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-1">
            TRILOGI BUSANA KELUARGA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] mb-3">
            Tiga Kasta Sarimbit Butik
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Didedikasikan untuk menjaga marwah dan keharmonisan keluarga, dari pesta agung sakral
            hingga silaturahmi penuh kehangatan.
          </p>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Tier 1: Luxury (6-col Feature) */}
          <div className="lg:col-span-6 bg-[#111111] text-white rounded-none border border-[#C5A059]/40 flex flex-col justify-between group overflow-hidden">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-black">
              <img
                src="https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_51f1e349-35df-4896-b08d-6290f84897d9.jpg?v=1786005734"
                alt="Luxury Series"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 text-[9px] uppercase font-semibold tracking-[0.2em] bg-[#111111]/85 text-[#C5A059] border border-[#C5A059]/50 backdrop-blur-sm">
                  KASTA I • SUTRA PRADA
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-medium block mb-1">
                  KASTA TERTINGGI
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2">
                  Luxury Series
                </h3>
                <p className="text-xs text-[#A6A098] font-light leading-relaxed mb-6">
                  Ditenun dari sutra ATBM berkualitas ningrat dengan sentuhan canting prada emas
                  murni. Mahakarya abadi untuk pengantin dan keluarga utama di pelaminan.
                </p>
              </div>

              <div className="pt-4 border-t border-[#C5A059]/20 flex items-center justify-between">
                <span className="text-[11px] text-[#888888]">Mulai Rp 1.500.000 / Pasang</span>
                <NavLink
                  to="/collections/luxury-series"
                  className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] hover:text-white transition-colors"
                >
                  Jelajahi Luxury &rarr;
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right Stack: Tier 2 (Premium) & Tier 3 (Ekonomi) */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8">
            {/* Tier 2: Premium */}
            <div className="bg-[#181818] text-white rounded-none border border-white/15 flex-1 flex flex-col sm:flex-row group overflow-hidden">
              <div className="sm:w-1/2 relative aspect-[4/5] sm:aspect-auto overflow-hidden bg-black">
                <img
                  src="https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_d8691b10-ece8-4430-a8c6-d184fa0c467a.jpg?v=1786004716"
                  alt="Premium Series"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[8.5px] uppercase font-semibold tracking-[0.18em] bg-black/75 text-[#C5A059] border border-[#C5A059]/40 backdrop-blur-sm">
                    KASTA II • DOBBY
                  </span>
                </div>
              </div>

              <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A059] font-medium block mb-1">
                    STANDAR RESEPSI
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2">
                    Premium Series
                  </h4>
                  <p className="text-[11px] text-[#A6A098] font-light leading-relaxed mb-4">
                    Kombinasi tenun dobby bertekstur timbul dengan furing hero lembut. Pas untuk acara
                    formal, gala dinner, dan wisuda.
                  </p>
                </div>
                <NavLink
                  to="/collections/premium-series"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] hover:text-white transition-colors"
                >
                  Lihat Premium &rarr;
                </NavLink>
              </div>
            </div>

            {/* Tier 3: Ekonomi */}
            <div className="bg-white text-[#111111] rounded-none border border-[#E2DFD8] flex-1 flex flex-col sm:flex-row group overflow-hidden">
              <div className="sm:w-1/2 relative aspect-[4/5] sm:aspect-auto overflow-hidden bg-[#FAF8F5]">
                <img
                  src="https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_7d17a644-177e-4489-bcf6-490c3c74d39f.jpg?v=1786005749"
                  alt="Ekonomi Series"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[8.5px] uppercase font-semibold tracking-[0.18em] bg-[#111111] text-white">
                    KASTA III • KATUN
                  </span>
                </div>
              </div>

              <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-medium block mb-1">
                    KENYAMANAN HARIAN
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] mb-2">
                    Ekonomi Series
                  </h4>
                  <p className="text-[11px] text-[#5A5550] font-light leading-relaxed mb-4">
                    Katun primisima 100% adem dan sejuk di kulit. Motif kontemporer yang pas untuk
                    seragam keluarga saat hari raya dan silaturahmi.
                  </p>
                </div>
                <NavLink
                  to="/collections/ekonomi-series"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111] hover:text-[#9E7D3B] transition-colors"
                >
                  Jelajahi Ekonomi &rarr;
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
