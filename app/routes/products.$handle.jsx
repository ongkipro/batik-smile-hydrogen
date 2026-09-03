import React, { useState, useEffect } from 'react';
import { useLoaderData, NavLink, redirect } from 'react-router';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  Money,
} from '@shopify/hydrogen';
import { AddToCartButton } from '~/components/AddToCartButton';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import { FamilyBundleBuilder } from '~/components/FamilyBundleBuilder';
import { StickyMobileBar } from '~/components/StickyMobileBar';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({ data }) => {
  return [
    { title: `${data?.product?.title ?? 'Produk'} — Batik Smile Nusantara` },
    {
      name: 'description',
      content:
        data?.product?.description ||
        'Busana batik berkualitas tinggi dari Butik Batik Smile Nusantara Semarang.',
    },
    {
      rel: 'canonical',
      href: `/products/${data?.product?.handle}`,
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

  // Bersihkan ?Title=Default+Title dari slug URL (301 Permanent Redirect)
  const url = new URL(request.url);
  let shouldRedirect = false;
  for (const [key, val] of Array.from(url.searchParams.entries())) {
    if (key.toLowerCase() === 'title' && val.toLowerCase() === 'default title') {
      url.searchParams.delete(key);
      shouldRedirect = true;
    }
  }
  if (shouldRedirect) {
    throw redirect(url.pathname + (url.search ? url.search : ''), 301);
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

  // Sinkronisasi opsi varian ke URL yang bersih (menghapus parameter sampah seperti ?Title=Default+Title)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentSearchParams = new URLSearchParams(window.location.search);
    let changed = false;

    // Hapus seluruh variasi key title=default title
    for (const key of Array.from(currentSearchParams.keys())) {
      if (
        key.toLowerCase() === 'title' &&
        currentSearchParams.get(key)?.toLowerCase() === 'default title'
      ) {
        currentSearchParams.delete(key);
        changed = true;
      }
    }

    // Hanya masukkan opsi nyata jika ada (misal Size, Color)
    selectedVariant?.selectedOptions?.forEach((opt) => {
      if (
        opt.name?.toLowerCase() === 'title' &&
        opt.value?.toLowerCase() === 'default title'
      ) {
        return;
      }
      if (currentSearchParams.get(opt.name) !== opt.value) {
        currentSearchParams.set(opt.name, opt.value);
        changed = true;
      }
    });

    const newSearch = currentSearchParams.toString();
    const cleanUrl = `${window.location.pathname}${newSearch ? '?' + newSearch : ''}`;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (changed || cleanUrl !== currentUrl) {
      window.history.replaceState({}, '', cleanUrl);
    }
  }, [selectedVariant?.selectedOptions]);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { title, descriptionHtml, images } = product;
  const imageList = images?.nodes || (product.featuredImage ? [product.featuredImage] : []);
  const [activeImage, setActiveImage] = useState(selectedVariant?.image || imageList[0]);

  // Tailoring add-on state
  const [isTailoringAdded, setIsTailoringAdded] = useState(false);
  const [measurements, setMeasurements] = useState('');

  // Accordion state
  const [openSection, setOpenSection] = useState('filosofi');
  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const isAvailable = selectedVariant?.availableForSale;
  const isSarimbit =
    title.toLowerCase().includes('sarimbit') || title.toLowerCase().includes('couple');

  const officialWaUrl =
    'https://wa.me/6281390888809?text=' +
    encodeURIComponent(`Halo Butik Batik Smile, saya ingin konsultasi produk: ${title}`);

  // Construct line item with optional custom tailoring attributes
  const cartLines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity: 1,
          selectedVariant,
          attributes: isTailoringAdded
            ? [
                { key: '_tailoring_service', value: 'yes' },
                { key: '_tailoring_measurements', value: measurements || 'Standard Tailoring Requested' },
              ]
            : [],
        },
      ]
    : [];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[100vw] mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
          <NavLink to="/" className="hover:text-[#9E7D3B]">
            BERANDA
          </NavLink>
          <span>/</span>
          <NavLink to="/collections/sarimbit-exclusive" className="hover:text-[#9E7D3B]">
            KOLEKSI
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold truncate">{title}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: 4:5 Vertical Gallery Strip */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {imageList.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[640px]">
                {imageList.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 sm:w-20 aspect-[4/5] overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      activeImage?.url === img.url
                        ? 'border-[#C5A059]'
                        : 'border-[#E2DFD8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.altText || title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image Container (4:5 Aspect Ratio) */}
            <div className="flex-1 bg-white border border-[#E2DFD8] relative overflow-hidden group">
              {activeImage ? (
                <img
                  src={activeImage.url}
                  alt={activeImage.altText || title}
                  className="w-full aspect-[4/5] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="aspect-[4/5] w-full flex items-center justify-center bg-[#EFECE6] text-[#5A5550] text-xs">
                  Batik Smile
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details & Purchase Form (0px Radius) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-10 border border-[#E2DFD8] shadow-sm sticky top-28">
            <div className="mb-6">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-1">
                KARYA BUTIK SEMARANG &bull; SEJAK 2007
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] leading-tight mb-3">
                {title}
              </h1>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-xl sm:text-2xl font-semibold text-[#111111] tracking-wide">
                  {selectedVariant?.price && <Money data={selectedVariant.price} />}
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className="text-xs line-through text-[#5A5550]">
                    <Money data={selectedVariant.compareAtPrice} />
                  </span>
                )}
              </div>

              {/* Reassurance Micro-Badges */}
              <div className="flex items-center gap-2 text-[10px] text-[#7C3F1D] py-1.5 px-3 bg-[#FAF8F5] border border-[#E2DFD8] w-fit uppercase tracking-wider">
                <span>Lapis Furing Hero Katun</span>
                <span>&bull;</span>
                <span>Bebas Tukar Ukuran 100%</span>
              </div>
            </div>

            <div className="w-full h-px bg-[#E2DFD8] my-6" />

            {/* Variant Option Pills (Ukuran) */}
            <div className="space-y-4 mb-6">
              {productOptions.map((option) => (
                <div key={option.name}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
                      {option.name}: <span className="font-normal text-[#5A5550]">{option.value}</span>
                    </label>
                    <a
                      href={officialWaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] uppercase tracking-[0.14em] text-[#9E7D3B] hover:underline font-medium"
                    >
                      PANDUAN UKURAN (SIZE GUIDE) &rarr;
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
                          className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-[#111111] !text-white border-[#111111]'
                              : 'bg-white !text-[#111111] border-[#E2DFD8] hover:border-[#111111]'
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

            {/* Bespoke Tailoring Add-on Toggle */}
            <div className="p-4 bg-[#FAF8F5] border border-[#E2DFD8] mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTailoringAdded}
                  onChange={(e) => setIsTailoringAdded(e.target.checked)}
                  className="mt-0.5 text-[#C5A059] focus:ring-0 cursor-pointer"
                />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111111] block">
                    TAMBAH JASA BESPOKE TAILORING (+Rp 150.000)
                  </span>
                  <span className="text-[10px] text-[#5A5550] block mt-0.5 leading-relaxed font-light">
                    Kustomisasi ukuran badan (Lingkar Dada, Panjang Baju, Panjang Lengan) dijahit langsung oleh penjahit butik.
                  </span>
                </div>
              </label>

              {isTailoringAdded && (
                <div className="mt-3 pt-3 border-t border-[#E2DFD8]">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-[#111111] block mb-1">
                    CATATAN UKURAN BADAN (OPSIONAL):
                  </label>
                  <input
                    type="text"
                    value={measurements}
                    onChange={(e) => setMeasurements(e.target.value)}
                    placeholder="Contoh: LD 108cm, PB 74cm, Lengan Panjang"
                    className="w-full text-xs p-2 bg-white border border-[#E2DFD8] focus:border-[#111111] outline-none"
                  />
                </div>
              )}
            </div>

            {/* Model Fit Reference */}
            <div className="text-[10px] text-[#5A5550] bg-[#FAF8F5] p-3 border border-[#E2DFD8] mb-6 tracking-wide uppercase">
              REFERENSI MODEL: TB 178 cm &bull; BB 74 kg memakai ukuran L (Regular Fit).
            </div>

            {/* Purchase & WhatsApp CTAs */}
            <div className="space-y-3 mb-8">
              <AddToCartButton
                disabled={!isAvailable}
                lines={cartLines}
                className="w-full py-4 px-6 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] font-semibold text-[11px] uppercase tracking-[0.18em] transition-all disabled:bg-[#E2DFD8] disabled:!text-[#5A5550] disabled:cursor-not-allowed cursor-pointer shadow-md"
              >
                {isAvailable ? 'TAMBAH KE TAS BELANJA' : 'HABIS TERJUAL'}
              </AddToCartButton>

              <a
                href={officialWaUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 bg-white hover:bg-[#FAF8F5] text-[#111111] font-semibold text-[10px] uppercase tracking-[0.18em] text-center block border border-[#111111] transition-colors"
              >
                KONSULTASI FITTING VIA WHATSAPP &rarr;
              </a>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#E2DFD8] divide-y divide-[#E2DFD8] text-xs">
              {/* Accordion 1: Filosofi & Cerita */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleSection('filosofi')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-[#111111] text-left cursor-pointer"
                >
                  <span>FILOSOFI MOTIF &amp; CERITA KARYA</span>
                  <span className="text-sm">{openSection === 'filosofi' ? '−' : '+'}</span>
                </button>
                {openSection === 'filosofi' && (
                  <div className="mt-3 text-[#5A5550] leading-relaxed font-light space-y-2">
                    {descriptionHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                    ) : (
                      <p>
                        Motif batik klasik sarat makna doa kemakmuran dan keharmonisan keluarga,
                        dibuat dengan ketelitian pengrajin lokal berpengalaman sejak 2007.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Bahan & Furing */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleSection('material')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-[#111111] text-left cursor-pointer"
                >
                  <span>DETAIL MATERIAL &amp; JAHITAN BUTIK</span>
                  <span className="text-sm">{openSection === 'material' ? '−' : '+'}</span>
                </button>
                {openSection === 'material' && (
                  <div className="mt-3 text-[#5A5550] leading-relaxed font-light space-y-2">
                    <p>&bull; <strong>Bahan Utama:</strong> Katun Primisima / Dobby Timbul / Sutra ATBM bermutu tinggi.</p>
                    <p>&bull; <strong>Lapis Furing:</strong> Furing hero katun adem yang menyerap keringat.</p>
                    <p>&bull; <strong>Presisi Pola:</strong> Sambung motif rapi pada saku dan kancing depan.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Panduan Perawatan */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleSection('care')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-[#111111] text-left cursor-pointer"
                >
                  <span>PANDUAN PERAWATAN BATIK</span>
                  <span className="text-sm">{openSection === 'care' ? '−' : '+'}</span>
                </button>
                {openSection === 'care' && (
                  <div className="mt-3 text-[#5A5550] leading-relaxed font-light space-y-2">
                    <p>&bull; Cuci terpisah menggunakan sabun khusus lerak atau sampo bayi lembut.</p>
                    <p>&bull; Hindari memeras terlalu kuat dan jemur di tempat teduh tanpa paparan terik matahari langsung.</p>
                    <p>&bull; Setrika dari bagian dalam dengan suhu sedang.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Family Bundle Builder for Sarimbit Products */}
        {isSarimbit && (
          <div className="mt-16">
            <FamilyBundleBuilder product={product} selectedVariant={selectedVariant} />
          </div>
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
