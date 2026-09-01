import React, { Suspense } from 'react';
import { Await, useLoaderData, NavLink } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { HeroSlider } from '~/components/HeroSlider';
import { SarimbitSpotlight } from '~/components/SarimbitSpotlight';
import { ShowroomO2O } from '~/components/ShowroomO2O';
import { BatikDivider } from '~/components/BatikOrnaments';

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
    <div className="w-full bg-white text-neutral-900">
      {/* 1. Hero Carousel Slider */}
      <HeroSlider />

      {/* 2. Brand Prologue */}
      <section className="py-16 px-6 sm:px-8 max-w-4xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#9E4719] font-bold">
          Prolog Tradisi
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2 mb-3 text-neutral-900 leading-snug">
          Menjaga Warisan Luhur, Menenun Keharmonisan Keluarga
        </h2>
        <BatikDivider variant="soga" className="my-3" />
        <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
          Sejak 2007, Batik Smile mendedikasikan karya pada ketelitian canting, tenun ATBM, dan
          potongan pola presisi berlapis furing hero halus. Setiap helai kain membawa doa kebaikan,
          kewibawaan, dan kehangatan bagi yang mengenakannya.
        </p>
      </section>

      {/* 3. 3-Tier Sarimbit Bento Grid Spotlight */}
      <SarimbitSpotlight />

      {/* 4. Lorong Corak: Curated Products Grid */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#9E4719] font-bold">
                Karya Pilihan Terkini
              </span>
              <h2 className="font-serif text-3xl font-bold mt-1 text-neutral-900">
                Lorong Corak Nusantara
              </h2>
            </div>
            <NavLink
              to="/collections/sarimbit-batik-couple"
              className="text-xs font-semibold uppercase tracking-wider text-[#9E4719] hover:underline"
            >
              Lihat Seluruh Katalog &rarr;
            </NavLink>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-neutral-100 animate-pulse rounded-lg" />
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
                      Sedang memuat koleksi terbaru dari butik...
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

      {/* 5. Showroom 3 Lantai & Layanan Kustom */}
      <ShowroomO2O />
    </div>
  );
}

/**
 * Product Card with 4:5 Aspect Ratio & Luxury Styling
 */
function ProductCard({ product }) {
  const image = product.featuredImage;
  const price = product.priceRange?.minVariantPrice;

  return (
    <div className="group flex flex-col justify-between">
      <NavLink to={`/products/${product.handle}`} className="block relative overflow-hidden rounded-lg bg-neutral-100 mb-3">
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
          <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-black/70 text-white backdrop-blur-sm">
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
          <div className="text-xs font-bold text-[#9E4719]">
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
