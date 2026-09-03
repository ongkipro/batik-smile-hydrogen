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
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between relative">
          {/* Mobile Menu Trigger & Brand Logo (Left-aligned, flex-1) */}
          <div className="flex items-center gap-4 flex-1 justify-start">
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
            <NavLink to="/" className="flex items-center group flex-shrink-0">
              <img
                src="/brand/batik-smile-logo.png"
                alt="Batik Smile Nusantara"
                className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </NavLink>
          </div>

          {/* Desktop Mega Menu Navigation (Middle Center Precision) */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0">
            <MegaMenu onMenuStateChange={setIsMenuOpen} />
          </div>

          {/* Right Action Icons: Search, Account, Cart (Right-aligned, flex-1) */}
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
      {/* Search Trigger (Mobile & Desktop) */}
      <button
        type="button"
        onClick={() => open('search')}
        className="flex items-center justify-center p-2 sm:p-2.5 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
        aria-label="Cari produk"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Customer Account Link (Icon Only - Pure Precision) */}
      <NavLink
        to="/account"
        className="flex items-center justify-center p-2 sm:p-2.5 text-[#111111] hover:text-[#C5A059] transition-colors"
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
    </button>
  );
}

/**
 * Mobile Navigation Drawer Link Helper (Master Quiet Luxury Experience)
 */
