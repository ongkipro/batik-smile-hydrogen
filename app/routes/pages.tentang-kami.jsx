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
      variables: { handle: 'tentang-kami' },
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
    handle: 'tentang-kami',
    customTitle: 'Tentang Kami — Menjaga Warisan Luhur Batik Sejak 2007 | Batik Smile',
    customDescription:
      'Profil resmi Batik Smile Nusantara. Berdiri sejak 2007 di Semarang dengan showroom flagship 3 lantai di Simongan dan cabang Banyumanik. Pelayanan berbudaya 3S 1C 1T & 1H.',
  });
};

export default function TentangKamiPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-8 sm:pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'TENTANG KAMI' }]} />

        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
            SEMARANG &bull; ESTABLISHED 2007
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-wide leading-tight">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[#C5A059]/40 bg-white/5 p-5">
              <div className="w-8 h-8 flex items-center justify-center border border-[#C5A059] mb-3">
                <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#C5A059] tracking-wider block">SENYUM &bull; SALAM &bull; SAPA</span>
              <p className="text-[11px] text-[#A69F96] mt-1.5 font-light leading-relaxed">Sambutan hangat penuh kekeluargaan sejak langkah pertama Anda.</p>
            </div>

            <div className="border border-[#C5A059]/40 bg-white/5 p-5">
              <div className="w-8 h-8 flex items-center justify-center border border-[#C5A059] mb-3">
                <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#C5A059] tracking-wider block">CEPAT (1C)</span>
              <p className="text-[11px] text-[#A69F96] mt-1.5 font-light leading-relaxed">Responsif dalam melayani kebutuhan motif, ukuran, &amp; katalog.</p>
            </div>

            <div className="border border-[#C5A059]/40 bg-white/5 p-5">
              <div className="w-8 h-8 flex items-center justify-center border border-[#C5A059] mb-3">
                <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#C5A059] tracking-wider block">TANGGAP (1T)</span>
              <p className="text-[11px] text-[#A69F96] mt-1.5 font-light leading-relaxed">Solutif terhadap fitting personal, kustom ukuran, &amp; jadwal acara.</p>
            </div>

            <div className="border border-[#C5A059]/40 bg-white/5 p-5">
              <div className="w-8 h-8 flex items-center justify-center border border-[#C5A059] mb-3">
                <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-[#C5A059] tracking-wider block">HATI (1H)</span>
              <p className="text-[11px] text-[#A69F96] mt-1.5 font-light leading-relaxed">Ketulusan hati dalam setiap jahitan rapi dan layanan purna jual.</p>
            </div>
          </div>
        </div>

        {/* 3 Nilai Inti */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-14">
          <div className="bg-white p-8 border border-[#E2DFD8] hover:border-[#C5A059] transition-colors group">
            <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center border border-[#C5A059]/50 group-hover:bg-[#C5A059] transition-colors">
              <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] mb-2">KEASLIAN MOTIF</h3>
            <p className="text-[11px] text-[#5A5550] leading-relaxed font-light">
              Menjaga pakem filosofi corak batik klasik Jawa Tengah dan ketelitian goresan canting malam.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E2DFD8] hover:border-[#C5A059] transition-colors group">
            <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center border border-[#C5A059]/50 group-hover:bg-[#C5A059] transition-colors">
              <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z" />
                <path d="M7 12a5 5 0 0 1 10 0" />
              </svg>
            </div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E7D3B] mb-2">KENYAMANAN SEJATI</h3>
            <p className="text-[11px] text-[#5A5550] leading-relaxed font-light">
              Pemilihan kain mori primisima adem dan jahitan lapis furing katun hero standar butik haute.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E2DFD8] hover:border-[#C5A059] transition-colors group">
            <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center border border-[#C5A059]/50 group-hover:bg-[#C5A059] transition-colors">
              <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
            </div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3F1D] mb-2">BEBAS MINIMAL ORDER</h3>
            <p className="text-[11px] text-[#5A5550] leading-relaxed font-light">
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
            to="/collections/sarimbit-luxury"
            className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
          >
            LIHAT KOLEKSI KAMI &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
