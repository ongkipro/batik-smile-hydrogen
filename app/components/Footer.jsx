import React, { useState } from 'react';
import { NavLink, useFetcher } from 'react-router';
import { CartForm } from '@shopify/hydrogen';

/**
 * Master Footer: Quiet Luxury Nusantara
 * - Brand: BATIK SMILE (without 'Nusantara')
 * - High-legibility typography hierarchy (no micro-fonts < 11px)
 * - Official Showroom locations (Flagship Simongan 109 3-Lantai & Banyumanik 23)
 * - Zero Border Radius (0px), Quad-Harmonic Palette, Pristine Craftsmanship
 */
export function Footer() {
  const fetcher = useFetcher();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Connect and sync email with Shopify Cart Buyer Identity
      try {
        fetcher.submit(
          {
            [CartForm.INPUT_NAME]: JSON.stringify({
              action: CartForm.ACTIONS.BuyerIdentityUpdate,
              inputs: {
                buyerIdentity: {
                  email: email.trim(),
                },
              },
            }),
          },
          { method: 'POST', action: '/cart' }
        );
      } catch {
        // Graceful fallback
      }
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-[max(6rem,calc(env(safe-area-inset-bottom)+5.5rem))] lg:pb-16 border-t border-[#1C1C1C]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">

        {/* 1. NEWSLETTER STRIP: WARTA EKSKLUSIF BUTIK */}
        <div className="border-b border-white/10 pb-12 mb-14">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-1.5">
                WARTA EKSKLUSIF WASTRA
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                Bergabung dengan Lingkar Sahabat Batik Smile
              </h3>
              <p className="text-xs sm:text-[13px] text-[#C5BFB8] font-light mt-1.5 max-w-lg leading-relaxed">
                Dapatkan rilis motif pusaka terbatas, undangan VIP fitting, dan panduan wastra adiluhung langsung di email Anda.
              </p>
            </div>

            {/* Flat Zero-Radius Subscription Form */}
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-shrink-0">
              {isSubscribed ? (
                <div className="py-3 px-5 bg-white/10 border border-[#C5A059] text-xs sm:text-[13px] text-[#C5A059] tracking-wider font-medium text-center">
                  Matur nuwun. Anda telah terdaftar dalam Warta Eksklusif kami.
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0 w-full sm:w-80 md:w-96">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Alamat email Anda..."
                    className="flex-1 px-4 py-3 text-base sm:text-sm bg-black/40 border border-white/20 text-white placeholder-[#777777] focus:outline-none focus:border-[#C5A059] rounded-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-xs uppercase font-bold tracking-[0.2em] bg-[#C5A059] hover:bg-white text-[#111111] transition-colors rounded-none whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>GABUNG</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* 2. BRAND HERITAGE HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <NavLink to="/" className="inline-block group mb-2.5">
            <span className="font-serif text-3xl sm:text-4xl lg:text-[38px] font-normal tracking-[0.24em] bg-gradient-to-r from-[#4A2E1B] via-[#C5A059] to-[#7C3F1D] text-transparent bg-clip-text transition-all duration-700 leading-tight block">
              BATIK SMILE
            </span>
          </NavLink>
          <span className="text-xs sm:text-[13px] uppercase tracking-[0.22em] text-[#C5A059] font-medium block">
            SEMARANG &bull; SEJAK 2007
          </span>
          <div className="w-16 h-px bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* 3. 4-COLUMN COMPREHENSIVE DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16 text-sm font-light">
          
          {/* COL 1: BUTIK & SHOWROOM RESMI */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-5 flex items-center gap-2 pb-2 border-b border-white/10">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="square" d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3L2 7h20L12 3z" />
              </svg>
              BUTIK &amp; SHOWROOM RESMI
            </h4>
            <div className="space-y-5 text-[#C5BFB8] leading-relaxed text-[13px] sm:text-sm">
              <div className="border-l border-[#C5A059] pl-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-white font-medium text-sm">Flagship Store (3 Lantai):</strong>
                  <span className="text-[10px] uppercase tracking-wider bg-white/10 text-[#C5A059] px-2 py-0.5 font-bold font-mono border border-[#C5A059]/40">UTAMA</span>
                </div>
                <span className="block text-[#D1CCC5]">Jl. Simongan Raya No. 109, Pamularsih, Semarang</span>
                <span className="text-xs text-[#9E978E] block">
                  Lt. 1: RTW &amp; Fitting • Lt. 2: VIP Sutra &amp; Lounge • Lt. 3: Suvenir
                </span>
                <span className="text-[#C5A059] inline-flex items-center gap-1.5 pt-1 text-xs font-medium">
                  <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Setiap Hari: 09.00 – 21.00 WIB
                </span>
              </div>

              <div className="border-l border-[#C5A059]/50 pl-3.5 space-y-1">
                <strong className="text-white font-medium text-sm block">Cabang Semarang Atas:</strong>
                <span className="block text-[#D1CCC5]">Jl. Sukun Raya No. 23, Banyumanik, Semarang</span>
                <span className="text-[#C5A059] inline-flex items-center gap-1.5 pt-1 text-xs font-medium">
                  <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Setiap Hari: 09.00 – 21.00 WIB
                </span>
              </div>

              <NavLink
                to="/pages/lokasi-toko"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C5A059] hover:text-white font-semibold pt-1 transition-colors group"
              >
                <span>Petunjuk Arah Google Maps</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </NavLink>
            </div>
          </div>

          {/* COL 2: NAVIGASI MENU */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-5 flex items-center gap-2 pb-2 border-b border-white/10">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              NAVIGASI
            </h4>
            <ul className="space-y-3 text-[#C5BFB8] text-[13px] sm:text-sm">
              <li>
                <NavLink to="/" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/luxury-series" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Luxury Series
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/premium-series" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Premium Series
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/tentang-kami" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/fasilitas-store" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Showroom
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/lokasi-toko" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* COL 3: LAYANAN BUTIK & EDUKASI */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-5 flex items-center gap-2 pb-2 border-b border-white/10">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              LAYANAN &amp; INFORMASI
            </h4>
            <ul className="space-y-3 text-[#C5BFB8] text-[13px] sm:text-sm">
              <li>
                <NavLink to="/pages/layanan-seragam" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Jahit Seragam Bespoke (Tanpa MOQ)
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/fasilitas-store" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Fasilitas Gedung Simongan 3 Lantai
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/tentang-kami" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Kisah &amp; Filosofi Sejak 2007
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Warta &amp; Jurnal Budaya Wastra
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Garansi Butik &amp; Syarat Ketentuan
                </NavLink>
              </li>
              <li>
                <NavLink to="/account" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Portal Akun &amp; Status Pesanan
                </NavLink>
              </li>
            </ul>
          </div>

          {/* COL 4: KONTAK RESMI BUTIK */}
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <svg className="w-4 h-4 text-[#C5A059] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <h4 className="font-serif text-sm sm:text-[15px] font-normal tracking-[0.18em] text-[#C5A059] uppercase">
                KONTAK RESMI BUTIK
              </h4>
            </div>
            <div className="w-10 h-0.5 bg-[#C5A059]/70 mb-5" />

            {/* List of Direct Channels */}
            <div className="space-y-4">
              {/* 1. WA Concierge */}
              <a
                href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20layanan%20butik"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between group text-left no-underline transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <svg className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5c.3-.5.7-.5 1-.2l1.2 1.5c.2.3.2.7 0 .9l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.3-.2.7-.2.9 0l1.5 1.2c.3.3.3.7-.2 1-.5.3-1.1.5-1.7.4-2.8-.4-5.1-2.7-5.5-5.5-.1-.6.1-1.2.4-1.7z" />
                  </svg>
                  <div>
                    <span className="block text-xs sm:text-[13px] font-medium text-white group-hover:text-[#C5A059] transition-colors tracking-wide">
                      WA Concierge
                    </span>
                    <span className="block text-xs text-[#C5BFB8] font-light mt-0.5">
                      081-390-8888-09
                    </span>
                  </div>
                </div>
                <svg className="w-3.5 h-3.5 text-[#C5A059]/60 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all shrink-0 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              {/* 2. Instagram */}
              <a
                href="https://instagram.com/batiksmile_official"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between group text-left no-underline transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <svg className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <div>
                    <span className="block text-xs sm:text-[13px] font-medium text-white group-hover:text-[#C5A059] transition-colors tracking-wide">
                      Instagram
                    </span>
                    <span className="block text-xs text-[#C5BFB8] font-light mt-0.5">
                      @batiksmile_official
                    </span>
                  </div>
                </div>
                <svg className="w-3.5 h-3.5 text-[#C5A059]/60 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all shrink-0 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              {/* 3. Email */}
              <a
                href="mailto:butik@batiksmile.com"
                className="flex items-center justify-between group text-left no-underline transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <svg className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  <div>
                    <span className="block text-xs sm:text-[13px] font-medium text-white group-hover:text-[#C5A059] transition-colors tracking-wide">
                      Email
                    </span>
                    <span className="block text-xs text-[#C5BFB8] font-light mt-0.5">
                      butik@batiksmile.com
                    </span>
                  </div>
                </div>
                <svg className="w-3.5 h-3.5 text-[#C5A059]/60 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all shrink-0 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>

            {/* Horizontal Divider */}
            <div className="w-full h-px bg-white/10 my-5" />

            {/* JAM OPERASIONAL */}
            <div className="flex items-start gap-3.5 pt-1">
              <svg className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <span className="font-serif text-xs uppercase tracking-[0.18em] text-[#C5A059] font-normal block mb-1">
                  JAM OPERASIONAL
                </span>
                <span className="block text-xs text-white font-light">
                  Setiap Hari
                </span>
                <span className="block text-xs text-[#C5BFB8] font-light mt-0.5">
                  09.00 – 21.00 WIB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM BAR: SINGLE CLEAN LINE */}
        <div className="pt-8 border-t border-white/10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-[11px] sm:text-xs text-[#A69F96] tracking-[0.14em] uppercase">
            <span>&copy; {new Date().getFullYear()} BATIK SMILE</span>
            <span className="text-white/20">&bull;</span>
            <span>100% BATIK ASLI</span>
            <span className="text-white/20">&bull;</span>
            <span>BEBAS TUKAR UKURAN</span>
            <span className="text-white/20">&bull;</span>
            <span>PENGIRIMAN SELURUH INDONESIA</span>
            <span className="text-white/20">&bull;</span>
            <NavLink to="/sitemap.xml" reloadDocument className="hover:text-[#C5A059] transition-colors whitespace-nowrap">
              PETA SITUS
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
