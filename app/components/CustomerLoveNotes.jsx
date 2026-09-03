import React, { useState } from 'react';

const DEFAULT_LOVE_NOTES = [
  {
    id: 1,
    quote:
      'Pesan seragam sarimbit untuk 18 anggota keluarga besar di resepsi putri kami. Jahitan sangat rapi, motif nyambung di bagian kancing dan saku, dan furingnya adem seharian di gedung. Pelayanan mbak-mbak di butik Simongan sangat ramah dan sabar.',
    author: 'DR. H. BAMBANG PRIYONO & KELUARGA',
    location: 'SEMARANG • RESEPSI PERNIKAHAN',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Kain sutra tulis mahakarya pesanan saya datang dengan kotak kayu ukir yang sangat megah. Motifnya eksklusif tidak ada kembarannya. Konsultasi ukuran lewat WhatsApp sangat tanggap dan profesional. Matur nuwun sanget Batik Smile.',
    author: 'IBU RADEN AJENG SAVITRI',
    location: 'JAKARTA SELATAN • KOLEKTOR BATIK',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Sudah 3 tahun memesan seragam batik untuk divisi medis rumah sakit kami tanpa minimal order yang memberatkan. Ukurannya selalu presisi dan bahannya awet dicuci berkali-kali tidak luntur. Benar-benar standar butik.',
    author: 'KOORDINATOR PENGADAAN INSTANSI MEDIS',
    location: 'JAWA TENGAH • SERAGAM INSTANSI',
    rating: 5,
  },
];

/**
 * CustomerLoveNotes: Engrasia Archetype Social Proof Carousel
 * "LOVE NOTES FROM OUR CUSTOMER" with Graceful Fallback
 *
 * @param {{
 *   testimonials?: any[];
 * }} props
 */
export function CustomerLoveNotes({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const notes =
    testimonials && testimonials.length > 0 ? testimonials : DEFAULT_LOVE_NOTES;
  const currentNote = notes[activeIndex] || notes[0];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FAF8F5] border-b border-[#E2DFD8]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow & Title */}
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#9E7D3B] font-semibold block mb-2">
          TESTIMONI RESMI BUTIK
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] tracking-wide font-normal mb-8 leading-tight">
          Kisah &amp; Apresiasi Pelanggan
        </h2>

        {/* 5-Star Rating Icons */}
        <div className="flex justify-center items-center gap-1 mb-8 text-[#C5A059]">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Quote in Cormorant Garamond Serif Italic */}
        <blockquote className="font-serif italic text-lg sm:text-2xl lg:text-3xl text-[#111111] leading-relaxed mb-8 max-w-3xl mx-auto font-light">
          &ldquo;{currentNote.quote || currentNote?.text?.value}&rdquo;
        </blockquote>

        {/* Author & Location Attribution */}
        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#111111] mb-1">
          {currentNote.author || currentNote?.author_name?.value}
        </div>
        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#7C3F1D]">
          {currentNote.location || currentNote?.city_occasion?.value}
        </div>

        {/* Carousel Pagination Dots (Zero-radius bars) */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {notes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Lihat ulasan ${idx + 1}`}
              className={`h-1 transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? 'w-8 bg-[#111111]' : 'w-2.5 bg-[#E2DFD8] hover:bg-[#C5A059]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
