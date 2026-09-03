import React, { useState, useEffect, Suspense } from 'react';
import { Await, NavLink, Link, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { AnnouncementBar } from './AnnouncementBar';
import { MegaMenu } from './MegaMenu';

/**
 * Header: Quiet Luxury Nusantara Master Header
 * Official brand logo, zero border radius, micro-tracking navigation
 * Dynamic Glass Effect on scroll & solid white canvas on hover/mega-menu
 *
 * @param {HeaderProps} props
 */
export function Header({ _header, isLoggedIn, cart, _publicStoreDomain }) {
  const { open } = useAside();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isWhite = isHovered || isMenuOpen;

  return (
    <div className="sticky top-0 z-40 w-full transition-all">
      <AnnouncementBar />

      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full transition-all duration-300 relative z-50 hover:bg-white ${
          isWhite
            ? 'bg-white shadow-md border-b border-[#E2DFD8]'
            : isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-[#E2DFD8]/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : 'bg-[#FAF8F5] border-b border-[#E2DFD8]'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 sm:h-20 flex items-center justify-between relative">
          {/* Left: Mobile Menu Trigger / Desktop Brand Logo */}
          <div className="flex items-center lg:flex-1 justify-start">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
              onClick={() => open('mobile')}
              aria-label="Buka menu navigasi"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Brand Logo (Left-aligned on lg screens) */}
            <NavLink to="/" className="hidden lg:flex items-center group flex-shrink-0">
              <img
                src="/brand/batik-smile-logo.png"
                alt="Batik Smile Nusantara"
                className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </NavLink>
          </div>

          {/* Mobile Centered Brand Logo (Dead Center on Mobile Viewports - Calibrated Size) */}
          <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <NavLink to="/" className="flex items-center group">
              <img
                src="/brand/batik-smile-logo.png"
                alt="Batik Smile Nusantara"
                className="h-10 sm:h-11 w-auto max-w-[170px] sm:max-w-[200px] object-contain group-hover:opacity-90 transition-opacity"
              />
            </NavLink>
          </div>

          {/* Desktop Mega Menu Navigation (Middle Center Precision) */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0">
            <MegaMenu onMenuStateChange={setIsMenuOpen} />
          </div>

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
        className="hidden lg:flex items-center justify-center p-2 sm:p-2.5 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
        aria-label="Cari produk"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Customer Account Link (Desktop Only, on mobile it is sticky in burger menu) */}
      <NavLink
        to="/account"
        className="hidden lg:flex items-center justify-center p-2 sm:p-2.5 text-[#111111] hover:text-[#C5A059] transition-colors"
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

  return (
    <Link
      to="/cart"
      prefetch="intent"
      onClick={() => {
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="flex items-center justify-center gap-2 h-9 px-3 sm:px-3.5 bg-[#111111] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#111111] transition-all cursor-pointer border border-[#C5A059]/40 shadow-sm ml-1"
      aria-label={`Tas Belanja (${count} item)`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <span className="text-[11px] font-bold tracking-wider">{count}</span>
    </Link>
  );
}

/**
 * Mobile Navigation Drawer Link Helper (Master Quiet Luxury Experience)
 */
export function HeaderMenu({ _menu, _viewport, _publicStoreDomain, _primaryDomainUrl }) {
  const { close } = useAside();
  const [sarimbitOpen, setSarimbitOpen] = useState(true);

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

      {/* Section 1: Sarimbit Accordion */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setSarimbitOpen(!sarimbitOpen)}
          className="w-full flex items-center justify-between pb-2 border-b border-[#E2DFD8] mb-3 text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] group-hover:text-[#9E7D3B] transition-colors">
              SARIMBIT KELUARGA
            </span>
          </div>
          <span className="text-[10px] text-[#5A5550] uppercase tracking-wider font-semibold">
            {sarimbitOpen ? 'Tutup −' : 'Buka +'}
          </span>
        </button>

        {sarimbitOpen && (
          <div className="space-y-1.5 pl-3 border-l-2 border-[#C5A059]/40 mb-2">
            <NavLink
              to="/collections/sarimbit-exclusive"
              onClick={close}
              className="block p-2.5 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.12em] text-[#111111]">
                  Sarimbit Mahakarya Heritage
                </span>
                <span className="text-[9px] text-[#9E7D3B] font-bold uppercase tracking-widest bg-[#FAF8F5] px-1.5 py-0.5">
                  EKSKLUSIF
                </span>
              </div>
              <p className="text-[10px] text-[#5A5550] font-light mt-0.5">Sutra ATBM &amp; Dobby Tulis Halus</p>
            </NavLink>

            <NavLink
              to="/collections/sarimbit-premium"
              onClick={close}
              className="block p-2.5 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.12em] text-[#111111]">
                  Sarimbit Signature Elegance
                </span>
                <span className="text-[9px] text-[#9E7D3B] font-bold uppercase tracking-widest bg-[#FAF8F5] px-1.5 py-0.5">
                  PREMIUM
                </span>
              </div>
              <p className="text-[10px] text-[#5A5550] font-light mt-0.5">Katun Primissima Lapis Furing Hero</p>
            </NavLink>

            <NavLink
              to="/collections/sarimbit-ekonomis"
              onClick={close}
              className="block p-2.5 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.12em] text-[#111111]">
                  Sarimbit Essential Daily
                </span>
                <span className="text-[9px] text-[#5A5550] font-bold uppercase tracking-widest bg-[#FAF8F5] px-1.5 py-0.5">
                  EKONOMIS
                </span>
              </div>
              <p className="text-[10px] text-[#5A5550] font-light mt-0.5">Busana Kasual Harian Nyaman</p>
            </NavLink>

            <NavLink
              to="/collections/sarimbit-batik-couple"
              onClick={close}
              className="block py-2 text-center text-[10px] uppercase font-semibold tracking-[0.18em] text-[#9E7D3B] hover:text-[#111111] transition-colors"
            >
              Lihat Seluruh Sarimbit Couple &rarr;
            </NavLink>
          </div>
        )}
      </div>

      {/* Section 2: Busana Personal */}
      <div className="mb-6">
        <div className="flex items-center gap-2 pb-2 border-b border-[#E2DFD8] mb-2">
          <span className="w-1.5 h-1.5 bg-[#C5A059]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">
            BUSANA &amp; KARYA INDIVIDU
          </span>
        </div>

        <div className="space-y-1">
          <NavLink
            to="/collections/batik-pria"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-[#9E7D3B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M16 3H8l-4 4v14h16V7l-4-4zM9 3v4l3 3 3-3V3" />
              </svg>
              <div>
                <span className="block font-semibold">BATIK PRIA</span>
                <span className="text-[10px] text-[#5A5550] font-light">Kemeja Sambung Motif &amp; Furing Hero</span>
              </div>
            </div>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/collections/batik-wanita"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-[#9E7D3B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 4l3 5-2 12H11L9 9l3-5z" />
              </svg>
              <div>
                <span className="block font-semibold">BATIK WANITA</span>
                <span className="text-[10px] text-[#5A5550] font-light">Blus Modern, Tunik Sutra &amp; Outer Cantik</span>
              </div>
            </div>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/collections/batik-anak"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-[#9E7D3B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3L2 9.2h7.6z" />
              </svg>
              <div>
                <span className="block font-semibold">BATIK ANAK &amp; TRADISIONAL</span>
                <span className="text-[10px] text-[#5A5550] font-light">Setelan Surjan Adat Jawa &amp; Hem Katun</span>
              </div>
            </div>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/collections/jarik-kain-batik"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-[#9E7D3B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 19h16M4 15h16M4 11h16M4 7h16" />
              </svg>
              <div>
                <span className="block font-semibold">KAIN BATIK TULIS (LEMBARAN)</span>
                <span className="text-[10px] text-[#5A5550] font-light">Canting Malam Halus Solo &amp; Jogja</span>
              </div>
            </div>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

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
          className="p-3 bg-white border border-[#C5A059]/50 hover:border-[#111111] transition-all flex items-center justify-between shadow-sm group"
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
          <span className="w-1.5 h-1.5 bg-[#C5A059]" />
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
          className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-sm"
        >
          <svg className="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
