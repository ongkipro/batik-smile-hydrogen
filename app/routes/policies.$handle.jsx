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
    fallbackTitle: 'Kebijakan Pengiriman',
  },
  'kebijakan-pengiriman': {
    policyKey: 'shippingPolicy',
    pageHandle: 'kebijakan-pengiriman',
    fallbackTitle: 'Kebijakan Pengiriman',
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
    title: 'Kebijakan Pengiriman',
    body: `
      <p><strong>Batik Smile — Batikku Yo Batik Smile</strong></p>
      <p>Batik Smile berkomitmen untuk memberikan pengalaman berbelanja yang nyaman dan memastikan setiap pesanan diproses dengan baik hingga sampai ke tangan pelanggan.</p>
      <p>Dengan melakukan pembelian melalui website Batik Smile, pelanggan dianggap telah membaca dan memahami kebijakan pengiriman berikut.</p>

      <h2>1. Pemrosesan Pesanan</h2>
      <ul>
        <li>Pesanan akan diproses setelah pembayaran berhasil dikonfirmasi.</li>
        <li>Waktu pemrosesan pesanan adalah 1–2 hari kerja, tidak termasuk hari Minggu dan hari libur nasional.</li>
        <li>Pesanan yang masuk di luar jam operasional akan diproses pada hari kerja berikutnya.</li>
        <li>Selama periode promosi, hari raya, atau lonjakan pesanan, waktu pemrosesan dapat mengalami penyesuaian.</li>
      </ul>

      <h2>2. Metode Pengiriman</h2>
      <p>Batik Smile melayani pengiriman ke berbagai wilayah di Indonesia melalui jasa ekspedisi yang tersedia, antara lain:</p>
      <ul>
        <li>JNE</li>
        <li>J&amp;T Express</li>
        <li>SiCepat</li>
        <li>Jasa ekspedisi lainnya sesuai ketersediaan layanan.</li>
      </ul>
      <p>Pilihan ekspedisi yang dapat digunakan akan ditampilkan pada halaman checkout atau diinformasikan oleh tim Batik Smile sesuai sistem pengiriman yang berlaku.</p>

      <h2>3. Biaya Pengiriman</h2>
      <ul>
        <li>Biaya pengiriman ditentukan berdasarkan alamat tujuan, berat atau dimensi paket, serta layanan ekspedisi yang dipilih.</li>
        <li>Total biaya pengiriman akan ditampilkan sebelum pelanggan menyelesaikan pembayaran.</li>
        <li>Promo gratis ongkir, apabila tersedia, berlaku sesuai syarat dan ketentuan yang ditetapkan oleh Batik Smile.</li>
      </ul>

      <h2>4. Estimasi Waktu Pengiriman</h2>
      <p>Estimasi waktu pengiriman mengikuti layanan ekspedisi yang dipilih dan mulai dihitung setelah paket diserahkan kepada pihak ekspedisi.</p>
      <p>Waktu pengiriman dapat berbeda bergantung pada lokasi tujuan, kondisi operasional ekspedisi, cuaca, hari libur, dan faktor lain di luar kendali Batik Smile.</p>
      <p>Estimasi pengiriman merupakan perkiraan waktu, bukan jaminan tanggal kedatangan paket.</p>

      <h2>5. Pelacakan Pesanan</h2>
      <p>Setelah pesanan dikirim, pelanggan dapat menggunakan nomor resi untuk melacak status pengiriman melalui situs atau layanan pelacakan resmi ekspedisi terkait.</p>
      <p>Apabila nomor resi belum tersedia atau terdapat kendala dalam pelacakan, pelanggan dapat menghubungi layanan pelanggan Batik Smile untuk mendapatkan bantuan.</p>

      <h2>6. Alamat Pengiriman</h2>
      <p>Pelanggan bertanggung jawab memastikan informasi penerima telah diisi dengan benar dan lengkap, meliputi:</p>
      <ul>
        <li>Nama penerima.</li>
        <li>Nomor telepon aktif.</li>
        <li>Alamat lengkap dan kode pos.</li>
        <li>Informasi tambahan yang diperlukan untuk mempermudah pengiriman.</li>
      </ul>
      <p>Kesalahan informasi pengiriman dapat menyebabkan keterlambatan atau kegagalan pengiriman. Perubahan alamat setelah pesanan diproses hanya dapat dilakukan apabila memungkinkan.</p>

      <h2>7. Produk Custom dan Pre-Order</h2>
      <p>Untuk produk custom, pesanan khusus, atau pre-order, waktu pengerjaan dapat berbeda dari produk ready stock.</p>
      <ul>
        <li>Estimasi pengerjaan akan diinformasikan kepada pelanggan sesuai jenis produk dan kesepakatan pesanan.</li>
        <li>Proses pengiriman dilakukan setelah produk selesai diproduksi dan siap dikirim.</li>
        <li>Total waktu penerimaan produk mencakup waktu pengerjaan, apabila ada, serta waktu pengiriman oleh ekspedisi.</li>
      </ul>
      <p>Pelanggan disarankan menghubungi tim Batik Smile terlebih dahulu untuk memperoleh informasi mengenai estimasi pengerjaan produk custom atau pre-order.</p>

      <h2>8. Kerusakan, Kekurangan, atau Ketidaksesuaian Pesanan</h2>
      <p>Batik Smile berupaya memastikan setiap produk dikemas dengan baik sebelum dikirim. Apabila pelanggan menerima paket dengan kondisi berikut:</p>
      <ul>
        <li>Produk rusak atau cacat.</li>
        <li>Jumlah produk tidak sesuai pesanan.</li>
        <li>Produk yang diterima tidak sesuai dengan pesanan.</li>
      </ul>
      <p>Pelanggan wajib menghubungi layanan pelanggan Batik Smile maksimal <strong>2 &times; 24 jam</strong> sejak paket diterima.</p>
      <p>Untuk membantu proses pemeriksaan, pelanggan diminta menyertakan:</p>
      <ol>
        <li>Nomor pesanan.</li>
        <li>Foto kondisi paket bagian luar.</li>
        <li>Foto atau video produk yang diterima.</li>
        <li>Video pembukaan paket (unboxing), apabila tersedia.</li>
        <li>Penjelasan singkat mengenai kendala yang dialami.</li>
      </ol>
      <p>Setiap laporan akan ditinjau oleh tim Batik Smile. Penanganan lebih lanjut akan diinformasikan setelah proses pemeriksaan selesai sesuai ketentuan penanganan keluhan dan pengembalian barang yang berlaku.</p>

      <h2>9. Keterlambatan dan Kendala Pengiriman</h2>
      <p>Apabila terjadi keterlambatan, paket tidak bergerak dalam proses pelacakan, atau kendala pengiriman lainnya, pelanggan dapat menghubungi Batik Smile untuk mendapatkan bantuan tindak lanjut kepada pihak ekspedisi.</p>
      <p>Penyelesaian kendala pengiriman akan mengikuti prosedur ekspedisi terkait. Batik Smile akan membantu proses koordinasi sesuai informasi dan kewenangan yang tersedia.</p>

      <h2>10. Kontak Layanan Pelanggan</h2>
      <p>Untuk pertanyaan mengenai pesanan, pengiriman, produk custom, atau pre-order, pelanggan dapat menghubungi layanan pelanggan melalui kontak resmi yang tercantum pada website Batik Smile.</p>
      <p>Kami menghargai kepercayaan Anda dalam memilih Batik Smile. Setiap pesanan merupakan bagian dari komitmen kami untuk menghadirkan keindahan batik Indonesia dengan kualitas produk dan pelayanan yang terbaik.</p>
      <p><strong>Batik Smile — Batikku Yo Batik Smile.</strong></p>

      <h2>Hubungi Kami</h2>
      <p>Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan bantuan terkait pengiriman pesanan Anda, silakan hubungi kami:</p>
      <ul>
        <li><strong>WhatsApp Resmi</strong>: <a href="https://wa.me/6281390888809" target="_blank" rel="noreferrer">081.390.8888.09</a> (081-390-8888-09)</li>
        <li><strong>Outlet Batik Smile Sukun</strong>: Jl. Sukun Raya No. 23, Srondol Wetan, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50263 (Buka Setiap Hari: 09.00 – 21.00 WIB)</li>
        <li><strong>Outlet Batik Smile Sampokong</strong>: Jl. Simongan Raya No. 109, Ngemplak Simongan, Kec. Semarang Barat (Area Pamularsih / Sam Poo Kong), Kota Semarang, Jawa Tengah 50148 (Buka Setiap Hari: 09.00 – 21.00 WIB)</li>
      </ul>
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
    title: 'Garansi Penukaran Ukuran 7 Hari & Pengiriman',
    body: `
      <h2>1. Pengiriman Aman ke Seluruh Indonesia</h2>
      <p>Setiap pesanan dikemas dengan aman &amp; dikirim langsung dari showroom <strong>Batik Smile Sukun</strong> dan <strong>Batik Smile Sampookong Semarang</strong> ke berbagai wilayah di Indonesia.</p>

      <h2>2. Layanan Penukaran Ukuran 7 Hari</h2>
      <p>Ukuran kurang sesuai? Ajukan penukaran maksimal <strong>7 hari kalender</strong> sejak pesanan diterima, dengan memenuhi syarat dan ketentuan penukaran:</p>
      <ul>
        <li>Produk belum dicuci atau digunakan.</li>
        <li>Label &amp; pricetag masih terpasang utuh.</li>
        <li>Produk masih dalam kondisi baik.</li>
        <li>Penukaran dapat dilakukan langsung ke Showroom Batik Smile Sukun &amp; Sampookong Semarang atau dikirimkan kembali melalui ekspedisi.</li>
      </ul>

      <h2>3. Layanan Jahit Sarimbit dan Seragam</h2>
      <p>Wujudkan busana serasi untuk keluarga maupun instansi melalui layanan jahit seragam di Batik Smile. Kami siap membantu kebutuhan busana dengan berbagai pilihan model dan motif sesuai dengan kebutuhan dan karakter Anda. Tersedia layanan konsultasi hubungi WA bisnis kami di <code>081-390-8888-09</code>.</p>

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

  // Priority 1: ShopPolicy from Shopify Admin (keeps Storefront + Checkout footer synced)
  // Priority 2: Curated final shipping policy when Admin shop.shippingPolicy is still empty
  // Priority 3: Native Shopify Page if it exists
  // Priority 4: Curated Quiet Luxury Fallback
  let finalTitle = config.fallbackTitle;
  let finalBody = '';

  const isShippingPolicy = handle === 'shipping-policy' || handle === 'kebijakan-pengiriman';

  if (shopPolicy && shopPolicy.body && shopPolicy.body.trim().length > 50) {
    finalTitle = shopPolicy.title || config.fallbackTitle;
    finalBody = shopPolicy.body;
  } else if (isShippingPolicy) {
    finalTitle = DEFAULT_POLICIES['shipping-policy'].title;
    finalBody = DEFAULT_POLICIES['shipping-policy'].body;
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
          <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
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
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold block mb-1">
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
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-xs uppercase font-bold tracking-[0.2em] transition-colors whitespace-nowrap text-center no-underline cursor-pointer"
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
