import React from 'react';

/**
 * AnnouncementBar: Hairline Quiet Luxury Notification Bar
 * Free from external WhatsApp CTA as per brand specification
 */
export function AnnouncementBar() {
  return (
    <aside
      aria-label="Pengumuman Butik"
      className="bg-[#111111] text-[#FAF8F5] text-[9.5px] sm:text-[10.5px] py-2 px-3 sm:px-4 text-center font-normal tracking-[0.16em] flex items-center justify-center gap-2 relative z-50 border-b border-white/10 uppercase"
    >
      <span className="hidden md:inline text-[#C5A059] font-serif italic normal-case text-xs">
        Batik Smile
      </span>
      <span className="hidden md:inline text-[#C5A059]">&bull;</span>
      
      {/* Mobile concise copy */}
      <span className="sm:hidden">
        BEBAS ONGKIR SE-INDONESIA &bull; JAHIT BESPOKE TANPA MOQ
      </span>

      {/* Desktop & Tablet comprehensive copy */}
      <span className="hidden sm:inline">
        BEBAS ONGKIR SE-INDONESIA &bull; KONSULTASI JAHIT BESPOKE TANPA MINIMAL ORDER
      </span>
    </aside>
  );
}
