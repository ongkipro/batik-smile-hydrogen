import { useLoaderData, Link } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Koleksi Busana Batik & Sarimbit — Butik Batik Smile Nusantara' },
    {
      name: 'description',
      content:
        'Koleksi lengkap busana batik modern, sarimbit keluarga 3 kasta, dan kain batik tulis asli dari Butik Batik Smile Semarang.',
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
    pageBy: 12,
  });

  const [{ collections }] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
  ]);

  return { collections };
}

export default function Collections() {
  /** @type {LoaderReturnData} */
  const { collections } = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[100vw] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            KATALOG BUTIK SEMARANG &bull; SEJAK 2007
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-4">
            Seluruh Koleksi Batik Nusantara
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Temukan busana sarimbit keluarga harmonis, busana wanita modern, kemeja pria furing hero, dan lembaran kain batik tulis pilihan pengrajin Jawa Tengah.
          </p>
        </div>

        {/* Collections Grid (0px Radius, Quiet Luxury) */}
        <PaginatedResourceSection
          connection={collections}
          resourcesClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {({ node: collection, index }) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              index={index}
            />
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   collection: CollectionFragment;
 *   index: number;
 * }}
 */
function CollectionItem({ collection, index }) {
  const fallbackImages = {
    'sarimbit': '/banners/sarimbit_family_banner.jpg',
    'sarimbit-exclusive': '/banners/sarimbit_family_banner.jpg',
    'sarimbit-premium': '/banners/sarimbit_family_banner.jpg',
    'sarimbit-ekonomis': '/banners/sarimbit_family_banner.jpg',
    'batik-wanita': '/brand/models/model_teak_door.jpg',
    'batik-pria': '/banners/hero_editorial_banner.jpg',
    'kain-batik-tulis': '/banners/collection_kain_tulis_banner.jpg',
    'jarik-kain-batik': '/banners/collection_kain_tulis_banner.jpg',
  };

  const imageUrl =
    collection.image?.url ||
    fallbackImages[collection.handle] ||
    '/banners/hero_editorial_banner.jpg';

  return (
    <Link
      className="group block bg-white border border-[#E2DFD8] shadow-sm hover:shadow-md transition-all overflow-hidden"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      <div className="relative aspect-[4/3] bg-[#111111] overflow-hidden">
        <img
          src={imageUrl}
          alt={collection.image?.altText || collection.title}
          loading={index < 4 ? 'eager' : 'lazy'}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-medium block mb-1">
            KOLEKSI BUTIK
          </span>
          <h2 className="font-serif text-2xl font-normal leading-tight text-white group-hover:text-[#C5A059] transition-colors">
            {collection.title}
          </h2>
        </div>
      </div>

      <div className="p-5 flex items-center justify-between bg-white border-t border-[#E2DFD8]">
        <span className="text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold group-hover:text-[#C5A059] transition-colors">
          JELAJAHI KOLEKSI &rarr;
        </span>
        <span className="text-xs text-[#A69F96]">&bull;</span>
      </div>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    description
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
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

/** @typedef {import('./+types/collections._index').Route} Route */
/** @typedef {import('storefrontapi.generated').CollectionFragment} CollectionFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
