import React, { useId } from 'react';
import { CartForm } from '@shopify/hydrogen';
import { formatRupiah } from '~/lib/currency';
import { resolveCheckoutUrl } from '~/lib/checkout';

/**
 * Architectural Quiet Luxury Cart Summary Component
 * Zero-radius design with authentic Indonesian terminology and clean Rupiah formatting.
 *
 * @param {CartSummaryProps}
 */
export function CartSummary({ cart, layout }) {
  const summaryId = useId();
  const discountCodeInputId = useId();
  const isPage = layout === 'page';

  return (
    <div aria-labelledby={summaryId} className="w-full">
      {isPage && (
        <h3
          id={summaryId}
          className="font-serif text-lg sm:text-xl font-normal text-[#111111] pb-3 mb-4 border-b border-[#E2DFD8]"
        >
          Ringkasan Pesanan
        </h3>
      )}

      {/* Clean Minimalist Subtotal */}
      <div className="flex justify-between items-baseline mb-1.5">
        <span
          id={!isPage ? summaryId : undefined}
          className="text-xs uppercase tracking-[0.16em] font-semibold text-[#111111]"
        >
          Subtotal
        </span>
        <span className="font-serif text-lg sm:text-xl font-normal text-[#111111]">
          {cart?.cost?.subtotalAmount?.amount
            ? formatRupiah(cart.cost.subtotalAmount)
            : '-'}
        </span>
      </div>

      <p className="text-[11px] text-[#777777] font-light mb-4">
        Ongkos kirim &amp; kode promo dihitung saat checkout.
      </p>

      {/* Voucher / Promo Code Input (Only on dedicated /cart page or when a code is active) */}
      {(isPage || cart?.discountCodes?.some((d) => d.applicable)) && (
        <CartDiscounts
          discountCodes={cart?.discountCodes}
          discountCodeInputId={discountCodeInputId}
        />
      )}

      {/* Checkout Action Button */}
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

/**
 * @param {{checkoutUrl?: string}}
 */
function CartCheckoutActions({ checkoutUrl }) {
  const resolvedCheckoutUrl = resolveCheckoutUrl(checkoutUrl);

  return (
    <div>
      <a
        href={resolvedCheckoutUrl}
        target="_self"
        className="w-full block text-center py-3.5 px-6 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] transition-all cursor-pointer"
      >
        LANJUT KE PEMBAYARAN &rarr;
      </a>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: CartApiQueryFragment['discountCodes'];
 *   discountCodeInputId: string;
 * }}
 */
function CartDiscounts({ discountCodes, discountCodeInputId }) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || [];

  return (
    <div className="mb-4">
      {codes.length > 0 && (
        <div className="mb-2.5 space-y-1.5">
          {codes.map((code) => (
            <div
              key={code}
              className="flex items-center justify-between py-1.5 px-3 bg-[#FAF8F5] border border-[#E2DFD8] text-xs"
            >
              <code className="text-xs font-mono font-semibold text-[#111111]">{code}</code>
              <UpdateDiscountForm>
                <button
                  type="submit"
                  aria-label="Hapus kode promo"
                  className="text-[10px] uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  &times;
                </button>
              </UpdateDiscountForm>
            </div>
          ))}
        </div>
      )}

      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex items-stretch border border-[#E2DFD8] bg-white focus-within:border-[#111111] transition-colors">
          <label htmlFor={discountCodeInputId} className="sr-only">
            Kode Promo
          </label>
          <input
            id={discountCodeInputId}
            type="text"
            name="discountCode"
            placeholder="Kode voucher..."
            className="w-full px-3 py-2 text-base sm:text-xs text-[#111111] placeholder:text-[#888888] bg-transparent focus:outline-hidden"
          />
          <button
            type="submit"
            aria-label="Gunakan kode promo"
            className="px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#111111] text-[#111111] hover:text-white border-l border-[#E2DFD8] text-[10px] uppercase font-semibold tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            PAKAI
          </button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({ discountCodes, children }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
