import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { Breadcrumb } from '~/components/Breadcrumb';
import { generatePageMeta } from '~/lib/seo';
import { JsonLd } from '~/components/JsonLd';
import { generateBreadcrumbSchema } from '~/lib/schema';

export const meta = () => {
  return generatePageMeta({
    handle: 'member',
    customTitle: 'Member Batik Smile — Syarat & Keuntungan Member | Batik Smile',
    customDescription:
      'Bergabung menjadi Member Batik Smile dan nikmati Birthday Privilege, Exclusive Collection Access, Member Special Offers, Exclusive Event Invitation, serta Member Reward.',
  });
};

/**
 * @param {import('./+types/pages.member').Route.LoaderArgs} args
 */
export async function loader({ context }) {
  const data = await context.storefront
    .query(MEMBER_PROGRAM_QUERY, {
      cache: context.storefront.CacheShort(),
    })
    .catch(() => null);

  const fields = Object.fromEntries(
    (data?.metaobject?.fields || []).map((f) => [f.key, f.value]),
  );

  let requirements = MEMBER_REQUIREMENTS;
  if (fields.requirements) {
    try {
      const parsed = JSON.parse(fields.requirements);
      if (Array.isArray(parsed) && parsed.length > 0) requirements = parsed;
    } catch {
      // keep fallback
    }
  }

  let benefits = MEMBER_BENEFITS;
  if (fields.benefits) {
    try {
      const parsed = JSON.parse(fields.benefits);
      if (Array.isArray(parsed) && parsed.length > 0) {
        benefits = parsed.map((entry, idx) => {
          const [title, ...rest] = String(entry).split('|');
          return {
            number: String(idx + 1),
            title: (title || '').trim(),
            description: rest.join('|').trim(),
          };
        });
      }
    } catch {
      // keep fallback
    }
  }

  return { requirements, benefits };
}

const MEMBER_REQUIREMENTS = [
  'Minimum pembelanjaan Rp 500.000 (dalam 1 nota transaksi)',
  'Follow IG Batik Smile dan TikTok Batik Smile (akun resmi)',
  'Mengisi formulir pendaftaran (nama lengkap, nomor WA, email)',
  'Mengisi tanggal lahir (untuk birthday privilege)',
  'Menyetujui informasi produksi (agar bisa menerima update koleksi dan promo)',
  'Setiap melakukan transaksi dan pembelanjaan selalu memberikan ulasan / rating pada GMaps toko kami',
  'Mengunggah foto dan video produk Batik Smile serta tag akun resmi IG kami',
  'Mengikuti program dan event exclusive Batik Smile',
];

const MEMBER_BENEFITS = [
  {
    number: '1',
    title: 'Birthday Privilege',
    description: 'Hadiah / voucher spesial di bulan ulang tahun',
  },
  {
    number: '2',
    title: 'Exclusive Collection Access',
    description: 'Akses lebih awal ke koleksi terbaru',
  },
  {
    number: '3',
    title: 'Member Special Offers',
    description: 'Promo dan penawaran khusus member',
  },
  {
    number: '4',
    title: 'Exclusive Event Invitation',
    description: 'Undangan workshop, trunk show, dan event Batik Smile',
  },
  {
    number: '5',
    title: 'Member Reward',
    description: 'Kesempatan memperoleh reward dari transaksi dan aktivitas member',
  },
];

