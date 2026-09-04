import { useLoaderData, Link } from 'react-router';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePoliciesIndexMeta } from '~/lib/seo';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return generatePoliciesIndexMeta();
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
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] pt-10 pb-24 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'KEBIJAKAN BUTIK' }]} />

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
          {policies.map((policy) => {
            const isRefund = policy.handle.includes('refund');
            const isShipping = policy.handle.includes('shipping');
            const isPrivacy = policy.handle.includes('privacy');

            return (
              <Link
                key={policy.id}
                to={`/policies/${policy.handle}`}
                className="p-8 bg-white border border-[#E2DFD8] hover:border-[#111111] shadow-sm hover:shadow-md transition-all group block"
              >
                <div className="w-10 h-10 mb-4 flex items-center justify-center border border-[#C5A059]/40 group-hover:bg-[#C5A059] transition-colors">
                  {isRefund ? (
                    <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                  ) : isShipping ? (
                    <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  ) : isPrivacy ? (
                    <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="11" width="18" height="11" rx="0" ry="0" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-[#C5A059] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  )}
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-2">
                  DOKUMEN RESMI
                </span>
                <h2 className="font-serif text-xl font-normal text-[#111111] group-hover:text-[#C5A059] transition-colors mb-3">
                  {policy.title}
                </h2>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#111111] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  BACA SELENGKAPNYA &rarr;
                </span>
              </Link>
            );
          })}
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
