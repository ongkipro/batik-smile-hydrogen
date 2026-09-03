import React, { useId } from 'react';
import { CartForm } from '@shopify/hydrogen';
import { formatRupiah } from '~/lib/currency';

/**
 * Architectural Quiet Luxury Cart Summary Component
 * Zero-radius design with authentic Indonesian terminology and clean Rupiah formatting.
 *
 * @param {CartSummaryProps}
 */
export function CartSummary({ cart, layout: _layout }) {
  const summaryId = useId();
  const discountsHeadingId = useId();
  const discountCodeInputId = useId();

  return (
    <div aria-labelledby={summaryId} className="w-full">
      {/* Header */}
      <div className="pb-4 mb-5 border-b border-[#E2DFD8]">
        <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-1">
          IKHTISAR BELANJA
        </span>
        <h3 id={summaryId} className="font-serif text-xl sm:text-2xl font-normal text-[#111111]">
          Ringkasan Pesanan
        </h3>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-3 text-xs mb-6">
        <div className="flex justify-between items-baseline py-1 text-[#5A5550]">
          <span className="uppercase tracking-wider text-[10px]">Subtotal Busana</span>
          <span className="text-sm font-semibold text-[#111111]">
            {cart?.cost?.subtotalAmount?.amount
              ? formatRupiah(cart.cost.subtotalAmount)
              : '-'}
          </span>
        </div>

        <div className="flex justify-between items-baseline py-1 text-[#5A5550]">
          <span className="uppercase tracking-wider text-[10px]">Estimasi Ongkos Kirim</span>
          <span className="text-xs text-[#7C3F1D] font-medium">
            Dihitung saat Checkout
          </span>
        </div>

        <div className="flex justify-between items-baseline py-1 text-[#5A5550]">
          <span className="uppercase tracking-wider text-[10px]">Proteksi & Asuransi Paket</span>
          <span className="text-xs text-[#9E7D3B] font-semibold">
            GRATIS
          </span>
        </div>

        {/* Hairline Divider */}
        <div className="pt-3 border-t border-[#E2DFD8]" />

        {/* Total */}
        <div className="flex justify-between items-baseline pt-1">
          <span className="text-xs uppercase tracking-[0.18em] font-bold text-[#111111]">
            Total Pembayaran
          </span>
          <span className="font-serif text-xl sm:text-2xl font-normal text-[#111111]">
            {cart?.cost?.totalAmount?.amount
              ? formatRupiah(cart.cost.totalAmount)
              : '-'}
          </span>
        </div>
      </div>

      {/* Voucher / Promo Code Input */}
      <CartDiscounts
        discountCodes={cart?.discountCodes}
        discountsHeadingId={discountsHeadingId}
        discountCodeInputId={discountCodeInputId}
      />

      {/* Checkout Action Button */}
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

/**
 * @param {{checkoutUrl?: string}}
 */
function CartCheckoutActions({ checkoutUrl }) {
  let resolvedCheckoutUrl = checkoutUrl;
  try {
    const url = new URL(checkoutUrl);
    if (url.hostname.includes('myshopify.com')) {
      url.hostname = 'checkout.batiksmile.com';
      resolvedCheckoutUrl = url.toString();
    }
  } catch {
    // Keep original if parsing fails
  }

  return (
    <div className="mt-6 pt-5 border-t border-[#E2DFD8]">
      <a
        href={resolvedCheckoutUrl}
        target="_self"
        className="w-full block text-center py-4 px-6 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] transition-all shadow-sm cursor-pointer"
      >
        LANJUT KE PEMBAYARAN RESMI &rarr;
      </a>
      <div className="flex items-center justify-center gap-2 mt-3 text-[9px] text-[#5A5550] tracking-[0.14em] uppercase">
        <span className="w-1.5 h-1.5 bg-[#C5A059] shrink-0" />
        <span>Pembayaran Terenkripsi 256-Bit Resmi Shopify</span>
      </div>
      <div className="mt-4 pt-3 border-t border-[#E2DFD8]/80 text-center">
        <span className="text-[8px] uppercase tracking-[0.2em] text-[#888888] font-semibold block mb-1">
          METODE PEMBAYARAN RESMI TERSEDIA
        </span>
        <p className="text-[9px] uppercase tracking-[0.14em] text-[#777777] font-medium">
          QRIS &bull; BCA &bull; Mandiri &bull; BNI &bull; BRI &bull; Visa &bull; Mastercard
        </p>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: CartApiQueryFragment['discountCodes'];
 *   discountsHeadingId: string;
 *   discountCodeInputId: string;
 * }}
 */
function CartDiscounts({
  discountCodes,
  discountsHeadingId,
  discountCodeInputId,
}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || [];

  return (
    <div className="my-5 pt-4 border-t border-[#E2DFD8]/80">
      <span
        id={discountsHeadingId}
        className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-2"
      >
        KODE PROMO / VOUCHER BUTIK
      </span>

      {/* Applied voucher tags */}
      {codes.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {codes.map((code) => (
            <div
              key={code}
              className="flex items-center justify-between py-1.5 px-3 bg-white border border-[#C5A059]/40 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#7C3F1D]">VOUCHER:</span>
                <code className="text-xs font-mono font-bold text-[#111111]">{code}</code>
              </div>
              <UpdateDiscountForm>
                <button
                  type="submit"
                  aria-label="Hapus kode promo"
                  className="text-[10px] uppercase tracking-wider text-[#A69F96] hover:text-red-700 transition-colors cursor-pointer"
                >
                  Hapus &times;
                </button>
              </UpdateDiscountForm>
            </div>
          ))}
        </div>
      )}

      {/* Input form */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex items-stretch border border-[#E2DFD8] bg-white focus-within:border-[#111111] transition-colors">
          <label htmlFor={discountCodeInputId} className="sr-only">
            Kode Promo
          </label>
          <input
            id={discountCodeInputId}
            type="text"
            name="discountCode"
            placeholder="Masukkan kode voucher..."
            className="w-full px-3 py-2 text-base sm:text-xs text-[#111111] placeholder:text-[#888888] bg-transparent focus:outline-hidden"
          />
          <button
            type="submit"
            aria-label="Gunakan kode promo"
            className="px-4 py-2 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-[10px] uppercase font-semibold tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            GUNAKAN
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
