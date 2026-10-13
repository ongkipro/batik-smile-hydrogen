import React, { useState, useEffect } from 'react';

/**
 * WhatsAppConcierge: Floating Personal Sizing & Styling Advisor (Desktop)
 * Smart Visibility:
 * - Hides when inside the Hero/top fold (scrollY < 420px) to prevent visual clutter
 * - Hides when reaching the Footer (via IntersectionObserver) to prevent overlapping contact links
 * - Smooth fade & slide transition with Quiet Luxury 0px architecture
 * - Links to official Batik Smile concierge: 081-390-8888-09
 */
export function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let footerObserver = null;
    let isFooterIntersecting = false;
    const footerElement = document.querySelector('footer');

    const updateVisibility = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Hide when in Hero (top fold) or when footer is visible
      const isPastHero = scrollY > 420;
      setIsVisible(isPastHero && !isFooterIntersecting);
    };

    if (footerElement && typeof IntersectionObserver !== 'undefined') {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          isFooterIntersecting = entry.isIntersecting;
          updateVisibility();
        },
        { threshold: 0.1 }
      );
      footerObserver.observe(footerElement);
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      if (footerObserver && footerElement) {
        footerObserver.disconnect();
      }
    };
  }, []);

  const officialNumber = '6281390888809';
  const defaultMessage = encodeURIComponent(
    'Halo Butik Batik Smile, saya ingin konsultasi koleksi busana batik & sarimbit keluarga.',
  );
  const waUrl = `https://wa.me/${officialNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Batik Smile WhatsApp Concierge"
      className={`hidden lg:block fixed bottom-6 right-6 z-40 transition-all duration-400 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* Expanded Consultation Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-[#E2DFD8] shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between border-b border-[#E2DFD8] pb-3 mb-3">
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9E7D3B] font-semibold block">
                CONCIERGE BUTIK
              </span>
              <h3 className="font-serif text-base text-[#111111] font-semibold">
                Konsultan Batik &amp; Busana
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#5A5550] hover:text-[#111111] text-sm p-1 cursor-pointer"
              aria-label="Tutup Concierge"
            >
              &times;
            </button>
          </div>

          <p className="text-xs text-[#5A5550] leading-relaxed mb-4 font-light">
            Senyum, Salam, Sapa! Butuh panduan ukuran sarimbit keluarga, detail motif wastra, atau rekomendasi busana? Tim kami siap melayani Anda.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] text-center block transition-colors shadow-sm"
          >
            CHAT WHATSAPP RESMI &rarr;
          </a>

          <div className="mt-2.5 text-center text-[10px] text-[#A69F96]">
            Nomor Resmi: 081-390-8888-09
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#111111] text-[#C5A059] border border-[#C5A059]/40 shadow-xl hover:bg-[#C5A059] hover:text-[#111111] transition-all duration-300 cursor-pointer"
        aria-label="Buka Layanan Konsultasi WhatsApp"
      >
        <span className="w-2 h-2 bg-[#C5A059] animate-ping" />
        <span className="text-[10px] uppercase font-bold tracking-[0.18em]">
          KONSULTASI VIA WHATSAPP
        </span>
      </button>
    </aside>
  );
}
