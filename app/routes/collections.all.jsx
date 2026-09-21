import { useLoaderData } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { ProductItem } from '~/components/ProductItem';
import { Breadcrumb } from '~/components/Breadcrumb';
import { CollectionFilterBar } from '~/components/CollectionFilterBar';
import { generateCollectionMeta } from '~/lib/seo';

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
  // 4 columns x 3 rows = 12 products per page, remaining via Load More
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const sortParam = searchParams.get('sort');

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
    }),
  ]);

  return { products };
}

export default function CollectionAll() {
  /** @type {LoaderReturnData} */
  const { products } = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'KOLEKSI', to: '/collections' },
            { label: 'SEMUA PRODUK' },
          ]}
        />

        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            KATALOG BUTIK LENGKAP
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-4">
            Katalog Busana Batik Nusantara
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Setiap karya batik dijahit dengan ketelitian tinggi dan dilapisi furing hero katun yang sejuk.
          </p>
        </div>

        {/* Minimalist Horizontal Filter & Sort Bar (Before Product List) */}
        <CollectionFilterBar
          totalCount={products?.nodes?.length}
        />

        {/* 4:5 Products Grid */}
        {products?.nodes?.length === 0 ? (
          <div className="text-center py-16 px-4 border border-dashed border-[#E2DFD8] bg-white mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-2">
              FILTER TIDAK MENEMUKAN HASIL
            </span>
            <p className="font-serif text-xl text-[#111111] mb-2">
              Tidak ada busana yang sesuai dengan kriteria filter.
            </p>
            <p className="text-xs text-[#5A5550] max-w-md mx-auto">
              Silakan sesuaikan rentang harga atau reset filter untuk melihat seluruh katalog.
            </p>
          </div>
        ) : (
          <PaginatedResourceSection
            connection={products}
            resourcesClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12"
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
