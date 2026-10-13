import React from 'react';
import { Link } from 'react-router';

/**
 * ShowroomO2O: Authentic Physical Showrooms
 * Flagship Simongan (3 Floors) & Banyumanik Branch
 */
export function ShowroomO2O() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#111111] text-white relative overflow-hidden">
      <div className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {/* Left Column: Authentic Brand Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium block mb-2">
                SHOWROOM &amp; BUTIK RESMI SEMARANG
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-4 leading-tight">
                Batik Smile Sampokong &amp; Batik Smile Sukun
              </h2>
              <p className="text-[#E2DFD8] text-xs sm:text-sm leading-relaxed mb-6 font-light">
                Didirikan sejak 2007 di Semarang, Batik Smile menghadirkan showroom butik yang
                nyaman di Simongan (Sampokong) serta Sukun (Banyumanik). Rasakan langsung kehalusan tenun sutra ATBM,
                dobby bertekstur, hingga katun primisima untuk kebutuhan busana dan seragam keluarga Anda.
              </p>

              {/* 2 Showroom Cards (0px radius) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-[#1C1C1C] border border-white/10 hover:border-[#C5A059]/40 transition-colors">
                  <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#C5A059] block mb-1.5">
                    JL. SIMONGAN RAYA NO. 109
                  </span>
                  <h3 className="font-serif text-base font-semibold text-white mb-1.5">
                    Batik Smile Sampokong
                  </h3>
                  <p className="text-[11px] text-[#A69F96] leading-relaxed font-light">
                    Koleksi sarimbit keluarga, kemeja pria, blus &amp; dress wanita siap pakai, serta galeri kain batik tulis dengan ruang ganti yang nyaman.
                  </p>
                </div>

                <div className="p-6 bg-[#1C1C1C] border border-white/10 hover:border-[#C5A059]/40 transition-colors">
                  <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#C5A059] block mb-1.5">
                    JL. SUKUN RAYA NO. 23
                  </span>
                  <h3 className="font-serif text-base font-semibold text-white mb-1.5">
                    Batik Smile Sukun
                  </h3>
                  <p className="text-[11px] text-[#A69F96] leading-relaxed font-light">
                    Showroom strategis di kawasan Banyumanik dengan koleksi lengkap busana kerja, kasual harian, sarimbit keluarga, dan batik anak.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/pages/lokasi-toko"
                className="px-8 py-4 bg-[#C5A059] hover:bg-[#9E7D3B] text-[#111111] hover:text-white font-semibold text-[11px] uppercase tracking-[0.18em] transition-colors"
              >
                PANDUAN LENGKAP LOKASI BUTIK &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Showroom Visual Card Full Height */}
          <div className="lg:col-span-5 relative flex">
            <div className="border border-[#C5A059]/40 relative group overflow-hidden bg-[#1C1C1C] w-full min-h-[440px] sm:min-h-[500px] flex flex-col justify-end">
              <img
                src="/brand/showroom/showroom_interior_textiles.jpeg"
                alt="Showroom Butik Batik Smile Sampokong"
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end z-10">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#C5A059] mb-1">
                  BUTIK &amp; SHOWROOM RESMI
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-1.5">
                  Batik Smile Sampokong
                </h3>
                <p className="text-xs text-[#E2DFD8] mb-2 font-light">
                  Jl. Simongan Raya No. 109, Pamularsih, Semarang
                </p>
                <p className="text-[11px] text-[#A69F96] mb-4">
                  Buka Setiap Hari: 09.00 - 21.00 WIB
                </p>
                <Link
                  to="/pages/lokasi-toko"
                  className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#C5A059] hover:text-white flex items-center gap-1.5"
                >
                  <span>Lihat Petunjuk Arah &amp; Batik Smile Sukun</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
