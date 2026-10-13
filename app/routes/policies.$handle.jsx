import { useLoaderData } from 'react-router';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePolicyMeta } from '~/lib/seo';
import { JsonLd } from '~/components/JsonLd';
import { generateBreadcrumbSchema } from '~/lib/schema';
import { NotFoundView } from '~/components/NotFoundView';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data, params }) => {
  return generatePolicyMeta(data?.policy, params?.handle);
};

/**
 * Map handles to their corresponding shop policy keys and native Shopify page handles
 */
const POLICY_MAP = {
  'shipping-policy': {
    policyKey: 'shippingPolicy',
    pageHandle: 'kebijakan-pengiriman',
    fallbackTitle: 'Kebijakan Pengiriman Seluruh Nusantara',
  },
  'kebijakan-pengiriman': {
    policyKey: 'shippingPolicy',
    pageHandle: 'kebijakan-pengiriman',
    fallbackTitle: 'Kebijakan Pengiriman Seluruh Nusantara',
  },
  'privacy-policy': {
    policyKey: 'privacyPolicy',
    pageHandle: 'kebijakan-privasi',
    fallbackTitle: 'Kebijakan Privasi & Keamanan Data',
  },
  'kebijakan-privasi': {
    policyKey: 'privacyPolicy',
    pageHandle: 'kebijakan-privasi',
    fallbackTitle: 'Kebijakan Privasi & Keamanan Data',
  },
  'refund-policy': {
    policyKey: 'refundPolicy',
    pageHandle: 'kebijakan-pengembalian',
    fallbackTitle: 'Garansi Bebas Tukar Size & Pengembalian',
  },
  'kebijakan-pengembalian': {
    policyKey: 'refundPolicy',
    pageHandle: 'kebijakan-pengembalian',
    fallbackTitle: 'Garansi Bebas Tukar Size & Pengembalian',
  },
  'terms-of-service': {
    policyKey: 'termsOfService',
    pageHandle: 'syarat-dan-ketentuan',
    fallbackTitle: 'Syarat & Ketentuan Layanan Butik',
  },
  'syarat-dan-ketentuan': {
    policyKey: 'termsOfService',
    pageHandle: 'syarat-dan-ketentuan',
    fallbackTitle: 'Syarat & Ketentuan Layanan Butik',
  },
};

/**
 * Default authentic policy copy if neither shop policy nor native page is found
 */
