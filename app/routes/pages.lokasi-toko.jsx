import React from 'react';
import { BatikDivider, BatikCorner } from '~/components/BatikOrnaments';

export const meta = () => {
  return [
    { title: 'Lokasi Showroom & Butik — Batik Smile Nusantara' },
    {
      name: 'description',
      content:
        'Kunjungi showroom butik 3 lantai Batik Smile di Semarang dan galeri Laweyan Solo.',
    },
  ];
};

export default function LokasiTokoPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E4719] font-bold">
            Kunjungi Kami
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-neutral-900">
            Showroom &amp; Galeri Butik
          </h1>
          <BatikDivider variant="soga" className="my-3" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Rasakan langsung kelembutan material kain sutra ATBM, coba busana di private fitting room,
            atau konsultasikan pesanan seragam keluarga dengan penjahit berpengalaman kami.
          </p>
        </div>

        {/* 2 Showroom Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Flagship Semarang */}
          <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm relative flex flex-col justify-between">
            <BatikCorner position="top-left" variant="gold" size={32} className="top-3 left-3 z-10" />

            <div className="p-8">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-[#9E4719] text-white inline-block mb-3">
                Flagship Store 3 Lantai
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
                Batik Smile Semarang
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Jl. Majapahit No. 128, Gayamsari, Kota Semarang, Jawa Tengah 50161
              </p>
              <div className="space-y-1.5 text-xs text-neutral-500 mb-6">
                <p>• <strong>Jam Buka:</strong> 09.00 - 21.00 WIB (Buka Setiap Hari)</p>
                <p>• <strong>Fasilitas:</strong> Parkir Luas, Mushola, VIP Fitting Room Lantai 3, Kafe</p>
                <p>• <strong>Telepon/WA:</strong> +62 812-3456-7890</p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded bg-neutral-900 hover:bg-[#9E4719] text-white text-xs font-semibold uppercase tracking-wider text-center block transition-colors"
              >
                Petunjuk Arah Google Maps &rarr;
              </a>
            </div>
          </div>

          {/* Solo Gallery */}
          <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm relative flex flex-col justify-between">
            <BatikCorner position="top-left" variant="gold" size={32} className="top-3 left-3 z-10" />

            <div className="p-8">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-[#C5A059] text-black inline-block mb-3">
                Heritage Gallery
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
                Batik Smile Solo Laweyan
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Kawasan Kampung Batik Laweyan, Jl. Dr. Rajiman No. 512, Surakarta
              </p>
              <div className="space-y-1.5 text-xs text-neutral-500 mb-6">
                <p>• <strong>Jam Buka:</strong> 09.00 - 20.00 WIB</p>
                <p>• <strong>Fasilitas:</strong> Galeri Sutra Tulis Tradisional, Konsultasi Motif</p>
                <p>• <strong>Telepon/WA:</strong> +62 812-9876-5432</p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded bg-neutral-900 hover:bg-[#9E4719] text-white text-xs font-semibold uppercase tracking-wider text-center block transition-colors"
              >
                Petunjuk Arah Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
