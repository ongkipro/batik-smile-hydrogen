import React from 'react';

const PROOFS = [
  {
    number: '01',
    title: 'Lapis Furing Hero Halus & Sejuk',
    subtitle: 'Kenyamanan Seharian Penuh',
    description:
      'Setiap kemeja pria dan gaun wanita dilapisi furing katun hero berkualitas ekspor. Halus di kulit, tidak menimbulkan gatal, dan secara alami menyerap keringat di iklim tropis.',
    image:
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
    tag: 'FURING HERO ADEM',
  },
  {
    number: '02',
    title: 'Simetri Motif Saku & Belahan Kancing',
    subtitle: 'Presisi Potongan Pola Butik',
    description:
      'Kami memotong pola kain satu per satu secara manual agar alur motif pusaka pada saku depan, kerah, dan belahan kancing menyambung presisi 100% simetris tanpa terputus.',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
    tag: 'POLA SAMBUNG PRESISI',
  },
  {
    number: '03',
    title: 'Pewarnaan Tradisional Tahan Lama',
    subtitle: 'Warna Soga Matang & Tidak Luntur',
    description:
      'Menggunakan teknik fiksasi tinggi yang mengunci kepekatan warna soga matang dan tarum indigo tetap cemerlang berwibawa meski telah dicuci berulang kali.',
    image:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    tag: 'ANTI-LUNTUR TERUJI',
  },
];

export function CraftsmanshipZoom() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white border-t border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
            STANDAR KUALITAS BUTIK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-tight mb-3">
            Ketelitian di Setiap Sentimeter Jahitan
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Keindahan busana batik sejati terletak pada detail tersembunyi yang tak kasat mata dari kejauhan. Inilah tiga
            standar pengerjaan butik yang membedakan Batik Smile dari konveksi pakaian massal.
          </p>
        </div>

        {/* 3 Proof Cards Grid (Zero-Radius) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROOFS.map((item) => (
            <div
              key={item.number}
              className="bg-[#FAF8F5] border border-[#E2DFD8] hover:border-[#C5A059] transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Photo Zoom Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest bg-black/80 text-white border border-white/20">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif text-xl font-normal text-[#C5A059]">{item.number}</span>
                    <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-[#888888]">
                      {item.subtitle}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
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
