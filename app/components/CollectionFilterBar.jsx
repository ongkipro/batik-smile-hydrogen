import React, { useState, useRef, useEffect, useId } from 'react';
import { Link, useSearchParams } from 'react-router';

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Rekomendasi Butik', shortLabel: 'Rekomendasi' },
  { value: 'latest', label: 'Koleksi Terbaru', shortLabel: 'Terbaru' },
  { value: 'price-asc', label: 'Harga: Terendah → Tertinggi', shortLabel: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga: Tertinggi → Terendah', shortLabel: 'Harga Tertinggi' },
  { value: 'title-asc', label: 'Abjad: A – Z', shortLabel: 'Abjad A–Z' },
];

export const OFFICIAL_COLLECTIONS = [
  { handle: 'sarimbit-luxury', label: 'Sarimbit Luxury', tier: 'Mahakarya Sutra ATBM' },
  { handle: 'sarimbit-premium', label: 'Sarimbit Premium', tier: 'Tenun Dobby Furing' },
  { handle: 'sarimbit-ekonomi', label: 'Sarimbit Ekonomi', tier: 'Katun Primis Harian' },
  { handle: 'kain', label: 'Kain Batik', tier: 'Kain Mori & Tulis' },
  { handle: 'aksesoris', label: 'Aksesoris', tier: 'Pelengkap Tradisional' },
  { handle: 'batik-anak', label: 'Batik Anak', tier: 'Putra & Putri' },
];

/**
 * Hook to manage filter and sort params cleanly
 */
export function useCollectionFilterState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || 'featured';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const currentGender = searchParams.get('gender') || '';
  const currentSleeve = searchParams.get('sleeve') || '';

  const isUnder500 = !minPrice && maxPrice === '500000';
  const is500To1M = minPrice === '500000' && maxPrice === '1000000';
  const isAbove1M = minPrice === '1000000' && !maxPrice;
  const isCustomPrice = (minPrice || maxPrice) && !isUnder500 && !is500To1M && !isAbove1M;

  const hasActiveFilters = Boolean(
    minPrice ||
    maxPrice ||
    currentGender ||
    currentSleeve ||
    (currentSort && currentSort !== 'featured')
  );

  const activeFilterCount =
    (minPrice || maxPrice ? 1 : 0) +
    (currentGender ? 1 : 0) +
    (currentSleeve ? 1 : 0) +
    (currentSort && currentSort !== 'featured' ? 1 : 0);

  const updateParams = (updater) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('cursor');
    nextParams.delete('direction');
    updater(nextParams);
    setSearchParams(nextParams, { preventScrollReset: true });
  };

  const setSort = (val) => {
    updateParams((params) => {
      if (!val || val === 'featured') {
        params.delete('sort');
      } else {
        params.set('sort', val);
      }
    });
  };

  const setPriceBracket = (bracket) => {
    updateParams((params) => {
      params.delete('minPrice');
      params.delete('maxPrice');
      if (bracket === 'under500') {
        params.set('maxPrice', '500000');
      } else if (bracket === '500to1m') {
        params.set('minPrice', '500000');
        params.set('maxPrice', '1000000');
      } else if (bracket === 'above1m') {
        params.set('minPrice', '1000000');
      }
    });
  };

  const setCustomPriceRange = (min, max) => {
    updateParams((params) => {
      if (min && !isNaN(Number(min)) && Number(min) > 0) {
        params.set('minPrice', String(min));
      } else {
        params.delete('minPrice');
      }
      if (max && !isNaN(Number(max)) && Number(max) > 0) {
        params.set('maxPrice', String(max));
      } else {
        params.delete('maxPrice');
      }
    });
  };

  const setGender = (val) => {
    updateParams((params) => {
      if (!val || val === currentGender) {
        params.delete('gender');
      } else {
        params.set('gender', val);
      }
    });
  };

  const setSleeve = (val) => {
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
      params.delete('gender');
      params.delete('sleeve');
    });
  };

  return {
    currentSort,
    minPrice,
    maxPrice,
    currentGender,
    currentSleeve,
    isUnder500,
    is500To1M,
    isAbove1M,
    isCustomPrice,
    hasActiveFilters,
    activeFilterCount,
    setSort,
    setPriceBracket,
    setCustomPriceRange,
    setGender,
    setSleeve,
    clearAllFilters,
  };
}

/**
 * Desktop Marketplace Left Sidebar Filter
 */
