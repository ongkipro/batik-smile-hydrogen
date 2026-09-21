import React, { useState, useEffect, Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { AnnouncementBar } from './AnnouncementBar';

/**
 * Curated 1-Line Navigation Architecture (Dead Center, Zero Submenus)
 * Core Categories: Sarimbit Luxury, Sarimbit Premium, Sarimbit Ekonomi, Batik Anak, Kain, Aksesoris
 */
const NAV_ITEMS = [
  { label: 'Sarimbit Luxury', desc: 'Sutra ATBM & Prada Emas', to: '/collections/sarimbit-luxury' },
  { label: 'Sarimbit Premium', desc: 'Tenun Dobby & Furing Hero', to: '/collections/sarimbit-premium' },
  { label: 'Sarimbit Ekonomi', desc: 'Katun Primisima Sejuk', to: '/collections/sarimbit-ekonomi' },
  { label: 'Batik Anak', desc: 'Putra & Putri', to: '/collections/batik-anak' },
  { label: 'Kain', desc: 'Kain Tulis Canting 1-of-1', to: '/collections/kain' },
  { label: 'Aksesoris', desc: 'Blangkon & Aksesori', to: '/collections/aksesoris' },
];

/**
 * Master Header: Quiet Luxury Nusantara
 * - Dead Center Navigation Menu (Absolute Center, 1 Line, No Submenus).
 * - Text Logo Header Color: Gradient Gold (from previous design), Strictly No Sub-text.
 * - Zero WhatsApp CTA in Header.
 * - Zero Border Radius (0px).
 * - Layout-Shift Free Floating Cart Badge (Zero CLS).
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
        className={`w-full transition-all duration-300 relative z-50 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#E2DFD8] shadow-[0_2px_15px_rgba(0,0,0,0.04)]'
            : 'bg-[#FAF8F5] border-b border-[#E2DFD8]'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-18 sm:h-20 flex items-center justify-between relative">
          
          {/* 1. LEFT: Mobile Burger Trigger & Desktop Brand Logo (Pure Logo, No Subtitle) */}
          <div className="flex items-center z-10">
            {/* Mobile Burger Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2.5 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#111111] hover:text-[#9E7D3B] transition-colors cursor-pointer"
              onClick={() => open('mobile')}
              aria-label="Buka menu navigasi"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Brand Logo (Slightly Smaller & Refined for Architectural Precision) */}
            <NavLink to="/" className="hidden lg:flex items-center group flex-shrink-0">
              <span className="font-serif text-[18px] xl:text-[19px] uppercase tracking-[0.24em] bg-gradient-to-r from-[#4A2E1B] via-[#C5A059] to-[#7C3F1D] text-transparent bg-clip-text transition-all duration-700 leading-none">
                BATIK SMILE
              </span>
            </NavLink>
          </div>

          {/* 2. MOBILE CENTER LOGO (Dead Center on Mobile, Proportionally Sized) */}
          <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <NavLink to="/" className="flex items-center group">
              <span className="font-serif text-[16px] sm:text-[17px] uppercase tracking-[0.22em] bg-gradient-to-r from-[#4A2E1B] via-[#C5A059] to-[#7C3F1D] text-transparent bg-clip-text transition-all duration-700 leading-none">
                BATIK SMILE
              </span>
            </NavLink>
          </div>

          {/* 3. CENTER: Desktop Navigation Menu (Dead Center Precision, Strictly 1 Line, No Submenus) */}
          <nav
            aria-label="Navigasi Utama Butik"
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-5 xl:gap-8 2xl:gap-9 whitespace-nowrap z-10 text-[12px] xl:text-[13px] font-medium uppercase tracking-[0.18em]"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-1.5 transition-colors duration-300 ${
                    isActive ? 'text-[#9E7D3B] font-semibold' : 'text-[#5A5550] hover:text-[#111111]'
                  } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#9E7D3B] after:transition-transform after:duration-300 after:origin-left ${
                    isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* 4. RIGHT: Actions (Search, Account, Cart — Zero WhatsApp CTA) */}
          <div className="flex items-center justify-end z-10 gap-1 sm:gap-1.5">
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
          </div>
        </div>
      </header>
    </div>
  );
}

/**
 * Header Right Action Buttons (Search, Account, Cart — Zero WhatsApp CTA)
 */
