import React from 'react';
import { NavLink } from 'react-router';
import { BatikDivider, BatikCorner } from '~/components/BatikOrnaments';

export const meta = () => {
  return [
    { title: 'Tentang Kami — Batik Smile Nusantara' },
    {
      name: 'description',
      content:
        'Kisah perjalanan butik Batik Smile sejak 2007 di Semarang & Solo dalam melestarikan seni batik warisan Nusantara.',
    },
  ];
};

export default function TentangKamiPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E4719] font-bold">
            Sejak 2007
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-neutral-900">
            Perjalanan Menenun Senyum &amp; Martabat
          </h1>
          <BatikDivider variant="soga" className="my-3" />
        </div>

        {/* Story Content */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-neutral-200 shadow-sm relative space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans mb-12">
          <BatikCorner position="top-left" variant="gold" size={36} className="top-4 left-4" />
          <BatikCorner position="bottom-right" variant="gold" size={36} className="bottom-4 right-4" />

          <p className="font-serif text-lg sm:text-xl text-neutral-900 italic font-semibold leading-snug">
            &ldquo;Batik bukan sekadar torehan malam di atas kain mori, melainkan doa, martabat, dan
            kehangatan ikatan rasa sebuah keluarga.&rdquo;
          </p>

          <p>
            Berawal dari butik rumahan di Semarang pada tahun 2007, <strong>Batik Smile</strong> lahir
            dengan cita-cita sederhana: menghadirkan busana batik yang tidak hanya indah dipandang
            karena coraknya yang adiluhung, tetapi juga nyaman dikenakan sepanjang hari berkat
            pemilihan material katun primisima pilihan dan furing hero lembut.
          </p>

          <p>
            Kini, dengan showroom 3 lantai di Semarang dan galeri di kawasan cagar budaya Laweyan Solo,
            kami terus memberdayakan ratusan pembatik tradisional dan penjahit lokal untuk
            menciptakan mahakarya sarimbit keluarga, kemeja pria berwibawa, dan busana wanita anggun.
          </p>
        </div>

        {/* 3 Nilai Inti */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h4 className="font-serif text-base font-bold text-[#9E4719] mb-1">Keaslian Motif</h4>
            <p className="text-xs text-neutral-500">
              Menjaga pakem filosofi corak batik klasik Jawa Tengah.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h4 className="font-serif text-base font-bold text-[#C5A059]">Kenyamanan Sejati</h4>
            <p className="text-xs text-neutral-500">
              Kain mori adem dan jahitan lapis furing hero halus.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h4 className="font-serif text-base font-bold text-neutral-900">Pelayanan Kekeluargaan</h4>
            <p className="text-xs text-neutral-500">
              Pendampingan konsultasi ukuran &amp; kustom seragam tulus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
