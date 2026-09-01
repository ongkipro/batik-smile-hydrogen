import React from 'react';
import { NavLink } from 'react-router';
import { BatikDivider } from './BatikOrnaments';

export function ShowroomO2O() {
  return (
    <section className="py-20 px-6 sm:px-8 lg:px-12 bg-neutral-900 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Features */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
              Pengalaman Offline-to-Online (O2O)
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 mb-4 text-white">
              Showroom Butik 3 Lantai &amp; Layanan Jahit Kustom
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-8">
              Batik Smile hadir memberikan pengalaman belanja terpadu. Kunjungi butik fisik kami di
              Semarang dan Solo untuk merasakan langsung kelembutan kain sutra ATBM, atau pesan seragam
              keluarga secara online dengan panduan ukuran terstandarisasi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-[#9E4719] text-white flex items-center justify-center font-serif text-sm font-bold mb-3">
                  3S
                </div>
                <h4 className="font-semibold text-sm text-white mb-1">
                  1 Toko, 1 Custom, 1 Tailor, 1 Hari
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Layanan ukur badan di tempat, pilihan ribuan motif kain, dan jahit kilat tanpa
                  minimal pemesanan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059] text-black flex items-center justify-center font-serif text-sm font-bold mb-3">
                  VIP
                </div>
                <h4 className="font-semibold text-sm text-white mb-1">
                  Private Fitting Room
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Ruang fitting eksklusif lantai 3 ber-AC untuk keluarga besar mencoba busana sarimbit
                  pernikahan dengan nyaman.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <NavLink
                to="/pages/layanan-seragam"
                className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#b08c45] text-black font-semibold text-xs uppercase tracking-widest rounded transition-colors"
              >
                Konsultasi Seragam Keluarga &rarr;
              </NavLink>
              <NavLink
                to="/pages/lokasi-toko"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-widest rounded border border-white/20 transition-colors"
              >
                Petunjuk Lokasi Butik
              </NavLink>
            </div>
          </div>

          {/* Right Column: Showroom Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl relative group">
              <img
                src="https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_shop_all_1786007684766.jpg?v=1786007711"
                alt="Showroom Batik Smile"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] mb-1">
                  Semarang Flagship Store
                </span>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Jl. Majapahit No. 128, Semarang
                </h3>
                <p className="text-xs text-neutral-300 mb-3">
                  Buka Setiap Hari: 09.00 - 21.00 WIB
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#C5A059] hover:underline"
                >
                  Buka di Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
