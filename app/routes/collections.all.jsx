import { useLoaderData, NavLink } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { ProductItem } from '~/components/ProductItem';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Katalog Lengkap Busana Batik — Butik Batik Smile Semarang' },
    {
      name: 'description',
      content:
        'Jelajahi seluruh katalog busana batik modern, sarimbit keluarga, kemeja pria lapis furing, dan kain batik tulis asli Batik Smile.',
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
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 24,
  });

  const [{ products }] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: { ...paginationVariables },
    }),
  ]);

  return { products };
}

export default function CollectionAll() {
  /** @type {LoaderReturnData} */
  const { products } = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[100vw] mx-auto">
        {/* Breadcrumb */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E7D3B]">
            BERANDA
          </NavLink>
          <span>/</span>
          <NavLink to="/collections" className="hover:text-[#9E7D3B]">
            KOLEKSI
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold">SEMUA PRODUK</span>
        </nav>

        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* 4:5 Products Grid */}
        <PaginatedResourceSection
          connection={products}
          resourcesClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {({ node: product, index }) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 4 ? 'eager' : 'lazy'}
            />
          )}
        </PaginatedResourceSection>
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
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
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
