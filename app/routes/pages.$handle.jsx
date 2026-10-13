import { useLoaderData } from 'react-router';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePageMeta } from '~/lib/seo';
import { JsonLd } from '~/components/JsonLd';
import { generateBreadcrumbSchema } from '~/lib/schema';
import { NotFoundView } from '~/components/NotFoundView';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return generatePageMeta({ page: data?.page });
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  return { ...criticalData };
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, request, params }) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const [{ page, shop }] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle,
        country: context.storefront.i18n?.country,
        language: context.storefront.i18n?.language,
      },
      cache: context.storefront.CacheShort(),
    }),
  ]);

  let effectivePage = page;

  // Graceful fallback for Privacy Policy if requested via /pages/ route
  if (!effectivePage && (params.handle === 'kebijakan-privasi' || params.handle === 'privacy-policy')) {
    if (shop?.privacyPolicy) {
      effectivePage = {
        id: shop.privacyPolicy.id,
        handle: params.handle,
        title: shop.privacyPolicy.title || 'Kebijakan Privasi & Keamanan Data',
        body: shop.privacyPolicy.body,
        seo: {
          title: 'Kebijakan Privasi & Keamanan Data | Batik Smile',
          description: 'Kebijakan privasi resmi dan standar perlindungan data butik Batik Smile.',
        },
      };
    }
  }

  if (!effectivePage) {
    throw new Response('Not Found', { status: 404 });
  }

  if (page) {
    redirectIfHandleIsLocalized(request, { handle: params.handle, data: page });
  }

  return {
    page: effectivePage,
  };
}

export default function Page() {
  /** @type {LoaderReturnData} */
  const { page } = useLoaderData();

  const isLegalPage = [
    'kebijakan-pengiriman',
    'kebijakan-pengembalian',
    'syarat-dan-ketentuan',
    'kebijakan-privasi',
    'privacy-policy',
    'panduan-ukuran',
    'panduan-perawatan',
  ].includes(page.handle);

  const breadcrumbItems = isLegalPage
    ? [
        { label: 'KEBIJAKAN & JAMINAN', to: '/policies' },
        { label: page.title.toUpperCase() },
      ]
    : [{ label: page.title.toUpperCase() }];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-20 px-4 sm:px-6 lg:px-8">
      <JsonLd schema={generateBreadcrumbSchema(breadcrumbItems)} />
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="border-b border-[#E2DFD8] pb-8 mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            {isLegalPage ? 'STANDAR RESMI BUTIK' : 'BATIK SMILE'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-3 leading-tight">
            {page.title}
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mt-4" />
        </div>

        {/* Content - Frameless Quiet Luxury Typography */}
        <div className="mb-16 bg-white p-6 sm:p-10 lg:p-12 border border-[#E2DFD8]">
          <main
            className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed [&>h2]:font-serif [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-normal [&>h2]:text-[#111111] [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:pt-4 [&>h2]:border-t [&>h2]:border-[#F0ECE1] [&>h2:first-child]:border-t-0 [&>h2:first-child]:pt-0 [&>h3]:font-serif [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-normal [&>h3]:text-[#111111] [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>p]:mb-4 [&>strong]:font-semibold [&>strong]:text-[#111111] [&>table]:w-full [&>table]:text-left [&>table]:my-6 [&>table_th]:bg-[#FAF8F5] [&>table_th]:p-3 [&>table_th]:font-semibold [&>table_th]:border-b [&>table_th]:border-[#E2DFD8] [&>table_td]:p-3 [&>table_td]:border-b [&>table_td]:border-[#F0ECE1]"
            dangerouslySetInnerHTML={{ __html: page.body }}
          />
        </div>

        {/* Direct Contact / Concierge Banner */}
        <div className="p-8 sm:p-10 bg-[#111111] text-white border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block mb-1">
              LAYANAN KONSULTASI RESMI
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2">
              Butuh Bantuan Mengenai Halaman Ini?
            </h3>
            <p className="text-xs sm:text-sm text-[#C5BFB8] font-light leading-relaxed max-w-xl">
              Tim Concierge Butik Batik Smile siap melayani Anda via WhatsApp resmi.
            </p>
          </div>
          <a
            href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20bertanya%20mengenai%20layanan"
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

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      seo {
        description
        title
      }
    }
    shop {
      privacyPolicy {
        id
        title
        handle
        body
      }
    }
  }
`;

/** @typedef {import('./+types/pages.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */

export function ErrorBoundary() {
  return (
    <NotFoundView
      statusCode={404}
      title="Halaman Belum Tersedia"
      message="Halaman informasi resmi yang Anda tuju sedang diperbarui atau telah berpindah. Silakan kembali ke beranda atau hubungi concierge butik kami."
    />
  );
}
