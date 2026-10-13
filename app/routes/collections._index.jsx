import { useLoaderData, Link } from 'react-router';
import { getPaginationVariables } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generateCollectionIndexMeta } from '~/lib/seo';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return generateCollectionIndexMeta();
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
    pageBy: 9,
  });

  const [{ collections }] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
  ]);

  return { collections };
}

/**
 * Scatter styles array to create the artistic atelier "kartu berantakan" moodboard effect.
 * Each card gets a deliberate organic tilt, vertical stagger offset, translucent washi tape accent,
 * and serial plate stamp. On hover, the card smoothly straightens up (rotate-0) and scales up.
 */
const SCATTER_STYLES = [
  {
    tilt: '-rotate-1 sm:-rotate-2',
    offset: 'lg:translate-y-2',
    tapePos: 'left-8 -top-2.5',
    tapeAngle: '-rotate-2',
    stamp: 'SERI I',
    plate: 'ARC-01',
    note: 'Sarimbit Sutra ATBM 3 Kasta',
  },
  {
    tilt: 'rotate-1 sm:rotate-2',
    offset: 'lg:-translate-y-4',
    tapePos: 'right-8 -top-2.5',
    tapeAngle: 'rotate-3',
    stamp: 'HAUTE',
    plate: 'ARC-02',
    note: 'Tenun Dobby & Katun Prima',
  },
  {
    tilt: '-rotate-1.5 sm:-rotate-2.5',
    offset: 'lg:translate-y-5',
    tapePos: 'left-1/2 -translate-x-1/2 -top-2.5',
    tapeAngle: '-rotate-1',
    stamp: 'MASTERPIECE',
    plate: 'ARC-03',
    note: 'Canting Tembaga & Soga Alami',
  },
  {
    tilt: 'rotate-1.5 sm:rotate-2',
    offset: 'lg:-translate-y-3',
    tapePos: 'left-6 -top-2.5',
    tapeAngle: 'rotate-2',
    stamp: 'WARISAN',
    plate: 'ARC-04',
    note: 'Kemeja Furing Hero Halus',
  },
  {
    tilt: '-rotate-2 sm:-rotate-1.5',
    offset: 'lg:translate-y-4',
    tapePos: 'right-6 -top-2.5',
    tapeAngle: '-rotate-3',
    stamp: 'ATELIER',
    plate: 'ARC-05',
    note: 'Blus & Dress Pesta Modern',
  },
  {
    tilt: 'rotate-1 sm:rotate-1.5',
    offset: 'lg:-translate-y-2',
    tapePos: 'left-1/2 -translate-x-1/2 -top-2.5',
    tapeAngle: 'rotate-1',
    stamp: 'LIMITED',
    plate: 'ARC-06',
    note: 'Koleksi Balita & Anak Tradisional',
  },
  {
    tilt: '-rotate-1 sm:-rotate-2',
    offset: 'lg:translate-y-3',
    tapePos: 'left-8 -top-2.5',
    tapeAngle: '-rotate-2',
    stamp: 'EXCLUSIVE',
    plate: 'ARC-07',
    note: 'Blazer & Outerwear Elegan',
  },
  {
    tilt: 'rotate-2 sm:rotate-2.5',
    offset: 'lg:-translate-y-4',
    tapePos: 'right-8 -top-2.5',
    tapeAngle: 'rotate-2',
    stamp: 'PREMIUM',
    plate: 'ARC-08',
    note: 'Tunik & Gamis Pesta Mewah',
  },
  {
    tilt: '-rotate-1.5 sm:-rotate-1',
    offset: 'lg:translate-y-5',
    tapePos: 'left-6 -top-2.5',
    tapeAngle: '-rotate-1',
    stamp: 'SEMARANG',
    plate: 'ARC-09',
    note: 'Jarik Wiru & Sarung Batik',
  },
  {
    tilt: 'rotate-1 sm:rotate-2',
    offset: 'lg:-translate-y-3',
    tapePos: 'right-6 -top-2.5',
    tapeAngle: 'rotate-3',
    stamp: 'ORIGINAL',
    plate: 'ARC-10',
    note: 'Kebaya Bordir & Encim Pesisir',
  },
  {
    tilt: '-rotate-2 sm:-rotate-1.5',
    offset: 'lg:translate-y-2',
    tapePos: 'left-1/2 -translate-x-1/2 -top-2.5',
    tapeAngle: '-rotate-2',
    stamp: 'BUTIK',
    plate: 'ARC-11',
    note: 'Inner Busana & Manset Lembut',
  },
  {
    tilt: 'rotate-1.5 sm:rotate-2',
    offset: 'lg:-translate-y-5',
    tapePos: 'right-8 -top-2.5',
    tapeAngle: 'rotate-1',
    stamp: 'KLASIK',
    plate: 'ARC-12',
    note: 'Kain Panjang Pola Keraton',
  },
];

