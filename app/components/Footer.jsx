import React from 'react';
import { NavLink } from 'react-router';

/**
 * Footer: Quiet Luxury Nusantara Master Footer
 * Official Showroom locations (Simongan 109 & Banyumanik 23), WhatsApp 081-390-8888-09
 */
export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-20 border-t border-[#1C1C1C]">
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
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              BUTIK &amp; SHOWROOM RESMI
            </h4>
            <div className="space-y-4 text-[#A69F96] leading-relaxed text-[11px]">
              <div>
                <strong className="text-white block font-medium">Flagship Store (Gedung 3 Lantai):</strong>
                Jl. Simongan Raya No. 109, Pamularsih, Semarang<br />
                <span className="text-[#C5A059]">Buka Setiap Hari: 09.00 - 21.00 WIB</span>
              </div>
              <div>
                <strong className="text-white block font-medium">Cabang Banyumanik:</strong>
                Jl. Sukun Raya No. 23, Banyumanik, Semarang<br />
                <span className="text-[#C5A059]">Buka Setiap Hari: 09.00 - 21.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Col 2: Katalog Pilihan */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              KOLEKSI UNGGULAN
            </h4>
            <ul className="space-y-2.5 text-[#A69F96] text-[11px]">
              <li>
                <NavLink to="/collections/sarimbit-exclusive" className="hover:text-white transition-colors">
                  Sarimbit Keluarga (3 Kasta)
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/jarik-kain-batik" className="hover:text-white transition-colors">
                  Kain Batik &amp; Jarik Nusantara
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-wanita" className="hover:text-white transition-colors">
                  Busana Batik Wanita (Blus &amp; Gamis)
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-pria" className="hover:text-white transition-colors">
                  Kemeja Batik Pria Lapis Furing
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-anak" className="hover:text-white transition-colors">
                  Koleksi Batik Anak Nusantara
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan & Informasi */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              LAYANAN BUTIK &amp; O2O
            </h4>
            <ul className="space-y-2.5 text-[#A69F96] text-[11px]">
              <li>
                <NavLink to="/pages/layanan-seragam" className="hover:text-white transition-colors">
                  Pemesanan Seragam (Tanpa Minimal Order)
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/fasilitas-store" className="hover:text-white transition-colors">
                  Fasilitas Gedung Simongan 3 Lantai
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/tentang-kami" className="hover:text-white transition-colors">
                  Kisah &amp; Filosofi Batik Smile Sejak 2007
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/lokasi-toko" className="hover:text-white transition-colors">
                  Petunjuk Arah Google Maps
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/refund-policy" className="hover:text-white transition-colors">
                  Kebijakan Garansi &amp; Tukar Ukuran
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Concierge & WhatsApp */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">
              KONSULTAN BATIK RESMI
            </h4>
            <p className="text-[#A69F96] leading-relaxed mb-4 text-[11px]">
              Konsultasikan ukuran sarimbit keluarga atau pemesanan seragam dinas Anda langsung dengan tim konsultan kami.
            </p>
            <a
              href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20konsultasi%20batik"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 bg-[#C5A059] hover:bg-white text-[#111111] font-semibold text-[10px] tracking-[0.18em] uppercase transition-colors text-center block"
            >
              WHATSAPP: 081-390-8888-09
            </a>
            <div className="mt-3 text-[10px] text-[#5A5550]">
              Instagram: @batiksmile.official
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Guarantees */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#5A5550] uppercase tracking-[0.14em]">
          <p>&copy; {new Date().getFullYear()} BATIK SMILE NUSANTARA. SELURUH HAK CIPTA DILINDUNGI.</p>
          <div className="flex items-center gap-3 text-[#A69F96]">
            <span>100% BATIK ASLI INDONESIA</span>
            <span>&bull;</span>
            <span>BEBAS TUKAR UKURAN</span>
            <span>&bull;</span>
            <span>BEBAS ONGKIR NUSANTARA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
