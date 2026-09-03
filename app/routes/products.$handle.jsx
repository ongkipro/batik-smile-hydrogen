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
 * Parse Shopify product description HTML into narrative story and structured specifications
 * @param {string} html
 */
function parseShopifyDescription(html) {
  if (!html) return { story: '', specs: [] };

  // Extract paragraphs (excluding ul)
  const pMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  const story = pMatches
    .map((p) => p.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean)
    .join('\n\n');

  // Extract li items
  const liMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
  const specs = liMatches.map((li) => {
    const raw = li.replace(/<\/?li[^>]*>/gi, '').trim();
    const strongMatch = raw.match(/<strong[^>]*>([\s\S]*?)<\/strong>/i);
    const label = strongMatch ? strongMatch[1].replace(/[:\s]+$/, '').trim() : '';
    const value = raw
      .replace(/<strong[^>]*>[\s\S]*?<\/strong>/i, '')
      .replace(/<[^>]+>/g, '')
      .replace(/^[:\s]+/, '')
      .trim();
    return { label, value: value || raw.replace(/<[^>]+>/g, '').trim() };
  });

  return { story, specs };
}

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


  // Quantity order state
  const [quantity, setQuantity] = useState(1);

  // Policy & description accordion state (auto show deskripsi by default)
  const [openSections, setOpenSections] = useState({ deskripsi: true, shipping: false });
  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isAvailable = selectedVariant?.availableForSale;

  // Only show variant selector if product has multiple selectable variants
  const hasMultipleVariants =
    productOptions.length > 0 &&
    productOptions.some((opt) => opt.optionValues && opt.optionValues.length > 1);

  // Clean cart lines with dynamic quantity
  const cartLines = selectedVariant
    ? [
        {
          merchandiseId: selectedVariant.id,
          quantity,
          selectedVariant,
        },
      ]
    : [];

  // Parse structured description from Shopify
  const parsedDescription = parseShopifyDescription(descriptionHtml);

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

  // Tier-Differentiated Theme Classification (Mirroring Sarimbit Collection Tiers)
  const collectionHandles = rawCollections.map((c) => c.handle?.toLowerCase() || '');
  const productHandle = (product.handle || '').toLowerCase();
  const productTitle = (product.title || '').toLowerCase();
  const variantPrice = parseFloat(selectedVariant?.price?.amount || '0');

  const isExclusiveTier =
    collectionHandles.some((h) => h.includes('exclusive') || h.includes('mahakarya') || h.includes('sutra')) ||
    productHandle.includes('exclusive') ||
    productHandle === 'sarimbit-royal-navy-1' ||
    productHandle === 'sarimbit-mustard-gold' ||
    productTitle.includes('exclusive') ||
    productTitle.includes('mahakarya') ||
    (productHandle.startsWith('sarimbit') && variantPrice >= 1000000);

  const isPremiumTier =
    !isExclusiveTier &&
    (collectionHandles.some((h) => h.includes('premium') || h.includes('signature') || h.includes('dobby')) ||
    productHandle.includes('premium') ||
    productHandle === 'sarimbit-charcoal-hitam' ||
    productTitle.includes('premium') ||
    productTitle.includes('signature') ||
    (productHandle.startsWith('sarimbit') && variantPrice >= 500000 && variantPrice < 1000000));

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

          {/* Right: Frameless Quiet Luxury Product Details (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Block */}
            <div>
              {/* Category & Tier Whispered Eyebrow */}
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] font-bold mb-2">
                {isExclusiveTier ? (
                  <span className="text-[#C5A059] flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#C5A059]" />
                    HAUTE HERITAGE &bull; SARIMBIT EXCLUSIVE
                  </span>
                ) : isPremiumTier ? (
                  <span className="text-[#9E7D3B] flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#9E7D3B]" />
                    SIGNATURE ATELIER &bull; SARIMBIT PREMIUM
                  </span>
                ) : (
                  <span className="text-[#888888]">
                    KARYA BUTIK SEMARANG &bull; EST. 2007
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#111111] leading-[1.14] tracking-wide mb-3">
                {title}
              </h1>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="text-2xl sm:text-3xl font-medium text-[#111111] tracking-wide font-sans">
                  {selectedVariant?.price && <Money data={selectedVariant.price} />}
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className="text-sm line-through text-[#888888]">
                    <Money data={selectedVariant.compareAtPrice} />
                  </span>
                )}
              </div>

              {/* Stock Status Indicator (Placed directly under price) */}
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] mb-3">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-[#2E6B3E]' : 'bg-[#8A2525]'}`} />
                <span className={isAvailable ? 'text-[#2E6B3E]' : 'text-[#8A2525]'}>
                  {isAvailable ? 'Tersedia di Butik' : 'Habis Terjual'}
                </span>
              </div>

              {/* Value Props (Seamless Typography, Tier-Differentiated) */}
              <div className="flex items-center gap-2 text-[11px] text-[#5A5550] font-light tracking-wide flex-wrap">
                {isExclusiveTier ? (
                  <>
                    <span>Sutra Alam ATBM</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Canting Prada Emas</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Sambung Motif Presisi</span>
                  </>
                ) : isPremiumTier ? (
                  <>
                    <span>Tenun Dobby Timbul</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Furing Katun Hero Adem</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Sambung Motif Presisi</span>
                  </>
                ) : (
                  <>
                    <span>Lapis Furing Katun Hero</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Sambung Motif Presisi</span>
                    <span className="text-[#C5A059]">&bull;</span>
                    <span>Bebas Tukar Ukuran</span>
                  </>
                )}
              </div>
            </div>

            <div className="w-full h-px bg-[#E2DFD8]" />

            {/* Variant Option Selection (Only rendered if multiple variants exist) */}
            {hasMultipleVariants && (
              <div>
                {productOptions.map((option) => (
                  <div key={option.name}>
                    <div className="mb-2">
                      <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#111111]">
                        {option.name}: <span className="font-normal text-[#5A5550]">{option.value}</span>
                      </label>
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
                            className={`w-11 h-11 flex items-center justify-center text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#111111] !text-white'
                                : 'bg-white !text-[#111111] hover:bg-[#FAF8F5]'
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
            )}

            {/* Purchase Actions: Row 1 (Quantity + Tambah ke Tas), Row 2 (Beli Sekarang) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5">
                {/* Quantity Selector */}
                <div className="flex items-center border border-[#111111] bg-white h-12 w-28 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1 || !isAvailable}
                    className="w-9 h-full flex items-center justify-center text-sm font-medium text-[#111111] hover:bg-black/5 disabled:opacity-30 cursor-pointer transition-colors"
                    aria-label="Kurangi Jumlah"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-xs font-semibold text-[#111111] font-sans">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={!isAvailable}
                    className="w-9 h-full flex items-center justify-center text-sm font-medium text-[#111111] hover:bg-black/5 disabled:opacity-30 cursor-pointer transition-colors"
                    aria-label="Tambah Jumlah"
                  >
                    +
                  </button>
                </div>

                {/* Tambah ke Tas Belanja Button (Stretches across remaining row width) */}
                <AddToCartButton
                  disabled={!isAvailable}
                  lines={cartLines}
                  wrapperClassName="flex-1"
                  className="w-full h-12 px-4 bg-white hover:bg-[#FAF8F5] !text-[#111111] hover:!text-[#9E7D3B] font-semibold text-[10px] uppercase tracking-[0.18em] text-center flex items-center justify-center border border-[#111111] transition-colors cursor-pointer"
                >
                  + TAMBAH KE TAS BELANJA
                </AddToCartButton>
              </div>

              {/* Beli Sekarang (Direct Instant Checkout under Tambah ke Tas, 100% matching width) */}
              <AddToCartButton
                disabled={!isAvailable}
                lines={cartLines}
                redirectTo="checkout"
                wrapperClassName="w-full block"
                className="w-full h-12 py-3.5 px-6 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] font-semibold text-[11px] uppercase tracking-[0.2em] transition-all disabled:bg-[#E2DFD8] disabled:!text-[#5A5550] disabled:cursor-not-allowed cursor-pointer shadow-md flex items-center justify-center"
              >
                {isAvailable ? 'BELI SEKARANG' : 'HABIS TERJUAL'}
              </AddToCartButton>
            </div>

            {/* Trust Guarantee Grid (Standard 3S 1C 1T & 1H - Frameless) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-4 border-t border-[#E2DFD8] text-[10px] text-[#5A5550]">
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-[8px]">&bull;</span>
                <span>Bebas Tukar Ukuran 7 Hari</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-[8px]">&bull;</span>
                <span>100% Batik Asli Cap/Tulis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-[8px]">&bull;</span>
                <span>Lapis Furing Katun Hero Adem</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] text-[8px]">&bull;</span>
                <span>Pengiriman Seluruh Indonesia</span>
              </div>
            </div>

            {/* Dual Clean Accordions: Deskripsi (Auto Show) & Pengiriman (Short Title) */}
            <div className="border-t border-[#E2DFD8] divide-y divide-[#E2DFD8] text-xs pt-1">
              {/* Accordion 1: Deskripsi & Spesifikasi (Auto Show / Open by default) */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('deskripsi')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-[#111111] text-left cursor-pointer"
                >
                  <span>DESKRIPSI &amp; SPESIFIKASI KARYA</span>
                  <span className="text-sm font-normal">{openSections.deskripsi ? '−' : '+'}</span>
                </button>

                {openSections.deskripsi && (
                  <div className="mt-3 text-xs leading-relaxed font-light space-y-3">
                    {/* Story Narrative */}
                    {parsedDescription.story && (
                      <p className="text-xs sm:text-sm text-[#444444] font-light leading-relaxed italic font-serif">
                        &ldquo;{parsedDescription.story}&rdquo;
                      </p>
                    )}

                    {/* Frameless Atelier Specifications List (Zero Cards/Frames) */}
                    {parsedDescription.specs.length > 0 ? (
                      <div className="divide-y divide-[#E2DFD8]/80 pt-1">
                        {parsedDescription.specs.map((item, idx) => (
                          <div key={idx} className="py-2 flex items-baseline justify-between gap-4">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-[#888888] font-medium shrink-0">
                              {item.label || 'Spesifikasi'}
                            </span>
                            <span className="text-right text-xs text-[#111111] font-light">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      descriptionHtml && (
                        <div
                          className="text-xs text-[#5A5550] leading-relaxed font-light space-y-2"
                          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                        />
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Pengiriman & Garansi (Short, clean title) */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection('shipping')}
                  className="w-full flex items-center justify-between font-semibold uppercase tracking-[0.16em] text-[#111111] text-left cursor-pointer"
                >
                  <span>PENGIRIMAN &amp; GARANSI TUKAR</span>
                  <span className="text-sm font-normal">{openSections.shipping ? '−' : '+'}</span>
                </button>

                {openSections.shipping && (
                  <div className="mt-3 divide-y divide-[#E2DFD8]/80 text-xs">
                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-[9px] mt-0.5 shrink-0">◆</span>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#111111] block mb-0.5">
                          Pengiriman Cepat &amp; Terlindungi
                        </span>
                        <p className="text-xs text-[#5A5550] font-light leading-relaxed">
                          Seluruh pesanan dikemas aman dan dikirim langsung dari Flagship Showroom Batik Smile Simongan Semarang ke seluruh Indonesia.
                        </p>
                      </div>
                    </div>

                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-[9px] mt-0.5 shrink-0">◆</span>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#111111] block mb-0.5">
                          Garansi Bebas Tukar Ukuran 7 Hari
                        </span>
                        <p className="text-xs text-[#5A5550] font-light leading-relaxed">
                          Bebas tukar ukuran dalam 7 hari kalender setelah pesanan diterima apabila ukuran kurang pas di badan.
                        </p>
                      </div>
                    </div>

                    <div className="py-2.5 flex items-start gap-3">
                      <span className="text-[#C5A059] text-[9px] mt-0.5 shrink-0">◆</span>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#111111] block mb-0.5">
                          Layanan Konsultasi 3S 1C 1T &amp; 1H
                        </span>
                        <p className="text-xs text-[#5A5550] font-light leading-relaxed">
                          Tim penjahit dan konsultan kami siap mendampingi panduan ukuran melalui WhatsApp Concierge{' '}
                          <a
                            href="https://wa.me/6281390888809"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#9E7D3B] font-medium underline underline-offset-2 hover:text-[#111111] transition-colors"
                          >
                            081-390-8888-09
                          </a>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tier-Differentiated Heritage Showcase Section (Sarimbit Exclusive & Premium) */}
        {isExclusiveTier && (
          <section className="mt-16 sm:mt-20 -mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 bg-[#111111] text-white py-14 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 border-y border-[#C5A059]/40 relative overflow-hidden">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold block mb-2">
                  HAUTE HERITAGE &bull; MAHAKARYA SARIMBIT EXCLUSIVE
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal tracking-wide leading-snug mb-3">
                  Keagungan Sutra Alam ATBM &amp; Canting Prada Emas Murni
                </h2>
                <div className="w-16 h-px mx-auto my-4 bg-[#C5A059]" />
                <p className="text-xs sm:text-sm text-[#E2DFD8]/80 font-light leading-relaxed">
                  Koleksi Sarimbit Exclusive diciptakan khusus untuk momen sakral resepsi, akad pernikahan, dan perayaan agung keluarga. Setiap helai kain ditenun dan dibatik dengan ketelitian maestro Butik Batik Smile Simongan Semarang.
                </p>
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-[#181818] border border-[#C5A059]/30 text-center">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A059] font-bold block mb-2">
                    PILAR 01 &bull; KAIN PUSAKA
                  </span>
                  <h3 className="font-serif text-lg text-white font-normal mb-2">
                    Sutra Alam ATBM 1-of-1
                  </h3>
                  <p className="text-xs text-[#E2DFD8]/75 font-light leading-relaxed">
                    Ditenun manual dengan alat tenun bukan mesin, menghasilkan kilau serat alami yang bernapas, jatuh anggun di badan, dan tidak gerah sepanjang prosesi perayaan.
                  </p>
                </div>

                <div className="p-6 bg-[#181818] border border-[#C5A059]/30 text-center">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A059] font-bold block mb-2">
                    PILAR 02 &bull; SENTUHAN MAESTRO
                  </span>
                  <h3 className="font-serif text-lg text-white font-normal mb-2">
                    Canting Prada Emas Murni
                  </h3>
                  <p className="text-xs text-[#E2DFD8]/75 font-light leading-relaxed">
                    Aksen prada emas murni digoreskan teliti pada motif pusaka, memancarkan aura wibawa ningrat yang memikat di bawah pencahayaan ballroom pesta.
                  </p>
                </div>

                <div className="p-6 bg-[#181818] border border-[#C5A059]/30 text-center">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A059] font-bold block mb-2">
                    PILAR 03 &bull; LAYANAN CONCIERGE
                  </span>
                  <h3 className="font-serif text-lg text-white font-normal mb-2">
                    VIP Fitting &amp; Harmoni Pasangan
                  </h3>
                  <p className="text-xs text-[#E2DFD8]/75 font-light leading-relaxed">
                    Setiap motif kemeja pria dan gaun wanita dipastikan menyambung simetris sempurna, didampingi konsultan busana langsung dari Flagship Showroom Simongan Semarang.
                  </p>
                </div>
              </div>

              {/* VIP Concierge Link */}
              <div className="text-center">
                <a
                  href={`https://wa.me/6281390888809?text=${encodeURIComponent(`Halo Butik Batik Smile Semarang, saya tertarik konsultasi koleksi Sarimbit Exclusive: ${title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-8 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[10px] uppercase font-bold tracking-[0.22em] transition-all shadow-lg cursor-pointer"
                >
                  KONSULTASI VIP CONCIERGE &rarr;
                </a>
              </div>
            </div>
          </section>
        )}

        {isPremiumTier && (
          <section className="mt-16 sm:mt-20 -mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 bg-[#F3EDE2] text-[#111111] py-14 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 border-y border-[#C5A059]/35 relative overflow-hidden">
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#9E7D3B] font-bold block mb-2">
                  SIGNATURE ATELIER &bull; STANDAR SARIMBIT PREMIUM
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-[#111111] font-normal tracking-wide leading-snug mb-3">
                  Kemewahan Tenun Dobby Timbul &amp; Kenyamanan Pesta Tropis
                </h2>
                <div className="w-16 h-px mx-auto my-4 bg-[#9E7D3B]" />
                <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
                  Sarimbit Premium Signature dirancang khusus untuk kenyamanan optimal resepsi dan perhelatan keluarga. Dibuat dari tenun dobby berkarakter timbul yang kokoh dan dilapisi furing katun hero adem sejuk.
                </p>
              </div>

              {/* 3 Signature Standards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-white/95 border border-[#C5A059]/30 text-center shadow-sm">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-bold block mb-2">
                    STANDAR BUTIK 01
                  </span>
                  <h3 className="font-sans text-sm uppercase font-semibold text-[#111111] mb-2 tracking-wide">
                    Tekstur Tenun Dobby Timbul
                  </h3>
                  <p className="text-xs text-[#5A5550] font-light leading-relaxed">
                    Karakter bahan bermotif timbul bertekstur tebal, tidak menerawang, tidak mudah kusut saat duduk lama, dan tahan cuci tanpa kehilangan kilau anggunnya.
                  </p>
                </div>

                <div className="p-6 bg-white/95 border border-[#C5A059]/30 text-center shadow-sm">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-bold block mb-2">
                    STANDAR BUTIK 02
                  </span>
                  <h3 className="font-sans text-sm uppercase font-semibold text-[#111111] mb-2 tracking-wide">
                    Furing Katun Hero Sejuk
                  </h3>
                  <p className="text-xs text-[#5A5550] font-light leading-relaxed">
                    Lapis furing katun hero premium halus yang menyerap keringat dan adem, menjamin kenyamanan maksimal sekeluarga dari awal hingga akhir acara.
                  </p>
                </div>

                <div className="p-6 bg-white/95 border border-[#C5A059]/30 text-center shadow-sm">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#9E7D3B] font-bold block mb-2">
                    STANDAR BUTIK 03
                  </span>
                  <h3 className="font-sans text-sm uppercase font-semibold text-[#111111] mb-2 tracking-wide">
                    Garansi Bebas Tukar 7 Hari
                  </h3>
                  <p className="text-xs text-[#5A5550] font-light leading-relaxed">
                    Layanan purna jual resmi Batik Smile Nusantara dengan garansi bebas tukar ukuran dalam 7 hari kalender apabila ukuran salah satu anggota keluarga kurang pas.
                  </p>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="text-center">
                <a
                  href={`https://wa.me/6281390888809?text=${encodeURIComponent(`Halo Butik Batik Smile Semarang, saya ingin konsultasi ukuran & seragam Sarimbit Premium: ${title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#9E7D3B] text-white text-[10px] uppercase font-semibold tracking-[0.2em] transition-all shadow-md cursor-pointer"
                >
                  KONSULTASI SARIMBIT RESEPSI &rarr;
                </a>
              </div>
            </div>
          </section>
        )}

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
