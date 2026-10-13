import React from 'react';
import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { formatRupiah } from '~/lib/currency';

/**
 * Master Quiet Luxury Product Card
 * - Frameless & Borderless Architecture (No heavy box borders, no clunky padding, zero drop-shadow).
 * - Strict 4:5 Vertical Aspect Ratio preserving pure textile & silhouette proportions.
 * - Zero-Radius (0px) precision geometry aligned with Quiet Luxury Nusantara standards.
 * - Tailored themes for each collection tier:
 *   - 'exclusive': Obsidian Canvas, Sutra ATBM & Prada Emas gold typography.
 *   - 'premium': Warm Ivory Canvas, Tenun Dobby & Furing Hero crisp typography.
 *   - 'default': Clean Mori Linen Canvas, Soga Matang accents & modern editorial layout.
 *
 * @param {{
 *   product: any;
 *   loading?: 'eager' | 'lazy';
 *   badge?: string;
 *   variant?: 'default' | 'exclusive' | 'premium';
 * }} props
 */
export function ProductItem({ product, loading = 'lazy', badge, variant = 'default' }) {
  const variantUrl = useVariantUrl(product?.handle);

  if (!product) return null;
  const primaryImage = product.featuredImage;
  const secondaryImage = product.images?.nodes?.[1] || product.images?.edges?.[1]?.node;
  const price = product.priceRange?.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price?.amount || 0);

  const rawTitle = product.title || '';
  const displayTitle = rawTitle.toUpperCase();

  const isExclusive = variant === 'exclusive';
  const isPremium = variant === 'premium';

  return (
    <div className="group relative flex flex-col justify-between h-full bg-transparent">
      {/* 1. Frameless 4:5 Portrait Media Container */}
      <Link
        to={variantUrl}
        prefetch="intent"
        className={`relative block w-full aspect-[4/5] overflow-hidden ${
          isExclusive ? 'bg-[#181818]' : isPremium ? 'bg-[#281C14]' : 'bg-[#EFECE6]'
        }`}
      >
        {/* Primary Image with Organic Subtle Scale */}
        {primaryImage && (
          <Image
            data={primaryImage}
            alt={primaryImage.altText || rawTitle}
            aspectRatio="4/5"
            loading={loading}
            fetchPriority={loading === 'eager' ? 'high' : 'auto'}
            decoding={loading === 'eager' ? 'sync' : 'async'}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Secondary Image Crossfade on Hover */}
        {secondaryImage && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <Image
              data={secondaryImage}
              alt={secondaryImage.altText || rawTitle}
              aspectRatio="4/5"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
        )}

        {/* Status Badge: Custom Badge only if explicitly provided (No automatic 'PENAWARAN' badge) */}
        {badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 shadow-xs ${
                isExclusive
                  ? 'bg-[#111111]/90 text-[#C5A059] border border-[#C5A059]/40 backdrop-blur-xs'
                  : isPremium
                  ? 'bg-[#7C3F1D] text-[#FAF8F5] border border-[#C5A059]/40'
                  : 'bg-[#111111] text-white'
              }`}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Minimalist Quick View Bar (Slides up on desktop hover) */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/65 via-black/25 to-transparent pointer-events-none sm:pointer-events-auto">
          <div
            className={`w-full py-3 px-3 text-xs font-bold uppercase tracking-[0.2em] text-center transition-colors shadow-sm ${
              isExclusive
                ? 'bg-[#C5A059] text-[#111111] hover:bg-white hover:text-[#111111]'
                : isPremium
                ? 'bg-[#7C3F1D] text-white hover:bg-[#C5A059] hover:text-[#111111]'
                : 'bg-[#111111] text-white hover:bg-[#C5A059] hover:text-[#111111]'
            }`}
          >
            LIHAT DETAIL
          </div>
        </div>
      </Link>

      {/* 2. Editorial Typography & Price Metadata */}
      <div className="pt-3.5 sm:pt-4 pb-1 flex flex-col flex-grow justify-between text-center items-center">
        <div className="w-full">
          {/* Eyebrow Product Type */}
          {product.productType && (
            <span
              className={`block text-[10px] sm:text-xs uppercase tracking-[0.22em] font-medium mb-1.5 ${
                isExclusive
                  ? 'text-[#C5A059]'
                  : isPremium
                  ? 'text-[#C5A059]'
                  : 'text-[#7C3F1D]'
              }`}
            >
              {product.productType}
            </span>
          )}

          {/* Product Title */}
          <Link
            to={variantUrl}
            prefetch="intent"
            className={`block transition-colors line-clamp-2 leading-snug ${
              isExclusive
                ? 'font-serif text-base sm:text-lg font-normal tracking-wide text-[#FAF8F5] group-hover:text-[#C5A059]'
                : isPremium
                ? 'text-xs sm:text-sm uppercase font-medium tracking-[0.12em] text-[#FAF8F5] group-hover:text-[#C5A059]'
                : 'text-xs sm:text-sm uppercase font-medium tracking-[0.12em] text-[#1C1C1C] group-hover:text-[#9E7D3B]'
            }`}
          >
            {displayTitle}
          </Link>
        </div>

        {/* Pricing Area */}
        <div className="mt-2.5 flex flex-col items-center justify-center gap-1">
          <div className="flex items-baseline justify-center gap-2">
            {price && (
              <span
                className={`tracking-wide ${
                  isExclusive
                    ? 'font-serif text-base sm:text-lg font-semibold text-[#C5A059]'
                    : isPremium
                    ? 'text-sm sm:text-base font-semibold text-[#C5A059]'
                    : 'text-sm sm:text-base font-semibold text-[#111111]'
                }`}
              >
                {formatRupiah(price)}
              </span>
            )}
            {isOnSale && compareAtPrice && (
              <span
                className={`text-xs sm:text-sm line-through ${
                  isExclusive ? 'text-white/40' : isPremium ? 'text-[#D5C8B8]/60' : 'text-[#8C827A]'
                }`}
              >
                {formatRupiah(compareAtPrice)}
              </span>
            )}
          </div>
          {isPremium && (
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#D5B066] font-medium mt-0.5 opacity-90">
              Tenun Dobby &bull; Furing Hero
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
