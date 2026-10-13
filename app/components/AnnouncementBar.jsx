import React from 'react';

/**
 * AnnouncementBar: Hairline Quiet Luxury Notification Bar
 * Core Brand Promise: Batik Berkualitas, Layanan Maksimal, Harga Bersahabat
 */
export function AnnouncementBar() {
  return (
    <aside
      aria-label="Komitmen Butik"
      className="bg-[#111111] text-[#FAF8F5] text-[9.5px] sm:text-[10.5px] py-2 px-3 sm:px-4 text-center font-normal tracking-[0.18em] sm:tracking-[0.22em] flex items-center justify-center gap-2 relative z-50 border-b border-white/10 uppercase select-none"
    >
      <span className="hidden md:inline text-[#C5A059] font-serif italic normal-case text-xs">
        Batik Smile
      </span>
      <span className="hidden md:inline text-[#C5A059]">&bull;</span>

      <span>
        BATIK BERKUALITAS &bull; LAYANAN MAKSIMAL &bull; HARGA BERSAHABAT
      </span>
    </aside>
  );
}
