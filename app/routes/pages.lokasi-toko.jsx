import React from 'react';
import { Link } from 'react-router';

export const meta = () => {
  return [
    { title: 'Lokasi Showroom & Butik Resmi Semarang — Batik Smile Nusantara' },
    {
      name: 'description',
      content:
        'Panduan kunjungan ke butik resmi Batik Smile di Semarang. Flagship Store 3 Lantai di Simongan Raya No. 109 dan Cabang Banyumanik di Sukun Raya No. 23. Buka setiap hari 09.00 - 21.00 WIB.',
    },
  ];
};

export default function LokasiTokoPage() {
  const officialWaUrl =
    'https://wa.me/6281390888809?text=' +
    encodeURIComponent('Halo Batik Smile, saya ingin menanyakan rute lokasi butik.');

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            KUNJUNGI BUTIK KAMI DI SEMARANG
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal tracking-wide">
            Lokasi Butik &amp; Showroom Resmi
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Rasakan kelembutan kain sutra ATBM dan primisima pilihan secara langsung, coba busana sarimbit di fitting room privat, atau konsultasikan ukuran seragam keluarga Anda.
          </p>
        </div>

        {/* 2 Authentic Showrooms Grid (0px Radius) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Flagship Simongan (3 Lantai) */}
          <div className="bg-white border border-[#E2DFD8] shadow-sm flex flex-col justify-between p-8">
            <div>
              <span className="px-3 py-1 text-[9px] uppercase font-bold tracking-[0.2em] bg-[#111111] text-[#C5A059] inline-block mb-4">
                FLAGSHIP STORE &bull; GEDUNG 3 LANTAI
              </span>
              <h2 className="font-serif text-2xl text-[#111111] font-normal mb-2">
                Batik Smile Simongan (Flagship)
              </h2>
              <p className="text-xs text-[#5A5550] leading-relaxed mb-6 font-light">
                Jl. Simongan Raya No. 109, Pamularsih, Semarang, Jawa Tengah
              </p>

              <div className="space-y-2.5 text-xs text-[#5A5550] border-t border-b border-[#E2DFD8] py-5 mb-6">
                <p>
                  <strong className="text-[#111111] font-medium">Jam Operasional:</strong> 09.00 - 21.00 WIB (Buka Setiap Hari)
                </p>
                <p>
                  <strong className="text-[#111111] font-medium">Fasilitas:</strong> Gedung 3 Lantai, Private Fitting Room, VIP Lounge Konsultasi, Parkir Luas, Mushola
                </p>
                <p>
                  <strong className="text-[#111111] font-medium">Layanan:</strong> Ready-to-Wear, Galeri Kain Tulis, Jahit Seragam, Suvenir Semarang
                </p>
                <p>
                  <strong className="text-[#111111] font-medium">WhatsApp Resmi:</strong> 081-390-8888-09
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Batik+Smile+Simongan+Semarang"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] text-white text-[11px] uppercase font-semibold tracking-[0.18em] text-center block transition-colors"
              >
                PETUNJUK ARAH GOOGLE MAPS &rarr;
              </a>
              <Link
                to="/pages/fasilitas-store"
                className="w-full py-3 px-4 bg-[#FAF8F5] text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] text-center block border border-[#E2DFD8] hover:bg-[#EFECE6] transition-colors"
              >
                LIHAT FASILITAS GEDUNG 3 LANTAI
              </Link>
            </div>
          </div>

          {/* Cabang Banyumanik */}
          <div className="bg-white border border-[#E2DFD8] shadow-sm flex flex-col justify-between p-8">
            <div>
              <span className="px-3 py-1 text-[9px] uppercase font-bold tracking-[0.2em] bg-[#C5A059] text-[#111111] inline-block mb-4">
                CABANG SEMARANG ATAS
              </span>
              <h2 className="font-serif text-2xl text-[#111111] font-normal mb-2">
                Batik Smile Banyumanik
              </h2>
              <p className="text-xs text-[#5A5550] leading-relaxed mb-6 font-light">
                Jl. Sukun Raya No. 23, Banyumanik, Semarang, Jawa Tengah
              </p>

              <div className="space-y-2.5 text-xs text-[#5A5550] border-t border-b border-[#E2DFD8] py-5 mb-6">
                <p>
                  <strong className="text-[#111111] font-medium">Jam Operasional:</strong> 09.00 - 21.00 WIB (Buka Setiap Hari)
                </p>
                <p>
                  <strong className="text-[#111111] font-medium">Fasilitas:</strong> Fitting Room Nyaman, AC, Pembayaran Non-Tunai Lengkap, Parkir Motor &amp; Mobil
                </p>
                <p>
                  <strong className="text-[#111111] font-medium">Layanan:</strong> Busana Sarimbit Keluarga, Kemeja Pria Furing, Blus &amp; Tunik Batik Wanita
                </p>
                <p>
                  <strong className="text-[#111111] font-medium">WhatsApp Resmi:</strong> 081-390-8888-09
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Batik+Smile+Banyumanik+Semarang"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] text-white text-[11px] uppercase font-semibold tracking-[0.18em] text-center block transition-colors"
              >
                PETUNJUK ARAH GOOGLE MAPS &rarr;
              </a>
              <a
                href={officialWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#FAF8F5] text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] text-center block border border-[#E2DFD8] hover:bg-[#EFECE6] transition-colors"
              >
                CHAT KONSULTAN OUTLET
              </a>
            </div>
          </div>
        </div>

        {/* Showroom Visit Support Banner */}
        <div className="bg-[#111111] text-white p-8 sm:p-12 border border-[#1C1C1C] text-center">
          <h3 className="font-serif text-2xl text-white font-normal mb-2">
            Butuh Bantuan Rute atau Penjemputan Rombongan?
          </h3>
          <p className="text-xs text-[#E2DFD8] max-w-xl mx-auto mb-6 font-light leading-relaxed">
            Hubungi WhatsApp concierge resmi kami untuk bantuan panduan lokasi atau reservasi parkir rombongan bus wisata keluarga.
          </p>
          <a
            href={officialWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors"
          >
            HUBUNGI KONSULTAN: 081-390-8888-09 &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
