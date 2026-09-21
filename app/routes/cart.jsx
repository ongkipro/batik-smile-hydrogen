import { useLoaderData, data, Link } from 'react-router';
import { CartForm } from '@shopify/hydrogen';
import { CartMain } from '~/components/CartMain';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generateCartMeta } from '~/lib/seo';
import { resolveCheckoutUrl } from '~/lib/checkout';
import { NotFoundView } from '~/components/NotFoundView';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return generateCartMeta();
};

/**
 * @type {HeadersFunction}
 */
export const headers = ({ actionHeaders }) => actionHeaders;

/**
 * @param {Route.ActionArgs}
 */
export async function action({ request, context }) {
  const { cart } = context;
  const formData = await request.formData();
  const { action: cartAction, inputs } = CartForm.getFormInput(formData);

  if (!cartAction) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  switch (cartAction) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];
      discountCodes.push(...inputs.discountCodes);
      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesAdd: {
      const formGiftCardCode = inputs.giftCardCode;
      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];
      result = await cart.addGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesRemove: {
      const appliedGiftCardIds = inputs.giftCardCodes;
      result = await cart.removeGiftCardCodes(appliedGiftCardIds);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${cartAction} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const actionResponseHeaders = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const { cart: cartResult, errors, warnings } = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    const targetUrl =
      redirectTo === 'checkout'
        ? resolveCheckoutUrl(
            cartResult?.checkoutUrl,
            context.env?.PUBLIC_CHECKOUT_DOMAIN,
          )
        : redirectTo;
    actionResponseHeaders.set('Location', targetUrl);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    { status, headers: actionResponseHeaders },
  );
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  const { cart } = context;
  return await cart.get();
}

export default function Cart() {
  /** @type {LoaderReturnData} */
  const cart = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-8 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'TAS BELANJA' }]} className="mb-6 sm:mb-8" />

        {/* Classic Shopify Cart Header (Only rendered when items exist) */}
        {Boolean(cart?.totalQuantity) && (
          <div className="flex flex-wrap items-end justify-between gap-4 pb-5 mb-8 border-b border-[#111111]">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-1">
                PESANAN BUTIK RESMI
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-[#111111]">
                Tas Belanja ({cart.totalQuantity})
              </h1>
            </div>
            <Link
              to="/collections/all"
              className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#111111] hover:text-[#C5A059] transition-colors pb-1 inline-flex items-center gap-1.5"
            >
              <span>Lanjutkan Belanja</span>
              <span>&rarr;</span>
            </Link>
          </div>
        )}

        {/* Cart Main 2-Column Layout */}
        <div className="mb-8">
          <CartMain layout="page" cart={cart} />
        </div>

        {/* Whispered Quiet Luxury Assurance Line (Zero Box, Zero Frame) */}
        <div className="pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-[#E2DFD8] text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#777777]">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#C5A059]" />
              <span>Garansi Keaslian Butik 100%</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#C5A059]" />
              <span>Bebas Penyesuaian Ukuran</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#C5A059]" />
              <span>Pengiriman Terproteksi Asuransi</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('react-router').HeadersFunction} HeadersFunction */
/** @typedef {import('./+types/cart').Route} Route */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
/** @typedef {ReturnType<typeof useActionData<typeof action>>} ActionReturnData */

export function ErrorBoundary() {
  return (
    <NotFoundView
      statusCode={404}
      title="Tas Belanja Tidak Ditemukan"
      message="Sesi tas belanja Anda telah berakhir atau belum dapat dimuat. Silakan kembali menjelajahi wastra pilihan butik."
    />
  );
}
