import React, { useState } from 'react';
import { AddToCartButton } from './AddToCartButton';
import { BatikCorner } from './BatikOrnaments';

const DEFAULT_FAMILY_MEMBERS = [
  {
    id: 'pria',
    label: 'Kemeja Ayah (Lapis Furing Halus)',
    basePrice: 450000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom Sizing'],
    selectedSize: 'L',
    enabled: true,
  },
  {
    id: 'wanita',
    label: 'Gamis / Dress Ibu (Sutra Prada)',
    basePrice: 750000,
    sizes: ['S', 'M', 'L', 'XL', 'Custom Sizing'],
    selectedSize: 'M',
    enabled: true,
  },
  {
    id: 'anak_laki',
    label: 'Kemeja Anak Laki-laki',
    basePrice: 225000,
    sizes: ['2-4 Th (S)', '5-7 Th (M)', '8-10 Th (L)', '11-13 Th (XL)'],
    selectedSize: '5-7 Th (M)',
    enabled: true,
  },
  {
    id: 'anak_perempuan',
    label: 'Dress Anak Perempuan',
    basePrice: 245000,
    sizes: ['2-4 Th (S)', '5-7 Th (M)', '8-10 Th (L)'],
    selectedSize: '5-7 Th (M)',
    enabled: false,
  },
];

export function FamilyBundleBuilder({ product, selectedVariant }) {
  const [members, setMembers] = useState(DEFAULT_FAMILY_MEMBERS);

  const toggleMember = (id) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    );
  };

  const updateSize = (id, size) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selectedSize: size } : m)),
    );
  };

  const activeMembers = members.filter((m) => m.enabled);
  const totalBundlePrice = activeMembers.reduce((sum, m) => sum + m.basePrice, 0);

  const formatIDR = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);

  // Bundle line payload for Shopify CartForm
  const bundleLines = activeMembers.map((m) => ({
    merchandiseId: selectedVariant?.id || product?.selectedOrFirstAvailableVariant?.id,
    quantity: 1,
    attributes: [
      { key: 'Anggota Sarimbit', value: m.label },
      { key: 'Ukuran Terpilih', value: m.selectedSize },
    ],
  }));

  return (
    <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-neutral-300/80 shadow-sm relative my-8">
      <BatikCorner position="top-left" variant="gold" size={32} className="top-3 left-3 opacity-60" />
      <BatikCorner position="bottom-right" variant="gold" size={32} className="bottom-3 right-3 opacity-60" />

      {/* Header */}
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#9E4719] font-bold block mb-1">
          Paket Sarimbit Praktis
        </span>
        <h3 className="font-serif text-2xl font-bold text-neutral-900">
          Family Bundle Builder
        </h3>
        <p className="text-xs text-neutral-600 mt-1">
          Pilih komposisi dan ukuran baju untuk setiap anggota keluarga di bawah ini dalam satu klik.
        </p>
      </div>

      {/* Member Selectors List */}
      <div className="space-y-4 mb-8">
        {members.map((member) => (
          <div
            key={member.id}
            className={`p-4 rounded-xl border transition-all ${
              member.enabled
                ? 'bg-white border-neutral-300 shadow-sm'
                : 'bg-neutral-100/60 border-neutral-200 opacity-60'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={member.enabled}
                  onChange={() => toggleMember(member.id)}
                  className="w-4 h-4 rounded text-[#9E4719] focus:ring-[#9E4719]"
                />
                <span className="font-semibold text-xs text-neutral-900">{member.label}</span>
              </label>
              <span className="text-xs font-bold text-[#9E4719] font-sans">
                {formatIDR(member.basePrice)}
              </span>
            </div>

            {member.enabled && (
              <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-neutral-500 font-medium mr-1">Pilih Size:</span>
                {member.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => updateSize(member.id, sz)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all border ${
                      member.selectedSize === sz
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Live Total & Batch Add Button */}
      <div className="p-5 rounded-xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 block">
            Total Paket ({activeMembers.length} Pcs Busana)
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#C5A059] font-sans">
            {formatIDR(totalBundlePrice)}
          </span>
        </div>

        <AddToCartButton
          disabled={activeMembers.length === 0}
          lines={bundleLines}
          className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#9E4719] hover:bg-[#7A320C] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg text-center disabled:bg-neutral-600 disabled:cursor-not-allowed"
        >
          Tambah {activeMembers.length} Baju ke Tas Belanja 🛍️
        </AddToCartButton>
      </div>
    </div>
  );
}
