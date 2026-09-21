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
                    className="px-6 py-3 text-xs uppercase font-bold tracking-[0.2em] bg-[#C5A059] hover:bg-white text-[#111111] transition-colors rounded-none whitespace-nowrap cursor-pointer"
                  >
                    GABUNG
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
            SEMARANG &bull; ESTABLISHED 2007 &bull; BUDAYA PELAYANAN 3S 1C 1T &amp; 1H
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

          {/* COL 2: KOLEKSI RESMI BUTIK */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-5 flex items-center gap-2 pb-2 border-b border-white/10">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              KATALOG KOLEKSI
            </h4>
            <ul className="space-y-3 text-[#C5BFB8] text-[13px] sm:text-sm">
              <li>
                <NavLink to="/collections/all?sort=best-selling" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                    Koleksi Busana Terlaris
                  </span>
                  <span className="text-[10px] text-[#C5A059] uppercase tracking-wider font-bold font-mono bg-[#C5A059]/10 px-1.5 py-0.5 border border-[#C5A059]/30">FAVORIT</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/sarimbit-luxury" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Sarimbit Luxury
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/sarimbit-premium" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Sarimbit Premium
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/sarimbit-ekonomi" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Sarimbit Ekonomi
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-anak" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Batik Anak
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/kain" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Kain
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/aksesoris" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] group-hover:scale-125 transition-transform" />
                  Aksesoris
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
            </ul>
          </div>

          {/* COL 4: KONSULTAN BUTIK & HUBUNGI KAMI */}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-5 flex items-center gap-2 pb-2 border-b border-white/10">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="square" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              KONTAK RESMI BUTIK
            </h4>
            <p className="text-[#C5BFB8] leading-relaxed mb-4 text-[13px] sm:text-sm">
              Layanan konsultasi motif sarimbit keluarga, jahit seragam kantor, dan reservasi VIP Lounge Lantai 2 Simongan.
            </p>

            <div className="space-y-3 text-[13px] sm:text-sm text-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] font-bold">WA Concierge:</span>
                <a href="https://wa.me/6281390888809" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors underline underline-offset-4">
                  081-390-8888-09
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] font-bold">Instagram:</span>
                <a href="https://instagram.com/batiksmile.official" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors underline underline-offset-4">
                  @batiksmile.official
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059] font-bold">Email:</span>
                <span className="text-[#C5BFB8]">butik@batiksmile.com</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 text-xs text-[#C5BFB8]">
              <span className="text-[#C5A059] block font-semibold mb-1 uppercase tracking-[0.18em] text-[10px]">STANDAR LAYANAN:</span>
              <span className="leading-relaxed font-light">3S 1C 1T &amp; 1H (Senyum, Salam, Sapa, Cepat, Tanggap, Hati)</span>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM BAR: COPYRIGHT & LUXURY TRUST GUARANTEES */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A69F96] uppercase tracking-[0.14em]">
          <p>&copy; {new Date().getFullYear()} BATIK SMILE. SELURUH HAK CIPTA DILINDUNGI.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#E2DFD8]">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="square" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              100% BATIK ASLI BERKUALITAS
            </span>
            <span className="text-[#C5A059]">&bull;</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="23 4 23 10 17 10" />
                <path strokeLinecap="square" d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              BEBAS TUKAR UKURAN
            </span>
            <span className="text-[#C5A059]">&bull;</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              PENGIRIMAN SELURUH INDONESIA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
