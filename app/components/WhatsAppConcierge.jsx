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
      className={`hidden lg:flex flex-col items-end fixed bottom-6 right-6 z-40 transition-all duration-400 ease-out ${
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
            className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1DA851] !text-white text-[11px] uppercase font-semibold tracking-[0.18em] text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>CHAT WHATSAPP RESMI &rarr;</span>
          </a>

          <div className="mt-2.5 text-center text-[10px] text-[#A69F96]">
            Nomor Resmi: 081-390-8888-09
          </div>
        </div>
      )}

      {/* Official WhatsApp Green Floating Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ borderRadius: '9999px' }}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.42)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.58)] hover:scale-105 transition-all duration-300 cursor-pointer"
        aria-label="Buka Layanan Konsultasi WhatsApp"
        title="Konsultasi via WhatsApp Resmi"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </button>
    </aside>
  );
}
