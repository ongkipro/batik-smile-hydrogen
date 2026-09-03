import React from 'react';
import { Link } from 'react-router';

export const meta = () => {
  return [
    { title: 'Layanan Seragam & Jahit Kustom — Tanpa Minimal Order | Batik Smile' },
    {
      name: 'description',
      content:
        'Spesialis pengadaan seragam batik instansi medis, korporat, dan keluarga pernikahan tanpa minimal order. Portofolio RS Bhayangkara, RSUD dr. Adhyatma, dan perbankan.',
    },
  ];
};

export default function LayananSeragamPage() {
  const officialWaUrl =
    'https://wa.me/6281390888809?text=' +
    encodeURIComponent('Halo Batik Smile, saya ingin konsultasi pemesanan seragam / jahit kustom.');

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            SOLUSI BUSANA TERPADU &bull; TANPA MINIMAL ORDER
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal tracking-wide">
            Layanan Seragam &amp; Bespoke Tailoring
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed mb-10">
            Mulai dari kebutuhan 2 potong sarimbit pasangan hingga ribuan potong seragam resmi instansi medis dan korporasi, Batik Smile menjamin presisi potongan pola, kelembutan furing hero katun, dan ketepatan jadwal pengerjaan.
          </p>

          {/* Editorial Atelier Banner */}
          <div className="w-full aspect-[21/9] sm:aspect-[24/9] bg-[#111111] border border-[#E2DFD8] overflow-hidden mb-12 shadow-sm">
            <img
              src="/banners/bespoke_tailoring_banner.jpg"
              alt="Atelier Penjahit Bespoke Batik Smile"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* 3 Core Advantages (0px Radius) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 border border-[#E2DFD8] shadow-sm">
            <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase block mb-2">
              KEUNGGULAN 01
            </span>
            <h3 className="font-serif text-lg text-[#111111] font-normal mb-2">
              Tanpa Batasan MOQ
            </h3>
            <p className="text-xs text-[#5A5550] leading-relaxed font-light">
              Kami melayani pemesanan seragam tanpa batasan minimal order. Cocok untuk panitia keluarga inti (2–10 orang) hingga divisi kantor ratusan staf.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E2DFD8] shadow-sm">
            <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase block mb-2">
              KEUNGGULAN 02
            </span>
            <h3 className="font-serif text-lg text-[#111111] font-normal mb-2">
              Furing Hero Adem
            </h3>
            <p className="text-xs text-[#5A5550] leading-relaxed font-light">
              Seluruh kemeja dan busana formal kami lapisi furing hero katun lembut yang sejuk dan menyerap keringat seharian di ruangan ber-AC maupun jamuan outdoor.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E2DFD8] shadow-sm">
            <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase block mb-2">
              KEUNGGULAN 03
            </span>
            <h3 className="font-serif text-lg text-[#111111] font-normal mb-2">
              Panduan Fitting Digital
            </h3>
            <p className="text-xs text-[#5A5550] leading-relaxed font-light">
              Tim penjahit butik menyediakan lembar panduan ukuran badan terstandarisasi (LD/PB/PL) dan sampel ukuran yang dapat dikirim ke kantor Anda.
            </p>
          </div>
        </div>

        {/* Client Portfolio Trust Banner */}
        <div className="bg-[#111111] text-white p-8 sm:p-12 border border-[#1C1C1C] mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A059] font-semibold block mb-2">
              PORTOFOLIO KLIEN TERPERCAYA
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Dipercaya Instansi Kesehatan &amp; Korporasi
            </h2>
            <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-[#E2DFD8]">
            <div className="p-4 border border-white/10 bg-white/5">
              <strong className="block font-medium text-white mb-1">RS Bhayangkara Semarang</strong>
              <p className="text-[11px] text-[#A69F96]">Pengadaan seragam batik medis &amp; manajemen rumah sakit.</p>
            </div>
            <div className="p-4 border border-white/10 bg-white/5">
              <strong className="block font-medium text-white mb-1">RSUD dr. Adhyatma Tugurejo</strong>
              <p className="text-[11px] text-[#A69F96]">Busana batik formal tenaga kesehatan Jawa Tengah.</p>
            </div>
            <div className="p-4 border border-white/10 bg-white/5">
              <strong className="block font-medium text-white mb-1">Perbankan &amp; Instansi Publik</strong>
              <p className="text-[11px] text-[#A69F96]">Seragam frontliner, wisuda, dan resepsi keluarga besar.</p>
            </div>
          </div>
        </div>

        {/* 4-Step Simple Workflow */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-1">
              ALUR MUDAH &amp; TERSTRUKTUR
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal">
              4 Langkah Pemesanan Seragam
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#E2DFD8]">
              <span className="text-xl font-serif text-[#C5A059] block mb-2">01.</span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">KONSULTASI</h4>
              <p className="text-[11px] text-[#5A5550]">Pilih motif, bahan kain (katun/dobby/sutra), dan jumlah busana via WhatsApp.</p>
            </div>
            <div className="p-6 bg-white border border-[#E2DFD8]">
              <span className="text-xl font-serif text-[#C5A059] block mb-2">02.</span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">PENGUKURAN</h4>
              <p className="text-[11px] text-[#5A5550]">Isi tabel data ukuran anggota keluarga atau kirim sampel baju yang pas.</p>
            </div>
            <div className="p-6 bg-white border border-[#E2DFD8]">
              <span className="text-xl font-serif text-[#C5A059] block mb-2">03.</span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">PRODUKSI BUTIK</h4>
              <p className="text-[11px] text-[#5A5550]">Pemotongan pola motif presisi, jahit furing hero, dan quality control ketat.</p>
            </div>
            <div className="p-6 bg-white border border-[#E2DFD8]">
              <span className="text-xl font-serif text-[#C5A059] block mb-2">04.</span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">PENGIRIMAN</h4>
              <p className="text-[11px] text-[#5A5550]">Dikemas rapi dan dikirim aman ke alamat Anda dengan garansi bebas tukar ukuran.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="bg-[#FAF8F5] p-8 sm:p-12 border border-[#C5A059] text-center">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-3">
            Konsultasikan Kebutuhan Seragam Anda Sekarang
          </h3>
          <p className="text-xs text-[#5A5550] max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Dapatkan katalog pilihan bahan kain, konsultasi motif sarimbit, dan simulasi penawaran harga instan dari tim butik kami.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={officialWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
            >
              CHAT WHATSAPP RESMI: 081-390-8888-09 &rarr;
            </a>
            <Link
              to="/collections/sarimbit-exclusive"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-[#111111] !text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] hover:bg-[#111111] hover:!text-white transition-colors"
            >
              LIHAT CONTOH SARIMBIT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
