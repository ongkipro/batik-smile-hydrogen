import { Link, useLoaderData, NavLink } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Warta & Jurnal Kebudayaan — Butik Batik Smile Semarang' },
    {
      name: 'description',
      content: 'Kumpulan artikel, jurnal batik tulis, filosofi motif Nusantara, dan panduan perawatan busana batik dari Butik Batik Smile.',
    },
  ];
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
async function loadCriticalData({ context, request }) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const [{ blogs }] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        ...paginationVariables,
      },
    }),
  ]);

  return { blogs };
}

export default function Blogs() {
  /** @type {LoaderReturnData} */
  const { blogs } = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E7D3B]">
            BERANDA
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold uppercase">JURNAL &amp; WARTA</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            CATATAN &amp; ARSIP BUDAYA
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-4">
            Jurnal Batik Nusantara
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Menelusuri sejarah canting malam, makna filosofis motif Jawa, serta tips padu-padan sarimbit keluarga.
          </p>
        </div>

        {/* Blogs List (0px Radius) */}
        <PaginatedResourceSection
          connection={blogs}
          resourcesClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {({ node: blog }) => (
            <Link
              className="p-8 bg-white border border-[#E2DFD8] hover:border-[#111111] shadow-sm hover:shadow-md transition-all group block"
              key={blog.handle}
              prefetch="intent"
              to={`/blogs/${blog.handle}`}
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-2">
                KATEGORI ARTIKEL
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors mb-3">
                {blog.title}
              </h2>
              <p className="text-xs text-[#5A5550] font-light leading-relaxed mb-4">
                {blog.seo?.description || 'Telusuri kumpulan artikel dan warta terbaru seputar warisan batik.'}
              </p>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#111111] font-semibold inline-flex items-center gap-1 group-hover:text-[#9E7D3B] transition-colors">
                BACA SELURUH ARTIKEL &rarr;
              </span>
            </Link>
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}

const BLOGS_QUERY = `#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
      }
    }
  }
`;

/** @typedef {BlogsQuery['blogs']['nodes'][0]} BlogNode */
/** @typedef {import('./+types/blogs._index').Route} Route */
/** @typedef {import('storefrontapi.generated').BlogsQuery} BlogsQuery */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
