import React from 'react';
import { Link } from 'react-router';

const HOMEPAGE_HIGHLIGHTS = [
  {
    id: 'corporate-uniform',
    eyebrow: '01 • CORPORATE UNIFORM',
    headline: 'Bangun identitas tim dengan seragam batik yang berkarakter',
    subheadline:
      'Dari pemilihan motif hingga produksi, Batik Smile hadir sebagai partner kebutuhan seragam batik perusahaan, instansi, dan organisasi dengan pilihan kualitas ekonomis, premium, hingga luxury.',
    ctaText: 'Konsultasikan kebutuhan seragam batik Anda',
    ctaHref:
      'https://wa.me/6281390888809?text=' +
      encodeURIComponent(
        'Halo Batik Smile, saya ingin konsultasi kebutuhan seragam batik untuk perusahaan/instansi.',
      ),
    isExternal: true,
    image: '/banners/seragam_korporasi_gold.jpg',
    secondaryImage: '/banners/seragam_korporasi_navy.jpg',
    alt: 'Seragam Batik Korporasi & Instansi Batik Smile Semarang',
  },
  {
    id: 'family-set',
    eyebrow: '02 • FAMILY SET',
    headline: 'Tampil serasi, ciptakan momen istimewa bersama keluarga',
    subheadline:
      'Temukan koleksi batik keluarga dengan pilihan motif, warna, dan model untuk setiap anggota keluarga. Hadirkan kehangatan dan kebersamaan dalam setiap momen berharga.',
    ctaText: 'Konsultasikan family set',
    ctaHref:
      'https://wa.me/6281390888809?text=' +
      encodeURIComponent(
        'Halo Batik Smile, saya ingin konsultasi koleksi Family Set (busana batik keluarga).',
      ),
    isExternal: true,
    image: '/banners/sarimbit_family_banner.jpg',
    alt: 'Koleksi Family Set Sarimbit Keluarga Batik Smile',
  },
  {
    id: 'kain-batik',
    eyebrow: '03 • KAIN BATIK',
    headline: 'Setiap lembaran kain batik punya cerita, menyatukan seni, tradisi, dan makna',
    subheadline:
      'Jelajahi koleksi kain batik dengan beragam motif dan karakter istimewa untuk mewujudkan berbagai inspirasi busana, maupun kreasi personal Anda.',
    ctaText: 'Jelajahi koleksi kain',
    ctaHref: '/collections/kain',
    isExternal: false,
    image: '/banners/collection_kain_tulis_banner.jpg',
    alt: 'Koleksi Lembaran Kain Batik Nusantara Batik Smile',
  },
];

export function HeritageVideoBanner() {
  return (
    <section
      aria-label="Layanan Seragam Korporasi, Family Set, dan Koleksi Kain Batik"
      className="relative w-full bg-[#111111] text-white py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-y border-[#C5A059]/30"
    >
      <div className="w-full max-w-7xl mx-auto space-y-14 sm:space-y-20">
        {HOMEPAGE_HIGHLIGHTS.map((item, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Media Column */}
              <div
                className={`lg:col-span-6 ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                {item.secondaryImage ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative aspect-[16/10] sm:aspect-[4/5] bg-[#1C1C1C] border border-[#C5A059]/40 overflow-hidden group">
                      <img
                        src={item.secondaryImage}
                        alt="Seragam Korporasi Eksekutif Batik Smile"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-black/80 text-[#C5A059] border border-[#C5A059]/40 text-[8px] uppercase tracking-[0.18em] font-semibold">
                        SERAGAM PERUSAHAAN
                      </span>
                    </div>
                    <div className="relative aspect-[16/10] sm:aspect-[4/5] bg-[#1C1C1C] border border-[#C5A059]/40 overflow-hidden group">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-black/80 text-[#C5A059] border border-[#C5A059]/40 text-[8px] uppercase tracking-[0.18em] font-semibold">
                        SERAGAM INSTANSI &amp; ORGANISASI
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] bg-[#1C1C1C] border border-[#C5A059]/40 overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>

              {/* Copywriting Column */}
              <div
                className={`lg:col-span-6 flex flex-col items-start ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#C5A059] font-semibold block mb-2.5">
                  {item.eyebrow}
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal tracking-wide leading-snug mb-3.5">
                  {item.headline}
                </h2>

                <div className="w-12 h-px bg-[#C5A059] mb-4" />

                <p className="text-xs sm:text-sm text-[#E2DFD8]/90 leading-relaxed font-light mb-7 max-w-xl">
                  {item.subheadline}
                </p>

                {item.isExternal ? (
                  <a
                    href={item.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="px-7 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[10px] sm:text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
                  >
                    {item.ctaText} &rarr;
                  </a>
                ) : (
                  <Link
                    to={item.ctaHref}
                    className="px-7 py-3.5 bg-[#C5A059] hover:bg-white text-[#111111] text-[10px] sm:text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
                  >
                    {item.ctaText} &rarr;
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
