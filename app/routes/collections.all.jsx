import { useMemo } from 'react';
import { useLoaderData, useSearchParams, Link } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { ProductItem } from '~/components/ProductItem';
import { Breadcrumb } from '~/components/Breadcrumb';
import { CollectionSidebar, CollectionFilterHeader } from '~/components/CollectionFilterBar';
import { generateCollectionMeta } from '~/lib/seo';
import { JsonLd } from '~/components/JsonLd';
import { generateCollectionSchema, generateBreadcrumbSchema } from '~/lib/schema';
import { NotFoundView } from '~/components/NotFoundView';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return generateCollectionMeta(null, true);
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
  const { storefront } = context;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const sortParam = searchParams.get('sort');
  const hasClientFilter = Boolean(
    searchParams.get('gender') ||
      searchParams.get('category') ||
      searchParams.get('occasion') ||
      searchParams.get('sleeve'),
  );

  // Fetch larger pool when client-side gender/category refinement is active
  const paginationVariables = getPaginationVariables(request, {
    pageBy: hasClientFilter ? 48 : 12,
  });

  let sortKey = 'RELEVANCE';
  let reverse = false;

  switch (sortParam) {
    case 'price-asc':
      sortKey = 'PRICE';
      reverse = false;
      break;
    case 'price-desc':
      sortKey = 'PRICE';
      reverse = true;
      break;
    case 'latest':
      sortKey = 'CREATED_AT';
      reverse = true;
      break;
    case 'title-asc':
      sortKey = 'TITLE';
      reverse = false;
      break;
    case 'title-desc':
      sortKey = 'TITLE';
      reverse = true;
      break;
    case 'best-selling':
      sortKey = 'BEST_SELLING';
      reverse = false;
      break;
    default:
      sortKey = 'RELEVANCE';
      reverse = false;
      break;
  }

  const queryParts = [];
  if (searchParams.get('available') === 'true') {
    queryParts.push('available_for_sale:true');
  }

  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice && maxPrice) {
    queryParts.push(`variants.price:>=${minPrice} AND variants.price:<=${maxPrice}`);
  } else if (minPrice) {
    queryParts.push(`variants.price:>=${minPrice}`);
  } else if (maxPrice) {
    queryParts.push(`variants.price:<=${maxPrice}`);
  }

  const query = queryParts.length > 0 ? queryParts.join(' AND ') : undefined;

  const [{ products }] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {
        ...paginationVariables,
        sortKey,
        reverse,
        query,
      },
      cache: storefront.CacheShort(),
    }),
  ]);

  return { products };
}

