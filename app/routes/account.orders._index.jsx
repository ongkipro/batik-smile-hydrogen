import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';
import { useRef } from 'react';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import {
  buildOrderSearchQuery,
  parseOrderFilters,
  ORDER_FILTER_FIELDS,
} from '~/lib/orderFilters';
import { CUSTOMER_ORDERS_QUERY } from '~/graphql/customer-account/CustomerOrdersQuery';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Riwayat Pesanan — Butik Batik Smile Nusantara' }];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ request, context }) {
  const { customerAccount } = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const url = new URL(request.url);
  const filters = parseOrderFilters(url.searchParams);
  const query = buildOrderSearchQuery(filters);

  const { data, errors } = await customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables,
      query,
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return { customer: data.customer, filters };
}

export default function Orders() {
  /** @type {LoaderReturnData} */
  const { customer, filters } = useLoaderData();
  const { orders } = customer;

  return (
    <div>
      <div className="border-b border-[#E2DFD8] pb-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-1">
            DAFTAR TRANSAKSI
          </span>
          <h2 className="font-serif text-2xl font-normal text-[#111111]">
            Riwayat Pesanan Anda
          </h2>
        </div>
        <OrderSearchForm currentFilters={filters} />
      </div>

      <OrdersTable orders={orders} filters={filters} />
    </div>
  );
}

/**
 * @param {{
 *   orders: CustomerOrdersFragment['orders'];
 *   filters: OrderFilterParams;
 * }}
 */
function OrdersTable({ orders, filters }) {
  const hasFilters = !!(filters.name || filters.confirmationNumber);

  return (
    <div aria-live="polite">
      {orders?.nodes.length ? (
        <PaginatedResourceSection connection={orders} resourcesClassName="space-y-4">
          {({ node: order }) => <OrderItem key={order.id} order={order} />}
        </PaginatedResourceSection>
      ) : (
        <EmptyOrders hasFilters={hasFilters} />
      )}
    </div>
  );
}

/**
 * @param {{hasFilters?: boolean}}
 */
function EmptyOrders({ hasFilters = false }) {
  return (
    <div className="text-center py-12 px-4 bg-[#FAF8F5] border border-[#E2DFD8]">
      <span className="text-2xl block mb-2">🛍️</span>
      <h3 className="font-serif text-lg text-[#111111] mb-1">
        {hasFilters ? 'Tidak Ditemukan Pesanan yang Sesuai' : 'Belum Ada Riwayat Pesanan'}
      </h3>
      <p className="text-xs text-[#5A5550] font-light max-w-sm mx-auto mb-6 leading-relaxed">
        {hasFilters
          ? 'Coba hapus filter pencarian nomor pesanan Anda.'
          : 'Pilih koleksi sarimbit keluarga atau busana batik favorit Anda sekarang.'}
      </p>
      <Link
        to={hasFilters ? '/account/orders' : '/collections/sarimbit-exclusive'}
        className="inline-block px-6 py-3 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
      >
        {hasFilters ? 'HAPUS FILTER' : 'MULAI BELANJA &rarr;'}
      </Link>
    </div>
  );
}

/**
 * @param {{
 *   currentFilters: OrderFilterParams;
 * }}
 */
function OrderSearchForm({ currentFilters }) {
  const [, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSearching =
    navigation.state !== 'idle' &&
    navigation.location?.pathname?.includes('orders');
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    const name = formData.get(ORDER_FILTER_FIELDS.NAME)?.toString().trim();
    if (name) params.set(ORDER_FILTER_FIELDS.NAME, name);

    setSearchParams(params);
  };

  const hasFilters = !!currentFilters.name;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        name={ORDER_FILTER_FIELDS.NAME}
        placeholder="Cari no. pesanan..."
        defaultValue={currentFilters.name || ''}
        className="text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E2DFD8] focus:border-[#111111] outline-none w-44"
      />
      <button
        type="submit"
        disabled={isSearching}
        className="px-4 py-2 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-sm"
      >
        {isSearching ? '...' : 'CARI'}
      </button>
      {hasFilters && (
        <button
          type="button"
          onClick={() => {
            setSearchParams(new URLSearchParams());
            formRef.current?.reset();
          }}
          className="text-xs text-[#5A5550] hover:text-[#111111] underline"
        >
          Reset
        </button>
      )}
    </form>
  );
}

/**
 * @param {{order: OrderItemFragment}}
 */
function OrderItem({ order }) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;

  return (
    <div className="p-6 bg-white border border-[#E2DFD8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#111111] transition-colors">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <Link
            to={`/account/orders/${btoa(order.id)}`}
            className="font-serif text-lg font-normal text-[#111111] hover:text-[#C5A059] transition-colors"
          >
            Pesanan #{order.number}
          </Link>
          <span className="text-[9px] px-2 py-0.5 bg-[#FAF8F5] border border-[#E2DFD8] text-[#5A5550] uppercase tracking-wider">
            {order.financialStatus}
          </span>
          {fulfillmentStatus && (
            <span className="text-[9px] px-2 py-0.5 bg-[#FAF8F5] border border-[#C5A059] text-[#9E7D3B] uppercase tracking-wider">
              {fulfillmentStatus}
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#A69F96]">
          {new Date(order.processedAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-[#A69F96] block">Total</span>
          <span className="text-sm font-semibold text-[#111111]">
            <Money data={order.totalPrice} />
          </span>
        </div>

        <Link
          to={`/account/orders/${btoa(order.id)}`}
          className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#111111] text-[#111111] hover:text-white border border-[#E2DFD8] text-[10px] uppercase font-semibold tracking-[0.16em] transition-colors whitespace-nowrap"
        >
          DETAIL &rarr;
        </Link>
      </div>
    </div>
  );
}

/**
 * @typedef {{
 *   customer: CustomerOrdersFragment;
 *   filters: OrderFilterParams;
 * }} OrdersLoaderData
 */

/** @typedef {import('./+types/account.orders._index').Route} Route */
/** @typedef {import('~/lib/orderFilters').OrderFilterParams} OrderFilterParams */
/** @typedef {import('customer-accountapi.generated').CustomerOrdersFragment} CustomerOrdersFragment */
/** @typedef {import('customer-accountapi.generated').OrderItemFragment} OrderItemFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
