import React from 'react';
import { useOptimisticCart } from '@shopify/hydrogen';
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
            <span className="font-semibold tracking-[0.12em] uppercase text-[10px] sm:text-[11px]">
              GRATIS ONGKIR &amp; ASURANSI PENGIRIMAN SE-INDONESIA
            </span>
          </div>
          <span className="hidden sm:inline text-[10px] text-[#888888] tracking-wider uppercase font-light">
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
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#111111]">
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
              <div className="pt-3 border-t border-[#E2DFD8] flex items-center justify-between text-[11px] text-[#888888] font-light">
                <span>Total {cart.totalQuantity} busana pilihan butik</span>
              </div>
            </div>

            {/* Shopify Order Notes (Catatan Pesanan Khusus - Zero Card Box) */}
            <div className="pt-6 border-t border-[#E2DFD8]">
              <label
                htmlFor="cart-note"
                className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-1"
              >
                CATATAN PESANAN (OPSIONAL)
              </label>
              <p className="text-xs text-[#5A5550] font-light mb-2.5">
                Tambahkan permintaan ukuran khusus, instruksi kurir, atau ucapan kartu untuk kado:
              </p>
              <textarea
                id="cart-note"
                name="note"
                rows={2}
                placeholder="Tuliskan catatan pesanan Anda di sini..."
                className="w-full p-3 text-base sm:text-xs text-[#111111] placeholder:text-[#888888] bg-white/70 border border-[#E2DFD8] focus:border-[#111111] focus:bg-white focus:outline-hidden transition-colors"
              />
            </div>

            {/* Whispered Quality Guarantee (No Card Box) */}
            <div className="pt-5 border-t border-[#E2DFD8] text-xs text-[#5A5550] space-y-1.5 font-light">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7C3F1D] block mb-1">
                STANDAR BUTIK BATIK SMILE
              </span>
              <p className="leading-relaxed">
                Garansi sambung pola simetris 100%, furing katun hero adem, dan layanan bebas penukaran ukuran jika busana kurang pas dicoba.
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
              <p className="text-[11px] text-[#5A5550] font-light mb-1">
                Butuh bantuan fitting atau pengiriman kilat?
              </p>
              <a
                href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile,%20saya%20ingin%20konsultasi%20pesanan%20tas%20belanja"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7C3F1D] hover:text-[#111111] transition-colors inline-flex items-center gap-1.5"
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
    <div className="cart-details flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <ul aria-label="Daftar produk" className="divide-y divide-[#E2DFD8]">
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
        <div className="p-5 bg-[#FAF8F5] border-t border-[#E2DFD8] shrink-0">
          <CartSummary cart={cart} layout={layout} />
        </div>
      )}
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
      title: 'Sarimbit Exclusive',
      desc: 'Sutra Alam ATBM & Prada Emas',
      image: '/banners/hero_slider_1.jpg',
      to: '/collections/sarimbit-exclusive',
    },
    {
      title: 'Sarimbit Premium',
      desc: 'Tenun Dobby Resepsi Keluarga',
      image: '/banners/sarimbit_family_banner.jpg',
      to: '/collections/sarimbit-premium',
    },
    {
      title: 'Kemeja Batik Pria',
      desc: 'Sambung Pola & Furing Hero Katun',
      image: '/banners/collection_kain_tulis_banner.jpg',
      to: '/collections/batik-pria',
    },
  ];

  return (
    <div className="text-center py-12 sm:py-16 px-4">
      {/* Monogram Diamond Bag Icon */}
      <div className="w-12 h-12 mx-auto mb-4 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeWidth="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>

      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
        GALERI BELANJA BUTIK
      </span>
      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] mb-3">
        Tas Belanja Anda Masih Kosong
      </h3>
      <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
      <p className="text-xs text-[#5A5550] font-light max-w-md mx-auto mb-8 leading-relaxed">
        Eksplorasi mahakarya sarimbit keluarga 3 kasta, kemeja batik pria lapis furing katun hero sejuk, atau kain batik tulis canting 1-of-1 dari butik resmi kami di Semarang.
      </p>

      <div className="mb-10">
        <Link
          to="/collections/all"
          onClick={close}
          prefetch="viewport"
          className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
        >
          MULAI JELAJAHI KOLEKSI &rarr;
        </Link>
      </div>

      {/* Recommended Atelier Pillars (Rendered on /cart page) */}
      {layout === 'page' && (
        <div className="mt-8 pt-10 border-t border-[#E2DFD8] text-left max-w-4xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#7C3F1D] font-semibold block mb-1 text-center">
            REKOMENDASI KOLEKSI PILIHAN
          </span>
          <p className="text-xs text-[#5A5550] font-light text-center mb-6">
            Mulai penjelajahan busana dari pilar kasta terpopuler:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CURATED_PILLARS.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group block bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all p-3"
              >
                <div className="aspect-[4/5] bg-[#111111] overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h4 className="font-serif text-sm text-[#111111] group-hover:text-[#C5A059] transition-colors mb-0.5">
                  {item.title}
                </h4>
                <p className="text-[10px] text-[#777777] font-light">
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