export default function MemberPage() {
  const loaderData = useLoaderData();
  const requirements = loaderData?.requirements || MEMBER_REQUIREMENTS;
  const benefits = loaderData?.benefits || MEMBER_BENEFITS;
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    birthDate: '',
    agreed: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = [
      'Halo Batik Smile, saya ingin mendaftar menjadi *Member Batik Smile*:',
      `- Nama Lengkap: ${formData.fullName}`,
      `- Nomor WA: ${formData.whatsapp}`,
      `- Email: ${formData.email}`,
      `- Tanggal Lahir (Birthday Privilege): ${formData.birthDate}`,
      `- Persetujuan Update Koleksi & Promo: ${formData.agreed ? 'Setuju' : 'Tidak'}`,
    ].join('\n');

    setSubmitted(true);
    window.open(
      `https://wa.me/6281390888809?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111111] pb-20">
      {/* Hero Banner */}
      <section className="relative bg-[#111111] text-white py-16 sm:py-22 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-[#C5A059]/40">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-3">
            PROGRAM KEANGGOTAAN RESMI BUTIK
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-4">
            Member Batik Smile
          </h1>
          <div className="w-14 h-px bg-[#C5A059] mx-auto mb-5" />
          <p className="text-xs sm:text-sm text-[#E2DFD8]/85 max-w-2xl mx-auto font-light leading-relaxed">
            Nikmati keistimewaan eksklusif mulai dari Birthday Privilege, akses koleksi terbaru lebih awal, hingga undangan acara khusus bagi pelanggan setia Batik Smile Semarang.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10">
        <JsonLd
          schema={generateBreadcrumbSchema([
            { label: 'MEMBER BATIK SMILE', to: '/pages/member' },
          ])}
        />
        <Breadcrumb items={[{ label: 'MEMBER BATIK SMILE' }]} />

        {/* Section 1: Syarat Bergabung (1–8) & Member Benefits (1–5) — Equal Height 2-Column Layout */}
        <section className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Syarat bergabung menjadi member batik smile (1 - 8) */}
          <div className="lg:col-span-7 bg-white border border-[#E2DFD8] p-6 sm:p-9 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-bold block mb-2">
                KETENTUAN KEANGGOTAAN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] mb-3">
                Syarat Bergabung Menjadi Member Batik Smile
              </h2>
              <div className="w-12 h-px bg-[#C5A059] mb-5" />

              <ol className="divide-y divide-[#E2DFD8]">
                {requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="py-3 flex items-start gap-3.5 text-xs sm:text-sm text-[#111111] font-light leading-relaxed"
                  >
                    <span className="w-6 h-6 shrink-0 bg-[#111111] text-[#C5A059] font-mono text-[11px] font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{req}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2DFD8] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A5550]">
              <span>
                Akun Resmi: <strong className="text-[#111111] font-medium">@batiksmile_official</strong> (IG &amp; TikTok)
              </span>
              <Link
                to="/pages/lokasi-toko"
                className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#9E7D3B] hover:text-[#111111] underline underline-offset-4"
              >
                Lokasi Toko &amp; GMaps &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Member Benefits (1 - 5) */}
          <div className="lg:col-span-5 bg-[#111111] text-white border border-[#C5A059]/40 p-6 sm:p-9 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#C5A059] font-bold block mb-2">
                KEUNTUNGAN MEMBER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
                Member Benefits
              </h2>
              <div className="w-12 h-px bg-[#C5A059] mb-5" />

              <ol className="divide-y divide-white/10">
                {benefits.map((benefit) => (
                  <li key={benefit.number} className="py-4 flex items-start gap-3.5">
                    <span className="w-6 h-6 shrink-0 bg-[#C5A059] text-[#111111] font-mono text-[11px] font-bold flex items-center justify-center mt-0.5">
                      {benefit.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-normal text-white leading-snug">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-[#E2DFD8]/80 font-light leading-relaxed mt-0.5">
                        ({benefit.description})
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-[#E2DFD8]/75">
              <span>Berlaku di seluruh Showroom Batik Smile</span>
              <span className="text-[#C5A059] font-mono uppercase tracking-wider text-[11px]">VIP PRIVILEGE</span>
            </div>
          </div>
        </section>

        {/* Section 2: Formulir Pendaftaran Member */}
        <section className="mt-8 sm:mt-12 bg-white border border-[#E2DFD8] p-6 sm:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-bold block mb-2">
                REGISTRASI KEANGGOTAAN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] mb-2">
                Formulir Pendaftaran Member Batik Smile
              </h2>
              <div className="w-12 h-px bg-[#C5A059] mx-auto mb-3" />
              <p className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
                Lengkapi data diri Anda (nama lengkap, nomor WA, email, dan tanggal lahir untuk Birthday Privilege) untuk mengaktifkan keanggotaan Member Batik Smile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="member-fullname"
                    className="block text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold mb-1.5"
                  >
                    Nama Lengkap *
                  </label>
                  <input
                    id="member-fullname"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-3 text-base sm:text-sm bg-[#FAF8F5] border border-[#D5D0C7] focus:border-[#9E7D3B] text-[#111111] placeholder:text-[#888888] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="member-wa"
                    className="block text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold mb-1.5"
                  >
                    Nomor WA *
                  </label>
                  <input
                    id="member-wa"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-3 text-base sm:text-sm bg-[#FAF8F5] border border-[#D5D0C7] focus:border-[#9E7D3B] text-[#111111] placeholder:text-[#888888] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="member-email"
                    className="block text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold mb-1.5"
                  >
                    Email *
                  </label>
                  <input
                    id="member-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 text-base sm:text-sm bg-[#FAF8F5] border border-[#D5D0C7] focus:border-[#9E7D3B] text-[#111111] placeholder:text-[#888888] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="member-birthdate"
                    className="block text-[10px] uppercase tracking-[0.18em] text-[#111111] font-semibold mb-1.5"
                  >
                    Tanggal Lahir (Untuk Birthday Privilege) *
                  </label>
                  <input
                    id="member-birthdate"
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-4 py-3 text-base sm:text-sm bg-[#FAF8F5] border border-[#D5D0C7] focus:border-[#9E7D3B] text-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#9E7D3B]"
                />
                <span className="text-xs sm:text-sm text-[#5A5550] font-light leading-relaxed">
                  Saya menyetujui informasi produksi (agar bisa menerima update koleksi dan promo) serta bersedia mengikuti program dan event exclusive Batik Smile.
                </span>
              </label>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#5A5550] font-light">
                  * Konfirmasi aktivasi member diteruskan ke WhatsApp resmi Batik Smile (081-390-8888-09).
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 whitespace-nowrap py-3.5 px-8 bg-[#111111] hover:bg-[#9E7D3B] text-[#C5A059] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  DAFTAR MEMBER BATIK SMILE &rarr;
                </button>
              </div>

              {submitted && (
                <p className="text-xs text-[#9E7D3B] text-center pt-2 font-medium">
                  Terima kasih! Formulir pendaftaran Anda telah diarahkan ke WhatsApp resmi Batik Smile.
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

const MEMBER_PROGRAM_QUERY = `#graphql
  query MemberProgram($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    metaobject(handle: {type: "member_program", handle: "default"}) {
      handle
      fields {
        key
        value
      }
    }
  }
`;
