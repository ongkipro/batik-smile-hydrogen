import React, { useState } from 'react';
import { useOptimisticCart, CartForm } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { useAside } from '~/components/Aside';
import { CartLineItem } from '~/components/CartLineItem';
import { CartSummary } from './CartSummary';

/**
 * Returns a map of all line items and their children.
 * @param {CartLine[]} lines
 * @return {import("/Users/ongki/Projects/batik-smile-hydrogen/app/components/CartMain").LineItemChildrenMap}
 */
function getLineItemChildrenMap(lines) {
  const children = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const lineChildren = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(lineChildren)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}

/**
 * Architectural Shopify 2-Column Cart Component (Zero-Box, Pure Quiet Luxury)
 * Removes nested box cards and widget frames in favor of an organic editorial stream.
 *
 * @param {CartMainProps}
 */
export function CartMain({ layout, cart: originalCart }) {
  const cart = useOptimisticCart(originalCart);
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);

  if (!linesCount) {
    return <CartEmpty layout={layout} />;
  }

  // 1. FRAMELESS 2-COLUMN SHOPIFY CART PAGE
  if (layout === 'page') {
    return (
      <div className="w-full">
        {/* Whispered Free Shipping Indicator (No Card Container) */}
        <div className="mb-6 pb-3 border-b border-[#E2DFD8] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#7C3F1D]">
            <span className="w-1.5 h-1.5 bg-[#C5A059] shrink-0" />
            <span className="font-semibold tracking-[0.12em] uppercase text-xs">
              PENGIRIMAN AMAN &amp; BERASURANSI SE-INDONESIA
            </span>
          </div>
          <span className="hidden sm:inline text-xs text-[#888888] tracking-wider uppercase font-light">
            Butik Resmi Semarang
          </span>
        </div>

        {/* 2-Column Asymmetric Grid: Left (7 Cols) Products & Notes, Right (5 Cols) Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Line Items & Order Note (Frameless, Zero Card Boxes) */}
          <div className="lg:col-span-7 space-y-7">
            {/* Products Stream */}
            <div>
              <div className="pb-2 mb-1 border-b border-[#111111]">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#111111]">
                  DAFTAR BUSANA ({cart.totalQuantity})
                </span>
              </div>

              <ul aria-label="Daftar produk dalam keranjang" className="divide-y divide-[#E2DFD8]">
                {(cart?.lines?.nodes ?? []).map((line) => {
                  if ('parentRelationship' in line && line.parentRelationship?.parent) {
                    return null;
                  }
                  return (
                    <CartLineItem
                      key={line.id}
                      line={line}
                      layout={layout}
                      childrenMap={childrenMap}
                    />
                  );
                })}
              </ul>

              {/* Bottom Info Row */}
              <div className="pt-3 border-t border-[#E2DFD8] flex items-center justify-between text-xs text-[#888888] font-light">
                <span>Total {cart.totalQuantity} busana pilihan butik</span>
              </div>
            </div>

            {/* Shopify Order Notes (Catatan Pesanan Khusus - Zero Card Box) */}
            <CartOrderNote initialNote={cart?.note ?? ''} />

            {/* Whispered Quality Guarantee (No Card Box) */}
            <div className="pt-5 border-t border-[#E2DFD8] text-xs text-[#5A5550] space-y-1.5 font-light">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#7C3F1D] block mb-1">
                STANDAR BUTIK BATIK SMILE
              </span>
              <p className="leading-relaxed">
                Garansi 100% Batik Indonesia, potongan pola simetris rapi, dan layanan bebas penukaran ukuran dalam 7 hari jika busana kurang pas dicoba.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Order Summary (Zero Heavy Card Bezel) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            {/* Summary Block */}
            <div className="bg-white/80 border border-[#E2DFD8] p-5 sm:p-7">
              <CartSummary cart={cart} layout={layout} />
            </div>

            {/* Concierge Link (Pure Text Whisper) */}
            <div className="text-center pt-2">
              <p className="text-xs text-[#5A5550] font-light mb-1">
                Butuh bantuan fitting atau pengiriman kilat?
              </p>
              <a
                href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile,%20saya%20ingin%20konsultasi%20pesanan%20tas%20belanja"
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.18em] font-semibold text-[#7C3F1D] hover:text-[#111111] transition-colors inline-flex items-center gap-1.5"
              >
                <span>WhatsApp Butik 081-390-8888-09</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. COMPACT ASIDE / DRAWER LAYOUT
  return (
    <div className="cart-details flex flex-col h-full bg-[#FAF8F5]">
      <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-3">
        <ul aria-label="Daftar produk dalam tas belanja" className="divide-y divide-[#E2DFD8]">
          {(cart?.lines?.nodes ?? []).map((line) => {
            if ('parentRelationship' in line && line.parentRelationship?.parent) {
              return null;
            }
            return (
              <CartLineItem
                key={line.id}
                line={line}
                layout={layout}
                childrenMap={childrenMap}
              />
            );
          })}
        </ul>
      </div>

      {cartHasItems && (
        <div className="px-5 sm:px-7 py-4 sm:py-5 bg-white border-t border-[#E2DFD8] shadow-[0_-8px_25px_rgba(0,0,0,0.04)] shrink-0">
          <CartSummary cart={cart} layout={layout} />
        </div>
      )}
    </div>
  );
}

/**
 * Interactive Order Note form wired to CartForm.ACTIONS.NoteUpdate
 * @param {{ initialNote?: string }} props
 */
function CartOrderNote({ initialNote = '' }) {
  const [note, setNote] = useState(initialNote);
  const [saved, setSaved] = useState(false);

  return (
    <div className="pt-6 border-t border-[#E2DFD8]">
      <div className="flex items-center justify-between mb-1">
        <label
          htmlFor="cart-note"
          className="text-xs uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block"
        >
          CATATAN PESANAN (OPSIONAL)
        </label>
        {saved && (
          <span className="text-xs uppercase tracking-[0.16em] text-[#2A5C3F] font-semibold">
            ✓ Catatan Tersimpan
          </span>
        )}
      </div>
      <p className="text-xs text-[#5A5550] font-light mb-2.5">
        Tambahkan permintaan ukuran khusus, instruksi kurir, atau ucapan kartu untuk kado:
      </p>
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.NoteUpdate}
        inputs={{ note }}
      >
        {(fetcher) => {
          const isSaving = fetcher.state !== 'idle';
          return (
            <div className="space-y-2">
              <textarea
                id="cart-note"
                name="note"
                rows={2}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  if (saved) setSaved(false);
                }}
                placeholder="Tuliskan catatan pesanan Anda di sini..."
                className="w-full p-3 text-base sm:text-xs text-[#111111] placeholder:text-[#888888] bg-white/70 border border-[#E2DFD8] focus:border-[#111111] focus:bg-white focus:outline-hidden transition-colors"
              />
              {note !== initialNote && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    onClick={() => setSaved(true)}
                    className="px-4 py-1.5 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-xs uppercase font-semibold tracking-[0.18em] transition-colors cursor-pointer"
                  >
                    {isSaving ? 'MENYIMPAN...' : 'SIMPAN CATATAN'}
                  </button>
                </div>
              )}
            </div>
          );
        }}
      </CartForm>
    </div>
  );
}

