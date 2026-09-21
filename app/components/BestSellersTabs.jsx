import React, { useState } from 'react';
import { Link } from 'react-router';
import { ProductItem } from './ProductItem';

/**
 * BestSellersTabs: Quiet Luxury Category Switcher
 * Switch between WANITA, PRIA, and ANAK collections with 4:5 portrait cards
 *
 * @param {{
 *   womenProducts?: any[];
 *   menProducts?: any[];
 *   anakProducts?: any[];
 *   sarimbitProducts?: any[];
 * }} props
 */
export function BestSellersTabs({
  womenProducts = [],
  menProducts = [],
  anakProducts = [],
  sarimbitProducts = [],
}) {
  const [activeTab, setActiveTab] = useState('wanita');

  const tabs = [
    {
      id: 'wanita',
      label: 'WANITA',
      products: womenProducts,
      viewAllLink: '/collections/all?gender=wanita',
    },
    {
      id: 'pria',
      label: 'PRIA',
      products: menProducts,
      viewAllLink: '/collections/all?gender=pria',
    },
    {
      id: 'anak',
      label: 'ANAK',
      products: anakProducts.length > 0 ? anakProducts : sarimbitProducts,
      viewAllLink: '/collections/batik-anak',
    },
  ];

  const currentTabData = tabs.find((t) => t.id === activeTab) || tabs[0];
  const displayProducts = (currentTabData.products || []).slice(0, 4);

  return (
    <section id="best-sellers" className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-wide font-normal mb-4">
            Koleksi Busana Terlaris
          </h2>

          {/* Tabbed Category Switcher (Wanita | Pria | Anak) */}
          <div className="inline-flex items-center gap-1 pb-px">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 sm:px-8 py-3 min-h-[44px] inline-flex items-center justify-center text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#5A5550] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#111111]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4:5 Product Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12">
            {displayProducts.map((product, idx) => (
              <ProductItem
                key={product.id || idx}
                product={product}
                loading={idx < 2 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-[#E2DFD8] bg-white">
            <p className="text-xs tracking-wider uppercase text-[#5A5550]">
              Memuat koleksi kurasi butik...
            </p>
          </div>
        )}

        {/* View All Collection Link */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            to={currentTabData.viewAllLink}
            className="inline-block px-10 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.2em] transition-colors duration-300 shadow-sm"
          >
            LIHAT SEMUA KOLEKSI {currentTabData.label} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
