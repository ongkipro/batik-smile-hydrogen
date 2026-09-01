import React, { Suspense } from 'react';
import { Await, useLoaderData, NavLink } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { HeroEditorial } from '~/components/HeroEditorial';
import { TierExperience } from '~/components/TierExperience';
import { ShoppableLookbook } from '~/components/ShoppableLookbook';
import { CraftsmanshipZoom } from '~/components/CraftsmanshipZoom';
import { ShowroomO2O } from '~/components/ShowroomO2O';
import { BatikDivider, BatikCorner } from '~/components/BatikOrnaments';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Batik Smile Nusantara — Mahakarya Busana & Sarimbit Keluarga' },
    {
      name: 'description',
      content:
        'Butik batik modern premium sejak 2007 di Semarang & Solo. Temukan Sarimbit 3 Kasta (Mahakarya Sutra, Signature Dobby, Essential Katun) dan layanan jahit seragam keluarga.',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context }) {
  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
  };
}

/**
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error('Error fetching recommended products:', error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  return (
    <div className="w-full bg-[#FAF8F5] text-neutral-900">
      {/* 1. Master Split Editorial Hero */}
      <HeroEditorial />

      {/* 2. Interactive 3-Tier Experience Switcher */}
      <TierExperience />

      {/* 3. Shoppable Lookbook with Interactive Hotspots */}
      <ShoppableLookbook />

      {/* 4. Craftsmanship Macro Zoom (3 Proof Cards) */}
      <CraftsmanshipZoom />

      {/* 5. Lorong Corak: Live Curated Products Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#9E4719] font-bold">
                Karya Pilihan Terkini
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-neutral-900">
                Lorong Corak Nusantara
              </h2>
            </div>
            <NavLink
              to="/collections/sarimbit-batik-couple"
              className="text-xs font-semibold uppercase tracking-wider text-[#9E4719] hover:underline flex items-center gap-1.5"
            >
              <span>Lihat Seluruh Katalog Butik</span>
              <span>&rarr;</span>
            </NavLink>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-neutral-100 animate-pulse rounded-xl" />
                ))}
              </div>
            }
          >
            <Await resolve={data.recommendedProducts}>
              {(response) => {
                const products = response?.products?.nodes || [];
                if (!products.length) {
                  return (
                    <div className="text-center py-12 text-neutral-500 text-xs">
                      Sedang memuat koleksi busana dari butik...
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </section>

      {/* 6. Showroom 3 Lantai Semarang & Solo O2O */}
      <ShowroomO2O />
    </div>
  );
}

/**
 * Product Card with 4:5 Aspect Ratio, Hover Zoom & Anti-Slop Styling
 */
function ProductCard({ product }) {
  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;

  return (
    <div className="group flex flex-col justify-between">
      <NavLink
        to={`/products/${product.handle}`}
        className="block relative overflow-hidden rounded-xl bg-neutral-100 mb-3 border border-neutral-200/80 group-hover:border-[#9E4719]/40 transition-all shadow-sm"
      >
        <BatikCorner position="top-left" variant="gold" size={24} className="top-2 left-2 z-10 opacity-0 group-hover:opacity-70 transition-opacity" />

        {image ? (
          <Image
            data={image}
            aspectRatio="4/5"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt={image.altText || product.title}
          />
        ) : (
          <div className="aspect-[4/5] w-full flex items-center justify-center text-neutral-400 text-xs">
            Batik Smile
          </div>
        )}

        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-black/75 text-white backdrop-blur-sm">
            Ready Stock
          </span>
        </div>
      </NavLink>

      <div>
        <NavLink
          to={`/products/${product.handle}`}
          className="font-medium text-xs sm:text-sm text-neutral-900 group-hover:text-[#9E4719] transition-colors line-clamp-2 mb-1"
        >
          {product.title}
        </NavLink>
        {price && (
          <div className="text-xs font-bold text-[#9E4719] font-sans">
            <Money data={price} />
          </div>
        )}
      </div>
    </div>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
