import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useFetcher } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { urlWithTrackingParams, getEmptyPredictiveSearchResult } from '~/lib/search';

export const SEARCH_ENDPOINT = '/search';

const POPULAR_KEYWORDS = [
  'Sarimbit Mahakarya',
  'Kemeja Furing Hero',
  'Batik Wanita Sutra',
  'Batik Anak Tradisional',
  'Kain Batik Tulis',
  'Tenun Troso',
  'Layanan Seragam',
];

/**
 * LuxurySearchModal: Quiet Luxury Search Experience
 * - Desktop: Command-palette / top modal overlay with responsive multi-column predictive results.
 * - Mobile: Seamless full-screen search view with instant trending tags and zero-radius cards.
 */
export function LuxurySearchModal() {
  const { type, close } = useAside();
  const isOpen = type === 'search';
  const navigate = useNavigate();
  const fetcher = useFetcher({ key: 'search' });
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-focus when opened & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);

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
      document.body.style.overflow = '';
      setSearchTerm('');
    }
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    void fetcher.submit(
      { q: value || '', limit: 6, predictive: true },
      { method: 'GET', action: SEARCH_ENDPOINT }
    );
  };

  const handleSelectKeyword = (keyword) => {
    setSearchTerm(keyword);
    if (inputRef.current) {
      inputRef.current.value = keyword;
      inputRef.current.focus();
    }
    void fetcher.submit(
      { q: keyword, limit: 6, predictive: true },
      { method: 'GET', action: SEARCH_ENDPOINT }
    );
  };

  const handleClear = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(searchTerm.trim())}`);
      close();
    }
  };

  const { items, total } = fetcher?.data?.result ?? getEmptyPredictiveSearchResult();
  const { products = [], collections = [], articles = [] } = items || {};
  const isLoading = fetcher.state === 'loading';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Mahasorot Butik Batik Smile"
      className="fixed inset-0 z-50 flex flex-col justify-start items-center"
    >
      {/* Darkened Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={close}
        aria-hidden="true"
      />

      {/* Main Search Container: Desktop Centered Overlay / Mobile Full-Screen */}
      <div className="relative z-10 w-full lg:max-w-4xl xl:max-w-5xl lg:mt-12 lg:mb-12 bg-[#FAF8F5] border-0 lg:border lg:border-[#C5A059]/40 shadow-2xl flex flex-col h-full lg:h-auto lg:max-h-[85vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[#E2DFD8] bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C5A059]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#111111]">
              PENCARIAN MAHASOROT NUSANTARA
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.2em] text-[#5A5550] bg-[#FAF8F5] px-2.5 py-1 border border-[#E2DFD8]">
              [ESC] TUTUP
            </span>
            <button
              type="button"
              onClick={close}
              className="p-1.5 text-[#111111] hover:text-[#C5A059] transition-colors cursor-pointer text-lg leading-none"
              aria-label="Tutup pencarian"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 bg-white border-b border-[#E2DFD8]">
          <div className="relative flex items-center border-b-2 border-[#111111] focus-within:border-[#C5A059] transition-colors pb-2">
            <svg
              className="w-6 h-6 text-[#C5A059] flex-shrink-0 mr-3"
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
              placeholder="Cari sarimbit, kemeja furing hero, tulis, motif..."
              className="w-full text-base sm:text-2xl font-serif text-[#111111] placeholder-[#A69F96] bg-transparent outline-none tracking-wide"
              autoComplete="off"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs uppercase tracking-wider text-[#5A5550] hover:text-[#111111] px-2 py-1 cursor-pointer mr-2"
              >
                HAPUS
              </button>
            )}

            <button
              type="submit"
              className="px-5 py-2 sm:py-2.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              CARI &rarr;
            </button>
          </div>

          {/* Quick Trending Keywords */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#5A5550] whitespace-nowrap">
              TREN PENCARIAN:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
              {POPULAR_KEYWORDS.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleSelectKeyword(kw)}
                  className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#111111] text-[#5A5550] hover:text-white border border-[#E2DFD8] hover:border-[#111111] transition-all cursor-pointer whitespace-nowrap"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Predictive Results Viewport */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#FAF8F5]">
          {isLoading && (
            <div className="py-12 text-center">
              <span className="inline-block w-6 h-6 border-2 border-[#C5A059] border-t-transparent animate-spin mb-3" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#5A5550]">
                Mencari mahakarya wastra...
              </p>
            </div>
          )}

          {!isLoading && searchTerm && total === 0 && (
            <div className="py-12 text-center max-w-md mx-auto">
              <span className="text-2xl block mb-2">🔍</span>
              <h4 className="font-serif text-lg text-[#111111] mb-1">
                Karya Belum Ditemukan
              </h4>
              <p className="text-xs text-[#5A5550] font-light mb-6 leading-relaxed">
                Tidak ada hasil yang sesuai dengan kata kunci &ldquo;{searchTerm}&rdquo;. Silakan coba motif lain atau telusuri koleksi populer kami di atas.
              </p>
              <button
                type="button"
                onClick={() => handleSelectKeyword('Sarimbit')}
                className="inline-block px-6 py-2.5 bg-[#111111] text-white text-[10px] uppercase tracking-[0.2em] font-semibold"
              >
                LIHAT SARIMBIT KELUARGA &rarr;
              </button>
            </div>
          )}

          {!isLoading && total > 0 && (
            <div className="space-y-8">
              {/* 1. Products Grid */}
              {products.length > 0 && (
                <div>
                  <div className="flex items-center justify-between border-b border-[#E2DFD8] pb-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7D3B]">
                      PRODUK PILIHAN ({products.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="text-[10px] uppercase tracking-wider text-[#5A5550] hover:text-[#111111]"
                    >
                      Lihat Semua &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {products.map((product) => {
                      const productUrl = urlWithTrackingParams({
                        baseUrl: `/products/${product.handle}`,
                        trackingParams: product.trackingParameters,
                        term: searchTerm,
                      });
                      const price = product?.selectedOrFirstAvailableVariant?.price;
                      const image = product?.selectedOrFirstAvailableVariant?.image;

                      return (
                        <Link
                          key={product.id}
                          to={productUrl}
                          onClick={close}
                          className="group bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-all p-2.5 block shadow-sm"
                        >
                          <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden mb-2.5">
                            {image ? (
                              <Image
                                data={image}
                                alt={image.altText || product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-[#A69F96]">
                                Foto Produk
                              </div>
                            )}
                          </div>
                          <h5 className="font-serif text-xs sm:text-sm text-[#111111] group-hover:text-[#9E7D3B] line-clamp-1 transition-colors">
                            {product.title}
                          </h5>
                          <div className="mt-1 text-[11px] font-semibold text-[#111111]">
                            {price && <Money data={price} />}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Collections Section */}
              {collections.length > 0 && (
                <div>
                  <div className="border-b border-[#E2DFD8] pb-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7D3B]">
                      KOLEKSI TERKAIT ({collections.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {collections.map((col) => {
                      const colUrl = urlWithTrackingParams({
                        baseUrl: `/collections/${col.handle}`,
                        trackingParams: col.trackingParameters,
                        term: searchTerm,
                      });
                      return (
                        <Link
                          key={col.id}
                          to={colUrl}
                          onClick={close}
                          className="px-4 py-2 bg-white border border-[#E2DFD8] hover:border-[#C5A059] text-[11px] uppercase tracking-wider text-[#111111] hover:text-[#9E7D3B] transition-colors flex items-center gap-2 shadow-sm"
                        >
                          <span>{col.title}</span>
                          <span className="text-[#C5A059]">&rarr;</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Cultural Articles Section */}
              {articles.length > 0 && (
                <div>
                  <div className="border-b border-[#E2DFD8] pb-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7D3B]">
                      JURNAL &amp; EDUKASI BUDAYA ({articles.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {articles.map((art) => {
                      const artUrl = urlWithTrackingParams({
                        baseUrl: `/blogs/${art.blog?.handle || 'news'}/${art.handle}`,
                        trackingParams: art.trackingParameters,
                        term: searchTerm,
                      });
                      return (
                        <Link
                          key={art.id}
                          to={artUrl}
                          onClick={close}
                          className="p-3 bg-white border border-[#E2DFD8] hover:border-[#C5A059] transition-colors flex items-center gap-3 shadow-sm group"
                        >
                          {art.image && (
                            <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-[#111111]">
                              <Image
                                data={art.image}
                                alt={art.title}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all"
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="text-[9px] uppercase tracking-widest text-[#9E7D3B] block mb-0.5">
                              JURNAL
                            </span>
                            <h6 className="text-xs font-serif text-[#111111] group-hover:text-[#9E7D3B] line-clamp-2 transition-colors">
                              {art.title}
                            </h6>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* View All Results Button */}
              <div className="pt-4 border-t border-[#E2DFD8] text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] uppercase font-semibold tracking-[0.2em] transition-colors shadow-sm cursor-pointer"
                >
                  LIHAT SEMUA {total} HASIL PENCARIAN &rarr;
                </button>
              </div>
            </div>
          )}

          {!searchTerm && (
            <div className="py-8 text-center text-[#5A5550]">
              <p className="text-xs uppercase tracking-[0.2em] font-light mb-2">
                Ketik kata kunci atau pilih salah satu tren pencarian di atas.
              </p>
              <p className="text-[11px] text-[#A69F96]">
                Eksplorasi sarimbit keluarga 3 kasta, kemeja batik pria berfuring hero, busana wanita, serta lembaran kain tulis asli.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
