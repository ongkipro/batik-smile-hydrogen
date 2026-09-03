import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';

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
export function ProductItem({ product, loading = 'lazy', badge }) {
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

  return (
    <div className="group relative flex flex-col justify-between h-full bg-[#FAF8F5] transition-all duration-300">
      {/* 4:5 Vertical Portrait Image Container */}
      <Link
        to={variantUrl}
        prefetch="intent"
        className="relative block w-full aspect-[4/5] overflow-hidden bg-[#EFECE6] border border-[#E2DFD8]/80 group-hover:border-[#C5A059]/50 transition-colors"
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

        {/* Top Badges (Sale / Tulis / Bespoke) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {badge && (
            <span className="bg-[#111111]/90 text-[#C5A059] text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 font-medium border border-[#C5A059]/30">
              {badge}
            </span>
          )}
          {isOnSale && (
            <span className="bg-[#7C3F1D] text-white text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 font-medium">
              SALE
            </span>
          )}
        </div>

        {/* Quick View / Add to Bag Overlay (Slide from bottom) */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-[#111111]/80 via-[#111111]/40 to-transparent">
          <div className="w-full py-2.5 px-4 bg-[#FFFFFF] text-[#111111] text-[10px] font-bold uppercase tracking-[0.18em] text-center shadow-md hover:bg-[#C5A059] hover:text-white transition-colors">
            LIHAT DETAIL
          </div>
        </div>
      </Link>

      {/* Typography & Price Metadata */}
      <div className="pt-3.5 pb-2 flex flex-col flex-grow justify-between">
        <div>
          <Link
            to={variantUrl}
            prefetch="intent"
            className="block text-[11px] sm:text-xs uppercase font-medium tracking-[0.14em] text-[#1C1C1C] hover:text-[#9E7D3B] transition-colors line-clamp-1"
          >
            {displayTitle}
          </Link>

          {product.productType && (
            <span className="block text-[9px] uppercase tracking-[0.2em] text-[#7C3F1D] mt-0.5">
              {product.productType}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          {price && (
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#111111]">
              <Money data={price} />
            </span>
          )}
          {isOnSale && compareAtPrice && (
            <span className="text-[10px] line-through text-[#5A5550]">
              <Money data={compareAtPrice} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
