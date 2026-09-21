import React from 'react';

/**
 * ProductTierStorySection
 * 2-Column Bespoke Editorial Differentiation Section (Frameless)
 * Exclusively rendered for Sarimbit Exclusive & Sarimbit Premium
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
                  : 'Harmoni Keluarga Busana Sarimbit Premium Dobby'
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
              ? 'DIFERENSIASI KASTA TERTINGGI • SARIMBIT EXCLUSIVE'
              : 'STANDAR RESEPSI RESMI • SARIMBIT PREMIUM'}
          </span>

          {/* Heading */}
          <h3
            className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-snug tracking-wide mb-3 text-white"
          >
            {isExclusive
              ? 'Keagungan Sutra ATBM & Sentuhan Prada Emas Maestro'
              : 'Ketahanan Tenun Dobby Timbul & Furing Hero Sejuk'}
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
              : `Koleksi "${productTitle}" dirancang khusus memenuhi tuntutan kenyamanan acara perhelatan formal dan resepsi keluarga besar seharian penuh. Menggunakan bahan tenun dobby berkarakter motif timbul yang kokoh, tidak menerawang, dan tetap rapi tanpa lecek saat duduk lama.`}
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
                      Batik Tulis Prada Emas Murni
                    </h4>
                    <p className="text-[11px] font-light text-[#E2DFD8]/75 leading-relaxed mt-0.5">
                      Aksen prada emas digoreskan teliti menggunakan canting oleh maestro Butik Simongan, memancarkan wibawa ningrat di pencahayaan ballroom resepsi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Presisi Sambung Pola 100% Simetris
                    </h4>
                    <p className="text-[11px] font-light text-[#E2DFD8]/75 leading-relaxed mt-0.5">
                      Setiap belahan kemeja pria dan gaun wanita dipotong simetris menyambung pada saku, kerah, dan dada tanpa ada motif pusaka yang terputus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Layanan VIP Bespoke Tailoring &amp; Fitting
                    </h4>
                    <p className="text-[11px] font-light text-[#E2DFD8]/75 leading-relaxed mt-0.5">
                      Kustomisasi lingkar dada, panjang baju, dan siluet pasangan dapat dikonsultasikan langsung bersama penjahit butik tanpa minimal order.
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
                      Tekstur Tenun Dobby Timbul Berkarakter
                    </h4>
                    <p className="text-[11px] font-light text-[#D5C8B8]/85 leading-relaxed mt-0.5">
                      Anyaman bertekstur timbul yang mewah, tidak menerawang, tidak mudah kusut saat duduk di acara pesta, dan tahan cuci berulang tanpa luntur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Lapis Furing Katun Hero Sejuk Tropis
                    </h4>
                    <p className="text-[11px] font-light text-[#D5C8B8]/85 leading-relaxed mt-0.5">
                      Dilapisi furing katun hero halus yang menyerap keringat dan tidak panas, menjamin seluruh anggota keluarga nyaman seharian penuh.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#C5A059] text-[10px] mt-0.5 shrink-0">◆</span>
                  <div>
                    <h4 className="text-xs uppercase font-semibold tracking-[0.14em] text-white">
                      Garansi Bebas Tukar Ukuran 7 Hari
                    </h4>
                    <p className="text-[11px] font-light text-[#D5C8B8]/85 leading-relaxed mt-0.5">
                      Jaminan purna jual resmi Butik Batik Smile Semarang dengan layanan bebas tukar ukuran dalam 7 hari jika ukuran salah satu anggota kurang pas.
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
