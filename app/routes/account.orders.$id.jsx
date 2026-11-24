import { redirect, useLoaderData, Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { CUSTOMER_ORDER_QUERY } from '~/graphql/customer-account/CustomerOrderQuery';
import { BoutiqueMoney } from '~/lib/currency';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [{ title: `Pesanan ${data?.order?.name} — Butik Batik Smile` }];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ params, context }) {
  const { customerAccount } = context;
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const { data, errors } = await customerAccount.query(CUSTOMER_ORDER_QUERY, {
    variables: {
      orderId,
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const { order } = data;
  const lineItems = order.lineItems.nodes;
  const discountApplications = order.discountApplications.nodes;
  const fulfillmentStatus = order.fulfillments.nodes[0]?.status ?? 'Sedang Diproses';

  const firstDiscount = discountApplications[0]?.value;
  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' ? firstDiscount : null;
  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue'
      ? firstDiscount.percentage
      : null;

  return {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  };
}

export default function OrderRoute() {
  /** @type {LoaderReturnData} */
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData();

  return (
    <div>
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/account/orders"
          className="text-xs uppercase font-semibold tracking-[0.18em] text-[#5A5550] hover:text-[#111111] transition-colors"
        >
          &larr; KEMBALI KE RIWAYAT PESANAN
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-[#E2DFD8] pb-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-1">
            DETAIL TRANSAKSI
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
            Pesanan #{order.name}
          </h2>
          <p className="text-xs text-[#A69F96] mt-1">
            Dipesan pada{' '}
            {new Date(order.processedAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 bg-[#FAF8F5] border border-[#E2DFD8] text-[#111111] uppercase font-medium tracking-wider">
            {order.financialStatus}
          </span>
          <span className="text-xs px-3 py-1 bg-[#FAF8F5] border border-[#C5A059] text-[#9E7D3B] uppercase font-semibold tracking-wider">
            {fulfillmentStatus}
          </span>
        </div>
      </div>

      {/* Order Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Line Items Table */}
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#E2DFD8]">
            <thead className="bg-[#FAF8F5] border-b border-[#E2DFD8] text-xs uppercase tracking-wider text-[#5A5550]">
              <tr>
                <th className="py-3 px-4 font-semibold">Produk Batik</th>
                <th className="py-3 px-4 font-semibold text-center">Jumlah</th>
                <th className="py-3 px-4 font-semibold text-right">Harga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DFD8]">
              {lineItems.map((lineItem, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F5]/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {lineItem?.image && (
                        <div className="w-14 h-16 bg-[#111111] overflow-hidden shrink-0">
                          <Image
                            data={lineItem.image}
                            width={56}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-serif text-sm font-normal text-[#111111]">
                          {lineItem.title}
                        </p>
                        {lineItem.variantTitle && (
                          <span className="text-xs text-[#A69F96] block uppercase tracking-wider">
                            Ukuran/Varian: {lineItem.variantTitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-medium text-[#111111]">
                    {lineItem.quantity}
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-[#111111]">
                    <BoutiqueMoney data={lineItem.price} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#FAF8F5] border-t border-[#E2DFD8] text-xs">
              {discountValue && (
                <tr>
                  <td colSpan={2} className="py-2.5 px-4 text-[#9E7D3B]">
                    Diskon Butik
                  </td>
                  <td className="py-2.5 px-4 text-right text-[#9E7D3B] font-semibold">
                    {discountPercentage ? (
                      <span>-{discountPercentage}%</span>
                    ) : (
                      <BoutiqueMoney data={discountValue} />
                    )}
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="py-2.5 px-4 text-[#5A5550]">
                  Subtotal
                </td>
                <td className="py-2.5 px-4 text-right font-medium text-[#111111]">
                  <BoutiqueMoney data={order.subtotal} />
                </td>
              </tr>
              <tr className="border-t border-[#E2DFD8] text-sm">
                <td colSpan={2} className="py-3 px-4 font-semibold text-[#111111]">
                  Total Pembayaran
                </td>
                <td className="py-3 px-4 text-right font-bold text-[#111111]">
                  <BoutiqueMoney data={order.totalPrice} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Shipping & Delivery Sidebar */}
        <div className="space-y-6">
          <div className="p-6 bg-[#FAF8F5] border border-[#E2DFD8]">
            <h4 className="text-xs uppercase font-semibold tracking-[0.18em] text-[#9E7D3B] mb-3">
              ALAMAT PENGIRIMAN
            </h4>
            {order?.shippingAddress ? (
              <div className="text-xs text-[#5A5550] leading-relaxed space-y-1">
                <strong className="block text-[#111111] font-medium">
                  {order.shippingAddress.name}
                </strong>
                {order.shippingAddress.formatted && (
                  <p>{order.shippingAddress.formatted}</p>
                )}
                {order.shippingAddress.formattedArea && (
                  <p>{order.shippingAddress.formattedArea}</p>
                )}
              </div>
            ) : (
              <p className="text-xs text-[#A69F96]">Tidak ada alamat tercatat</p>
            )}
          </div>

          {order.statusPageUrl && (
            <a
              target="_blank"
              href={order.statusPageUrl}
              rel="noreferrer"
              className="block w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-xs font-semibold uppercase tracking-[0.18em] text-center transition-colors"
            >
              LACAK STATUS PENGIRIMAN &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/account.orders.$id').Route} Route */
/** @typedef {import('customer-accountapi.generated').OrderLineItemFullFragment} OrderLineItemFullFragment */
/** @typedef {import('customer-accountapi.generated').OrderQuery} OrderQuery */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
