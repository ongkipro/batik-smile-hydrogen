import React from 'react';
import { NavLink } from 'react-router';

/**
 * Quiet Luxury Minimalist Breadcrumb Navigation
 * Strictly single-line fluid across all viewports (mobile 320px+ to 4K desktop).
 * Features:
 * - Architectural zero-radius Home icon with whispered 'BERANDA' microcopy.
 * - Refined slash '/' separator with subtle opacity and prestige spacing.
 * - Smooth touch-scrollable overflow on mobile with scrollbar hidden (zero line wrap).
 * - High-contrast active leaf typography with semantic <ol>/<li> structure.
 * - Dark & Light theme adaptability for Obsidian/Mori Linen surfaces.
 *
 * @param {{
 *   items: Array<{ label: string, to?: string }>;
 *   isDark?: boolean;
 *   className?: string;
 * }} props
 */
export function Breadcrumb({ items = [], isDark = false, className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Navigasi Breadcrumb"
      className={`w-full overflow-hidden mb-5 sm:mb-8 select-none ${className}`}
    >
      <ol
        className={`flex items-center flex-nowrap overflow-x-auto scrollbar-none py-1 -my-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium leading-none ${
          isDark ? 'text-[#8E8880]' : 'text-[#6E6862]'
        }`}
      >
        {/* 1. Root: Beranda with Zero-Radius Icon */}
        <li className="flex items-center shrink-0">
          <NavLink
            to="/"
            className={`flex items-center gap-1.5 transition-colors duration-200 ${
              isDark
                ? 'text-[#8E8880] hover:text-[#C5A059]'
                : 'text-[#6E6862] hover:text-[#111111]'
            }`}
            aria-label="Kembali ke Beranda"
          >
            <svg
              className="w-3.5 h-3.5 stroke-[1.6] shrink-0"
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
                className={`mx-2 sm:mx-2.5 text-[11px] font-light select-none ${
                  isDark ? 'text-[#C5A059]/40' : 'text-[#B0AAA0]/70'
                }`}
                aria-hidden="true"
              >
                /
              </span>

              {isLast || !item.to ? (
                <span
                  aria-current="page"
                  className={`font-semibold tracking-[0.18em] sm:tracking-[0.2em] max-w-[200px] sm:max-w-[360px] md:max-w-none truncate ${
                    isDark ? 'text-white' : 'text-[#111111]'
                  }`}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <NavLink
                  to={item.to}
                  className={`transition-colors duration-200 shrink-0 ${
                    isDark
                      ? 'text-[#8E8880] hover:text-[#C5A059]'
                      : 'text-[#6E6862] hover:text-[#111111]'
                  }`}
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
