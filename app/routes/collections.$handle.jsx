import React from 'react';
import { redirect, useLoaderData } from 'react-router';
import { getPaginationVariables, Analytics } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [
    { title: `${data?.collection?.title ?? 'Katalog'} — Batik Smile Nusantara` },
    {
      name: 'description',
      content:
        data?.collection?.description ||
        'Koleksi busana batik premium dan sarimbit keluarga dari Butik Batik Smile Nusantara Semarang.',
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
async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 24,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  // Handle redirect untuk koleksi yang tidak ada atau berganti slug resmi
  const collectionRedirects = {
    'sarimbit': '/collections/sarimbit-exclusive',
    'kain-batik-tulis': '/collections/jarik-kain-batik',
    'sarimbit-mahakarya-heritage': '/collections/sarimbit-exclusive',
    'sarimbit-signature-elegance': '/collections/sarimbit-premium',
    'sarimbit-essential-daily': '/collections/sarimbit-ekonomis',
    'sarimbit-batik-couple': '/collections/sarimbit-exclusive',
  };

  if (collectionRedirects[handle]) {
    throw redirect(collectionRedirects[handle], 301);
  }

  const [{ collection }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: { handle, ...paginationVariables },
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  redirectIfHandleIsLocalized(request, { handle, data: collection });

  return {
    collection,
  };
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const { collection } = useLoaderData();
  const handle = collection?.handle || '';

  // Tier-Differentiated Theme Classification
  const isExclusive =
    handle.includes('exclusive') || handle.includes('mahakarya') || handle.includes('sutra');
  const isPremium =
    handle.includes('premium') || handle.includes('signature') || handle.includes('dobby');

  const themeClasses = isExclusive
    ? 'bg-[#111111] text-white'
    : isPremium
    ? 'bg-[#FAF8F5] text-[#111111]'
    : 'bg-[#FFFFFF] text-[#111111]';

  const gridColumns = isExclusive
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10'
    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8';

  const badgeText = isExclusive
    ? 'Haute Mahakarya'
    : isPremium
    ? 'Signature Dobby'
    : undefined;

  const officialWaUrl =
    'https://wa.me/6281390888809?text=' +
    encodeURIComponent(`Halo Batik Smile, saya ingin menanyakan koleksi ${collection.title}`);

  // Banner image resolution: Shopify collection image or local generated fallback
  const bannerImageUrl =
    collection.image?.url ||
    (handle.includes('kain')
      ? '/banners/collection_kain_tulis_banner.jpg'
      : handle.includes('sarimbit')
      ? '/banners/sarimbit_family_banner.jpg'
      : null);

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${themeClasses}`}>
      <div className="w-full max-w-[100vw] mx-auto">
        {/* Collection Editorial Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={`text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold block mb-2 ${
              isExclusive ? 'text-[#C5A059]' : isPremium ? 'text-[#9E7D3B]' : 'text-[#7C3F1D]'
            }`}
          >
            {isExclusive
              ? 'KASTA TERTINGGI &bull; MAHAKARYA HERITAGE'
              : isPremium
              ? 'KOLEKSI BUTIK &bull; SIGNATURE ELEGANCE'
              : 'KATALOG BUSANA BATIK NUSANTARA'}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide mt-2 mb-4 leading-tight">
            {collection.title}
          </h1>

          <div
            className={`w-12 h-px mx-auto mt-4 mb-4 ${
              isExclusive ? 'bg-[#C5A059]' : 'bg-[#111111]'
            }`}
          />

          {collection.description && (
            <p
              className={`text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto mb-8 ${
                isExclusive ? 'text-[#E2DFD8]' : 'text-[#5A5550]'
              }`}
            >
              {collection.description}
            </p>
          )}

          {/* Collection Header Banner with Graceful Fallback */}
          {bannerImageUrl && (
            <div className="w-full aspect-[21/9] sm:aspect-[24/9] bg-[#111111] border border-[#E2DFD8] overflow-hidden shadow-sm">
              <img
                src={bannerImageUrl}
                alt={collection.image?.altText || collection.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}
        </div>

        {/* Exclusive VIP Concierge Banner (Only on Exclusive PLP) */}
        {isExclusive && (
          <div className="mb-14 p-6 sm:p-8 bg-[#1C1C1C] border border-[#C5A059]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A059] font-bold block mb-1">
                PRIVATE VIP CONCIERGE
              </span>
              <h3 className="font-serif text-xl text-white font-normal">
                Layanan Khusus Mahakarya Sutra Tulis
              </h3>
              <p className="text-xs text-[#A69F96] font-light mt-1">
                Tiap lembar karya hanya diproduksi 1 helai. Dapatkan video detail kain atau jadwalkan fitting privat di VIP lounge Semarang.
              </p>
            </div>
            <a
              href={officialWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#C5A059] hover:bg-white text-[#111111] font-semibold text-[10px] uppercase tracking-[0.18em] transition-colors whitespace-nowrap"
            >
              BOOKING VIP CONCIERGE &rarr;
            </a>
          </div>
        )}

        {/* Tier-Differentiated Products Grid (4:5 Aspect Ratio) */}
        <PaginatedResourceSection
          connection={collection.products}
          resourcesClassName={`grid ${gridColumns}`}
        >
          {({ node: product, index }) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 4 ? 'eager' : 'lazy'}
              badge={badgeText}
            />
          )}
        </PaginatedResourceSection>

        {/* Bottom Consultation Assistance */}
        <div
          className={`mt-20 text-center pt-10 border-t ${
            isExclusive ? 'border-white/10' : 'border-[#E2DFD8]'
          }`}
        >
          <p
            className={`text-xs mb-4 font-light tracking-wide ${
              isExclusive ? 'text-[#A69F96]' : 'text-[#5A5550]'
            }`}
          >
            Butuh bantuan ukuran sarimbit keluarga atau pemesanan seragam dinas tanpa minimal order?
          </p>
          <a
            href={officialWaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors shadow-sm"
          >
            KONSULTASI DENGAN KONSULTAN BUTIK &rarr;
          </a>
        </div>
      </div>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
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
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
    }
  }
`;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        altText
        url
        width
        height
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

/** @typedef {import('./+types/collections.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
