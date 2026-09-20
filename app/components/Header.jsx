import React, { useState, useEffect, Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { AnnouncementBar } from './AnnouncementBar';

/**
 * Header: Quiet Luxury Nusantara Master Header
 * Official brand logo, zero border radius, micro-tracking navigation
 * Dynamic Glass Effect on scroll & solid white canvas on hover
 *
 * @param {HeaderProps} props
 */
export function Header({ _header, isLoggedIn, cart, _publicStoreDomain }) {
  const { open } = useAside();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full transition-all">
      <AnnouncementBar />

      <header
        className={`w-full transition-all duration-300 relative z-50 hover:bg-white ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-[#E2DFD8]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : 'bg-[#FAF8F5] border-b border-[#E2DFD8]'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 sm:h-20 flex items-center justify-between relative">
          {/* Left: Mobile Menu Trigger / Desktop Brand Logo */}
          <div className="flex items-center lg:flex-1 justify-start">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-[#7C3F1D] hover:text-[#9E7D3B] transition-colors cursor-pointer"
              onClick={() => open('mobile')}
              aria-label="Buka menu navigasi"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Brand Logo (Left-aligned on lg screens) */}
            <NavLink to="/" className="hidden lg:flex items-center group flex-shrink-0">
              <span className="font-serif text-[22px] sm:text-[24px] uppercase tracking-[0.22em] bg-gradient-to-r from-[#9E7D3B] via-[#C5A059] to-[#7B5B24] text-transparent bg-clip-text transition-all duration-700 leading-none">
                BATIK SMILE
              </span>
            </NavLink>
          </div>

          {/* Mobile Centered Brand Logo (Dead Center on Mobile Viewports - Calibrated Size) */}
          <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <NavLink to="/" className="flex items-center group">
              <span className="font-serif text-[20px] uppercase tracking-[0.22em] bg-gradient-to-r from-[#9E7D3B] via-[#C5A059] to-[#7B5B24] text-transparent bg-clip-text transition-all duration-700 leading-none">
                BATIK SMILE
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation (Middle Center Precision) */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-shrink-0 text-[13px] font-medium uppercase tracking-[0.16em]">
            {[
              { label: 'Sarimbit Luxury', to: '/collections/sarimbit-luxury' },
              { label: 'Sarimbit Premium', to: '/collections/sarimbit-premium' },
              { label: 'Sarimbit Ekonomi', to: '/collections/sarimbit-ekonomi' },
              { label: 'Kain', to: '/collections/kain' },
              { label: 'Aksesoris', to: '/collections/aksesoris' },
              { label: 'Batik Anak', to: '/collections/batik-anak' },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative pb-1 transition-colors duration-500 ${
                    isActive ? 'text-[#9E7D3B]' : 'text-[#7C3F1D] hover:text-[#9E7D3B]'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#9E7D3B] after:transition-transform after:duration-700 after:ease-out after:origin-left ${
                    isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons: Search (Desktop), Account, Cart */}
          <div className="flex items-center justify-end flex-1">
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
          </div>
        </div>
      </header>
    </div>
  );
}

function HeaderCtas({ cart }) {
  const { open } = useAside();

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Search Trigger (Desktop Only, since Search already exists in Mobile Sticky Navigation) */}
      <button
        type="button"
        onClick={() => open('search')}
        className="hidden lg:flex items-center justify-center p-2 sm:p-2.5 text-[#7C3F1D] hover:text-[#9E7D3B] transition-colors cursor-pointer"
        aria-label="Cari produk"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Customer Account Link (Desktop Only, on mobile it is sticky in burger menu) */}
      <NavLink
        to="/account"
        className="hidden lg:flex items-center justify-center p-2 sm:p-2.5 text-[#7C3F1D] hover:text-[#9E7D3B] transition-colors"
        aria-label="Akun saya"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </NavLink>

      {/* Cart Drawer Trigger Button */}
      <CartToggle cart={cart} />
    </div>
  );
}

function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

function CartBadge({ count }) {
  const { publish, shop, cart, prevCart } = useAnalytics();
  const { open } = useAside();

  return (
    <button
      type="button"
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="flex items-center justify-center p-2 sm:p-2.5 text-[#7C3F1D] hover:text-[#9E7D3B] transition-colors cursor-pointer"
      aria-label={`Tas Belanja (${count} item)`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <span className="ml-1.5 text-[12px] font-medium tracking-[0.1em]">{count}</span>
    </button>
  );
}

/**
 * Mobile Navigation Drawer Link Helper (Master Quiet Luxury Experience)
 */
export function HeaderMenu({ _menu, _viewport, _publicStoreDomain, _primaryDomainUrl }) {
  const { close } = useAside();

  return (
    <nav className="flex flex-col min-h-full bg-[#FAF8F5]" role="navigation">
      <div className="flex-1 p-5 sm:p-6 pb-6">
        {/* Brand Heritage Stamp */}
      <div className="pb-4 border-b border-[#E2DFD8] mb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9E7D3B] block">
            BUTIK BATIK SMILE
          </span>
          <span className="text-[9px] uppercase tracking-[0.16em] text-[#5A5550] block mt-0.5">
            Semarang • Est. 2007
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-widest text-[#111111] bg-white border border-[#E2DFD8] px-2 py-0.5 font-semibold">
          3 LANTAI
        </span>
      </div>

      {/* Kategori Utama Mobile */}
      <div className="mb-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E2DFD8] mb-2">
          <span className="w-1.5 h-1.5 bg-[#9E7D3B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">
            KATEGORI UTAMA
          </span>
        </div>

        <div className="space-y-1">
          {[
            { label: 'Sarimbit Luxury', to: '/collections/sarimbit-luxury', desc: 'Sutra ATBM & Tulis Premium' },
            { label: 'Sarimbit Premium', to: '/collections/sarimbit-premium', desc: 'Tenun Dobby & Primisima Halus' },
            { label: 'Sarimbit Ekonomi', to: '/collections/sarimbit-ekonomi', desc: 'Katun Berkualitas Nyaman' },
            { label: 'Kain', to: '/collections/kain', desc: 'Bahan Lembaran & Batik Tulis' },
            { label: 'Aksesoris', to: '/collections/aksesoris', desc: 'Blangkon, Bros & Pelengkap' },
            { label: 'Batik Anak', to: '/collections/batik-anak', desc: 'Koleksi Putra & Putri' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={close}
              className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#9E7D3B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 4l3 5-2 12H11L9 9l3-5z" />
                </svg>
                <div>
                  <span className="block font-semibold uppercase">{item.label}</span>
                  <span className="text-[10px] text-[#5A5550] font-light normal-case">{item.desc}</span>
                </div>
              </div>
              <span className="text-[#A69F96]">&rarr;</span>
            </NavLink>
          ))}
          
          <NavLink
            to="/collections/all"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <span className="font-semibold">SEMUA PRODUK BUTIK</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>
        </div>
      </div>

      {/* Section 3: Jurnal & Edukasi Budaya */}
      <div className="mb-6">
        <NavLink
          to="/blogs"
          onClick={close}
          className="p-3 bg-white border border-[#9E7D3B]/50 hover:border-[#111111] transition-all flex items-center justify-between shadow-sm group"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#9E7D3B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111] group-hover:text-[#9E7D3B] transition-colors block">
                WARTA &amp; JURNAL BUDAYA
              </span>
              <p className="text-[10px] text-[#5A5550] font-light mt-0.5">
                Kisah canting, filosofi motif, &amp; panduan wastra.
              </p>
            </div>
          </div>
          <span className="text-xs text-[#9E7D3B] font-bold">&rarr;</span>
        </NavLink>
      </div>

      {/* Section 4: Layanan Butik & Showroom */}
      <div className="mb-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E2DFD8] mb-2">
          <span className="w-1.5 h-1.5 bg-[#9E7D3B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">
            LAYANAN &amp; SHOWROOM
          </span>
        </div>

        <div className="space-y-1">
          <NavLink
            to="/pages/layanan-seragam"
            onClick={close}
            className="py-2 px-3 text-[11px] font-medium tracking-[0.12em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
          >
            <span>Layanan Seragam &amp; Bespoke Tailoring</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/pages/fasilitas-store"
            onClick={close}
            className="py-2 px-3 text-[11px] font-medium tracking-[0.12em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
          >
            <span>Fasilitas Showroom 3 Lantai (Simongan)</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/pages/lokasi-toko"
            onClick={close}
            className="py-2 px-3 text-[11px] font-medium tracking-[0.12em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
          >
            <span>Lokasi Toko &amp; Jam Buka</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/pages/tentang-kami"
            onClick={close}
            className="py-2 px-3 text-[11px] font-medium tracking-[0.12em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
          >
            <span>Tentang Batik Smile (Sejak 2007)</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>
        </div>
      </div>

      </div>

      {/* Sticky Account Action at Bottom of Mobile Burger Drawer */}
      <div className="sticky bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-[#E2DFD8] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <NavLink
          to="/account"
          onClick={close}
          className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#9E7D3B] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-sm"
        >
          <svg className="w-4 h-4 text-[#9E7D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>AKUN SAYA &amp; STATUS PESANAN</span>
          <span>&rarr;</span>
        </NavLink>
      </div>
    </nav>
  );
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */
/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
