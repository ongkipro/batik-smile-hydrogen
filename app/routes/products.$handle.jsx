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

/**
 * Parse Shopify product description HTML into narrative story and structured specifications
 * @param {string} html
 */
function parseShopifyDescription(html) {
  if (!html) return { story: '', specs: [] };

  // Extract paragraphs (excluding ul)
  const pMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  const story = pMatches
    .map((p) => p.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean)
    .join('\n\n');

  // Extract li items
  const liMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  const specs = liMatches.map((li) => {
    const raw = li.replace(/<\/?li[^>]*>/gi, '').trim();
    const strongMatch = raw.match(/<strong[^>]*>([\s\S]*?)<\/strong>/i);
    const label = strongMatch ? strongMatch[1].replace(/[:\s]+$/, '').trim() : '';
    const value = raw
      .replace(/<strong[^>]*>[\s\S]*?<\/strong>/i, '')
      .replace(/<[^>]+>/g, '')
      .replace(/^[:\s]+/, '')
      .trim();
    return { label, value: value || raw.replace(/<[^>]+>/g, '').trim() };
  });

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

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
  };
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const { product } = useLoaderData();

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

    // If both photography and video exist:
    // [0] = Primary featured image cover
    // [1] = 1st Video Lookbook (2nd mini thumbnail)
    // [2..n] = Remaining photography, followed by additional video/3D assets
    if (videoItems.length > 0 && nonVideoItems.length > 0) {
      return [
        nonVideoItems[0],
        videoItems[0],
        ...nonVideoItems.slice(1),
        ...videoItems.slice(1),
      ];
    }

    return rawItems;
  }, [media?.nodes, images?.nodes, product.featuredImage, title]);

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

  // Resolve related products from the exact same collection
  const rawCollections = product.collections?.nodes || [];
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

  const relatedProducts = (matchedCollection?.products?.nodes || [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const relatedCollectionTitle = matchedCollection?.title;
  const relatedCollectionHandle = matchedCollection?.handle;

  // Tier-Differentiated Theme Classification (Mirroring Sarimbit Collection Tiers)
  const collectionHandles = rawCollections.map((c) => c.handle?.toLowerCase() || '');
  const productHandle = (product.handle || '').toLowerCase();
  const productTitle = (product.title || '').toLowerCase();
  const variantPrice = parseFloat(selectedVariant?.price?.amount || '0');

  const isExclusiveTier =
    collectionHandles.some((h) => h.includes('exclusive') || h.includes('mahakarya') || h.includes('sutra')) ||
    productHandle.includes('exclusive') ||
    productHandle === 'sarimbit-royal-navy-1' ||
    productHandle === 'sarimbit-mustard-gold' ||
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
    ? 'bg-[#F3EDE2] text-[#111111]'
    : 'bg-[#FAF8F5] text-[#111111]';

  return (
    <div className={`min-h-screen py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 transition-colors duration-500 ${themeClasses}`}>
      <div className="w-full max-w-7xl mx-auto">
        {/* Dynamic Breadcrumb Navigation (Single-line fluid responsive across all device sizes) */}
        <Breadcrumb
          isDark={isExclusiveTier}
          items={[
            {
              label: relatedCollectionTitle ? relatedCollectionTitle.toUpperCase() : 'KOLEKSI',
              to: relatedCollectionHandle ? `/collections/${relatedCollectionHandle}` : '/collections/all',
            },
            {
              label: title,
            },
          ]}
        />

        {/* Main PDP Grid (Left: 4:5 Vertical Gallery, Right: Frameless Quiet Luxury Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: 4:5 Vertical Gallery System (7 Cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 lg:sticky lg:top-24">
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
                  const thumbUrl = item.previewUrl?.includes('?')
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
                          ? 'border-[#C5A059] ring-1 ring-[#C5A059]'
                          : isExclusiveTier
                          ? 'border-[#262626] opacity-60 hover:opacity-100 hover:border-[#C5A059]/60'
                          : 'border-[#E2DFD8] opacity-75 hover:opacity-100 hover:border-[#111111]'
                      }`}
                      aria-label={item.isVideo || item.isExternalVideo ? `Putar video lookbook produk` : `Pilih media produk ${idx + 1}`}
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
                      {(item.isVideo || item.isExternalVideo) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[0.5px]">
                          <span className="w-6 h-6 flex items-center justify-center bg-black/80 text-[#C5A059] border border-[#C5A059]/70 text-[9px] pl-0.5 shadow-sm">
                            ▶
                          </span>
                          <span className="text-[7.5px] text-white/95 font-medium tracking-[0.16em] uppercase mt-1">
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
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-medium backdrop-blur-sm z-10 flex items-center gap-1.5 bg-black/75 text-[#C5A059] border border-[#C5A059]/40 pointer-events-none">
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
                    className="absolute top-3 right-3 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-medium backdrop-blur-sm z-20 flex items-center gap-1.5 bg-black/75 hover:bg-black/90 text-white border border-[#C5A059]/40 transition-all cursor-pointer shadow-sm"
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
                        currentMedia.url?.includes('?')
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
                  className={`absolute bottom-3 right-3 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] font-medium backdrop-blur-sm z-10 pointer-events-none ${
                    isExclusiveTier
                      ? 'bg-[#111111]/85 text-[#C5A059] border border-[#C5A059]/40'
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
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] font-bold mb-2">
                {isExclusiveTier ? (
                  <span className="text-[#C5A059] flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#C5A059]" />
                    HAUTE HERITAGE &bull; SARIMBIT EXCLUSIVE
                  </span>
                ) : isPremiumTier ? (
                  <span className="text-[#9E7D3B] flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#9E7D3B]" />
                    SIGNATURE ATELIER &bull; SARIMBIT PREMIUM
                  </span>
                ) : (
                  <span className="text-[#888888]">
                    KARYA BUTIK SEMARANG &bull; EST. 2007
                  </span>
                )}
              </div>

              <h1
                className={`font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.14] tracking-wide mb-3 ${
                  isExclusiveTier ? 'text-white' : 'text-[#111111]'
                }`}
              >
                {title}
              </h1>

              {/* Price Display (Indonesian Rp format, no decimal fractions) */}
              <div className="flex items-baseline gap-3 mb-1.5">
                <span
                  className={`text-2xl sm:text-3xl font-medium tracking-wide font-sans ${
                    isExclusiveTier ? 'text-white' : 'text-[#111111]'
                  }`}
                >
                  {selectedVariant?.price && (
                    <BoutiqueMoney data={selectedVariant.price} />
                  )}
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className="text-sm line-through text-[#888888]">
                    <BoutiqueMoney data={selectedVariant.compareAtPrice} />
                  </span>
                )}
              </div>

              {/* Stock Status Indicator (Placed directly under price) */}
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] mb-3">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    isAvailable ? (isExclusiveTier ? 'bg-[#4ADE80]' : 'bg-[#2E6B3E]') : 'bg-[#EF4444]'
                  }`}
                />
                <span
                  className={
                    isAvailable ? (isExclusiveTier ? 'text-[#4ADE80]' : 'text-[#2E6B3E]') : 'text-[#EF4444]'
                  }
                >
                  {isAvailable ? 'Tersedia di Butik' : 'Habis Terjual'}
                </span>
              </div>

              {/* Value Props (Seamless Typography, Tier-Differentiated) */}
              <div
                className={`flex items-center gap-2 text-[11px] font-light tracking-wide flex-wrap ${
                  isExclusiveTier ? 'text-[#E2DFD8]/85' : 'text-[#5A5550]'
                }`}
              >
                {isExclusiveTier ? (
                  <>
                    <span>Sutra Alam ATBM</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Canting Prada Emas</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Sambung Motif Presisi</span>
                  </>
                ) : isPremiumTier ? (
                  <>
                    <span>Tenun Dobby Timbul</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Furing Katun Hero Adem</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Sambung Motif Presisi</span>
                  </>
                ) : (
                  <>
                    <span>Lapis Furing Katun Hero</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Sambung Motif Presisi</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Bebas Tukar Ukuran</span>
                  </>
                )}
              </div>
            </div>

            <div className={`w-full h-px ${isExclusiveTier ? 'bg-[#262626]' : 'bg-[#E2DFD8]'}`} />

            {/* Variant Option Selection (Only rendered if multiple variants exist) */}
            {hasMultipleVariants && (
              <div>
                {productOptions.map((option) => (
                  <div key={option.name}>
                    <div className="mb-2">
                      <label
                        className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
                          isExclusiveTier ? 'text-white' : 'text-[#111111]'
                        }`}
                      >
                        {option.name}:{' '}
                        <span className={isExclusiveTier ? 'font-normal text-[#A9A49C]' : 'font-normal text-[#5A5550]'}>
                          {option.value}
                        </span>
                      </label>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {option.optionValues.map((val) => {
                        const isSelected = val.name === option.value;
                        return (
                          <NavLink
                            key={val.name}
                            to={val.to}
                            preventScrollReset
                            replace
                            className={`w-11 h-11 flex items-center justify-center text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                              isSelected
                                ? isExclusiveTier
                                  ? 'bg-[#C5A059] !text-[#111111] font-bold border border-[#C5A059]'
                                  : 'bg-[#111111] !text-white'
                                : isExclusiveTier
                                ? 'bg-[#181818] !text-white border border-[#333333] hover:border-[#C5A059]'
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
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5">
                {/* Quantity Selector */}
                <div
                  className={`flex items-center h-12 w-28 shrink-0 ${
                    isExclusiveTier
                      ? 'border border-[#C5A059]/40 bg-[#181818] text-white'
                      : 'border border-[#111111] bg-white text-[#111111]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1 || !isAvailable}
                    className={`w-9 h-full flex items-center justify-center text-sm font-medium disabled:opacity-30 cursor-pointer transition-colors ${
                      isExclusiveTier ? 'text-white hover:bg-white/10' : 'text-[#111111] hover:bg-black/5'
                    }`}
                    aria-label="Kurangi Jumlah"
                  >
                    −
                  </button>
                  <span
                    className={`flex-1 text-center text-xs font-semibold font-sans ${
                      isExclusiveTier ? 'text-[#C5A059]' : 'text-[#111111]'
                    }`}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={!isAvailable}
                    className={`w-9 h-full flex items-center justify-center text-sm font-medium disabled:opacity-30 cursor-pointer transition-colors ${
                      isExclusiveTier ? 'text-white hover:bg-white/10' : 'text-[#111111] hover:bg-black/5'
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
                  className={`w-full h-12 px-4 font-semibold text-[10px] uppercase tracking-[0.18em] text-center flex items-center justify-center transition-all cursor-pointer ${
                    isExclusiveTier
                      ? 'border border-[#C5A059] bg-[#181818] hover:bg-[#C5A059] !text-[#C5A059] hover:!text-[#111111] shadow-sm'
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
                className={`w-full h-12 py-3.5 px-6 font-semibold text-[11px] uppercase tracking-[0.2em] transition-all disabled:cursor-not-allowed cursor-pointer shadow-md flex items-center justify-center ${
                  isExclusiveTier
                    ? 'bg-[#C5A059] hover:bg-white !text-[#111111] font-bold shadow-lg disabled:bg-[#333333] disabled:!text-[#777777]'
                    : 'bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] disabled:bg-[#E2DFD8] disabled:!text-[#5A5550]'
                }`}
              >
                {isAvailable ? 'BELI SEKARANG' : 'HABIS TERJUAL'}
              </AddToCartButton>
            </div>

            {/* Trust Guarantee Grid (Standard 3S 1C 1T & 1H - Frameless) */}
            <div
              className={`grid grid-cols-2 gap-x-6 gap-y-2 pt-4 border-t text-[10px] ${
                isExclusiveTier ? 'border-[#262626] text-[#E2DFD8]/75' : 'border-[#E2DFD8] text-[#5A5550]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-[8px]">&bull;</span>
                <span>Bebas Tukar Ukuran 7 Hari</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-[8px]">&bull;</span>
                <span>100% Batik Asli Cap/Tulis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-[8px]">&bull;</span>
                <span>Lapis Furing Katun Hero Adem</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-[8px]">&bull;</span>
                <span>Pengiriman Seluruh Indonesia</span>
              </div>
            </div>

            {/* Dual Clean Accordions: Deskripsi (Auto Show) & Pengiriman (Short Title) */}
            <div
              className={`border-t divide-y text-xs pt-1 ${
                isExclusiveTier
                  ? 'border-[#262626] divide-[#262626]'
                  : 'border-[#E2DFD8] divide-[#E2DFD8]'
              }`}
            >
              {/* Accordion 1: Deskripsi & Spesifikasi (Auto Show / Open by default) */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('deskripsi')}
                  className={`w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-left cursor-pointer ${
                    isExclusiveTier ? 'text-white' : 'text-[#111111]'
                  }`}
                >
                  <span>DESKRIPSI &amp; SPESIFIKASI KARYA</span>
                  <span className={`text-sm font-normal ${isExclusiveTier ? 'text-[#C5A059]' : ''}`}>
                    {openSections.deskripsi ? '−' : '+'}
                  </span>
                </button>

                {openSections.deskripsi && (
                  <div className="mt-3 text-xs leading-relaxed font-light space-y-3">
                    {/* Story Narrative */}
                    {parsedDescription.story && (
                      <p
                        className={`text-xs sm:text-sm font-light leading-relaxed italic font-serif ${
                          isExclusiveTier ? 'text-[#E2DFD8]/90' : 'text-[#444444]'
                        }`}
                      >
                        &ldquo;{parsedDescription.story}&rdquo;
                      </p>
                    )}

                    {/* Frameless Atelier Specifications List (Zero Cards/Frames) */}
                    {parsedDescription.specs.length > 0 ? (
                      <div
                        className={`divide-y pt-1 ${
                          isExclusiveTier ? 'divide-[#262626]/80' : 'divide-[#E2DFD8]/80'
                        }`}
                      >
                        {parsedDescription.specs.map((item, idx) => (
                          <div key={idx} className="py-2 flex items-baseline justify-between gap-4">
                            <span
                              className={`text-[10px] uppercase tracking-[0.18em] font-medium shrink-0 ${
                                isExclusiveTier ? 'text-[#C5A059]' : 'text-[#888888]'
                              }`}
                            >
                              {item.label || 'Spesifikasi'}
                            </span>
                            <span
                              className={`text-right text-xs font-light ${
                                isExclusiveTier ? 'text-white' : 'text-[#111111]'
                              }`}
                            >
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      descriptionHtml && (
                        <div
                          className={`text-xs leading-relaxed font-light space-y-2 ${
                            isExclusiveTier ? 'text-[#E2DFD8]/80' : 'text-[#5A5550]'
                          }`}
                          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                        />
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Pengiriman & Garansi (Short, clean title) */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('shipping')}
                  className={`w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-left cursor-pointer ${
                    isExclusiveTier ? 'text-white' : 'text-[#111111]'
                  }`}
                >
                  <span>PENGIRIMAN &amp; GARANSI TUKAR</span>
                  <span className={`text-sm font-normal ${isExclusiveTier ? 'text-[#C5A059]' : ''}`}>
                    {openSections.shipping ? '−' : '+'}
                  </span>
                </button>

                {openSections.shipping && (
                  <div
                    className={`mt-3 divide-y text-xs ${
                      isExclusiveTier ? 'divide-[#262626]/80' : 'divide-[#E2DFD8]/80'
                    }`}
                  >
                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-[9px] mt-0.5 shrink-0">◆</span>
                      <div className="min-w-0">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-[0.16em] block mb-0.5 ${
                            isExclusiveTier ? 'text-white' : 'text-[#111111]'
                          }`}
                        >
                          Pengiriman Cepat &amp; Terlindungi
                        </span>
                        <p
                          className={`text-xs font-light leading-relaxed ${
                            isExclusiveTier ? 'text-[#E2DFD8]/75' : 'text-[#5A5550]'
                          }`}
                        >
                          Seluruh pesanan dikemas aman dan dikirim langsung dari Flagship Showroom Batik Smile Simongan Semarang ke seluruh Indonesia.
                        </p>
                      </div>
                    </div>

                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-[9px] mt-0.5 shrink-0">◆</span>
                      <div className="min-w-0">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-[0.16em] block mb-0.5 ${
                            isExclusiveTier ? 'text-white' : 'text-[#111111]'
                          }`}
                        >
                          Garansi Bebas Tukar Ukuran 7 Hari
                        </span>
                        <p
                          className={`text-xs font-light leading-relaxed ${
                            isExclusiveTier ? 'text-[#E2DFD8]/75' : 'text-[#5A5550]'
                          }`}
                        >
                          Bebas tukar ukuran dalam 7 hari kalender setelah pesanan diterima apabila ukuran kurang pas di badan.
                        </p>
                      </div>
                    </div>

                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-[9px] mt-0.5 shrink-0">◆</span>
                      <div className="min-w-0">
                        <span
                          className={`text-[10px] uppercase font-bold tracking-[0.16em] block mb-0.5 ${
                            isExclusiveTier ? 'text-white' : 'text-[#111111]'
                          }`}
                        >
                          Layanan Konsultasi 3S 1C 1T &amp; 1H
                        </span>
                        <p
                          className={`text-xs font-light leading-relaxed ${
                            isExclusiveTier ? 'text-[#E2DFD8]/75' : 'text-[#5A5550]'
                          }`}
                        >
                          Tim penjahit dan konsultan kami siap mendampingi panduan ukuran melalui WhatsApp Concierge{' '}
                          <a
                            href="https://wa.me/6281390888809"
                            target="_blank"
                            rel="noreferrer"
                            className={`font-medium underline underline-offset-2 transition-colors ${
                              isExclusiveTier ? 'text-[#C5A059] hover:text-white' : 'text-[#9E7D3B] hover:text-[#111111]'
                            }`}
                          >
                            081-390-8888-09
                          </a>.
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

        {/* Related Products: "Koleksi Selaras" (Strict 4:5 Vertical Cards, Calibrated Spacing) */}
        {relatedProducts.length > 0 && (
          <div
            className={`mt-16 sm:mt-20 pt-12 border-t ${
              isExclusiveTier ? 'border-[#262626]' : 'border-[#E2DFD8]'
            }`}
          >
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span
                className={`text-[9px] uppercase tracking-[0.24em] font-bold block mb-1.5 ${
                  isExclusiveTier ? 'text-[#C5A059]' : 'text-[#9E7D3B]'
                }`}
              >
                KOLEKSI SELARAS
              </span>
              <h2
                className={`font-serif text-2xl sm:text-3xl font-normal tracking-wide ${
                  isExclusiveTier ? 'text-white' : 'text-[#111111]'
                }`}
              >
                Rekomendasi {relatedCollectionTitle || 'Koleksi Sejenis'}
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12">
              {relatedProducts.map((relProduct) => (
                <ProductItem
                  key={relProduct.id}
                  product={relProduct}
                  variant={isExclusiveTier ? 'exclusive' : isPremiumTier ? 'premium' : 'default'}
                  loading="lazy"
                />
              ))}
            </div>

            {relatedCollectionHandle && (
              <div className="text-center mt-8 sm:mt-10">
                <Link
                  to={`/collections/${relatedCollectionHandle}`}
                  className={`inline-block px-8 py-3.5 text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors shadow-sm no-underline ${
                    isExclusiveTier
                      ? 'bg-[#181818] border border-[#C5A059]/50 hover:bg-[#C5A059] !text-[#C5A059] hover:!text-[#111111]'
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

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
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
        }
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
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
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
