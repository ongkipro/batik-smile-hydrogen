import React from 'react';
import { useLoaderData } from 'react-router';
import { HeroSlider } from '~/components/HeroSlider';
import { SarimbitBentoSection } from '~/components/SarimbitBentoSection';
import { EditorialJournalSection } from '~/components/EditorialJournalSection';
import { BestSellersTabs } from '~/components/BestSellersTabs';
import { HeritageVideoBanner } from '~/components/HeritageVideoBanner';
import { ChooseYourBatikGrid } from '~/components/ChooseYourBatikGrid';
import { TrustGuaranteeBar } from '~/components/TrustGuaranteeBar';
import { ShowroomO2O } from '~/components/ShowroomO2O';

import { generateHomeMeta } from '~/lib/seo';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return generateHomeMeta(data?.shop);
};

/**
 * Preload high-priority LCP hero asset for sub-second visual paint
 */
export const links = () => {
  return [
    {
      rel: 'preload',
      href: '/banners/hero_slider_1_mobile.avif',
      as: 'image',
      type: 'image/avif',
      media: '(max-width: 640px)',
      fetchPriority: 'high',
    },
    {
      rel: 'preload',
      href: '/banners/hero_slider_1.avif',
      as: 'image',
      type: 'image/avif',
      media: '(min-width: 641px)',
      fetchPriority: 'high',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({ context }) {
  const { storefront } = context;

  // Single batch GraphQL query with Oxygen CacheShort for auto-sync with Shopify updates
  const data = await storefront.query(HOMEPAGE_QUERY, {
    cache: storefront.CacheShort(),
  }).catch((err) => {
    console.error('Error fetching homepage data:', err);
    return null;
  });

  const fallbackProducts = data?.fallbackProducts?.nodes || [];
  const allNewest = data?.newestProducts?.nodes || [];

  const womenFromTags = allNewest.filter((p) =>
    (p.tags || []).map((t) => t.toLowerCase()).includes('wanita'),
  );
  const menFromTags = allNewest.filter((p) =>
    (p.tags || []).map((t) => t.toLowerCase()).includes('pria'),
  );

  const womenProducts =
    womenFromTags.length > 0
      ? womenFromTags.slice(0, 6)
      : fallbackProducts.slice(0, 6);

  const menProducts =
    menFromTags.length > 0
      ? menFromTags.slice(0, 6)
      : fallbackProducts.slice(0, 6);

  const sarimbitProducts =
    data?.luxuryCollection?.products?.nodes?.length > 0
      ? data.luxuryCollection.products.nodes
      : data?.premiumCollection?.products?.nodes?.length > 0
      ? data.premiumCollection.products.nodes
      : fallbackProducts.slice(0, 6);

  const anakFromCollectionOrTags =
    data?.batikAnakCollection?.products?.nodes?.length > 0
      ? data.batikAnakCollection.products.nodes
      : allNewest.filter((p) => {
          const tags = (p.tags || []).map((t) => t.toLowerCase());
          const title = (p.title || '').toLowerCase();
          return (
            tags.some((t) => t.includes('anak') || t.includes('putra') || t.includes('putri')) ||
            title.includes('anak')
          );
        });

  const anakProducts =
    anakFromCollectionOrTags.length > 0
      ? anakFromCollectionOrTags.slice(0, 6)
      : fallbackProducts.slice(0, 6);

  // 8 Recent Newest Products feed (sorted by CREATED_AT reverse from Shopify)
  let newestProducts = allNewest.slice(0, 8);
  if (newestProducts.length < 8 && fallbackProducts.length > 0) {
    const existingIds = new Set(newestProducts.map((p) => p.id));
    for (const item of fallbackProducts) {
      if (!existingIds.has(item.id)) {
        newestProducts.push(item);
        if (newestProducts.length >= 8) break;
      }
    }
  }

  // Extract metaobjects
  const heroData = data?.heroBanners?.nodes?.[0] || null;
  const videoData = data?.heritageVideos?.nodes?.[0] || null;
  const featuredCollections = data?.featuredCollections?.nodes || [];

  // Extract editorial articles
  const primaryBlog = data?.blogs?.nodes?.[0] || null;
  const editorialArticles = primaryBlog?.articles?.nodes || [];
  const editorialBlogHandle = primaryBlog?.handle || 'news';

  return {
    heroData,
    videoData,
    featuredCollections,
    womenProducts,
    menProducts,
    anakProducts,
    sarimbitProducts,
    newestProducts,
    editorialArticles,
    editorialBlogHandle,
    shop: data?.shop,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {
    _heroData,
    videoData,
    featuredCollections,
    womenProducts,
    menProducts,
    anakProducts,
    sarimbitProducts,
    newestProducts,
    editorialArticles,
    editorialBlogHandle,
  } = useLoaderData();

  return (
    <div className="w-full bg-[#FAF8F5] text-[#111111]">
      {/* 1. Master Full-Bleed 5-Slide Quiet Luxury Hero Carousel */}
      <HeroSlider />

      {/* 2. Signature Sarimbit 3-Pillar Scattered Atelier Moodboard */}
      <SarimbitBentoSection collections={featuredCollections} />

      {/* 3. Best Sellers Tabbed Switcher (Wanita | Pria | Anak) */}
      <BestSellersTabs
        womenProducts={womenProducts}
        menProducts={menProducts}
        anakProducts={anakProducts}
        sarimbitProducts={sarimbitProducts}
      />

      {/* 4. Heritage Craftsmanship Video Banner */}
      <HeritageVideoBanner videoData={videoData} />

      {/* 5. Choose Your Batik / Koleksi Terbaru: 8 Produk Pilihan Non-Sarimbit */}
      <ChooseYourBatikGrid products={newestProducts} />

      {/* 6. Warta & Jurnal Kebudayaan (Latest Editorial Articles) */}
      <EditorialJournalSection
        articles={editorialArticles}
        blogHandle={editorialBlogHandle}
      />

      {/* 8. 4 Core Trust Pillars */}
      <TrustGuaranteeBar />

      {/* 9. Showroom O2O (Simongan 109 & Banyumanik 23) */}
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
    shop {
      name
      description
    }
    luxuryCollection: collection(handle: "luxury-series") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    premiumCollection: collection(handle: "premium-series") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    ekonomiCollection: collection(handle: "ekonomi-series") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    rawFabricCollection: collection(handle: "kain") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    batikAnakCollection: collection(handle: "batik-anak") {
      id
      title
      products(first: 6) {
        nodes {
          ...ProductCardItem
        }
      }
    }
    featuredCollections: collections(first: 20, sortKey: UPDATED_AT) {
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
    newestProducts: products(first: 30, sortKey: CREATED_AT, reverse: true) {
      nodes {
        ...ProductCardItem
        tags
        collections(first: 5) {
          nodes {
            handle
            title
          }
        }
      }
    }
    fallbackProducts: products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductCardItem
      }
    }
    blogs(first: 1) {
      nodes {
        handle
        title
        articles(first: 3, sortKey: PUBLISHED_AT, reverse: true) {
          nodes {
            id
            title
            handle
            publishedAt
            excerpt
            image {
              id
              url
              altText
              width
              height
            }
            author: authorV2 {
              name
            }
          }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
