import { CartForm, Image } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from 'react-router';
import { ProductPrice } from './ProductPrice';
import { useAside } from './Aside';

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 *   childrenMap: LineItemChildrenMap;
 * }}
 */
export function CartLineItem({ layout, line, childrenMap }) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  return (
    <li key={id} className="py-5 border-b border-[#E2DFD8] first:pt-0 last:border-b-0">
      <div className="flex gap-4 items-start">
        {image && (
          <div className="w-20 h-24 sm:w-24 sm:h-30 shrink-0 bg-[#111111] overflow-hidden border border-[#E2DFD8]">
            <Image
              alt={title}
              aspectRatio="4/5"
              data={image}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-0.5">
              BATIK SMILE
            </span>
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === 'aside') {
                  close();
                }
              }}
              className="font-serif text-sm sm:text-base font-normal text-[#111111] hover:text-[#C5A059] transition-colors leading-snug line-clamp-2"
            >
              {product.title}
            </Link>

            <div className="mt-1 text-xs font-semibold text-[#111111]">
              <ProductPrice price={line?.cost?.totalAmount} />
            </div>

            {selectedOptions?.length > 0 && (
              <ul className="mt-1.5 space-y-0.5">
                {selectedOptions.map((option) => (
                  <li key={option.name} className="text-[10px] text-[#5A5550] uppercase tracking-wider">
                    {option.name}: <span className="font-semibold text-[#111111]">{option.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-3 pt-2">
            <CartLineQuantity line={line} />
          </div>
        </div>
      </div>

      {lineItemChildren ? (
        <div className="mt-3 pl-6 border-l border-[#C5A059]/40">
          <p id={childrenLabelId} className="sr-only">
            Line items with {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} className="space-y-2">
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
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
 * @param {{line: CartLine}}
 */
function CartLineQuantity({ line }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Quantity Stepper (0px Radius) */}
      <div className="flex items-center border border-[#E2DFD8] bg-white">
        <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
          <button
            aria-label="Kurangi jumlah"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
            className="w-7 h-7 flex items-center justify-center text-xs text-[#111111] hover:bg-[#FAF8F5] disabled:opacity-30 cursor-pointer"
          >
            &#8722;
          </button>
        </CartLineUpdateButton>

        <span className="w-8 text-center text-xs font-semibold text-[#111111]">
          {quantity}
        </span>

        <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
          <button
            aria-label="Tambah jumlah"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
            className="w-7 h-7 flex items-center justify-center text-xs text-[#111111] hover:bg-[#FAF8F5] disabled:opacity-30 cursor-pointer"
          >
            &#43;
          </button>
        </CartLineUpdateButton>
      </div>

      {/* Remove Button */}
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
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
        className="text-[10px] uppercase tracking-wider text-[#A69F96] hover:text-red-600 transition-colors cursor-pointer"
      >
        HAPUS
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
