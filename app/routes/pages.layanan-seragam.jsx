import React from 'react';
import { NavLink } from 'react-router';
import { BatikDivider, BatikCorner } from '~/components/BatikOrnaments';

export const meta = () => {
  return [
    { title: 'Layanan Jahit Kustom & Seragam — Batik Smile Nusantara' },
    {
      name: 'description',
      content:
        'Pesan seragam batik kantor, keluarga, pernikahan tanpa minimal order. Layanan 3S 1C 1T 1H dengan kain primisima dan furing halus.',
    },
  ];
};

export default function LayananSeragamPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E4719] font-bold">
            Solusi Busana Terpadu
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-neutral-900">
            Layanan Jahit Kustom &amp; Seragam Nusantara
          </h1>
          <BatikDivider variant="soga" className="my-3" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Dari kebutuhan seragam keluarga untuk resepsi pernikahan hingga seragam instansi korporat
            ribuan potong, Batik Smile menjamin presisi potongan pola, kelembutan furing hero, dan
            ketepatan waktu pengerjaan.
          </p>
        </div>

        {/* 3S 1C 1T 1H Advantage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm relative">
            <BatikCorner position="top-left" variant="gold" size={28} className="top-2 left-2" />
            <div className="w-10 h-10 rounded-lg bg-[#9E4719] text-white flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="font-serif text-lg font-bold mb-2">Bebas Minimal Order</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Kami melayani pesanan sarimbit mulai dari 2 potong (pasangan suami-istri) hingga ratusan
              potong untuk instansi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm relative">
            <BatikCorner position="top-left" variant="gold" size={28} className="top-2 left-2" />
            <div className="w-10 h-10 rounded-lg bg-[#C5A059] text-black flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="font-serif text-lg font-bold mb-2">Pilihan 1.000+ Motif</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Pilih dari koleksi motif klasik (Parang, Kawung, Sekar Jagad) hingga motif kontemporer
              eksklusif desainer kami.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm relative">
            <BatikCorner position="top-left" variant="gold" size={28} className="top-2 left-2" />
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="font-serif text-lg font-bold mb-2">Panduan Ukuran Terpadu</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Tim penjahit kami menyediakan form ukur badan online praktis dan sample fitting yang
              bisa dikirim ke alamat Anda.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-neutral-900 text-white p-8 sm:p-12 rounded-2xl border border-amber-500/20 shadow-xl text-center relative overflow-hidden">
          <BatikCorner position="top-left" variant="gold" size={40} className="top-4 left-4 z-10" />
          <BatikCorner position="bottom-right" variant="gold" size={40} className="bottom-4 right-4 z-10" />

          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
            Konsultasikan Kebutuhan Seragam Anda Sekarang
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Dapatkan katalog bahan kain, simulasi harga instan, dan contoh portofolio seragam yang
            telah kami selesaikan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20seragam"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-[#C5A059] hover:bg-[#b08c45] text-black font-bold text-xs uppercase tracking-widest rounded transition-all shadow-lg"
            >
              Chat Konsultan Seragam via WhatsApp &rarr;
            </a>
            <NavLink
              to="/collections/sarimbit-batik-couple"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded border border-white/20 transition-all"
            >
              Lihat Contoh Sarimbit
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
