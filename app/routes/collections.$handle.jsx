import React from 'react';
import { redirect, useLoaderData, NavLink } from 'react-router';
import { getPaginationVariables, Analytics, Image, Money } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { BatikDivider, BatikCorner } from '~/components/BatikOrnaments';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [
    { title: `${data?.collection.title ?? 'Koleksi'} — Batik Smile Nusantara` },
    {
      name: 'description',
      content:
        data?.collection.description ||
        'Koleksi busana batik premium dan sarimbit keluarga dari Batik Smile.',
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
    pageBy: 16,
  });

  if (!handle) {
    throw redirect('/collections');
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
  const handle = collection.handle || '';

  // 3-Tier Dynamic Theme Detection
  const isMahakarya = handle.includes('mahakarya') || handle.includes('sutra');
  const isSignature = handle.includes('signature') || handle.includes('dobby');

  const themeClasses = isMahakarya
    ? 'bg-[#0D0D0D] text-white'
    : isSignature
    ? 'bg-[#1B2A4A] text-white'
    : 'bg-[#FDFBF7] text-neutral-900';

  const accentColor = isMahakarya ? '#C5A059' : isSignature ? '#38BDF8' : '#9E4719';

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${themeClasses}`}>
      <div className="max-w-7xl mx-auto">
        {/* Collection Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span
            className="text-[11px] uppercase tracking-[0.25em] font-bold"
            style={{ color: accentColor }}
          >
            {isMahakarya
              ? 'Kasta Tertinggi • Mahakarya Heritage'
              : isSignature
              ? 'Koleksi Desainer • Signature Elegance'
              : 'Katalog Busana Batik'}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 mb-4 leading-tight">
            {collection.title}
          </h1>

          <BatikDivider
            variant={isMahakarya ? 'gold' : isSignature ? 'light' : 'soga'}
            className="my-3"
          />

          {collection.description && (
            <p
              className={`text-xs sm:text-sm font-sans leading-relaxed max-w-2xl mx-auto ${
                isMahakarya || isSignature ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              {collection.description}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <PaginatedResourceSection
          connection={collection.products}
          resourcesClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {({ node: product, index }) => (
            <CollectionProductCard
              key={product.id}
              product={product}
              isDark={isMahakarya || isSignature}
              accentColor={accentColor}
            />
          )}
        </PaginatedResourceSection>

        {/* Bottom Helper */}
        <div className="mt-16 text-center pt-8 border-t border-white/10">
          <p className="text-xs text-neutral-400 mb-3">
            Butuh seragam keluarga atau pesanan jumlah khusus?
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Batik%20Smile%2C%20saya%20tertarik%20dengan%20koleksi%20ini"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          >
            Konsultasi dengan Penjahit &amp; Desainer &rarr;
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

function CollectionProductCard({ product, isDark, accentColor }) {
  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;

  return (
    <div className="group flex flex-col justify-between">
      <NavLink
        to={`/products/${product.handle}`}
        className={`block relative overflow-hidden rounded-xl mb-3 border transition-all ${
          isDark
            ? 'bg-neutral-900 border-white/10 group-hover:border-amber-400/40 shadow-xl'
            : 'bg-white border-neutral-200/80 group-hover:border-[#9E4719]/40 shadow-sm'
        }`}
      >
        {isDark && (
          <BatikCorner position="top-left" variant="gold" size={28} className="top-2 left-2 z-10 opacity-70" />
        )}

        {image ? (
          <Image
            data={image}
            aspectRatio="4/5"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt={image.altText || product.title}
          />
        ) : (
          <div className="aspect-[4/5] w-full flex items-center justify-center bg-neutral-800 text-neutral-400 text-xs">
            Batik Smile
          </div>
        )}

        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-black/75 text-white backdrop-blur-sm">
            Ready Stock
          </span>
        </div>
      </NavLink>

      <div>
        <NavLink
          to={`/products/${product.handle}`}
          className={`font-medium text-xs sm:text-sm line-clamp-2 mb-1 transition-colors ${
            isDark
              ? 'text-neutral-100 group-hover:text-[#C5A059]'
              : 'text-neutral-900 group-hover:text-[#9E4719]'
          }`}
        >
          {product.title}
        </NavLink>
        {price && (
          <div className="text-xs font-bold" style={{ color: accentColor }}>
            <Money data={price} />
          </div>
        )}
      </div>
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
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
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
