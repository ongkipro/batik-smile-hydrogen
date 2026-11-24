import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

const SLIDES = [
  {
    id: 'seragam-korporasi',
    eyebrow: '01 • CORPORATE UNIFORM — SERAGAM BATIK',
    title: 'Seragam Korporasi',
    subtitle: 'Bangun Identitas Tim dengan Seragam Batik yang Berkarakter',
    description:
      'Dari pemilihan motif hingga produksi, Batik Smile hadir sebagai partner seragam perusahaan, instansi, dan organisasi kualitas ekonomis hingga luxury.',
    ctaText: 'KONSULTASI SERAGAM (WHATSAPP)',
    ctaLink:
      'https://wa.me/6281390888809?text=' +
      encodeURIComponent('Halo Batik Smile, saya ingin konsultasi kebutuhan seragam batik perusahaan/instansi.'),
    image: '/banners/seragam_korporasi_navy.jpg',
    imagePosition: 'object-[center_22%]',
    hasAvif: false,
  },
  {
    id: 'premium-series',
    eyebrow: '02 • KOLEKSI UTAMA — PREMIUM SERIES',
    title: 'Premium Series',
    subtitle: 'Pilihan Berkualitas untuk Kenyamanan Istimewa',
    description:
      'Perpaduan bahan berkualitas berkarakter dengan jahitan presisi butik. Menghadirkan kenyamanan ekstra untuk acara resmi, keluarga, maupun instansi.',
    ctaText: 'JELAJAHI PREMIUM SERIES',
    ctaLink: '/collections/premium-series',
    image: '/banners/seragam_korporasi_gold.jpg',
    imagePosition: 'object-[center_18%]',
    hasAvif: false,
  },
  {
    id: 'luxury-series',
    eyebrow: '03 • KOLEKSI UTAMA — LUXURY SERIES',
    title: 'Luxury Series',
    subtitle: 'Elegant dalam Setiap Detail',
    description:
      'Mahakarya busana dan sarimbit Sutra ATBM berlapis trikot pilihan. Hadirkan kemewahan dan keanggunan berkelas di setiap momen istimewa Anda.',
    ctaText: 'KONSULTASI LUXURY (WHATSAPP)',
    ctaLink:
      'https://wa.me/6281390888809?text=' +
      encodeURIComponent('Halo Batik Smile, saya ingin konsultasi koleksi Luxury Series.'),
    image: '/banners/hero_slider_1.jpg',
    imagePosition: 'object-center',
    hasAvif: true,
  },
  {
    id: 'ekonomi-series',
    eyebrow: '04 • KOLEKSI UTAMA — EKONOMI SERIES',
    title: 'Ekonomi Series',
    subtitle: 'Pesona Batik yang Lebih Terjangkau',
    description:
      'Koleksi batik katun primisima pilihan yang sejuk dan nyaman dipakai. Solusi busana harian, keluarga, dan seragam dengan harga terjangkau.',
    ctaText: 'JELAJAHI EKONOMI SERIES',
    ctaLink: '/collections/ekonomi-series',
    image: '/banners/sarimbit_family_banner.jpg',
    imagePosition: 'object-center',
    hasAvif: false,
  },
  {
    id: 'kain-batik',
    eyebrow: '05 • KOLEKSI UTAMA — KAIN BATIK',
    title: 'Koleksi Kain Batik',
    subtitle: 'Pesona Balutan Nusantara',
    description:
      'Setiap lembaran kain batik menyimpan cerita, menyatukan seni dan tradisi. Tersedia motif klasik hingga modern untuk kreasi busana Anda.',
    ctaText: 'JELAJAHI KOLEKSI KAIN',
    ctaLink: '/collections/kain',
    image: '/banners/hero_slider_5.jpg',
    imagePosition: 'object-center',
    hasAvif: true,
  },
];

