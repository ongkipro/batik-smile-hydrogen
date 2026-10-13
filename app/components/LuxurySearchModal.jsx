import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useFetcher } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { formatRupiah } from '~/lib/currency';

export const SEARCH_ENDPOINT = '/search';

const TRENDING_KEYWORDS = [
  'Luxury Series',
  'Premium Series',
  'Ekonomi Series',
  'Kemeja Batik Pria',
  'Batik Wanita Modern',
  'Kain Batik Tulis',
  'Batik Anak',
  'Aksesoris Tradisional',
];

/**
 * LuxurySearchModal: Quiet Luxury Live In-Modal Search Engine
 * - Clean Minimalist Luxury Professional Architecture (Frameless cards, zero boxy borders).
 * - Instant debounced predictive search (250ms) + keyboard navigation.
 * - Comprehensive categorization: Busana & Produk, Koleksi Butik, Tag, dan Warta Jurnal.
 * - Strict 4:5 vertical portrait product imagery with subtle hover scale.
 * - Mobile full-screen responsive + Desktop centered luxury dialog.
 * - Zero-radius (0px) precision styling with quad-harmonic palette.
 */
export function LuxurySearchModal() {
  const { type, close } = useAside();
  const isOpen = type === 'search';
  const fetcher = useFetcher({ key: 'search-modal' });
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'products' | 'collections' | 'tags' | 'articles'
  const hasLoadedInitial = useRef(false);

  // Auto-focus input & preload initial curated recommendations
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 60);

      // Preload initial curated items on open once (limit strictly <= 10 for Storefront API)
      if (!hasLoadedInitial.current) {
        hasLoadedInitial.current = true;
        void fetcher.submit(
          { q: 'sarimbit', limit: 8, predictive: true },
          { method: 'GET', action: SEARCH_ENDPOINT },
        );
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          close();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      hasLoadedInitial.current = false;
      document.body.style.overflow = '';
      setSearchTerm('');
      setActiveTab('all');
    }
  }, [isOpen, close, fetcher]);

  // Execute in-modal predictive search (enforce max limit 10)
  const executeSearch = useCallback((query) => {
    const cleanQuery = query.trim();
    void fetcher.submit(
      { q: cleanQuery || 'sarimbit', limit: 10, predictive: true },
      { method: 'GET', action: SEARCH_ENDPOINT },
    );
  }, [fetcher]);

  // Live typing with 250ms debounce
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      executeSearch(value);
    }, 250);
  };

  // Instant keyword click
  const handleSelectKeyword = (keyword) => {
    setSearchTerm(keyword);
    if (inputRef.current) {
      inputRef.current.value = keyword;
      inputRef.current.focus();
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    executeSearch(keyword);
  };

  // Clear input
  const handleClear = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    executeSearch('sarimbit');
  };

  // Submit in-modal (Never opens /search page)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    executeSearch(searchTerm);
  };

  if (!isOpen) return null;

  // Robust data extraction supporting both flat result and nested items
  const searchResult = fetcher?.data?.result;
  const products = searchResult?.items?.products ?? searchResult?.products ?? [];
  const collections = searchResult?.items?.collections ?? searchResult?.collections ?? [];
  const articles = searchResult?.items?.articles ?? searchResult?.articles ?? [];
  const tags = searchResult?.tags ?? searchResult?.items?.tags ?? [];
  const total = searchResult?.total ?? (products.length + collections.length + articles.length);
  const isLoading = fetcher.state === 'loading';
  const hasTypedQuery = searchTerm.trim().length > 0;

  // Filtered views based on active tab
  const showProducts = (activeTab === 'all' || activeTab === 'products') && products.length > 0;
  const showCollections = (activeTab === 'all' || activeTab === 'collections') && collections.length > 0;
  const showTags = (activeTab === 'all' || activeTab === 'tags') && tags.length > 0;
  const showArticles = (activeTab === 'all' || activeTab === 'articles') && articles.length > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Butik Batik Smile"
      className="fixed inset-0 z-50 flex flex-col justify-start items-center"
    >
      {/* 1. Velvety Dark Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={close}
        aria-hidden="true"
      />

      {/* 2. Main Luxury Modal Container: Mobile Full-Screen / Desktop Centered Architectural Dialog */}
      <div className="relative z-10 w-full lg:max-w-4xl xl:max-w-5xl lg:my-6 bg-[#FAF8F5] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col h-[100dvh] lg:h-[88vh] max-h-[100dvh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-[#E2DFD8] bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#111111]">
              BUTIK BATIK SMILE &bull; PENCARIAN EKSKLUSIF
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.2em] text-[#888888]">
              [ESC] TUTUP
            </span>
            <button
              type="button"
              onClick={close}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-base font-light text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
              aria-label="Tutup pencarian"
            >
              &#10005;
            </button>
          </div>
        </div>

        {/* Live Search Input Form: Clean, Open, Minimalist Luxury */}
        <form onSubmit={handleSubmit} className="px-4 sm:px-8 pt-5 pb-4 bg-white border-b border-[#E2DFD8] shrink-0">
          <div className="relative flex items-center border-b border-[#111111] focus-within:border-[#C5A059] transition-colors pb-2.5">
            <svg
              className="w-5 h-5 text-[#9E7D3B] shrink-0 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              ref={inputRef}
              type="search"
              name="q"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Cari luxury series, premium series, tenun dobby, kemeja pria..."
              className="w-full text-base sm:text-xl font-serif text-[#111111] placeholder-[#A69F96] bg-transparent outline-none tracking-wide"
              autoComplete="off"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[10px] uppercase tracking-[0.16em] text-[#888888] hover:text-[#111111] px-2 py-1 cursor-pointer mr-2 transition-colors"
              >
                Hapus
              </button>
            )}

            <button
              type="submit"
              className="px-5 sm:px-7 py-2.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-bold tracking-[0.2em] transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              CARI
            </button>
          </div>

          {/* Trending Keywords Strip: Whispered Editorial Tags */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-[10px]">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-bold whitespace-nowrap">
              TREN:
            </span>
            <div className="flex items-center gap-2.5 whitespace-nowrap text-[#5A5550]">
              {TRENDING_KEYWORDS.map((kw, idx) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleSelectKeyword(kw)}
                  className="hover:text-[#111111] transition-colors cursor-pointer text-[10px] tracking-wide"
                >
                  {kw}
                  {idx < TRENDING_KEYWORDS.length - 1 && (
                    <span className="ml-2.5 text-[#E2DFD8]">&bull;</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Minimalist Tabbed Navigation Bar (Visible when user has typed) */}
        {hasTypedQuery && total > 0 && (
          <div className="px-4 sm:px-8 bg-white border-b border-[#E2DFD8] flex items-center gap-6 overflow-x-auto scrollbar-none shrink-0 text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`py-3 transition-colors cursor-pointer relative ${
                activeTab === 'all'
                  ? 'text-[#111111] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#111111]'
                  : 'text-[#777777] hover:text-[#111111]'
              }`}
            >
              Semua ({total})
            </button>

            {products.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`py-3 transition-colors cursor-pointer relative ${
                  activeTab === 'products'
                    ? 'text-[#111111] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#111111]'
                    : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                Busana
              </button>
            )}

            {collections.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('collections')}
                className={`py-3 transition-colors cursor-pointer relative ${
                  activeTab === 'collections'
                    ? 'text-[#111111] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#111111]'
                    : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                Koleksi
              </button>
            )}

            {tags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('tags')}
                className={`py-3 transition-colors cursor-pointer relative ${
                  activeTab === 'tags'
                    ? 'text-[#111111] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#111111]'
                    : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                Tag
              </button>
            )}

            {articles.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('articles')}
                className={`py-3 transition-colors cursor-pointer relative ${
                  activeTab === 'articles'
                    ? 'text-[#111111] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#111111]'
                    : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                Warta
              </button>
            )}
          </div>
        )}

        {/* Scrollable Results & Recommendations Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#FAF8F5]">
          
          {/* Loading State */}
          {isLoading && (
            <div className="py-14 text-center">
              <span className="inline-block w-6 h-6 border-2 border-[#C5A059] border-t-transparent animate-spin mb-3" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#5A5550]">
                Mencari kurasi karya butik...
              </p>
            </div>
          )}

          {/* 1. INITIAL CURATED RECOMMENDATIONS (When input is empty) */}
          {!hasTypedQuery && !isLoading && (
            <div>
              <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2.5 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#111111]">
                    REKOMENDASI KARYA TERLARIS
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#888888]">
                  Kurasi Butik Batik Smile
                </span>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
                  {products.slice(0, 8).map((product) => {
                    const price = product?.selectedOrFirstAvailableVariant?.price;
                    const image = product?.selectedOrFirstAvailableVariant?.image;

                    return (
                      <div key={product.id} className="group relative flex flex-col justify-between h-full bg-transparent">
                        {/* Frameless 4:5 Portrait Image */}
                        <Link
                          to={`/products/${product.handle}`}
                          onClick={close}
                          className="relative block w-full aspect-[4/5] overflow-hidden bg-[#EFECE6]"
                        >
                          {image ? (
                            <Image
                              data={image}
                              alt={image.altText || product.title}
                              aspectRatio="4/5"
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-[#A69F96]">
                              Batik Smile
                            </div>
                          )}

                          {/* Slide-up Minimal Action Bar */}
                          <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/65 via-black/25 to-transparent">
                            <div className="w-full py-2 px-2 text-[9px] font-bold uppercase tracking-[0.2em] text-center bg-[#111111] text-white hover:bg-[#C5A059] hover:text-[#111111] transition-colors shadow-sm">
                              LIHAT DETAIL
                            </div>
                          </div>
                        </Link>

                        {/* Minimalist Editorial Metadata */}
                        <div className="pt-3 pb-1 flex flex-col flex-grow justify-between text-center items-center">
                          <div>
                            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#7C3F1D] font-semibold block mb-0.5">
                              BATIK SMILE
                            </span>
                            <Link
                              to={`/products/${product.handle}`}
                              onClick={close}
                              className="font-serif text-xs sm:text-sm text-[#111111] group-hover:text-[#9E7D3B] line-clamp-2 leading-snug transition-colors"
                            >
                              {product.title}
                            </Link>
                          </div>
                          <div className="mt-1.5 text-center">
                            <span className="text-[11px] sm:text-xs font-semibold text-[#111111] tracking-wide">
                              {price ? formatRupiah(price) : (price && <Money data={price} withoutTrailingZeros as="span" />)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-[#777777] text-center py-8">
                  Ketik nama motif atau busana untuk menemukan karya idaman Anda.
                </p>
              )}
            </div>
          )}

          {/* 2. NO RESULTS STATE */}
          {hasTypedQuery && !isLoading && total === 0 && (
            <div className="py-14 text-center max-w-md mx-auto">
              <div className="w-12 h-12 mx-auto mb-4 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="font-serif text-xl text-[#111111] mb-1.5 font-normal">
                Karya Belum Ditemukan
              </h4>
              <p className="text-xs text-[#5A5550] font-light mb-6 leading-relaxed">
                Tidak ada busana atau artikel yang cocok dengan &ldquo;{searchTerm}&rdquo;. Silakan eksplorasi kata kunci rekomendasi butik:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {TRENDING_KEYWORDS.slice(0, 5).map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleSelectKeyword(kw)}
                    className="px-3.5 py-1.5 bg-white text-[10px] uppercase tracking-[0.14em] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer border border-[#E2DFD8]/60"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. LIVE SEARCH RESULTS IN-MODAL */}
          {hasTypedQuery && !isLoading && total > 0 && (
            <div className="space-y-8">
              
              {/* Output 1: Koleksi Butik Terkait */}
              {showCollections && (
                <div>
                  <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                      <span className="text-xs uppercase tracking-[0.22em] text-[#9E7D3B] font-bold">
                        KOLEKSI BUTIK TERKAIT
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888888]">
                      Kategori Resmi
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {collections.map((col) => (
                      <Link
                        key={col.id}
                        to={`/collections/${col.handle}`}
                        onClick={close}
                        className="p-3.5 bg-white hover:bg-[#F4EFEA] transition-colors flex items-center justify-between group shadow-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {col.image?.url ? (
                            <div className="w-11 h-11 aspect-square shrink-0 overflow-hidden bg-[#FAF8F5]">
                              <img
                                src={col.image.url}
                                alt={col.image.altText || col.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="w-11 h-11 shrink-0 bg-[#F4EFEA] flex items-center justify-center text-[#9E7D3B] text-xs">
                              ❖
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block">
                              KOLEKSI RESMI
                            </span>
                            <span className="text-sm font-serif text-[#111111] group-hover:text-[#9E7D3B] transition-colors truncate block">
                              {col.title}
                            </span>
                          </div>
                        </div>
                        <span className="text-[#C5A059] text-xs font-serif shrink-0 ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Output 2: Tag Busana Terkait */}
              {showTags && (
                <div>
                  <div className="border-b border-[#E2DFD8] pb-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#9E7D3B]">
                      TAG BUSANA
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleSelectKeyword(tag)}
                        className="px-3.5 py-1.5 bg-white hover:bg-[#111111] text-[#5A5550] hover:text-white text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Output 3: Busana & Produk (Frameless Clean Minimalist Luxury) */}
              {showProducts && (
                <div>
                  <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                      <span className="text-xs uppercase tracking-[0.22em] text-[#9E7D3B] font-bold">
                        BUSANA &amp; KARYA
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888888]">
                      Koleksi Pilihan
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
                    {products.map((product) => {
                      const price = product?.selectedOrFirstAvailableVariant?.price;
                      const image = product?.selectedOrFirstAvailableVariant?.image;

                      return (
                        <div key={product.id} className="group relative flex flex-col justify-between h-full bg-transparent">
                          {/* Frameless 4:5 Portrait Image Container */}
                          <Link
                            to={`/products/${product.handle}`}
                            onClick={close}
                            className="relative block w-full aspect-[4/5] overflow-hidden bg-[#EFECE6]"
                          >
                            {image ? (
                              <Image
                                data={image}
                                alt={image.altText || product.title}
                                aspectRatio="4/5"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-[#A69F96]">
                                Batik Smile
                              </div>
                            )}

                            {/* Minimalist Hover Quick View Action */}
                            <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/65 via-black/25 to-transparent">
                              <div className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-[0.2em] text-center bg-[#111111] text-white hover:bg-[#C5A059] hover:text-[#111111] transition-colors shadow-sm">
                                LIHAT DETAIL
                              </div>
                            </div>
                          </Link>

                          {/* Editorial Typography Metadata */}
                          <div className="pt-3.5 pb-1 flex flex-col flex-grow justify-between text-center items-center">
                            <div>
                              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#7C3F1D] font-semibold block mb-1">
                                BATIK SMILE
                              </span>
                              <Link
                                to={`/products/${product.handle}`}
                                onClick={close}
                                className="font-serif text-sm sm:text-base text-[#111111] group-hover:text-[#9E7D3B] line-clamp-2 leading-snug transition-colors"
                              >
                                {product.title}
                              </Link>
                            </div>
                            <div className="mt-2 text-center">
                              <span className="text-sm sm:text-base font-semibold text-[#111111] tracking-wide">
                                {price ? formatRupiah(price) : (price && <Money data={price} withoutTrailingZeros as="span" />)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Output 4: Warta & Jurnal Budaya */}
              {showArticles && (
                <div>
                  <div className="border-b border-[#E2DFD8] pb-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#9E7D3B]">
                      WARTA &amp; JURNAL BUDAYA
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {articles.map((art) => (
                      <Link
                        key={art.id}
                        to={`/blogs/${art.blog?.handle || 'news'}/${art.handle}`}
                        onClick={close}
                        className="p-3.5 bg-white hover:bg-[#F4EFEA] transition-colors flex items-center justify-between group"
                      >
                        <span className="text-xs font-serif text-[#111111] group-hover:text-[#9E7D3B] line-clamp-1">
                          {art.title}
                        </span>
                        <span className="text-[#C5A059] text-xs group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Quiet Luxury Footer Status Bar */}
        <div className="px-4 sm:px-8 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-[#E2DFD8] flex items-center justify-between text-[10px] text-[#777777] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <span>Butik Resmi Semarang &bull; Sejak 2007</span>
          </div>
          <span className="hidden sm:inline text-[#9E7D3B] font-medium">
            Pilih busana untuk melihat detail bahan &amp; ukuran
          </span>
        </div>

      </div>
    </div>
  );
}