const DEFAULT_POLICIES = {
  'shipping-policy': {
    title: 'Kebijakan Pengiriman Seluruh Nusantara',
    body: `
      <h2>1. Wilayah Cakupan &amp; Ekspedisi Resmi</h2>
      <p>Butik Batik Smile melayani pengiriman pesanan busana dan wastra ke seluruh penjuru Indonesia dan mancanegara melalui mitra logistik terpercaya berstandar asuransi penuh (JNE, SiCepat, J&amp;T, Pos Indonesia, dan kurir kilat khusus wilayah Semarang).</p>
      
      <h2>2. Jadwal Pemrosesan &amp; Estimasi Tiba</h2>
      <ul>
        <li><strong>Pesanan Ready-To-Wear (RTW)</strong>: Pesanan yang terkonfirmasi sebelum pukul 15.00 WIB akan dikemas dan diserahkan ke pihak ekspedisi pada hari kerja yang sama.</li>
        <li><strong>Estimasi Pengiriman Pulau Jawa</strong>: 1 hingga 3 hari kerja.</li>
        <li><strong>Estimasi Pengiriman Luar Pulau Jawa</strong>: 2 hingga 5 hari kerja (menyesuaikan zona destinasi).</li>
        <li><strong>Pesanan Jahit Bespoke &amp; Seragam</strong>: Waktu pengerjaan atelier rata-rata 7-14 hari kerja sebelum dikirimkan.</li>
      </ul>

      <h2>3. Nomor Resi &amp; Pelacakan Otomatis</h2>
      <p>Nomor resi resmi ekspedisi akan diterbitkan secara otomatis dan dikirimkan langsung melalui notifikasi WhatsApp dan email pembeli segera setelah paket diserahkan kepada kurir.</p>

      <h2>4. Garansi Keamanan Kemasan (Packaging Luxury)</h2>
      <p>Seluruh busana Batik Smile dikemas menggunakan kotak kemasan butik eksklusif dengan proteksi plastik kedap debu dan segel keamanan untuk memastikan wastra sampai di tangan Anda dalam kondisi sempurna.</p>
    `,
  },
  'privacy-policy': {
    title: 'Kebijakan Privasi & Keamanan Data',
    body: `
      <h2>1. Komitmen Privasi Pelanggan</h2>
      <p>Butik Batik Smile menghargai dan melindungi hak privasi setiap pelanggan kami. Informasi pribadi yang Anda berikan hanya digunakan untuk kepentingan pemrosesan transaksi, pengiriman pesanan, komunikasi layanan pelanggan, dan pembaruan warta eksklusif yang Anda setujui.</p>

      <h2>2. Data yang Kami Kumpulkan</h2>
      <ul>
        <li>Informasi identitas dan kontak (nama lengkap, nomor WhatsApp/telepon, alamat email).</li>
        <li>Informasi alamat pengiriman dan penagihan untuk kelancaran logistik kurir.</li>
        <li>Detail ukuran tubuh personal (khusus layanan jahit bespoke &amp; seragam instansi).</li>
      </ul>

      <h2>3. Keamanan Transaksi &amp; Pembayaran</h2>
      <p>Seluruh transaksi pembayaran digital diproses melalui gerbang pembayaran resmi Shopify bersertifikasi internasional <strong>PCI DSS Level 1</strong> dengan enkripsi SSL 256-bit. Kami tidak pernah menyimpan nomor kartu kredit atau kredensial rahasia perbankan Anda di server kami.</p>

      <h2>4. Hak Pelanggan atas Data Pribadi</h2>
      <p>Anda berhak sewaktu-waktu meminta pembaruan, verifikasi, atau penghapusan data kontak Anda dari basis data kami dengan menghubungi WhatsApp Concierge resmi di <code>081-390-8888-09</code>.</p>
    `,
  },
  'refund-policy': {
    title: 'Garansi Bebas Tukar Size & Pengembalian',
    body: `
      <h2>1. Garansi 100% Bebas Tukar Size</h2>
      <p>Kami memahami kenyamanan siluet dan fitting yang pas adalah elemen terpenting dalam mengenakan batik. Batik Smile memberikan <strong>Garansi Bebas Tukar Size 100%</strong> untuk seluruh produk Ready-To-Wear (Kemeja Pria, Blus &amp; Gamis Wanita, dan Sarimbit Keluarga).</p>

      <h2>2. Syarat &amp; Ketentuan Penukaran</h2>
      <ul>
        <li>Konfirmasi penukaran dapat dilakukan maksimal <strong>7 hari kalender</strong> sejak paket diterima pelanggan berdasarkan tracking ekspedisi.</li>
        <li>Busana dalam kondisi baru: belum pernah dicuci, label hangtag butik masih terpasang utuh, dan aroma kain masih asli.</li>
        <li>Penukaran dapat dilakukan langsung ke Flagship Showroom Simongan atau dikirimkan kembali melalui ekspedisi.</li>
      </ul>

      <h2>3. Prosedur Klaim Penukaran</h2>
      <p>Hubungi staf WhatsApp Concierge kami di <code>081-390-8888-09</code> dengan menyertakan nomor pesanan dan ukuran pengganti yang diinginkan. Staf kami akan langsung mengamankan stok ukuran baru untuk Anda.</p>

      <h2>4. Garansi Cacat Produksi</h2>
      <p>Apabila terdapat cacat jahitan atau ketidaksesuaian pesanan karena kelalaian produksi butik, seluruh biaya ongkos kirim bolak-balik ditanggung 100% oleh Batik Smile.</p>
    `,
  },
  'terms-of-service': {
    title: 'Syarat & Ketentuan Layanan Butik',
    body: `
      <h2>1. Ketentuan Umum</h2>
      <p>Selamat datang di platform butik resmi Batik Smile. Dengan mengakses dan melakukan pembelian di platform ini, Anda menyetujui seluruh ketentuan layanan yang diatur secara transparan demi kenyamanan bersama.</p>

      <h2>2. Standar Keaslian Wastra Nusantara</h2>
      <p>Batik Smile menjamin bahwa seluruh produk diproduksi dengan material pilihan berkualitas: katun primisima bendera, tenun dobby bertekstur, lapisan trikot rapi, dan sutra ATBM asli. Motif batik tulis dikerjakan secara manual oleh perajin canting mitra kami di Jawa Tengah.</p>

      <h2>3. Akurasi Warna &amp; Pencahayaan</h2>
      <p>Kami berusaha menampilkan visual warna produk sedekat mungkin dengan aslinya. Perbedaan saturasi minor dapat terjadi karena karakteristik layar gawai Anda atau sifat alami pewarnaan batik tradisional.</p>

      <h2>4. Hak Kekayaan Intelektual Motif Pusaka</h2>
      <p>Seluruh foto katalog, narasi filosofi motif, desain antarmuka situs, dan pola seragam eksklusif Batik Smile dilindungi oleh undang-undang hak cipta Republik Indonesia.</p>
    `,
  },
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ params, context }) {
  if (!params.handle) {
    throw new Response('No handle was passed in', { status: 404 });
  }

  const handle = params.handle;
  const config = POLICY_MAP[handle] || {
    policyKey: 'privacyPolicy',
    pageHandle: handle,
    fallbackTitle: 'Kebijakan Layanan Butik',
  };

  let shopPolicy = null;
  let shopifyPage = null;

  try {
    const data = await context.storefront.query(POLICY_AND_PAGE_QUERY, {
      variables: {
        pageHandle: config.pageHandle,
        country: context.storefront.i18n?.country,
        language: context.storefront.i18n?.language,
      },
      cache: context.storefront.CacheShort(),
    });

    shopPolicy = data.shop?.[config.policyKey];
    shopifyPage = data.page;
  } catch {
    // Graceful fallback
  }

  // Priority 1: ShopPolicy from Shopify Admin if it has rich body
  // Priority 2: Native Shopify Page if it exists
  // Priority 3: Curated Quiet Luxury Fallback
  let finalTitle = config.fallbackTitle;
  let finalBody = '';

  if (shopPolicy && shopPolicy.body && shopPolicy.body.trim().length > 50) {
    finalTitle = shopPolicy.title || config.fallbackTitle;
    finalBody = shopPolicy.body;
  } else if (shopifyPage && shopifyPage.body && shopifyPage.body.trim().length > 50) {
    finalTitle = shopifyPage.title || config.fallbackTitle;
    finalBody = shopifyPage.body;
  } else {
    const fallback = DEFAULT_POLICIES[handle] || DEFAULT_POLICIES[config.pageHandle] || {
      title: config.fallbackTitle,
      body: '<p>Silakan hubungi WhatsApp Concierge 081-390-8888-09 untuk informasi lebih lanjut mengenai kebijakan butik kami.</p>',
    };
    finalTitle = fallback.title;
    finalBody = fallback.body;
  }

  const policy = {
    handle,
    title: finalTitle,
    body: finalBody,
  };

  return { policy };
}

