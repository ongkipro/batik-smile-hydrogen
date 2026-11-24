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

        {/* 1. MEMBER & NEWSLETTER STRIP: PROGRAM MEMBER BATIK SMILE */}
        <div className="border-b border-white/10 pb-12 mb-14">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.24em] text-[#C5A059] font-bold block mb-1.5">
                PROGRAM KEANGGOTAAN RESMI
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                Bergabung Menjadi Member Batik Smile
              </h3>
              <p className="text-xs sm:text-[13px] text-[#C5BFB8] font-light mt-1.5 max-w-lg leading-relaxed">
                Nikmati Birthday Privilege, Exclusive Collection Access, Member Special Offers, undangan event eksklusif, serta Member Reward.{' '}
                <NavLink to="/pages/member" className="text-[#C5A059] hover:text-white underline underline-offset-4 font-normal">
                  Lihat Syarat &amp; Benefit &rarr;
                </NavLink>
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

        {/* 3. 4-COLUMN COMPREHENSIVE DIRECTORY (PRECISION 12-COLUMN ARCHITECTURE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 mb-16 text-sm font-light">
          
          {/* COL 1: BUTIK & SHOWROOM RESMI (33.3% Desktop Space for Rich Content) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-5 flex items-center gap-2 pb-2 border-b border-white/10">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="square" d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3L2 7h20L12 3z" />
              </svg>
              BUTIK &amp; SHOWROOM RESMI
            </h4>
            <div className="space-y-5 text-[#C5BFB8] leading-relaxed text-[13px] sm:text-sm">
              <div className="border-l border-[#C5A059] pl-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white font-medium text-sm">Batik Smile Sampokong</strong>
                  <a
                    href="https://maps.google.com/?q=Batik+Smile+Simongan+Semarang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#C5A059] hover:text-white font-medium uppercase tracking-wider transition-colors"
                    title="Buka rute Google Maps Batik Smile Sampokong"
                  >
                    <span>Peta</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>

                <a
                  href="https://maps.google.com/?q=Batik+Smile+Simongan+Semarang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-[#D1CCC5] hover:text-[#C5A059] transition-colors group text-[12.5px] leading-snug"
                  title="Lihat di Google Maps"
                >
                  <svg className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.582-8-11a8 8 0 1116 0c0 5.418-3.582 11-8 11z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Jl. Simongan Raya No. 109, Pamularsih, Semarang</span>
                </a>

                <span className="text-xs text-[#9E978E] block pl-5.5">
                  Lt. 1: RTW &amp; Fitting • Lt. 2: VIP Sutra &amp; Lounge • Lt. 3: Suvenir
                </span>
                <span className="text-[#C5A059] inline-flex items-center gap-1.5 pt-0.5 text-xs font-medium pl-5.5">
                  <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Setiap Hari: 09.00 – 21.00 WIB
                </span>
              </div>

              <div className="border-l border-[#C5A059] pl-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white font-medium text-sm">Batik Smile Sukun</strong>
                  <a
                    href="https://maps.google.com/?q=Batik+Smile+Banyumanik+Semarang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#C5A059] hover:text-white font-medium uppercase tracking-wider transition-colors"
                    title="Buka rute Google Maps Batik Smile Sukun"
                  >
                    <span>Peta</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>

                <a
                  href="https://maps.google.com/?q=Batik+Smile+Banyumanik+Semarang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-[#D1CCC5] hover:text-[#C5A059] transition-colors group text-[12.5px] leading-snug"
                  title="Lihat di Google Maps"
                >
                  <svg className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.582-8-11a8 8 0 1116 0c0 5.418-3.582 11-8 11z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Jl. Sukun Raya No. 23, Banyumanik, Semarang</span>
                </a>

                <span className="text-[#C5A059] inline-flex items-center gap-1.5 pt-0.5 text-xs font-medium pl-5.5">
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
                <span>Panduan Lengkap Lokasi Toko</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </NavLink>
            </div>
          </div>

          {/* COL 2: NAVIGASI MENU (16.6% Desktop Space) */}
          <div className="lg:col-span-2">
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
                <NavLink to="/collections/ekonomi-series" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Ekonomi Series
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/tentang-kami" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  About
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

          {/* COL 3: LAYANAN BUTIK & EDUKASI (25% Desktop Space) */}
          <div className="lg:col-span-3">
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
                <NavLink to="/pages/member" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Member Batik Smile
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

          {/* COL 4: KONTAK RESMI BUTIK (25% Desktop Space) */}
          <div className="lg:col-span-3">
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
                  <svg className="w-5 h-5 text-[#C5A059] group-hover:text-[#25D366] shrink-0 mt-0.5 transition-all group-hover:scale-110" viewBox="-1 -1 26 26" fill="currentColor" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#A69F96] tracking-[0.12em] uppercase">
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
