import { useLoaderData, Link } from 'react-router';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePoliciesIndexMeta } from '~/lib/seo';
import { JsonLd } from '~/components/JsonLd';
import { generateBreadcrumbSchema } from '~/lib/schema';
import { NotFoundView } from '~/components/NotFoundView';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return generatePoliciesIndexMeta();
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  let shopData = null;
  try {
    shopData = await context.storefront.query(POLICIES_QUERY);
  } catch {
    // Graceful fallback
  }

  const shop = shopData?.shop;
  const shippingPage = shopData?.shippingPage;
  const refundPage = shopData?.refundPage;
  const termsPage = shopData?.termsPage;

  // Curate 4 core legal policies ensuring 100% presence and high-fidelity content
  const policies = [
    {
      id: 'shipping-policy',
      handle: 'shipping-policy',
      title: shippingPage?.title || shop?.shippingPolicy?.title || 'Kebijakan Pengiriman Seluruh Nusantara',
      badge: 'LOGISTIK & ASURANSI',
      summary: 'Layanan pengiriman terpercaya ke seluruh penjuru Indonesia (Pulau Jawa 1-3 hari, Luar Jawa 2-5 hari) dengan asuransi pengiriman penuh dan nomor resi otomatis via WhatsApp & Email.',
    },
    {
      id: 'privacy-policy',
      handle: 'privacy-policy',
      title: shop?.privacyPolicy?.title || 'Kebijakan Privasi & Keamanan Data',
      badge: 'KEAMANAN DATA & PRIVASI',
      summary: 'Komitmen perlindungan kerahasiaan data pribadi pelanggan, kepatuhan privasi e-commerce global, dan enkripsi transaksi standar Shopify PCI DSS Level 1.',
    },
    {
      id: 'refund-policy',
      handle: 'refund-policy',
      title: refundPage?.title || shop?.refundPolicy?.title || 'Garansi Bebas Tukar Size & Pengembalian',
      badge: 'JAMINAN 100% PUAS',
      summary: 'Fasilitas garansi bebas tukar ukuran dalam 7 hari penerimaan barang untuk memastikan kepuasan siluet dan kenyamanan busana batik Anda.',
    },
    {
      id: 'terms-of-service',
      handle: 'terms-of-service',
      title: termsPage?.title || shop?.termsOfService?.title || 'Syarat & Ketentuan Layanan Butik',
      badge: 'KETENTUAN HUKUM RESMI',
      summary: 'Pedoman transaksi resmi, standar keaslian kain katun primisima & sutra ATBM, hak cipta motif pusaka, dan tata kelola pesanan seragam instansi.',
    },
  ];

  // Secondary customer care and atelier guides
  const serviceGuides = [
    {
      to: '/pages/panduan-ukuran',
      title: 'Panduan Ukuran (Size Guide)',
      category: 'STANDAR FITTING BUTIK',
      description: 'Tabel ukuran presisi lingkar dada (LD) & panjang baju untuk kemeja pria reguler/slim, gamis wanita, dan sarimbit anak.',
    },
    {
      to: '/pages/panduan-perawatan',
      title: 'Panduan Perawatan Batik',
      category: 'PERAWATAN WASTRA',
      description: 'Langkah tepat merawat batik tulis canting & tenun dobby menggunakan sabun lerak alami agar serat dan warna tetap abadi.',
    },
    {
      to: '/pages/layanan-seragam',
      title: 'Jahit Seragam & Bespoke Tanpa MOQ',
      category: 'LAYANAN ATELIER',
      description: 'Solusi pembuatan seragam batik instansi pemerintah, BUMN, keluarga, dan jahit kustom ukuran personal tanpa batas minimum order.',
    },
  ];

  return { policies, serviceGuides };
}

