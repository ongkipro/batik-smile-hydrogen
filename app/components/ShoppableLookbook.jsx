import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { BatikDivider, BatikCorner } from './BatikOrnaments';

const HOTSPOTS = [
  {
    id: 'ayah',
    title: 'Kemeja Pria Furing Halus',
    subtitle: 'Signature Tenun Dobby Timbul',
    price: 'Rp 450.000',
    topPercent: 32,
    leftPercent: 38,
    url: '/products/batik-smile-kemeja-signature-dobby',
  },
  {
    id: 'ibu',
    title: 'Gamis Brokat Prada Silk',
    subtitle: 'Mahakarya Gold Edition',
    price: 'Rp 850.000',
    topPercent: 44,
    leftPercent: 68,
    url: '/products/batik-smile-gamis-mahakarya-silk',
  },
  {
    id: 'anak',
    title: 'Kemeja Anak Laki Furing',
    subtitle: 'Essential Katun Adem',
    price: 'Rp 225.000',
    topPercent: 65,
    leftPercent: 48,
    url: '/products/batik-smile-kemeja-anak-batik',
  },
];

export function ShoppableLookbook() {
  const [activePin, setActivePin] = useState(HOTSPOTS[0]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9E4719] font-bold">
            Inspirasi Busana Terpadu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-3 text-neutral-900 leading-tight">
            Shop The Family Look
          </h2>
          <BatikDivider variant="soga" className="my-3" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Sentuh titik interaktif pada foto keluarga di bawah ini untuk melihat rincian busana
            setiap anggota keluarga dan langsung membeli satu set sarimbit serasi.
          </p>
        </div>

        {/* Interactive Lookbook Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Photo with Pulsing Hotspot Pins */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-200">
            <BatikCorner position="top-left" variant="gold" size={36} className="top-3 left-3 z-10" />
            <BatikCorner position="bottom-right" variant="gold" size={36} className="bottom-3 right-3 z-10" />

            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1400&auto=format&fit=crop"
              alt="Sarimbit Keluarga Batik Smile"
              className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover object-top"
            />

            {/* Hotspot Pins */}
            {HOTSPOTS.map((pin) => {
              const isSelected = activePin?.id === pin.id;
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setActivePin(pin)}
                  style={{ top: `${pin.topPercent}%`, left: `${pin.leftPercent}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                  aria-label={`Lihat ${pin.title}`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-[#C5A059]' : 'bg-white'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-xs font-bold shadow-lg border-2 border-white transition-transform duration-300 ${
                        isSelected ? 'bg-[#9E4719] text-white scale-125' : 'bg-neutral-900 text-white group-hover:scale-110'
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Preview Sidebar */}
          <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-md flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block mb-1">
                Karya Pilihan Terpilih
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-1">
                {activePin?.title}
              </h3>
              <p className="text-xs text-neutral-500 mb-4">{activePin?.subtitle}</p>

              <div className="text-2xl font-bold text-[#9E4719] mb-6 font-sans">
                {activePin?.price}
              </div>

              <div className="space-y-3 text-xs text-neutral-600 border-t border-b border-neutral-100 py-4 mb-6">
                <p>• <strong>Karakter:</strong> Jahitan butik furing halus adem.</p>
                <p>• <strong>Pilihan Ukuran:</strong> S, M, L, XL, XXL, Custom Sizing.</p>
                <p>• <strong>Garansi:</strong> 100% Bebas Tukar Size jika tidak pas.</p>
              </div>
            </div>

            <div className="space-y-3">
              <NavLink
                to={activePin?.url || '/collections/sarimbit-batik-couple'}
                className="w-full py-3.5 px-6 rounded bg-[#9E4719] hover:bg-[#7A320C] text-white font-bold text-xs uppercase tracking-widest text-center block transition-all shadow-md"
              >
                Pilih Ukuran &amp; Beli &rarr;
              </NavLink>

              <NavLink
                to="/collections/sarimbit-batik-couple"
                className="w-full py-3 px-6 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs uppercase tracking-wider text-center block transition-colors"
              >
                Beli 1 Paket Keluarga Lengkap
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