function HeaderCtas({ _isLoggedIn, cart }) {
  const { open } = useAside();

  return (
    <div className="flex items-center gap-1 sm:gap-1.5">
      {/* Search Trigger Button (Desktop Only) */}
      <button
        type="button"
        onClick={() => open('search')}
        className="hidden lg:flex items-center justify-center p-2 sm:p-2.5 text-[#111111] hover:text-[#9E7D3B] transition-colors cursor-pointer"
        aria-label="Cari produk busana"
        title="Cari Produk"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Customer Account Link (Desktop Only) */}
      <NavLink
        to="/account"
        className="hidden lg:flex items-center justify-center p-2 sm:p-2.5 text-[#111111] hover:text-[#9E7D3B] transition-colors"
        aria-label="Akun saya"
        title="Akun Saya"
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

      {/* Cart Drawer Trigger with Precision Zero-CLS Badge */}
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
      className="relative p-2 sm:p-2.5 text-[#111111] hover:text-[#9E7D3B] transition-colors cursor-pointer flex items-center justify-center"
      aria-label={`Tas Belanja (${count} item)`}
      title="Tas Belanja"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      {/* Floating Precision Numeric Badge (Fixed position, Zero layout shift) */}
      {count > 0 && (
        <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-[#111111] text-white text-[9px] font-mono font-bold flex items-center justify-center border border-white leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

/**
 * Mobile Navigation Drawer Link Helper (Master Quiet Luxury Experience)
 * Pure frameless editorial stream: confident typography, zero AI-slop boxes, zero arrows.
 */
export function HeaderMenu({ _menu, _viewport, _publicStoreDomain, _primaryDomainUrl }) {
  const { close } = useAside();

  return (
    <nav className="flex flex-col min-h-full bg-[#FAF8F5] select-none" role="navigation" aria-label="Menu Mobile Butik">
      <div className="flex-1 px-6 sm:px-8 py-7 sm:py-8 flex flex-col justify-between">
        <div>
          {/* Whispered Brand Heritage Stamp */}
          <div className="mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9E7D3B] block">
              BUTIK BATIK SMILE
            </span>
            <span className="text-[9px] uppercase tracking-[0.18em] text-[#777777] block mt-1 font-light">
              Semarang &bull; Est. 2007
            </span>
          </div>

          {/* Primary Collections (Confident, Editorial, Frameless) */}
          <div className="flex flex-col space-y-4 sm:space-y-5 mb-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={close}
                className="font-serif text-2xl sm:text-[26px] font-normal text-[#111111] hover:text-[#9E7D3B] transition-colors duration-200 tracking-wide block py-0.5"
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/collections/all?sort=best-selling"
              onClick={close}
              className="font-serif text-2xl sm:text-[26px] font-normal text-[#9E7D3B] hover:text-[#111111] transition-colors duration-200 tracking-wide block italic py-0.5"
            >
              Koleksi Terlaris
            </NavLink>

            <NavLink
              to="/collections/all"
              onClick={close}
              className="font-serif text-2xl sm:text-[26px] font-normal text-[#777777] hover:text-[#111111] transition-colors duration-200 tracking-wide block py-0.5"
            >
              Semua Koleksi
            </NavLink>
          </div>

          {/* Hairline Accent Divider */}
          <div className="w-10 h-px bg-[#C5A059]/40 mb-8" />

          {/* Secondary Editorial Links (Whispered Sans, Generous Tracking) */}
          <div className="flex flex-col space-y-3 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#5A5550]">
            <NavLink
              to="/pages/layanan-seragam"
              onClick={close}
              className="hover:text-[#111111] transition-colors block py-0.5"
            >
              Layanan Seragam &amp; Bespoke
            </NavLink>
            <NavLink
              to="/pages/fasilitas-store"
              onClick={close}
              className="hover:text-[#111111] transition-colors block py-0.5"
            >
              Showroom 3 Lantai (Simongan)
            </NavLink>
            <NavLink
              to="/pages/lokasi-toko"
              onClick={close}
              className="hover:text-[#111111] transition-colors block py-0.5"
            >
              Lokasi Butik &amp; Jam Buka
            </NavLink>
            <NavLink
              to="/blogs"
              onClick={close}
              className="hover:text-[#111111] transition-colors block py-0.5"
            >
              Warta &amp; Jurnal Budaya
            </NavLink>
          </div>
        </div>

        {/* Elegant Whispered VIP Concierge & Account Footer */}
        <div className="pt-8 mt-10 border-t border-[#E2DFD8] flex flex-col gap-3.5 pb-4">
          <a
            href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20busana"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-[#7C3F1D] hover:text-[#111111] font-semibold transition-colors py-0.5"
          >
            <span className="w-1.5 h-1.5 bg-[#C5A059] shrink-0" />
            <span>VIP Concierge: 081-390-8888-09</span>
          </a>
          <NavLink
            to="/account"
            onClick={close}
            className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-[#5A5550] hover:text-[#111111] font-medium transition-colors py-0.5"
          >
            <span>Akun Pelanggan &amp; Status Pesanan</span>
          </NavLink>
        </div>
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
