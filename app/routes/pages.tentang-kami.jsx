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
    handle: 'tentang-kami',
    customTitle: 'Tentang Kami — Menjaga Warisan Luhur Batik Sejak 2007 | Batik Smile',
    customDescription:
      'Profil resmi Batik Smile. Berdiri sejak 2007 di Semarang dengan showroom flagship 3 lantai di Simongan dan cabang Banyumanik. Pelayanan berbudaya 3S 1C 1T & 1H.',
  });
};

export default function TentangKamiPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-8 sm:pt-10 pb-24 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'TENTANG KAMI' }]} />

        {/* 1. Header Hero */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-bold block mb-2.5">
            SEMARANG &bull; ESTABLISHED 2007
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-wide leading-tight max-w-2xl mx-auto">
            Perjalanan Menenun Senyum &amp; Martabat
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* 2. Narrative Section (Pure Frameless Editorial Flow) */}
        <div className="mb-16 sm:mb-20">
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#111111] italic font-normal leading-relaxed text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            &ldquo;Batik bukan sekadar torehan canting malam di atas bentangan mori, melainkan doa kesabaran, wibawa martabat, dan kehangatan ikatan kasih sebuah keluarga.&rdquo;
          </blockquote>

          <div className="space-y-5 text-xs sm:text-sm text-[#5A5550] leading-relaxed font-light max-w-3xl mx-auto">
            <p>
              Berawal dari sebuah butik di kota Semarang pada tahun 2007, <strong className="font-medium text-[#111111]">Batik Smile</strong> lahir
              dengan dedikasi luhur: menghadirkan busana batik Nusantara yang tidak hanya anggun secara estetika, tetapi
              juga memberikan kenyamanan paripurna bagi pemakainya. Kami memadukan katun primisima bermutu tinggi, dobby timbul,
              dan sutra ATBM asli dengan lapisan furing hero katun yang sejuk dan menyerap keringat.
            </p>

            <p>
              Kini, dengan kehadiran <strong className="font-medium text-[#111111]">Flagship Showroom 3 Lantai di Jl. Simongan Raya No. 109, Semarang</strong> serta
              <strong className="font-medium text-[#111111]"> Cabang Banyumanik di Jl. Sukun Raya No. 23</strong>, Batik Smile melayani ribuan keluarga,
              tokoh instansi, dan korporat dari seluruh penjuru Nusantara yang mendambakan keserasian busana sarimbit tanpa kompromi.
            </p>

            <p>
              Setiap helai kain dikerjakan oleh para pengrajin pembatik tulis dan cap tradisional di sentra batik Pekalongan,
              Solo, dan Cirebon yang kami bina secara berkelanjutan guna memastikan regenerasi warisan budaya tetap lestari.
            </p>
          </div>
        </div>

        {/* 3. Budaya Layanan 3S 1C 1T & 1H (Frameless Architectural Grid) */}
        <div className="pt-12 sm:pt-14 border-t border-[#E2DFD8] mb-16 sm:mb-20">
          <div className="max-w-xl mb-8 sm:mb-10">
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-bold block mb-1.5">
              STANDAR PELAYANAN BUTIK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal tracking-wide mb-2">
              Budaya 3S 1C 1T &amp; 1H
            </h2>
            <p className="text-xs text-[#5A5550] font-light leading-relaxed">
              Di Batik Smile, senyum bukan sekadar nama, melainkan janji tulus dalam setiap interaksi kami dengan Anda:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Pillar 1: SENYUM SALAM SAPA */}
            <div className="pt-4 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
                01
              </span>
              <h3 className="text-xs font-semibold text-[#111111] uppercase tracking-[0.14em] mb-1.5">
                SENYUM &bull; SALAM &bull; SAPA
              </h3>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Sambutan hangat penuh kekeluargaan sejak langkah pertama Anda memasuki butik.
              </p>
            </div>

            {/* Pillar 2: CEPAT (1C) */}
            <div className="pt-4 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
                02
              </span>
              <h3 className="text-xs font-semibold text-[#111111] uppercase tracking-[0.14em] mb-1.5">
                CEPAT (1C)
              </h3>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Responsif dalam melayani kebutuhan motif, panduan ukuran presisi, &amp; katalog pilihan.
              </p>
            </div>

            {/* Pillar 3: TANGGAP (1T) */}
            <div className="pt-4 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
                03
              </span>
              <h3 className="text-xs font-semibold text-[#111111] uppercase tracking-[0.14em] mb-1.5">
                TANGGAP (1T)
              </h3>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Solutif terhadap fitting personal, kustom ukuran keluarga, &amp; tenggat jadwal acara.
              </p>
            </div>

            {/* Pillar 4: HATI (1H) */}
            <div className="pt-4 border-t border-[#E2DFD8] group hover:border-[#C5A059] transition-colors">
              <span className="font-serif text-xs text-[#9E7D3B] font-light block mb-1.5 tracking-widest">
                04
              </span>
              <h3 className="text-xs font-semibold text-[#111111] uppercase tracking-[0.14em] mb-1.5">
                HATI (1H)
              </h3>
              <p className="text-[11px] text-[#5A5550] font-light leading-relaxed">
                Ketulusan hati dalam setiap sambung motif rapi dan layanan purna jual bebas tukar ukuran.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Tiga Pilar Nilai Luhur (Frameless Editorial) */}
        <div className="pt-12 sm:pt-14 border-t border-[#E2DFD8] mb-16 sm:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Value 1 */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-bold block">
                NILAI I
              </span>
              <h3 className="font-serif text-lg text-[#111111] font-normal tracking-wide">
                Keaslian Motif Pusaka
              </h3>
              <p className="text-[11px] text-[#5A5550] leading-relaxed font-light">
                Menjaga pakem filosofi corak batik klasik Jawa Tengah dan ketelitian goresan canting malam para pembatik binaan.
              </p>
            </div>

            {/* Value 2 */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-bold block">
                NILAI II
              </span>
              <h3 className="font-serif text-lg text-[#111111] font-normal tracking-wide">
                Kenyamanan Sejati
              </h3>
              <p className="text-[11px] text-[#5A5550] leading-relaxed font-light">
                Pemilihan mori primisima adem, tenun dobby timbul, dan jahitan lapis furing katun hero standar butik keluarga.
              </p>
            </div>

            {/* Value 3 */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-bold block">
                NILAI III
              </span>
              <h3 className="font-serif text-lg text-[#111111] font-normal tracking-wide">
                Bebas Minimal Order
              </h3>
              <p className="text-[11px] text-[#5A5550] leading-relaxed font-light">
                Layanan jahit seragam keluarga maupun instansi tanpa batasan kuota minimum pemesanan (1 potong pun dilayani).
              </p>
            </div>
          </div>
        </div>

        {/* 5. Matur Nuwun Closing (Frameless Minimalist Signature) */}
        <div className="pt-12 sm:pt-14 border-t border-[#E2DFD8] text-center max-w-xl mx-auto">
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-bold block mb-2">
            UNGKAPAN HORMAT
          </span>
          <h4 className="font-serif text-2xl sm:text-3xl text-[#111111] italic font-normal mb-2.5">
            &ldquo;Matur Nuwun Sanget&rdquo;
          </h4>
          <p className="text-xs text-[#5A5550] leading-relaxed font-light mb-6">
            Terima kasih telah mempercayakan momen-momen berharga dan kehangatan keluarga Anda bersama busana karya cipta Batik Smile.
          </p>
          <Link
            to="/collections/all"
            className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors shadow-sm no-underline"
          >
            JELAJAHI KOLEKSI KAMI &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
