import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { formatRupiah } from '~/lib/currency';

/**
 * Quiet Luxury Nusantara Product Card
 * Strict 4:5 Aspect Ratio, 0px Radius, Micro-tracking & Prestige Styling
 *
 * @param {{
 *   product: any;
 *   loading?: 'eager' | 'lazy';
 *   badge?: string;
 * }} props
 */
export function ProductItem({ product, loading = 'lazy', _badge, variant = 'default' }) {
  const variantUrl = useVariantUrl(product?.handle);

  if (!product) return null;
  const primaryImage = product.featuredImage;
  const secondaryImage = product.images?.nodes?.[1] || product.images?.edges?.[1]?.node;
  const price = product.priceRange?.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price?.amount || 0);

  // Title formatting: clean 3-word title or uppercase syntax
  const rawTitle = product.title || '';
  const displayTitle = rawTitle.toUpperCase();

  const isExclusive = variant === 'exclusive';
  const isPremium = variant === 'premium';

  return (
    <div
      className={`group relative flex flex-col justify-between h-full transition-all duration-300 ${
        isExclusive
          ? 'bg-[#181818] border border-[#C5A059]/35 hover:border-[#C5A059] p-3 sm:p-4 shadow-xl'
          : isPremium
          ? 'bg-white border border-[#C5A059]/40 hover:border-[#9E7D3B] p-3 sm:p-4 shadow-[0_4px_20px_rgba(197,160,89,0.10)] hover:shadow-[0_8px_25px_rgba(197,160,89,0.22)]'
          : 'bg-[#FAF8F5]'
      }`}
    >
      {/* 4:5 Vertical Portrait Image Container */}
      <Link
        to={variantUrl}
        prefetch="intent"
        className={`relative block w-full aspect-[4/5] overflow-hidden transition-colors ${
          isExclusive
            ? 'bg-[#111111] border border-[#C5A059]/30 group-hover:border-[#C5A059]'
            : isPremium
            ? 'bg-[#F8F5EF] border border-[#E2DFD8] group-hover:border-[#C5A059]/60'
            : 'bg-[#EFECE6] border border-[#E2DFD8]/80 group-hover:border-[#C5A059]/50'
        }`}
      >
        {primaryImage && (
          <Image
            data={primaryImage}
            alt={primaryImage.altText || rawTitle}
            aspectRatio="4/5"
            loading={loading}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Secondary image crossfade on hover if available */}
        {secondaryImage && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <Image
              data={secondaryImage}
              alt={secondaryImage.altText || rawTitle}
              aspectRatio="4/5"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
        )}

        {/* Quick View / Add to Bag Overlay (Slide from bottom) */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div
            className={`w-full py-2.5 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-center shadow-md transition-colors ${
              isExclusive
                ? 'bg-[#C5A059] text-[#111111] hover:bg-white'
                : isPremium
                ? 'bg-[#111111] text-[#FAF8F5] hover:bg-[#9E7D3B] hover:text-white'
                : 'bg-white text-[#111111] hover:bg-[#C5A059] hover:text-white'
            }`}
          >
            LIHAT DETAIL
          </div>
        </div>
      </Link>

      {/* Typography & Price Metadata (Centered for Precision) */}
      <div className="pt-4 pb-1 flex flex-col flex-grow justify-between text-center items-center">
        <div className="w-full">
          <Link
            to={variantUrl}
            prefetch="intent"
            className={`block transition-colors line-clamp-1 text-center ${
              isExclusive
                ? 'font-serif text-sm sm:text-base font-normal tracking-wide text-white hover:text-[#C5A059]'
                : isPremium
                ? 'text-[11px] sm:text-xs uppercase font-medium tracking-[0.14em] text-[#111111] hover:text-[#9E7D3B]'
                : 'text-[11px] sm:text-xs uppercase font-medium tracking-[0.14em] text-[#1C1C1C] hover:text-[#9E7D3B]'
            }`}
          >
            {displayTitle}
          </Link>

          {product.productType && (
            <span
              className={`block text-[9px] uppercase tracking-[0.22em] mt-1 text-center ${
                isExclusive
                  ? 'text-[#C5A059] font-medium'
                  : isPremium
                  ? 'text-[#9E7D3B] font-medium'
                  : 'text-[#7C3F1D]'
              }`}
            >
              {product.productType}
            </span>
          )}
        </div>

        <div className="mt-2.5 flex flex-col items-center justify-center gap-1.5 text-center">
          <div className="flex items-baseline justify-center gap-2">
            {price && (
              <span
                className={`tracking-wide ${
                  isExclusive
                    ? 'font-serif text-sm sm:text-base font-semibold text-[#C5A059]'
                    : isPremium
                    ? 'text-xs sm:text-sm font-semibold text-[#111111]'
                    : 'text-[11px] sm:text-xs font-semibold text-[#111111]'
                }`}
              >
                {formatRupiah(price)}
              </span>
            )}
            {isOnSale && compareAtPrice && (
              <span className="text-[10px] line-through text-[#5A5550]">
                {formatRupiah(compareAtPrice)}
              </span>
            )}
          </div>

          {/* Differentiated Craftsmanship Spec Pill */}
          {isExclusive && (
            <span className="border border-[#C5A059]/30 bg-[#111111] text-[#E2DFD8] text-[8px] sm:text-[9px] uppercase tracking-[0.16em] px-2.5 py-0.5 mt-1 font-light">
              SUTRA ATBM • PRADA EMAS
            </span>
          )}
          {isPremium && (
            <span className="bg-[#F3EDE2] border border-[#C5A059]/40 text-[#7C3F1D] text-[8px] sm:text-[9px] uppercase tracking-[0.16em] px-2.5 py-0.5 mt-1 font-medium">
              TENUN DOBBY • FURING HERO
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
