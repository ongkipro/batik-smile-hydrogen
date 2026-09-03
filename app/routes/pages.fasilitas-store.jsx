import React from 'react';
import { Link } from 'react-router';

export const meta = () => {
  return [
    { title: 'Fasilitas Showroom 3 Lantai Simongan — Batik Smile Semarang' },
    {
      name: 'description',
      content:
        'Jelajahi pengalaman belanja offline di Gedung 3 Lantai Batik Smile Simongan Semarang. Lantai 1 RTW, Lantai 2 Galeri Kain Tulis & VIP Lounge, Lantai 3 Oleh-oleh & Kerajinan.',
    },
  ];
};

export default function FasilitasStorePage() {
  const floors = [
    {
      level: 'LANTAI 1',
      title: 'Ready-to-Wear Eksklusif & Private Fitting Room',
      desc: 'Menampilkan koleksi busana batik siap pakai pria, wanita, dan anak-anak. Dilengkapi dengan deretan kamar pas (fitting room) luas ber-AC dan cermin full-length untuk kenyamanan mencoba busana keluarga.',
      highlights: [
        'Kemeja pria lapis furing hero adem (Slim Fit & Regular)',
        'Blus batik wanita, outer tenun, tunik, dan gamis modern',
        'Koleksi sarimbit keluarga siap pakai untuk jamuan resmi',
        'Ruang ganti privat keluarga ber-AC',
      ],
      image: '/brand/showroom/showroom_mannequins_display.jpeg',
    },
    {
      level: 'LANTAI 2',
      title: 'Galeri Kain Batik Tulis & VIP Consultation Lounge',
      desc: 'Pusat koleksi mahakarya kain batik lembaran. Mulai dari batik tulis halus sutra ATBM, dobby timbul bertekstur, hingga batik cap primisima. Dilengkapi sofa VIP lounge untuk konsultasi rancang busana dan pengukuran seragam.',
      highlights: [
        'Ribuan lembaran kain batik tulis asli Pekalongan, Solo, & Cirebon',
        'Koleksi sutra ATBM eksklusif bersertifikat keaslian',
        'Sofa lounge santai untuk konsultasi desain seragam keluarga',
        'Layanan ukur badan di tempat oleh tenaga ahli berpengalaman',
      ],
      image: '/brand/showroom/showroom_interior_textiles.jpeg',
    },
    {
      level: 'LANTAI 3',
      title: 'Sentra Kerajinan Etnik & Oleh-oleh Khas Semarang',
      desc: 'Lantai khusus cinderamata dan kerajinan tangan khas Jawa Tengah. Menyediakan berbagai aksesoris pelengkap busana adat seperti blangkon, bros etnik tembaga bakar, kalung batu alam, dan kerajinan rotan.',
      highlights: [
        'Aksesoris etnik pelengkap kebaya dan beskap',
        'Blangkon gaya Surakarta dan Yogyakarta',
        'Tas anyaman rotan dan dompet batik eksklusif',
        'Cinderamata khas untuk buah tangan sanak saudara',
      ],
      image: '/brand/showroom/showroom_crafts_souvenirs.jpeg',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9E7D3B] font-semibold block mb-2">
            FLAGSHIP STORE SEMARANG &bull; 3 LANTAI
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] font-normal tracking-wide">
            Pengalaman Belanja Gedung 3 Lantai
          </h1>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
            Kunjungi butik flagship kami di Jl. Simongan Raya No. 109, Semarang. Gedung 3 lantai yang didesain secara khusus untuk memberikan kenyamanan berbelanja busana batik Nusantara bagi seluruh keluarga.
          </p>
        </div>

        {/* Building Exterior Showcase Banner */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#111111] border border-[#E2DFD8] overflow-hidden mb-20">
          <img
            src="/brand/showroom/showroom_facade_building.jpeg"
            alt="Gedung Butik Batik Smile Simongan Semarang"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              SEMARANG FLAGSHIP STORE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Gedung Butik Batik Smile Simongan 109
            </h2>
            <p className="text-xs text-[#E2DFD8] font-light mt-1">
              Buka Setiap Hari: 09.00 - 21.00 WIB &bull; Area Parkir Luas &bull; Mushola &amp; Akses Nyaman
            </p>
          </div>
        </div>

        {/* 3 Floors Detailed Breakdown */}
        <div className="space-y-20 mb-20">
          {floors.map((floor, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
                  {floor.level}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal mb-4">
                  {floor.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed mb-6">
                  {floor.desc}
                </p>

                <div className="space-y-2.5 border-t border-[#E2DFD8] pt-6 mb-6">
                  {floor.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-[#1C1C1C]">
                      <span className="w-1.5 h-1.5 bg-[#C5A059] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="aspect-[4/3] bg-[#EFECE6] border border-[#E2DFD8] overflow-hidden group">
                  <img
                    src={floor.image}
                    alt={floor.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Showroom Amenities Grid */}
        <div className="bg-white p-8 sm:p-12 border border-[#E2DFD8] mb-16">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-1">
              KENYAMANAN KELUARGA
            </span>
            <h3 className="font-serif text-2xl text-[#111111] font-normal">
              Fasilitas Pendukung Butik
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-xs">
            <div className="p-4 bg-[#FAF8F5] border border-[#E2DFD8]">
              <span className="text-xl block mb-2">🚗</span>
              <strong className="block text-[#111111] mb-1">Area Parkir Luas</strong>
              <p className="text-[11px] text-[#5A5550]">Aman untuk mobil pribadi maupun rombongan bus.</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] border border-[#E2DFD8]">
              <span className="text-xl block mb-2">❄️</span>
              <strong className="block text-[#111111] mb-1">Full AC Seluruh Lantai</strong>
              <p className="text-[11px] text-[#5A5550]">Suhu ruangan sejuk nyaman untuk fitting berlama-lama.</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] border border-[#E2DFD8]">
              <span className="text-xl block mb-2">🕌</span>
              <strong className="block text-[#111111] mb-1">Mushola Bersih</strong>
              <p className="text-[11px] text-[#5A5550]">Fasilitas ibadah lengkap bagi pengunjung.</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] border border-[#E2DFD8]">
              <span className="text-xl block mb-2">💳</span>
              <strong className="block text-[#111111] mb-1">Pembayaran Lengkap</strong>
              <p className="text-[11px] text-[#5A5550]">Menerima QRIS, Debit, Kartu Kredit, dan Transfer.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="bg-[#111111] text-white p-8 sm:p-12 text-center border border-[#1C1C1C]">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-3">
            Rencanakan Kunjungan Anda Hari Ini
          </h3>
          <p className="text-xs text-[#E2DFD8] max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Tim konsultan kami siap menyambut kedatangan Anda dan keluarga dengan senyum ramah dan pelayanan terbaik.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pages/lokasi-toko"
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-white text-[#111111] text-[11px] uppercase font-semibold tracking-[0.18em] transition-colors"
            >
              PETUNJUK ARAH &amp; GOOGLE MAPS &rarr;
            </Link>
            <a
              href="https://wa.me/6281390888809?text=Halo%20Batik%20Smile%2C%20saya%20ingin%20jadwal%20fitting%20keluarga"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 text-white text-[11px] uppercase font-semibold tracking-[0.18em] hover:bg-white/10 hover:border-white transition-colors"
            >
              RESERVASI FITTING VIA WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
