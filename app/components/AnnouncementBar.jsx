import React from 'react';

export function AnnouncementBar() {
  return (
    <div className="bg-[#9E4719] text-[#FFF8F0] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 relative z-50">
      <span className="hidden md:inline text-amber-200 font-serif italic text-sm">
        Mahakarya Nusantara
      </span>
      <span className="hidden md:inline text-amber-300">•</span>
      <span>
        Gratis Ongkir Seluruh Pulau Jawa &amp; Bebas Konsultasi Jahit Kustom Seragam Keluarga
      </span>
      <span className="hidden sm:inline text-amber-300">•</span>
      <a
        href="https://wa.me/6281234567890?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20batik"
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-semibold hover:text-amber-200 transition-colors hidden sm:inline"
      >
        Chat WA Konsultan &rarr;
      </a>
    </div>
  );
}
