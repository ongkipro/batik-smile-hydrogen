import React from 'react';
import { BatikDivider, BatikCorner } from './BatikOrnaments';

const PROOFS = [
  {
    number: '01',
    title: 'Furing Hero Halus & Adem',
    subtitle: 'Kenyamanan Seharian Penuh',
    description:
      'Setiap kemeja pria dan dress wanita dilapisi furing katun hero berkualitas ekspor. Halus di kulit, tidak menimbulkan gatal, dan secara alami menyerap keringat di iklim tropis.',
    image:
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
    tag: 'Furing Hero Adem',
  },
  {
    number: '02',
    title: 'Simetri Motif Saku & Kancing',
    subtitle: 'Presisi Potongan Pola Butik',
    description:
      'Kami memotong pola kain satu per satu secara manual agar garis motif pada saku depan, kerah, dan belahan kancing menyambung presisi tanpa terputus.',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
    tag: 'Pola Sambung Presisi',
  },
  {
    number: '03',
    title: 'Pewarnaan Tradisional Tahan Lama',
    subtitle: 'Warna Soga Matang & Tidak Luntur',
    description:
      'Menggunakan teknik penguncian warna fiksasi tinggi yang menjaga kepekatan warna soga dan tarum indigo tetap cemerlang meski telah dicuci berulang kali.',
    image:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    tag: 'Anti-Luntur Teruji',
  },
];

export function CraftsmanshipZoom() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9E4719] font-bold">
            Standar Mutu Butik
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-3 text-neutral-900 leading-tight">
            Ketelitian di Setiap Jahitan
          </h2>
          <BatikDivider variant="soga" className="my-3" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Keindahan batik terletak pada ketelitian yang tak kasat mata dari kejauhan. Inilah tiga
            standar pengerjaan yang membedakan Batik Smile dari pakaian konveksi massal.
          </p>
        </div>

        {/* 3 Proof Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROOFS.map((item) => (
            <div
              key={item.number}
              className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between relative"
            >
              <BatikCorner position="top-left" variant="gold" size={28} className="top-3 left-3 z-10 opacity-60" />

              <div>
                {/* Photo Zoom Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded text-[9px] uppercase font-bold tracking-wider bg-black/75 text-white backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif text-xl font-bold text-[#C5A059]">{item.number}</span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-400">
                      {item.subtitle}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
