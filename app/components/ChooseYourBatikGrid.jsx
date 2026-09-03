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
  const displayProducts = (products || []).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FFFFFF] border-b border-[#E2DFD8]">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#7C3F1D] font-semibold block mb-2">
            LEMBARAN KAIN BATIK TULIS ASLI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-wide font-normal">
            CHOOSE YOUR BATIK
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] max-w-xl mx-auto font-light leading-relaxed">
            Pilih mahakarya kain tulis sutra atau katun primisima. Anda dapat membeli lembaran kainnya
            saja atau memanfaatkan layanan jahit bespoke butik Batik Smile tanpa batasan minimal order.
          </p>
        </div>

        {/* Dual Commercial Pathway Banner Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 bg-[#FAF8F5] border border-[#E2DFD8] p-6">
          <div className="flex items-start gap-4 pr-4 border-b md:border-b-0 md:border-r border-[#E2DFD8] pb-4 md:pb-0">
            <span className="text-[#C5A059] text-xl font-serif">01.</span>
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#111111] mb-1">
                BELI KAIN LEMBARAN
              </h3>
              <p className="text-[11px] text-[#5A5550] leading-relaxed">
                Koleksi lembaran kain tulis eksklusif siap dikirim dengan kotak kemasan kayu aman &amp; sertifikat keaslian.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pl-0 md:pl-4">
            <span className="text-[#C5A059] text-xl font-serif">02.</span>
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#111111] mb-1">
                TAMBAH JASA BESPOKE TAILORING
              </h3>
              <p className="text-[11px] text-[#5A5550] leading-relaxed">
                Kirim ukuran lingkar dada &amp; panjang baju via WhatsApp Concierge untuk dijahit presisi dengan furing katun hero adem.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Raw Fabric Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {displayProducts.map((product, idx) => (
              <ProductItem
                key={product.id || idx}
                product={product}
                loading="lazy"
                badge="Kain Tulis Asli"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#E2DFD8] bg-[#FAF8F5]">
            <p className="text-xs tracking-wider uppercase text-[#5A5550]">
              Memuat galeri kain batik tulis...
            </p>
          </div>
        )}

        {/* Footer Link */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/collections/jarik-kain-batik"
            className="inline-block px-10 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.2em] transition-colors duration-300 shadow-sm"
          >
            LIHAT SEMUA KAIN BATIK TULIS &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