export default function Collections() {
  /** @type {LoaderReturnData} */
  const { collections } = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-8 sm:pt-10 pb-24 sm:pb-28 lg:pb-24 px-3 sm:px-6 lg:px-12 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'SEMUA KOLEKSI' }]} />

        {/* Curated Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E2DFD8] text-[8px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#9E7D3B] font-semibold mb-3 sm:mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 bg-[#C5A059]"></span>
            <span>PAPAN KURASI ARSIP &bull; BUTIK SIMONGAN</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#111111] mb-3 sm:mb-5 leading-tight">
            Katalog Koleksi Busana &amp; Kain Batik
          </h1>

          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="w-10 sm:w-12 h-px bg-[#E2DFD8]" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#C5A059] rotate-45" />
            <div className="w-10 sm:w-12 h-px bg-[#E2DFD8]" />
          </div>

          <p className="text-[11px] sm:text-sm text-[#5A5550] font-light leading-relaxed max-w-2xl mx-auto px-2">
            Lembar arsip kurasi mahakarya Batik Smile. Dari kemegahan Sarimbit Tiga Kasta berfuring hero halus, kemeja pria pola simetris, hingga helaian kain batik tulis canting tembaga asli Jawa Tengah.
          </p>

          {/* Quick Category Anchors (Horizontal swipeable on mobile) */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 mt-6 sm:mt-8 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0">
            {[
              { label: 'LUXURY SERIES', href: '/collections/luxury-series' },
              { label: 'PREMIUM SERIES', href: '/collections/premium-series' },
              { label: 'EKONOMI SERIES', href: '/collections/ekonomi-series' },
              { label: 'KAIN', href: '/collections/kain' },
              { label: 'AKSESORIS', href: '/collections/aksesoris' },
              { label: 'BATIK ANAK', href: '/collections/batik-anak' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={cat.href}
                className="whitespace-nowrap px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white hover:bg-[#111111] text-[#111111] hover:text-white border border-[#E2DFD8] hover:border-[#C5A059] text-[8px] sm:text-[9px] uppercase font-semibold tracking-[0.14em] sm:tracking-[0.16em] transition-all no-underline shadow-xs flex-shrink-0"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Scattered Atelier Moodboard Grid: 5:4 Aspect Ratio Cards */}
        <PaginatedResourceSection
          connection={collections}
          resourcesClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 py-4 sm:py-6"
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
    'luxury-series': '/banners/sarimbit_family_banner.jpg',
    'premium-series': '/banners/sarimbit_family_banner.jpg',
    'ekonomi-series': '/banners/sarimbit_family_banner.jpg',
    'sarimbit': '/banners/sarimbit_family_banner.jpg',
    'sarimbit-luxury': '/banners/sarimbit_family_banner.jpg',
    'sarimbit-premium': '/banners/sarimbit_family_banner.jpg',
    'sarimbit-ekonomi': '/banners/sarimbit_family_banner.jpg',
    'kain': '/banners/collection_kain_tulis_banner.jpg',
    'aksesoris': '/banners/hero_editorial_banner.jpg',
    'batik-anak':
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/files/img_1_ba593dd2-e198-489c-adb4-60c3be2cd938.jpg?v=1788413033',
    'shop': '/banners/hero_editorial_banner.jpg',
    // Fallback aliases for safety
    'sarimbit-exclusive': '/banners/sarimbit_family_banner.jpg',
    'sarimbit-ekonomis': '/banners/sarimbit_family_banner.jpg',
    'jarik-kain-batik': '/banners/collection_kain_tulis_banner.jpg',
    'blangkon-tradisional': '/banners/hero_editorial_banner.jpg',
  };

  const imageUrl =
    collection.image?.url ||
    fallbackImages[collection.handle] ||
    '/banners/hero_editorial_banner.jpg';

  const style = SCATTER_STYLES[index % SCATTER_STYLES.length];

  return (
    <div
      className={`relative group transition-all duration-500 ease-out ${style.offset} hover:z-30`}
    >
      {/* Translucent Archival Washi Tape Accent */}
      <div
        aria-hidden="true"
        className={`absolute ${style.tapePos} ${style.tapeAngle} z-20 w-12 sm:w-16 h-3 sm:h-3.5 bg-[#F3EDE2]/85 border border-[#C5A059]/40 backdrop-blur-xs shadow-xs pointer-events-none group-hover:opacity-60 transition-opacity`}
      />

      {/* Strict 5:4 Landscape Aspect Ratio Curated Card */}
      <Link
        className={`block relative aspect-[5/4] bg-[#111111] overflow-hidden border border-[#E2DFD8] shadow-[0_6px_22px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_45px_rgba(197,160,89,0.20)] group-hover:border-[#C5A059] transition-all duration-500 transform ${style.tilt} group-hover:rotate-0 group-hover:scale-[1.02] no-underline`}
        key={collection.id}
        to={`/collections/${collection.handle}`}
        prefetch="intent"
      >
        {/* Full-bleed 5:4 Curated Photography */}
        <img
          src={imageUrl}
          alt={collection.image?.altText || collection.title}
          loading={index < 4 ? 'eager' : 'lazy'}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-85 group-hover:opacity-100"
        />

        {/* Full-bleed Editorial Gradient Overlay (Quiet Luxury Scrim) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 p-4 sm:p-6 flex flex-col justify-between text-white">
          {/* Top Bar: Archival Plate & Stamp */}
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#C5A059] bg-black/75 px-2 py-0.5 border border-[#C5A059]/30 backdrop-blur-xs">
              {style.plate}
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.16em] uppercase text-white bg-[#C5A059] px-2 py-0.5 shadow-xs">
              {style.stamp}
            </span>
          </div>

          {/* Bottom Bar: Collection Editorial Info */}
          <div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-1">
              ARSIP BUTIK &bull; {style.note}
            </span>

            <h2 className="font-serif text-xl sm:text-2xl lg:text-2xl font-normal leading-tight text-white group-hover:text-[#C5A059] transition-colors mb-1.5 line-clamp-1">
              {collection.title}
            </h2>

            {collection.description && (
              <p className="text-[11px] text-[#E2DFD8]/80 font-light line-clamp-1 mb-2 hidden sm:block">
                {collection.description}
              </p>
            )}

            {/* Action Line */}
            <div className="flex items-center justify-between pt-2 border-t border-white/20">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] font-bold text-white group-hover:text-[#C5A059] transition-colors flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[#C5A059] group-hover:rotate-45 transition-transform duration-300" />
                <span>JELAJAHI KOLEKSI</span>
              </span>
              <span className="text-[#C5A059] text-xs font-bold group-hover:translate-x-1 transition-transform duration-300">
                &rarr;
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
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
