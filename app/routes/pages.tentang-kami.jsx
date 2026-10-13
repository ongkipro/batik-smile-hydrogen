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
    customTitle: 'Cerita di Balik Batik Smile — Sejak 2007 di Semarang | Batik Smile',
    customDescription:
      'Cerita di balik Batik Smile sejak 2007 dari Semarang. Mendekatkan keindahan batik ke setiap generasi dengan perpaduan tradisi, inovasi modern, dan kenyamanan butik.',
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
            SEMARANG &bull; SEJAK 2007
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal tracking-wide leading-tight max-w-2xl mx-auto">
            Cerita di Balik Batik Smile
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#5A5550] max-w-xl mx-auto mt-2 italic font-normal">
            Perjalanan Menenun Senyum, Tradisi, &amp; Martabat Bangsa
          </p>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* 2. Narrative Section (Pure Frameless Editorial Flow) */}
        <div className="mb-16 sm:mb-20">
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#111111] italic font-normal leading-relaxed text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            &ldquo;Batik bukan sekadar warisan masa lalu atau pakaian adat semata, melainkan bagian dari identitas bangsa yang hidup, luwes, dan relevan di setiap generasi.&rdquo;
          </blockquote>

          <div className="space-y-5 text-xs sm:text-sm text-[#5A5550] leading-relaxed font-light max-w-3xl mx-auto">
            <p>
              Berdiri sejak tahun 2007 dari kota Semarang, <strong className="font-medium text-[#111111]">Batik Smile</strong> berawal
              dari sebuah keinginan sederhana: mendekatkan keindahan dan kebanggaan berbatik ke dalam kehidupan sehari-hari
              setiap generasi. Kami meyakini bahwa batik adalah warisan budaya luhur yang fleksibel, dinamis, dan senantiasa beradaptasi
              dengan perkembangan zaman tanpa pernah kehilangan jiwanya.
            </p>

            <p>
              Dengan menggabungkan motif tradisional sarat filosofi dan sentuhan kontemporer, Batik Smile menghadirkan busana
              berkarakter dengan potongan yang nyaman serta pilihan palet warna yang elegan. Mulai dari katun primisima sejuk,
              tenun dobby timbul bertekstur anggun, hingga mahakarya sutra ATBM dan prada emas, setiap helai busana disempurnakan
              dengan furing hero katun serta trikot premium demi kenyamanan terbaik saat dikenakan.
            </p>

            <p>
              Batik Smile hadir melayani berbagai kebutuhan busana Nusantara: mulai dari pakaian harian yang praktis, keserasian
              sarimbit keluarga, seragam instansi dan korporat, hingga koleksi eksklusif Luxury Series untuk momen paling sakral
              dan berharga. Di setiap rancangan, kami selalu menjaga komitmen teguh: menghadirkan mutu terbaik dengan harga yang sepadan.
            </p>

            <p>
              Dipercaya oleh masyarakat dan berbagai instansi di Indonesia, kami melangkah maju dengan konsistensi menjaga
              kualitas jahitan berstandar butik, terus berinovasi dalam desain, serta melayani setiap pelanggan dengan ketulusan
              dan sepenuh hati.
            </p>
          </div>
        </div>

        {/* 3. Tiga Pilar Nilai Luhur (Frameless Editorial) */}
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
