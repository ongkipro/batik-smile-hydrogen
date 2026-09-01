import React, { Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { AnnouncementBar } from './AnnouncementBar';
import { MegaMenu } from './MegaMenu';

/**
 * @param {HeaderProps}
 */
export function Header({ header, isLoggedIn, cart, publicStoreDomain }) {
  const { shop } = header;

  return (
    <div className="sticky top-0 z-40 w-full">
      <AnnouncementBar />

      <header className="w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden p-2 text-neutral-800 hover:text-[#9E4719] transition-colors"
              onClick={() => openAside('mobile')}
              aria-label="Open mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand Logo & Wordmark */}
            <NavLink to="/" className="flex flex-col items-start group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 group-hover:text-[#9E4719] transition-colors">
                BATIK SMILE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold -mt-1">
                Mahakarya Nusantara
              </span>
            </NavLink>
          </div>

          {/* Desktop Mega Menu Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <MegaMenu />
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
    <div className="flex items-center gap-2 sm:gap-4">
      {/* Search Button */}
      <button
        type="button"
        onClick={() => open('search')}
        className="p-2 text-neutral-700 hover:text-[#9E4719] transition-colors rounded-full hover:bg-neutral-100"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Account Link */}
      <NavLink
        to="/account"
        className="hidden sm:flex items-center gap-1.5 p-2 text-neutral-700 hover:text-[#9E4719] transition-colors rounded-full hover:bg-neutral-100 text-xs font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <Suspense fallback="Akun">
          <Await resolve={isLoggedIn}>
            {(logged) => (logged ? 'Akun' : 'Masuk')}
          </Await>
        </Suspense>
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
      className="flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-900 text-white hover:bg-[#9E4719] transition-all shadow-sm"
      aria-label={`Tas Belanja (${count} item)`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <span className="text-xs font-semibold">{count}</span>
    </button>
  );
}

/**
 * Mobile Navigation Drawer Link Helper
 */
export function HeaderMenu({ menu, viewport, publicStoreDomain, primaryDomainUrl }) {
  const { close } = useAside();

  const mobileCategories = [
    { title: 'Sarimbit 3 Kasta (Couple)', url: '/collections/sarimbit-batik-couple' },
    { title: 'Batik Wanita (Blus, Tunik, Gamis)', url: '/collections/batik-wanita' },
    { title: 'Batik Pria (Kemeja Furing & Hem)', url: '/collections/batik-pria' },
    { title: 'Batik Anak & Adat Jawa', url: '/collections/batik-anak' },
    { title: 'Layanan Jahit Kustom & Seragam', url: '/pages/layanan-seragam' },
    { title: 'Tentang Butik & Showroom', url: '/pages/tentang-kami' },
    { title: 'Lokasi Butik Semarang & Solo', url: '/pages/lokasi-toko' },
  ];

  return (
    <nav className="flex flex-col gap-2 p-6" role="navigation">
      <div className="mb-4 pb-3 border-b border-neutral-200">
        <span className="text-xs font-bold uppercase tracking-widest text-[#9E4719]">
          Kategori Pilihan
        </span>
      </div>

      {mobileCategories.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.url}
          onClick={close}
          className="py-2.5 px-3 rounded-lg text-sm font-medium text-neutral-800 hover:bg-amber-50 hover:text-[#9E4719] transition-colors flex items-center justify-between"
        >
          <span>{item.title}</span>
          <span className="text-neutral-400">&rarr;</span>
        </NavLink>
      ))}

      <div className="mt-8 pt-4 border-t border-neutral-200">
        <a
          href="https://wa.me/6281234567890?text=Halo%20Batik%20Smile"
          target="_blank"
          rel="noreferrer"
          className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
        >
          Chat Konsultan via WhatsApp
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
