import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';
import {
  UPDATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  CREATE_ADDRESS_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: 'Addresses'}];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  await context.customerAccount.handleAuthStatus();

  return {};
}

/**
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  const {customerAccount} = context;

  try {
    const form = await request.formData();

    const addressId = form.has('addressId')
      ? String(form.get('addressId'))
      : null;
    if (!addressId) {
      throw new Error('You must provide an address id.');
    }

    // this will ensure redirecting to login never happen for mutatation
    const isLoggedIn = await customerAccount.isLoggedIn();
    if (!isLoggedIn) {
      return data(
        {error: {[addressId]: 'Unauthorized'}},
        {
          status: 401,
        },
      );
    }

    const defaultAddress = form.has('defaultAddress')
      ? String(form.get('defaultAddress')) === 'on'
      : false;
    const address = {};
    const keys = [
      'address1',
      'address2',
      'city',
      'company',
      'territoryCode',
      'firstName',
      'lastName',
      'phoneNumber',
      'zoneCode',
      'zip',
    ];

    for (const key of keys) {
      const value = form.get(key);
      if (typeof value === 'string') {
        address[key] = value;
      }
    }

    switch (request.method) {
      case 'POST': {
        // handle new address creation
        try {
          const {data, errors} = await customerAccount.mutate(
            CREATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                defaultAddress,
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressCreate?.userErrors?.length) {
            throw new Error(data?.customerAddressCreate?.userErrors[0].message);
          }

          if (!data?.customerAddressCreate?.customerAddress) {
            throw new Error('Customer address create failed.');
          }

          return {
            error: null,
            createdAddress: data?.customerAddressCreate?.customerAddress,
            defaultAddress,
          };
        } catch (error) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'PUT': {
        // handle address updates
        try {
          const {data, errors} = await customerAccount.mutate(
            UPDATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                addressId: decodeURIComponent(addressId),
                defaultAddress,
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressUpdate?.userErrors?.length) {
            throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
          }

          if (!data?.customerAddressUpdate?.customerAddress) {
            throw new Error('Customer address update failed.');
          }

          return {
            error: null,
            updatedAddress: address,
            defaultAddress,
          };
        } catch (error) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'DELETE': {
        // handles address deletion
        try {
          const {data, errors} = await customerAccount.mutate(
            DELETE_ADDRESS_MUTATION,
            {
              variables: {
                addressId: decodeURIComponent(addressId),
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressDelete?.userErrors?.length) {
            throw new Error(data?.customerAddressDelete?.userErrors[0].message);
          }

          if (!data?.customerAddressDelete?.deletedAddressId) {
            throw new Error('Customer address delete failed.');
          }

          return {error: null, deletedAddress: addressId};
        } catch (error) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      default: {
        return data(
          {error: {[addressId]: 'Method not allowed'}},
          {
            status: 405,
          },
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return data(
        {error: error.message},
        {
          status: 400,
        },
      );
    }
    return data(
      {error},
      {
        status: 400,
      },
    );
  }
}

export default function Addresses() {
  const { customer } = useOutletContext();
  const { defaultAddress, addresses } = customer;

  return (
    <div>
      <div className="border-b border-[#E2DFD8] pb-4 mb-8 flex items-center justify-between">
        <div>
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-1">
            BUKU ALAMAT
          </span>
          <h2 className="font-serif text-2xl font-normal text-[#111111]">
            Alamat Pengiriman Anda
          </h2>
        </div>
      </div>

      <div className="space-y-12">
        {/* Existing Addresses */}
        <div>
          <h3 className="text-xs uppercase font-semibold tracking-[0.18em] text-[#111111] mb-6">
            Daftar Alamat Tersimpan
          </h3>

          {!addresses.nodes.length ? (
            <div className="p-8 text-center bg-[#FAF8F5] border border-[#E2DFD8] text-xs text-[#5A5550]">
              Belum ada alamat tersimpan di akun Anda.
            </div>
          ) : (
            <ExistingAddresses
              addresses={addresses}
              defaultAddress={defaultAddress}
            />
          )}
        </div>

        {/* Add New Address Form */}
        <div className="pt-8 border-t border-[#E2DFD8]">
          <h3 className="text-xs uppercase font-semibold tracking-[0.18em] text-[#111111] mb-6">
            Tambah Alamat Baru
          </h3>
          <NewAddressForm key={addresses.nodes.length} />
        </div>
      </div>
    </div>
  );
}

