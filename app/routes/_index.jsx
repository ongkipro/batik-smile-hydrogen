import React from 'react';
import { useLoaderData } from 'react-router';
import { HeroSlider } from '~/components/HeroSlider';
import { SarimbitBentoSection } from '~/components/SarimbitBentoSection';
import { PersonalWardrobeSection } from '~/components/PersonalWardrobeSection';
import { EditorialJournalSection } from '~/components/EditorialJournalSection';
import { BestSellersTabs } from '~/components/BestSellersTabs';
import { HeritageVideoBanner } from '~/components/HeritageVideoBanner';
import { ChooseYourBatikGrid } from '~/components/ChooseYourBatikGrid';
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

  // 8 Newest Products excluding Sarimbit collection/tags/titles
  const rawNewest = data?.newestProducts?.nodes || [];
  const nonSarimbitProducts = rawNewest.filter((product) => {
    const title = (product.title || '').toLowerCase();
    const handle = (product.handle || '').toLowerCase();
    const tags = (product.tags || []).map((t) => t.toLowerCase());
    const collections = (product.collections?.nodes || []).map((c) =>
      c.handle.toLowerCase(),
    );

    const isSarimbit =
      title.includes('sarimbit') ||
      handle.includes('sarimbit') ||
      tags.some((t) => t.includes('sarimbit')) ||
      collections.some((c) => c.includes('sarimbit'));

    return !isSarimbit;
  });

  const newestProducts =
    nonSarimbitProducts.length > 0
      ? nonSarimbitProducts.slice(0, 8)
      : fallbackProducts.slice(0, 8);

  // Extract metaobjects
  const heroData = data?.heroBanners?.nodes?.[0] || null;
  const videoData = data?.heritageVideos?.nodes?.[0] || null;
  const testimonials = data?.customerTestimonials?.nodes || [];
  const featuredCollections = data?.featuredCollections?.nodes || [];

  // Extract editorial articles
  const primaryBlog = data?.blogs?.nodes?.[0] || null;
  const editorialArticles = primaryBlog?.articles?.nodes || [];
  const editorialBlogHandle = primaryBlog?.handle || 'news';

  return {
    heroData,
    videoData,
    testimonials,
    featuredCollections,
    womenProducts,
    menProducts,
    sarimbitProducts,
    newestProducts,
    editorialArticles,
    editorialBlogHandle,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {
    _heroData,
    videoData,
    testimonials,
    featuredCollections,
    womenProducts,
    menProducts,
    sarimbitProducts,
    newestProducts,
    editorialArticles,
    editorialBlogHandle,
  } = useLoaderData();

  return (
    <div className="w-full bg-[#FAF8F5] text-[#111111]">
      {/* 1. Master Full-Bleed 5-Slide Quiet Luxury Hero Carousel */}
      <HeroSlider />

      {/* 2. Signature Sarimbit Asymmetric Bento Grid (Exclusive, Premium, Ekonomis) */}
      <SarimbitBentoSection collections={featuredCollections} />

      {/* 3. Best Sellers Tabbed Switcher (Women | Men | Sarimbit) */}
      <BestSellersTabs
        womenProducts={womenProducts}
        menProducts={menProducts}
        sarimbitProducts={sarimbitProducts}
      />

      {/* 4. Heritage Craftsmanship Video Banner */}
      <HeritageVideoBanner videoData={videoData} />

      {/* 5. Busana Personal & Lintas Generasi (Pria, Wanita, Anak) */}
      <PersonalWardrobeSection collections={featuredCollections} />

      {/* 6. Choose Your Batik / Koleksi Terbaru: 8 Produk Pilihan Non-Sarimbit */}
      <ChooseYourBatikGrid products={newestProducts} />

      {/* 7. Customer Love Notes Testimonial Carousel */}
      <CustomerLoveNotes testimonials={testimonials} />

      {/* 8. Warta & Jurnal Kebudayaan (Latest Editorial Articles) */}
      <EditorialJournalSection
        articles={editorialArticles}
        blogHandle={editorialBlogHandle}
      />

      {/* 9. 4 Core Trust Pillars */}
      <TrustGuaranteeBar />

      {/* 10. Showroom O2O (Simongan 109 & Banyumanik 23) */}
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
