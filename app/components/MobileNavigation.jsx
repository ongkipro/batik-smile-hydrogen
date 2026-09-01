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
          `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            isActive ? 'text-[#9E4719]' : 'text-neutral-500 hover:text-neutral-900'
          }`
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span>Beranda</span>
      </NavLink>

      {/* Kategori / Mobile Menu Drawer Trigger */}
      <button
        type="button"
        onClick={() => open('mobile')}
        className="flex flex-col items-center gap-1 text-[10px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span>Kategori</span>
      </button>

      {/* Search Trigger */}
      <button
        type="button"
        onClick={() => open('search')}
        className="flex flex-col items-center gap-1 text-[10px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>Cari</span>
      </button>

      {/* Tas Belanja / Cart Drawer Trigger */}
      <button
        type="button"
        onClick={() => open('cart')}
        className="flex flex-col items-center gap-1 text-[10px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors relative"
      >
        <div className="relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <Suspense fallback={null}>
            <Await resolve={cart}>
              {(cartData) => {
                const count = cartData?.totalQuantity || 0;
                if (!count) return null;
                return (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#9E4719] text-white text-[9px] font-bold flex items-center justify-center">
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
        href="https://wa.me/6281234567890?text=Halo%20Batik%20Smile%2C%20saya%20butuh%20bantuan"
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1 text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
        </svg>
        <span>WA CS</span>
      </a>
    </div>
  );
}
