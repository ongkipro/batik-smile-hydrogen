import React from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePageMeta } from '~/lib/seo';

const PAGE_SEO_QUERY = `#graphql
  query PageSeo(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    page(handle: $handle) {
      id
      title
      handle
      seo {
        title
        description
      }
    }
  }
`;

export async function loader({ context }) {
  try {
    const data = await context.storefront.query(PAGE_SEO_QUERY, {
      variables: { handle: 'layanan-seragam' },
      cache: context.storefront.CacheShort(),
    });
    return { page: data?.page || null };
  } catch {
    return { page: null };
  }
}

export const meta = ({ data }) => {
  return generatePageMeta({
    page: data?.page,
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
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-8 sm:pt-10 pb-24 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'LAYANAN SERAGAM' }]} />

        {/* 1. Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-bold block mb-2.5">
            SERAGAM &bull; BESPOKE &bull; TANPA MOQ
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-wide leading-tight">
            Seragam &amp; Bespoke Tailoring
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed mb-8">
            Mulai 2 potong sarimbit keluarga hingga ribuan seragam korporat dengan presisi sambung pola dan furing hero sejuk.
          </p>

          {/* Editorial Atelier Banner (Frameless with Natural Shadow) */}
          <div className="w-full aspect-[21/9] sm:aspect-[24/9] bg-[#111111] overflow-hidden shadow-sm">
            <img
              src="/banners/bespoke_tailoring_banner.jpg"
              alt="Atelier Penjahit Bespoke Batik Smile"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* 2. Three Core Advantages (Frameless Editorial Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 sm:mb-20">
          <div className="pt-5 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
            <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
              01
            </span>
            <h3 className="text-xs font-semibold text-[#111111] uppercase tracking-[0.14em] mb-1.5">
              Tanpa Minimal Order
            </h3>
            <p className="text-xs text-[#5A5550] font-light leading-relaxed">
              Pemesanan fleksibel tanpa batasan kuota. Melayani keluarga inti 2–6 orang hingga ratusan staf korporat.
            </p>
          </div>

          <div className="pt-5 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
            <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
              02
            </span>
            <h3 className="text-xs font-semibold text-[#111111] uppercase tracking-[0.14em] mb-1.5">
              Lapis Furing Adem
            </h3>
            <p className="text-xs text-[#5A5550] font-light leading-relaxed">
              Dilapisi katun hero halus yang adem dan menyerap keringat seharian di ruang ber-AC maupun jamuan outdoor.
            </p>
          </div>

          <div className="pt-5 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
            <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
              03
            </span>
            <h3 className="text-xs font-semibold text-[#111111] uppercase tracking-[0.14em] mb-1.5">
              Panduan Ukur Presisi
            </h3>
            <p className="text-xs text-[#5A5550] font-light leading-relaxed">
              Lembar panduan ukuran praktis (LD/PB/PL) dan sampel ukuran uji coba yang dapat dikirim langsung ke lokasi Anda.
            </p>
          </div>
        </div>

        {/* 3. Client Portfolio (Frameless Clean Architecture) */}
        <div className="pt-14 sm:pt-16 border-t border-[#E2DFD8] mb-16 sm:mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-bold block mb-1.5">
              PORTOFOLIO KLIEN
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal tracking-wide">
              Dipercaya Medis &amp; Korporasi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left sm:text-center">
            <div className="pt-4 border-t border-[#E2DFD8]">
              <strong className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">
                RS Bhayangkara Semarang
              </strong>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Pengadaan seragam batik medis &amp; staf rumah sakit.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2DFD8]">
              <strong className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">
                RSUD Tugurejo Semarang
              </strong>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Busana batik formal tenaga kesehatan Jawa Tengah.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2DFD8]">
              <strong className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1">
                Perbankan &amp; Publik
              </strong>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Seragam frontliner, wisuda, &amp; jamuan keluarga besar.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Simple 4-Step Flow (Frameless) */}
        <div className="pt-14 sm:pt-16 border-t border-[#E2DFD8] mb-16 sm:mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-bold block mb-1">
              ALUR RINGKAS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal tracking-wide">
              4 Langkah Pemesanan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="pt-4 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
                01
              </span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1.5">
                KONSULTASI
              </h4>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Pilih motif, jenis bahan kain, dan estimasi kuota via WhatsApp.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
                02
              </span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1.5">
                PENGUKURAN
              </h4>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Kirim tabel ukuran anggota keluarga atau sampel baju yang pas.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
                03
              </span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1.5">
                PRODUKSI
              </h4>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Potong pola presisi, jahit furing hero, dan quality control butik.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
                04
              </span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] mb-1.5">
                PENGIRIMAN
              </h4>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Dikemas rapi dan dikirim aman dengan garansi bebas tukar ukuran.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Minimalist Closing CTA (Frameless Centerpiece) */}
        <div className="pt-14 sm:pt-16 border-t border-[#E2DFD8] text-center max-w-xl mx-auto">
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-bold block mb-2">
            KONSULTASI GRATIS
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-2.5">
            Mulai Rancang Seragam Anda
          </h3>
          <p className="text-xs text-[#5A5550] font-light leading-relaxed mb-8">
            Katalog bahan, konsultasi motif, dan penawaran harga instan bersama konsultan butik.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={officialWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors shadow-sm no-underline"
            >
              CHAT WHATSAPP &rarr;
            </a>
            <Link
              to="/collections/all"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#111111] hover:border-[#C5A059] !text-[#111111] hover:!text-[#C5A059] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors no-underline"
            >
              LIHAT KOLEKSI &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

