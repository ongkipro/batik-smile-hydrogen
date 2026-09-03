import React from 'react';
import { Link } from 'react-router';

export const meta = () => {
  return [
    { title: 'Tentang Kami — Menjaga Warisan Luhur Batik Sejak 2007 | Batik Smile' },
    {
      name: 'description',
      content:
        'Profil resmi Batik Smile Nusantara. Berdiri sejak 2007 di Semarang dengan showroom flagship 3 lantai di Simongan dan cabang Banyumanik. Pelayanan berbudaya 3S 1C 1T & 1H.',
    },
  ];
};

export default function TentangKamiPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            SEMARANG &bull; ESTABLISHED 2007
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal tracking-wide">
            Perjalanan Menenun Senyum &amp; Martabat
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* Narrative Card (0px Radius) */}
        <div className="bg-white p-8 sm:p-14 border border-[#E2DFD8] shadow-sm space-y-6 text-xs sm:text-sm text-[#5A5550] leading-relaxed font-light mb-12">
          <blockquote className="font-serif text-lg sm:text-2xl text-[#111111] italic font-normal leading-snug border-l-2 border-[#C5A059] pl-6 py-1">
            &ldquo;Batik bukan sekadar torehan canting malam di atas bentangan mori, melainkan doa kesabaran, wibawa martabat, dan kehangatan ikatan kasih sebuah keluarga.&rdquo;
          </blockquote>

          <p>
            Berawal dari sebuah butik di kota Semarang pada tahun 2007, <strong>Batik Smile Nusantara</strong> lahir
            dengan dedikasi luhur: menghadirkan busana batik Nusantara yang tidak hanya anggun secara estetika, tetapi
            juga memberikan kenyamanan paripurna bagi pemakainya. Kami memadukan katun primisima bermutu tinggi, dobby timbul,
            dan sutra ATBM asli dengan lapisan furing hero katun yang sejuk dan menyerap keringat.
          </p>

          <p>
            Kini, dengan kehadiran <strong>Flagship Showroom 3 Lantai di Jl. Simongan Raya No. 109, Semarang</strong> serta
            <strong> Cabang Banyumanik di Jl. Sukun Raya No. 23</strong>, Batik Smile melayani ribuan keluarga,
            tokoh instansi, dan korporat dari seluruh penjuru Nusantara yang mendambakan keserasian busana sarimbit tanpa kompromi.
          </p>

          <p>
            Setiap helai kain dikerjakan oleh para pengrajin pembatik tulis dan cap tradisional di sentra batik Pekalongan,
            Solo, dan Cirebon yang kami bina secara berkelanjutan guna memastikan regenerasi warisan budaya tetap lestari.
          </p>
        </div>

        {/* Budaya Layanan 3S 1C 1T & 1H */}
        <div className="mb-14 bg-[#111111] text-white p-8 sm:p-12 border border-[#1C1C1C]">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A059] font-semibold block mb-2">
            STANDAR PELAYANAN BUTIK
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-6">
            Budaya 3S 1C 1T &amp; 1H
          </h2>
          <p className="text-xs text-[#E2DFD8] leading-relaxed font-light mb-8 max-w-2xl">
            Di Batik Smile, senyum bukan sekadar nama, melainkan janji tulus dalam setiap interaksi kami dengan Anda:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="border-l border-[#C5A059] pl-4">
              <span className="text-xs font-bold text-[#C5A059] block">SENYUM, SALAM, SAPA (3S)</span>
              <p className="text-[11px] text-[#A69F96] mt-1">Sambutan hangat penuh kekeluargaan sejak langkah pertama.</p>
            </div>
            <div className="border-l border-[#C5A059] pl-4">
              <span className="text-xs font-bold text-[#C5A059] block">CEPAT (1C)</span>
              <p className="text-[11px] text-[#A69F96] mt-1">Responsif dalam melayani kebutuhan motif dan ukuran kustom.</p>
            </div>
            <div className="border-l border-[#C5A059] pl-4">
              <span className="text-xs font-bold text-[#C5A059] block">TANGGAP (1T)</span>
              <p className="text-[11px] text-[#A69F96] mt-1">Solutif terhadap detail fitting dan pengiriman kilat acara.</p>
            </div>
            <div className="border-l border-[#C5A059] pl-4 sm:col-span-3">
              <span className="text-xs font-bold text-[#C5A059] block">HATI (1H)</span>
              <p className="text-[11px] text-[#A69F96] mt-1">Ketulusan hati dalam setiap jahitan dan layanan purna jual.</p>
            </div>
          </div>
        </div>

        {/* 3 Nilai Inti */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-14">
          <div className="bg-white p-6 border border-[#E2DFD8]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] mb-2">KEASLIAN MOTIF</h3>
            <p className="text-[11px] text-[#5A5550] leading-relaxed">
              Menjaga pakem filosofi corak batik klasik Jawa Tengah dan ketelitian goresan canting malam.
            </p>
          </div>
          <div className="bg-white p-6 border border-[#E2DFD8]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E7D3B] mb-2">KENYAMANAN SEJATI</h3>
            <p className="text-[11px] text-[#5A5550] leading-relaxed">
              Pemilihan kain mori primisima adem dan jahitan lapis furing katun hero standar butik haute.
            </p>
          </div>
          <div className="bg-white p-6 border border-[#E2DFD8]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3F1D] mb-2">BEBAS MINIMAL ORDER</h3>
            <p className="text-[11px] text-[#5A5550] leading-relaxed">
              Layanan jahit seragam keluarga maupun instansi tanpa batasan kuota minimum pemesanan.
            </p>
          </div>
        </div>

        {/* Matur Nuwun Box */}
        <div className="text-center bg-[#F4EFEA] p-8 border border-[#E2DFD8]">
          <h4 className="font-serif text-xl text-[#111111] italic font-normal mb-2">
            &ldquo;Matur Nuwun Sanget&rdquo;
          </h4>
          <p className="text-xs text-[#5A5550] max-w-lg mx-auto leading-relaxed font-light mb-6">
            Terima kasih telah mempercayakan momen-momen berharga keluarga Anda bersama karya cipta Batik Smile Nusantara.
          </p>
          <Link
            to="/collections/sarimbit-exclusive"
            className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
          >
            LIHAT KOLEKSI KAMI &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
