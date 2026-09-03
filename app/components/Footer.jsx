import React from 'react';
import { NavLink } from 'react-router';

/**
 * Footer: Quiet Luxury Nusantara Master Footer
 * Official Showroom locations (Simongan 109 & Banyumanik 23), WhatsApp 081-390-8888-09
 */
export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-[max(6rem,calc(env(safe-area-inset-bottom)+5.5rem))] lg:pb-20 border-t border-[#1C1C1C]">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Brand Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.16em] text-white block mb-1">
            BATIK SMILE NUSANTARA
          </span>
          <span className="text-[9px] uppercase tracking-[0.24em] text-[#C5A059] font-medium">
            SEMARANG &bull; ESTABLISHED 2007 &bull; BUDAYA 3S 1C 1T &amp; 1H
          </span>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 text-xs font-light">
          {/* Col 1: Verified Showrooms */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 3L2 7h20L12 3z" />
              </svg>
              BUTIK &amp; SHOWROOM RESMI
            </h4>
            <div className="space-y-4 text-[#A69F96] leading-relaxed text-[11px]">
              <div className="border-l border-[#C5A059]/40 pl-3">
                <strong className="text-white block font-medium">Flagship Store (Gedung 3 Lantai):</strong>
                Jl. Simongan Raya No. 109, Pamularsih, Semarang<br />
                <span className="text-[#C5A059] inline-flex items-center gap-1.5 mt-1 text-[10px]">
                  <svg className="w-3 h-3 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Setiap Hari: 09.00 - 21.00 WIB
                </span>
              </div>
              <div className="border-l border-[#C5A059]/40 pl-3">
                <strong className="text-white block font-medium">Cabang Semarang Atas:</strong>
                Jl. Sukun Raya No. 23, Banyumanik, Semarang<br />
                <span className="text-[#C5A059] inline-flex items-center gap-1.5 mt-1 text-[10px]">
                  <svg className="w-3 h-3 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Setiap Hari: 09.00 - 21.00 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Katalog Pilihan */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              KOLEKSI UNGGULAN
            </h4>
            <ul className="space-y-2.5 text-[#A69F96] text-[11px]">
              <li>
                <NavLink to="/collections/sarimbit-exclusive" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Sarimbit Keluarga (3 Kasta)
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/jarik-kain-batik" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Kain Batik &amp; Jarik Nusantara
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-wanita" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Busana Batik Wanita (Blus &amp; Gamis)
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-pria" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Kemeja Batik Pria Lapis Furing
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-anak" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Koleksi Batik Anak Nusantara
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan & Informasi */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              LAYANAN BUTIK &amp; O2O
            </h4>
            <ul className="space-y-2.5 text-[#A69F96] text-[11px]">
              <li>
                <NavLink to="/pages/layanan-seragam" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Pemesanan Seragam (Tanpa Minimal Order)
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/fasilitas-store" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Fasilitas Gedung Simongan 3 Lantai
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/tentang-kami" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Kisah &amp; Filosofi Batik Smile Sejak 2007
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/lokasi-toko" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Petunjuk Arah Google Maps
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-[#C5A059] group-hover:scale-150 transition-transform" />
                  Kebijakan &amp; Garansi Resmi Butik
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Concierge & WhatsApp */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              KONSULTAN BATIK RESMI
            </h4>
            <p className="text-[#A69F96] leading-relaxed mb-4 text-[11px]">
              Konsultasikan motif sarimbit keluarga, ketersediaan bahan sutra ATBM, atau seragam dinas Anda dengan konsultan butik kami.
            </p>
            <a
              href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20batik"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C5A059] !text-white hover:!text-[#111111] font-semibold text-[10px] tracking-[0.18em] uppercase transition-colors text-center flex items-center justify-center gap-2 border border-[#C5A059]/60 shadow-sm"
            >
              <svg className="w-3.5 h-3.5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>WHATSAPP: 081-390-8888-09</span>
            </a>
            <div className="mt-3.5 flex items-center justify-between text-[10px] text-[#A69F96] border-t border-white/10 pt-3">
              <a
                href="https://instagram.com/batiksmile.official"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>@batiksmile.official</span>
              </a>
              <span className="text-[#C5A059] font-medium tracking-wider">SEMARANG</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Guarantees with Luxury SVG Badges */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#A69F96] uppercase tracking-[0.14em]">
          <p>&copy; {new Date().getFullYear()} BATIK SMILE NUSANTARA. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[9px] text-[#E2DFD8]">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              100% BATIK ASLI
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              BEBAS TUKAR UKURAN
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              BEBAS ONGKIR NUSANTARA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