export default function CollectionAll() {
  /** @type {LoaderReturnData} */
  const { products } = useLoaderData();
  const [searchParams] = useSearchParams();

  const genderParam = searchParams.get('gender')?.toLowerCase();
  const categoryParam = (
    searchParams.get('category') ||
    searchParams.get('occasion') ||
    searchParams.get('sleeve')
  )?.toLowerCase();

  const filteredConnection = useMemo(() => {
    if (!genderParam && !categoryParam) return products;
    const nodes = (products?.nodes || []).filter((p) => {
      const pTags = (p.tags || []).map((t) => t.toLowerCase().replace(/[\s_]+/g, '-'));
      const pTitle = (p.title || '').toLowerCase();

      if (genderParam) {
        const targetGender = genderParam.toLowerCase().replace(/[\s_]+/g, '-');
        const matchesGenderTag = pTags.includes(targetGender);
        const matchesGenderTitle =
          targetGender === 'pria' || targetGender === 'putra'
            ? pTitle.includes('pria') ||
              pTitle.includes('kemeja') ||
              pTitle.includes('hem') ||
              pTitle.includes('putra') ||
              pTitle.includes('bapak')
            : pTitle.includes('wanita') ||
              pTitle.includes('blus') ||
              pTitle.includes('gamis') ||
              pTitle.includes('dress') ||
              pTitle.includes('tunik') ||
              pTitle.includes('putri') ||
              pTitle.includes('ibu');
        if (!matchesGenderTag && !matchesGenderTitle) return false;
      }

      if (categoryParam) {
        if (categoryParam === 'baju-kerja' || categoryParam === 'kerja' || categoryParam === 'kantor') {
          const match =
            pTags.some(
              (t) =>
                t.includes('kerja') ||
                t.includes('kantor') ||
                t.includes('formal') ||
                t.includes('kemeja') ||
                t.includes('blus'),
            ) ||
            pTitle.includes('kerja') ||
            pTitle.includes('kantor') ||
            pTitle.includes('kemeja') ||
            pTitle.includes('blus');
          if (!match) return false;
        } else if (categoryParam === 'acara-resmi' || categoryParam === 'resmi' || categoryParam === 'formal') {
          const match =
            pTags.some(
              (t) =>
                t.includes('resmi') ||
                t.includes('formal') ||
                t.includes('resepsi') ||
                t.includes('pesta') ||
                t.includes('sarimbit') ||
                t.includes('sutra') ||
                t.includes('dobby') ||
                t.includes('gamis'),
            ) ||
            pTitle.includes('resmi') ||
            pTitle.includes('formal') ||
            pTitle.includes('resepsi') ||
            pTitle.includes('pesta') ||
            pTitle.includes('sarimbit') ||
            pTitle.includes('gamis');
          if (!match) return false;
        } else if (categoryParam === 'casual' || categoryParam === 'santai') {
          const match =
            pTags.some(
              (t) =>
                t.includes('casual') ||
                t.includes('santai') ||
                t.includes('hem') ||
                t.includes('outer') ||
                t.includes('katun'),
            ) ||
            pTitle.includes('casual') ||
            pTitle.includes('santai') ||
            pTitle.includes('hem') ||
            pTitle.includes('outer');
          if (!match) return false;
        } else if (categoryParam === 'sarimbit' || categoryParam === 'couple') {
          const match =
            pTags.some((t) => t.includes('sarimbit') || t.includes('couple') || t.includes('pasangan')) ||
            pTitle.includes('sarimbit') ||
            pTitle.includes('couple') ||
            pTitle.includes('pasangan');
          if (!match) return false;
        } else if (categoryParam === 'lengan-panjang' || categoryParam === 'lengan-pendek') {
          if (!pTags.includes(categoryParam)) return false;
        }
      }

      return true;
    });

    return {
      ...products,
      nodes,
      pageInfo: {
        ...products?.pageInfo,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }, [products, genderParam, categoryParam]);

  const breadcrumbItems = [
    { label: 'KOLEKSI', to: '/collections' },
    { label: 'SEMUA PRODUK' },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <JsonLd
        schema={[
          generateCollectionSchema(
            {
              handle: 'all',
              title: 'Katalog Lengkap Busana Batik',
              description:
                'Jelajahi seluruh katalog busana batik modern, sarimbit keluarga 3 kasta, busana pria dan wanita, serta kain batik tulis asli Batik Smile Semarang.',
            },
            filteredConnection?.nodes,
          ),
          generateBreadcrumbSchema(breadcrumbItems),
        ]}
      />
      <div className="w-full max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            KATALOG BUTIK LENGKAP
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-4">
            Katalog Busana Batik Nusantara
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#5A5550] font-light leading-relaxed">
            Setiap karya batik dirancang dengan ketelitian pola simetris dan material pilihan berkualitas standar butik.
          </p>
        </div>

        {/* 2-Column Catalog Layout: Desktop Left Sidebar + Product Grid */}
        <div className="lg:flex lg:gap-8 xl:gap-10 items-start">
          <CollectionSidebar
            handle="all"
            isDark={false}
            totalCount={filteredConnection?.nodes?.length}
          />

          <div className="flex-1 min-w-0">
            <CollectionFilterHeader
              handle="all"
              isDark={false}
              totalCount={filteredConnection?.nodes?.length}
            />

            {/* 4:5 Products Grid */}
            {filteredConnection?.nodes?.length === 0 ? (
              <div className="text-center py-16 px-4 border border-[#E2DFD8] bg-white mb-12">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-2">
                  FILTER TIDAK MENEMUKAN HASIL
                </span>
                <p className="font-serif text-xl text-[#111111] mb-2">
                  Tidak ada busana yang sesuai dengan kriteria filter.
                </p>
                <p className="text-xs text-[#5A5550] max-w-md mx-auto mb-6">
                  Silakan sesuaikan rentang harga atau reset filter untuk melihat seluruh katalog.
                </p>
                <Link
                  to="/collections/all"
                  className="inline-block px-6 py-2.5 bg-[#111111] text-white hover:bg-[#C5A059] hover:text-[#111111] text-[10px] uppercase font-bold tracking-[0.2em] transition-colors no-underline"
                >
                  Reset Filter Katalog
                </Link>
              </div>
            ) : (
              <PaginatedResourceSection
                connection={filteredConnection}
                resourcesClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-7 lg:gap-y-12"
              >
                {({ node: product, index }) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                )}
              </PaginatedResourceSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    productType
    availableForSale
    tags
    featuredImage {
      id
      altText
      url
      width
      height
    }
    images(first: 2) {
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
`;

const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      sortKey: $sortKey,
      reverse: $reverse,
      query: $query
    ) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
`;

/** @typedef {import('./+types/collections.all').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */

export function ErrorBoundary() {
  return (
    <NotFoundView
      statusCode={404}
      title="Katalog Belum Tersedia"
      message="Katalog busana yang Anda tuju sedang diperbarui. Silakan kembali ke beranda atau hubungi concierge butik kami."
    />
  );
}
