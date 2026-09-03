import React from 'react';
import { Link } from 'react-router';
import { ProductItem } from './ProductItem';

/**
 * ChooseYourBatikGrid: Engrasia / Haute Artistry Archetype
 * "CHOOSE YOUR BATIK" 4-column raw fabric showcase with dual commercial pathways
 *
 * @param {{
 *   products?: any[];
 * }} props
 */
export function ChooseYourBatikGrid({ products = [] }) {
  const displayProducts = (products || []).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FFFFFF] border-b border-[#E2DFD8]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#7C3F1D] font-semibold block mb-2">
            LEMBARAN KAIN &amp; KOLEKSI TERBARU
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-wide font-normal">
            CHOOSE YOUR BATIK &amp; NEW ARRIVALS
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] max-w-xl mx-auto font-light leading-relaxed">
            Eksplorasi pilihan kain batik tulis, tenun tradisional Troso, kemeja pria, dan busana etnik terbaru. Anda dapat membeli busana siap pakai atau memanfaatkan layanan jahit bespoke butik Batik Smile tanpa batasan minimal order.
          </p>
        </div>


        {/* 4-Column / 8-Product Showcase Grid (2 Rows of 4 Cards) */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {displayProducts.map((product, idx) => (
              <ProductItem
                key={product.id || idx}
                product={product}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#E2DFD8] bg-[#FAF8F5]">
            <p className="text-xs tracking-wider uppercase text-[#5A5550]">
              Memuat koleksi produk terbaru...
            </p>
          </div>
        )}

        {/* Footer Link */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/collections/all"
            className="inline-block px-10 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.2em] transition-colors duration-300 shadow-sm"
          >
            LIHAT SEMUA KOLEKSI TERBARU &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
