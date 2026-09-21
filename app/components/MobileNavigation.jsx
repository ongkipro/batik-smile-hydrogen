import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { useAside } from '~/components/Aside';

export function MobileNavigation() {
  const { open } = useAside();
  const location = useLocation();

  // Hide mobile bottom navigation on Product Detail Pages to focus entirely on Sticky Add To Cart
  if (location.pathname.startsWith('/products/')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2DFD8] lg:hidden px-2 sm:px-4 pt-1.5 pb-[max(0.625rem,calc(env(safe-area-inset-bottom)+0.25rem))] flex items-center justify-around shadow-lg">
      {/* 1. Beranda */}
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-h-[44px] min-w-[52px] py-1 gap-1 text-[10px] uppercase tracking-wider font-medium transition-colors ${
            isActive ? 'text-[#9E7D3B] font-semibold' : 'text-[#5A5550] hover:text-[#111111]'
          }`
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span>Beranda</span>
      </NavLink>

      {/* 2. Kategori Drawer Trigger */}
      <button
        type="button"
        onClick={() => open('mobile')}
        className="flex flex-col items-center justify-center min-h-[44px] min-w-[52px] py-1 gap-1 text-[10px] uppercase tracking-wider font-medium text-[#5A5550] hover:text-[#111111] transition-colors cursor-pointer"
        aria-label="Buka menu kategori"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span>Kategori</span>
      </button>

      {/* 3. Search / Cari Drawer Trigger */}
      <button
        type="button"
        onClick={() => open('search')}
        className="flex flex-col items-center justify-center min-h-[44px] min-w-[52px] py-1 gap-1 text-[10px] uppercase tracking-wider font-medium text-[#5A5550] hover:text-[#111111] transition-colors cursor-pointer"
        aria-label="Buka pencarian produk"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>Cari</span>
      </button>

      {/* 4. Jurnal Kebudayaan */}
      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-h-[44px] min-w-[52px] py-1 gap-1 text-[10px] uppercase tracking-wider font-medium transition-colors ${
            isActive ? 'text-[#9E7D3B] font-semibold' : 'text-[#5A5550] hover:text-[#111111]'
          }`
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span>Jurnal</span>
      </NavLink>

      {/* 5. WhatsApp CS Concierge */}
      <a
        href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20batik"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center justify-center min-h-[44px] min-w-[52px] py-1 gap-1 text-[10px] uppercase tracking-wider font-medium text-[#25D366] hover:opacity-80 transition-opacity"
        aria-label="Konsultasi WhatsApp Customer Service"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
        <span>WA CS</span>
      </a>
    </div>
  );
}
