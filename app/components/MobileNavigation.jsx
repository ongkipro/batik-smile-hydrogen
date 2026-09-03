import React, { Suspense } from 'react';
import { NavLink, Await } from 'react-router';
import { useAside } from '~/components/Aside';

export function MobileNavigation({ cart }) {
  const { open } = useAside();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 lg:hidden px-4 py-2 flex items-center justify-around shadow-lg">
      {/* Home */}
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider font-medium transition-colors ${
            isActive ? 'text-[#9E7D3B] font-semibold' : 'text-[#5A5550] hover:text-[#111111]'
          }`
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span>Beranda</span>
      </NavLink>

      {/* Kategori / Mobile Menu Drawer Trigger */}
      <button
        type="button"
        onClick={() => open('mobile')}
        className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider font-medium text-[#5A5550] hover:text-[#111111] transition-colors cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span>Kategori</span>
      </button>

      {/* Search Trigger */}
      <button
        type="button"
        onClick={() => open('search')}
        className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider font-medium text-[#5A5550] hover:text-[#111111] transition-colors cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>Cari</span>
      </button>

      {/* Tas Belanja / Cart Drawer Trigger */}
      <button
        type="button"
        onClick={() => open('cart')}
        className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider font-medium text-[#5A5550] hover:text-[#111111] transition-colors relative cursor-pointer"
      >
        <div className="relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <Suspense fallback={null}>
            <Await resolve={cart}>
              {(cartData) => {
                const count = cartData?.totalQuantity || 0;
                if (!count) return null;
                return (
                  <span className="absolute -top-1.5 -right-2 px-1 min-w-[16px] h-4 bg-[#111111] !text-white text-[9px] font-bold flex items-center justify-center">
                    {count}
                  </span>
                );
              }}
            </Await>
          </Suspense>
        </div>
        <span>Tas</span>
      </button>

      {/* WhatsApp CS */}
      <a
        href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20batik"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider font-medium text-[#25D366] hover:opacity-80 transition-opacity"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
        <span>WA CS</span>
      </a>
    </div>
  );
}
