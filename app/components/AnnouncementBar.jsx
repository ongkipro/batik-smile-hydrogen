import React from 'react';

/**
 * AnnouncementBar: Hairline Quiet Luxury Notification Bar
 * Official WhatsApp 081-390-8888-09
 */
export function AnnouncementBar() {
  return (
    <aside aria-label="Pengumuman Butik" className="bg-[#111111] text-[#FAF8F5] text-[10px] sm:text-[11px] py-2 px-4 text-center font-normal tracking-[0.16em] flex items-center justify-center gap-2 relative z-50 border-b border-white/10 uppercase">
      <span className="hidden md:inline text-[#C5A059] font-serif italic normal-case text-xs">
        Batik Smile Nusantara
      </span>
      <span className="hidden md:inline text-[#C5A059]">&bull;</span>
      <span>
        BEBAS ONGKIR SE-NUSANTARA &bull; KONSULTASI JAHIT BESPOKE TANPA MINIMAL ORDER
      </span>
      <span className="hidden sm:inline text-[#C5A059]">&bull;</span>
      <a
        href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20batik"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#C5A059] hover:underline font-medium transition-colors hidden sm:inline"
      >
        CHAT CONCIERGE &rarr;
      </a>
    </aside>
  );
}
