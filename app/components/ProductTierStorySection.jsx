import React from 'react';

/**
 * ProductTierStorySection
 * 2-Column Bespoke Editorial Differentiation Section (Frameless)
 * Exclusively rendered for Luxury Series & Premium Series
 *
 * @param {{
 *   tier: 'exclusive' | 'premium' | 'standard';
 *   productTitle: string;
 * }} props
 */
export function ProductTierStorySection({ tier, productTitle }) {
  if (tier !== 'exclusive' && tier !== 'premium') {
    return null;
  }

  const isExclusive = tier === 'exclusive';

  return (
    <section
      aria-label="Keistimewaan Karya Butik"
      className={`mt-16 sm:mt-24 pt-12 sm:pt-16 border-t ${
        isExclusive
          ? 'border-[#262626] text-white'
          : 'border-[#7C3F1D]/40 text-[#FAF8F5]'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Column 1: 4:5 Vertical Editorial Image (Zero-frame) */}
        <div className="lg:col-span-5 relative group overflow-hidden">
          <div
            className={`aspect-[4/5] w-full relative overflow-hidden ${
              isExclusive ? 'bg-[#181818]' : 'bg-[#281C14]'
            }`}
          >
            <img
              src={
                isExclusive
                  ? '/banners/craftsmanship_canting_banner.jpg'
                  : '/banners/sarimbit_family_banner.jpg'
              }
              alt={
                isExclusive
                  ? 'Proses Pembatikan Canting Prada Emas Sutra ATBM'
                  : 'Harmoni Keluarga Busana Premium Series Dobby'
              }
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Corner Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] font-semibold text-white/90">
              <span className="bg-black/80 px-2.5 py-1 border border-white/20">
                {isExclusive ? 'MAHAKARYA 1-OF-1' : 'STANDAR BUTIK KELUARGA'}
              </span>
              <span className="text-[#C5A059] font-serif tracking-widest">
                {isExclusive ? 'SUTRA ATBM' : 'TENUN DOBBY'}
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Narrative Storytelling & Technical Differentiation */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow */}
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] font-bold block mb-2 text-[#C5A059]"
          >
            {isExclusive
              ? 'DIFERENSIASI KASTA TERTINGGI • LUXURY SERIES'
              : 'STANDAR RESEPSI RESMI • PREMIUM SERIES'}
          </span>

          {/* Heading */}
          <h3
            className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-snug tracking-wide mb-3 text-white"
          >
            {isExclusive
              ? 'Keagungan Sutra ATBM & Sentuhan Prada Emas Maestro'
              : 'Pilihan Bahan Berkualitas & Opsi Lapisan Trikot'}
          </h3>

          <div
            className={`w-12 h-px my-3.5 ${
              isExclusive ? 'bg-[#C5A059]' : 'bg-[#7C3F1D]'
            }`}
          />

          {/* Lead Paragraph */}
          <p
            className={`text-xs sm:text-sm font-light leading-relaxed mb-6 ${
              isExclusive ? 'text-[#E2DFD8]/85' : 'text-[#D5C8B8]'
            }`}
          >
            {isExclusive
              ? `Karya "${productTitle}" diciptakan khusus untuk momen sakral resepsi, akad pernikahan, dan perayaan agung keluarga. Ditenun secara manual menggunakan Alat Tenun Bukan Mesin (ATBM) dari serat sutra mulberry murni yang memancarkan kilau ningrat alami, berbobot anggun, dan bernapas sejuk di badan.`
              : 'Koleksi batik dengan pilihan bahan berkualitas yang menghadirkan kenyamanan dan tampilan elegan. Tersedia dengan opsi lapisan trikot untuk memberikan struktur yang lebih rapi dan kokoh, sesuai kebutuhan dan preferensi Anda.'}
          </p>

          {/* 3 Pillars of Distinction */}
          <div
            className={`space-y-4 pt-4 border-t ${
              isExclusive ? 'border-[#262626]' : 'border-[#7C3F1D]/40'
            }`}
          >
            {isExclusive ? (
              <>
                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Material &amp; Furing Trikot Premium
                    </h4>
                    <p className="text-[11px] font-light text-[#E2DFD8]/75 leading-relaxed mt-0.5">
                      Memadukan keindahan batik pilihan dengan furing trikot berkualitas tinggi yang sejuk, nyaman, dan berkelas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Jahitan Presisi Penjahit Teredukasi
                    </h4>
                    <p className="text-[11px] font-light text-[#E2DFD8]/75 leading-relaxed mt-0.5">
                      Dikerjakan dengan ketelitian tinggi oleh penjahit terampil dengan kerapian potongan dan sambung motif simetris.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Layanan Jahitan Sarimbit &amp; Seragam Bespoke
                    </h4>
                    <p className="text-[11px] font-light text-[#E2DFD8]/75 leading-relaxed mt-0.5">
                      Tersedia layanan jahitan kustom untuk busana sarimbit keluarga dan seragam instansi dengan penyesuaian ukuran presisi tanpa minimal order.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Pilihan Lapisan: Dengan Trikot
                    </h4>
                    <p className="text-[11px] font-light text-[#D5C8B8]/85 leading-relaxed mt-0.5">
                      Memberikan struktur yang lebih kokoh dan tampilan yang lebih rapi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Pilihan Lapisan: Tanpa Trikot
                    </h4>
                    <p className="text-[11px] font-light text-[#D5C8B8]/85 leading-relaxed mt-0.5">
                      Memberikan karakter bahan yang lebih ringan dan jatuh alami.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Layanan Jahitan Sarimbit &amp; Seragam
                    </h4>
                    <p className="text-[11px] font-light text-[#D5C8B8]/85 leading-relaxed mt-0.5">
                      Tersedia layanan jahitan butik untuk busana sarimbit keluarga dan seragam instansi/kantor tanpa batasan minimal order.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
