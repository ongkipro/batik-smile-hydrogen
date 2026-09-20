import React from 'react';
import { NavLink } from 'react-router';
import { BatikDivider, BatikCorner } from './BatikOrnaments';

export function SarimbitSpotlight() {
  return (
    <section className="py-20 px-6 sm:px-8 lg:px-12 bg-[#FDFBF7] text-[#121212]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-[#9E4719] font-bold">
            Trilogi Busana Keluarga
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-3 text-[#121212]">
            Tiga Kasta Sarimbit Nusantara
          </h2>
          <BatikDivider variant="soga" className="my-2" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Didedikasikan untuk menjaga marwah dan keharmonisan keluarga, dari pesta agung sakral
            hingga silaturahmi penuh kehangatan.
          </p>
        </div>

        {/* 3-Tier Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tier 1: Mahakarya (Large 5-col or 6-col Feature) */}
          <div className="lg:col-span-6 bg-[#0D0D0D] text-white rounded-2xl overflow-hidden relative group border border-amber-500/30 shadow-2xl flex flex-col justify-between">
            <BatikCorner position="top-left" variant="gold" size={40} className="z-20 top-4 left-4" />
            <BatikCorner position="bottom-right" variant="gold" size={40} className="z-20 bottom-4 right-4" />

            <div className="relative h-72 sm:h-96 overflow-hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_51f1e349-35df-4896-b08d-6290f84897d9.jpg?v=1786005734"
                alt="Sarimbit Mahakarya Heritage"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-black/40 to-transparent" />
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-[#C5A059] text-black shadow">
                  Tier 1 • Sutra Prada
                </span>
              </div>
            </div>

            <div className="p-8 relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C5A059] font-semibold">
                  Kasta Tertinggi
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 mb-2 text-white">
                  Sarimbit Mahakarya Heritage
                </h3>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed mb-6">
                  Ditenun dari sutra ATBM berkualitas ningrat dengan sentuhan canting prada emas
                  murni. Mahakarya abadi untuk pengantin dan keluarga utama di pelaminan.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">Mulai dari Rp 1.850.000 / Pasang</span>
                <NavLink
                  to="/collections/sarimbit-luxury"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:text-amber-200 transition-colors"
                >
                  Eksplorasi Mahakarya &rarr;
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right Stack: Tier 2 (Signature) & Tier 3 (Essential) */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Tier 2: Signature Elegance */}
            <div className="bg-[#1B2A4A] text-white rounded-2xl overflow-hidden relative group border border-blue-900/40 shadow-xl flex-1 flex flex-col sm:flex-row">
              <div className="sm:w-1/2 relative h-56 sm:h-auto overflow-hidden">
                <img
                  src="https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_d8691b10-ece8-4430-a8c6-d184fa0c467a.jpg?v=1786004716"
                  alt="Sarimbit Signature Elegance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-white/20 text-white backdrop-blur-sm border border-white/20">
                    Tier 2 • Dobby
                  </span>
                </div>
              </div>

              <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-sky-300 font-semibold">
                    Koleksi Desainer
                  </span>
                  <h4 className="font-serif text-xl font-bold mt-1 mb-2 text-white">
                    Signature Elegance
                  </h4>
                  <p className="text-[11px] text-neutral-200 leading-relaxed line-clamp-3 mb-4">
                    Kombinasi tenun dobby bertekstur timbul dengan furing hero lembut. Pas untuk acara
                    formal, gala dinner, dan wisuda.
                  </p>
                </div>
                <NavLink
                  to="/collections/sarimbit-premium"
                  className="text-xs font-semibold uppercase tracking-wider text-sky-300 hover:text-white transition-colors"
                >
                  Lihat Signature &rarr;
                </NavLink>
              </div>
            </div>

            {/* Tier 3: Essential Daily */}
            <div className="bg-white text-neutral-900 rounded-2xl overflow-hidden relative group border border-neutral-200/80 shadow-xl flex-1 flex flex-col sm:flex-row">
              <div className="sm:w-1/2 relative h-56 sm:h-auto overflow-hidden">
                <img
                  src="https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_7d17a644-177e-4489-bcf6-490c3c74d39f.jpg?v=1786005749"
                  alt="Sarimbit Essential Daily"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-[#9E4719] text-white">
                    Tier 3 • Katun
                  </span>
                </div>
              </div>

              <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#9E4719] font-semibold">
                    Kenyamanan Harian
                  </span>
                  <h4 className="font-serif text-xl font-bold mt-1 mb-2 text-neutral-900">
                    Essential Daily
                  </h4>
                  <p className="text-[11px] text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                    Katun primisima 100% adem dan sejuk di kulit. Motif kontemporer yang pas untuk
                    seragam keluarga saat hari raya dan silaturahmi.
                  </p>
                </div>
                <NavLink
                  to="/collections/sarimbit-ekonomi"
                  className="text-xs font-semibold uppercase tracking-wider text-[#9E4719] hover:text-[#7A320C] transition-colors"
                >
                  Jelajahi Essential &rarr;
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
