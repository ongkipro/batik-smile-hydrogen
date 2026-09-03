import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';

const SLIDES = [
  {
    id: 'mahakarya',
    tierBadge: 'Kasta Tertinggi • Sutra Prada',
    tagline: 'Sejak 2007 • Butik Semarang & Solo',
    title: 'Sarimbit Mahakarya',
    subtitle: 'Keagungan Sutra & Prada Emas Murni',
    description:
      'Mahakarya sutra ATBM eksklusif berpadu canting prada emas murni, dipersembahkan khusus untuk momen sakral resepsi pernikahan keluarga.',
    ctaText: 'Eksplorasi Mahakarya',
    ctaLink: '/collections/sarimbit-exclusive',
    image:
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_51f1e349-35df-4896-b08d-6290f84897d9.jpg?v=1786005734',
  },
  {
    id: 'signature',
    tierBadge: 'Koleksi Desainer • Tenun Dobby',
    tagline: 'Filosofi Modern • Butik Semarang',
    title: 'Kemewahan Yang Bersahaja',
    subtitle: 'Signature Elegance • Katun Primisima Halus',
    description:
      'Harmoni motif batik klasik berpadu siluet modern. Pilihan tepat untuk resepsi pernikahan dan jamuan resmi keluarga.',
    ctaText: 'Lihat Signature',
    ctaLink: '/collections/sarimbit-premium',
    image:
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_d8691b10-ece8-4430-a8c6-d184fa0c467a.jpg?v=1786004716',
  },
  {
    id: 'essential',
    tierBadge: 'Keluarga Harmonis • Katun Primisima',
    tagline: 'Kenyamanan Harian & Hari Raya',
    title: 'Kesejukan Dalam Setiap Langkah',
    subtitle: 'Essential Daily • Kenyamanan Harian',
    description:
      'Bahan katun adem bernapas dengan ketahanan warna prima. Sahabat setia momen kumpul keluarga dan silaturahmi.',
    ctaText: 'Jelajahi Essential',
    ctaLink: '/collections/sarimbit-ekonomis',
    image:
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_batik_couple_1785995932731_7d17a644-177e-4489-bcf6-490c3c74d39f.jpg?v=1786005749',
  },
  {
    id: 'all',
    tierBadge: 'Koleksi Lengkap • Pria, Wanita & Anak',
    tagline: 'O2O Showroom 3 Lantai Semarang',
    title: 'Koleksi Pasangan & Keluarga',
    subtitle: 'Katalog Lengkap Sarimbit Nusantara',
    description:
      'Temukan keharmonisan berbusana dengan beragam pilihan motif eksklusif khas Solo dan Pekalongan.',
    ctaText: 'Lihat Semua Katalog',
    ctaLink: '/collections/sarimbit-exclusive',
    image:
      'https://cdn.shopify.com/s/files/1/0813/3224/0441/collections/banner_shop_all_1786007684766.jpg?v=1786007711',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full h-[88vh] min-h-[580px] max-h-[820px] overflow-hidden bg-[#0D0D0D] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with Cross-Fade */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Dark & Gold Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

            {/* Content Box */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-[100vw] mx-auto px-6 sm:px-8 lg:px-12 w-full">
                <div className="max-w-2xl text-white pt-12 sm:pt-0">
                  {/* Tagline & Tier Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-amber-400/40 backdrop-blur-sm mb-4">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] uppercase tracking-widest text-amber-200 font-semibold">
                      {slide.tierBadge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 leading-[1.1]">
                    {slide.title}
                  </h1>
                  <p className="font-serif text-lg sm:text-2xl text-amber-100/90 italic font-normal mb-4 leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mb-8 leading-relaxed font-sans">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <NavLink
                      to={slide.ctaLink}
                      className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#b08c45] text-black font-semibold text-xs uppercase tracking-widest rounded transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-900/30"
                    >
                      {slide.ctaText} &rarr;
                    </NavLink>
                    <a
                      href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20tertarik%20dengan%20koleksi%20sarimbit"
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-widest rounded border border-white/30 backdrop-blur-sm transition-all"
                    >
                      Konsultasi WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'w-8 bg-[#C5A059]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
