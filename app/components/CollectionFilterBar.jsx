import React from 'react';
import { useSearchParams } from 'react-router';

/**
 * Pure Typographic Floating Filter & Sort Bar (Quiet Luxury)
 * 100% Zero-Box, Zero-Frame, Zero-Background.
 * Uses clean typographic text tabs with gold hairline active indicator.
 *
 * @param {{
 *   totalCount?: number;
 *   isDark?: boolean;
 *   className?: string;
 * }} props
 */
export function CollectionFilterBar({ totalCount, isDark = false, className = '' }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read active state from URL
  const currentSort = searchParams.get('sort') || 'featured';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  // Determine active price bracket
  const isUnder500 = !minPrice && maxPrice === '500000';
  const is500To1M = minPrice === '500000' && maxPrice === '1000000';
  const isAbove1M = minPrice === '1000000' && !maxPrice;
  const isAllActive = !minPrice && !maxPrice;

  // Helper to update search params while clearing pagination cursor
  const updateParams = (updater) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('cursor');
    nextParams.delete('direction');
    updater(nextParams);
    setSearchParams(nextParams, { preventScrollReset: true });
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    updateParams((params) => {
      if (val === 'featured') {
        params.delete('sort');
      } else {
        params.set('sort', val);
      }
    });
  };

  const setFilterMode = (mode) => {
    updateParams((params) => {
      // Reset filter params
      params.delete('minPrice');
      params.delete('maxPrice');

      if (mode === 'under500') {
        params.set('maxPrice', '500000');
      } else if (mode === '500to1m') {
        params.set('minPrice', '500000');
        params.set('maxPrice', '1000000');
      } else if (mode === 'above1m') {
        params.set('minPrice', '1000000');
      }
    });
  };

  const clearAllFilters = () => {
    updateParams((params) => {
      params.delete('sort');
      params.delete('minPrice');
      params.delete('maxPrice');
      params.delete('productType');
    });
  };

  return (
    <div
      className={`w-full mb-8 sm:mb-10 border-b pb-3.5 transition-colors ${
        isDark ? 'border-white/15' : 'border-[#E2DFD8]/80'
      } ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Pure Typographic Text Tabs (Horizontal Scrollable on Mobile) */}
        <nav
          aria-label="Filter Katalog"
          className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth -mb-[15px] pb-3"
        >
          {/* Tab: SEMUA */}
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer pb-2.5 border-b-2 bg-transparent ${
              isAllActive
                ? isDark
                  ? 'text-[#C5A059] border-[#C5A059] font-semibold'
                  : 'text-[#111111] border-[#C5A059] font-semibold'
                : isDark
                ? 'text-[#A69F96] border-transparent hover:text-white'
                : 'text-[#777777] border-transparent hover:text-[#111111]'
            }`}
          >
            Semua {typeof totalCount === 'number' && `(${totalCount})`}
          </button>

          {/* Tab: < RP 500RB */}
          <button
            type="button"
            onClick={() => setFilterMode(isUnder500 ? 'all' : 'under500')}
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer pb-2.5 border-b-2 bg-transparent ${
              isUnder500
                ? isDark
                  ? 'text-[#C5A059] border-[#C5A059] font-semibold'
                  : 'text-[#111111] border-[#C5A059] font-semibold'
                : isDark
                ? 'text-[#A69F96] border-transparent hover:text-white'
                : 'text-[#777777] border-transparent hover:text-[#111111]'
            }`}
          >
            &lt; Rp 500rb
          </button>

          {/* Tab: RP 500RB – 1JT */}
          <button
            type="button"
            onClick={() => setFilterMode(is500To1M ? 'all' : '500to1m')}
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer pb-2.5 border-b-2 bg-transparent ${
              is500To1M
                ? isDark
                  ? 'text-[#C5A059] border-[#C5A059] font-semibold'
                  : 'text-[#111111] border-[#C5A059] font-semibold'
                : isDark
                ? 'text-[#A69F96] border-transparent hover:text-white'
                : 'text-[#777777] border-transparent hover:text-[#111111]'
            }`}
          >
            Rp 500rb – 1jt
          </button>

          {/* Tab: > RP 1JT */}
          <button
            type="button"
            onClick={() => setFilterMode(isAbove1M ? 'all' : 'above1m')}
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer pb-2.5 border-b-2 bg-transparent ${
              isAbove1M
                ? isDark
                  ? 'text-[#C5A059] border-[#C5A059] font-semibold'
                  : 'text-[#111111] border-[#C5A059] font-semibold'
                : isDark
                ? 'text-[#A69F96] border-transparent hover:text-white'
                : 'text-[#777777] border-transparent hover:text-[#111111]'
            }`}
          >
            &gt; Rp 1jt
          </button>
        </nav>

        {/* Right Side: Pure Typographic Sort Selector (Frameless, Borderless) */}
        <div className="flex items-center justify-between sm:justify-end gap-4 ml-auto md:ml-0 shrink-0">
          {!isAllActive && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#9E7D3B] hover:text-[#111111] underline underline-offset-4 cursor-pointer"
            >
              Reset Filter
            </button>
          )}

          <div className="relative inline-flex items-center">
            <label htmlFor="pure-sort-select" className="sr-only">
              Urutkan Koleksi
            </label>
            <select
              id="pure-sort-select"
              value={currentSort}
              onChange={handleSortChange}
              className={`text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium pr-5 py-0.5 bg-transparent border-none appearance-none cursor-pointer focus:outline-hidden transition-colors ${
                isDark
                  ? 'text-[#C5A059] hover:text-white'
                  : 'text-[#5A5550] hover:text-[#111111]'
              }`}
            >
              <option value="featured" className="text-black bg-white">Urutkan: Rekomendasi</option>
              <option value="latest" className="text-black bg-white">Urutkan: Koleksi Terbaru</option>
              <option value="price-asc" className="text-black bg-white">Harga: Terendah &rarr; Tertinggi</option>
              <option value="price-desc" className="text-black bg-white">Harga: Tertinggi &rarr; Terendah</option>
              <option value="title-asc" className="text-black bg-white">Abjad: A &ndash; Z</option>
            </select>
            {/* Minimalist Micro Arrow */}
            <span
              aria-hidden="true"
              className={`pointer-events-none text-[10px] ml-1 ${
                isDark ? 'text-[#C5A059]' : 'text-[#888888]'
              }`}
            >
              &darr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
