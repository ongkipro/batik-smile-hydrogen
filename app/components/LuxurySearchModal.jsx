import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useFetcher } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { formatRupiah } from '~/lib/currency';

export const SEARCH_ENDPOINT = '/search';

const TRENDING_KEYWORDS = [
  'Daster Batik Solo',
  'Sarimbit Mahakarya',
  'Kemeja Furing Hero',
  'Batik Wanita Sutra',
  'Kain Batik Tulis',
  'Tenun Dobby',
  'Batik Adat Anak',
];

/**
 * LuxurySearchModal: Quiet Luxury Live In-Modal Search Engine
 * - Pure In-Modal Instant Search (Zero redirects to /search page).
 * - Real-time debounced search (250ms) + instant Enter/Button find.
 * - Comprehensive output: Produk, Koleksi Butik, Tag Busana, dan Warta.
 * - Tabbed filtering: Semua, Busana, Koleksi, Tag, Warta.
 * - Strict 4:5 vertical portrait product imagery.
 * - Mobile full-screen responsive + Desktop centered luxury dialog.
 * - Zero-radius architecture with quiet luxury design tokens.
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
          { method: 'GET', action: SEARCH_ENDPOINT }
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
      { method: 'GET', action: SEARCH_ENDPOINT }
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
      {/* Darkened Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={close}
        aria-hidden="true"
      />

      {/* Main Container: Mobile Full-Screen / Desktop Centered Luxury Dialog */}
      <div className="relative z-10 w-full lg:max-w-4xl xl:max-w-5xl lg:mt-6 lg:mb-6 bg-[#FAF8F5] border-0 lg:border lg:border-[#E2DFD8] shadow-2xl flex flex-col h-full lg:h-[88vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-[#E2DFD8] bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#111111]">
              PENCARIAN BUTIK NUSANTARA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.2em] text-[#888888]">
              [ESC] TUTUP
            </span>
            <button
              type="button"
              onClick={close}
              className="w-8 h-8 flex items-center justify-center text-sm font-light text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer"
              aria-label="Tutup pencarian"
            >
              &#10005;
            </button>
          </div>
        </div>

        {/* Live Search Input Form (Zero-Box, Hairline Underline) */}
        <form onSubmit={handleSubmit} className="px-4 sm:px-8 pt-4 pb-3 bg-white border-b border-[#E2DFD8] shrink-0">
          <div className="relative flex items-center border-b border-[#111111] focus-within:border-[#C5A059] transition-colors pb-2">
            <svg
              className="w-5 h-5 text-[#9E7D3B] shrink-0 mr-2.5"
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
              placeholder="Cari daster, sarimbit, kemeja pria, kain..."
              className="w-full text-base sm:text-lg font-serif text-[#111111] placeholder-[#A69F96] bg-transparent outline-none tracking-wide"
              autoComplete="off"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#888888] hover:text-[#111111] px-2 py-1 cursor-pointer mr-1"
              >
                Hapus
              </button>
            )}

            <button
              type="submit"
              className="px-3.5 sm:px-5 py-2 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[9px] sm:text-[10px] uppercase font-semibold tracking-[0.18em] transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              CARI
            </button>
          </div>

          {/* Trending Keywords Strip */}
          <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
            <span className="text-[9px] uppercase tracking-widest text-[#9E7D3B] font-semibold whitespace-nowrap">
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
                    <span className="ml-2.5 text-[#E2DFD8]">•</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* In-Modal Filter Tabs (Active when user has typed) */}
        {hasTypedQuery && total > 0 && (
          <div className="px-4 sm:px-8 py-2 bg-[#FAF8F5] border-b border-[#E2DFD8] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 text-[10px] uppercase tracking-[0.16em]">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 transition-colors cursor-pointer border ${
                activeTab === 'all'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#5A5550] border-[#E2DFD8] hover:text-[#111111]'
              }`}
            >
              Semua ({total})
            </button>

            {products.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1 transition-colors cursor-pointer border ${
                  activeTab === 'products'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#5A5550] border-[#E2DFD8] hover:text-[#111111]'
                }`}
              >
                Busana ({products.length})
              </button>
            )}

            {collections.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('collections')}
                className={`px-3 py-1 transition-colors cursor-pointer border ${
                  activeTab === 'collections'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#5A5550] border-[#E2DFD8] hover:text-[#111111]'
                }`}
              >
                Koleksi ({collections.length})
              </button>
            )}

            {tags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('tags')}
                className={`px-3 py-1 transition-colors cursor-pointer border ${
                  activeTab === 'tags'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#5A5550] border-[#E2DFD8] hover:text-[#111111]'
                }`}
              >
                Tag ({tags.length})
              </button>
            )}

            {articles.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('articles')}
                className={`px-3 py-1 transition-colors cursor-pointer border ${
                  activeTab === 'articles'
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-white text-[#5A5550] border-[#E2DFD8] hover:text-[#111111]'
                }`}
              >
                Warta ({articles.length})
              </button>
            )}
          </div>
        )}

        {/* Scrollable Results & Recommendations Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 bg-[#FAF8F5]">
          
          {/* Loading Indicator */}
          {isLoading && (
            <div className="py-10 text-center">
              <span className="inline-block w-5 h-5 border-2 border-[#C5A059] border-t-transparent animate-spin mb-2" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#5A5550]">
                Mencari mahakarya wastra...
              </p>
            </div>
          )}

          {/* 1. INITIAL STATE: Curated Recommendations when search input is empty */}
          {!hasTypedQuery && !isLoading && (
            <div>
              <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]">
                    REKOMENDASI KARYA POPULER
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#888888]">
                  Koleksi Pilihan Butik
                </span>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {products.slice(0, 8).map((product) => {
                    const price = product?.selectedOrFirstAvailableVariant?.price;
                    const image = product?.selectedOrFirstAvailableVariant?.image;

                    return (
                      <Link
                        key={product.id}
                        to={`/products/${product.handle}`}
                        onClick={close}
                        className="group bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all p-2.5 block"
                      >
                        <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden mb-2">
                          {image ? (
                            <Image
                              data={image}
                              alt={image.altText || product.title}
                              aspectRatio="4/5"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-[#A69F96]">
                              Batik Smile
                            </div>
                          )}
                        </div>
                        <span className="text-[8px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-0.5">
                          BATIK SMILE
                        </span>
                        <h5 className="font-serif text-xs text-[#111111] group-hover:text-[#C5A059] line-clamp-2 leading-snug transition-colors">
                          {product.title}
                        </h5>
                        <div className="mt-1 text-[11px] font-semibold text-[#111111]">
                          {price ? formatRupiah(price) : (price && <Money data={price} withoutTrailingZeros as="span" />)}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-[#777777] text-center py-6">
                  Ketik nama motif atau busana untuk menemukan karya idaman Anda.
                </p>
              )}
            </div>
          )}

          {/* 2. NO RESULTS STATE: When user typed query but 0 items found */}
          {hasTypedQuery && !isLoading && total === 0 && (
            <div className="py-12 text-center max-w-md mx-auto">
              <div className="w-10 h-10 mx-auto mb-3 border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="font-serif text-lg text-[#111111] mb-1">
                Karya Belum Ditemukan
              </h4>
              <p className="text-xs text-[#5A5550] font-light mb-6 leading-relaxed">
                Tidak ada busana yang cocok dengan kata kunci &ldquo;{searchTerm}&rdquo;. Silakan coba motif lain atau pilih kata kunci rekomendasi:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {TRENDING_KEYWORDS.slice(0, 4).map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleSelectKeyword(kw)}
                    className="px-3 py-1.5 bg-white border border-[#E2DFD8] hover:border-[#C5A059] text-[10px] uppercase tracking-wider text-[#111111] hover:text-[#9E7D3B] transition-colors cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. LIVE SEARCH RESULTS IN-MODAL (Never Navigates Away) */}
          {hasTypedQuery && !isLoading && total > 0 && (
            <div className="space-y-6">
              
              {/* Output 1: Koleksi Butik Terkait (Collections) */}
              {showCollections && (
                <div>
                  <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7D3B]">
                        KOLEKSI BUTIK TERKAIT ({collections.length})
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-[#888888]">
                      Kategori Resmi
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {collections.map((col) => (
                      <Link
                        key={col.id}
                        to={`/collections/${col.handle}`}
                        onClick={close}
                        className="p-3 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all flex items-center justify-between group shadow-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {col.image?.url ? (
                            <div className="w-10 h-10 aspect-square shrink-0 overflow-hidden bg-[#FAF8F5] border border-[#E2DFD8]">
                              <img
                                src={col.image.url}
                                alt={col.image.altText || col.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 shrink-0 bg-[#FAF8F5] border border-[#E2DFD8] flex items-center justify-center text-[#9E7D3B] text-xs">
                              ❖
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="text-[8px] uppercase tracking-[0.18em] text-[#9E7D3B] font-semibold block">
                              KOLEKSI
                            </span>
                            <span className="text-xs font-serif text-[#111111] group-hover:text-[#9E7D3B] transition-colors truncate block">
                              {col.title}
                            </span>
                          </div>
                        </div>
                        <span className="text-[#C5A059] text-xs font-serif shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Output 2: Tag Busana Terkait (Tags jika ada) */}
              {showTags && (
                <div>
                  <div className="border-b border-[#E2DFD8] pb-1.5 mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7D3B]">
                      TAG BUSANA ({tags.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleSelectKeyword(tag)}
                        className="px-3 py-1 bg-white border border-[#E2DFD8] hover:border-[#C5A059] text-[10px] uppercase tracking-wider text-[#111111] hover:text-[#9E7D3B] transition-colors cursor-pointer"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Output 3: Busana & Produk Pilihan (Products with 4:5 vertical portrait) */}
              {showProducts && (
                <div>
                  <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7D3B]">
                        BUSANA &amp; PRODUK ({products.length})
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-[#888888]">
                      Hasil Langsung Butik
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {products.map((product) => {
                      const price = product?.selectedOrFirstAvailableVariant?.price;
                      const image = product?.selectedOrFirstAvailableVariant?.image;

                      return (
                        <Link
                          key={product.id}
                          to={`/products/${product.handle}`}
                          onClick={close}
                          className="group bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all p-2.5 block"
                        >
                          <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden mb-2">
                            {image ? (
                              <Image
                                data={image}
                                alt={image.altText || product.title}
                                aspectRatio="4/5"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-[#A69F96]">
                                Batik Smile
                              </div>
                            )}
                          </div>
                          <span className="text-[8px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block mb-0.5">
                            BATIK SMILE
                          </span>
                          <h5 className="font-serif text-xs text-[#111111] group-hover:text-[#C5A059] line-clamp-2 leading-snug transition-colors">
                            {product.title}
                          </h5>
                          <div className="mt-1 text-[11px] font-semibold text-[#111111]">
                            {price ? formatRupiah(price) : (price && <Money data={price} withoutTrailingZeros as="span" />)}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Output 4: Warta & Jurnal Budaya (Articles) */}
              {showArticles && (
                <div>
                  <div className="border-b border-[#E2DFD8] pb-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7D3B]">
                      WARTA &amp; JURNAL BUDAYA ({articles.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {articles.map((art) => (
                      <Link
                        key={art.id}
                        to={`/blogs/${art.blog?.handle || 'news'}/${art.handle}`}
                        onClick={close}
                        className="p-3 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors flex items-center justify-between group"
                      >
                        <span className="text-xs font-serif text-[#111111] group-hover:text-[#9E7D3B] line-clamp-1">
                          {art.title}
                        </span>
                        <span className="text-[#C5A059] text-xs">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Quiet Luxury Footer Status Bar */}
        <div className="px-4 sm:px-8 py-2.5 bg-white border-t border-[#E2DFD8] flex items-center justify-between text-[10px] text-[#777777] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C5A059]" />
            <span>Butik Resmi Semarang • 100% Wastra Nusantara</span>
          </div>
          <span className="hidden sm:inline">
            Klik busana atau koleksi untuk eksplorasi langsung
          </span>
        </div>

      </div>
    </div>
  );
}