export function HeaderMenu({ _menu, _viewport, _publicStoreDomain, _primaryDomainUrl }) {
  const { close, open } = useAside();
  const [sarimbitOpen, setSarimbitOpen] = useState(true);

  return (
    <nav className="flex flex-col p-5 sm:p-6 bg-[#FAF8F5] min-h-full pb-28" role="navigation">
      {/* Quick Action Search in Menu */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => {
            close();
            setTimeout(() => open('search'), 200);
          }}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E2DFD8] hover:border-[#111111] text-[#5A5550] hover:text-[#111111] text-xs transition-colors shadow-sm cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[11px] font-light">Cari produk, motif, atau koleksi...</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#9E7D3B] font-semibold">CARI &rarr;</span>
        </button>
      </div>

      {/* Section 1: Sarimbit Accordion */}
      <div className="mb-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#E2DFD8] mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9E7D3B]">
            TRILOGI SARIMBIT KELUARGA
          </span>
          <button
            type="button"
            onClick={() => setSarimbitOpen(!sarimbitOpen)}
            className="text-xs text-[#5A5550] hover:text-[#111111] px-2 py-0.5 cursor-pointer font-medium"
          >
            {sarimbitOpen ? 'TUTUP −' : 'BUKA +'}
          </button>
        </div>

        {sarimbitOpen && (
          <div className="space-y-1.5 pl-2 border-l-2 border-[#C5A059]/40 mb-3">
            <NavLink
              to="/collections/sarimbit-exclusive"
              onClick={close}
              className="block p-2.5 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111]">
                  👑 Sarimbit Mahakarya
                </span>
                <span className="text-[9px] text-[#9E7D3B] font-bold uppercase tracking-widest">EKSKLUSIF</span>
              </div>
              <p className="text-[10px] text-[#5A5550] font-light mt-0.5">Sutra ATBM &amp; Dobby Tulis Mahasorot</p>
            </NavLink>

            <NavLink
              to="/collections/sarimbit-premium"
              onClick={close}
              className="block p-2.5 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111]">
                  ✨ Sarimbit Signature
                </span>
                <span className="text-[9px] text-[#9E7D3B] font-bold uppercase tracking-widest">PREMIUM</span>
              </div>
              <p className="text-[10px] text-[#5A5550] font-light mt-0.5">Katun Primissima Halus Berfuring Hero</p>
            </NavLink>

            <NavLink
              to="/collections/sarimbit-ekonomis"
              onClick={close}
              className="block p-2.5 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111]">
                  🌿 Sarimbit Essential
                </span>
                <span className="text-[9px] text-[#5A5550] font-bold uppercase tracking-widest">EKONOMIS</span>
              </div>
              <p className="text-[10px] text-[#5A5550] font-light mt-0.5">Busana Kasual Harian &amp; Nyaman Anak</p>
            </NavLink>

            <NavLink
              to="/collections/sarimbit-batik-couple"
              onClick={close}
              className="block py-2 text-center text-[10px] uppercase font-semibold tracking-[0.18em] text-[#111111] hover:text-[#9E7D3B] transition-colors"
            >
              LIHAT SELURUH SARIMBIT COUPLE &rarr;
            </NavLink>
          </div>
        )}
      </div>

      {/* Section 2: Busana Personal (Pria, Wanita, Anak, Kain) */}
      <div className="mb-6">
        <div className="pb-2 border-b border-[#E2DFD8] mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9E7D3B]">
            BUSANA &amp; KARYA INDIVIDU
          </span>
        </div>

        <div className="space-y-1">
          <NavLink
            to="/collections/batik-pria"
            onClick={close}
            className="py-3 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <div>
              <span className="block font-semibold">BATIK PRIA</span>
              <span className="text-[10px] text-[#5A5550] font-light">Kemeja Jahitan Sambung Motif &amp; Furing Hero</span>
            </div>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/collections/batik-wanita"
            onClick={close}
            className="py-3 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <div>
              <span className="block font-semibold">BATIK WANITA</span>
              <span className="text-[10px] text-[#5A5550] font-light">Blus Modern, Tunik Sutra &amp; Outer Cantik</span>
            </div>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/collections/batik-anak"
            onClick={close}
            className="py-3 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <div>
              <span className="block font-semibold">BATIK ANAK &amp; TRADISIONAL</span>
              <span className="text-[10px] text-[#5A5550] font-light">Setelan Surjan Adat Jawa &amp; Hem Katun Lembut</span>
            </div>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/collections/jarik-kain-batik"
            onClick={close}
            className="py-3 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <div>
              <span className="block font-semibold">KAIN BATIK TULIS (LEMBARAN)</span>
              <span className="text-[10px] text-[#5A5550] font-light">Kain Canting Malam Asli Pengrajin Solo &amp; Jogja</span>
            </div>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/collections/all"
            onClick={close}
            className="py-3 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between border-b border-[#E2DFD8]/40"
          >
            <span className="font-semibold">SEMUA PRODUK BUTIK</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>
        </div>
      </div>

      {/* Section 3: Warta & Jurnal Budaya (NEW FEATURE) */}
      <div className="mb-6">
        <div className="pb-2 border-b border-[#E2DFD8] mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9E7D3B]">
            EDUKASI &amp; JURNAL BUDAYA
          </span>
        </div>

        <NavLink
          to="/blogs"
          onClick={close}
          className="p-3 bg-white border border-[#C5A059]/40 hover:border-[#111111] transition-all flex items-center justify-between shadow-sm"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#C5A059]" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111]">
                WARTA &amp; JURNAL BATIK
              </span>
            </div>
            <p className="text-[10px] text-[#5A5550] font-light mt-1">
              Kisah canting, filosofi motif Jawa, &amp; panduan sarimbit keluarga.
            </p>
          </div>
          <span className="text-xs text-[#9E7D3B] font-bold">&rarr;</span>
        </NavLink>
      </div>

      {/* Section 4: Layanan Butik & Showroom */}
      <div className="mb-6">
        <div className="pb-2 border-b border-[#E2DFD8] mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9E7D3B]">
            LAYANAN &amp; SHOWROOM
          </span>
        </div>

        <div className="space-y-1">
          <NavLink
            to="/pages/layanan-seragam"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
          >
            <span>Layanan Seragam &amp; Bespoke Tailoring</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/pages/fasilitas-store"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
          >
            <span>Fasilitas Showroom 3 Lantai (Simongan)</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/pages/lokasi-toko"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
          >
            <span>Lokasi Toko &amp; Jam Buka</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>

          <NavLink
            to="/pages/tentang-kami"
            onClick={close}
            className="py-2.5 px-3 text-[11px] font-medium tracking-[0.14em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
          >
            <span>Tentang Batik Smile (Sejak 2007)</span>
            <span className="text-[#A69F96]">&rarr;</span>
          </NavLink>
        </div>
      </div>

      {/* Showroom Footprint Card */}
      <div className="p-4 bg-white border border-[#E2DFD8] mb-6 shadow-sm">
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-bold block mb-1">
          KUNJUNGI SHOWROOM KAMI
        </span>
        <p className="text-[11px] text-[#111111] font-medium leading-relaxed">
          Showroom 3 Lantai: Jl. Simongan Raya No. 109, Semarang<br />
          Cabang: Jl. Sukun Raya No. 23, Banyumanik, Semarang
        </p>
        <span className="text-[10px] text-[#5A5550] block mt-1">
          ⏰ Buka Setiap Hari: 08:00 – 21:00 WIB
        </span>
      </div>

      {/* WhatsApp Concierge Action Button */}
      <div>
        <a
          href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20batik"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors shadow-sm"
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
