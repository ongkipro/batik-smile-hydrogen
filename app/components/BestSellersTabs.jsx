import React, { useState } from 'react';
import { Link } from 'react-router';
import { ProductItem } from './ProductItem';

/**
 * BestSellersTabs: Engrasia / Prestige 9.3.0 Category Switcher
 * Switch between WOMEN, MEN, and SARIMBIT collections with 4:5 portrait cards
 *
 * @param {{
 *   womenProducts?: any[];
 *   menProducts?: any[];
 *   sarimbitProducts?: any[];
 * }} props
 */
export function BestSellersTabs({
  womenProducts = [],
  menProducts = [],
  sarimbitProducts = [],
}) {
  const [activeTab, setActiveTab] = useState('women');

  const tabs = [
    {
      id: 'women',
      label: 'WOMEN',
      products: womenProducts,
      viewAllLink: '/collections/batik-wanita',
    },
    {
      id: 'men',
      label: 'MEN',
      products: menProducts,
      viewAllLink: '/collections/batik-pria',
    },
    {
      id: 'sarimbit',
      label: 'SARIMBIT',
      products: sarimbitProducts,
      viewAllLink: '/collections/sarimbit-exclusive',
    },
  ];

  const currentTabData = tabs.find((t) => t.id === activeTab) || tabs[0];
  const displayProducts = (currentTabData.products || []).slice(0, 4);

  return (
    <section id="best-sellers" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-wide font-normal mb-6">
            Koleksi Busana Terlaris
          </h2>

          {/* Tabbed Category Switcher */}
          <div className="inline-flex items-center gap-1 pb-px">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 sm:px-8 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-all relative cursor-pointer ${
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {displayProducts.map((product, idx) => (
              <ProductItem
                key={product.id || idx}
                product={product}
                loading={idx < 2 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#E2DFD8] bg-white">
            <p className="text-xs tracking-wider uppercase text-[#5A5550]">
              Memuat koleksi kurasi butik...
            </p>
          </div>
        )}

        {/* View All Collection Link */}
        <div className="text-center mt-12 sm:mt-16">
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
