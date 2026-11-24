import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData, NavLink, Link, redirect } from 'react-router';

/**
 * Ensures embedded video iframe URLs (YouTube/Vimeo) contain autoplay & mute parameters
 * @param {string} url
 */
function getAutoplayEmbedUrl(url) {
  if (!url) return '';
  const sep = url.includes('?') ? '&' : '?';
  if (url.includes('autoplay')) return url;
  return `${url}${sep}autoplay=1&mute=1&playsinline=1`;
}
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
} from '@shopify/hydrogen';
import { AddToCartButton } from '~/components/AddToCartButton';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { StickyMobileBar } from '~/components/StickyMobileBar';
import { ProductItem } from '~/components/ProductItem';
import { ProductTierStorySection } from '~/components/ProductTierStorySection';
import { BoutiqueMoney } from '~/lib/currency';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generateProductMeta } from '~/lib/seo';
import { JsonLd } from '~/components/JsonLd';
import { generateProductSchema, generateBreadcrumbSchema } from '~/lib/schema';
import { NotFoundView } from '~/components/NotFoundView';

/**
 * Decode HTML entities and sanitize legacy fabric/showroom terms in plain text
 * @param {string} text
 */
function cleanDescriptionText(text) {
  if (!text) return '';
  return text
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&bull;/gi, '•')
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&nbsp;/gi, ' ')
    .replace(/Furing\s+Katun\s+Hero/gi, 'Lapisan Furing Trikot')
    .replace(/Katun\s+Hero/gi, 'Lapisan Trikot')
    .replace(/Flagship\s+Showroom\s+Batik\s+Smile\s+Simongan/gi, 'Showroom Batik Smile Sukun & Sampokong')
    .replace(/Showroom\s+Simongan/gi, 'Showroom Sukun & Sampokong')
    .trim();
}

/**
 * Parse Shopify product description HTML into narrative story and structured specifications
 * @param {string} html
 */
