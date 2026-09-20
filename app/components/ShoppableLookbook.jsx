import React, { useState } from 'react';
import { Link } from 'react-router';

const DEFAULT_HOTSPOTS = [
  {
    id: 'pria',
    title: 'KEMEJA SARIMBIT PRIA',
    subtitle: 'Signature Dobby & Furing Hero Halus',
    price: 'Rp 450.000',
    topPercent: 32,
    leftPercent: 36,
    url: '/collections/sarimbit-luxury?gender=pria',
  },
  {
    id: 'wanita',
    title: 'DRESS SARIMBIT WANITA',
    subtitle: 'Motif Sekar Jagad Imperial',
    price: 'Rp 650.000',
    topPercent: 42,
    leftPercent: 64,
    url: '/collections/sarimbit-luxury?gender=wanita',
  },
  {
    id: 'anak',
    title: 'KEMEJA BATIK ANAK',
    subtitle: 'Katun Primisima Halus & Nyaman',
    price: 'Rp 225.000',
    topPercent: 66,
    leftPercent: 50,
    url: '/collections/batik-anak',
  },
];

/**
 * ShoppableLookbook: Engrasia Hotspot Archetype
 * Interactive hotspot pins over family photography with Graceful Fallback
 *
 * @param {{
 *   lookbook?: any;
 * }} props
 */
export function ShoppableLookbook({ lookbook }) {
  const [activePin, setActivePin] = useState(DEFAULT_HOTSPOTS[0]);

  const heading = lookbook?.heading?.value || 'SHOP THE FAMILY LOOK';
  const eyebrow = lookbook?.eyebrow?.value || 'INSPIRASI BUSANA SARIMBIT';
  const narrative =
    lookbook?.narrative?.value ||
    'Sentuh titik interaktif pada foto keluarga di bawah ini untuk melihat rincian busana setiap anggota keluarga dan temukan harmoni corak yang sempurna.';

  const imageUrl =
    lookbook?.image?.reference?.image?.url ||
    lookbook?.image?.value ||
    '/banners/sarimbit_family_banner.jpg';

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-b border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-2">
            {eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-wide font-normal">
            {heading}
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            {narrative}
          </p>
        </div>

        {/* Interactive Canvas Grid (Adaptive 7/5 Desktop & 8/4 Ultrawide) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch">
          {/* Main Photo Container with 0px Radius and Adaptive Min-Height */}
          <div className="lg:col-span-7 xl:col-span-8 relative bg-[#111111] border border-[#E2DFD8] overflow-hidden shadow-sm aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px]">
            <img
              src={imageUrl}
              alt="Sarimbit Keluarga Batik Smile"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />

            {/* Pulsing Hotspot Pins (Square Quiet Luxury) */}
            {DEFAULT_HOTSPOTS.map((pin) => {
              const isSelected = activePin?.id === pin.id;
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setActivePin(pin)}
                  style={{ top: `${pin.topPercent}%`, left: `${pin.leftPercent}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                  aria-label={`Lihat ${pin.title}`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full opacity-75 ${
                        isSelected ? 'bg-[#C5A059]' : 'bg-white'
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-6 w-6 items-center justify-center text-[10px] font-bold shadow-md border border-white transition-transform duration-300 ${
                        isSelected
                          ? 'bg-[#111111] text-[#C5A059] scale-110'
                          : 'bg-white text-[#111111] group-hover:scale-110'
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Preview Card (Adaptive Padding & Wrap Prevention) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white p-6 sm:p-7 xl:p-8 border border-[#E2DFD8] flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-2">
                DETAIL KARYA PILIHAN
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-1">
                {activePin?.title}
              </h3>
              <p className="text-xs text-[#5A5550] mb-4 font-light">{activePin?.subtitle}</p>

              <div className="text-xl font-semibold text-[#111111] mb-6 tracking-wide">
                {activePin?.price}
              </div>

              <div className="space-y-3 text-xs text-[#5A5550] border-t border-b border-[#E2DFD8] py-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-[11px] sm:text-xs">
                  <span className="text-[#7C3F1D] font-medium shrink-0">Konstruksi:</span>
                  <strong className="text-[#111111] font-medium sm:text-right">Jahitan butik furing katun hero</strong>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-[11px] sm:text-xs">
                  <span className="text-[#7C3F1D] font-medium shrink-0">Pilihan Ukuran:</span>
                  <strong className="text-[#111111] font-medium sm:text-right">S, M, L, XL, XXL, Custom</strong>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-[11px] sm:text-xs">
                  <span className="text-[#7C3F1D] font-medium shrink-0">Garansi:</span>
                  <strong className="text-[#111111] font-medium sm:text-right">100% Bebas Tukar Ukuran</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                to={activePin?.url || '/collections/sarimbit-luxury'}
                className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] sm:text-[11px] uppercase font-semibold tracking-[0.16em] text-center block transition-colors duration-300 shadow-sm"
              >
                LIHAT DETAIL PRODUK &rarr;
              </Link>

              <Link
                to="/collections/sarimbit-luxury"
                className="w-full py-3 px-4 bg-[#FAF8F5] hover:bg-[#111111] !text-[#111111] hover:!text-white text-[10px] sm:text-[11px] uppercase font-semibold tracking-[0.16em] text-center block border border-[#E2DFD8] hover:border-[#111111] transition-colors duration-300"
              >
                LIHAT SELURUH SARIMBIT &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
