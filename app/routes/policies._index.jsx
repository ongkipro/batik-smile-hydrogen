import { useLoaderData, Link, NavLink } from 'react-router';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Kebijakan Pelayanan Butik — Butik Batik Smile Nusantara' },
    {
      name: 'description',
      content: 'Informasi resmi kebijakan privasi, garansi penukaran ukuran, ketentuan pengiriman, dan layanan Batik Smile Semarang.',
    },
  ];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  const data = await context.storefront.query(POLICIES_QUERY);

  const shopPolicies = data.shop;
  const policies = [
    shopPolicies?.privacyPolicy,
    shopPolicies?.shippingPolicy,
    shopPolicies?.termsOfService,
    shopPolicies?.refundPolicy,
    shopPolicies?.subscriptionPolicy,
  ].filter((policy) => policy != null);

  // If no policies configured in Shopify backend yet, provide standard boutique policies fallback
  if (!policies.length) {
    return {
      policies: [
        {
          id: 'refund-policy',
          handle: 'refund-policy',
          title: 'Garansi Bebas Tukar Size & Pengembalian',
        },
        {
          id: 'shipping-policy',
          handle: 'shipping-policy',
          title: 'Kebijakan Pengiriman Seluruh Indonesia',
        },
        {
          id: 'privacy-policy',
          handle: 'privacy-policy',
          title: 'Kebijakan Privasi & Keamanan Data',
        },
        {
          id: 'terms-of-service',
          handle: 'terms-of-service',
          title: 'Syarat & Ketentuan Layanan Butik',
        },
      ],
    };
  }

  return { policies };
}

export default function Policies() {
  /** @type {LoaderReturnData} */
  const { policies } = useLoaderData();

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E7D3B]">
            BERANDA
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold">KEBIJAKAN BUTIK</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            STANDAR PELAYANAN RESMI
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-[#111111] mb-4">
            Kebijakan &amp; Jaminan Butik
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Komitmen kami dalam memberikan kenyamanan berbelanja berlandaskan budaya 3S 1C 1T &amp; 1H.
          </p>
        </div>

        {/* Policies Grid (0px Radius) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {policies.map((policy) => (
            <Link
              key={policy.id}
              to={`/policies/${policy.handle}`}
              className="p-8 bg-white border border-[#E2DFD8] hover:border-[#111111] shadow-sm hover:shadow-md transition-all group block"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-2">
                DOKUMEN RESMI
              </span>
              <h2 className="font-serif text-xl font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors mb-3">
                {policy.title}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#111111] font-semibold inline-flex items-center gap-1">
                BACA SELENGKAPNYA &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;

/** @typedef {import('./+types/policies._index').Route} Route */
/** @typedef {import('storefrontapi.generated').PoliciesQuery} PoliciesQuery */
/** @typedef {import('storefrontapi.generated').PolicyItemFragment} PolicyItemFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
