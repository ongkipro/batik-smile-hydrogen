import { useLoaderData, NavLink } from 'react-router';
import { getPaginationVariables, Analytics } from '@shopify/hydrogen';
import { SearchForm } from '~/components/SearchForm';
import { SearchResults } from '~/components/SearchResults';
import { getEmptyPredictiveSearchResult } from '~/lib/search';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generateSearchMeta } from '~/lib/seo';
import { NotFoundView } from '~/components/NotFoundView';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return generateSearchMeta(data?.term);
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ request, context }) {
  const url = new URL(request.url);
  const isPredictive = url.searchParams.has('predictive');
  const searchPromise = isPredictive
    ? predictiveSearch({ request, context })
    : regularSearch({ request, context });

  try {
    return await searchPromise;
  } catch (error) {
    console.error('search loader error:', error);
    return { term: '', result: null, error: error.message };
  }
}

/**
 * Renders the /search route
 */
export default function SearchPage() {
  /** @type {LoaderReturnData} */
  const { type, term, result, error } = useLoaderData();
  if (type === 'predictive') return null;

  const popularKeywords = ['Sarimbit', 'Kemeja Pria', 'Batik Wanita', 'Kain Tulis', 'Sutra ATBM', 'Dobby'];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'PENCARIAN' }]} />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            TEMUKAN KARYA NUSANTARA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-[#111111] mb-2">
            Pencarian Koleksi Butik
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* Quiet Luxury Search Bar (0px Radius) */}
        <div className="max-w-2xl mx-auto mb-10">
          <SearchForm>
            {({ inputRef }) => (
              <div className="flex border border-[#E2DFD8] bg-white shadow-sm focus-within:border-[#111111] transition-all">
                <input
                  defaultValue={term}
                  name="q"
                  placeholder="Ketik motif, jenis busana, atau koleksi..."
                  ref={inputRef}
                  type="search"
                  className="flex-1 min-w-0 px-3.5 sm:px-5 py-3 sm:py-4 text-base sm:text-sm bg-transparent outline-none placeholder-[#A69F96] text-[#111111]"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-8 py-3 sm:py-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                >
                  CARI &rarr;
                </button>
              </div>
            )}
          </SearchForm>

          {/* Popular Tag Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[10px]">
            <span className="text-[#5A5550] uppercase tracking-wider font-medium">Pencarian Populer:</span>
            {popularKeywords.map((kw) => (
              <NavLink
                key={kw}
                to={`/search?q=${encodeURIComponent(kw)}`}
                className="px-3 py-1 bg-white border border-[#E2DFD8] text-[#111111] hover:border-[#111111] hover:bg-[#FAF8F5] transition-colors uppercase tracking-wider"
              >
                {kw}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 text-red-700 text-xs mb-8 text-center">
            {error}
          </div>
        )}

        {/* Search Results Display */}
        {!term || !result?.total ? (
          <div className="text-center py-16 bg-white border border-[#E2DFD8] p-8 max-w-2xl mx-auto">
            <span className="text-2xl block mb-2">🔍</span>
            <h2 className="font-serif text-xl text-[#111111] font-normal mb-1">
              {term ? `Tidak Ada Hasil untuk "${term}"` : 'Mulai Pencarian Busana Anda'}
            </h2>
            <p className="text-xs text-[#5A5550] font-light max-w-md mx-auto leading-relaxed mt-2 mb-6">
              {term
                ? 'Coba gunakan kata kunci yang lebih umum seperti "Sarimbit", "Pria", "Wanita", atau hubungi konsultan kami.'
                : 'Ketik nama motif, model kemeja, atau ukuran untuk melihat katalog yang tersedia.'}
            </p>
            <NavLink
              to="/collections/luxury-series"
              className="inline-block px-8 py-3 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
            >
              LIHAT KOLEKSI POPULER &rarr;
            </NavLink>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-3 mb-8">
              <span className="text-sm sm:text-base uppercase tracking-[0.16em] text-[#5A5550]">
                HASIL PENCARIAN UNTUK &ldquo;<strong className="text-[#111111]">{term}</strong>&rdquo;
              </span>
            </div>

            <SearchResults result={result} term={term} />
          </div>
        )}
      </div>

      <Analytics.SearchView data={{ searchTerm: term, searchResults: result }} />
    </div>
  );
}

const RETIRED_PAGE_HANDLES = new Set(['layanan-seragam', 'fasilitas-store']);

/**
 * Regular search query
 */
async function regularSearch({ request, context }) {
  const { storefront } = context;
  const url = new URL(request.url);
  // 4 columns x 3 rows = 12 search results per page, remaining via Load More
  const variables = getPaginationVariables(request, { pageBy: 12 });
  const term = String(url.searchParams.get('q') || '').trim();

  if (!term) {
    return {
      type: 'regular',
      term: '',
      result: { total: 0, totalCount: 0, nodes: [] },
    };
  }

  const { search } = await storefront.query(SEARCH_QUERY, {
    variables: {
      searchTerm: term,
      ...variables,
    },
    cache: storefront.CacheShort(),
  });

  const filteredNodes = (search?.nodes || []).filter(
    (node) => !(node.__typename === 'Page' && RETIRED_PAGE_HANDLES.has(node.handle)),
  );
  const total = filteredNodes.length;
  return { type: 'regular', term, result: { total, ...search, nodes: filteredNodes } };
}

