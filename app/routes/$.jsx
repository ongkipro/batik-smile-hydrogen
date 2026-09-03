import React from 'react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router';
import { useAside } from '~/components/Aside';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: '404 — Halaman Tidak Ditemukan | Butik Batik Smile Semarang' },
    {
      name: 'description',
      content:
        'Halaman atau arsip koleksi yang Anda tuju belum tersedia di Butik Batik Smile Nusantara.',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ request }) {
  throw new Response(`${new URL(request.url).pathname} not found`, {
    status: 404,
    statusText: 'Not Found',
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export default function CatchAllPage() {
  return <NotFoundView statusCode={404} />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let statusCode = 404;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
  }

  return <NotFoundView statusCode={statusCode} />;
}

/**
 * Modern Quiet Luxury 404 View
 * - Zero-box / anti-framing: No nested card boxes or heavy bezels.
 * - Ethereal typography with oversized watermark numeral.
 * - Delicate heritage floating geometric SVG animation.
 * - Focused on primary navigation, live search trigger, and official channels.
 * - Strict noindex, nofollow SEO posture.
 */
function NotFoundView({ statusCode = 404 }) {
  const { open } = useAside();

  return (
    <div className="bg-[#FAF8F5] min-h-[75vh] sm:min-h-[80vh] text-[#111111] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative overflow-hidden">
      
      {/* Background Decorative Heritage Watermark (Animated Subtle Pulse) */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-40 sm:opacity-50"
      >
        <span className="font-serif text-[130px] sm:text-[200px] md:text-[260px] lg:text-[300px] text-[#111111]/5 tracking-tighter leading-none block">
          {statusCode}
        </span>
      </div>

      {/* Main Content Card-Free Stream */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        
        {/* Delicate Floating Batik Monogram Emblem */}
        <div className="mb-6 flex justify-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 border border-[#C5A059]/60 flex items-center justify-center rotate-45 transition-transform duration-700 hover:rotate-90">
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#9E7D3B] -rotate-45" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="square" 
                strokeLinejoin="miter" 
                strokeWidth="1.2" 
                d="M12 2L2 12l10 10 10-12L12 2z" 
              />
              <path 
                strokeLinecap="square" 
                strokeLinejoin="miter" 
                strokeWidth="1" 
                d="M12 7l-5 5 5 5 5-5-5-5z" 
              />
            </svg>
          </div>
        </div>

        {/* Whispered Eyebrow */}
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#9E7D3B] block mb-3">
          GALERI BUTIK &bull; KODE {statusCode}
        </span>

        {/* Architectural Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] leading-tight tracking-wide mb-4">
          Jejak Wastra Belum Tersedia
        </h1>

        {/* Hairline Golden Divider */}
        <div className="w-12 h-px bg-[#C5A059] mx-auto mb-5" />

        {/* Poetic Explanatory Narrative */}
        <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed max-w-md mx-auto mb-9">
          Halaman atau motif yang Anda tuju mungkin telah berganti kurasi, berpindah tautan, atau sedang dipersiapkan di butik kami. Mari kembali menjelajahi koleksi utama.
        </p>

        {/* Focused Primary Actions (Zero-Radius, Frameless Stream) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-8">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 text-center shadow-xs cursor-pointer"
          >
            KEMBALI KE BERANDA &rarr;
          </Link>

          <Link
            to="/collections/all"
            className="w-full sm:w-auto px-7 py-3.5 bg-transparent border border-[#111111] hover:border-[#C5A059] text-[#111111] hover:text-[#9E7D3B] text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 text-center cursor-pointer"
          >
            JELAJAHI KOLEKSI
          </Link>
        </div>

        {/* Whispered In-Modal Search Shortcut */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => open('search')}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#7C3F1D] hover:text-[#111111] transition-colors cursor-pointer group"
          >
            <svg className="w-3.5 h-3.5 text-[#9E7D3B] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="border-b border-[#7C3F1D]/40 pb-0.5">Atau Cari Busana Tertentu</span>
            <span className="text-[#C5A059]">&rarr;</span>
          </button>
        </div>

        {/* Concierge Whispered Note */}
        <div className="mt-12 pt-6 border-t border-[#E2DFD8]/60 text-[10px] text-[#777777] font-light">
          <span>Butuh panduan motif &amp; ukuran? Hubungi WhatsApp Concierge Resmi: </span>
          <a
            href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20butuh%20bantuan%20mencari%20busana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111111] font-medium underline hover:text-[#9E7D3B] transition-colors ml-1"
          >
            081-390-8888-09
          </a>
        </div>

      </div>
    </div>
  );
}
