import React from 'react';
import { NavLink } from 'react-router';

/**
 * Quiet Luxury Minimalist Breadcrumb Navigation
 * Strictly single-line fluid across all viewports (mobile 320px+ to 4K desktop).
 * 
 * Tier-Differentiated Visual Hierarchy:
 * - Luxury (tier === 'luxury'):
 *   Obsidian & Pure Imperial Gold aesthetic, 'KASTA I • LUXURY' diamond badge,
 *   gold slash separator (#C5A059), luminous active leaf typography with gold underline.
 * - Premium (tier === 'premium'):
 *   Warm Dobby & Antique Ochre aesthetic, 'KASTA II • PREMIUM' square badge,
 *   warm ochre slash separator (#9E7D3B), ivory/linen active leaf typography.
 * - Ekonomi (tier === 'ekonomi'):
 *   Clean Mori Linen & Soga Earth aesthetic, 'KASTA III • EKONOMI' badge,
 *   refined neutral separator.
 * - Default:
 *   Classic Quiet Luxury breadcrumb for general routes.
 *
 * @param {{
 *   items: Array<{ label: string, to?: string }>;
 *   isDark?: boolean;
 *   tier?: 'luxury' | 'premium' | 'ekonomi' | null;
 *   className?: string;
 * }} props
 */
