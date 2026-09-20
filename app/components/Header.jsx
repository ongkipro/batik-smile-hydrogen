import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { AnnouncementBar } from './AnnouncementBar';

/**
 * Curated Navigation Structure with Sub-Tier Precision
 */
const NAV_ITEMS = [
  {
    label: 'Sarimbit Luxury',
    to: '/collections/sarimbit-luxury',
    badge: 'Kasta I • Sutra ATBM',
    tagline: 'Mahakarya Sutra ATBM 1-of-1 & Prada Emas Murni untuk Momen Sakral Keluarga',
    subcategories: [
      { label: 'Semua Sarimbit Luxury', to: '/collections/sarimbit-luxury' },
      { label: 'Pria Lengan Panjang', to: '/collections/sarimbit-luxury?gender=pria&sleeve=lengan-panjang' },
      { label: 'Pria Lengan Pendek', to: '/collections/sarimbit-luxury?gender=pria&sleeve=lengan-pendek' },
      { label: 'Wanita Lengan Panjang', to: '/collections/sarimbit-luxury?gender=wanita&sleeve=lengan-panjang' },
      { label: 'Wanita Lengan Pendek', to: '/collections/sarimbit-luxury?gender=wanita&sleeve=lengan-pendek' },
    ],
  },
  {
    label: 'Sarimbit Premium',
    to: '/collections/sarimbit-premium',
    badge: 'Kasta II • Tenun Dobby',
    tagline: 'Tenun Dobby Timbul Bertekstur Mewah dengan Furing Katun Hero Sejuk Pesta',
    subcategories: [
      { label: 'Semua Sarimbit Premium', to: '/collections/sarimbit-premium' },
      { label: 'Pria Lengan Panjang', to: '/collections/sarimbit-premium?gender=pria&sleeve=lengan-panjang' },
      { label: 'Pria Lengan Pendek', to: '/collections/sarimbit-premium?gender=pria&sleeve=lengan-pendek' },
      { label: 'Wanita Lengan Panjang', to: '/collections/sarimbit-premium?gender=wanita&sleeve=lengan-panjang' },
      { label: 'Wanita Lengan Pendek', to: '/collections/sarimbit-premium?gender=wanita&sleeve=lengan-pendek' },
    ],
  },
  {
    label: 'Sarimbit Ekonomi',
    to: '/collections/sarimbit-ekonomi',
    badge: 'Kasta III • Katun Primis',
    tagline: 'Busana Batik Katun Primis Halus, Adem, & Nyaman untuk Agenda Harian Keluarga',
    subcategories: [
      { label: 'Semua Sarimbit Ekonomi', to: '/collections/sarimbit-ekonomi' },
      { label: 'Pria Lengan Panjang', to: '/collections/sarimbit-ekonomi?gender=pria&sleeve=lengan-panjang' },
      { label: 'Pria Lengan Pendek', to: '/collections/sarimbit-ekonomi?gender=pria&sleeve=lengan-pendek' },
      { label: 'Wanita Lengan Panjang', to: '/collections/sarimbit-ekonomi?gender=wanita&sleeve=lengan-panjang' },
      { label: 'Wanita Lengan Pendek', to: '/collections/sarimbit-ekonomi?gender=wanita&sleeve=lengan-pendek' },
    ],
  },
  {
    label: 'Kain',
    to: '/collections/kain',
    badge: 'Kain Lembaran & Tulis',
    tagline: 'Bahan Mori Prima, Sutra ATBM, dan Polusan Batik Siap Jahit Bespoke Tanpa MOQ',
    subcategories: [
      { label: 'Semua Koleksi Kain', to: '/collections/kain' },
      { label: 'Kain Batik Tulis Pusaka', to: '/collections/kain' },
      { label: 'Kain Sutra & Dobby Halus', to: '/collections/kain' },
      { label: 'Konsultasi Jahit Bespoke', to: '/pages/layanan-seragam' },
    ],
  },
  {
    label: 'Aksesoris',
    to: '/collections/aksesoris',
    badge: 'Pelengkap Tradisional',
    tagline: 'Blangkon Khas Solo & Jogja, Bros Kebaya Ningrat, dan Ornamen Pelengkap Adat',
    subcategories: [
      { label: 'Semua Aksesoris', to: '/collections/aksesoris' },
      { label: 'Blangkon Tradisional', to: '/collections/aksesoris' },
      { label: 'Bros & Aksesoris Busana', to: '/collections/aksesoris' },
    ],
  },
  {
    label: 'Batik Anak',
    to: '/collections/batik-anak',
    badge: 'Putra & Putri',
    tagline: 'Busana Batik Nyaman Anak-anak Berfuring Katun Halus untuk Upacara & Resepsi',
    subcategories: [
      { label: 'Semua Koleksi Anak', to: '/collections/batik-anak' },
      { label: 'Batik Putra (Laki-laki)', to: '/collections/batik-anak?gender=putra' },
      { label: 'Batik Putri (Perempuan)', to: '/collections/batik-anak?gender=putri' },
      { label: 'Lengan Panjang Anak', to: '/collections/batik-anak?sleeve=lengan-panjang' },
      { label: 'Lengan Pendek Anak', to: '/collections/batik-anak?sleeve=lengan-pendek' },
    ],
  },
];

