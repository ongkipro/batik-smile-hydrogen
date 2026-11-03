import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import { CUSTOMER_DETAILS_QUERY } from '~/graphql/customer-account/CustomerDetailsQuery';
import { Breadcrumb } from '~/components/Breadcrumb';

export function shouldRevalidate() {
  return true;
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  const { customerAccount } = context;
  const { data, errors } = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    { customer: data.customer },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  /** @type {LoaderReturnData} */
  const { customer } = useLoaderData();

  const customerName = customer?.firstName
    ? `${customer.firstName} ${customer?.lastName || ''}`.trim()
    : 'Pelanggan Butik';

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'AKUN SAYA' }]} />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            PORTAL PELANGGAN BUTIK
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-[#111111] mb-2">
            Selamat Datang, {customerName}
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* Tab Navigation Menu (0px Radius) */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#E2DFD8] bg-white px-6 py-2 shadow-sm mb-10 gap-4">
          <AccountMenu />
          <Logout />
        </div>

        {/* Child Content Box */}
        <div className="bg-white p-6 sm:p-10 border border-[#E2DFD8] shadow-sm">
          <Outlet context={{ customer }} />
        </div>
      </div>
    </div>
  );
}

function AccountMenu() {
  const navClass = ({ isActive }) =>
    `py-3 px-4 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all border-b-2 -mb-2.5 ${
      isActive
        ? 'border-[#C5A059] text-[#111111]'
        : 'border-transparent text-[#5A5550] hover:text-[#111111]'
    }`;

  return (
    <nav className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto" role="navigation">
      <NavLink to="/account/orders" className={navClass}>
        RIWAYAT PESANAN
      </NavLink>
      <NavLink to="/account/profile" className={navClass}>
        PROFIL SAYA
      </NavLink>
      <NavLink to="/account/addresses" className={navClass}>
        BUKU ALAMAT
      </NavLink>
      <NavLink to="/pages/member" className={navClass}>
        MEMBER BATIK SMILE
      </NavLink>
    </nav>
  );
}

function Logout() {
  return (
    <Form className="account-logout" method="POST" action="/account/logout">
      <button
        type="submit"
        className="px-4 py-2 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer"
      >
        KELUAR (SIGN OUT)
      </button>
    </Form>
  );
}

/** @typedef {import('./+types/account').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