/**
 * Predictive search query
 */
async function predictiveSearch({ request, context }) {
  const { storefront } = context;
  const url = new URL(request.url);
  const term = String(url.searchParams.get('q') || '').trim();
  // Shopify Storefront API limit for predictiveSearch is strictly 1..10
  const limit = Math.min(10, Math.max(1, Number(url.searchParams.get('limit') || 10)));
  const type = 'predictive';

  if (!term) return { type, term, result: getEmptyPredictiveSearchResult() };

  try {
    const { predictiveSearch: result } = await storefront.query(
      PREDICTIVE_SEARCH_QUERY,
      {
        variables: { limit, limitScope: 'EACH', searchTerm: term },
        cache: storefront.CacheShort(),
      },
    );

    const safeResult = result || {};
    const products = safeResult.products || [];
    const collections = safeResult.collections || [];
    const articles = safeResult.articles || [];
    const pages = (safeResult.pages || []).filter(
      (p) => !RETIRED_PAGE_HANDLES.has(p.handle),
    );
    const queries = safeResult.queries || [];

    // Extract unique tags from products
    const tags = Array.from(
      new Set(products.flatMap((p) => p.tags || []))
    ).filter(Boolean);

    const total = products.length + collections.length + articles.length + pages.length;

    return {
      type,
      term,
      result: {
        ...safeResult,
        pages,
        total,
        tags,
        items: {
          articles,
          collections,
          pages,
          products,
          queries,
          tags,
        },
      },
    };
  } catch (error) {
    console.error('predictiveSearch error:', error);
    return {
      type,
      term,
      result: getEmptyPredictiveSearchResult(),
      error: error.message,
    };
  }
}

const SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment SearchProduct on Product {
    id
    title
    handle
    trackingParameters
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

const SEARCH_QUERY = `#graphql
  ${SEARCH_PRODUCT_FRAGMENT}
  query RegularSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $searchTerm: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    search(
      after: $endCursor,
      before: $startCursor,
      first: $first,
      last: $last,
      query: $searchTerm,
      sortKey: RELEVANCE,
      types: [PRODUCT, PAGE, ARTICLE]
    ) {
      totalCount
      nodes {
        __typename
        ... on Product {
          ...SearchProduct
        }
        ... on Page {
          id
          title
          handle
          trackingParameters
        }
        ... on Article {
          id
          title
          handle
          trackingParameters
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const PREDICTIVE_SEARCH_ARTICLE_FRAGMENT = `#graphql
  fragment PredictiveArticle on Article {
    __typename
    id
    title
    handle
    trackingParameters
  }
`;

const PREDICTIVE_SEARCH_COLLECTION_FRAGMENT = `#graphql
  fragment PredictiveCollection on Collection {
    __typename
    id
    title
    handle
    image {
      url
      altText
    }
    trackingParameters
  }
`;

const PREDICTIVE_SEARCH_PAGE_FRAGMENT = `#graphql
  fragment PredictivePage on Page {
    __typename
    id
    title
    handle
    trackingParameters
  }
`;

const PREDICTIVE_SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment PredictiveProduct on Product {
    __typename
    id
    title
    handle
    tags
    trackingParameters
    selectedOrFirstAvailableVariant {
      id
      price {
        amount
        currencyCode
      }
      image {
        url
        altText
      }
    }
  }
`;

const PREDICTIVE_SEARCH_QUERY_FRAGMENT = `#graphql
  fragment PredictiveQuery on SearchQuerySuggestion {
    __typename
    text
    styledText
    trackingParameters
  }
`;

const PREDICTIVE_SEARCH_QUERY = `#graphql
  fragment SearchResult on PredictiveSearchResult {
    articles {
      ...PredictiveArticle
    }
    collections {
      ...PredictiveCollection
    }
    pages {
      ...PredictivePage
    }
    products {
      ...PredictiveProduct
    }
    queries {
      ...PredictiveQuery
    }
  }
  query PredictiveSearch(
    $country: CountryCode
    $language: LanguageCode
    $limit: Int!
    $limitScope: PredictiveSearchLimitScope!
    $searchTerm: String!
    $types: [PredictiveSearchType!]
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      limit: $limit,
      limitScope: $limitScope,
      query: $searchTerm,
      types: $types
    ) {
      ...SearchResult
    }
  }
  ${PREDICTIVE_SEARCH_ARTICLE_FRAGMENT}
  ${PREDICTIVE_SEARCH_COLLECTION_FRAGMENT}
  ${PREDICTIVE_SEARCH_PAGE_FRAGMENT}
  ${PREDICTIVE_SEARCH_PRODUCT_FRAGMENT}
  ${PREDICTIVE_SEARCH_QUERY_FRAGMENT}
`;

/** @typedef {import('./+types/search').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */

export function ErrorBoundary() {
  return (
    <NotFoundView
      statusCode={404}
      title="Pencarian Belum Menemukan Hasil"
      message="Sistem pencarian sedang disinkronkan atau kata kunci yang dicari belum tersedia. Silakan gunakan kata kunci lain atau jelajahi koleksi utama butik."
    />
  );
}