function NewAddressForm() {
  const newAddress = {
    address1: '',
    address2: '',
    city: '',
    company: '',
    territoryCode: 'ID',
    firstName: '',
    id: 'new',
    lastName: '',
    phoneNumber: '',
    zoneCode: '',
    zip: '',
  };

  return (
    <AddressForm
      addressId={'NEW_ADDRESS_ID'}
      address={newAddress}
      defaultAddress={null}
    >
      {({ stateForMethod }) => (
        <div className="pt-2">
          <button
            disabled={stateForMethod('POST') !== 'idle'}
            formMethod="POST"
            type="submit"
            className="px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-[10px] uppercase font-semibold tracking-[0.18em] transition-colors cursor-pointer disabled:bg-[#A69F96]"
          >
            {stateForMethod('POST') !== 'idle' ? 'MENYIMPAN...' : 'TAMBAH ALAMAT BARU &rarr;'}
          </button>
        </div>
      )}
    </AddressForm>
  );
}

/**
 * @param {Pick<CustomerFragment, 'addresses' | 'defaultAddress'>}
 */
function ExistingAddresses({ addresses, defaultAddress }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.nodes.map((address) => (
        <div key={address.id} className="p-6 bg-[#FAF8F5] border border-[#E2DFD8] relative">
          <AddressForm
            addressId={address.id}
            address={address}
            defaultAddress={defaultAddress}
          >
            {({ stateForMethod }) => (
              <div className="flex items-center gap-3 pt-4 border-t border-[#E2DFD8]">
                <button
                  disabled={stateForMethod('PUT') !== 'idle'}
                  formMethod="PUT"
                  type="submit"
                  className="px-4 py-2 bg-[#111111] hover:bg-[#C5A059] text-white text-[10px] uppercase font-semibold tracking-[0.16em] transition-colors cursor-pointer"
                >
                  {stateForMethod('PUT') !== 'idle' ? '...' : 'SIMPAN'}
                </button>
                <button
                  disabled={stateForMethod('DELETE') !== 'idle'}
                  formMethod="DELETE"
                  type="submit"
                  className="px-4 py-2 bg-transparent hover:bg-red-50 text-red-600 border border-red-200 text-[10px] uppercase font-semibold tracking-[0.16em] transition-colors cursor-pointer"
                >
                  {stateForMethod('DELETE') !== 'idle' ? '...' : 'HAPUS'}
                </button>
              </div>
            )}
          </AddressForm>
        </div>
      ))}
    </div>
  );
}

/**
 * @param {{
 *   addressId: AddressFragment['id'];
 *   address: CustomerAddressInput;
 *   defaultAddress: CustomerFragment['defaultAddress'];
 *   children: (props: {
 *     stateForMethod: (method: 'PUT' | 'POST' | 'DELETE') => Fetcher['state'];
 *   }) => React.ReactNode;
 * }}
 */