export function HeroSlider({ slides } = {}) {
  const activeSlides = slides && slides.length > 0 ? slides : SLIDES;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    let intervalId = null;
    // Editorial pacing: Allow 12s initial reading time before first auto-advance, then 8s per slide
    const initialDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrent((prev) => (prev + 1) % activeSlides.length);
      }, 8000);
    }, 12000);

    return () => {
      clearTimeout(initialDelay);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused, activeSlides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % activeSlides.length);
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
      className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[95vh] min-h-[580px] max-h-[920px] overflow-hidden bg-[#111111] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Carousel Hero Butik Batik Smile"
    >
      {/* Background Slides with Cross-Fade */}
      {activeSlides.map((slide, index) => {
        // Defer non-primary slides until client hydration to avoid initial LCP bandwidth competition
        if (index > 0 && !isMounted) return null;

        const isActive = index === current;
        const HeadingTag = index === 0 ? 'h1' : 'h2';
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Subtle Slow Pan & AVIF Next-Gen Format */}
            <picture>
              {slide.hasAvif && slide.image?.endsWith('.jpg') && (
                <source
                  srcSet={slide.image.replace('.jpg', '.avif')}
                  type="image/avif"
                />
              )}
              <img
                src={slide.image}
                alt={slide.title}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
                width="1920"
                height="1080"
                className={`w-full h-full object-cover ${slide.imagePosition || 'object-center'} transform transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </picture>

            {/* Quiet Luxury Bottom-Left Scrim so All Faces in Group Photos Stay Unobstructed & Bright */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

            {/* Content Container (Static Bottom-Left Template so Group Photo Faces Are Never Covered) */}
            <div className="absolute inset-0 flex items-end pb-20 sm:pb-24 lg:pb-24">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
                <div className="max-w-xl text-white">
                  {/* Eyebrow Label (Fixed 1-line height) */}
                  <span className="text-xs uppercase tracking-[0.24em] text-[#C5A059] font-semibold block mb-2.5 truncate drop-shadow-xs">
                    {slide.eyebrow}
                  </span>

                  {/* Headline (Fixed 1-line height) */}
                  <HeadingTag className="font-serif text-3xl sm:text-5xl lg:text-[52px] text-white font-normal tracking-wide leading-tight mb-1.5 truncate drop-shadow-sm">
                    {slide.title}
                  </HeadingTag>

                  {/* Subtitle (Fixed 1-line height) */}
                  <p className="font-serif text-sm sm:text-lg lg:text-xl text-[#FAF8F5]/95 italic font-light mb-3.5 truncate drop-shadow-xs">
                    {slide.subtitle}
                  </p>

                  <div className="w-12 h-px bg-[#C5A059] mb-4" />

                  {/* Narrative Description (Fixed 2-line height so button position never shifts) */}
                  <p className="text-xs sm:text-sm text-[#E2DFD8] max-w-lg min-h-[2.75rem] sm:min-h-[2.85rem] mb-6 leading-relaxed font-light line-clamp-2 drop-shadow-xs">
                    {slide.description}
                  </p>

                  {/* Single CTA Button with Uniform Width & Zero-Radius */}
                  <div className="flex items-center">
                    {slide.ctaLink.startsWith('http') ? (
                      <a
                        href={slide.ctaLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center min-w-[260px] sm:min-w-[280px] px-8 py-3.5 bg-[#C5A059] hover:bg-[#9E7D3B] text-[#111111] hover:text-white rounded-none text-xs uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
                      >
                        {slide.ctaText} &rarr;
                      </a>
                    ) : (
                      <Link
                        to={slide.ctaLink}
                        className="inline-flex items-center justify-center min-w-[260px] sm:min-w-[280px] px-8 py-3.5 bg-[#C5A059] hover:bg-[#9E7D3B] text-[#111111] hover:text-white rounded-none text-xs uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
                      >
                        {slide.ctaText} &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom Bar: Indicators & Counter */}
      <div className="absolute bottom-8 inset-x-0 z-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* Progress Indicator Lines */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
                className="py-3 px-1 cursor-pointer flex items-center justify-center focus:outline-none"
              >
                <span
                  className={`h-0.5 block transition-all duration-500 rounded-none ${
                    idx === current
                      ? 'w-10 sm:w-14 bg-[#C5A059]'
                      : 'w-4 sm:w-6 bg-white/30 hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Numerical Slide Counter */}
          <div className="text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium font-serif">
            <span>0{current + 1}</span>
            <span className="text-white/40 mx-1.5">/</span>
            <span className="text-white/40">0{activeSlides.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
