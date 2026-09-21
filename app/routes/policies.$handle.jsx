import { useLoaderData } from 'react-router';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePolicyMeta } from '~/lib/seo';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data, params }) => {
  return generatePolicyMeta(data?.policy, params?.handle);
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ params, context }) {
  if (!params.handle) {
    throw new Response('No handle was passed in', { status: 404 });
  }

  const policyName = params.handle.replace(/-([a-z])/g, (_, m1) =>
    m1.toUpperCase(),
  );

  let policy = null;

  try {
    const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
      variables: {
        privacyPolicy: false,
        shippingPolicy: false,
        termsOfService: false,
        refundPolicy: false,
        [policyName]: true,
        language: context.storefront.i18n?.language,
      },
    });

    policy = data.shop?.[policyName];
  } catch {
    // Fallback if Shopify policy is empty
  }

  // Fallbacks for standard policies if not configured in Shopify admin
  if (!policy || !policy.body) {
    const defaultPolicies = {
      'refund-policy': {
        title: 'Garansi Bebas Tukar Size & Pengembalian',
        body: `
          <h3>1. Garansi Kepuasan Ukuran (Bebas Tukar Size)</h3>
          <p>Kami memahami bahwa kenyamanan busana batik sangat bergantung pada presisi ukuran. Butik Batik Smile memberikan <strong>Garansi Bebas Tukar Size 100%</strong> untuk seluruh pembelian produk Ready-To-Wear (Kemeja Pria, Blus Wanita, dan Sarimbit Keluarga).</p>
          <h3>2. Syarat &amp; Ketentuan Penukaran</h3>
          <ul>
            <li>Konfirmasi penukaran dapat dilakukan maksimal <strong>7 hari</strong> setelah paket diterima oleh pelanggan.</li>
            <li>Kondisi pakaian belum pernah dicuci, label hangtag masih utuh, dan aroma kain masih dalam kondisi baru.</li>
            <li>Hubungi WhatsApp Concierge resmi kami di <code>081-390-8888-09</code> untuk dibantu proses pengiriman penukaran.</li>
          </ul>
          <h3>3. Produk Khusus &amp; Bespoke Tailoring</h3>
          <p>Untuk kain batik tulis lembaran yang telah dipotong atau dijahit sesuai ukuran tubuh pesanan (custom tailoring bespoke), penukaran hanya berlaku untuk penyesuaian (vermak perbaikan) tanpa biaya tambahan.</p>
        `,
      },
      'shipping-policy': {
        title: 'Kebijakan Pengiriman Seluruh Indonesia',
        body: `
          <h3>1. Wilayah &amp; Mitra Ekspedisi</h3>
          <p>Batik Smile melayani pengiriman ke seluruh wilayah Indonesia melalui mitra logistik terpercaya (JNE, SiCepat, J&T, dan kurir kilat khusus wilayah Semarang).</p>
          <h3>2. Waktu Pemrosesan &amp; Pengiriman</h3>
          <ul>
            <li>Pesanan produk Ready-To-Wear yang terkonfirmasi sebelum pukul 15.00 WIB akan dikirim pada hari yang sama.</li>
            <li>Estimasi pengiriman Pulau Jawa: 1 - 3 hari kerja.</li>
            <li>Estimasi pengiriman Luar Pulau Jawa: 2 - 5 hari kerja.</li>
            <li>Layanan Pesanan Seragam &amp; Bespoke Tailoring mengikuti jadwal pengerjaan atelier yang disepakati (rata-rata 7-14 hari kerja).</li>
          </ul>
          <h3>3. Nomor Resi &amp; Pelacakan</h3>
          <p>Nomor resi pengiriman otomatis dikirimkan ke email dan WhatsApp pelanggan segera setelah paket diserahkan kepada kurir ekspedisi.</p>
        `,
      },
      'privacy-policy': {
        title: 'Kebijakan Privasi & Keamanan Data',
        body: `
          <h3>1. Komitmen Privasi Pelanggan</h3>
          <p>Butik Batik Smile menghargai kerahasiaan data pribadi pelanggan kami. Kami hanya mengumpulkan informasi penting yang diperlukan untuk memproses transaksi pesanan, pengiriman busana, dan komunikasi layanan pelanggan.</p>
          <h3>2. Keamanan Pembayaran</h3>
          <p>Seluruh proses pembayaran diproses secara terenkripsi melalui gerbang pembayaran resmi Shopify yang telah bersertifikasi PCI DSS Level 1. Kami tidak pernah menyimpan data kartu kredit atau kredensial rahasia perbankan pelanggan di server kami.</p>
        `,
      },
      'terms-of-service': {
        title: 'Syarat & Ketentuan Layanan Butik',
        body: `
          <h3>1. Ketentuan Umum</h3>
          <p>Selamat datang di platform butik online Batik Smile. Dengan mengakses dan berbelanja melalui situs ini, Anda menyetujui seluruh ketentuan layanan yang kami terapkan.</p>
          <h3>2. Keaslian Produk &amp; Akurasi Warna</h3>
          <p>Seluruh produk batik yang kami hadirkan diproduksi dengan standar kain katun primisima, tenun dobby, dan sutra asli. Perbedaan warna minor dapat terjadi karena perbedaan pencahayaan layar monitor atau perangkat seluler Anda.</p>
        `,
      },
    };

    policy = defaultPolicies[params.handle] || {
      title: 'Kebijakan Layanan Butik',
      body: '<p>Silakan hubungi WhatsApp Concierge 081-390-8888-09 untuk informasi lebih lanjut mengenai kebijakan layanan.</p>',
    };
  }

  return { policy };
}

export default function Policy() {
  /** @type {LoaderReturnData} */
  const { policy } = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'KEBIJAKAN', to: '/policies' },
            { label: policy.title.toUpperCase() },
          ]}
        />

        {/* Header */}
        <div className="border-b border-[#E2DFD8] pb-6 mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            DOKUMEN RESMI BUTIK
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-[#111111] mb-2">
            {policy.title}
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mt-4" />
        </div>

        {/* Content - Frameless Quiet Luxury */}
        <div className="mb-12">
          <div
            className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed [&>h3]:font-serif [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-normal [&>h3]:text-[#111111] [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: policy.body }}
          />
        </div>

        {/* Contact Banner - Clean Editorial Frameless */}
        <div className="pt-8 border-t border-[#E2DFD8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-normal text-[#111111] mb-1">
              Butuh Bantuan atau Pertanyaan?
            </h3>
            <p className="text-xs text-[#5A5550] font-light">
              Staf Concierge kami siap melayani Anda dengan budaya 3S 1C 1T &amp; 1H.
            </p>
          </div>
          <a
            href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20bertanya%20mengenai%20kebijakan%20layanan"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors shadow-sm text-center no-underline whitespace-nowrap"
          >
            HUBUNGI CONCIERGE &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;

/**
 * @typedef {keyof Pick<
 *   Shop,
 *   'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
 * >} SelectedPolicies
 */

/** @typedef {import('./+types/policies.$handle').Route} Route */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Shop} Shop */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