export function CollectionSidebar({
  handle = '',
  _totalCount,
  isDark = false,
  className = '',
}) {
  const filterState = useCollectionFilterState();
  const {
    currentSort,
    minPrice,
    maxPrice,
    currentGender,
    currentSleeve,
    isUnder500,
    is500To1M,
    isAbove1M,
    hasActiveFilters,
    setSort,
    setPriceBracket,
    setCustomPriceRange,
    setGender,
    setSleeve,
    clearAllFilters,
  } = filterState;

  const isSarimbit = handle.includes('sarimbit');
  const isAnak = handle.includes('anak');

  // Custom price input local state
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleCustomPriceSubmit = (e) => {
    e.preventDefault();
    setCustomPriceRange(localMin, localMax);
  };

  // Accordion state
  const [openSections, setOpenSections] = useState({
    collections: true,
    gender: true,
    sleeve: true,
    price: true,
    sort: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const borderColor = isDark ? 'border-white/15' : 'border-[#E2DFD8]';
  const textColor = isDark ? 'text-white' : 'text-[#111111]';
  const mutedTextColor = isDark ? 'text-[#A69F96]' : 'text-[#5A5550]';
  const activeBg = isDark ? 'bg-[#C5A059] text-[#111111]' : 'bg-[#111111] text-white';

  return (
    <aside
      aria-label="Filter Katalog Koleksi"
      className={`hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 py-1 no-scrollbar space-y-6 ${className}`}
    >
      {/* 1. SIDEBAR HEADER */}
      <div className={`pb-4 border-b ${borderColor} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {/* Sliders Icon */}
          <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="square" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16M8 4v4M16 10v4M10 16v4" />
          </svg>
          <h2 className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold ${textColor}`}>
            FILTER
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs uppercase tracking-[0.16em] text-[#9E7D3B] hover:text-[#C5A059] underline underline-offset-4 cursor-pointer transition-colors"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {/* 2. SECTION: KOLEKSI UTAMA (TREE NAVIGATION) */}
      <div className={`pb-5 border-b ${borderColor}`}>
        <button
          type="button"
          onClick={() => toggleSection('collections')}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold ${textColor}`}>
            Koleksi Busana
          </span>
          <span className="text-sm text-[#9E7D3B] font-mono">
            {openSections.collections ? '−' : '+'}
          </span>
        </button>

        {openSections.collections && (
          <div className="mt-3 space-y-1.5">
            {OFFICIAL_COLLECTIONS.map((col) => {
              const isActive = col.handle === handle;
              return (
                <Link
                  key={col.handle}
                  to={`/collections/${col.handle}`}
                  prefetch="intent"
                  className={`block py-2 pl-3 border-l-2 transition-all cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'border-[#C5A059] bg-white/5 text-white font-semibold'
                        : 'border-[#C5A059] bg-[#FAF8F5] text-[#111111] font-semibold'
                      : isDark
                      ? 'border-transparent text-[#A69F96] hover:text-white hover:border-white/20'
                      : 'border-transparent text-[#5A5550] hover:text-[#111111] hover:border-[#E2DFD8]'
                  }`}
                >
                  <div className="flex items-center justify-between pr-2">
                    <span className="text-xs sm:text-sm tracking-wide">{col.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-none" />
                    )}
                  </div>
                  <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#9E7D3B]">
                    {col.tier}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. SECTION: SUB-KATEGORI / GENDER (SARIMBIT & BATIK ANAK) */}
      {(isSarimbit || isAnak) && (
        <div className={`pb-5 border-b ${borderColor}`}>
          <button
            type="button"
            onClick={() => toggleSection('gender')}
            className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
          >
            <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold ${textColor}`}>
              {isSarimbit ? 'Gender / Kategori' : 'Kategori Anak'}
            </span>
            <span className="text-sm text-[#9E7D3B] font-mono">
              {openSections.gender ? '−' : '+'}
            </span>
          </button>

          {openSections.gender && (
            <div className="mt-3 space-y-2">
              {isSarimbit ? (
                <>
                  <button
                    type="button"
                    onClick={() => setGender('')}
                    className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                        !currentGender
                          ? activeBg
                          : isDark
                          ? 'border-white/20 bg-white/5'
                          : 'border-[#D5D0C7] bg-white'
                      }`}
                    >
                      {!currentGender && (
                        <span className="w-1.5 h-1.5 bg-current" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${!currentGender ? textColor + ' font-medium' : mutedTextColor}`}>
                      Semua Gender
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('pria')}
                    className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                        currentGender === 'pria'
                          ? activeBg
                          : isDark
                          ? 'border-white/20 bg-white/5'
                          : 'border-[#D5D0C7] bg-white'
                      }`}
                    >
                      {currentGender === 'pria' && (
                        <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${currentGender === 'pria' ? textColor + ' font-semibold' : mutedTextColor}`}>
                      Busana Pria
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('wanita')}
                    className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                        currentGender === 'wanita'
                          ? activeBg
                          : isDark
                          ? 'border-white/20 bg-white/5'
                          : 'border-[#D5D0C7] bg-white'
                      }`}
                    >
                      {currentGender === 'wanita' && (
                        <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${currentGender === 'wanita' ? textColor + ' font-semibold' : mutedTextColor}`}>
                      Busana Wanita
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setGender('')}
                    className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                        !currentGender
                          ? activeBg
                          : isDark
                          ? 'border-white/20 bg-white/5'
                          : 'border-[#D5D0C7] bg-white'
                      }`}
                    >
                      {!currentGender && (
                        <span className="w-1.5 h-1.5 bg-current" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${!currentGender ? textColor + ' font-medium' : mutedTextColor}`}>
                      Semua Anak
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('putra')}
                    className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                        currentGender === 'putra'
                          ? activeBg
                          : isDark
                          ? 'border-white/20 bg-white/5'
                          : 'border-[#D5D0C7] bg-white'
                      }`}
                    >
                      {currentGender === 'putra' && (
                        <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${currentGender === 'putra' ? textColor + ' font-semibold' : mutedTextColor}`}>
                      Batik Putra (Laki-laki)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGender('putri')}
                    className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                        currentGender === 'putri'
                          ? activeBg
                          : isDark
                          ? 'border-white/20 bg-white/5'
                          : 'border-[#D5D0C7] bg-white'
                      }`}
                    >
                      {currentGender === 'putri' && (
                        <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${currentGender === 'putri' ? textColor + ' font-semibold' : mutedTextColor}`}>
                      Batik Putri (Perempuan)
                    </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. SECTION: PANJANG LENGAN */}
      {(isSarimbit || isAnak) && (
        <div className={`pb-5 border-b ${borderColor}`}>
          <button
            type="button"
            onClick={() => toggleSection('sleeve')}
            className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
          >
            <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold ${textColor}`}>
              Panjang Lengan
            </span>
            <span className="text-sm text-[#9E7D3B] font-mono">
              {openSections.sleeve ? '−' : '+'}
            </span>
          </button>

          {openSections.sleeve && (
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => setSleeve('')}
                className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                    !currentSleeve
                      ? activeBg
                      : isDark
                      ? 'border-white/20 bg-white/5'
                      : 'border-[#D5D0C7] bg-white'
                  }`}
                >
                  {!currentSleeve && <span className="w-1.5 h-1.5 bg-current" />}
                </div>
                <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${!currentSleeve ? textColor + ' font-medium' : mutedTextColor}`}>
                  Semua Lengan
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSleeve('lengan-panjang')}
                className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                    currentSleeve === 'lengan-panjang'
                      ? activeBg
                      : isDark
                      ? 'border-white/20 bg-white/5'
                      : 'border-[#D5D0C7] bg-white'
                  }`}
                >
                  {currentSleeve === 'lengan-panjang' && (
                    <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${currentSleeve === 'lengan-panjang' ? textColor + ' font-semibold' : mutedTextColor}`}>
                  Lengan Panjang
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSleeve('lengan-pendek')}
                className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none group"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                    currentSleeve === 'lengan-pendek'
                      ? activeBg
                      : isDark
                      ? 'border-white/20 bg-white/5'
                      : 'border-[#D5D0C7] bg-white'
                  }`}
                >
                  {currentSleeve === 'lengan-pendek' && (
                    <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs sm:text-sm uppercase tracking-[0.14em] ${currentSleeve === 'lengan-pendek' ? textColor + ' font-semibold' : mutedTextColor}`}>
                  Lengan Pendek
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. SECTION: RENTANG HARGA */}
      <div className={`pb-5 border-b ${borderColor}`}>
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold ${textColor}`}>
            Rentang Harga
          </span>
          <span className="text-sm text-[#9E7D3B] font-mono">
            {openSections.price ? '−' : '+'}
          </span>
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-2.5">
            {/* Quick Presets */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPriceBracket('all')}
                className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                    !minPrice && !maxPrice
                      ? activeBg
                      : isDark
                      ? 'border-white/20 bg-white/5'
                      : 'border-[#D5D0C7] bg-white'
                  }`}
                >
                  {!minPrice && !maxPrice && <span className="w-1.5 h-1.5 bg-current" />}
                </div>
                <span className={`text-xs sm:text-sm ${!minPrice && !maxPrice ? textColor + ' font-semibold' : mutedTextColor}`}>
                  Semua Harga
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPriceBracket(isUnder500 ? 'all' : 'under500')}
                className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                    isUnder500
                      ? activeBg
                      : isDark
                      ? 'border-white/20 bg-white/5'
                      : 'border-[#D5D0C7] bg-white'
                  }`}
                >
                  {isUnder500 && (
                    <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs sm:text-sm ${isUnder500 ? textColor + ' font-semibold' : mutedTextColor}`}>
                  &lt; Rp 500.000
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPriceBracket(is500To1M ? 'all' : '500to1m')}
                className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                    is500To1M
                      ? activeBg
                      : isDark
                      ? 'border-white/20 bg-white/5'
                      : 'border-[#D5D0C7] bg-white'
                  }`}
                >
                  {is500To1M && (
                    <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs sm:text-sm ${is500To1M ? textColor + ' font-semibold' : mutedTextColor}`}>
                  Rp 500.000 – Rp 1.000.000
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPriceBracket(isAbove1M ? 'all' : 'above1m')}
                className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                    isAbove1M
                      ? activeBg
                      : isDark
                      ? 'border-white/20 bg-white/5'
                      : 'border-[#D5D0C7] bg-white'
                  }`}
                >
                  {isAbove1M && (
                    <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs sm:text-sm ${isAbove1M ? textColor + ' font-semibold' : mutedTextColor}`}>
                  &gt; Rp 1.000.000
                </span>
              </button>
            </div>

            {/* Custom Price Inputs */}
            <form onSubmit={handleCustomPriceSubmit} className="mt-3 pt-3 border-t border-[#E2DFD8]/60 space-y-2">
              <span className="text-xs uppercase tracking-[0.16em] text-[#9E7D3B] font-semibold block">
                Atur Rentang Sendiri:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888888] block mb-0.5">Min (Rp)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={localMin}
                    onChange={(e) => setLocalMin(e.target.value)}
                    className={`w-full px-2.5 py-2 text-base sm:text-xs border bg-transparent focus:outline-none focus:border-[#C5A059] ${
                      isDark ? 'border-white/20 text-white' : 'border-[#E2DFD8] text-[#111111]'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#888888] block mb-0.5">Maks (Rp)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="1.000.000"
                    value={localMax}
                    onChange={(e) => setLocalMax(e.target.value)}
                    className={`w-full px-2.5 py-2 text-base sm:text-xs border bg-transparent focus:outline-none focus:border-[#C5A059] ${
                      isDark ? 'border-white/20 text-white' : 'border-[#E2DFD8] text-[#111111]'
                    }`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full py-2 text-xs uppercase font-bold tracking-[0.2em] transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#C5A059] text-[#111111] hover:bg-white'
                    : 'bg-[#111111] text-white hover:bg-[#C5A059] hover:text-[#111111]'
                }`}
              >
                Terapkan
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 6. SECTION: URUTKAN (SORT BY) */}
      <div className={`pb-5 border-b ${borderColor}`}>
        <button
          type="button"
          onClick={() => toggleSection('sort')}
          className="w-full flex items-center justify-between py-1 text-left cursor-pointer group"
        >
          <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold ${textColor}`}>
            Urutkan
          </span>
          <span className="text-sm text-[#9E7D3B] font-mono">
            {openSections.sort ? '−' : '+'}
          </span>
        </button>

        {openSections.sort && (
          <div className="mt-3 space-y-2">
            {SORT_OPTIONS.map((opt) => {
              const isSelected = opt.value === currentSort;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSort(opt.value)}
                  className="w-full flex items-center gap-2.5 text-left cursor-pointer select-none"
                >
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${
                      isSelected
                        ? activeBg
                        : isDark
                        ? 'border-white/20 bg-white/5'
                        : 'border-[#D5D0C7] bg-white'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 bg-current" />}
                  </div>
                  <span className={`text-xs sm:text-sm ${isSelected ? textColor + ' font-semibold' : mutedTextColor}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

/**
 * Active Filter Pills & Top Control Bar (Rendered on top of product grid)
 */
export function CollectionFilterHeader({
  handle = '',
  _totalCount,
  isDark = false,
  className = '',
}) {
  const filterState = useCollectionFilterState();
  const {
    currentSort,
    minPrice,
    maxPrice,
    currentGender,
    currentSleeve,
    isUnder500,
    is500To1M,
    isAbove1M,
    hasActiveFilters,
    activeFilterCount,
    setSort,
    setPriceBracket,
    setGender,
    setSleeve,
    clearAllFilters,
  } = filterState;

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortRef = useRef(null);

  const currentSortObj = SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  // Close desktop sort dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortDropdownOpen(false);
      }
    }
    if (isSortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSortDropdownOpen]);

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  return (
    <div className={`w-full mb-6 pb-4 border-b ${isDark ? 'border-white/15' : 'border-[#E2DFD8]'} ${className}`}>
      {/* TOP ROW: Count + Mobile Filter Trigger + Desktop Quick Sort */}
      <div className="flex items-center justify-between gap-4">
        {/* Curated Collection Header (No count, clean Quiet Luxury) */}
        <div className="flex items-center gap-2.5">
          <span className={`text-sm sm:text-base uppercase tracking-[0.2em] font-semibold ${isDark ? 'text-white' : 'text-[#111111]'}`}>
            Koleksi Busana
          </span>
        </div>

        {/* CONTROLS RIGHT: Mobile Drawer Button (< lg) & Desktop Sort (> lg) */}
        <div className="flex items-center gap-3">
          {/* MOBILE FILTER TRIGGER BUTTON (Visible on < lg) */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-label="Buka Filter & Urutkan"
            className={`lg:hidden inline-flex items-center gap-2 px-3.5 py-2 border text-xs sm:text-sm uppercase tracking-[0.18em] font-bold cursor-pointer transition-colors ${
              hasActiveFilters
                ? isDark
                  ? 'border-[#C5A059] bg-[#C5A059] text-[#111111]'
                  : 'border-[#111111] bg-[#111111] text-white'
                : isDark
                ? 'border-white/20 text-white bg-white/5'
                : 'border-[#E2DFD8] text-[#111111] bg-white'
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="square" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16M8 4v4M16 10v4M10 16v4" />
            </svg>
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className={`inline-flex items-center justify-center w-4 h-4 text-[9px] font-mono font-bold ${
                hasActiveFilters
                  ? isDark ? 'bg-[#111111] text-[#C5A059]' : 'bg-white text-[#111111]'
                  : 'bg-[#C5A059] text-[#111111]'
              }`}>
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* DESKTOP QUICK SORT DROPDOWN (Visible on lg+) */}
          <div ref={sortRef} className="hidden lg:relative lg:block">
            <button
              type="button"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium py-2 px-4 border transition-colors cursor-pointer ${
                isDark
                  ? 'border-white/20 text-white hover:border-[#C5A059]'
                  : 'border-[#E2DFD8] text-[#111111] hover:border-[#111111] bg-white'
              }`}
            >
              <span className="text-[#9E7D3B]">Urutkan:</span>
              <span>{currentSortObj.shortLabel}</span>
              <svg
                className={`w-3.5 h-3.5 text-[#9E7D3B] transition-transform duration-200 ${
                  isSortDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isSortDropdownOpen && (
              <div
                className={`absolute right-0 top-full mt-1.5 w-60 border shadow-2xl z-50 p-1 rounded-none transition-all ${
                  isDark
                    ? 'bg-[#1C1C1C] border-[#C5A059]/40 text-white'
                    : 'bg-white border-[#E2DFD8] text-[#111111]'
                }`}
              >
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = opt.value === currentSort;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setSort(opt.value);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm uppercase tracking-[0.14em] flex items-center justify-between transition-colors cursor-pointer ${
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
                      {isSelected && <span className="text-[#C5A059] text-xs font-bold">&bull;</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVE FILTER PILLS / CHIPS ROW */}
      {hasActiveFilters && (
        <div className="mt-3.5 pt-3 border-t border-[#E2DFD8]/60 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-[0.18em] text-[#9E7D3B] font-semibold mr-1">
            Filter Aktif:
          </span>

          {/* Gender Pill */}
          {currentGender && (
            <button
              type="button"
              onClick={() => setGender('')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-wider border cursor-pointer transition-colors ${
                isDark
                  ? 'bg-white/10 border-white/25 text-white hover:border-[#C5A059]'
                  : 'bg-white border-[#E2DFD8] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <span>Kategori: {currentGender.toUpperCase()}</span>
              <span className="font-bold text-[#9E7D3B] hover:text-current">&times;</span>
            </button>
          )}

          {/* Sleeve Pill */}
          {currentSleeve && (
            <button
              type="button"
              onClick={() => setSleeve('')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-wider border cursor-pointer transition-colors ${
                isDark
                  ? 'bg-white/10 border-white/25 text-white hover:border-[#C5A059]'
                  : 'bg-white border-[#E2DFD8] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <span>Lengan: {currentSleeve === 'lengan-panjang' ? 'Panjang' : 'Pendek'}</span>
              <span className="font-bold text-[#9E7D3B] hover:text-current">&times;</span>
            </button>
          )}

          {/* Price Bracket Pill */}
          {(minPrice || maxPrice) && (
            <button
              type="button"
              onClick={() => setPriceBracket('all')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-wider border cursor-pointer transition-colors ${
                isDark
                  ? 'bg-white/10 border-white/25 text-white hover:border-[#C5A059]'
                  : 'bg-white border-[#E2DFD8] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <span>
                Harga:{' '}
                {isUnder500
                  ? '< Rp 500rb'
                  : is500To1M
                  ? 'Rp 500rb – 1jt'
                  : isAbove1M
                  ? '> Rp 1jt'
                  : `${minPrice || '0'} – ${maxPrice || '...'}`}
              </span>
              <span className="font-bold text-[#9E7D3B] hover:text-current">&times;</span>
            </button>
          )}

          {/* Sort Pill (if not default) */}
          {currentSort && currentSort !== 'featured' && (
            <button
              type="button"
              onClick={() => setSort('featured')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-wider border cursor-pointer transition-colors ${
                isDark
                  ? 'bg-white/10 border-white/25 text-white hover:border-[#C5A059]'
                  : 'bg-white border-[#E2DFD8] text-[#111111] hover:border-[#111111]'
              }`}
            >
              <span>Urut: {currentSortObj.shortLabel}</span>
              <span className="font-bold text-[#9E7D3B] hover:text-current">&times;</span>
            </button>
          )}

          {/* Clear All Link */}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs uppercase tracking-[0.18em] text-[#9E7D3B] hover:text-[#111111] underline underline-offset-2 ml-1 cursor-pointer transition-colors"
          >
            Hapus Semua
          </button>
        </div>
      )}

      {/* MOBILE SLIDE-IN DRAWER (< lg) */}
      {isMobileDrawerOpen && (
        <CollectionMobileDrawer
          handle={handle}
          _totalCount={_totalCount}
          isDark={isDark}
          onClose={() => setIsMobileDrawerOpen(false)}
        />
      )}
    </div>
  );
}

/**
 * Mobile Slide-in Drawer Component (Zero-radius, Flat Quiet Luxury)
 */
export function CollectionMobileDrawer({
  handle = '',
  _totalCount,
  isDark = false,
  onClose,
}) {
  const id = useId();
  const filterState = useCollectionFilterState();
  const {
    currentSort,
    minPrice,
    maxPrice,
    currentGender,
    currentSleeve,
    isUnder500,
    is500To1M,
    isAbove1M,
    hasActiveFilters,
    setSort,
    setPriceBracket,
    setCustomPriceRange,
    setGender,
    setSleeve,
    clearAllFilters,
  } = filterState;

  const isSarimbit = handle.includes('sarimbit');
  const isAnak = handle.includes('anak');

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const handleCustomPriceSubmit = (e) => {
    e.preventDefault();
    setCustomPriceRange(localMin, localMax);
  };

  const borderColor = isDark ? 'border-white/15' : 'border-[#E2DFD8]';
  const textColor = isDark ? 'text-white' : 'text-[#111111]';
  const mutedTextColor = isDark ? 'text-[#A69F96]' : 'text-[#5A5550]';
  const activeBg = isDark ? 'bg-[#C5A059] text-[#111111]' : 'bg-[#111111] text-white';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (Slide from left) */}
      <aside
        className={`relative z-10 w-[85vw] max-w-sm h-full shadow-2xl flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-in-out ${
          isDark ? 'bg-[#161616] text-white' : 'bg-[#FAF8F5] text-[#111111]'
        }`}
      >
        {/* Drawer Header */}
        <header className={`flex items-center justify-between h-16 px-5 border-b ${borderColor} ${isDark ? 'bg-[#1C1C1C]' : 'bg-white'}`}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <h3 id={`${id}-title`} className={`text-sm sm:text-base font-bold uppercase tracking-[0.2em] ${textColor} m-0`}>
              FILTER &amp; URUTKAN
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-base font-light text-[#888888] hover:text-current cursor-pointer"
            aria-label="Tutup Filter"
          >
            ✕
          </button>
        </header>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 text-left">
          {/* KOLEKSI UTAMA */}
          <div className={`pb-5 border-b ${borderColor}`}>
            <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold block mb-3 ${textColor}`}>
              Koleksi Busana
            </span>
            <div className="space-y-1.5">
              {OFFICIAL_COLLECTIONS.map((col) => {
                const isActive = col.handle === handle;
                return (
                  <Link
                    key={col.handle}
                    to={`/collections/${col.handle}`}
                    onClick={onClose}
                    className={`block py-2 pl-3 border-l-2 transition-all ${
                      isActive
                        ? isDark
                          ? 'border-[#C5A059] bg-white/5 text-white font-semibold'
                          : 'border-[#C5A059] bg-white text-[#111111] font-semibold'
                        : isDark
                        ? 'border-transparent text-[#A69F96]'
                        : 'border-transparent text-[#5A5550]'
                    }`}
                  >
                    <div className="flex items-center justify-between pr-2">
                      <span className="text-xs sm:text-sm">{col.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 bg-[#C5A059]" />}
                    </div>
                    <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#9E7D3B]">
                      {col.tier}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* GENDER / KATEGORI */}
          {(isSarimbit || isAnak) && (
            <div className={`pb-5 border-b ${borderColor}`}>
              <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold block mb-3 ${textColor}`}>
                {isSarimbit ? 'Gender / Kategori' : 'Kategori Anak'}
              </span>
              <div className="space-y-2.5">
                {isSarimbit ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setGender('')}
                      className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${!currentGender ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                        {!currentGender && <span className="w-1.5 h-1.5 bg-current" />}
                      </div>
                      <span className={`text-xs sm:text-sm uppercase tracking-wider ${!currentGender ? textColor + ' font-bold' : mutedTextColor}`}>Semua Gender</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('pria')}
                      className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${currentGender === 'pria' ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                        {currentGender === 'pria' && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-xs sm:text-sm uppercase tracking-wider ${currentGender === 'pria' ? textColor + ' font-bold' : mutedTextColor}`}>Busana Pria</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('wanita')}
                      className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${currentGender === 'wanita' ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                        {currentGender === 'wanita' && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-xs sm:text-sm uppercase tracking-wider ${currentGender === 'wanita' ? textColor + ' font-bold' : mutedTextColor}`}>Busana Wanita</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setGender('')}
                      className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${!currentGender ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                        {!currentGender && <span className="w-1.5 h-1.5 bg-current" />}
                      </div>
                      <span className={`text-xs sm:text-sm uppercase tracking-wider ${!currentGender ? textColor + ' font-bold' : mutedTextColor}`}>Semua Anak</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('putra')}
                      className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${currentGender === 'putra' ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                        {currentGender === 'putra' && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-xs sm:text-sm uppercase tracking-wider ${currentGender === 'putra' ? textColor + ' font-bold' : mutedTextColor}`}>Batik Putra (Laki-laki)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('putri')}
                      className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${currentGender === 'putri' ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                        {currentGender === 'putri' && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-xs sm:text-sm uppercase tracking-wider ${currentGender === 'putri' ? textColor + ' font-bold' : mutedTextColor}`}>Batik Putri (Perempuan)</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* PANJANG LENGAN */}
          {(isSarimbit || isAnak) && (
            <div className={`pb-5 border-b ${borderColor}`}>
              <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold block mb-3 ${textColor}`}>
                Panjang Lengan
              </span>
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setSleeve('')}
                  className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                >
                  <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${!currentSleeve ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                    {!currentSleeve && <span className="w-1.5 h-1.5 bg-current" />}
                  </div>
                  <span className={`text-xs sm:text-sm uppercase tracking-wider ${!currentSleeve ? textColor + ' font-bold' : mutedTextColor}`}>Semua Lengan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSleeve('lengan-panjang')}
                  className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                >
                  <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${currentSleeve === 'lengan-panjang' ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                    {currentSleeve === 'lengan-panjang' && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-xs sm:text-sm uppercase tracking-wider ${currentSleeve === 'lengan-panjang' ? textColor + ' font-bold' : mutedTextColor}`}>Lengan Panjang</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSleeve('lengan-pendek')}
                  className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                >
                  <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${currentSleeve === 'lengan-pendek' ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                    {currentSleeve === 'lengan-pendek' && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-xs sm:text-sm uppercase tracking-wider ${currentSleeve === 'lengan-pendek' ? textColor + ' font-bold' : mutedTextColor}`}>Lengan Pendek</span>
                </button>
              </div>
            </div>
          )}

          {/* RENTANG HARGA */}
          <div className={`pb-5 border-b ${borderColor}`}>
            <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold block mb-3 ${textColor}`}>
              Rentang Harga
            </span>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setPriceBracket('all')}
                className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
              >
                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${!minPrice && !maxPrice ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                  {!minPrice && !maxPrice && <span className="w-1.5 h-1.5 bg-current" />}
                </div>
                <span className={`text-xs sm:text-sm ${!minPrice && !maxPrice ? textColor + ' font-bold' : mutedTextColor}`}>Semua Harga</span>
              </button>
              <button
                type="button"
                onClick={() => setPriceBracket(isUnder500 ? 'all' : 'under500')}
                className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
              >
                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${isUnder500 ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                  {isUnder500 && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-xs sm:text-sm ${isUnder500 ? textColor + ' font-bold' : mutedTextColor}`}>&lt; Rp 500.000</span>
              </button>
              <button
                type="button"
                onClick={() => setPriceBracket(is500To1M ? 'all' : '500to1m')}
                className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
              >
                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${is500To1M ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                  {is500To1M && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-xs sm:text-sm ${is500To1M ? textColor + ' font-bold' : mutedTextColor}`}>Rp 500.000 – Rp 1.000.000</span>
              </button>
              <button
                type="button"
                onClick={() => setPriceBracket(isAbove1M ? 'all' : 'above1m')}
                className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
              >
                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${isAbove1M ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                  {isAbove1M && <svg className="w-2.5 h-2.5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="square" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-xs sm:text-sm ${isAbove1M ? textColor + ' font-bold' : mutedTextColor}`}>&gt; Rp 1.000.000</span>
              </button>
            </div>

            {/* Custom inputs */}
            <form onSubmit={handleCustomPriceSubmit} className="mt-3 pt-3 border-t border-[#E2DFD8]/60 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Min (Rp)"
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                  className={`w-full px-3 py-2.5 min-h-[44px] text-base sm:text-xs border bg-white focus:outline-none ${isDark ? 'border-white/20 text-white bg-[#222]' : 'border-[#E2DFD8] text-[#111111]'}`}
                />
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Maks (Rp)"
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                  className={`w-full px-3 py-2.5 min-h-[44px] text-base sm:text-xs border bg-white focus:outline-none ${isDark ? 'border-white/20 text-white bg-[#222]' : 'border-[#E2DFD8] text-[#111111]'}`}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#111111] text-white text-xs uppercase font-bold tracking-[0.2em] cursor-pointer"
              >
                Pasang Harga
              </button>
            </form>
          </div>

          {/* URUTKAN */}
          <div className="pb-5">
            <span className={`text-xs sm:text-sm uppercase tracking-[0.2em] font-bold block mb-3 ${textColor}`}>
              Urutkan Koleksi
            </span>
            <div className="space-y-2.5">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = opt.value === currentSort;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSort(opt.value)}
                    className="w-full flex items-center gap-3 text-left py-1 cursor-pointer"
                  >
                    <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${isSelected ? activeBg : 'border-[#D5D0C7] bg-white'}`}>
                      {isSelected && <span className="w-1.5 h-1.5 bg-current" />}
                    </div>
                    <span className={`text-xs sm:text-sm ${isSelected ? textColor + ' font-bold' : mutedTextColor}`}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Sticky Footer Actions */}
        <footer className={`p-4 border-t ${borderColor} ${isDark ? 'bg-[#1C1C1C]' : 'bg-white'} flex items-center gap-3`}>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className={`py-3.5 px-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] border transition-colors cursor-pointer ${
                isDark ? 'border-white/30 text-white hover:bg-white/10' : 'border-[#E2DFD8] text-[#111111] hover:bg-[#FAF8F5]'
              }`}
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 bg-[#C5A059] hover:bg-[#111111] hover:text-white text-[#111111] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-colors text-center shadow-md cursor-pointer"
          >
            Terapkan Filter
          </button>
        </footer>
      </aside>
    </div>
  );
}

/**
 * Backward-compatible full horizontal wrapper if used directly
 */
export function CollectionFilterBar({
  handle = '',
  _totalCount,
  isDark = false,
  className = '',
}) {
  return (
    <CollectionFilterHeader
      handle={handle}
      _totalCount={_totalCount}
      isDark={isDark}
      className={className}
    />
  );
}
