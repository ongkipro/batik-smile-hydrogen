import React from 'react';
import { Link } from 'react-router';

/**
 * HeroEditorial: Engrasia / Prestige 9.3.0 Full-Bleed Archetype
 * Graceful Fallback Contract: Consumes hero_banner metaobject or falls back to local generated banner
 *
 * @param {{
 *   data?: any;
 *   scrollAnchorId?: string;
 * }} props
 */
export function HeroEditorial({ data, scrollAnchorId = '#best-sellers' }) {
  // Graceful Fallback Strategy
  const heading = data?.heading?.value || 'MAHAKARYA BATIK NUSANTARA';
  const subheading =
    data?.subheading?.value ||
    'Menenun Keanggunan Klasik & Keselarasan Busana Keluarga Sejak 2007';
  const ctaText = data?.cta_text?.value || 'JELAJAHI KOLEKSI';
  const ctaLink = data?.cta_link?.value || '/collections/sarimbit-luxury';
  const secondaryCtaText = data?.secondary_cta_text?.value || 'KONSULTASI JAHIT';
  const secondaryCtaLink = data?.secondary_cta_link?.value || '/pages/layanan-seragam';

  // Image source: Metaobject image URL or local fallback banner
  const imageUrl =
    data?.image?.reference?.image?.url ||
    data?.image?.value ||
    '/banners/hero_editorial_banner.jpg';

  const handleScrollDown = (e) => {
    e.preventDefault();
    const element = document.querySelector(scrollAnchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[95vh] min-h-[580px] bg-[#111111] overflow-hidden">
      {/* Background Media Container with 0px Radius */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={imageUrl}
          alt="Batik Smile Editorial Hero"
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/30 to-[#111111]/40" />
      </div>

      {/* Editorial Content Center-Bottom */}
      <div className="relative z-10 h-full w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-end pb-16 sm:pb-20 text-center items-center">
        {/* Whispered Eyebrow */}
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium mb-3 sm:mb-4 drop-shadow-sm">
          SEMARANG • ESTABLISHED 2007
        </span>

        {/* Cormorant Garamond Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide max-w-3xl leading-[1.15] mb-4 sm:mb-6">
          {heading}
        </h1>

        {/* Sub-narrative */}
        <p className="text-xs sm:text-sm text-[#FAF8F5]/90 font-sans tracking-wide max-w-xl leading-relaxed mb-8 sm:mb-10 font-light">
          {subheading}
        </p>

        {/* Dual Zero-Radius Luxury CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          <Link
            to={ctaLink}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FFFFFF] text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] border border-white hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059] transition-all duration-300 shadow-sm"
          >
            {ctaText}
          </Link>

          <Link
            to={secondaryCtaLink}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-white text-[11px] uppercase font-semibold tracking-[0.18em] border border-white/70 hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            {secondaryCtaText}
          </Link>
        </div>

        {/* Circular Down-Arrow Scroll Cue */}
        <button
          onClick={handleScrollDown}
          aria-label="Scroll to Best Sellers"
          className="mt-10 sm:mt-12 w-9 h-9 border border-white/40 flex items-center justify-center text-white/70 hover:text-[#C5A059] hover:border-[#C5A059] transition-all duration-300 group cursor-pointer"
        >
          <svg
            className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth="1.5"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
