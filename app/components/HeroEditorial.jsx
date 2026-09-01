import React from 'react';
import { NavLink } from 'react-router';
import { BatikCorner } from './BatikOrnaments';

export function HeroEditorial() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-12 pb-20 lg:pt-16 lg:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Brand Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/50 w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#9E4719] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#9E4719]">
                Butik Asli Nusantara • Sejak 2007
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.15] tracking-tight mb-6">
              Mahakarya Busana &amp;{' '}
              <span className="italic font-normal text-[#9E4719]">Sarimbit Keluarga</span>
            </h1>

            {/* Sub-narrative */}
            <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-xl mb-8">
              Menenun keanggunan motif klasik dan kenyamanan furing hero halus. Hadirkan kehangatan,
              wibawa, dan keserasian sejati untuk setiap resepsi, jamuan resmi, dan hari raya keluarga.
            </p>

            {/* Quick 3-Tier Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-10">
              <span className="text-xs font-semibold text-neutral-400 mr-1">Koleksi:</span>
              <NavLink
                to="/collections/sarimbit-mahakarya-heritage"
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-neutral-900 text-amber-300 border border-amber-400/30 hover:bg-neutral-800 transition-colors"
              >
                ✦ Mahakarya Sutra
              </NavLink>
              <NavLink
                to="/collections/sarimbit-signature-elegance"
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-sky-950 text-sky-200 border border-sky-400/30 hover:bg-sky-900 transition-colors"
              >
                ✦ Signature Dobby
              </NavLink>
              <NavLink
                to="/collections/sarimbit-essential-daily"
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-300/50 hover:bg-amber-100 transition-colors"
              >
                ✦ Essential Katun
              </NavLink>
            </div>

            {/* Primary & Secondary Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <NavLink
                to="/collections/sarimbit-batik-couple"
                className="px-8 py-4 rounded bg-[#9E4719] hover:bg-[#7A320C] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Jelajahi Koleksi Sarimbit &rarr;
              </NavLink>

              <NavLink
                to="/pages/layanan-seragam"
                className="px-6 py-4 rounded bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs uppercase tracking-wider border border-neutral-300 transition-all text-center shadow-sm"
              >
                Konsultasi Jahit Seragam
              </NavLink>
            </div>
          </div>

          {/* Right Column: High-Fashion 4:5 Portrait Lookbook */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-200/80 group">
              <BatikCorner position="top-left" variant="gold" size={40} className="top-4 left-4 z-10" />
              <BatikCorner position="bottom-right" variant="gold" size={40} className="bottom-4 right-4 z-10" />

              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop"
                alt="Model Sarimbit Batik Smile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Reassurance Overlay Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#C5A059] font-bold block">
                    Sarimbit Signature Edition
                  </span>
                  <span className="font-serif text-sm font-semibold">
                    Corak Sekar Jagad &amp; Dobby Timbul
                  </span>
                </div>
                <span className="text-xs font-bold text-[#C5A059]">Rp 1.2jt / Set</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
