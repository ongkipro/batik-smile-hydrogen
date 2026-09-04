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
      variables: { handle: 'lokasi-toko' },
      cache: context.storefront.CacheLong(),
    });
    return { page: data?.page || null };
  } catch {
    return { page: null };
  }
}

export const meta = ({ data }) => {
  return generatePageMeta({
    page: data?.page,
    handle: 'lokasi-toko',
    customTitle: 'Lokasi Showroom & Butik Resmi Semarang — Batik Smile Nusantara',
    customDescription:
      'Panduan kunjungan ke butik resmi Batik Smile di Semarang. Flagship Store 3 Lantai di Simongan Raya No. 109 dan Cabang Banyumanik di Sukun Raya No. 23. Buka setiap hari 09.00 - 21.00 WIB.',
  });
};

export default function LokasiTokoPage() {
  const officialWaUrl =
    'https://wa.me/6281390888809?text=' +
    encodeURIComponent('Halo Batik Smile, saya ingin menanyakan rute lokasi butik.');

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-8 sm:pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'LOKASI TOKO' }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
            KUNJUNGI BUTIK KAMI DI SEMARANG
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-wide leading-tight">
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
              <p className="text-xs text-[#5A5550] leading-relaxed mb-6 font-light flex items-start gap-2">
                <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Jl. Simongan Raya No. 109, Pamularsih, Semarang, Jawa Tengah</span>
              </p>

              <div className="space-y-3 text-xs text-[#5A5550] border-t border-b border-[#E2DFD8] py-5 mb-6">
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Jam Operasional:</strong> 09.00 - 21.00 WIB (Buka Setiap Hari)</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3L2 7h20L12 3z" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Fasilitas:</strong> Gedung 3 Lantai, Private Fitting Room, VIP Lounge, Parkir Luas, Mushola</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Layanan:</strong> Ready-to-Wear, Galeri Kain Tulis, Jahit Seragam, Suvenir Semarang</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">WhatsApp Resmi:</strong> 081-390-8888-09</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Batik+Smile+Simongan+Semarang"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>PETUNJUK ARAH GOOGLE MAPS</span>
                <span>&rarr;</span>
              </a>
              <Link
                to="/pages/fasilitas-store"
                className="w-full py-3 px-4 bg-[#FAF8F5] !text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] text-center block border border-[#E2DFD8] hover:bg-[#111111] hover:!text-white transition-colors"
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
              <p className="text-xs text-[#5A5550] leading-relaxed mb-6 font-light flex items-start gap-2">
                <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Jl. Sukun Raya No. 23, Banyumanik, Semarang, Jawa Tengah</span>
              </p>

              <div className="space-y-3 text-xs text-[#5A5550] border-t border-b border-[#E2DFD8] py-5 mb-6">
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Jam Operasional:</strong> 09.00 - 21.00 WIB (Buka Setiap Hari)</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3L2 7h20L12 3z" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Fasilitas:</strong> Fitting Room Nyaman, Full AC, Pembayaran Non-Tunai, Parkir Mudah</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Layanan:</strong> Sarimbit Pasangan, Kemeja Pria Furing, Blus &amp; Tunik Pesta Wanita</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">WhatsApp Resmi:</strong> 081-390-8888-09</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Batik+Smile+Banyumanik+Semarang"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>PETUNJUK ARAH GOOGLE MAPS</span>
                <span>&rarr;</span>
              </a>
              <a
                href={officialWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#FAF8F5] !text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] text-center block border border-[#E2DFD8] hover:bg-[#111111] hover:!text-white transition-colors"
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
