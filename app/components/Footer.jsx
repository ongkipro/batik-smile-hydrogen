import React from 'react';
import { NavLink } from 'react-router';
import { BatikDivider } from './BatikOrnaments';

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white pt-16 pb-24 lg:pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Heritage Statement */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white block mb-1">
            BATIK SMILE
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
            Mahakarya Busana Nusantara Sejak 2007
          </span>
          <BatikDivider variant="gold" className="my-4 opacity-40" />
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-xs">
          {/* Col 1: Brand & Showroom */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#C5A059] mb-4">
              Butik &amp; Showroom
            </h4>
            <p className="text-neutral-400 leading-relaxed mb-3">
              <strong>Semarang Flagship:</strong><br />
              Jl. Majapahit No. 128, Gayamsari, Semarang<br />
              Buka: 09.00 - 21.00 WIB
            </p>
            <p className="text-neutral-400 leading-relaxed">
              <strong>Solo Gallery:</strong><br />
              Kawasan Laweyan Heritage, Surakarta<br />
              Buka: 09.00 - 20.00 WIB
            </p>
          </div>

          {/* Col 2: Koleksi Unggulan */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#C5A059] mb-4">
              Koleksi Unggulan
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <NavLink to="/collections/sarimbit-mahakarya-heritage" className="hover:text-white transition-colors">
                  Sarimbit Mahakarya (Sutra Prada)
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/sarimbit-signature-elegance" className="hover:text-white transition-colors">
                  Signature Elegance (Tenun Dobby)
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/sarimbit-essential-daily" className="hover:text-white transition-colors">
                  Essential Daily (Katun Primisima)
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-wanita" className="hover:text-white transition-colors">
                  Busana Batik Wanita &amp; Gamis
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/batik-pria" className="hover:text-white transition-colors">
                  Kemeja Batik Pria Furing Halus
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Kustom & Bantuan */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#C5A059] mb-4">
              Layanan &amp; Bantuan
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <NavLink to="/pages/layanan-seragam" className="hover:text-white transition-colors">
                  Jahit Kustom &amp; Seragam Kantor/Keluarga
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/tentang-kami" className="hover:text-white transition-colors">
                  Filosofi &amp; Cerita Butik
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/lokasi-toko" className="hover:text-white transition-colors">
                  Petunjuk Arah Showroom
                </NavLink>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Batik%20Smile%2C%20saya%20butuh%20panduan%20ukuran"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Panduan Ukuran (Size Guide) &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Layanan Pelanggan & WA */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-[#C5A059] mb-4">
              Konsultan Batik
            </h4>
            <p className="text-neutral-400 leading-relaxed mb-4">
              Konsultasikan kebutuhan sarimbit pernikahan, seragam keluarga, atau pengiriman kilat
              dengan tim konsultan kami.
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Batik%20Smile"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              WhatsApp Customer Care
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Marks */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Batik Smile Nusantara. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Batik Asli Indonesia</span>
            <span>•</span>
            <span>100% Produk Berkualitas</span>
            <span>•</span>
            <span>Garansi Retur &amp; Tukar Size</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