function parseShopifyDescription(html) {
  if (!html) return { story: '', specs: [] };

  // Extract paragraphs (excluding ul)
  const withoutLists = html.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, '').replace(/<ol[^>]*>[\s\S]*?<\/ol>/gi, '');
  const pMatches = withoutLists.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  let story = pMatches
    .map((p) => cleanDescriptionText(p.replace(/<[^>]+>/g, '')))
    .filter(Boolean)
    .join('\n\n');

  if (!story) {
    story = cleanDescriptionText(
      withoutLists
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/div>/gi, '\n\n')
        .replace(/<[^>]+>/g, ''),
    );
  }

  // Extract li items
  const liMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  const specs = liMatches
    .map((li) => {
      const raw = li.replace(/<\/?li[^>]*>/gi, '').trim();
      const strongMatch = raw.match(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/i);
      if (strongMatch) {
        const label = cleanDescriptionText(
          strongMatch[1].replace(/<[^>]+>/g, '').replace(/[:\s]+$/, ''),
        );
        const value = cleanDescriptionText(
          raw
            .replace(/<(?:strong|b)[^>]*>[\s\S]*?<\/(?:strong|b)>/i, '')
            .replace(/<[^>]+>/g, '')
            .replace(/^[:\s]+/, ''),
        );
        return {
          label,
          value: value || cleanDescriptionText(raw.replace(/<[^>]+>/g, '')),
        };
      }
      const cleanText = cleanDescriptionText(raw.replace(/<[^>]+>/g, ''));
      const colonIdx = cleanText.indexOf(':');
      if (colonIdx > 0 && colonIdx < 35) {
        return {
          label: cleanText.slice(0, colonIdx).trim(),
          value: cleanText.slice(colonIdx + 1).trim(),
        };
      }
      return { label: '', value: cleanText };
    })
    .filter((item) => item.value);

  return { story, specs };
}

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return generateProductMeta(data?.product);
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

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // Bersihkan ?Title=Default+Title dari slug URL (301 Permanent Redirect)
  const url = new URL(request.url);
  let shouldRedirect = false;
  for (const [key, val] of Array.from(url.searchParams.entries())) {
    if (key.toLowerCase() === 'title' && val.toLowerCase() === 'default title') {
      url.searchParams.delete(key);
      shouldRedirect = true;
    }
  }
  if (shouldRedirect) {
    throw redirect(url.pathname + (url.search ? url.search : ''), 301);
  }

  const [{ product, recommendedProducts }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
      cache: storefront.CacheShort(),
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  if (product.descriptionHtml) {
    product.descriptionHtml = product.descriptionHtml
      .replace(/Katun\s+Hero/gi, 'Lapisan Furing Pilihan')
      .replace(/Flagship\s+Showroom\s+Batik\s+Smile\s+Simongan/gi, 'Showroom Batik Smile Sukun & Sampokong');
  }
  if (product.description) {
    product.description = product.description
      .replace(/Katun\s+Hero/gi, 'Lapisan Furing Pilihan')
      .replace(/Flagship\s+Showroom\s+Batik\s+Smile\s+Simongan/gi, 'Showroom Batik Smile Sukun & Sampokong');
  }

  return {
    product,
    recommendedProducts: recommendedProducts?.nodes || [],
  };
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const { product, recommendedProducts = [] } = useLoaderData();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sinkronisasi opsi varian ke URL yang bersih
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentSearchParams = new URLSearchParams(window.location.search);
    let changed = false;

    for (const key of Array.from(currentSearchParams.keys())) {
      if (
        key.toLowerCase() === 'title' &&
        currentSearchParams.get(key)?.toLowerCase() === 'default title'
      ) {
        currentSearchParams.delete(key);
        changed = true;
      }
    }

    selectedVariant?.selectedOptions?.forEach((opt) => {
      if (
        opt.name?.toLowerCase() === 'title' &&
        opt.value?.toLowerCase() === 'default title'
      ) {
        return;
      }
      if (currentSearchParams.get(opt.name) !== opt.value) {
        currentSearchParams.set(opt.name, opt.value);
        changed = true;
      }
    });

    const newSearch = currentSearchParams.toString();
    const cleanUrl = `${window.location.pathname}${newSearch ? '?' + newSearch : ''}`;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (changed || cleanUrl !== currentUrl) {
      window.history.replaceState({}, '', cleanUrl);
    }
  }, [selectedVariant?.selectedOptions]);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml, images, media } = product;

  // Build unified media list with type identification (Images, Videos, 3D Models)
  // Ensures that if a product video exists, it is prioritized as the 2nd mini thumbnail (index 1)
  // directly following the primary featured photograph at index 0.
  const mediaList = React.useMemo(() => {
    let rawItems = [];

    if (media?.nodes?.length) {
      rawItems = media.nodes.map((item) => {
        const isVideo = item.__typename === 'Video' || item.mediaContentType === 'VIDEO';
        const isExternalVideo =
          item.__typename === 'ExternalVideo' || item.mediaContentType === 'EXTERNAL_VIDEO';
        const isModel = item.__typename === 'Model3d' || item.mediaContentType === 'MODEL_3D';
        const url =
          item.image?.url ||
          item.previewImage?.url ||
          item.url ||
          '';
        const previewUrl = item.previewImage?.url || item.image?.url || url;
        const altText = item.alt || item.image?.altText || item.previewImage?.altText || title;
        return {
          ...item,
          isVideo,
          isExternalVideo,
          isModel,
          url,
          previewUrl,
          altText,
        };
      });
    } else {
      const fallbackImages = images?.nodes || (product.featuredImage ? [product.featuredImage] : []);
      rawItems = fallbackImages.map((img) => ({
        ...img,
        __typename: 'MediaImage',
        isVideo: false,
        isExternalVideo: false,
        isModel: false,
        url: img.url,
        previewUrl: img.url,
        altText: img.altText || title,
      }));
    }

    if (!rawItems.length) return [];

    // Separate video assets from still photography/models
    const videoItems = rawItems.filter((item) => item.isVideo || item.isExternalVideo);
    const nonVideoItems = rawItems.filter((item) => !item.isVideo && !item.isExternalVideo);

    let ordered = rawItems;
    if (videoItems.length > 0 && nonVideoItems.length > 0) {
      ordered = [
        nonVideoItems[0],
        videoItems[0],
        ...nonVideoItems.slice(1),
        ...videoItems.slice(1),
      ];
    }

    // Ensure apparel products (especially Luxury Series / Wanita / Pria) have 5 gallery items
    // where the 5th photo is the official Panduan Ukuran (Size Chart)
    const lowerHandle = (product.handle || '').toLowerCase();
    const isNonApparel =
      lowerHandle.includes('kain') ||
      lowerHandle.includes('blangkon') ||
      lowerHandle.includes('aksesoris');

    if (!isNonApparel && ordered.length > 0) {
      const siblingPool = (product.collections?.nodes || [])
        .flatMap((c) => c.products?.nodes || [])
        .flatMap((p) => p.images?.nodes || (p.featuredImage ? [p.featuredImage] : []));

      const paddedPhotos = [...ordered];
      let sibIdx = 0;
      while (paddedPhotos.length < 4 && siblingPool.length > 0 && sibIdx < siblingPool.length) {
        const candidate = siblingPool[sibIdx++];
        if (candidate?.url && !paddedPhotos.some((m) => m.url === candidate.url)) {
          paddedPhotos.push({
            id: `Lookbook-Detail-${paddedPhotos.length + 1}`,
            __typename: 'MediaImage',
            isVideo: false,
            isExternalVideo: false,
            isModel: false,
            url: candidate.url,
            previewUrl: candidate.url,
            altText: `${title} - Detail Lookbook (${paddedPhotos.length + 1})`,
          });
        }
      }
      while (paddedPhotos.length < 4) {
        const baseItem = ordered[paddedPhotos.length % ordered.length];
        paddedPhotos.push({
          ...baseItem,
          id: `${baseItem.id || 'media'}-view-${paddedPhotos.length + 1}`,
          altText: `${title} - Tampilan ${paddedPhotos.length + 1}`,
        });
      }

      const firstFour = paddedPhotos.slice(0, 4);
      const sizeChartSlide = {
        id: `${product.id}-size-chart`,
        __typename: 'MediaImage',
        isVideo: false,
        isExternalVideo: false,
        isModel: false,
        isSizeChart: true,
        url: '/banners/size_chart_butik.jpg',
        previewUrl: '/banners/size_chart_butik.jpg',
        altText: `${title} - Panduan Ukuran (Size Chart)`,
      };
      return [...firstFour, sizeChartSlide];
    }

    return ordered;
  }, [media?.nodes, images?.nodes, product.featuredImage, product.handle, product.id, product.collections?.nodes, title]);

  const [activeMedia, setActiveMedia] = useState(() => {
    if (selectedVariant?.image?.url) {
      const match = mediaList.find((m) => m.url === selectedVariant.image.url);
      if (match) return match;
    }
    return mediaList[0] || null;
  });

  // Sync activeMedia when selectedVariant image changes
  useEffect(() => {
    if (selectedVariant?.image?.url) {
      const match = mediaList.find((m) => m.url === selectedVariant.image.url);
      if (match) {
        setActiveMedia(match);
      }
    }
  }, [selectedVariant?.image?.url, mediaList]);


  // Quantity order state
  const [quantity, setQuantity] = useState(1);

  // Policy & description accordion state (auto show deskripsi by default)
  const [openSections, setOpenSections] = useState({ deskripsi: true, shipping: false });
  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isAvailable = selectedVariant?.availableForSale;

  // Only show variant selector if product has multiple selectable variants
  const hasMultipleVariants =
    productOptions.length > 0 &&
    productOptions.some((opt) => opt.optionValues && opt.optionValues.length > 1);

  // Clean cart lines with dynamic quantity
  const cartLines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity,
          selectedVariant,
        },
      ]
    : [];

  // Parse structured description from Shopify
  const parsedDescription = parseShopifyDescription(descriptionHtml);

  // Resolve related products from the exact same collection + fallback pool so "Produk Serupa" always shows 4 items
  const rawCollections = React.useMemo(() => product.collections?.nodes || [], [product.collections?.nodes]);
  const matchedCollection =
    rawCollections.find(
      (c) =>
        c.handle !== 'shop' &&
        c.handle !== 'all' &&
        c.handle !== 'frontpage' &&
        c.products?.nodes?.some((p) => p.id !== product.id),
    ) ||
    rawCollections.find((c) => c.products?.nodes?.some((p) => p.id !== product.id)) ||
    rawCollections[0];

  const relatedProducts = (() => {
    const seenIds = new Set([product.id]);
    const list = [];
    const primaryPool = matchedCollection?.products?.nodes || [];
    const secondaryPool = rawCollections.flatMap((c) => c.products?.nodes || []);
    const candidatePools = [...primaryPool, ...secondaryPool, ...recommendedProducts];

    for (const item of candidatePools) {
      if (item?.id && !seenIds.has(item.id)) {
        seenIds.add(item.id);
        list.push(item);
        if (list.length >= 4) break;
      }
    }
    return list;
  })();

  const relatedCollectionHandle = matchedCollection?.handle;
  const relatedCollectionTitle =
    relatedCollectionHandle === 'kain'
      ? 'Kain Batik'
      : matchedCollection?.title;

  // Tier-Differentiated Theme Classification (Mirroring Sarimbit Collection Tiers)
  const collectionHandles = rawCollections.map((c) => c.handle?.toLowerCase() || '');
  const productHandle = (product.handle || '').toLowerCase();
  const productTitle = (product.title || '').toLowerCase();
  const variantPrice = parseFloat(selectedVariant?.price?.amount || '0');

  const isExclusiveTier =
    collectionHandles.some((h) => h.includes('luxury') || h.includes('exclusive') || h.includes('mahakarya') || h.includes('sutra')) ||
    productHandle.includes('luxury') ||
    productHandle.includes('exclusive') ||
    productHandle === 'sarimbit-royal-navy-1' ||
    productHandle === 'sarimbit-mustard-gold' ||
    productTitle.includes('luxury') ||
    productTitle.includes('exclusive') ||
    productTitle.includes('mahakarya') ||
    (productHandle.startsWith('sarimbit') && variantPrice >= 1000000);

  const isPremiumTier =
    !isExclusiveTier &&
    (collectionHandles.some((h) => h.includes('premium') || h.includes('signature') || h.includes('dobby')) ||
    productHandle.includes('premium') ||
    productHandle === 'sarimbit-charcoal-hitam' ||
    productTitle.includes('premium') ||
    productTitle.includes('signature') ||
    (productHandle.startsWith('sarimbit') && variantPrice >= 500000 && variantPrice < 1000000));

  const productTier = isExclusiveTier
    ? 'luxury'
    : isPremiumTier
    ? 'premium'
    : (productHandle.includes('ekonomi') || collectionHandles.some((h) => h.includes('ekonomi')))
    ? 'ekonomi'
    : null;

  const isDarkPDP = isExclusiveTier || isPremiumTier;

  // Build 6 Standardized Informasi Produk Rows:
  // 1. Bahan, 2. Material/ Bahan, 3. Detail Furing, 4. Detail Produk, 5. Koleksi, 6. Panduan Perawatan
  const structuredProductSpecs = React.useMemo(() => {
    const rawSpecs = parsedDescription.specs || [];
    const findSpec = (keywords) => {
      const found = rawSpecs.find((s) =>
        keywords.some((kw) => (s.label || '').toLowerCase().includes(kw)),
      );
      return found?.value || '';
    };

    const bahanVal =
      findSpec(['bahan']) ||
      (isExclusiveTier
        ? 'Sutra ATBM & Katun Sutra Primisima Halus'
        : isPremiumTier
        ? 'Tenun Dobby Timbul & Katun Primisima Pilihan'
        : '100% Katun Primisima Halus');

    const materialVal =
      findSpec(['material', 'tekstur', 'karakter']) ||
      (isExclusiveTier
        ? 'Serat sutra berkilau alami, jatuh anggun, lembut, dan sejuk di kulit'
        : isPremiumTier
        ? 'Tekstur tenun timbul berkarakter, adem, dan tidak mudah kusut'
        : 'Serat katun rapat, adem, menyerap keringat, dan nyaman dipakai seharian');

    const furingVal =
      findSpec(['furing', 'lapis', 'trikot']) ||
      (isExclusiveTier
        ? 'Lapisan Furing Trikot Premium (struktur rapi, kokoh, dan sejuk)'
        : isPremiumTier
        ? 'Tersedia opsi Dengan Lapisan Trikot (kokoh & rapi) atau Tanpa Trikot (jatuh alami)'
        : 'Tanpa Furing (Katun Primisima sejuk langsung di kulit)');

    const detailVal =
      findSpec(['detail', 'konstruksi', 'potongan', 'model', 'ukuran', 'dimensi']) ||
      'Jahitan butik presisi, pola sambung motif simetris, dan potongan nyaman di badan';

    const koleksiVal =
      findSpec(['koleksi']) ||
      relatedCollectionTitle ||
      (isExclusiveTier
        ? 'Luxury Series'
        : isPremiumTier
        ? 'Premium Series'
        : 'Koleksi Butik Batik Smile');

    const perawatanVal =
      findSpec(['perawatan', 'cuci']) ||
      'Cuci manual dengan sabun lembut/lerak, hindari pemutih, jemur di tempat teduh, setrika suhu sedang';

    return [
      { label: '1. Bahan', value: bahanVal },
      { label: '2. Material / Bahan', value: materialVal },
      { label: '3. Detail Furing', value: furingVal },
      { label: '4. Detail Produk', value: detailVal },
      { label: '5. Koleksi', value: koleksiVal },
      { label: '6. Panduan Perawatan', value: perawatanVal },
    ];
  }, [parsedDescription.specs, isExclusiveTier, isPremiumTier, relatedCollectionTitle]);

  // Build "1 Motif Beda Model & Gender" items (Pria: Lengan Panjang & Lengan Pendek; Wanita: Blus, Tunik, Gamis, Outer)
  const [sameMotifFilter, setSameMotifFilter] = useState('all');
  const allCatalogPool = React.useMemo(() => {
    const map = new Map();
    const primaryPool = matchedCollection?.products?.nodes || [];
    const secondaryPool = rawCollections.flatMap((c) => c.products?.nodes || []);
    for (const item of [...primaryPool, ...secondaryPool, ...recommendedProducts]) {
      if (item?.handle && !map.has(item.handle)) {
        map.set(item.handle, item);
      }
    }
    return Array.from(map.values());
  }, [matchedCollection?.products?.nodes, rawCollections, recommendedProducts]);

  const sameMotifModels = React.useMemo(() => {
    const findByHandleOrKeyword = (preferredHandles, keywords) => {
      for (const h of preferredHandles) {
        const match = allCatalogPool.find((p) => p.handle === h && p.id !== product.id);
        if (match) return match;
      }
      return (
        allCatalogPool.find(
          (p) =>
            p.id !== product.id &&
            keywords.some((kw) => (p.title || '').toLowerCase().includes(kw)),
        ) || product
      );
    };

    const priaPanjang = findByHandleOrKeyword(
      ['kemeja-sido-asih', 'kemeja-motif-semarangan', 'sarimbit-royal-navy-1'],
      ['kemeja'],
    );
    const priaPendek = findByHandleOrKeyword(
      ['hem-dobby-maroon', 'hem-lurik-hitam', 'sarimbit-royal-navy'],
      ['hem'],
    );
    const wanitaBlus = findByHandleOrKeyword(
      ['blus-royal-navy', 'kebaya-encim-modern'],
      ['blus', 'kebaya'],
    );
    const wanitaTunik = findByHandleOrKeyword(
      ['tunik-senyum-floral', 'sarimbit-sutra-pasangan'],
      ['tunik'],
    );
    const wanitaGamis = findByHandleOrKeyword(
      ['gamis-parang-kusumo', 'sarimbit-mustard-gold', 'sarimbit-kondangan-gold'],
      ['gamis', 'sarimbit'],
    );
    const wanitaOuter = findByHandleOrKeyword(
      ['outer-terracotta-gold', 'kebaya-encim-modern'],
      ['outer'],
    );

    return [
      {
        key: 'pria-panjang',
        gender: 'pria',
        badge: 'PRIA • LENGAN PANJANG',
        modelLabel: 'Kemeja Pria Lengan Panjang',
        subtitle: 'Motif Selaras • Furing Trikot Penuh',
        product: priaPanjang,
      },
      {
        key: 'pria-pendek',
        gender: 'pria',
        badge: 'PRIA • LENGAN PENDEK',
        modelLabel: 'Kemeja Pria Lengan Pendek',
        subtitle: 'Motif Selaras • Potongan Reguler Rapi',
        product: priaPendek,
      },
      {
        key: 'wanita-blus',
        gender: 'wanita',
        badge: 'WANITA • BLUS',
        modelLabel: 'Model Blus Wanita',
        subtitle: 'Motif Selaras • Siluet Anggun Modern',
        product: wanitaBlus,
      },
      {
        key: 'wanita-tunik',
        gender: 'wanita',
        badge: 'WANITA • TUNIK',
        modelLabel: 'Model Tunik Wanita',
        subtitle: 'Motif Selaras • Potongan Panjang Elegan',
        product: wanitaTunik,
      },
      {
        key: 'wanita-gamis',
        gender: 'wanita',
        badge: 'WANITA • GAMIS',
        modelLabel: 'Model Gamis Wanita',
        subtitle: 'Motif Selaras • Resepsi & Acara Resmi',
        product: wanitaGamis,
      },
      {
        key: 'wanita-outer',
        gender: 'wanita',
        badge: 'WANITA • OUTER',
        modelLabel: 'Model Outer Wanita',
        subtitle: 'Motif Selaras • Lapisan Kontemporer',
        product: wanitaOuter,
      },
    ];
  }, [allCatalogPool, product]);

  const visibleSameMotifModels = React.useMemo(() => {
    if (sameMotifFilter === 'pria') {
      return sameMotifModels.filter((m) => m.gender === 'pria');
    }
    if (sameMotifFilter === 'wanita') {
      return sameMotifModels.filter((m) => m.gender === 'wanita');
    }
    return sameMotifModels;
  }, [sameMotifModels, sameMotifFilter]);

  // Active media index & current media item
  const activeIndex = Math.max(
    0,
    mediaList.findIndex((m) => {
      if (activeMedia?.id && m.id) return m.id === activeMedia.id;
      return (m.previewUrl || m.url) === (activeMedia?.previewUrl || activeMedia?.url);
    })
  );
  const currentMedia = mediaList[activeIndex] || activeMedia || mediaList[0];

  // Video playback & audio mute state (Desktop & Mobile Autoplay Compliance)
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Unified media select handler ensuring instant auto play
  const handleSelectMedia = (item) => {
    setActiveMedia(item);
    if ((item.isVideo || item.isExternalVideo) && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  // Autoplay trigger across desktop and mobile whenever active video changes
  useEffect(() => {
    if (currentMedia?.isVideo && videoRef.current) {
      const videoEl = videoRef.current;
      videoEl.defaultMuted = true;
      videoEl.muted = isMuted;

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch((_err) => {
          // If browser policy blocked unmuted playback, enforce muted state and retry immediately
          if (!videoEl.muted) {
            videoEl.muted = true;
            setIsMuted(true);
            videoEl.play().catch(() => {});
          }
        });
      }
    }
  }, [currentMedia?.id, currentMedia?.url, currentMedia?.isVideo, isMuted]);

  // Swipe navigation state & handlers
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handlePrevMedia = () => {
    if (mediaList.length <= 1) return;
    const prevIdx = (activeIndex - 1 + mediaList.length) % mediaList.length;
    handleSelectMedia(mediaList[prevIdx]);
  };

  const handleNextMedia = () => {
    if (mediaList.length <= 1) return;
    const nextIdx = (activeIndex + 1) % mediaList.length;
    handleSelectMedia(mediaList[nextIdx]);
  };

  const handleTouchStart = (e) => {
    if (e.target.tagName === 'VIDEO' || e.target.closest('video')) {
      setTouchStartX(null);
      return;
    }
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const deltaX = touchStartX - touchEndX;
    const minSwipeDistance = 40;

    if (deltaX > minSwipeDistance) {
      // Swiped left -> next
      handleNextMedia();
    } else if (deltaX < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrevMedia();
    }
  };

  // Theme classes mirroring collection theme
  const themeClasses = isExclusiveTier
    ? 'bg-[#111111] text-white'
    : isPremiumTier
    ? 'bg-[#201610] text-[#FAF8F5]'
    : 'bg-[#FAF8F5] text-[#111111]';

  const breadcrumbItems = [
    {
      label: relatedCollectionTitle ? relatedCollectionTitle.toUpperCase() : 'KOLEKSI',
      to: relatedCollectionHandle ? `/collections/${relatedCollectionHandle}` : '/collections/all',
    },
    {
      label: title,
    },
  ];

  return (
    <div className={`min-h-screen pt-8 sm:pt-12 pb-24 sm:pb-16 px-4 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-500 ${themeClasses}`}>
      <JsonLd
        schema={[
          generateProductSchema(product),
          generateBreadcrumbSchema(breadcrumbItems),
        ]}
      />
      <div className="w-full max-w-7xl mx-auto">
        {/* Dynamic Breadcrumb Navigation (Single-line fluid responsive across all device sizes) */}
        <Breadcrumb
          isDark={isDarkPDP}
          tier={productTier}
          items={breadcrumbItems}
        />

        {/* Main PDP Grid (Left: 4:5 Vertical Gallery, Right: Frameless Quiet Luxury Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: 4:5 Vertical Gallery System (7 Cols on Desktop - Non-sticky, Natural Editorial Flow) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            {/* Thumbnails Column (Precision-aligned on Mobile to match Main Thumbnail width, Vertical on Desktop) */}
            {mediaList.length > 1 && (
              <div
                className={`${
                  mediaList.length <= 5
                    ? `grid ${
                        mediaList.length === 2
                          ? 'grid-cols-2'
                          : mediaList.length === 3
                          ? 'grid-cols-3'
                          : mediaList.length === 4
                          ? 'grid-cols-4'
                          : 'grid-cols-5'
                      } gap-2 w-full`
                    : 'flex gap-2 overflow-x-auto scrollbar-none w-full'
                } sm:flex sm:flex-col sm:w-20 sm:gap-3 sm:overflow-y-auto sm:max-h-[660px] pb-1 sm:pb-0`}
              >
                {mediaList.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  const thumbUrl = item.previewUrl?.startsWith('/')
                    ? item.previewUrl
                    : item.previewUrl?.includes('?')
                    ? `${item.previewUrl}&width=160`
                    : `${item.previewUrl}?width=160`;
                  return (
                    <button
                      key={item.id || idx}
                      type="button"
                      onClick={() => handleSelectMedia(item)}
                      className={`relative aspect-[4/5] overflow-hidden border transition-all cursor-pointer ${
                        mediaList.length > 5
                          ? 'w-[calc((100%-32px)/5)] shrink-0 sm:w-20'
                          : 'w-full sm:w-20 sm:shrink-0'
                      } ${
                        isActive
                          ? 'border-[#C5A059] opacity-100'
                          : isExclusiveTier
                          ? 'border-transparent opacity-60 hover:opacity-100 hover:border-[#C5A059]/60'
                          : isPremiumTier
                          ? 'border-transparent opacity-60 hover:opacity-100 hover:border-[#7C3F1D]'
                          : 'border-transparent opacity-75 hover:opacity-100 hover:border-[#E2DFD8]'
                      }`}
                      aria-label={
                        item.isSizeChart
                          ? 'Lihat Panduan Ukuran (Size Chart)'
                          : item.isVideo || item.isExternalVideo
                          ? 'Putar video lookbook produk'
                          : `Pilih media produk ${idx + 1}`
                      }
                    >
                      <img
                        src={thumbUrl}
                        alt={item.altText || `${title} - Media ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        width="80"
                        height="100"
                        className="w-full h-full object-cover"
                      />
                      {item.isSizeChart && (
                        <div className="absolute inset-x-0 bottom-0 bg-black/80 text-[#C5A059] py-0.5 text-xs font-bold uppercase tracking-[0.14em] text-center">
                          SIZE CHART
                        </div>
                      )}
                      {(item.isVideo || item.isExternalVideo) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[0.5px]">
                          <span className="w-6 h-6 flex items-center justify-center bg-black/80 text-[#C5A059] border border-[#C5A059]/70 text-xs pl-0.5 shadow-sm">
                            ▶
                          </span>
                          <span className="text-xs text-white/95 font-medium tracking-[0.16em] uppercase mt-1">
                            VIDEO
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Featured Media Container (Strict 4:5 Aspect Ratio with Video, Swipe & Arrows) */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`flex-1 relative overflow-hidden group shadow-sm select-none ${
                isExclusiveTier
                  ? 'bg-[#181818] border border-[#C5A059]/30'
                  : isPremiumTier
                  ? 'bg-[#281C14] border border-[#7C3F1D]/50'
                  : 'bg-[#111111]'
              }`}
            >
              {currentMedia?.isVideo ? (
                <div className="relative aspect-[4/5] w-full bg-black flex items-center justify-center overflow-hidden">
                  <video
                    ref={videoRef}
                    key={currentMedia.id || currentMedia.url}
                    src={
                      currentMedia.sources?.find((s) => s.mimeType === 'video/mp4' && s.height <= 720 && s.height >= 480)?.url ||
                      currentMedia.sources?.find((s) => s.mimeType === 'video/mp4' && s.height >= 720)?.url ||
                      currentMedia.sources?.find((s) => s.mimeType === 'video/mp4')?.url ||
                      currentMedia.sources?.[0]?.url
                    }
                    poster={currentMedia.previewUrl}
                    controls
                    controlsList="nodownload"
                    playsInline
                    autoPlay
                    muted={isMuted}
                    loop
                    preload="auto"
                    className="w-full h-full object-cover"
                  >
                    {currentMedia.sources?.map((source, sIdx) => (
                      <source
                        key={sIdx}
                        src={source.url}
                        type={source.mimeType}
                      />
                    ))}
                    Peramban Anda tidak mendukung pemutaran video.
                  </video>

                  {/* Video Lookbook Pill Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-xs uppercase tracking-[0.18em] font-medium backdrop-blur-sm z-10 flex items-center gap-1.5 bg-black/75 text-[#C5A059] border border-[#C5A059]/40 pointer-events-none">
                    <span className="inline-block w-1.5 h-1.5 bg-[#C5A059] animate-pulse" />
                    VIDEO LOOKBOOK
                  </div>

                  {/* Floating Audio Mute/Unmute Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        const nextMuted = !isMuted;
                        videoRef.current.muted = nextMuted;
                        setIsMuted(nextMuted);
                      }
                    }}
                    aria-label={isMuted ? 'Nyalakan audio video lookbook' : 'Senyapkan audio video lookbook'}
                    className="absolute top-3 right-3 px-2.5 py-1 text-xs uppercase tracking-[0.18em] font-medium backdrop-blur-sm z-20 flex items-center gap-1.5 bg-black/75 hover:bg-black/90 text-white border border-[#C5A059]/40 transition-all cursor-pointer shadow-sm"
                  >
                    {isMuted ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                        <span>SUARA MATI</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        <span>SUARA AKTIF</span>
                      </>
                    )}
                  </button>
                </div>
              ) : currentMedia?.isExternalVideo ? (
                <div className="relative aspect-[4/5] w-full bg-black flex items-center justify-center overflow-hidden">
                  <iframe
                    src={getAutoplayEmbedUrl(currentMedia.embedUrl)}
                    title={currentMedia.altText || title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {currentMedia ? (
                    <img
                      src={
                        currentMedia.url?.startsWith('/')
                          ? currentMedia.url
                          : currentMedia.url?.includes('?')
                          ? `${currentMedia.url}&width=1000`
                          : `${currentMedia.url}?width=1000`
                      }
                      alt={currentMedia.altText || title}
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                      width={currentMedia.width || 800}
                      height={currentMedia.height || 1000}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                    />
                  ) : (
                    <div
                      className={`aspect-[4/5] w-full flex items-center justify-center text-xs font-serif ${
                        isExclusiveTier ? 'bg-[#181818] text-[#A9A49C]' : 'bg-[#EFECE6] text-[#5A5550]'
                      }`}
                    >
                      Batik Smile
                    </div>
                  )}
                </div>
              )}

              {/* Prev / Next Arrows (Desktop hover & Mobile visible) */}
              {mediaList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevMedia();
                    }}
                    aria-label="Media sebelumnya"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-black/45 hover:bg-black/85 text-white/90 hover:text-white transition-all cursor-pointer backdrop-blur-xs opacity-75 sm:opacity-0 sm:group-hover:opacity-100 z-10"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextMedia();
                    }}
                    aria-label="Media berikutnya"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-black/45 hover:bg-black/85 text-white/90 hover:text-white transition-all cursor-pointer backdrop-blur-xs opacity-75 sm:opacity-0 sm:group-hover:opacity-100 z-10"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Counter Badge */}
              {mediaList.length > 1 && (
                <div
                  className={`absolute bottom-3 right-3 px-2.5 py-1 text-xs uppercase tracking-[0.16em] font-medium backdrop-blur-sm z-10 pointer-events-none ${
                    isExclusiveTier
                      ? 'bg-[#111111]/85 text-[#C5A059] border border-[#C5A059]/40'
                      : isPremiumTier
                      ? 'bg-[#201610]/85 text-[#C5A059] border border-[#7C3F1D]/60'
                      : 'bg-black/70 text-white'
                  }`}
                >
                  {activeIndex + 1} / {mediaList.length}
                </div>
              )}
            </div>
          </div>

          {/* Right: Frameless Quiet Luxury Product Details (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Block */}
            <div>
              {/* Category & Tier Whispered Eyebrow */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-bold mb-2">
                {isExclusiveTier ? (
                  <span className="text-[#C5A059] flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#C5A059]" />
                    HAUTE HERITAGE &bull; LUXURY SERIES
                  </span>
                ) : isPremiumTier ? (
                  <span className="text-[#C5A059] flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#7C3F1D]" />
                    SIGNATURE ATELIER &bull; PREMIUM SERIES
                  </span>
                ) : (
                  <span className="text-[#888888]">
                    KARYA BUTIK SEMARANG &bull; SEJAK 2007
                  </span>
                )}
              </div>

              <h1
                className={`font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.14] tracking-wide mb-3 ${
                  isDarkPDP ? 'text-white' : 'text-[#111111]'
                }`}
              >
                {title}
              </h1>

              {/* Price Display (Indonesian Rp format, no decimal fractions) */}
              <div className="flex items-baseline gap-3 mb-1.5">
                <span
                  className={`text-2xl sm:text-3xl font-medium tracking-wide font-sans ${
                    isDarkPDP ? 'text-white' : 'text-[#111111]'
                  }`}
                >
                  {selectedVariant?.price && (
                    <BoutiqueMoney data={selectedVariant.price} />
                  )}
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className={`text-sm line-through ${isDarkPDP ? 'text-[#A9A49C]' : 'text-[#888888]'}`}>
                    <BoutiqueMoney data={selectedVariant.compareAtPrice} />
                  </span>
                )}
              </div>
            </div>

            <div className={`w-full h-px ${isExclusiveTier ? 'bg-[#262626]' : isPremiumTier ? 'bg-[#7C3F1D]/40' : 'bg-[#E2DFD8]'}`} />

            {/* Variant Option Selection (Only rendered if multiple variants exist) */}
            {hasMultipleVariants && (
              <div className="space-y-4">
                {productOptions.map((option) => (
                  <div key={option.name}>
                    <div className="mb-2.5">
                      <label
                        className={`text-xs font-medium uppercase tracking-[0.18em] ${
                          isDarkPDP ? 'text-white' : 'text-[#111111]'
                        }`}
                      >
                        {option.name}:{' '}
                        <span className={isExclusiveTier ? 'font-normal text-[#A9A49C]' : isPremiumTier ? 'font-normal text-[#D5C8B8]' : 'font-normal text-[#5A5550]'}>
                          {option.value}
                        </span>
                      </label>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {option.optionValues.map((val) => {
                        const isSelected = val.name === option.value;
                        const isOptionAvailable = val.available !== false;
                        return (
                          <NavLink
                            key={val.name}
                            to={val.to}
                            preventScrollReset
                            replace
                            className={`min-w-12 h-11 px-3.5 flex items-center justify-center text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                              !isOptionAvailable ? 'opacity-45 line-through' : ''
                            } ${
                              isSelected
                                ? isExclusiveTier
                                  ? 'bg-[#C5A059] !text-[#111111] font-bold border border-[#C5A059]'
                                  : isPremiumTier
                                  ? 'bg-[#7C3F1D] !text-white font-bold border border-[#C5A059]'
                                  : 'bg-[#111111] !text-white'
                                : isExclusiveTier
                                ? 'bg-[#181818] !text-white border border-[#333333] hover:border-[#C5A059]'
                                : isPremiumTier
                                ? 'bg-[#281C15] !text-[#FAF8F5] border border-[#7C3F1D]/60 hover:border-[#C5A059]'
                                : 'bg-white !text-[#111111] border border-[#E2DFD8] hover:bg-[#FAF8F5]'
                            }`}
                          >
                            {val.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Purchase Actions: Row 1 (Quantity + Tambah ke Tas), Row 2 (Beli Sekarang) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Selector */}
                <div
                  className={`flex items-center h-13 w-32 shrink-0 ${
                    isExclusiveTier
                      ? 'border border-[#C5A059]/40 bg-[#181818] text-white'
                      : isPremiumTier
                      ? 'border border-[#7C3F1D]/60 bg-[#281C15] text-white'
                      : 'border border-[#111111] bg-white text-[#111111]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1 || !isAvailable}
                    className={`w-10 h-full flex items-center justify-center text-base font-medium disabled:opacity-30 cursor-pointer transition-colors ${
                      isDarkPDP ? 'text-white hover:bg-white/10' : 'text-[#111111] hover:bg-black/5'
                    }`}
                    aria-label="Kurangi Jumlah"
                  >
                    −
                  </button>
                  <span
                    className={`flex-1 text-center text-sm font-semibold font-sans ${
                      isDarkPDP ? 'text-[#C5A059]' : 'text-[#111111]'
                    }`}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={!isAvailable}
                    className={`w-10 h-full flex items-center justify-center text-base font-medium disabled:opacity-30 cursor-pointer transition-colors ${
                      isDarkPDP ? 'text-white hover:bg-white/10' : 'text-[#111111] hover:bg-black/5'
                    }`}
                    aria-label="Tambah Jumlah"
                  >
                    +
                  </button>
                </div>

                {/* Tambah ke Tas Belanja Button (Stretches across remaining row width) */}
                <AddToCartButton
                  disabled={!isAvailable}
                  lines={cartLines}
                  wrapperClassName="flex-1"
                  className={`w-full h-13 px-4 font-bold text-xs uppercase tracking-[0.2em] text-center flex items-center justify-center transition-all cursor-pointer ${
                    isExclusiveTier
                      ? 'border border-[#C5A059] bg-[#181818] hover:bg-[#C5A059] !text-[#C5A059] hover:!text-[#111111] shadow-sm'
                      : isPremiumTier
                      ? 'border border-[#7C3F1D] bg-[#281C15] hover:bg-[#7C3F1D] !text-[#FAF8F5] hover:!text-white shadow-sm'
                      : 'border border-[#111111] bg-white hover:bg-[#FAF8F5] !text-[#111111] hover:!text-[#9E7D3B]'
                  }`}
                >
                  + TAMBAH KE TAS BELANJA
                </AddToCartButton>
              </div>

              {/* Beli Sekarang (Direct Instant Checkout under Tambah ke Tas, 100% matching width) */}
              <AddToCartButton
                disabled={!isAvailable}
                lines={cartLines}
                redirectTo="checkout"
                wrapperClassName="w-full block"
                className={`w-full h-13 py-3.5 px-6 font-bold text-xs uppercase tracking-[0.22em] transition-all disabled:cursor-not-allowed cursor-pointer shadow-md flex items-center justify-center ${
                  isExclusiveTier
                    ? 'bg-[#C5A059] hover:bg-white !text-[#111111] shadow-lg disabled:bg-[#333333] disabled:!text-[#777777]'
                    : isPremiumTier
                    ? 'bg-[#7C3F1D] hover:bg-[#C5A059] !text-white hover:!text-[#111111] border border-[#C5A059]/40 shadow-lg disabled:bg-[#38261C] disabled:!text-[#88786D]'
                    : 'bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] disabled:bg-[#E2DFD8] disabled:!text-[#5A5550]'
                }`}
              >
                {isAvailable ? 'BELI SEKARANG' : 'HABIS TERJUAL'}
              </AddToCartButton>
            </div>

            {/* Trust Guarantee Grid & Local Shipping / Pickup Info (Frameless) */}
            <div
              className={`pt-4.5 border-t space-y-3 text-xs ${
                isExclusiveTier
                  ? 'border-[#262626] text-[#E2DFD8]/75'
                  : isPremiumTier
                  ? 'border-[#7C3F1D]/40 text-[#D5C8B8]'
                  : 'border-[#E2DFD8] text-[#5A5550]'
              }`}
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[#C5A059] text-xs">&bull;</span>
                  <span>Bebas Tukar Ukuran 7 Hari</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C5A059] text-xs">&bull;</span>
                  <span>100% Batik Indonesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C5A059] text-xs">&bull;</span>
                  <span>Pengiriman Seluruh Indonesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C5A059] text-xs">&bull;</span>
                  <span>Biaya pengiriman dihitung saat checkout</span>
                </div>
              </div>

              <div
                className={`pt-2.5 border-t space-y-1.5 text-xs font-light leading-relaxed ${
                  isExclusiveTier
                    ? 'border-[#262626]/70 text-[#E2DFD8]/80'
                    : isPremiumTier
                    ? 'border-[#7C3F1D]/30 text-[#D5C8B8]/90'
                    : 'border-[#E2DFD8]/80 text-[#5A5550]'
                }`}
              >
                <p className="flex items-start gap-2">
                  <span className="text-[#C5A059] text-xs mt-1 shrink-0">&bull;</span>
                  <span>Pengiriman instan tersedia melalui Gojek / Grab Express di area Semarang.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-[#C5A059] text-xs mt-1 shrink-0">&bull;</span>
                  <span>
                    Pengambilan produk dapat dilakukan di{' '}
                    <Link
                      to="/pages/lokasi-toko"
                      className={`font-medium underline underline-offset-3 transition-colors ${
                        isDarkPDP
                          ? 'text-[#C5A059] hover:text-white'
                          : 'text-[#111111] hover:text-[#9E7D3B]'
                      }`}
                    >
                      Shop Location
                    </Link>
                    .
                  </span>
                </p>
              </div>
            </div>

            {/* Dual Clean Accordions: Deskripsi (Auto Show) & Pengiriman (Short Title) */}
            <div
              className={`border-t divide-y text-xs pt-1 ${
                isExclusiveTier
                  ? 'border-[#262626] divide-[#262626]'
                  : isPremiumTier
                  ? 'border-[#7C3F1D]/40 divide-[#7C3F1D]/40'
                  : 'border-[#E2DFD8] divide-[#E2DFD8]'
              }`}
            >
              {/* Accordion 1: Bagian Informasi Produk (Auto Show / Open by default) */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('deskripsi')}
                  className={`w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-left cursor-pointer ${
                    isDarkPDP ? 'text-white' : 'text-[#111111]'
                  }`}
                >
                  <span>INFORMASI PRODUK</span>
                  <span className={`text-sm font-normal ${isDarkPDP ? 'text-[#C5A059]' : ''}`}>
                    {openSections.deskripsi ? '−' : '+'}
                  </span>
                </button>

                {openSections.deskripsi && (
                  <div className="mt-3 text-xs leading-relaxed font-light space-y-3">
                    {/* Story Narrative */}
                    {parsedDescription.story && (
                      <p
                        className={`text-xs sm:text-sm font-light leading-relaxed italic font-serif ${
                          isExclusiveTier ? 'text-[#E2DFD8]/90' : isPremiumTier ? 'text-[#E8DFC8]' : 'text-[#444444]'
                        }`}
                      >
                        &ldquo;{parsedDescription.story}&rdquo;
                      </p>
                    )}

                    {/* 6 Standardized Informasi Produk Rows */}
                    <div
                      className={`divide-y pt-1 ${
                        isExclusiveTier ? 'divide-[#262626]/80' : isPremiumTier ? 'divide-[#7C3F1D]/30' : 'divide-[#E2DFD8]/80'
                      }`}
                    >
                      {structuredProductSpecs.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-baseline justify-between gap-4">
                          <span
                            className={`text-xs uppercase tracking-[0.18em] font-medium shrink-0 ${
                              isDarkPDP ? 'text-[#C5A059]' : 'text-[#888888]'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span
                            className={`text-right text-xs font-light ${
                              isDarkPDP ? 'text-white' : 'text-[#111111]'
                            }`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Bagian Pengiriman dan Garansi Tukar */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('shipping')}
                  className={`w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-left cursor-pointer ${
                    isDarkPDP ? 'text-white' : 'text-[#111111]'
                  }`}
                >
                  <span>PENGIRIMAN &amp; GARANSI TUKAR</span>
                  <span className={`text-sm font-normal ${isDarkPDP ? 'text-[#C5A059]' : ''}`}>
                    {openSections.shipping ? '−' : '+'}
                  </span>
                </button>

                {openSections.shipping && (
                  <div
                    className={`mt-3 divide-y text-xs ${
                      isExclusiveTier ? 'divide-[#262626]/80' : isPremiumTier ? 'divide-[#7C3F1D]/30' : 'divide-[#E2DFD8]/80'
                    }`}
                  >
                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-xs mt-0.5 shrink-0">1.</span>
                      <div className="min-w-0">
                        <span
                          className={`text-xs uppercase font-bold tracking-[0.16em] block mb-0.5 ${
                            isDarkPDP ? 'text-white' : 'text-[#111111]'
                          }`}
                        >
                          Pengiriman Aman ke Seluruh Indonesia
                        </span>
                        <p
                          className={`text-xs font-light leading-relaxed ${
                            isExclusiveTier ? 'text-[#E2DFD8]/75' : isPremiumTier ? 'text-[#D5C8B8]' : 'text-[#5A5550]'
                          }`}
                        >
                          Setiap pesanan dikemas dengan aman &amp; dikirim langsung dari showroom Batik Smile Sukun dan Batik Smile Sampokong Semarang ke berbagai wilayah di Indonesia.
                        </p>
                      </div>
                    </div>

                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-xs mt-0.5 shrink-0">2.</span>
                      <div className="min-w-0">
                        <span
                          className={`text-xs uppercase font-bold tracking-[0.16em] block mb-0.5 ${
                            isDarkPDP ? 'text-white' : 'text-[#111111]'
                          }`}
                        >
                          Layanan Penukaran Ukuran 7 Hari
                        </span>
                        <p
                          className={`text-xs font-light leading-relaxed ${
                            isExclusiveTier ? 'text-[#E2DFD8]/75' : isPremiumTier ? 'text-[#D5C8B8]' : 'text-[#5A5550]'
                          }`}
                        >
                          Ukuran kurang sesuai? Ajukan penukaran maksimal 7 hari kalender sejak pesanan diterima, dengan memenuhi syarat dan ketentuan penukaran. (Produk belum dicuci/digunakan, label &amp; pricetag masih terpasang utuh, serta produk masih dalam kondisi baik)
                        </p>
                      </div>
                    </div>

                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-xs mt-0.5 shrink-0">3.</span>
                      <div className="min-w-0">
                        <span
                          className={`text-xs uppercase font-bold tracking-[0.16em] block mb-0.5 ${
                            isDarkPDP ? 'text-white' : 'text-[#111111]'
                          }`}
                        >
                          Layanan Jahit Sarimbit dan Seragam
                        </span>
                        <p
                          className={`text-xs font-light leading-relaxed ${
                            isExclusiveTier ? 'text-[#E2DFD8]/75' : isPremiumTier ? 'text-[#D5C8B8]' : 'text-[#5A5550]'
                          }`}
                        >
                          Wujudkan busana serasi untuk keluarga maupun instansi melalui layanan jahit seragam di Batik Smile. Kami siap membantu kebutuhan busana dengan berbagai pilihan model dan motif sesuai dengan kebutuhan dan karakter Anda. (Tersedia layanan konsultasi hubungi WA bisnis kami{' '}
                          <a
                            href="https://wa.me/6281390888809"
                            target="_blank"
                            rel="noreferrer"
                            className={`font-medium underline underline-offset-2 transition-colors ${
                              isDarkPDP ? 'text-[#C5A059] hover:text-white' : 'text-[#9E7D3B] hover:text-[#111111]'
                            }`}
                          >
                            081-390-8888-09
                          </a>
                          )
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tier-Specific 2-Column Bespoke Differentiation Section (Sarimbit Exclusive & Premium) */}
        <ProductTierStorySection
          tier={isExclusiveTier ? 'exclusive' : isPremiumTier ? 'premium' : 'standard'}
          productTitle={title}
        />

        {/* NEW SECTION BEFORE PRODUK SERUPA: 1 Motif Beda Model & Gender (Pria L.Panjang & L.Pendek | Wanita Blus, Tunik, Gamis, Outer) */}
        <div
          className={`mt-16 sm:mt-20 pt-12 border-t ${
            isExclusiveTier ? 'border-[#262626]' : isPremiumTier ? 'border-[#7C3F1D]/40' : 'border-[#E2DFD8]'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span
                className={`text-xs uppercase tracking-[0.24em] font-bold block mb-1.5 ${
                  isDarkPDP ? 'text-[#C5A059]' : 'text-[#9E7D3B]'
                }`}
              >
                SATU MOTIF &bull; BEDA MODEL &amp; GENDER
              </span>
              <h2
                className={`font-serif text-2xl sm:text-3xl font-normal tracking-wide ${
                  isDarkPDP ? 'text-white' : 'text-[#111111]'
                }`}
              >
                Pilihan Model Pria &amp; Wanita (Satu Motif)
              </h2>
              <p
                className={`text-xs font-light mt-1.5 max-w-2xl ${
                  isExclusiveTier ? 'text-[#E2DFD8]/75' : isPremiumTier ? 'text-[#D5C8B8]' : 'text-[#5A5550]'
                }`}
              >
                Padukan motif yang selaras dengan pilihan model Pria (Lengan Panjang &amp; Lengan Pendek) serta Wanita (Blus, Tunik, Gamis, &amp; Outer).
              </p>
            </div>

            {/* Filter Tabs: Semua | Pria (L.Pjg & L.Pdk) | Wanita (Blus, Tunik, Gamis, Outer) */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'Semua Model (6)' },
                { id: 'pria', label: 'Pilihan Pria (L.Pjg & L.Pdk)' },
                { id: 'wanita', label: 'Pilihan Wanita (Blus, Tunik, Gamis, Outer)' },
              ].map((tab) => {
                const active = sameMotifFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSameMotifFilter(tab.id)}
                    className={`px-3.5 py-2 text-xs uppercase tracking-[0.16em] font-semibold border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#C5A059] text-[#111111] border-[#C5A059]'
                        : isDarkPDP
                        ? 'bg-transparent text-[#E2DFD8] border-white/20 hover:border-[#C5A059]'
                        : 'bg-white text-[#111111] border-[#E2DFD8] hover:border-[#111111]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {visibleSameMotifModels.map((entry) => {
              const targetProduct = entry.product;
              const imgUrl =
                targetProduct?.featuredImage?.url ||
                targetProduct?.images?.nodes?.[0]?.url ||
                '/banners/hero_editorial_banner.jpg';
              const priceData = targetProduct?.priceRange?.minVariantPrice;
              return (
                <Link
                  key={entry.key}
                  to={`/products/${targetProduct?.handle || product.handle}`}
                  className={`group block border transition-all no-underline ${
                    isExclusiveTier
                      ? 'bg-[#161616] border-[#262626] hover:border-[#C5A059]'
                      : isPremiumTier
                      ? 'bg-[#281C15] border-[#7C3F1D]/50 hover:border-[#C5A059]'
                      : 'bg-white border-[#E2DFD8] hover:border-[#C5A059]'
                  }`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111111]">
                    <img
                      src={imgUrl.includes('?') ? `${imgUrl}&width=500` : `${imgUrl}?width=500`}
                      alt={`${entry.modelLabel} - ${targetProduct?.title || title}`}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/85 text-[#C5A059] border border-[#C5A059]/40 text-xs uppercase tracking-[0.15em] font-semibold">
                      {entry.badge}
                    </span>
                  </div>
                  <div className="p-3 sm:p-3.5">
                    <h3
                      className={`font-serif text-sm sm:text-base font-normal leading-snug mb-1 group-hover:text-[#C5A059] transition-colors ${
                        isDarkPDP ? 'text-white' : 'text-[#111111]'
                      }`}
                    >
                      {entry.modelLabel}
                    </h3>
                    <p
                      className={`text-xs font-light mb-2 line-clamp-1 ${
                        isDarkPDP ? 'text-[#A9A49C]' : 'text-[#5A5550]'
                      }`}
                    >
                      {entry.subtitle}
                    </p>
                    {priceData && (
                      <div
                        className={`text-xs font-semibold font-sans ${
                          isDarkPDP ? 'text-[#C5A059]' : 'text-[#111111]'
                        }`}
                      >
                        <BoutiqueMoney data={priceData} />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Related Products: "Produk Serupa" — Motif dan Warna Lain untuk Pilihan Lain */}
        {relatedProducts.length > 0 && (
          <div
            className={`mt-16 sm:mt-20 pt-12 border-t ${
              isExclusiveTier ? 'border-[#262626]' : isPremiumTier ? 'border-[#7C3F1D]/40' : 'border-[#E2DFD8]'
            }`}
          >
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span
                className={`text-xs uppercase tracking-[0.24em] font-bold block mb-1.5 ${
                  isDarkPDP ? 'text-[#C5A059]' : 'text-[#9E7D3B]'
                }`}
              >
                MOTIF DAN WARNA LAIN UNTUK PILIHAN LAIN
              </span>
              <h2
                className={`font-serif text-2xl sm:text-3xl font-normal tracking-wide ${
                  isDarkPDP ? 'text-white' : 'text-[#111111]'
                }`}
              >
                Produk Serupa
              </h2>
              <p
                className={`text-xs font-light mt-1.5 ${
                  isExclusiveTier ? 'text-[#E2DFD8]/75' : isPremiumTier ? 'text-[#D5C8B8]' : 'text-[#5A5550]'
                }`}
              >
                Rekomendasi motif dan warna lain dari kurasi koleksi butik kami.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12">
              {relatedProducts.map((relProduct) => (
                <ProductItem
                  key={relProduct.id}
                  product={relProduct}
                  variant={isExclusiveTier ? 'exclusive' : isPremiumTier ? 'premium' : 'default'}
                  loading="eager"
                />
              ))}
            </div>

            {relatedCollectionHandle && (
              <div className="text-center mt-8 sm:mt-10">
                <Link
                  to={`/collections/${relatedCollectionHandle}`}
                  className={`inline-block px-8 py-3.5 text-xs uppercase font-semibold tracking-[0.2em] transition-colors shadow-sm no-underline ${
                    isExclusiveTier
                      ? 'bg-[#181818] border border-[#C5A059]/50 hover:bg-[#C5A059] !text-[#C5A059] hover:!text-[#111111]'
                      : isPremiumTier
                      ? 'bg-[#281C15] border border-[#7C3F1D] hover:bg-[#7C3F1D] !text-[#FAF8F5] hover:!text-white'
                      : 'bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111]'
                  }`}
                >
                  LIHAT SEMUA KOLEKSI &rarr;
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Smart Mobile Action Bar */}
      <StickyMobileBar
        product={product}
        selectedVariant={selectedVariant}
        isExclusive={isExclusiveTier}
        isPremium={isPremiumTier}
      />

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const RELATED_PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment RelatedProductItem on Product {
    id
    title
    handle
    productType
    availableForSale
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
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 8) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    media(first: 15) {
      nodes {
        __typename
        id
        mediaContentType
        alt
        previewImage {
          url
          altText
          width
          height
        }
        ... on MediaImage {
          id
          image {
            id
            url
            altText
            width
            height
          }
        }
        ... on Video {
          id
          sources {
            url
            mimeType
            format
            height
            width
          }
        }
        ... on ExternalVideo {
          id
          embedUrl
          host
          originUrl
        }
        ... on Model3d {
          id
          sources {
            url
            mimeType
            format
          }
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    collections(first: 5) {
      nodes {
        id
        handle
        title
        products(first: 8) {
          nodes {
            ...RelatedProductItem
          }
        }
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
  ${RELATED_PRODUCT_ITEM_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
    recommendedProducts: products(first: 25, sortKey: UPDATED_AT) {
      nodes {
        ...RelatedProductItem
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */

export function ErrorBoundary() {
  return (
    <NotFoundView
      statusCode={404}
      title="Busana Belum Tersedia"
      message="Koleksi busana batik yang Anda tuju mungkin telah berganti kurasi atau tautan telah diperbarui. Silakan kembali menjelajahi katalog utama butik kami."
    />
  );
}