export default function Policies() {
  /** @type {LoaderReturnData} */
  const { policies, serviceGuides } = useLoaderData();

  const breadcrumbItems = [{ label: 'KEBIJAKAN & JAMINAN BUTIK' }];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <JsonLd schema={generateBreadcrumbSchema(breadcrumbItems)} />
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            STANDAR PELAYANAN &amp; TRANSPARANSI HUKUM
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-4">
            Kebijakan &amp; Jaminan Butik
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Komitmen Batik Smile dalam menjamin kepuasan berbelanja, perlindungan data pribadi, dan kepastian pengiriman dengan integritas butik terpercaya.
          </p>
        </div>

        {/* Section 1: 4 Core Legal Policies (2x2 Grid) */}
        <div className="mb-16 sm:mb-20">
          <div className="border-b border-[#E2DFD8] pb-3 mb-8">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-1">
              DOKUMEN LEGAL &amp; TRANSAKSI
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
              Ketentuan Resmi &amp; Jaminan Konsumen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {policies.map((policy) => {
              const isRefund = policy.handle.includes('refund');
              const isShipping = policy.handle.includes('shipping');
              const isPrivacy = policy.handle.includes('privacy');

              return (
                <Link
                  key={policy.id}
                  to={`/policies/${policy.handle}`}
                  className="group block p-6 sm:p-8 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors no-underline flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 flex items-center justify-center text-[#C5A059] bg-[#FAF8F5]">
                        {isShipping ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="1" y="3" width="15" height="13" />
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                          </svg>
                        ) : isPrivacy ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="11" width="18" height="11" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        ) : isRefund ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="23 4 23 10 17 10" />
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#9E7D3B] px-2.5 py-1 bg-[#FAF8F5] border border-[#E2DFD8]">
                        {policy.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors mb-3 leading-snug">
                      {policy.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#5A5550] font-light leading-relaxed mb-6">
                      {policy.summary}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#111111] group-hover:text-[#9E7D3B] transition-colors pt-4 border-t border-[#F0ECE1]">
                    <span>BACA DOKUMEN LENGKAP</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 2: Panduan Pelayanan & Layanan Terkait (3-Column Grid) */}
        <div className="mb-16 sm:mb-20">
          <div className="border-b border-[#E2DFD8] pb-3 mb-8">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-1">
              STANDAR LAYANAN BUTIK
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
              Panduan Pelanggan &amp; Layanan Atelier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceGuides.map((guide, idx) => (
              <Link
                key={idx}
                to={guide.to}
                className="group block p-6 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors no-underline flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#9E7D3B] block mb-2">
                    {guide.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#111111] group-hover:text-[#9E7D3B] transition-colors mb-2.5 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-[#5A5550] font-light leading-relaxed mb-4">
                    {guide.description}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] font-semibold text-[#111111] group-hover:text-[#9E7D3B] transition-colors">
                  <span>LIHAT PANDUAN</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 3: Concierge Direct Assistance Banner */}
        <div className="p-8 sm:p-10 bg-[#111111] text-white border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block mb-1">
              LAYANAN KONSULTASI RESMI
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2">
              Butuh Informasi Tambahan Mengenai Kebijakan Kami?
            </h3>
            <p className="text-xs sm:text-sm text-[#C5BFB8] font-light max-w-xl leading-relaxed">
              Tim Concierge Butik Batik Smile siap menjawab pertanyaan seputar status pengiriman paket, proses bebas tukar size, maupun konsultasi fitting seragam.
            </p>
          </div>
          <a
            href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20mengenai%20kebijakan%20layanan"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[10px] uppercase font-bold tracking-[0.2em] transition-colors whitespace-nowrap text-center no-underline cursor-pointer"
          >
            KONSULTASI VIA WHATSAPP &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
    shippingPage: page(handle: "kebijakan-pengiriman") {
      id
      title
      handle
    }
    refundPage: page(handle: "kebijakan-pengembalian") {
      id
      title
      handle
    }
    termsPage: page(handle: "syarat-dan-ketentuan") {
      id
      title
      handle
    }
  }
`;

/** @typedef {import('./+types/policies._index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */

export function ErrorBoundary() {
  return (
    <NotFoundView
      statusCode={404}
      title="Halaman Kebijakan Belum Tersedia"
      message="Halaman dokumen kebijakan dan garansi butik sedang diperbarui. Silakan kembali ke beranda atau hubungi concierge butik kami."
    />
  );
}
