import React, { useState } from 'react';
import { useLoaderData, NavLink } from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  Image,
  Money,
} from '@shopify/hydrogen';
import { AddToCartButton } from '~/components/AddToCartButton';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { BatikDivider, BatikCorner } from '~/components/BatikOrnaments';
import { FamilyBundleBuilder } from '~/components/FamilyBundleBuilder';
import { StickyMobileBar } from '~/components/StickyMobileBar';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [
    { title: `${data?.product.title ?? 'Produk'} — Batik Smile Nusantara` },
    {
      name: 'description',
      content: data?.product.description || 'Busana batik berkualitas tinggi dari Batik Smile.',
    },
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  return { ...criticalData };
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  redirectIfHandleIsLocalized(request, { handle, data: product });

  return {
    product,
  };
}

export default function Product() {
  /** @type {LoaderReturnData} */
  const { product } = useLoaderData();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml, images } = product;
  const imageList = images?.nodes || (product.featuredImage ? [product.featuredImage] : []);
  const [activeImage, setActiveImage] = useState(selectedVariant?.image || imageList[0]);

  // Accordion state
  const [openSection, setOpenSection] = useState('filosofi');
  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const isAvailable = selectedVariant?.availableForSale;
  const isSarimbit = title.toLowerCase().includes('sarimbit') || title.toLowerCase().includes('couple');

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-[11px] text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E4719]">
            Beranda
          </NavLink>
          <span>/</span>
          <NavLink to="/collections/sarimbit-batik-couple" className="hover:text-[#9E4719]">
            Koleksi
          </NavLink>
          <span>/</span>
          <span className="text-neutral-800 font-semibold truncate">{title}</span>
        </nav>

        {/* Main Grid: Gallery & Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: 4:5 Media Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {imageList.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[640px] scrollbar-thin">
                {imageList.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 sm:w-20 aspect-[4/5] rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage?.url === img.url
                        ? 'border-[#9E4719] shadow'
                        : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.altText || title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image */}
            <div className="flex-1 bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-md relative group">
              <BatikCorner position="top-left" variant="gold" size={36} className="top-3 left-3 z-10" />
              <BatikCorner position="bottom-right" variant="gold" size={36} className="bottom-3 right-3 z-10" />

              {activeImage ? (
                <img
                  src={activeImage.url}
                  alt={activeImage.altText || title}
                  className="w-full aspect-[4/5] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="aspect-[4/5] w-full flex items-center justify-center bg-neutral-100 text-neutral-400">
                  Batik Smile
                </div>
              )}
            </div>
          </div>

          {/* Right: Sticky Product Info & Purchasing Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-sm sticky top-28">
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E4719] font-bold">
                Karya Butik Asli Jawa Tengah
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mt-1 mb-2 leading-tight">
                {title}
              </h1>

              {/* Price & Objection Snapping Badge */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-xl sm:text-2xl font-bold text-[#9E4719] font-sans">
                  {selectedVariant?.price && <Money data={selectedVariant.price} />}
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className="text-sm line-through text-neutral-400 font-sans">
                    <Money data={selectedVariant.compareAtPrice} />
                  </span>
                )}
              </div>

              {/* Contextual Reassurance Microcopy */}
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-medium py-1.5 px-3 rounded-lg bg-emerald-50 border border-emerald-200/60 w-fit">
                <span>✓ Lapis Furing Hero Halus</span>
                <span>•</span>
                <span>Garansi Tukar Size 100%</span>
              </div>
            </div>

            <BatikDivider variant="soga" className="my-4" />

            {/* Single Variant Option Pills (Ukuran) */}
            <div className="space-y-4 mb-6">
              {productOptions.map((option) => (
                <div key={option.name}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                      {option.name}: <span className="font-normal text-neutral-500">{option.value}</span>
                    </label>
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20Batik%20Smile%2C%20saya%20butuh%20panduan%20ukuran"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#9E4719] hover:underline font-medium"
                    >
                      Panduan Ukuran (Size Guide) &rarr;
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.optionValues.map((val) => {
                      const isSelected = val.name === option.value;
                      return (
                        <NavLink
                          key={val.name}
                          to={val.to}
                          preventScrollReset
                          replace
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                            isSelected
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          {val.name}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Model Fit Reference */}
            <div className="text-[11px] text-neutral-500 bg-neutral-50 p-3 rounded-lg mb-6 border border-neutral-200/60">
              💡 <strong>Referensi Model:</strong> Pria TB 178cm / BB 75kg memakai size L (Reguler Fit).
            </div>

            {/* Dual Actions: Add to Cart & WhatsApp */}
            <div className="space-y-3 mb-8">
              <AddToCartButton
                disabled={!isAvailable}
                lines={
                  selectedVariant
                    ? [
                        {
                          merchandiseId: selectedVariant.id,
                          quantity: 1,
                          selectedVariant,
                        },
                      ]
                    : []
                }
                className="w-full py-4 px-6 rounded-lg bg-[#9E4719] hover:bg-[#7A320C] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                {isAvailable ? 'Tambah ke Tas Belanja 🛍️' : 'Habis Terjual'}
              </AddToCartButton>

              <a
                href={`https://wa.me/6281234567890?text=Halo%20Batik%20Smile%2C%20saya%20tertarik%20dengan%20produk%3A%20${encodeURIComponent(
                  title,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-widest text-center block transition-colors shadow-sm"
              >
                Tanya Konsultan via WhatsApp
              </a>
            </div>

            {/* Accordions */}
            <div className="border-t border-neutral-200 divide-y divide-neutral-200 text-xs">
              {/* Accordion 1: Filosofi & Cerita */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('filosofi')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-neutral-800 text-left"
                >
                  <span>Filosofi Motif &amp; Cerita Karya</span>
                  <span className="text-base">{openSection === 'filosofi' ? '−' : '+'}</span>
                </button>
                {openSection === 'filosofi' && (
                  <div className="mt-3 text-neutral-600 leading-relaxed space-y-2">
                    {descriptionHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                    ) : (
                      <p>
                        Motif batik klasik sarat makna doa kemakmuran dan keharmonisan keluarga,
                        dibuat dengan ketelitian pengrajin lokal berpengalaman.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Bahan & Furing */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('material')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-neutral-800 text-left"
                >
                  <span>Detail Bahan &amp; Jahitan Butik</span>
                  <span className="text-base">{openSection === 'material' ? '−' : '+'}</span>
                </button>
                {openSection === 'material' && (
                  <div className="mt-3 text-neutral-600 leading-relaxed space-y-1.5">
                    <p>• <strong>Kain Utama:</strong> Katun Primisima / Tenun Dobby / Sutra ATBM halus.</p>
                    <p>• <strong>Furing:</strong> Lapis furing hero adem yang menyerap keringat.</p>
                    <p>• <strong>Pola:</strong> Sambung corak presisi di saku dan kancing depan.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Panduan Perawatan */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('care')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-neutral-800 text-left"
                >
                  <span>Panduan Perawatan Batik</span>
                  <span className="text-base">{openSection === 'care' ? '−' : '+'}</span>
                </button>
                {openSection === 'care' && (
                  <div className="mt-3 text-neutral-600 leading-relaxed space-y-1.5">
                    <p>• Cuci menggunakan sabun khusus lerak atau sampo bayi lembut.</p>
                    <p>• Hindari memeras terlalu keras dan jemur di tempat teduh tanpa sinar matahari langsung.</p>
                    <p>• Setrika dengan suhu sedang atau lapisi kain pelindung.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Family Bundle Builder (If it's a Sarimbit product) */}
        {isSarimbit && (
          <FamilyBundleBuilder product={product} selectedVariant={selectedVariant} />
        )}
      </div>

      {/* Floating Smart Mobile Action Bar */}
      <StickyMobileBar product={product} selectedVariant={selectedVariant} />

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    images(first: 8) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