/**
 * Elevated Empty Cart State (Shopify Atelier Standard)
 *
 * @param {{
 *   layout?: CartMainProps['layout'];
 * }}
 */
function CartEmpty({ layout }) {
  const { close } = useAside();

  const CURATED_PILLARS = [
    {
      title: 'Luxury Series',
      desc: 'Sutra Alam ATBM & Prada Emas',
      image: '/banners/hero_slider_1.jpg',
      to: '/collections/luxury-series',
    },
    {
      title: 'Premium Series',
      desc: 'Tenun Dobby Resepsi Keluarga',
      image: '/banners/sarimbit_family_banner.jpg',
      to: '/collections/premium-series',
    },
    {
      title: 'Ekonomi Series',
      desc: 'Katun Primisima Adem & Sejuk',
      image: '/banners/collection_kain_tulis_banner.jpg',
      to: '/collections/ekonomi-series',
    },
  ];

  return (
    <div className="text-center py-12 sm:py-16 px-4">
      {/* Monogram Diamond Bag Icon */}
      <div className="w-13 h-13 mx-auto mb-4 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M4.5 8H19.5L18.75 21H5.25L4.5 8Z"
          />
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M8.5 8V5.5C8.5 3.567 10.067 2 12 2C13.933 2 15.5 3.567 15.5 5.5V8"
          />
        </svg>
      </div>

      <span className="text-xs uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
        GALERI BELANJA BUTIK
      </span>
      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] mb-3">
        Tas Belanja Anda Masih Kosong
      </h3>
      <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
      <p className="text-xs text-[#5A5550] font-light max-w-md mx-auto mb-8 leading-relaxed">
        Eksplorasi mahakarya sarimbit keluarga 3 kasta, kemeja batik pria, busana wanita modern, atau kain batik tulis canting dari butik resmi kami di Semarang.
      </p>

      <div className="mb-10">
        <Link
          to="/collections/all"
          onClick={close}
          prefetch="viewport"
          className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-xs uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
        >
          MULAI JELAJAHI KOLEKSI &rarr;
        </Link>
      </div>

      {/* Recommended Atelier Pillars (Rendered on /cart page) */}
      {layout === 'page' && (
        <div className="mt-8 pt-10 border-t border-[#E2DFD8] text-left max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.22em] text-[#7C3F1D] font-semibold block mb-1 text-center">
            REKOMENDASI KOLEKSI PILIHAN
          </span>
          <p className="text-xs text-[#5A5550] font-light text-center mb-6">
            Mulai penjelajahan busana dari pilar kasta terpopuler:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CURATED_PILLARS.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group block no-underline transition-all"
              >
                <div className="aspect-[4/5] bg-[#111111] overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h4 className="font-serif text-base text-[#111111] group-hover:text-[#C5A059] transition-colors mb-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-[#777777] font-light">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** @typedef {'page' | 'aside'} CartLayout */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartMainProps
 */
/** @typedef {{[parentId: string]: CartLine[]}} LineItemChildrenMap */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartLineItem').CartLine} CartLine */
