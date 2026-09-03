import React, { useState, useEffect, Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
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
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between gap-4 relative">
          {/* Mobile Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden p-2 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
              onClick={() => open('mobile')}
              aria-label="Buka menu navigasi"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand Logo */}
            <NavLink to="/" className="flex items-center group">
              <img
                src="/brand/batik-smile-logo.png"
                alt="Batik Smile Nusantara"
                className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </NavLink>
          </div>

          {/* Desktop Mega Menu Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <MegaMenu onMenuStateChange={setIsMenuOpen} />
          </div>

          {/* Right Action Icons: Search, Account, Cart */}
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </header>
    </div>
  );
}

function HeaderCtas({ isLoggedIn, cart }) {
  const { open } = useAside();

  return (
    <div className="flex items-center gap-1.5 sm:gap-3">
      {/* Search Trigger (Hidden on Mobile, already in sticky bottom bar) */}
      <button
        type="button"
        onClick={() => open('search')}
        className="hidden lg:block p-2.5 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
        aria-label="Cari produk"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Customer Account Link (Visible on Mobile & Desktop) */}
      <NavLink
        to="/account"
        className="flex items-center gap-1.5 p-2 text-[#111111] hover:text-[#C5A059] transition-colors text-[10px] uppercase font-semibold tracking-[0.16em]"
        aria-label="Akun saya"
      >
        <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="hidden sm:inline">
          <Suspense fallback="AKUN">
            <Await resolve={isLoggedIn}>
              {(logged) => (logged ? 'AKUN' : 'MASUK')}
            </Await>
          </Suspense>
        </span>
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
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="flex items-center gap-2 px-3.5 py-2 bg-[#111111] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#111111] transition-all cursor-pointer border border-[#C5A059]/40"
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
    </button>
  );
}

/**
 * Mobile Navigation Drawer Link Helper
 */
export function HeaderMenu({ _menu, _viewport, _publicStoreDomain, _primaryDomainUrl }) {
  const { close } = useAside();

  const mobileCategories = [
    { title: 'SARIMBIT KELUARGA', url: '/collections/sarimbit-exclusive' },
    { title: 'BATIK PRIA (KEMEJA FURING)', url: '/collections/batik-pria' },
    { title: 'BATIK WANITA (BLUS & GAMIS)', url: '/collections/batik-wanita' },
    { title: 'BATIK ANAK & ADAT JAWA', url: '/collections/batik-anak' },
    { title: 'KAIN BATIK TULIS (LEMBARAN)', url: '/collections/jarik-kain-batik' },
    { title: 'LAYANAN SERAGAM & JAHIT', url: '/pages/layanan-seragam' },
    { title: 'FASILITAS GEDUNG 3 LANTAI', url: '/pages/fasilitas-store' },
    { title: 'TENTANG KAMI SEJAK 2007', url: '/pages/tentang-kami' },
    { title: 'LOKASI OUTLET (SIMONGAN & BANYUMANIK)', url: '/pages/lokasi-toko' },
  ];

  return (
    <nav className="flex flex-col gap-1 p-6 bg-[#FAF8F5] min-h-full" role="navigation">
      <div className="mb-4 pb-3 border-b border-[#E2DFD8]">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9E7D3B]">
          NAVIGASI UTAMA BUTIK
        </span>
      </div>

      {mobileCategories.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.url}
          onClick={close}
          className="py-3 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
        >
          <span>{item.title}</span>
          <span className="text-[#A69F96]">&rarr;</span>
        </NavLink>
      ))}

      <div className="mt-8 pt-4 border-t border-[#E2DFD8]">
        <a
          href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20batik"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          KONSULTASI WHATSAPP RESMI &rarr;
        </a>
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
