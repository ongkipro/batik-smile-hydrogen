import React from 'react';
import { useLoaderData } from 'react-router';
import { HeroEditorial } from '~/components/HeroEditorial';
import { FeaturedCollections } from '~/components/FeaturedCollections';
import { BestSellersTabs } from '~/components/BestSellersTabs';
import { HeritageVideoBanner } from '~/components/HeritageVideoBanner';
import { ChooseYourBatikGrid } from '~/components/ChooseYourBatikGrid';
import { ShoppableLookbook } from '~/components/ShoppableLookbook';
import { CustomerLoveNotes } from '~/components/CustomerLoveNotes';
import { TrustGuaranteeBar } from '~/components/TrustGuaranteeBar';
import { ShowroomO2O } from '~/components/ShowroomO2O';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Batik Smile Nusantara — Butik Batik Modern & Sarimbit Keluarga' },
    {
      name: 'description',
      content:
        'Butik batik modern premium sejak 2007 di Semarang. Koleksi sarimbit keluarga 3 kasta, kain batik tulis asli Pekalongan & Solo, serta layanan jahit bespoke tanpa minimal order.',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({ context }) {
  const { storefront } = context;

  // Single batch GraphQL query with Oxygen CacheLong for sub-100ms TTFB
  const data = await storefront.query(HOMEPAGE_QUERY, {
    cache: storefront.CacheLong(),
  }).catch((err) => {
    console.error('Error fetching homepage data:', err);
    return null;
  });

  const fallbackProducts = data?.fallbackProducts?.nodes || [];

  const womenProducts =
    data?.womenCollection?.products?.nodes?.length > 0
      ? data.womenCollection.products.nodes
      : fallbackProducts;

  const menProducts =
    data?.menCollection?.products?.nodes?.length > 0
      ? data.menCollection.products.nodes
      : fallbackProducts;

  const sarimbitProducts =
    data?.sarimbitCollection?.products?.nodes?.length > 0
      ? data.sarimbitCollection.products.nodes
      : fallbackProducts;

  const rawFabricProducts =
    data?.rawFabricCollection?.products?.nodes?.length > 0
      ? data.rawFabricCollection.products.nodes
      : fallbackProducts;

  // Extract metaobjects
  const heroData = data?.heroBanners?.nodes?.[0] || null;
  const videoData = data?.heritageVideos?.nodes?.[0] || null;
  const lookbookData = data?.lookbookSpotlights?.nodes?.[0] || null;
  const testimonials = data?.customerTestimonials?.nodes || [];
  const featuredCollections = data?.featuredCollections?.nodes || [];

  return {
    heroData,
    videoData,
    lookbookData,
    testimonials,
    featuredCollections,
    womenProducts,
    menProducts,
    sarimbitProducts,
    rawFabricProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {
    heroData,
    videoData,
    lookbookData,
    testimonials,
    featuredCollections,
    womenProducts,
    menProducts,
    sarimbitProducts,
    rawFabricProducts,
  } = useLoaderData();

  return (
    <div className="w-full bg-[#FAF8F5] text-[#111111]">
      {/* 1. Master Full-Bleed Editorial Hero */}
      <HeroEditorial data={heroData} scrollAnchorId="#best-sellers" />

      {/* 2. Curated Featured Collections (Real Shopify Images) */}
      <FeaturedCollections collections={featuredCollections} />

      {/* 3. Best Sellers Tabbed Switcher (Women | Men | Sarimbit) */}
      <BestSellersTabs
        womenProducts={womenProducts}
        menProducts={menProducts}
        sarimbitProducts={sarimbitProducts}
      />

      {/* 3. Heritage Craftsmanship Video Banner */}
      <HeritageVideoBanner videoData={videoData} />

      {/* 4. Choose Your Batik: 4-Column Raw Fabric Gallery */}
      <ChooseYourBatikGrid products={rawFabricProducts} />

      {/* 5. Shoppable Lookbook Spotlight with Interactive Hotspots */}
      <ShoppableLookbook lookbook={lookbookData} />

      {/* 6. Customer Love Notes Testimonial Carousel */}
      <CustomerLoveNotes testimonials={testimonials} />

      {/* 7. 4 Core Trust Pillars */}
      <TrustGuaranteeBar />

      {/* 8. Showroom O2O (Simongan 109 & Banyumanik 23) */}
      <ShowroomO2O />
    </div>
  );
}

const HOMEPAGE_QUERY = `#graphql
  fragment ProductCardItem on Product {
    id
    title
    handle
    productType
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
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
    images(first: 2) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }

  query HomepageData($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    womenCollection: collection(handle: "batik-wanita") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    menCollection: collection(handle: "batik-pria") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    sarimbitCollection: collection(handle: "sarimbit-ekonomis") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    rawFabricCollection: collection(handle: "jarik-kain-batik") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    featuredCollections: collections(first: 10, sortKey: UPDATED_AT) {
      nodes {
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
    }
    fallbackProducts: products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductCardItem
      }
    }
    heroBanners: metaobjects(type: "hero_banner", first: 1) {
      nodes {
        id
        handle
        fields {
          key
          value
        }
      }
    }
    heritageVideos: metaobjects(type: "heritage_video", first: 1) {
      nodes {
        id
        handle
        fields {
          key
          value
        }
      }
    }
    customerTestimonials: metaobjects(type: "customer_testimonial", first: 5) {
      nodes {
        id
        handle
        fields {
          key
          value
        }
      }
    }
    lookbookSpotlights: metaobjects(type: "lookbook_spotlight", first: 1) {
      nodes {
        id
        handle
        fields {
          key
          value
        }
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