export function Breadcrumb({ items = [], isDark = false, tier = null, className = '' }) {
  if (!items || items.length === 0) return null;

  const isLuxury = tier === 'luxury';
  const isPremium = tier === 'premium';
  const isEkonomi = tier === 'ekonomi';
  const hasTier = isLuxury || isPremium || isEkonomi;

  // List container styling
  const listContainerClass = hasTier
    ? isLuxury
      ? 'inline-flex items-center flex-nowrap overflow-x-auto scrollbar-none py-1.5 px-3 sm:px-4 bg-black/75 backdrop-blur-md border border-[#C5A059]/40 shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium leading-none'
      : isPremium
      ? 'inline-flex items-center flex-nowrap overflow-x-auto scrollbar-none py-1.5 px-3 sm:px-4 bg-[#1E1914]/85 backdrop-blur-md border border-[#9E7D3B]/45 shadow-[0_4px_16px_rgba(0,0,0,0.25)] text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium leading-none'
      : 'inline-flex items-center flex-nowrap overflow-x-auto scrollbar-none py-1.5 px-3 sm:px-4 bg-white/85 backdrop-blur-md border border-[#E2DFD8] text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium leading-none text-[#5A5550]'
    : `flex items-center flex-nowrap overflow-x-auto scrollbar-none py-1 -my-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium leading-none ${
        isDark ? 'text-[#8E8880]' : 'text-[#6E6862]'
      }`;

  // Root Link (Beranda) styling
  const homeLinkClass = isLuxury
    ? 'text-[#E6CA85] hover:text-white'
    : isPremium
    ? 'text-[#D8B26E] hover:text-[#FAF8F5]'
    : isEkonomi
    ? 'text-[#5A5550] hover:text-[#111111]'
    : isDark
    ? 'text-[#8E8880] hover:text-[#C5A059]'
    : 'text-[#6E6862] hover:text-[#111111]';

  // Home icon styling
  const homeIconClass = isLuxury
    ? 'text-[#C5A059]'
    : isPremium
    ? 'text-[#9E7D3B]'
    : isEkonomi
    ? 'text-[#7C3F1D]'
    : 'currentColor';

  // Non-leaf link styling (e.g. KOLEKSI)
  const nonLeafLinkClass = isLuxury
    ? 'text-[#C5A059]/85 hover:text-white'
    : isPremium
    ? 'text-[#C8B89E] hover:text-[#FAF8F5]'
    : isEkonomi
    ? 'text-[#5A5550] hover:text-[#111111]'
    : isDark
    ? 'text-[#8E8880] hover:text-[#C5A059]'
    : 'text-[#6E6862] hover:text-[#111111]';

  return (
    <nav
      aria-label="Navigasi Breadcrumb"
      className={`w-full overflow-hidden mb-5 sm:mb-8 select-none ${className}`}
    >
      <ol className={listContainerClass}>
        {/* Tier Prestige Micro-Badge */}
        {isLuxury && (
          <li className="flex items-center shrink-0 mr-2 sm:mr-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[8px] sm:text-[8.5px] uppercase font-bold tracking-[0.22em] bg-black text-[#E6CA85] border border-[#C5A059]/60 shadow-[0_2px_8px_rgba(197,160,89,0.25)]">
              <span className="w-1.5 h-1.5 bg-[#C5A059] inline-block shrink-0 rotate-45" />
              KASTA I &bull; LUXURY
            </span>
          </li>
        )}

        {isPremium && (
          <li className="flex items-center shrink-0 mr-2 sm:mr-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[8px] sm:text-[8.5px] uppercase font-semibold tracking-[0.22em] bg-[#2A2016] text-[#E8C589] border border-[#9E7D3B]/50 shadow-[0_2px_8px_rgba(158,125,59,0.18)]">
              <span className="w-1.5 h-1.5 bg-[#9E7D3B] inline-block shrink-0" />
              KASTA II &bull; PREMIUM
            </span>
          </li>
        )}

        {isEkonomi && (
          <li className="flex items-center shrink-0 mr-2 sm:mr-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[8px] sm:text-[8.5px] uppercase font-medium tracking-[0.2em] bg-white text-[#5A5550] border border-[#E2DFD8]">
              <span className="w-1.5 h-1.5 bg-[#7C3F1D] inline-block shrink-0" />
              KASTA III &bull; EKONOMI
            </span>
          </li>
        )}

        {/* 1. Root: Beranda with Zero-Radius Icon */}
        <li className="flex items-center shrink-0">
          <NavLink
            to="/"
            className={`flex items-center gap-1.5 transition-colors duration-200 ${homeLinkClass}`}
            aria-label="Kembali ke Beranda"
          >
            <svg
              className={`w-3.5 h-3.5 stroke-[1.6] shrink-0 ${homeIconClass}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" d="M3 10.5L12 3l9 7.5V21H4V10.5z" />
              <path strokeLinecap="square" strokeLinejoin="miter" d="M9 21v-7h6v7" />
            </svg>
            <span className="hidden sm:inline">BERANDA</span>
          </NavLink>
        </li>

        {/* 2. Breadcrumb Trail Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center shrink-0">
              {/* Refined Whispered Slash Separator */}
              <span
                className={`mx-2 sm:mx-2.5 text-[11px] select-none ${
                  isLuxury
                    ? 'text-[#C5A059] font-medium'
                    : isPremium
                    ? 'text-[#9E7D3B]/80 font-normal'
                    : isEkonomi
                    ? 'text-[#7C3F1D]/50 font-light'
                    : isDark
                    ? 'text-[#C5A059]/40 font-light'
                    : 'text-[#B0AAA0]/70 font-light'
                }`}
                aria-hidden="true"
              >
                /
              </span>

              {isLast || !item.to ? (
                <span
                  aria-current="page"
                  className={`max-w-[200px] sm:max-w-[360px] md:max-w-none truncate ${
                    isLuxury
                      ? 'font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#FFF4D6] border-b border-[#C5A059] pb-0.5'
                      : isPremium
                      ? 'font-semibold tracking-[0.18em] sm:tracking-[0.22em] text-[#FAF8F5] border-b border-[#9E7D3B]/70 pb-0.5'
                      : isEkonomi
                      ? 'font-semibold tracking-[0.18em] sm:tracking-[0.2em] text-[#111111] border-b border-[#7C3F1D]/40 pb-0.5'
                      : isDark
                      ? 'font-semibold tracking-[0.18em] sm:tracking-[0.2em] text-white'
                      : 'font-semibold tracking-[0.18em] sm:tracking-[0.2em] text-[#111111]'
                  }`}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <NavLink
                  to={item.to}
                  className={`transition-colors duration-200 shrink-0 ${nonLeafLinkClass}`}
                  title={item.label}
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

