import React, { useMemo } from 'react';
import { redirect, useLoaderData, useSearchParams, Link } from 'react-router';
import { getPaginationVariables, Analytics } from '@shopify/hydrogen';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { ProductItem } from '~/components/ProductItem';
import { Breadcrumb } from '~/components/Breadcrumb';
import {
  CollectionSidebar,
  CollectionFilterHeader,
} from '~/components/CollectionFilterBar';
import { generateCollectionMeta } from '~/lib/seo';
import { JsonLd } from '~/components/JsonLd';
import { generateCollectionSchema, generateBreadcrumbSchema } from '~/lib/schema';
import { NotFoundView } from '~/components/NotFoundView';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return generateCollectionMeta(data?.collection);
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  redirectIfHandleIsLocalized(args);
  const criticalData = await loadCriticalData(args);
  return { ...criticalData };
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;

  // Quiet Luxury grid calibration:
  // 3 columns x 3 rows = 9 items for Exclusive/Luxury/Mahakarya, 4 columns x 3 rows = 12 items for general
  const isExclusiveCollection =
    handle && (handle.includes('luxury') || handle.includes('exclusive') || handle.includes('mahakarya') || handle.includes('sutra'));
  const pageSize = isExclusiveCollection ? 9 : 12;

  const paginationVariables = getPaginationVariables(request, {
    pageBy: pageSize,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  // Handle redirect untuk koleksi yang tidak ada atau berganti slug resmi
  const collectionRedirects = {
    'sarimbit': '/collections/luxury-series',
    'sarimbit-exclusive': '/collections/luxury-series',
    'sarimbit-luxury': '/collections/luxury-series',
    'sarimbit-premium': '/collections/premium-series',
    'sarimbit-ekonomi': '/collections/ekonomi-series',
    'sarimbit-ekonomis': '/collections/ekonomi-series',
    'jarik-kain-batik': '/collections/kain',
    'kain-batik-tulis': '/collections/kain',
    'sarimbit-mahakarya-heritage': '/collections/luxury-series',
    'sarimbit-signature-elegance': '/collections/premium-series',
    'sarimbit-essential-daily': '/collections/ekonomi-series',
    'sarimbit-batik-couple': '/collections/luxury-series',
    'batik-wanita': '/collections/luxury-series?gender=wanita',
    'batik-pria': '/collections/luxury-series?gender=pria',
    'blus-batik-wanita': '/collections/premium-series?gender=wanita',
    'outer-tunik-batik': '/collections/luxury-series?gender=wanita',
    'tunik-batik-wanita': '/collections/ekonomi-series?gender=wanita',
    'dress-batik-wanita': '/collections/premium-series?gender=wanita',
    'gamis-batik-wanita': '/collections/premium-series?gender=wanita',
    'outer-batik-wanita': '/collections/luxury-series?gender=wanita',
    'blazer-batik-wanita': '/collections/luxury-series?gender=wanita',
    'kebaya-batik-modern': '/collections/luxury-series?gender=wanita',
    'daster-batik-solo': '/collections/ekonomi-series?gender=wanita',
    'kemeja-batik-lengan-panjang': '/collections/premium-series?gender=pria&sleeve=lengan-panjang',
    'hem-batik-lengan-pendek': '/collections/premium-series?gender=pria&sleeve=lengan-pendek',
    'celana-batik-pria': '/collections/ekonomi-series?gender=pria',
    'blus-batik-anak-cewek': '/collections/batik-anak?gender=putri',
    'gamis-batik-anak': '/collections/batik-anak?gender=putri',
    'dress-batik-anak': '/collections/batik-anak?gender=putri',
    'kebaya-batik-anak': '/collections/batik-anak?gender=putri',
    'jarik-anak': '/collections/batik-anak',
    'babydoll-batik-anak': '/collections/batik-anak?gender=putri',
    'hem-batik-anak-cowo': '/collections/batik-anak?gender=putra',
    'surjan-batik-anak': '/collections/batik-anak?gender=putra',
    'blangkon-tradisional': '/collections/aksesoris',
    'sarung-batik-anak': '/collections/batik-anak',
  };

  if (collectionRedirects[handle]) {
    throw redirect(collectionRedirects[handle], 301);
  }

  // Parse Sort parameters from URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const sortParam = searchParams.get('sort');

  let sortKey = 'COLLECTION_DEFAULT';
  let reverse = false;

  switch (sortParam) {
    case 'price-asc':
      sortKey = 'PRICE';
      reverse = false;
      break;
    case 'price-desc':
      sortKey = 'PRICE';
      reverse = true;
      break;
    case 'latest':
      sortKey = 'CREATED';
      reverse = true;
      break;
    case 'title-asc':
      sortKey = 'TITLE';
      reverse = false;
      break;
    case 'title-desc':
      sortKey = 'TITLE';
      reverse = true;
      break;
    default:
      sortKey = 'COLLECTION_DEFAULT';
      reverse = false;
      break;
  }

  // Parse Filter parameters from URL
  const filters = [];
  if (searchParams.get('available') === 'true') {
    filters.push({ available: true });
  }

  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice || maxPrice) {
    const priceFilter = {};
    if (minPrice && !isNaN(Number(minPrice))) {
      priceFilter.min = Number(minPrice);
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      priceFilter.max = Number(maxPrice);
    }
    if (Object.keys(priceFilter).length > 0) {
      filters.push({ price: priceFilter });
    }
  }

  const [{ collection }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {
        handle,
        ...paginationVariables,
        sortKey,
        reverse,
        filters: filters.length > 0 ? filters : undefined,
      },
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
  const [searchParams] = useSearchParams();
  const handle = collection?.handle || '';

  const genderParam = searchParams.get('gender')?.toLowerCase();
  const categoryParam = (searchParams.get('category') || searchParams.get('occasion') || searchParams.get('sleeve'))?.toLowerCase();

  // Tier-Differentiated Theme Classification
  const isExclusive =
    handle.includes('luxury') || handle.includes('exclusive') || handle.includes('mahakarya') || handle.includes('sutra');
  const isPremium =
    handle.includes('premium') || handle.includes('signature') || handle.includes('dobby');
  const isEkonomi =
    handle.includes('ekonomi') || handle.includes('essential');

  const collectionTier = isExclusive
    ? 'luxury'
    : isPremium
    ? 'premium'
    : isEkonomi
    ? 'ekonomi'
    : null;

  // Filter products by tag and title if gender/category params are active
  const filteredConnection = useMemo(() => {
    if (!genderParam && !categoryParam) return collection.products;
    const nodes = (collection.products?.nodes || []).filter((p) => {
      const pTags = (p.tags || []).map((t) => t.toLowerCase().replace(/[\s_]+/g, '-'));
      const pTitle = (p.title || '').toLowerCase();

      // Gender check
      if (genderParam) {
        const targetGender = genderParam.toLowerCase().replace(/[\s_]+/g, '-');
        const matchesGenderTag = pTags.includes(targetGender);
        const matchesGenderTitle = targetGender === 'pria' || targetGender === 'putra'
          ? (pTitle.includes('pria') || pTitle.includes('kemeja') || pTitle.includes('hem') || pTitle.includes('putra') || pTitle.includes('bapak'))
          : (pTitle.includes('wanita') || pTitle.includes('blus') || pTitle.includes('gamis') || pTitle.includes('dress') || pTitle.includes('tunik') || pTitle.includes('putri') || pTitle.includes('ibu'));
        if (!matchesGenderTag && !matchesGenderTitle) return false;
      }

      // Category check: Baju Kerja, Acara Resmi, Casual, Sarimbit
      if (categoryParam) {
        if (categoryParam === 'baju-kerja' || categoryParam === 'kerja' || categoryParam === 'kantor') {
          const match = pTags.some(t => t.includes('kerja') || t.includes('kantor') || t.includes('formal') || t.includes('kemeja') || t.includes('blus')) ||
            pTitle.includes('kerja') || pTitle.includes('kantor') || pTitle.includes('kemeja') || pTitle.includes('blus');
          if (!match && pTags.length > 0) return false;
        } else if (categoryParam === 'acara-resmi' || categoryParam === 'resmi' || categoryParam === 'formal') {
          const match = pTags.some(t => t.includes('resmi') || t.includes('formal') || t.includes('resepsi') || t.includes('pesta') || t.includes('sarimbit') || t.includes('sutra') || t.includes('dobby') || t.includes('gamis')) ||
            pTitle.includes('resmi') || pTitle.includes('formal') || pTitle.includes('resepsi') || pTitle.includes('pesta') || pTitle.includes('sarimbit');
          if (!match && pTags.length > 0) return false;
        } else if (categoryParam === 'casual' || categoryParam === 'santai') {
          const match = pTags.some(t => t.includes('casual') || t.includes('santai') || t.includes('hem') || t.includes('outer') || t.includes('katun')) ||
            pTitle.includes('casual') || pTitle.includes('santai') || pTitle.includes('hem') || pTitle.includes('outer');
          if (!match && pTags.length > 0) return false;
        } else if (categoryParam === 'sarimbit' || categoryParam === 'couple') {
          const match = pTags.some(t => t.includes('sarimbit') || t.includes('couple') || t.includes('pasangan')) ||
            pTitle.includes('sarimbit') || pTitle.includes('couple') || pTitle.includes('pasangan');
          if (!match && pTags.length > 0) return false;
        } else if (categoryParam === 'lengan-panjang' || categoryParam === 'lengan-pendek') {
          if (!pTags.includes(categoryParam)) return false;
        }
      }

      return true;
    });

    return {
      ...collection.products,
      nodes,
      pageInfo: {
        ...collection.products?.pageInfo,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }, [collection.products, genderParam, categoryParam]);

  const themeClasses = isExclusive
    ? 'bg-[#111111] text-white'
    : isPremium
    ? 'bg-[#201610] text-[#FAF8F5]'
    : 'bg-[#FFFFFF] text-[#111111]';

  const gridColumns = isExclusive
    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12'
    : 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 xl:gap-x-8 xl:gap-y-12';


  const officialWaUrl =
    'https://wa.me/6281390888809?text=' +
    encodeURIComponent(`Halo Batik Smile, saya ingin menanyakan koleksi ${collection.title}`);

  // Banner image resolution: Shopify collection image or curated local editorial banner
  const bannerImageUrl =
    collection.image?.url ||
    (isExclusive
      ? '/banners/hero_slider_1.jpg'
      : isPremium
      ? '/banners/sarimbit_family_banner.jpg'
      : handle.includes('kain')
      ? '/banners/collection_kain_tulis_banner.jpg'
      : handle.includes('series') || handle.includes('sarimbit')
      ? '/banners/sarimbit_family_banner.jpg'
      : null);

  // Featured image resolution for 2-column split hero (Shopify image with graceful fallbacks)
  const collectionFeaturedImage =
    collection.image?.url ||
    bannerImageUrl ||
    collection.products?.nodes?.[0]?.featuredImage?.url ||
    '/banners/hero_editorial_banner.jpg';

  const breadcrumbItems = [
    { label: 'KOLEKSI', to: '/collections' },
    { label: collection?.title || 'Katalog' },
  ];

  return (
    <div className={`min-h-screen pb-24 lg:pb-16 transition-colors duration-500 ${themeClasses}`}>
      <JsonLd
        schema={[
          generateCollectionSchema(collection, collection?.products?.nodes),
          generateBreadcrumbSchema(breadcrumbItems),
        ]}
      />
      {/* 1. HAUTE CINEMATIC HERO BANNER (BACKGROUND IMAGE) FOR EXCLUSIVE & PREMIUM */}
      {isExclusive || isPremium ? (
        <section
          className={`relative w-full overflow-hidden flex items-center justify-center text-center ${
            isExclusive
              ? 'h-[62vh] min-h-[500px] max-h-[660px] bg-[#111111] border-b border-[#C5A059]/40'
              : 'h-[58vh] min-h-[460px] max-h-[600px] bg-[#1C1813] border-b border-[#C5A059]/40'
          }`}
        >
          {/* Background Image with Cinematic Scrim */}
          {bannerImageUrl && (
            <>
              <img
                src={bannerImageUrl}
                alt={collection.image?.altText || collection.title}
                className="absolute inset-0 w-full h-full object-cover object-center scale-105"
              />
              <div
                className={`absolute inset-0 ${
                  isExclusive
                    ? 'bg-gradient-to-t from-[#111111] via-[#111111]/75 to-[#111111]/45'
                    : 'bg-gradient-to-t from-[#1A1612] via-[#2A2016]/75 to-[#C5A059]/25'
                }`}
              />
            </>
          )}

          {/* Hero Content Overlay */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
            {/* Breadcrumb Navigation (Fluid single-line, tier-differentiated) */}
            <Breadcrumb
              isDark={true}
              tier={collectionTier}
              items={[{ label: 'KOLEKSI', to: '/collections' }, { label: collection.title.toUpperCase() }]}
              className="flex justify-center mb-6"
            />

            {isPremium && (
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold block mb-3 text-[#C5A059]">
                SIGNATURE ATELIER &bull; RESEPSI &amp; FORMAL
              </span>
            )}

            <h1 className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide leading-tight mb-3 ${isExclusive ? 'text-[#C5A059] italic' : 'text-white'}`}>
              {collection.title}
            </h1>

            {isExclusive && (
              <p className="font-serif text-sm sm:text-base lg:text-lg text-white/95 mb-4 max-w-3xl leading-relaxed font-normal">
                Koleksi Luxury Batik Smile yang merepresentasikan kemewahan, keanggunan, dan kualitas dalam setiap detail. Menghadirkan perpaduan motif batik pilihan, desain berkarakter, serta sentuhan istimewa untuk melengkapi momen berharga dengan gaya yang elegan dan berkelas.
              </p>
            )}

            {isPremium && (
              <p className="font-serif text-sm sm:text-base lg:text-lg text-[#E2DFD8] mb-4 max-w-3xl leading-relaxed font-normal">
                Koleksi batik dengan pilihan bahan berkualitas yang menghadirkan kenyamanan dan tampilan elegan. Tersedia dengan opsi lapisan trikot untuk memberikan struktur yang lebih rapi dan kokoh, sesuai kebutuhan dan preferensi Anda.
              </p>
            )}

            <div className="w-16 h-px bg-[#C5A059]" />
          </div>
        </section>
      ) : (
        /* STANDARD 2-COLUMN LUXURY EDITORIAL HERO FOR GENERAL COLLECTIONS */
        <section className="pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#E2DFD8] bg-[#FAF8F5]">
          <div className="w-full max-w-7xl mx-auto">
            {/* Breadcrumb Navigation (Strictly Single-Line on Mobile) */}
            <Breadcrumb
              tier={collectionTier}
              items={[{ label: 'KOLEKSI', to: '/collections' }, { label: collection.title.toUpperCase() }]}
              className="mb-6 sm:mb-8"
            />

            {/* 2-Column Split: Left (Shopify Title & Narrative), Right (Shopify Featured Image 5:4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
              {/* Left Column: Collection Title & Shopify Description */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="text-xs sm:text-sm uppercase tracking-[0.24em] font-semibold text-[#9E7D3B] block mb-2 sm:mb-3">
                  {isEkonomi ? 'EKONOMI SERIES • KATUN PRIMISIMA SEJUK' : 'KATALOG BUSANA BATIK NUSANTARA'}
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#111111] leading-tight mb-3 sm:mb-4">
                  {collection.title}
                </h1>

                <div className="w-12 h-px bg-[#C5A059] mb-4 sm:mb-5" />

                {collection.description ? (
                  <p className="text-sm sm:text-base text-[#5A5550] font-light leading-relaxed mb-6 max-w-xl">
                    {collection.description}
                  </p>
                ) : (
                  <p className="text-sm sm:text-base text-[#5A5550] font-light leading-relaxed mb-6 max-w-xl">
                    {isEkonomi
                      ? 'Koleksi batik dengan pilihan motif menarik dan desain yang praktis untuk berbagai kebutuhan. Mengutamakan fungsi, kenyamanan, dan harga yang terjangkau, koleksi ini menjadi pilihan tepat untuk pemakaian sehari-hari maupun seragaman tanpa meninggalkan karakter khas Batik Smile.'
                      : 'Eksplorasi koleksi busana batik dan kain pilihan terbaik Butik Batik Smile Semarang. Dirancang dengan keanggunan motif pusaka, potongan pola simetris, dan kenyamanan furing katun adem.'}
                  </p>
                )}

                {/* Service Highlights */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs uppercase tracking-[0.16em] text-[#7C3F1D] font-medium pt-4 border-t border-[#E2DFD8]">
                  {isEkonomi ? (
                    <>
                      <span>Harga Terjangkau</span>
                      <span className="text-[#C5A059]">&bull;</span>
                      <span>Nyaman Dipakai</span>
                      <span className="text-[#C5A059]">&bull;</span>
                      <span>Awet untuk Aktivitas</span>
                    </>
                  ) : (
                    <>
                      <span>Jahit Bespoke Tanpa MOQ</span>
                      <span className="text-[#C5A059]">&bull;</span>
                      <span>Garansi Butik Resmi</span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: Collection Featured Image (3:2 Aspect Ratio, Frameless) */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[3/2] bg-[#111111] overflow-hidden group">
                  <img
                    src={collectionFeaturedImage}
                    alt={collection.image?.altText || collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/85 text-white text-[8px] sm:text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 border border-white/15 backdrop-blur-xs">
                    {collection.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BODY CONTENT (Pillars & Grid) */}
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isExclusive || isPremium ? 'mt-12 sm:mt-16' : 'mt-8 sm:mt-12'}`}>

        {/* EXCLUSIVE TEMPLATE: 3 Pillars of Haute Artistry */}
        {isExclusive && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 p-6 sm:p-8 bg-[#161616] border border-[#C5A059]/35">
            <div className="text-center p-4">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-1.5">
                PILAR 01
              </span>
              <h4 className="font-serif text-lg text-white font-normal mb-2">Material &amp; Furing Premium</h4>
              <p className="text-xs text-[#E2DFD8]/80 font-light leading-relaxed">
                Batik tulis, kombinasi, hingga printing eksklusif dengan furing trikot sejuk untuk kenyamanan terbaik.
              </p>
            </div>
            <div className="text-center p-4 border-y md:border-y-0 md:border-x border-[#C5A059]/20">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-1.5">
                PILAR 02
              </span>
              <h4 className="font-serif text-lg text-white font-normal mb-2">Jahitan Penjahit Teredukasi</h4>
              <p className="text-xs text-[#E2DFD8]/80 font-light leading-relaxed">
                Dikerjakan teliti oleh penjahit terampil dan berpengalaman guna memastikan hasil busana rapi, presisi, dan berkelas.
              </p>
            </div>
            <div className="text-center p-4">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-1.5">
                PILAR 03
              </span>
              <h4 className="font-serif text-lg text-white font-normal mb-2">Jahitan Sarimbit &amp; Seragam</h4>
              <p className="text-xs text-[#E2DFD8]/80 font-light leading-relaxed">
                Tersedia layanan jahitan eksklusif untuk busana sarimbit keluarga dan seragam instansi tanpa minimal order.
              </p>
            </div>
          </div>
        )}

        {/* PREMIUM TEMPLATE: Pilihan Lapisan & Layanan Jahitan */}
        {isPremium && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 p-6 sm:p-8 bg-[#281C15]/90 backdrop-blur-sm border border-[#7C3F1D]/50 shadow-sm">
            <div className="text-center p-4">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-1.5">
                PILIHAN LAPISAN 01
              </span>
              <h4 className="font-sans text-sm uppercase font-semibold text-white mb-2 tracking-wide">
                Dengan Trikot
              </h4>
              <p className="text-xs text-[#D5C8B8] font-light leading-relaxed">
                Memberikan struktur yang lebih kokoh dan tampilan yang lebih rapi.
              </p>
            </div>
            <div className="text-center p-4 border-y md:border-y-0 md:border-x border-[#7C3F1D]/40">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-1.5">
                PILIHAN LAPISAN 02
              </span>
              <h4 className="font-sans text-sm uppercase font-semibold text-white mb-2 tracking-wide">
                Tanpa Trikot
              </h4>
              <p className="text-xs text-[#D5C8B8] font-light leading-relaxed">
                Memberikan karakter bahan yang lebih ringan dan jatuh alami.
              </p>
            </div>
            <div className="text-center p-4">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-1.5">
                LAYANAN BUTIK 03
              </span>
              <h4 className="font-sans text-sm uppercase font-semibold text-white mb-2 tracking-wide">
                Jahitan Sarimbit &amp; Seragam
              </h4>
              <p className="text-xs text-[#D5C8B8] font-light leading-relaxed">
                Tersedia layanan jahitan untuk sarimbit dan seragam (tanpa minimal order).
              </p>
            </div>
          </div>
        )}



        {/* MARKETPLACE 2-COLUMN CATALOG LAYOUT: Desktop Left Sidebar + Catalog Grid */}
        <div className="lg:flex lg:gap-8 xl:gap-10 items-start">
          {/* DESKTOP LEFT SIDEBAR FILTER */}
          <CollectionSidebar
            handle={handle}
            isDark={isExclusive || isPremium}
            totalCount={filteredConnection?.nodes?.length}
          />

          {/* MAIN CATALOG CONTENT AREA */}
          <div className="flex-1 min-w-0">
            {/* Header Controls (Product count, mobile filter trigger, active filter pills, desktop quick sort) */}
            <CollectionFilterHeader
              handle={handle}
              isDark={isExclusive || isPremium}
              totalCount={filteredConnection?.nodes?.length}
            />

            {/* Products Grid or Empty State */}
            {filteredConnection?.nodes?.length === 0 ? (
              <div
                className={`text-center py-16 px-4 border mb-12 ${
                  isExclusive
                    ? 'border-[#C5A059]/30 bg-[#161616]'
                    : isPremium
                    ? 'border-[#7C3F1D]/40 bg-[#281C15]'
                    : 'border-[#E2DFD8] bg-white'
                }`}
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-2">
                  FILTER TIDAK MENEMUKAN HASIL
                </span>
                <p className={`font-serif text-xl mb-2 ${isExclusive || isPremium ? 'text-white' : 'text-[#111111]'}`}>
                  Tidak ada busana yang sesuai dengan kriteria filter.
                </p>
                <p className={`text-xs max-w-md mx-auto mb-6 ${isExclusive || isPremium ? 'text-[#D5C8B8]' : 'text-[#5A5550]'}`}>
                  Silakan sesuaikan filter pilihan Anda, hapus filter, atau hubungi konsultan kami untuk pesanan khusus.
                </p>
                <Link
                  to={`/collections/${handle}`}
                  className={`inline-block px-6 py-2.5 text-[10px] uppercase font-bold tracking-[0.2em] transition-colors ${
                    isExclusive
                      ? 'bg-[#C5A059] text-[#111111] hover:bg-white'
                      : isPremium
                      ? 'bg-[#7C3F1D] text-white hover:bg-[#C5A059] hover:text-[#111111]'
                      : 'bg-[#111111] text-white hover:bg-[#C5A059] hover:text-[#111111]'
                  }`}
                >
                  Reset Filter Koleksi
                </Link>
              </div>
            ) : (
              <PaginatedResourceSection
                connection={filteredConnection}
                resourcesClassName={`grid ${gridColumns}`}
              >
                {({ node: product, index }) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    variant={isExclusive ? 'exclusive' : isPremium ? 'premium' : 'default'}
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                )}
              </PaginatedResourceSection>
            )}
          </div>
        </div>

        {/* Bottom Callouts: Tailored per Tier */}
        {isExclusive ? (
          <div className="mt-20 text-center pt-14 border-t border-[#C5A059]/30">
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-2">
              PRIVATE VIP ATELIER
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
              Fitting Privat di VIP Lounge Simongan Semarang
            </h3>
            <p className="text-xs mb-6 font-light tracking-wide text-[#A69F96] max-w-xl mx-auto leading-relaxed">
              Nikmati layanan concierge privat di Lantai 2 Flagship Butik Batik Smile Simongan dengan ruang ukur privat dan pendamping busana pribadi.
            </p>
            <a
              href={officialWaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors shadow-lg"
            >
              RESERVASI VIP CONCIERGE &rarr;
            </a>
          </div>
        ) : isPremium ? (
          <div className="mt-20 text-center pt-14 border-t border-[#7C3F1D]/50">
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-2">
              LAYANAN JAHIT SERAGAM KELUARGA
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
              Pemesanan Seragam Resepsi &amp; Acara Keluarga
            </h3>
            <p className="text-xs mb-6 font-light tracking-wide text-[#D5C8B8] max-w-xl mx-auto leading-relaxed">
              Tersedia penyesuaian ukuran dari balita hingga 4XL tanpa minimal pemesanan. Konsultasikan kebutuhan seragam keluarga besar Anda bersama konsultan butik kami.
            </p>
            <a
              href={officialWaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-3.5 bg-[#7C3F1D] hover:bg-[#C5A059] text-white hover:text-[#111111] text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors shadow-sm"
            >
              KONSULTASI SERAGAM RESEPSI &rarr;
            </a>
          </div>
        ) : (
          <div className="mt-20 text-center pt-10 border-t border-[#E2DFD8]">
            <p className="text-xs mb-4 font-light tracking-wide text-[#5A5550]">
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
        )}
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
    tags
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
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        title
        description
      }
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
        after: $endCursor,
        sortKey: $sortKey,
        reverse: $reverse,
        filters: $filters
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

export function ErrorBoundary() {
  return (
    <NotFoundView
      statusCode={404}
      title="Koleksi Belum Tersedia"
      message="Koleksi busana batik yang Anda cari mungkin telah digabungkan atau tautan telah diperbarui. Silakan jelajahi katalog utama butik kami."
    />
  );
}
