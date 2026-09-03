import { useLoaderData, data, NavLink } from 'react-router';
import { CartForm } from '@shopify/hydrogen';
import { CartMain } from '~/components/CartMain';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Tas Belanja — Butik Batik Smile Nusantara' },
    {
      name: 'description',
      content: 'Tinjau pesanan busana batik dan sarimbit keluarga Anda sebelum melanjutkan ke pembayaran resmi Shopify.',
    },
  ];
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
    actionResponseHeaders.set('Location', redirectTo);
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
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E7D3B]">
            BERANDA
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold">TAS BELANJA</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            PESANAN BUTIK ANDA
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-[#111111] mb-2">
            Tas Belanja Busana Batik
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* Cart Main Component Container (0px Radius) */}
        <div className="bg-white p-6 sm:p-10 border border-[#E2DFD8] shadow-sm mb-12">
          <CartMain layout="page" cart={cart} />
        </div>

        {/* Reassurance Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-[#5A5550]">
          <div className="p-4 bg-white border border-[#E2DFD8]">
            <span className="text-lg block mb-1">📦</span>
            <strong className="block text-[#111111] mb-0.5">Gratis Ongkir se-Indonesia</strong>
            <p className="text-[10px] text-[#A69F96]">Pengiriman aman bergaransi ke seluruh kota.</p>
          </div>
          <div className="p-4 bg-white border border-[#E2DFD8]">
            <span className="text-lg block mb-1">✨</span>
            <strong className="block text-[#111111] mb-0.5">Garansi Bebas Tukar Size 100%</strong>
            <p className="text-[10px] text-[#A69F96]">Jika ukuran kurang pas, kami tukar dengan senang hati.</p>
          </div>
          <div className="p-4 bg-white border border-[#E2DFD8]">
            <span className="text-lg block mb-1">🔒</span>
            <strong className="block text-[#111111] mb-0.5">Pembayaran Resmi Terenkripsi</strong>
            <p className="text-[10px] text-[#A69F96]">Keamanan data pelanggan terjamin standar Shopify.</p>
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
