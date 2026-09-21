import React from 'react';
import { NavLink } from 'react-router';

/**
 * Clean Luxury Modern Breadcrumb Navigation
 * Pristine, unboxed, frameless editorial breadcrumb stream.
 * Strictly single-line fluid across all viewports (mobile 320px+ to 4K desktop).
 *
 * Tier-Differentiated Minimalist Hierarchy:
 * - Luxury (tier === 'luxury'):
 *   Imperial Gold whispered mark & micro-label ('✦ LUXURY'), refined gold slash separator,
 *   warm gold typography and serene high-contrast active leaf.
 * - Premium (tier === 'premium'):
 *   Warm Ochre whispered mark & micro-label ('◈ PREMIUM'), refined ochre slash separator,
 *   champagne/mori linen typography.
 * - Ekonomi (tier === 'ekonomi'):
 *   Subtle Soga Earth whispered mark & micro-label ('∎ EKONOMI'), clean neutral separator.
 * - Default:
 *   Pristine Minimalist Breadcrumb without tier mark.
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

  // Home link color
  const homeLinkClass = isLuxury
    ? 'text-[#C5A059] hover:text-white'
    : isPremium
    ? 'text-[#D8B26E] hover:text-[#FAF8F5]'
    : isEkonomi
    ? 'text-[#5A5550] hover:text-[#111111]'
    : isDark
    ? 'text-[#A6A098] hover:text-[#C5A059]'
    : 'text-[#6E6862] hover:text-[#111111]';

  // Home icon color
  const homeIconClass = isLuxury
    ? 'text-[#C5A059]'
    : isPremium
    ? 'text-[#9E7D3B]'
    : isEkonomi
    ? 'text-[#7C3F1D]'
    : 'currentColor';

  // Non-leaf link color (e.g. KOLEKSI)
  const nonLeafLinkClass = isLuxury
    ? 'text-[#C5A059]/80 hover:text-white'
    : isPremium
    ? 'text-[#B8A995] hover:text-[#FAF8F5]'
    : isEkonomi
    ? 'text-[#5A5550] hover:text-[#111111]'
    : isDark
    ? 'text-[#A6A098] hover:text-[#C5A059]'
    : 'text-[#6E6862] hover:text-[#111111]';

  // Separator slash color
  const separatorClass = isLuxury
    ? 'text-[#C5A059]/60 font-light'
    : isPremium
    ? 'text-[#9E7D3B]/50 font-light'
    : isEkonomi
    ? 'text-[#7C3F1D]/40 font-light'
    : isDark
    ? 'text-[#C5A059]/40 font-light'
    : 'text-[#B0AAA0]/70 font-light';

  // Active leaf text color & weight
  const activeLeafClass = isLuxury
    ? 'font-serif font-normal tracking-[0.2em] sm:tracking-[0.24em] text-[#FFF4D6]'
    : isPremium
    ? 'font-sans font-medium tracking-[0.2em] sm:tracking-[0.22em] text-[#FAF8F5]'
    : isEkonomi
    ? 'font-sans font-medium tracking-[0.18em] sm:tracking-[0.2em] text-[#111111]'
    : isDark
    ? 'font-sans font-medium tracking-[0.18em] sm:tracking-[0.2em] text-white'
    : 'font-sans font-medium tracking-[0.18em] sm:tracking-[0.2em] text-[#111111]';

  return (
    <nav
      aria-label="Navigasi Breadcrumb"
      className={`w-full overflow-hidden mb-5 sm:mb-8 select-none ${className}`}
    >
      <ol className="flex items-center flex-nowrap overflow-x-auto scrollbar-none py-1 -my-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium leading-none">
        {/* 1. Root: Beranda with Zero-Radius Architectural Icon */}
        <li className="flex items-center shrink-0">
          <NavLink
            to="/"
            className={`flex items-center gap-1.5 transition-colors duration-200 ${homeLinkClass}`}
            aria-label="Kembali ke Beranda"
          >
            <svg
              className={`w-3.5 h-3.5 stroke-[1.4] shrink-0 ${homeIconClass}`}
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
                className={`mx-2 sm:mx-3 text-[11px] select-none ${separatorClass}`}
                aria-hidden="true"
              >
                /
              </span>

              {isLast || !item.to ? (
                <span
                  aria-current="page"
                  className={`max-w-[200px] sm:max-w-[360px] md:max-w-none truncate ${activeLeafClass}`}
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