export function AddressForm({ addressId, address, defaultAddress, children }) {
  const { state, formMethod } = useNavigation();
  /** @type {ActionReturnData} */
  const action = useActionData();
  const error = action?.error?.[addressId];
  const isDefaultAddress = defaultAddress?.id === addressId;

  return (
    <Form id={addressId} className="space-y-4">
      <input type="hidden" name="addressId" defaultValue={addressId} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`firstName-${addressId}`} className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#111111] block mb-1">
            NAMA DEPAN*
          </label>
          <input
            defaultValue={address?.firstName ?? ''}
            id={`firstName-${addressId}`}
            name="firstName"
            placeholder="Nama depan"
            required
            type="text"
            className="w-full text-base sm:text-xs p-2.5 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
          />
        </div>
        <div>
          <label htmlFor={`lastName-${addressId}`} className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#111111] block mb-1">
            NAMA BELAKANG*
          </label>
          <input
            defaultValue={address?.lastName ?? ''}
            id={`lastName-${addressId}`}
            name="lastName"
            placeholder="Nama belakang"
            required
            type="text"
            className="w-full text-base sm:text-xs p-2.5 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`address1-${addressId}`} className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#111111] block mb-1">
          ALAMAT LENGKAP*
        </label>
        <input
          defaultValue={address?.address1 ?? ''}
          id={`address1-${addressId}`}
          name="address1"
          placeholder="Jalan, nomor rumah, RT/RW"
          required
          type="text"
          className="w-full text-base sm:text-xs p-2.5 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor={`city-${addressId}`} className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#111111] block mb-1">
            KOTA / KABUPATEN*
          </label>
          <input
            defaultValue={address?.city ?? ''}
            id={`city-${addressId}`}
            name="city"
            placeholder="Kota"
            required
            type="text"
            className="w-full text-base sm:text-xs p-2.5 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
          />
        </div>
        <div>
          <label htmlFor={`zoneCode-${addressId}`} className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#111111] block mb-1">
            PROVINSI*
          </label>
          <input
            defaultValue={address?.zoneCode ?? ''}
            id={`zoneCode-${addressId}`}
            name="zoneCode"
            placeholder="Provinsi"
            required
            type="text"
            className="w-full text-base sm:text-xs p-2.5 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
          />
        </div>
        <div>
          <label htmlFor={`zip-${addressId}`} className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#111111] block mb-1">
            KODE POS*
          </label>
          <input
            defaultValue={address?.zip ?? ''}
            id={`zip-${addressId}`}
            name="zip"
            placeholder="Kode pos"
            required
            type="text"
            className="w-full text-base sm:text-xs p-2.5 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`phoneNumber-${addressId}`} className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#111111] block mb-1">
            NO. TELEPON / WHATSAPP
          </label>
          <input
            defaultValue={address?.phoneNumber ?? ''}
            id={`phoneNumber-${addressId}`}
            name="phoneNumber"
            placeholder="081..."
            type="tel"
            className="w-full text-base sm:text-xs p-2.5 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
          />
        </div>
        <div>
          <label htmlFor={`territoryCode-${addressId}`} className="text-[10px] uppercase font-semibold tracking-[0.14em] text-[#111111] block mb-1">
            KODE NEGARA*
          </label>
          <input
            defaultValue={address?.territoryCode ?? 'ID'}
            id={`territoryCode-${addressId}`}
            name="territoryCode"
            placeholder="ID"
            required
            type="text"
            maxLength={2}
            className="w-full text-base sm:text-xs p-2.5 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          defaultChecked={isDefaultAddress}
          id={`defaultAddress-${addressId}`}
          name="defaultAddress"
          type="checkbox"
          className="text-[#C5A059] focus:ring-0"
        />
        <label htmlFor={`defaultAddress-${addressId}`} className="text-xs text-[#5A5550]">
          Jadikan sebagai alamat utama pengiriman
        </label>
      </div>

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs">
          {error}
        </div>
      )}

      {children({
        stateForMethod: (method) => (formMethod === method ? state : 'idle'),
      })}
    </Form>
  );
}

/**
 * @typedef {{
 *   addressId?: string | null;
 *   createdAddress?: AddressFragment;
 *   defaultAddress?: string | null;
 *   deletedAddress?: string | null;
 *   error: Record<AddressFragment['id'], string> | null;
 *   updatedAddress?: AddressFragment;
 * }} ActionResponse
 */

/** @typedef {import('@shopify/hydrogen/customer-account-api-types').CustomerAddressInput} CustomerAddressInput */
/** @typedef {import('customer-accountapi.generated').AddressFragment} AddressFragment */
/** @typedef {import('customer-accountapi.generated').CustomerFragment} CustomerFragment */
/** @template T @typedef {import('react-router').Fetcher<T>} Fetcher */
/** @typedef {import('./+types/account.addresses').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
/** @typedef {ReturnType<typeof useActionData<typeof action>>} ActionReturnData */
