import { CUSTOMER_UPDATE_MUTATION } from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Profil Pelanggan — Butik Batik Smile' }];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  await context.customerAccount.handleAuthStatus();
  return {};
}

/**
 * @param {Route.ActionArgs}
 */
export async function action({ request, context }) {
  const { customerAccount } = context;

  if (request.method !== 'PUT') {
    return data({ error: 'Method not allowed' }, { status: 405 });
  }

  const form = await request.formData();

  try {
    const customer = {};
    const validInputKeys = ['firstName', 'lastName'];
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key] = value;
      }
    }

    const { data: mutationData, errors } = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
          language: customerAccount.i18n.language,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!mutationData?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return {
      error: null,
      customer: mutationData.customerUpdate.customer,
    };
  } catch (error) {
    return data(
      { error: error.message, customer: null },
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfile() {
  const account = useOutletContext();
  const { state } = useNavigation();
  /** @type {ActionReturnData} */
  const actionData = useActionData();
  const customer = actionData?.customer ?? account?.customer;

  return (
    <div className="max-w-xl">
      <div className="border-b border-[#E2DFD8] pb-4 mb-8">
        <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-1">
          DATA PRIBADI
        </span>
        <h2 className="font-serif text-2xl font-normal text-[#111111]">
          Informasi Akun Anda
        </h2>
      </div>

      <Form method="PUT" className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="text-[10px] uppercase font-semibold tracking-[0.16em] text-[#111111] block mb-2"
            >
              NAMA DEPAN
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Nama depan"
              defaultValue={customer?.firstName ?? ''}
              minLength={2}
              className="w-full text-base sm:text-xs p-3 bg-[#FAF8F5] border border-[#E2DFD8] focus:border-[#111111] focus:bg-white outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="text-[10px] uppercase font-semibold tracking-[0.16em] text-[#111111] block mb-2"
            >
              NAMA BELAKANG
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Nama belakang"
              defaultValue={customer?.lastName ?? ''}
              minLength={2}
              className="w-full text-base sm:text-xs p-3 bg-[#FAF8F5] border border-[#E2DFD8] focus:border-[#111111] focus:bg-white outline-none transition-colors"
            />
          </div>
        </div>

        {actionData?.error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
            {actionData.error}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={state !== 'idle'}
            className="px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-[10px] uppercase font-semibold tracking-[0.18em] transition-colors cursor-pointer disabled:bg-[#A69F96]"
          >
            {state !== 'idle' ? 'MENYIMPAN PERUBAHAN...' : 'SIMPAN PERUBAHAN →'}
          </button>
        </div>
      </Form>
    </div>
  );
}

/**
 * @typedef {{
 *   error: string | null;
 *   customer: CustomerFragment | null;
 * }} ActionResponse
 */

/** @typedef {import('customer-accountapi.generated').CustomerFragment} CustomerFragment */
/** @typedef {import('@shopify/hydrogen/customer-account-api-types').CustomerUpdateInput} CustomerUpdateInput */
/** @typedef {import('./+types/account.profile').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
/** @typedef {ReturnType<typeof useActionData<typeof action>>} ActionReturnData */
