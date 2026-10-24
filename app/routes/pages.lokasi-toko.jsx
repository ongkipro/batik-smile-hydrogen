import React from 'react';
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
    handle: 'lokasi-toko',
    customTitle: 'Lokasi Showroom & Butik Resmi Semarang — Batik Smile',
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

        {/* 2 Authentic Showrooms - Frameless Quiet Luxury */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 mb-16 sm:mb-20">
          {/* Batik Smile Sampokong (3 Lantai) */}
          <div className="border-t border-[#E2DFD8] pt-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-[0.22em] text-[#9E7D3B] block mb-2">
                SHOWROOM UTAMA &bull; 3 LANTAI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-2">
                Batik Smile Sampokong
              </h2>
              <p className="text-xs text-[#5A5550] leading-relaxed mb-6 font-light flex items-start gap-2">
                <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Jl. Simongan Raya No. 109, Pamularsih, Semarang</span>
              </p>

              <div className="space-y-3 text-xs text-[#5A5550] border-t border-b border-[#E2DFD8] py-5 mb-6">
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Buka:</strong> 09.00 - 21.00 WIB (Setiap Hari)</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3L2 7h20L12 3z" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Fasilitas:</strong> Gedung 3 Lantai, Private Fitting, VIP Lounge, Parkir Luas</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Layanan:</strong> Ready-to-Wear, Galeri Kain Tulis, Jahit Seragam</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">WhatsApp:</strong> 081-390-8888-09</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Batik+Smile+Simongan+Semarang"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] text-center transition-colors shadow-sm no-underline"
              >
                PETUNJUK ARAH &rarr;
              </a>
              <a
                href={officialWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-transparent !text-[#111111] hover:!text-[#C5A059] text-[10px] uppercase font-semibold tracking-[0.2em] text-center block border border-[#111111] hover:border-[#C5A059] transition-colors no-underline"
              >
                CHAT KONSULTAN &rarr;
              </a>
            </div>
          </div>

          {/* Batik Smile Sukun */}
          <div className="border-t border-[#E2DFD8] pt-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-[0.22em] text-[#9E7D3B] block mb-2">
                SHOWROOM SEMARANG ATAS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-2">
                Batik Smile Sukun
              </h2>
              <p className="text-xs text-[#5A5550] leading-relaxed mb-6 font-light flex items-start gap-2">
                <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Jl. Sukun Raya No. 23, Banyumanik, Semarang</span>
              </p>

              <div className="space-y-3 text-xs text-[#5A5550] border-t border-b border-[#E2DFD8] py-5 mb-6">
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Buka:</strong> 09.00 - 21.00 WIB (Setiap Hari)</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3L2 7h20L12 3z" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Fasilitas:</strong> Fitting Room Nyaman, Full AC, Parkir Mudah</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">Layanan:</strong> Sarimbit Keluarga, Kemeja Pria, Busana Pesta</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span><strong className="text-[#111111] font-medium">WhatsApp:</strong> 081-390-8888-09</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Batik+Smile+Banyumanik+Semarang"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] text-center transition-colors shadow-sm no-underline"
              >
                PETUNJUK ARAH &rarr;
              </a>
              <a
                href={officialWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-transparent !text-[#111111] hover:!text-[#C5A059] text-[10px] uppercase font-semibold tracking-[0.2em] text-center block border border-[#111111] hover:border-[#C5A059] transition-colors no-underline"
              >
                CHAT KONSULTAN &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Showroom Visit Support - Clean Editorial Frameless */}
        <div className="pt-12 sm:pt-16 border-t border-[#E2DFD8] text-center max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-2">
            LAYANAN KONSULTASI &amp; RUTE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-2">
            Bantuan Rute &amp; Reservasi Rombongan
          </h3>
          <p className="text-xs sm:text-sm text-[#5A5550] mb-6 font-light leading-relaxed">
            Hubungi WhatsApp concierge resmi di <strong className="text-[#111111] font-medium">081-390-8888-09</strong> untuk panduan rute atau koordinasi parkir rombongan keluarga.
          </p>
          <a
            href={officialWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors shadow-sm no-underline"
          >
            HUBUNGI CONCIERGE &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
