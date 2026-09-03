import React from 'react';
import { NavLink } from 'react-router';

/**
 * Quiet Luxury Minimalist Breadcrumb Navigation
 * Strictly guaranteed to be maximum 1 line (single-line fluid) across all devices (mobile 320px+, tablet, desktop).
 * Uses architectural zero-radius Home icon and subtle micro-chevrons.
 *
 * @param {{
 *   items: Array<{ label: string, to?: string }>;
 *   isDark?: boolean;
 *   className?: string;
 * }} props
 */
export function Breadcrumb({ items = [], isDark = false, className = '' }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-[9px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] mb-5 sm:mb-8 flex items-center flex-nowrap gap-1 sm:gap-2 overflow-hidden whitespace-nowrap min-w-0 w-full select-none ${
        isDark ? 'text-[#A9A49C]' : 'text-[#5A5550]'
      } ${className}`}
    >
      {/* 1. Architectural Zero-Radius Home Icon (Never shrink) */}
      <NavLink
        to="/"
        aria-label="Beranda"
        className={`flex items-center shrink-0 p-0.5 transition-colors ${
          isDark
            ? 'text-[#A9A49C] hover:text-[#C5A059]'
            : 'text-[#5A5550] hover:text-[#9E7D3B]'
        }`}
      >
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.6]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="square" strokeLinejoin="miter" d="M3 10.5L12 3l9 7.5V21H4V10.5z" />
          <path strokeLinecap="square" strokeLinejoin="miter" d="M9 21v-7h6v7" />
        </svg>
      </NavLink>

      {/* 2. Dynamic Intermediate & Active Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {/* Minimalist Micro-Chevron Separator (Never shrink) */}
            <svg
              className={`w-2.5 h-2.5 shrink-0 opacity-70 ${
                isDark ? 'text-[#C5A059]' : 'text-[#888888]'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>

            {isLast || !item.to ? (
              <span
                className={`truncate font-medium min-w-0 flex-1 sm:flex-initial ${
                  isDark ? 'text-white/90' : 'text-[#111111]'
                }`}
                title={item.label}
              >
                {item.label}
              </span>
            ) : (
              <NavLink
                to={item.to}
                className={`shrink-0 max-w-[85px] sm:max-w-none truncate transition-colors ${
                  isDark ? 'hover:text-[#C5A059]' : 'hover:text-[#9E7D3B]'
                }`}
                title={item.label}
              >
                {item.label}
              </NavLink>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
