import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Rekomendasi Butik', shortLabel: 'Rekomendasi' },
  { value: 'latest', label: 'Koleksi Terbaru', shortLabel: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Terendah → Tertinggi', shortLabel: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga: Tertinggi → Terendah', shortLabel: 'Harga Tertinggi' },
  { value: 'title-asc', label: 'Abjad: A – Z', shortLabel: 'Abjad A–Z' },
];

/**
 * Bespoke Quiet Luxury Collection Filter & Sort Bar
 * - Zero-Box, Zero-Radius Precision (0px).
 * - Custom Anti-Slop Dropdown & Mobile Bottom Sheet (No native OS select, No iOS Safari zoom).
 * - Responsive touch-friendly horizontal ribbon for price brackets.
 * - Single-tap filter reset chips and count badges.
 *
 * @param {{
 *   totalCount?: number;
 *   isDark?: boolean;
 *   className?: string;
 * }} props
 */
export function CollectionFilterBar({ totalCount, isDark = false, className = '', handle = '' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Read active state from URL
  const currentSort = searchParams.get('sort') || 'featured';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const currentGender = searchParams.get('gender') || '';
  const currentSleeve = searchParams.get('sleeve') || '';

  const isSarimbit = handle.includes('sarimbit');
  const isAnak = handle.includes('anak');

  // Determine active price bracket
  const isUnder500 = !minPrice && maxPrice === '500000';
  const is500To1M = minPrice === '500000' && maxPrice === '1000000';
  const isAbove1M = minPrice === '1000000' && !maxPrice;
  const isAllActive = !minPrice && !maxPrice && !currentGender && !currentSleeve;

  const currentSortObj = SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  // Helper to update search params while clearing pagination cursor
  const updateParams = (updater) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('cursor');
    nextParams.delete('direction');
    updater(nextParams);
    setSearchParams(nextParams, { preventScrollReset: true });
  };

  const handleSortSelect = (val) => {
    updateParams((params) => {
      if (val === 'featured') {
        params.delete('sort');
      } else {
        params.set('sort', val);
      }
    });
    setIsSortOpen(false);
  };

  const setFilterMode = (mode) => {
    updateParams((params) => {
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

  const setGenderFilter = (val) => {
    updateParams((params) => {
      if (!val || val === currentGender) {
        params.delete('gender');
      } else {
        params.set('gender', val);
      }
    });
  };

  const setSleeveFilter = (val) => {
    updateParams((params) => {
      if (!val || val === currentSleeve) {
        params.delete('sleeve');
      } else {
        params.set('sleeve', val);
      }
    });
  };

  const clearAllFilters = () => {
    updateParams((params) => {
      params.delete('sort');
      params.delete('minPrice');
      params.delete('maxPrice');
      params.delete('productType');
      params.delete('gender');
      params.delete('sleeve');
    });
  };

  // Close desktop popover on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    }
    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortOpen]);

  // Lock body scroll on mobile bottom sheet open
  useEffect(() => {
    if (isSortOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSortOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`w-full mb-8 sm:mb-10 border-b pb-3.5 transition-colors ${
        isDark ? 'border-white/15' : 'border-[#E2DFD8]/80'
      } ${className}`}
    >
      {/* TOP CONTROL ROW: Mobile & Desktop Responsive Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4">
        
        {/* DESKTOP VIEW: Clean Typographic Filter Tabs */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav aria-label="Filter Katalog Desktop" className="flex items-center gap-6 lg:gap-8">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`text-[11px] uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer pb-2 border-b-2 bg-transparent ${
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

            <button
              type="button"
              onClick={() => setFilterMode(isUnder500 ? 'all' : 'under500')}
              className={`text-[11px] uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer pb-2 border-b-2 bg-transparent ${
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

            <button
              type="button"
              onClick={() => setFilterMode(is500To1M ? 'all' : '500to1m')}
              className={`text-[11px] uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer pb-2 border-b-2 bg-transparent ${
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

            <button
              type="button"
              onClick={() => setFilterMode(isAbove1M ? 'all' : 'above1m')}
              className={`text-[11px] uppercase tracking-[0.18em] transition-all whitespace-nowrap cursor-pointer pb-2 border-b-2 bg-transparent ${
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
        </div>

        {/* MOBILE VIEW TOP ROW: Count + Active Filter Summary + Sort Button */}
        <div className="flex md:hidden items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#5A5550] font-medium">
              {typeof totalCount === 'number' ? `${totalCount} Busana` : 'Koleksi'}
            </span>
            {!isAllActive && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#9E7D3B] bg-[#FAF8F5] border border-[#E2DFD8] px-2 py-0.5"
              >
                <span>{isUnder500 ? '<500rb' : is500To1M ? '500rb–1jt' : '>1jt'}</span>
                <span className="text-[#111111] font-bold">&times;</span>
              </button>
            )}
          </div>

          {/* Mobile Sort Trigger Button */}
          <button
            type="button"
            onClick={() => setIsSortOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isSortOpen}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer ${
              isDark
                ? 'border-[#C5A059]/40 text-[#C5A059] bg-[#111111]'
                : 'border-[#E2DFD8] text-[#111111] bg-white active:bg-[#FAF8F5]'
            }`}
          >
            <span>Urutkan: {currentSortObj.shortLabel}</span>
            <svg className="w-3 h-3 text-[#9E7D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* MOBILE VIEW BOTTOM ROW: Clean Horizontal Touch-Scroll Tabs */}
        <div className="md:hidden overflow-x-auto no-scrollbar -mx-4 px-4">
          <nav aria-label="Filter Katalog Mobile" className="flex items-center gap-2 py-1">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 border transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isAllActive
                  ? isDark
                    ? 'bg-[#C5A059] text-[#111111] border-[#C5A059] font-bold'
                    : 'bg-[#111111] text-white border-[#111111] font-bold'
                  : isDark
                  ? 'bg-[#1A1918] text-[#A69F96] border-white/10'
                  : 'bg-white text-[#5A5550] border-[#E2DFD8]'
              }`}
            >
              Semua {typeof totalCount === 'number' && `(${totalCount})`}
            </button>

            <button
              type="button"
              onClick={() => setFilterMode(isUnder500 ? 'all' : 'under500')}
              className={`text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 border transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isUnder500
                  ? isDark
                    ? 'bg-[#C5A059] text-[#111111] border-[#C5A059] font-bold'
                    : 'bg-[#111111] text-white border-[#111111] font-bold'
                  : isDark
                  ? 'bg-[#1A1918] text-[#A69F96] border-white/10'
                  : 'bg-white text-[#5A5550] border-[#E2DFD8]'
              }`}
            >
              &lt; Rp 500rb
            </button>

            <button
              type="button"
              onClick={() => setFilterMode(is500To1M ? 'all' : '500to1m')}
              className={`text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 border transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                is500To1M
                  ? isDark
                    ? 'bg-[#C5A059] text-[#111111] border-[#C5A059] font-bold'
                    : 'bg-[#111111] text-white border-[#111111] font-bold'
                  : isDark
                  ? 'bg-[#1A1918] text-[#A69F96] border-white/10'
                  : 'bg-white text-[#5A5550] border-[#E2DFD8]'
              }`}
            >
              Rp 500rb – 1jt
            </button>

            <button
              type="button"
              onClick={() => setFilterMode(isAbove1M ? 'all' : 'above1m')}
              className={`text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 border transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isAbove1M
                  ? isDark
                    ? 'bg-[#C5A059] text-[#111111] border-[#C5A059] font-bold'
                    : 'bg-[#111111] text-white border-[#111111] font-bold'
                  : isDark
                  ? 'bg-[#1A1918] text-[#A69F96] border-white/10'
                  : 'bg-white text-[#5A5550] border-[#E2DFD8]'
              }`}
            >
              &gt; Rp 1jt
            </button>
          </nav>
        </div>

        {/* DESKTOP RIGHT CONTROLS: Reset Filter & Custom Dropdown Popover */}
        <div className="hidden md:flex items-center gap-4 shrink-0 relative">
          {!isAllActive && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[10px] uppercase tracking-[0.18em] text-[#9E7D3B] hover:text-[#111111] underline underline-offset-4 cursor-pointer transition-colors"
            >
              Reset Filter
            </button>
          )}

          {/* Desktop Sort Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-medium py-1 px-2.5 transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#C5A059] hover:text-white'
                  : 'text-[#5A5550] hover:text-[#111111]'
              }`}
            >
              <span>Urutkan: {currentSortObj.shortLabel}</span>
              <svg
                className={`w-3 h-3 text-[#9E7D3B] transition-transform duration-200 ${
                  isSortOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Desktop Popover Menu (0px Radius, Quiet Luxury) */}
            {isSortOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-64 border shadow-xl z-50 p-1 rounded-none transition-all ${
                  isDark
                    ? 'bg-[#1C1C1C] border-[#C5A059]/40 text-white'
                    : 'bg-white border-[#E2DFD8] text-[#111111]'
                }`}
              >
                <div className="py-1">
                  {SORT_OPTIONS.map((opt) => {
                    const isSelected = opt.value === currentSort;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSortSelect(opt.value)}
                        className={`w-full text-left px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? isDark
                              ? 'bg-white/10 text-[#C5A059] font-semibold'
                              : 'bg-[#FAF8F5] text-[#111111] font-semibold'
                            : isDark
                            ? 'text-[#A69F96] hover:bg-white/5 hover:text-white'
                            : 'text-[#5A5550] hover:bg-[#FAF8F5] hover:text-[#111111]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && (
                          <span className="text-[#C5A059] text-xs font-bold">&bull;</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SUB-CATEGORY CHIP RIBBON (Tree: Sarimbit [Pria/Wanita, Panjang/Pendek] & Batik Anak [Putra/Putri]) */}
      {(isSarimbit || isAnak) && (
        <div
          className={`mt-3.5 pt-3.5 border-t flex flex-wrap items-center gap-3 sm:gap-4 ${
            isDark ? 'border-white/15' : 'border-[#E2DFD8]/80'
          }`}
        >
          {/* Gender Filter Chips */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className={`text-[9px] uppercase tracking-[0.2em] font-semibold ${
                isDark ? 'text-[#C5A059]' : 'text-[#9E7D3B]'
              }`}
            >
              {isSarimbit ? 'Gender:' : 'Koleksi:'}
            </span>
            <div className="inline-flex items-center border border-[#E2DFD8] bg-white p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setGenderFilter('')}
                className={`px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                  !currentGender
                    ? isDark
                      ? 'bg-[#C5A059] text-[#111111] font-bold'
                      : 'bg-[#111111] text-white font-bold'
                    : 'text-[#5A5550] hover:text-[#111111]'
                }`}
              >
                Semua
              </button>
              {isSarimbit ? (
                <>
                  <button
                    type="button"
                    onClick={() => setGenderFilter('pria')}
                    className={`px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                      currentGender === 'pria'
                        ? isDark
                          ? 'bg-[#C5A059] text-[#111111] font-bold'
                          : 'bg-[#111111] text-white font-bold'
                        : 'text-[#5A5550] hover:text-[#111111]'
                    }`}
                  >
                    Pria
                  </button>
                  <button
                    type="button"
                    onClick={() => setGenderFilter('wanita')}
                    className={`px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                      currentGender === 'wanita'
                        ? isDark
                          ? 'bg-[#C5A059] text-[#111111] font-bold'
                          : 'bg-[#111111] text-white font-bold'
                        : 'text-[#5A5550] hover:text-[#111111]'
                    }`}
                  >
                    Wanita
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setGenderFilter('putra')}
                    className={`px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                      currentGender === 'putra'
                        ? isDark
                          ? 'bg-[#C5A059] text-[#111111] font-bold'
                          : 'bg-[#111111] text-white font-bold'
                        : 'text-[#5A5550] hover:text-[#111111]'
                    }`}
                  >
                    Putra
                  </button>
                  <button
                    type="button"
                    onClick={() => setGenderFilter('putri')}
                    className={`px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                      currentGender === 'putri'
                        ? isDark
                          ? 'bg-[#C5A059] text-[#111111] font-bold'
                          : 'bg-[#111111] text-white font-bold'
                        : 'text-[#5A5550] hover:text-[#111111]'
                    }`}
                  >
                    Putri
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Sleeve Filter Chips */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className={`text-[9px] uppercase tracking-[0.2em] font-semibold ${
                isDark ? 'text-[#C5A059]' : 'text-[#9E7D3B]'
              }`}
            >
              Lengan:
            </span>
            <div className="inline-flex items-center border border-[#E2DFD8] bg-white p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setSleeveFilter('')}
                className={`px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                  !currentSleeve
                    ? isDark
                      ? 'bg-[#C5A059] text-[#111111] font-bold'
                      : 'bg-[#111111] text-white font-bold'
                    : 'text-[#5A5550] hover:text-[#111111]'
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setSleeveFilter('lengan-panjang')}
                className={`px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                  currentSleeve === 'lengan-panjang'
                    ? isDark
                      ? 'bg-[#C5A059] text-[#111111] font-bold'
                      : 'bg-[#111111] text-white font-bold'
                    : 'text-[#5A5550] hover:text-[#111111]'
                }`}
              >
                Panjang
              </button>
              <button
                type="button"
                onClick={() => setSleeveFilter('lengan-pendek')}
                className={`px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                  currentSleeve === 'lengan-pendek'
                    ? isDark
                      ? 'bg-[#C5A059] text-[#111111] font-bold'
                      : 'bg-[#111111] text-white font-bold'
                    : 'text-[#5A5550] hover:text-[#111111]'
                }`}
              >
                Pendek
              </button>
            </div>
          </div>

          {/* Reset button if any sub-filter active */}
          {(currentGender || currentSleeve) && (
            <button
              type="button"
              onClick={() => {
                setGenderFilter('');
                setSleeveFilter('');
              }}
              className="text-[9px] uppercase tracking-[0.16em] text-[#9E7D3B] hover:text-[#111111] underline underline-offset-2 cursor-pointer"
            >
              Reset Pilihan &times;
            </button>
          )}
        </div>
      )}

      {/* MOBILE SORT BOTTOM SHEET DRAWER (Zero-Zoom, Pure Touch UX) */}
      {isSortOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSortOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Urutkan Koleksi"
            className={`relative z-10 w-full max-h-[80vh] overflow-y-auto border-t p-5 shadow-2xl rounded-none transition-transform ${
              isDark
                ? 'bg-[#181716] border-[#C5A059]/40 text-white'
                : 'bg-white border-[#E2DFD8] text-[#111111]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-3 border-b border-[#E2DFD8]/60">
              <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#9E7D3B]">
                URUTKAN KOLEKSI
              </span>
              <button
                type="button"
                onClick={() => setIsSortOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-[#111111] cursor-pointer text-lg leading-none"
                aria-label="Tutup"
              >
                &times;
              </button>
            </div>

            {/* Options List (15px/16px font size to guarantee ZERO mobile zoom!) */}
            <div className="space-y-1">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = opt.value === currentSort;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSortSelect(opt.value)}
                    className={`w-full text-left px-4 py-3.5 text-[15px] sm:text-base tracking-wide flex items-center justify-between border-b border-[#E2DFD8]/30 transition-colors cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'text-[#C5A059] font-semibold bg-white/5'
                          : 'text-[#111111] font-semibold bg-[#FAF8F5]'
                        : isDark
                        ? 'text-[#CCCCCC] hover:text-white'
                        : 'text-[#5A5550] hover:text-[#111111]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <svg className="w-4 h-4 text-[#9E7D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Safe Action */}
            <div className="mt-5 pt-3">
              <button
                type="button"
                onClick={() => setIsSortOpen(false)}
                className="w-full py-3 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-xs font-bold uppercase tracking-[0.2em] transition-colors text-center"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
