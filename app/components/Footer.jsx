import React, { useState } from 'react';
import { NavLink, useFetcher } from 'react-router';
import { CartForm } from '@shopify/hydrogen';

/**
 * Master Footer: Quiet Luxury Nusantara
 * - Brand: BATIK SMILE (without 'Nusantara')
 * - High-legibility typography hierarchy (no micro-fonts < 11px)
 * - Official Showroom locations (Batik Smile Sampokong & Batik Smile Sukun)
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
                <strong className="text-white font-medium text-sm block">Batik Smile Sampokong</strong>
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

              <div className="border-l border-[#C5A059] pl-3.5 space-y-1">
                <strong className="text-white font-medium text-sm block">Batik Smile Sukun</strong>
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
                  <svg className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.84 11.64c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.59.13-.17.26-.68.86-.83 1.03-.15.17-.31.19-.57.06-.26-.13-1.1-.41-2.09-1.3-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45-.15-.01-.33-.01-.5-.01-.17 0-.46.06-.7.33-.24.26-.93.91-.93 2.22s.95 2.58 1.08 2.76c.13.17 1.87 2.85 4.53 4 2.66 1.15 2.66.77 3.14.72.48-.04 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.06-.11-.23-.17-.49-.3z" />
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

        {/* 4. BOTTOM BAR: PROFESSIONAL COPYRIGHT & LEGAL COMPLIANCE */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#A69F96] tracking-[0.12em] uppercase">
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} BATIK SMILE. SELURUH HAK CIPTA DILINDUNGI.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
            <NavLink to="/policies/privacy-policy" className="hover:text-[#C5A059] transition-colors whitespace-nowrap">
              KEBIJAKAN PRIVASI
            </NavLink>
            <span className="text-white/20">|</span>
            <NavLink to="/policies/terms-of-service" className="hover:text-[#C5A059] transition-colors whitespace-nowrap">
              SYARAT &amp; KETENTUAN
            </NavLink>
            <span className="text-white/20">|</span>
            <NavLink to="/policies/refund-policy" className="hover:text-[#C5A059] transition-colors whitespace-nowrap">
              GARANSI &amp; PENGEMBALIAN
            </NavLink>
            <span className="text-white/20">|</span>
            <NavLink to="/sitemap.xml" reloadDocument className="hover:text-[#C5A059] transition-colors whitespace-nowrap">
              PETA SITUS
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
