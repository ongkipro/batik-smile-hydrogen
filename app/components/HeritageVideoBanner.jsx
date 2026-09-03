import React, { useState } from 'react';
import { Link } from 'react-router';

/**
 * HeritageVideoBanner: Engrasia Archetype Craftsmanship Video Section
 * "FINEST HANDMADE" with player controls and Graceful Fallback to generated craftsmanship banner
 *
 * @param {{
 *   videoData?: any;
 * }} props
 */
export function HeritageVideoBanner({ videoData }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Graceful Fallback Strategy
  const heading = videoData?.heading?.value || 'FINEST HANDMADE';
  const eyebrow = videoData?.eyebrow?.value || 'PROUDLY MADE IN INDONESIA';
  const narrative =
    videoData?.narrative?.value ||
    'Setiap cantingan malam panas di atas Mori primisima adalah sembah bakti pengrajin kami terhadap warisan leluhur. Ketelitian goresan tangan yang tidak pernah dapat digantikan oleh mesin.';
  
  const posterUrl =
    videoData?.poster?.reference?.image?.url ||
    videoData?.poster?.value ||
    '/banners/craftsmanship_canting_banner.jpg';

  const videoUrl = videoData?.video_url?.value || null;

  return (
    <section className="relative w-full bg-[#111111] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">
      {/* Background Media with 0px Radius */}
      <div className="absolute inset-0 w-full h-full">
        {videoUrl && isPlaying ? (
          <video
            src={videoUrl}
            autoPlay
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={posterUrl}
            alt="Craftsmanship Canting Batik Tulis"
            loading="lazy"
            className="w-full h-full object-cover object-center filter grayscale contrast-125 opacity-70"
          />
        )}
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Editorial Storytelling */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium block mb-2">
            {eyebrow}
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide leading-tight mb-4">
            {heading}
          </h2>

          <p className="text-xs sm:text-sm text-[#E2DFD8] leading-relaxed font-light mb-8">
            {narrative}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/collections/jarik-kain-batik"
              className="px-8 py-4 bg-[#C5A059] text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] hover:bg-[#9E7D3B] hover:text-white transition-colors duration-300"
            >
              LIHAT KAIN TULIS ASLI
            </Link>

            <Link
              to="/pages/tentang-kami"
              className="px-8 py-4 bg-transparent border border-white/40 text-white text-[11px] uppercase font-semibold tracking-[0.18em] hover:bg-white/10 hover:border-white transition-colors duration-300"
            >
              KISAH PENGRAJIN KAMI
            </Link>
          </div>
        </div>

        {/* Right Column: Video Play Trigger & Duration Counter */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
          <div className="relative w-full max-w-xl aspect-[16/10] bg-[#1C1C1C] border border-[#C5A059]/40 overflow-hidden shadow-2xl group flex items-center justify-center">
            <img
              src={posterUrl}
              alt="Batik Smile Canting Preview"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />

            {/* Centered Play Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label="Play Craftsmanship Video"
              className="absolute w-16 h-16 bg-[#111111]/80 border border-[#C5A059] flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#111111] transition-all duration-300 cursor-pointer shadow-lg"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Bottom Duration Badge */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/80 text-[10px] tracking-widest text-[#E2DFD8] border border-white/10">
              0:18 / FINEST PROCESS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
