import React, { useState, useEffect } from 'react';
import { useLoaderData, NavLink, Link, redirect } from 'react-router';
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
import { StickyMobileBar } from '~/components/StickyMobileBar';
import { ProductItem } from '~/components/ProductItem';

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

  // Sinkronisasi opsi varian ke URL yang bersih
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentSearchParams = new URLSearchParams(window.location.search);
    let changed = false;

    for (const key of Array.from(currentSearchParams.keys())) {
      if (
        key.toLowerCase() === 'title' &&
        currentSearchParams.get(key)?.toLowerCase() === 'default title'
      ) {
        currentSearchParams.delete(key);
        changed = true;
      }
    }

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

  // Size Guide Modal state
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Tailoring add-on state
  const [isTailoringAdded, setIsTailoringAdded] = useState(false);
  const [measurements, setMeasurements] = useState('');

  // Accordion state
  const [openSection, setOpenSection] = useState('filosofi');
  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const isAvailable = selectedVariant?.availableForSale;

  const officialWaUrl =
    'https://wa.me/6281390888809?text=' +
    encodeURIComponent(`Halo Butik Batik Smile Nusantara, saya ingin konsultasi ukuran & corak produk: ${title}`);

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

  // Resolve related products from the exact same collection
  const rawCollections = product.collections?.nodes || [];
  const matchedCollection =
    rawCollections.find(
      (c) =>
        c.handle !== 'shop' &&
        c.handle !== 'all' &&
        c.handle !== 'frontpage' &&
        c.products?.nodes?.some((p) => p.id !== product.id),
    ) ||
    rawCollections.find((c) => c.products?.nodes?.some((p) => p.id !== product.id)) ||
    rawCollections[0];

  const relatedProducts = (matchedCollection?.products?.nodes || [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const relatedCollectionTitle = matchedCollection?.title;
  const relatedCollectionHandle = matchedCollection?.handle;

  // Active image index
  const activeIndex = imageList.findIndex((img) => img.url === activeImage?.url);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="w-full max-w-7xl mx-auto">
        {/* Dynamic Breadcrumb Navigation */}
        <nav className="text-[10px] text-[#5A5550] uppercase tracking-[0.2em] mb-8 sm:mb-10 flex items-center gap-2 flex-wrap">
          <NavLink to="/" className="hover:text-[#9E7D3B] transition-colors">
            BERANDA
          </NavLink>
          <span>/</span>
          <NavLink
            to={relatedCollectionHandle ? `/collections/${relatedCollectionHandle}` : '/collections/all'}
            className="hover:text-[#9E7D3B] transition-colors"
          >
            {relatedCollectionTitle || 'KOLEKSI'}
          </NavLink>
          <span>/</span>
          <span className="text-[#111111] font-semibold truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </nav>

        {/* Main PDP Grid (Left: 4:5 Vertical Gallery, Right: Frameless Quiet Luxury Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: 4:5 Vertical Gallery System (7 Cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 lg:sticky lg:top-24">
            {/* Thumbnails Column */}
            {imageList.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[660px] pb-2 sm:pb-0 scrollbar-none">
                {imageList.map((img, idx) => {
                  const isActive = activeImage?.url === img.url;
                  return (
                    <button
                      key={img.id || idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 sm:w-20 aspect-[4/5] overflow-hidden flex-shrink-0 border transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#C5A059] ring-1 ring-[#C5A059]'
                          : 'border-[#E2DFD8] opacity-75 hover:opacity-100 hover:border-[#111111]'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.altText || `${title} - Gambar ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Featured Image Container (Strict 4:5 Aspect Ratio) */}
            <div className="flex-1 relative overflow-hidden bg-[#111111] group shadow-sm">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {activeImage ? (
                  <img
                    src={activeImage.url}
                    alt={activeImage.altText || title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="aspect-[4/5] w-full flex items-center justify-center bg-[#EFECE6] text-[#5A5550] text-xs font-serif">
                    Batik Smile Nusantara
                  </div>
                )}
              </div>

              {/* Counter Badge */}
              {imageList.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-white font-medium">
                  {activeIndex >= 0 ? activeIndex + 1 : 1} / {imageList.length}
                </div>
              )}
            </div>
          </div>

          {/* Right: Frameless Quiet Luxury Product Details (5 Cols on Desktop, No Boxed Card!) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Block */}
            <div>
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-bold mb-2">
                <span>KARYA BUTIK SEMARANG</span>
                <span>&bull;</span>
                <span>EST. 2007</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#111111] leading-[1.14] tracking-wide mb-3">
                {title}
              </h1>

              {/* Price & Stock Status */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-semibold text-[#111111] tracking-wide font-sans">
                  {selectedVariant?.price && <Money data={selectedVariant.price} />}
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className="text-sm line-through text-[#888888]">
                    <Money data={selectedVariant.compareAtPrice} />
                  </span>
                )}
                <span
                  className={`text-[9px] uppercase font-bold tracking-[0.18em] px-2.5 py-0.5 ml-auto ${
                    isAvailable
                      ? 'text-[#2E6B3E] bg-[#EAF5EC] border border-[#2E6B3E]/20'
                      : 'text-[#8A2525] bg-[#FBEBEB] border border-[#8A2525]/20'
                  }`}
                >
                  {isAvailable ? 'TERSEDIA DI BUTIK' : 'HABIS TERJUAL'}
                </span>
              </div>

              {/* Value Props Chips */}
              <div className="flex flex-wrap gap-2 text-[10px] text-[#5A5550] uppercase tracking-[0.14em]">
                <span className="px-2.5 py-1 bg-white border border-[#E2DFD8]">
                  Lapis Furing Katun Hero
                </span>
                <span className="px-2.5 py-1 bg-white border border-[#E2DFD8]">
                  Sambung Motif Presisi
                </span>
                <span className="px-2.5 py-1 bg-white border border-[#E2DFD8]">
                  Bebas Tukar Ukuran
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-[#E2DFD8]" />

            {/* Variant Option Selection (Ukuran / Size) */}
            <div className="space-y-4">
              {productOptions.length > 0 ? (
                productOptions.map((option) => (
                  <div key={option.name}>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
                        {option.name}: <span className="font-normal text-[#5A5550]">{option.value}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] hover:text-[#111111] transition-colors font-medium underline underline-offset-4 cursor-pointer"
                      >
                        PANDUAN UKURAN (SIZE GUIDE) {showSizeGuide ? '−' : '+'}
                      </button>
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
                            className={`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-[#111111] !text-white border-[#111111] shadow-sm'
                                : 'bg-white !text-[#111111] border-[#E2DFD8] hover:border-[#111111]'
                            }`}
                          >
                            {val.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
                      PILIHAN UKURAN: <span className="font-normal text-[#5A5550]">REGULAR FIT BUTIK</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-[10px] uppercase tracking-[0.16em] text-[#9E7D3B] hover:text-[#111111] transition-colors font-medium underline underline-offset-4 cursor-pointer"
                    >
                      PANDUAN UKURAN (SIZE GUIDE) {showSizeGuide ? '−' : '+'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] bg-[#111111] text-white border border-[#111111]">
                      ALL SIZE / STANDAR BUTIK
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Expandable Sizing Table Drawer */}
            {showSizeGuide && (
              <div className="p-4 bg-white border border-[#C5A059]/50 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E2DFD8]">
                  <span className="font-semibold uppercase tracking-[0.16em] text-[#111111] text-[10px]">
                    TABEL UKURAN STANDAR BUTIK (REGULAR FIT)
                  </span>
                  <span className="text-[9px] text-[#9E7D3B] uppercase tracking-wider">Toleransi &plusmn;1-2cm</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] text-[#444444]">
                    <thead>
                      <tr className="border-b border-[#E2DFD8] text-[10px] uppercase tracking-wider text-[#111111]">
                        <th className="py-1.5 pr-3">Ukuran</th>
                        <th className="py-1.5 px-3">Lingkar Dada (LD)</th>
                        <th className="py-1.5 px-3">Panjang Baju (PB)</th>
                        <th className="py-1.5 pl-3">Panjang Lengan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2DFD8]/60">
                      <tr>
                        <td className="py-1.5 pr-3 font-semibold text-[#111111]">S</td>
                        <td className="py-1.5 px-3">100 cm</td>
                        <td className="py-1.5 px-3">70 cm</td>
                        <td className="py-1.5 pl-3">58 cm</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-3 font-semibold text-[#111111]">M</td>
                        <td className="py-1.5 px-3">104 cm</td>
                        <td className="py-1.5 px-3">72 cm</td>
                        <td className="py-1.5 pl-3">60 cm</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-3 font-semibold text-[#111111]">L</td>
                        <td className="py-1.5 px-3">108 cm</td>
                        <td className="py-1.5 px-3">74 cm</td>
                        <td className="py-1.5 pl-3">61 cm</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-3 font-semibold text-[#111111]">XL</td>
                        <td className="py-1.5 px-3">112 cm</td>
                        <td className="py-1.5 px-3">76 cm</td>
                        <td className="py-1.5 pl-3">62 cm</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-3 font-semibold text-[#111111]">XXL</td>
                        <td className="py-1.5 px-3">118 cm</td>
                        <td className="py-1.5 px-3">78 cm</td>
                        <td className="py-1.5 pl-3">63 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#E2DFD8] flex items-center justify-between text-[10px] text-[#5A5550]">
                  <span>Ukuran di luar tabel? Pilih layanan jahit kustom.</span>
                  <a
                    href={officialWaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#9E7D3B] font-semibold uppercase tracking-wider hover:underline"
                  >
                    TANYA KONSULTAN &rarr;
                  </a>
                </div>
              </div>
            )}

            {/* Bespoke Tailoring Atelier Add-on */}
            <div className="p-4 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTailoringAdded}
                  onChange={(e) => setIsTailoringAdded(e.target.checked)}
                  className="mt-0.5 text-[#C5A059] focus:ring-0 cursor-pointer accent-[#C5A059]"
                />
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#111111] block">
                    TAMBAH JASA JAHIT BESPOKE TAILORING (+Rp 150.000)
                  </span>
                  <span className="text-[10px] text-[#5A5550] block mt-0.5 leading-relaxed font-light">
                    Kustomisasi ukuran badan (Lingkar Dada, Panjang Baju, Lengan) dijahit langsung oleh penjahit butik tanpa minimal order.
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
                    className="w-full text-xs p-2.5 bg-[#FAF8F5] border border-[#E2DFD8] focus:border-[#111111] outline-none"
                  />
                </div>
              )}
            </div>

            {/* Model Fit Reference */}
            <div className="text-[10px] text-[#5A5550] bg-white p-3 border border-[#E2DFD8] tracking-wide uppercase">
              REFERENSI FITTING: TB 178 cm &bull; BB 74 kg mengenakan ukuran L (Regular Fit).
            </div>

            {/* Purchase & WhatsApp CTAs */}
            <div className="space-y-3 pt-2">
              <AddToCartButton
                disabled={!isAvailable}
                lines={cartLines}
                className="w-full py-4 px-6 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] font-semibold text-[11px] uppercase tracking-[0.2em] transition-all disabled:bg-[#E2DFD8] disabled:!text-[#5A5550] disabled:cursor-not-allowed cursor-pointer shadow-md"
              >
                {isAvailable ? 'TAMBAH KE TAS BELANJA' : 'HABIS TERJUAL'}
              </AddToCartButton>

              <a
                href={officialWaUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 bg-white hover:bg-[#FAF8F5] text-[#111111] font-semibold text-[10px] uppercase tracking-[0.18em] text-center block border border-[#111111] transition-colors no-underline"
              >
                KONSULTASI FITTING &amp; CORAK VIA WHATSAPP &rarr;
              </a>
            </div>

            {/* Trust Guarantee Grid (Standard 3S 1C 1T & 1H) */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E2DFD8] text-[10px] text-[#5A5550]">
              <div className="flex items-start gap-2">
                <span className="text-[#9E7D3B] font-bold">&bull;</span>
                <span>Garansi Bebas Tukar Ukuran 7 Hari</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#9E7D3B] font-bold">&bull;</span>
                <span>100% Batik Asli Cap/Tulis</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#9E7D3B] font-bold">&bull;</span>
                <span>Furing Katun Hero Adem Halus</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#9E7D3B] font-bold">&bull;</span>
                <span>Pengiriman Aman Seluruh Indonesia</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#E2DFD8] divide-y divide-[#E2DFD8] text-xs pt-2">
              {/* Accordion 1: Filosofi & Cerita */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleSection('filosofi')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-[#111111] text-left cursor-pointer"
                >
                  <span>FILOSOFI CORAK &amp; MAKNA KARYA</span>
                  <span className="text-sm">{openSection === 'filosofi' ? '−' : '+'}</span>
                </button>
                {openSection === 'filosofi' && (
                  <div className="mt-3 text-[#5A5550] leading-relaxed font-light space-y-2">
                    {descriptionHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                    ) : (
                      <p>
                        Karya busana batik klasik sarat makna doa kemakmuran, wibawa, dan keharmonisan keluarga,
                        dirancang dengan ketelitian maestro canting lokal Semarang sejak 2007.
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
                    <p>&bull; <strong>Bahan Utama:</strong> Katun Primisima Halus / Tenun Dobby Timbul bermutu tinggi.</p>
                    <p>&bull; <strong>Lapis Furing:</strong> Furing hero katun lembut adem yang menyerap keringat seharian.</p>
                    <p>&bull; <strong>Presisi Pola:</strong> Sambung motif simetris pada saku dan belahan kancing depan.</p>
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
                  <span>PANDUAN PERAWATAN WASTRA</span>
                  <span className="text-sm">{openSection === 'care' ? '−' : '+'}</span>
                </button>
                {openSection === 'care' && (
                  <div className="mt-3 text-[#5A5550] leading-relaxed font-light space-y-2">
                    <p>&bull; Cuci terpisah menggunakan sabun khusus lerak atau sampo bayi lembut.</p>
                    <p>&bull; Hindari memeras terlalu kuat dan jemur di tempat teduh tanpa terik matahari langsung.</p>
                    <p>&bull; Setrika dari bagian dalam menggunakan panas suhu sedang.</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Pengiriman & Garansi */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => toggleSection('shipping')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-[#111111] text-left cursor-pointer"
                >
                  <span>PENGIRIMAN &amp; JAMINAN TUKAR UKURAN</span>
                  <span className="text-sm">{openSection === 'shipping' ? '−' : '+'}</span>
                </button>
                {openSection === 'shipping' && (
                  <div className="mt-3 text-[#5A5550] leading-relaxed font-light space-y-2">
                    <p>&bull; <strong>Pengiriman Cepat:</strong> Dikirim dari Flagship Showroom Simongan Semarang ke seluruh Nusantara.</p>
                    <p>&bull; <strong>Garansi Ukuran:</strong> Bebas tukar ukuran dalam 7 hari setelah barang diterima jika ukuran kurang pas.</p>
                    <p>&bull; <strong>Layanan 3S 1C 1T &amp; 1H:</strong> Hubungi WhatsApp Concierge 081-390-8888-09 untuk panduan penukaran.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products: "Koleksi Selaras" (Strict 4:5 Vertical Cards, Calibrated Spacing) */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-12 border-t border-[#E2DFD8]">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#9E7D3B] font-bold block mb-1.5">
                KOLEKSI SELARAS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal tracking-wide">
                Rekomendasi {relatedCollectionTitle || 'Koleksi Sejenis'}
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductItem
                  key={relProduct.id}
                  product={relProduct}
                  loading="lazy"
                />
              ))}
            </div>

            {relatedCollectionHandle && (
              <div className="text-center mt-8 sm:mt-10">
                <Link
                  to={`/collections/${relatedCollectionHandle}`}
                  className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors shadow-sm no-underline"
                >
                  LIHAT SEMUA KOLEKSI {relatedCollectionTitle ? relatedCollectionTitle.toUpperCase() : ''} &rarr;
                </Link>
              </div>
            )}
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
    collections(first: 5) {
      nodes {
        id
        handle
        title
        products(first: 8) {
          nodes {
            id
            title
            handle
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              id
              url
              altText
              width
              height
            }
            images(first: 2) {
              nodes {
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
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
