import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router';

const SHOPIFY_MENU = {
  'Sarimbit (3 Kasta)': {
    title: '3 Kasta Sarimbit Keluarga',
    handle: 'sarimbit-batik-couple',
    badge: 'Koleksi Flagship',
    image:
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731.jpg?v=1786004461',
    description:
      'Tiga tingkatan mahakarya sarimbit untuk pernikahan, resepsi, dan kebersamaan keluarga harmonis.',
    allHref: '/collections/sarimbit-batik-couple',
    subcategories: [
      {
        name: '1. Sarimbit Mahakarya Heritage (Sutra Prada)',
        href: '/collections/sarimbit-mahakarya-heritage',
        badge: 'Tier 1 • Sutra',
      },
      {
        name: '2. Sarimbit Signature Elegance (Tenun Dobby)',
        href: '/collections/sarimbit-signature-elegance',
        badge: 'Tier 2 • Dobby',
      },
      {
        name: '3. Sarimbit Essential Daily (Katun Primisima)',
        href: '/collections/sarimbit-essential-daily',
        badge: 'Tier 3 • Katun',
      },
    ],
  },
  'Batik Wanita': {
    title: 'Koleksi Busana Wanita',
    handle: 'batik-wanita',
    badge: '11 Kategori',
    image:
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_wanita_cat_1786004365241.jpg?v=1786004433',
    description:
      'Ragam busana batik wanita anggun dari blus modern, tunik, gamis primisima, hingga kebaya encim brokat.',
    allHref: '/collections/batik-wanita',
    subcategories: [
      { name: 'Blus Batik Wanita', href: '/collections/blus-batik-wanita' },
      { name: 'Outer Tunik Batik', href: '/collections/outer-tunik-batik' },
      { name: 'Tunik Batik Wanita', href: '/collections/tunik-batik-wanita', badge: 'Favorit' },
      { name: 'Dress Batik Wanita', href: '/collections/dress-batik-wanita' },
      { name: 'Gamis Batik Wanita', href: '/collections/gamis-batik-wanita' },
      { name: 'Outer Batik Wanita', href: '/collections/outer-batik-wanita' },
      { name: 'Blazer Batik Wanita', href: '/collections/blazer-batik-wanita', badge: 'Formal' },
      { name: 'Inner Busana Batik', href: '/collections/inner-busana-batik' },
      { name: 'Kebaya Batik Modern', href: '/collections/kebaya-batik-modern' },
      { name: 'Jarik & Kain Batik', href: '/collections/jarik-kain-batik' },
      { name: 'Daster Batik Solo', href: '/collections/daster-batik-solo' },
    ],
  },
  'Batik Pria': {
    title: 'Koleksi Busana Pria',
    handle: 'batik-pria',
    badge: 'Lapis Furing Hero',
    image:
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_pria_1785995886986.jpg?v=1786004442',
    description:
      'Kemeja batik pria furing halus, hem santai motif dobby, dan celana panjang sirwal berwibawa.',
    allHref: '/collections/batik-pria',
    subcategories: [
      {
        name: 'Kemeja Batik Lengan Panjang',
        href: '/collections/kemeja-batik-lengan-panjang',
        badge: 'Best Seller',
      },
      { name: 'Hem Batik Lengan Pendek', href: '/collections/hem-batik-lengan-pendek' },
      { name: 'Celana Batik Pria', href: '/collections/celana-batik-pria' },
    ],
  },
  'Batik Anak': {
    title: 'Koleksi Batik Anak',
    handle: 'batik-anak',
    badge: '10 Kategori Anak',
    image:
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_anak_cat_1786004381125.jpg?v=1786004452',
    description:
      'Busana batik nyaman untuk putra & putri tercinta serta setelan adat Jawa tradisional.',
    allHref: '/collections/batik-anak',
    subcategories: [
      { name: 'Blus Batik Anak Cewek', href: '/collections/blus-batik-anak-cewek' },
      { name: 'Gamis Batik Anak', href: '/collections/gamis-batik-anak' },
      { name: 'Dress Batik Anak', href: '/collections/dress-batik-anak' },
      { name: 'Kebaya Batik Anak', href: '/collections/kebaya-batik-anak' },
      { name: 'Babydoll Batik Anak', href: '/collections/babydoll-batik-anak' },
      { name: 'Hem Batik Anak Cowo', href: '/collections/hem-batik-anak-cowo' },
      { name: 'Surjan Batik Anak', href: '/collections/surjan-batik-anak' },
      { name: 'Sarung Batik Anak', href: '/collections/sarung-batik-anak' },
    ],
  },
};

