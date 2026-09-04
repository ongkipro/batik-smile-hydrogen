import React from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePageMeta } from '~/lib/seo';

export const meta = () => {
  return generatePageMeta({
    handle: 'layanan-seragam',
    customTitle: 'Layanan Seragam & Jahit Kustom — Tanpa Minimal Order | Batik Smile',
    customDescription:
      'Spesialis pengadaan seragam batik instansi medis, korporat, dan keluarga pernikahan tanpa minimal order. Portofolio RS Bhayangkara, RSUD dr. Adhyatma, dan perbankan.',
  });
};

export default function LayananSeragamPage() {
  const officialWaUrl =
    'https://wa.me/6281390888809?text=' +
    encodeURIComponent('Halo Batik Smile, saya ingin konsultasi pemesanan seragam / jahit kustom.');

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-8 sm:pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'LAYANAN SERAGAM' }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
            SOLUSI BUSANA TERPADU &bull; TANPA MINIMAL ORDER
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-wide leading-tight">
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
          <div className="bg-white p-8 border border-[#E2DFD8] shadow-sm hover:border-[#C5A059] transition-colors group">
            <div className="w-10 h-10 mb-4 flex items-center justify-center border border-[#C5A059]/50 group-hover:bg-[#C5A059] transition-colors">
              <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase block mb-1">
              KEUNGGULAN 01
            </span>
            <h3 className="font-serif text-xl text-[#111111] font-normal mb-2">
              Tanpa Batasan MOQ
            </h3>
            <p className="text-xs text-[#5A5550] leading-relaxed font-light">
              Kami melayani pemesanan seragam tanpa batasan kuota minimum. Cocok untuk keluarga inti (2–10 orang) hingga divisi kantor ratusan staf.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E2DFD8] shadow-sm hover:border-[#C5A059] transition-colors group">
            <div className="w-10 h-10 mb-4 flex items-center justify-center border border-[#C5A059]/50 group-hover:bg-[#C5A059] transition-colors">
              <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase block mb-1">
              KEUNGGULAN 02
            </span>
            <h3 className="font-serif text-xl text-[#111111] font-normal mb-2">
              Furing Hero Adem
            </h3>
            <p className="text-xs text-[#5A5550] leading-relaxed font-light">
              Seluruh kemeja dan busana formal dilapisi furing hero katun lembut yang sejuk dan menyerap keringat seharian di ruangan ber-AC maupun jamuan outdoor.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E2DFD8] shadow-sm hover:border-[#C5A059] transition-colors group">
            <div className="w-10 h-10 mb-4 flex items-center justify-center border border-[#C5A059]/50 group-hover:bg-[#C5A059] transition-colors">
              <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="0" ry="0" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase block mb-1">
              KEUNGGULAN 03
            </span>
            <h3 className="font-serif text-xl text-[#111111] font-normal mb-2">
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
            <div className="p-5 border border-white/10 bg-white/5">
              <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center border border-[#C5A059]">
                <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <strong className="block font-medium text-white mb-1">RS Bhayangkara Semarang</strong>
              <p className="text-[11px] text-[#A69F96]">Pengadaan seragam batik medis &amp; manajemen rumah sakit.</p>
            </div>

            <div className="p-5 border border-white/10 bg-white/5">
              <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center border border-[#C5A059]">
                <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3L2 7h20L12 3z" />
                </svg>
              </div>
              <strong className="block font-medium text-white mb-1">RSUD dr. Adhyatma Tugurejo</strong>
              <p className="text-[11px] text-[#A69F96]">Busana batik formal tenaga kesehatan Jawa Tengah.</p>
            </div>

            <div className="p-5 border border-white/10 bg-white/5">
              <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center border border-[#C5A059]">
                <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
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
            <div className="p-6 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors group">
              <div className="w-8 h-8 flex items-center justify-center border border-[#C5A059] mb-3 group-hover:bg-[#C5A059] transition-colors">
                <svg className="w-4 h-4 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span className="text-xl font-serif text-[#C5A059] block mb-1">01.</span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">KONSULTASI</h4>
              <p className="text-[11px] text-[#5A5550]">Pilih motif, bahan kain (katun/dobby/sutra), dan estimasi jumlah via WhatsApp.</p>
            </div>

            <div className="p-6 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors group">
              <div className="w-8 h-8 flex items-center justify-center border border-[#C5A059] mb-3 group-hover:bg-[#C5A059] transition-colors">
                <svg className="w-4 h-4 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                  <line x1="8.12" y1="8.12" x2="12" y2="12" />
                </svg>
              </div>
              <span className="text-xl font-serif text-[#C5A059] block mb-1">02.</span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">PENGUKURAN</h4>
              <p className="text-[11px] text-[#5A5550]">Isi tabel data ukuran anggota keluarga atau kirim sampel baju yang pas.</p>
            </div>

            <div className="p-6 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors group">
              <div className="w-8 h-8 flex items-center justify-center border border-[#C5A059] mb-3 group-hover:bg-[#C5A059] transition-colors">
                <svg className="w-4 h-4 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="text-xl font-serif text-[#C5A059] block mb-1">03.</span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">PRODUKSI BUTIK</h4>
              <p className="text-[11px] text-[#5A5550]">Pemotongan pola motif presisi, jahit furing hero, dan quality control butik.</p>
            </div>

            <div className="p-6 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors group">
              <div className="w-8 h-8 flex items-center justify-center border border-[#C5A059] mb-3 group-hover:bg-[#C5A059] transition-colors">
                <svg className="w-4 h-4 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <span className="text-xl font-serif text-[#C5A059] block mb-1">04.</span>
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