export default function Policy() {
  /** @type {LoaderReturnData} */
  const { policy } = useLoaderData();

  const breadcrumbItems = [
    { label: 'KEBIJAKAN & JAMINAN', to: '/policies' },
    { label: policy.title.toUpperCase() },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <JsonLd schema={generateBreadcrumbSchema(breadcrumbItems)} />
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="border-b border-[#E2DFD8] pb-8 mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            DOKUMEN RESMI BUTIK
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            {policy.title}
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mt-4" />
        </div>

        {/* Content - Frameless Quiet Luxury Typography */}
        <div className="mb-16 bg-white p-6 sm:p-10 lg:p-12 border border-[#E2DFD8]">
          <div
            className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed [&>h2]:font-serif [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-normal [&>h2]:text-[#111111] [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:pt-4 [&>h2]:border-t [&>h2]:border-[#F0ECE1] [&>h2:first-child]:border-t-0 [&>h2:first-child]:pt-0 [&>h3]:font-serif [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-normal [&>h3]:text-[#111111] [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>p]:mb-4 [&>strong]:font-semibold [&>strong]:text-[#111111] [&>code]:text-[#9E7D3B] [&>code]:bg-[#FAF8F5] [&>code]:px-1.5 [&>code]:py-0.5"
            dangerouslySetInnerHTML={{ __html: policy.body }}
          />
        </div>

        {/* Direct Contact Banner */}
        <div className="p-8 sm:p-10 bg-[#111111] text-white border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block mb-1">
              LAYANAN KONSULTASI KLIEN
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2">
              Butuh Penjelasan Lebih Lanjut?
            </h3>
            <p className="text-xs sm:text-sm text-[#C5BFB8] font-light leading-relaxed max-w-xl">
              Staf Concierge Batik Smile siap membantu melayani konfirmasi penukaran size, pengecekan resi paket, maupun konsultasi fitting seragam via WhatsApp resmi.
            </p>
          </div>
          <a
            href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20mengenai%20kebijakan%20layanan"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[10px] uppercase font-bold tracking-[0.2em] transition-colors whitespace-nowrap text-center no-underline cursor-pointer"
          >
            HUBUNGI CONCIERGE &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

const POLICY_AND_PAGE_QUERY = `#graphql
  query PolicyAndPage(
    $pageHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy {
        id
        title
        handle
        body
      }
      shippingPolicy {
        id
        title
        handle
        body
      }
      termsOfService {
        id
        title
        handle
        body
      }
      refundPolicy {
        id
        title
        handle
        body
      }
    }
    page(handle: $pageHandle) {
      id
      title
      handle
      body
    }
  }
`;

/** @typedef {import('./+types/policies.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */

export function ErrorBoundary() {
  return (
    <NotFoundView
      statusCode={404}
      title="Dokumen Kebijakan Belum Tersedia"
      message="Dokumen kebijakan atau garansi butik yang Anda cari sedang diperbarui. Silakan kembali ke beranda atau hubungi concierge butik kami."
    />
  );
}