export function MegaMenu() {
  const [activeTab, setActiveTab] = useState(null);
  const closeTimeoutRef = useRef(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (key) => {
    clearCloseTimeout();
    setActiveTab(key);
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 200);
  };

  return (
    <nav className="relative flex items-center justify-center gap-6 font-sans text-xs uppercase tracking-[0.14em]">
      {Object.keys(SHOPIFY_MENU).map((key) => {
        const item = SHOPIFY_MENU[key];
        const isOpen = activeTab === key;

        return (
          <div
            key={key}
            className="relative py-4"
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to={item.allHref}
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium pb-1 flex items-center gap-1.5 ${
                  isOpen || isActive
                    ? 'text-[#9E4719] border-b border-[#9E4719]'
                    : 'text-neutral-800 hover:text-[#9E4719]'
                }`
              }
            >
              {key}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#9E4719]' : 'text-neutral-400'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </NavLink>

            {/* Dropdown Panel with Frosted Glass & Luxury Asymmetric Grid */}
            {isOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[840px] max-w-[92vw] bg-white/95 backdrop-blur-md shadow-2xl border border-neutral-200/80 rounded-b-xl overflow-hidden p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Column: Visual Lookbook Card 4:5 */}
                  <div className="col-span-5 bg-neutral-900 rounded-lg overflow-hidden relative group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover aspect-[4/5] opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
                      <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold mb-1">
                        {item.badge}
                      </span>
                      <h4 className="font-serif text-lg font-bold leading-tight mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-neutral-300 normal-case leading-relaxed line-clamp-2 mb-3">
                        {item.description}
                      </p>
                      <NavLink
                        to={item.allHref}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 uppercase tracking-wider"
                      >
                        Lihat Seluruh Koleksi &rarr;
                      </NavLink>
                    </div>
                  </div>

                  {/* Right Column: Subcategories List */}
                  <div className="col-span-7 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-3">
                        <span className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
                          Daftar Kategori
                        </span>
                        <NavLink
                          to={item.allHref}
                          className="text-[11px] text-[#9E4719] hover:underline font-semibold normal-case"
                        >
                          Lihat Semua ({item.subcategories.length})
                        </NavLink>
                      </div>

                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {item.subcategories.map((sub, idx) => (
                          <li key={idx}>
                            <NavLink
                              to={sub.href}
                              className="group flex items-center justify-between py-1.5 px-2 rounded hover:bg-neutral-50 transition-colors normal-case text-xs text-neutral-700 hover:text-[#9E4719]"
                            >
                              <span className="font-medium group-hover:translate-x-1 transition-transform">
                                {sub.name}
                              </span>
                              {sub.badge && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-[#9E4719] border border-amber-200/60 font-semibold">
                                  {sub.badge}
                                </span>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 normal-case">
                      <span>Kain adem primisima &amp; jahitan butik furing halus</span>
                      <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#9E4719] font-medium hover:underline"
                      >
                        Konsultasi Ukuran &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Direct Nav Links */}
      <NavLink
        to="/pages/layanan-seragam"
        className={({ isActive }) =>
          `py-4 transition-colors font-medium ${
            isActive ? 'text-[#9E4719] border-b border-[#9E4719]' : 'text-neutral-800 hover:text-[#9E4719]'
          }`
        }
      >
        Layanan Seragam
      </NavLink>

      <NavLink
        to="/pages/tentang-kami"
        className={({ isActive }) =>
          `py-4 transition-colors font-medium ${
            isActive ? 'text-[#9E4719] border-b border-[#9E4719]' : 'text-neutral-800 hover:text-[#9E4719]'
          }`
        }
      >
        Tentang Kami
      </NavLink>
    </nav>
  );
}
