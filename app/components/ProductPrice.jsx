import { formatRupiah } from '~/lib/currency';

/**
 * @param {{
 *   price?: MoneyV2;
 *   compareAtPrice?: MoneyV2 | null;
 * }}
 */
export function ProductPrice({ price, compareAtPrice }) {
  return (
    <div aria-label="Price" className="product-price flex items-baseline gap-2 font-serif" role="group">
      {compareAtPrice ? (
        <div className="flex items-baseline gap-2">
          {price ? (
            <span className="text-[#111111] font-normal">
              {formatRupiah(price)}
            </span>
          ) : null}
          <s className="text-xs text-[#A69F96] font-light line-through">
            {formatRupiah(compareAtPrice)}
          </s>
        </div>
      ) : price ? (
        <span className="text-[#111111] font-normal">
          {formatRupiah(price)}
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').MoneyV2} MoneyV2 */
