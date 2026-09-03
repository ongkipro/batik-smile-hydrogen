import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

const SLIDES = [
  {
    id: 'sarimbit-exclusive',
    eyebrow: 'SEMARANG • ESTABLISHED 2007',
    title: 'Mahakarya Sarimbit Nusantara',
    subtitle: 'Keagungan Sutra ATBM & Canting Prada Emas',
    description:
      'Menenun keselarasan busana pasangan dan keluarga agung dengan jahitan butik berstandar tinggi untuk momen sakral resepsi pernikahan.',
    ctaText: 'JELAJAHI SARIMBIT',
    ctaLink: '/collections/sarimbit-exclusive',
    secondaryCtaText: 'KONSULTASI WA',
    secondaryCtaLink:
      'https://wa.me/6281390888809?text=' +
      encodeURIComponent('Halo Batik Smile, saya ingin konsultasi koleksi Sarimbit Exclusive.'),
    image: '/banners/hero_slider_1.jpg',
  },
  {
    id: 'batik-wanita',
    eyebrow: 'HAUTE COUTURE WANITA',
    title: 'Kemewahan Yang Bersahaja',
    subtitle: 'Gaun, Gamis & Kebaya Sutra Modern',
    description:
      'Siluet anggun kontemporer berpadu warisan canting soga Jawa. Dirancang khusus untuk memancarkan pesona ningrat yang abadi dan memikat.',
    ctaText: 'KOLEKSI WANITA',
    ctaLink: '/collections/batik-wanita',
    secondaryCtaText: 'LIHAT LOOKBOOK',
    secondaryCtaLink: '#lookbook',
    image: '/banners/hero_slider_2.jpg',
  },
  {
    id: 'batik-pria',
    eyebrow: 'PRESISI POLA & FURING HERO',
    title: 'Karisma Kemeja Pria Eksekutif',
    subtitle: 'Jahitan Sambung Motif & Furing Katun Sejuk',
    description:
      'Kenyamanan sejuk sepanjang hari dengan potongan presisi simetris pada saku dan belahan kancing, mencerminkan wibawa sang pemimpin.',
    ctaText: 'KOLEKSI KEMEJA PRIA',
    ctaLink: '/collections/batik-pria',
    secondaryCtaText: 'LAYANAN JAHIT',
    secondaryCtaLink: '/pages/layanan-seragam',
    image: '/banners/hero_slider_3.jpg',
  },
  {
    id: 'sarimbit-keluarga',
    eyebrow: 'HARMONI KELUARGA BESAR',
    title: 'Kehangatan Silaturahmi Keluarga',
    subtitle: 'Koleksi Sarimbit Ayah, Ibu & Anak',
    description:
      'Koleksi busana serasi untuk seluruh anggota keluarga tercinta dengan bahan katun primisima yang sejuk, nyaman, dan ramah di kulit anak.',
    ctaText: 'SARIMBIT KELUARGA',
    ctaLink: '/collections/sarimbit-ekonomis',
    secondaryCtaText: 'BATIK ANAK',
    secondaryCtaLink: '/collections/batik-anak',
    image: '/banners/hero_slider_4.jpg',
  },
  {
    id: 'kain-tulis',
    eyebrow: 'WARISAN ADILUHUNG PENGRAJIN',
    title: 'Kain Batik Tulis Mahakarya',
    subtitle: 'Goresan Canting Tangan Asli Pengrajin Solo & Pekalongan',
    description:
      'Setiap goresan lilin malam panas di atas kain Mori adalah doa dan ketekunan maestro batik. Tersedia lembaran kain atau dipadukan dengan jasa jahit butik.',
    ctaText: 'PILIH LEMBARAN KAIN',
    ctaLink: '/collections/jarik-kain-batik',
    secondaryCtaText: 'KISAH PENGRAJIN',
    secondaryCtaLink: '/pages/tentang-kami',
    image: '/banners/hero_slider_5.jpg',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
      className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[95vh] min-h-[580px] max-h-[920px] overflow-hidden bg-[#111111] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Carousel Hero Butik Batik Smile"
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
            {/* Background Image with Subtle Slow Pan */}
            <img
              src={slide.image}
              alt={slide.title}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
              className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Quiet Luxury Dark & Amber Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
                <div className="max-w-2xl text-white pt-8 sm:pt-0">
                  {/* Eyebrow Label */}
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-3 drop-shadow-sm">
                    {slide.eyebrow}
                  </span>

                  {/* Headline */}
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide leading-tight mb-2">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="font-serif text-base sm:text-xl text-[#FAF8F5]/90 italic font-light mb-4">
                    {slide.subtitle}
                  </p>

                  <div className="w-12 h-px bg-[#C5A059] mb-5" />

                  {/* Narrative Description */}
                  <p className="text-xs sm:text-sm text-[#E2DFD8] max-w-lg mb-8 leading-relaxed font-light">
                    {slide.description}
                  </p>

                  {/* CTA Buttons with Zero-Radius */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to={slide.ctaLink}
                      className="px-8 py-3.5 bg-[#C5A059] hover:bg-[#9E7D3B] text-[#111111] hover:text-white rounded-none text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors shadow-sm"
                    >
                      {slide.ctaText} &rarr;
                    </Link>

                    {slide.secondaryCtaLink.startsWith('http') ? (
                      <a
                        href={slide.secondaryCtaLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white rounded-none border border-white/40 hover:border-white text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors"
                      >
                        {slide.secondaryCtaText}
                      </a>
                    ) : (
                      <Link
                        to={slide.secondaryCtaLink}
                        className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white rounded-none border border-white/40 hover:border-white text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors"
                      >
                        {slide.secondaryCtaText}
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
          <div className="flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Pindah ke slide ${idx + 1}`}
                className={`h-0.5 transition-all duration-500 rounded-none cursor-pointer ${
                  idx === current
                    ? 'w-10 sm:w-14 bg-[#C5A059]'
                    : 'w-4 sm:w-6 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Numerical Slide Counter */}
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium font-serif">
            <span>0{current + 1}</span>
            <span className="text-white/40 mx-1.5">/</span>
            <span className="text-white/40">0{SLIDES.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
