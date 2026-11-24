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
    <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
            KURASI KARYA TERANYAR
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-wide font-normal mb-3 leading-tight">
            Koleksi Terbaru
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] max-w-xl mx-auto font-light leading-relaxed">
            Eksplorasi pilihan kain batik tulis, tenun tradisional Troso, kemeja pria, dan busana etnik terbaru siap pakai dengan standar mutu butik resmi.
          </p>
        </div>

        {/* 4-Column / 8-Product Showcase Grid (2 Rows of 4 Cards) */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12">
            {displayProducts.map((product, idx) => (
              <ProductItem
                key={product.id || idx}
                product={product}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-[#E2DFD8] bg-white">
            <p className="text-xs tracking-wider uppercase text-[#5A5550]">
              Memuat koleksi produk terbaru...
            </p>
          </div>
        )}

        {/* Footer Link */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/collections/all"
            className="inline-block px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-xs uppercase font-semibold tracking-[0.2em] transition-colors duration-300 shadow-sm"
          >
            LIHAT SEMUA KOLEKSI &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
