import React from 'react';
import { CartForm, Image } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from 'react-router';
import { useAside } from './Aside';
import { formatRupiah } from '~/lib/currency';

/**
 * Architectural Shopify Cart Line Item Component
 * Designed for seamless, un-boxed Quiet Luxury flow.
 * Proportioned with precision for both mobile (iPhone/Android) and desktop.
 *
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 *   childrenMap: LineItemChildrenMap;
 * }}
 */
export function CartLineItem({ layout, line, childrenMap }) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions, price: unitPrice } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  // Hide synthetic Shopify "Title: Default Title" option
  const realOptions =
    selectedOptions?.filter(
      (option) =>
        option.name !== 'Title' &&
        option.value !== 'Default Title' &&
        option.value?.trim() !== '',
    ) || [];

  return (
    <li key={id} className="py-4 sm:py-5 border-b border-[#E2DFD8] first:pt-2 last:border-b-0">
      <div className="flex gap-3 sm:gap-4 items-start">
        {/* 4:5 Vertical Portrait Thumbnail */}
        {image && (
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') close();
            }}
            className="w-20 sm:w-24 aspect-[4/5] shrink-0 bg-[#111111] overflow-hidden group block"
          >
            <Image
              alt={title}
              aspectRatio="4/5"
              data={image}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        )}

        {/* Product Details & Stepper Row */}
        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-0.5">
              BATIK SMILE
            </span>
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === 'aside') close();
              }}
              className="font-serif text-base sm:text-lg font-normal text-[#111111] hover:text-[#C5A059] transition-colors leading-snug line-clamp-2 block mb-1"
            >
              {product.title}
            </Link>

            {/* Variant specifications (Size, Color/Pattern) - Hidden if Default Title or empty */}
            {realOptions.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-[#5A5550] uppercase tracking-wider mb-1">
                {realOptions.map((option) => (
                  <span key={option.name}>
                    {option.name}: <strong className="text-[#111111]">{option.value}</strong>
                  </span>
                ))}
              </div>
            )}

            {/* Unit Price */}
            <div className="text-xs sm:text-sm text-[#777777]">
              {unitPrice ? formatRupiah(unitPrice) : '-'}
            </div>
          </div>

          {/* Stepper + Subtotal Row */}
          <div className="mt-2.5 pt-2 border-t border-[#E2DFD8]/60 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <CartLineQuantity line={line} />
              <CartLineRemoveButton lineIds={[id]} disabled={!!line.isOptimistic} />
            </div>

            <div className="text-right">
              <span className="font-serif text-base sm:text-lg font-semibold text-[#111111]">
                {line?.cost?.totalAmount ? formatRupiah(line.cost.totalAmount) : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Children Bundle Components */}
      {lineItemChildren ? (
        <div className="mt-2.5 pl-5 border-l border-[#C5A059]/40">
          <p id={childrenLabelId} className="sr-only">
            Komponen pesanan {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} className="space-y-1.5">
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                key={childLine.id}
                childrenMap={childrenMap}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Compact Zero-Radius Stepper
 *
 * @param {{
 *   line: CartLine;
 * }}
 */
function CartLineQuantity({ line }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center border border-[#E2DFD8] bg-white">
      <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
        <button
          aria-label="Kurangi jumlah"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
          className="w-8 h-8 flex items-center justify-center text-sm text-[#111111] hover:bg-[#FAF8F5] disabled:opacity-30 cursor-pointer transition-colors"
        >
          &#8722;
        </button>
      </CartLineUpdateButton>

      <span className="w-8 text-center text-xs sm:text-sm font-semibold text-[#111111]">
        {quantity}
      </span>

      <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
        <button
          aria-label="Tambah jumlah"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
          className="w-8 h-8 flex items-center justify-center text-sm text-[#111111] hover:bg-[#FAF8F5] disabled:opacity-30 cursor-pointer transition-colors"
        >
          &#43;
        </button>
      </CartLineUpdateButton>
    </div>
  );
}

/**
 * Whispered Remove Button
 *
 * @param {{
 *   lineIds: string[];
 *   disabled: boolean;
 * }}
 */
function CartLineRemoveButton({ lineIds, disabled }) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <button
        disabled={disabled}
        type="submit"
        className="text-[10px] uppercase tracking-wider text-[#888888] hover:text-[#7C3F1D] transition-colors cursor-pointer underline underline-offset-2 p-1"
      >
        Hapus
      </button>
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({ children, lines }) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}

function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('~/components/CartMain').LineItemChildrenMap} LineItemChildrenMap */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').CartLineFragment} CartLineFragment */
