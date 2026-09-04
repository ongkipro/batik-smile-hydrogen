import { useLoaderData } from 'react-router';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePageMeta } from '~/lib/seo';

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

  const [{ page }] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle,
      },
    }),
  ]);

  if (!page) {
    throw new Response('Not Found', { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle: params.handle, data: page });

  return {
    page,
  };
}

export default function Page() {
  /** @type {LoaderReturnData} */
  const { page } = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: page.title.toUpperCase() }]} />

        {/* Header */}
        <div className="border-b border-[#E2DFD8] pb-6 mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            BATIK SMILE NUSANTARA
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-2">
            {page.title}
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mt-4" />
        </div>

        {/* Content Box */}
        <div className="bg-white p-8 sm:p-12 border border-[#E2DFD8] shadow-sm mb-12">
          <main
            className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed [&>h2]:font-serif [&>h2]:text-xl [&>h2]:font-normal [&>h2]:text-[#111111] [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:font-serif [&>h3]:text-lg [&>h3]:font-normal [&>h3]:text-[#111111] [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: page.body }}
          />
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
  }
`;

/** @typedef {import('./+types/pages.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