/**
 * Master Header: Quiet Luxury Nusantara
 * - Symmetrical 3-Column True Grid (Left: Heritage Logo, Center: Nav with Precision Dropdown, Right: Luxury Actions).
 * - Zero Border Radius (0px).
 * - Layout-Shift Free Cart Badge (Zero CLS).
 * - Smooth Backdrop Blur & Elevation on Scroll.
 *
 * @param {HeaderProps} props
 */
export function Header({ _header, isLoggedIn, cart, _publicStoreDomain }) {
  const { open } = useAside();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

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
        {/* TRUE SYMMETRICAL 12-COLUMN DESKTOP GRID & BALANCED MOBILE ROW */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 h-18 sm:h-20 flex items-center justify-between lg:grid lg:grid-cols-12 relative">
          
          {/* 1. LEFT COLUMN: Mobile Burger Menu / Desktop Brand Identity (3 Cols) */}
          <div className="flex items-center lg:col-span-3 justify-start">
            {/* Mobile Burger Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-[#111111] hover:text-[#9E7D3B] transition-colors cursor-pointer"
              onClick={() => open('mobile')}
              aria-label="Buka menu navigasi"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Brand Logo & Heritage Subtitle */}
            <NavLink to="/" className="hidden lg:flex flex-col group flex-shrink-0 text-left">
              <span className="font-serif text-[22px] xl:text-[24px] uppercase tracking-[0.22em] text-[#111111] group-hover:text-[#9E7D3B] transition-colors duration-300 leading-none">
                BATIK SMILE
              </span>
              <span className="text-[8px] xl:text-[9px] uppercase tracking-[0.32em] text-[#9E7D3B] font-medium mt-1 leading-none">
                SEMARANG &bull; EST. 2007
              </span>
            </NavLink>
          </div>

          {/* 2. MOBILE CENTER LOGO (Dead Center on Mobile Viewports) */}
          <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto text-center">
            <NavLink to="/" className="flex flex-col items-center group">
              <span className="font-serif text-[19px] sm:text-[21px] uppercase tracking-[0.2em] text-[#111111] group-hover:text-[#9E7D3B] transition-colors leading-none">
                BATIK SMILE
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.28em] text-[#9E7D3B] font-medium mt-0.5 leading-none">
                SEMARANG
              </span>
            </NavLink>
          </div>

          {/* 3. CENTER COLUMN: Precision Desktop Navigation with Flyout Menus (6 Cols) */}
          <nav
            aria-label="Navigasi Utama Butik"
            className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 lg:col-span-6 flex-shrink-0 text-[11px] xl:text-[12px] font-medium uppercase tracking-[0.15em] h-full"
          >
            {NAV_ITEMS.map((item) => {
              const isOpen = activeDropdown === item.label;
              return (
                <div
                  key={item.to}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative py-2 flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'text-[#9E7D3B] font-semibold'
                          : 'text-[#1C1C1C] hover:text-[#9E7D3B]'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-2.5 h-2.5 transition-transform duration-200 text-[#9E7D3B] ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
                    </svg>

                    {/* Active/Hover Gold Line Underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C5A059] transition-transform duration-300 origin-left ${
                        isOpen ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </NavLink>

                  {/* PRECISION FLYOUT DROPDOWN (Zero Radius, Pure Architectural Luxury) */}
                  {isOpen && (
                    <div
                      className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-80 bg-white border border-[#E2DFD8] shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-200 text-left"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Dropdown Header Info */}
                      <div className="pb-2.5 mb-2.5 border-b border-[#E2DFD8]/70">
                        <span className="text-[9px] uppercase tracking-[0.22em] text-[#C5A059] font-bold block">
                          {item.badge}
                        </span>
                        <p className="text-[10px] text-[#5A5550] font-light mt-0.5 leading-relaxed">
                          {item.tagline}
                        </p>
                      </div>

                      {/* Sub-Category Links */}
                      <div className="space-y-1">
                        {item.subcategories.map((sub, idx) => (
                          <NavLink
                            key={sub.to + idx}
                            to={sub.to}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-[#111111] hover:bg-[#FAF8F5] hover:text-[#9E7D3B] transition-colors"
                          >
                            <span className="flex items-center justify-between">
                              <span>{sub.label}</span>
                              <span className="text-[10px] text-[#A69F96]">&rarr;</span>
                            </span>
                          </NavLink>
                        ))}
                      </div>

                      {/* Dropdown Footer CTA */}
                      <div className="mt-3 pt-2.5 border-t border-[#E2DFD8]/60 flex items-center justify-between">
                        <NavLink
                          to={item.to}
                          onClick={() => setActiveDropdown(null)}
                          className="text-[9px] uppercase tracking-[0.18em] font-bold text-[#111111] hover:text-[#C5A059] transition-colors"
                        >
                          Lihat Semua Katalog &rarr;
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* 4. RIGHT COLUMN: Precision Actions (Search, WhatsApp VIP, Account, Cart) (3 Cols) */}
          <div className="flex items-center justify-end lg:col-span-3 gap-1 sm:gap-2">
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
          </div>
        </div>
      </header>
    </div>
  );
}

/**
 * Header Action Buttons (Zero-CLS Cart Badge, Accessible Search & Account)
 */
function HeaderCtas({ isLoggedIn, cart }) {
  const { open } = useAside();

  return (
    <div className="flex items-center gap-1 sm:gap-1.5">
      {/* 1. Search Trigger Button (Desktop & Mobile Accessible) */}
      <button
        type="button"
        onClick={() => open('search')}
        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#111111] hover:text-[#9E7D3B] hover:bg-white/60 transition-colors cursor-pointer"
        aria-label="Cari busana batik"
        title="Cari Produk & Koleksi"
      >
        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* 2. Official VIP WhatsApp Concierge (Direct Boutique Line, Desktop Only) */}
      <a
        href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20busana%20batik"
        target="_blank"
        rel="noreferrer"
        className="hidden md:flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center text-[#25D366] hover:bg-white/60 transition-colors"
        aria-label="Chat WhatsApp VIP Concierge"
        title="VIP Concierge (081-390-8888-09)"
      >
        <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
      </a>

      {/* 3. Customer Account Link (Desktop Only) */}
      <NavLink
        to="/account"
        className="hidden lg:flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center text-[#111111] hover:text-[#9E7D3B] hover:bg-white/60 transition-colors"
        aria-label="Akun Pengguna"
        title={isLoggedIn ? 'Akun Saya' : 'Masuk / Daftar'}
      >
        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </NavLink>

      {/* 4. Cart Drawer Toggle with Precision Zero-CLS Badge */}
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
      className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#111111] hover:text-[#9E7D3B] hover:bg-white/60 transition-colors cursor-pointer"
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
        <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-[#111111] text-white text-[9px] font-mono font-bold flex items-center justify-center border border-white leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

/**
 * Mobile Navigation Drawer Link Helper (Master Quiet Luxury Experience)
 * Clean Accordion Tree per Official 6 Collections + Services + Heritage
 */
export function HeaderMenu({ _menu, _viewport, _publicStoreDomain, _primaryDomainUrl }) {
  const { close } = useAside();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (label) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="flex flex-col min-h-full bg-[#FAF8F5]" role="navigation" aria-label="Menu Mobile Butik">
      <div className="flex-1 p-5 sm:p-6 pb-6 overflow-y-auto">
        
        {/* Brand Heritage Stamp */}
        <div className="pb-4 border-b border-[#E2DFD8] mb-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9E7D3B] block">
              BUTIK BATIK SMILE
            </span>
            <span className="text-[9px] uppercase tracking-[0.16em] text-[#5A5550] block mt-0.5">
              Semarang &bull; Est. 2007
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-[#111111] bg-white border border-[#E2DFD8] px-2 py-0.5 font-semibold">
            3 LANTAI
          </span>
        </div>

        {/* 6 KOLEKSI UTAMA TREE (Accordion-enabled) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2DFD8] mb-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">
              KOLEKSI RESMI BUTIK
            </span>
          </div>

          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isExpanded = expandedSection === item.label;
              return (
                <div key={item.to} className="border-b border-[#E2DFD8]/40">
                  <div className="flex items-center justify-between py-2 px-2 hover:bg-white transition-colors">
                    <NavLink
                      to={item.to}
                      onClick={close}
                      className="flex-1 text-left"
                    >
                      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]">
                        {item.label}
                      </span>
                      <span className="block text-[9.5px] text-[#9E7D3B] tracking-wide font-light">
                        {item.badge}
                      </span>
                    </NavLink>

                    {/* Accordion Toggle for Sub-categories */}
                    <button
                      type="button"
                      onClick={() => toggleSection(item.label)}
                      className="w-8 h-8 flex items-center justify-center text-[#9E7D3B] font-mono text-sm cursor-pointer"
                      aria-label={`Toggle subkategori ${item.label}`}
                    >
                      {isExpanded ? '−' : '+'}
                    </button>
                  </div>

                  {/* Expanded Sub-Categories */}
                  {isExpanded && (
                    <div className="pl-4 pr-2 pb-2.5 pt-1 space-y-1 bg-[#FAF8F5]/80 border-t border-dashed border-[#E2DFD8]">
                      {item.subcategories.map((sub, idx) => (
                        <NavLink
                          key={sub.to + idx}
                          to={sub.to}
                          onClick={close}
                          className="block py-1 px-2 text-[10.5px] uppercase tracking-wider text-[#5A5550] hover:text-[#111111] hover:bg-white"
                        >
                          &bull; {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* All Products Link */}
            <NavLink
              to="/collections/all"
              onClick={close}
              className="block py-2.5 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#111111] hover:bg-white hover:text-[#C5A059] transition-colors border-b border-[#E2DFD8]/40 mt-1"
            >
              <div className="flex items-center justify-between">
                <span>SEMUA KOLEKSI BUTIK</span>
                <span className="text-[#A69F96]">&rarr;</span>
              </div>
            </NavLink>
          </div>
        </div>

        {/* Section: Layanan Butik & Showroom */}
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
              <span>Jahit Seragam Bespoke (Tanpa MOQ)</span>
              <span className="text-[#A69F96]">&rarr;</span>
            </NavLink>

            <NavLink
              to="/pages/fasilitas-store"
              onClick={close}
              className="py-2 px-3 text-[11px] font-medium tracking-[0.12em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
            >
              <span>Showroom 3 Lantai (Simongan &amp; Sukun)</span>
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
              <span>Filosofi &amp; Sejarah Batik Smile</span>
              <span className="text-[#A69F96]">&rarr;</span>
            </NavLink>

            <NavLink
              to="/blogs"
              onClick={close}
              className="py-2 px-3 text-[11px] font-medium tracking-[0.12em] text-[#111111] hover:bg-white hover:text-[#9E7D3B] transition-colors flex items-center justify-between"
            >
              <span>Warta &amp; Jurnal Budaya</span>
              <span className="text-[#A69F96]">&rarr;</span>
            </NavLink>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Actions in Mobile Drawer */}
      <div className="sticky bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-[#E2DFD8] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] space-y-2">
        <NavLink
          to="/account"
          onClick={close}
          className="w-full py-3 px-4 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
        </NavLink>

        <a
          href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20busana%20batik"
          target="_blank"
          rel="noreferrer"
          className="w-full py-2.5 px-4 bg-[#FAF8F5] border border-[#E2DFD8] hover:border-[#25D366] text-[#111111] text-[10px] font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          <span>WHATSAPP VIP: 081-390-8888-09</span>
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
