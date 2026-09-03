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
    <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-none border border-[#E2DFD8] shadow-sm relative my-8">
      <BatikCorner position="top-left" variant="gold" size={32} className="top-3 left-3 opacity-60" />
      <BatikCorner position="bottom-right" variant="gold" size={32} className="bottom-3 right-3 opacity-60" />

      {/* Header */}
      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#9E7D3B] font-semibold block mb-1">
          PAKET BUSANA KELUARGA
        </span>
        <h3 className="font-serif text-2xl font-normal text-[#111111]">
          Family Bundle Builder
        </h3>
        <p className="text-xs text-[#5A5550] mt-1 font-light">
          Pilih komposisi dan ukuran busana untuk setiap anggota keluarga di bawah ini dalam satu langkah selaras.
        </p>
      </div>

      {/* Member Selectors List */}
      <div className="space-y-4 mb-8">
        {members.map((member) => (
          <div
            key={member.id}
            className={`p-4 rounded-none border transition-all ${
              member.enabled
                ? 'bg-white border-[#C5A059]/40 shadow-sm'
                : 'bg-neutral-100/60 border-[#E2DFD8] opacity-60'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={member.enabled}
                  onChange={() => toggleMember(member.id)}
                  className="w-4 h-4 rounded-none text-[#111111] focus:ring-[#C5A059]"
                />
                <span className="font-medium text-xs text-[#111111] uppercase tracking-wider">{member.label}</span>
              </label>
              <span className="text-xs font-semibold text-[#111111]">
                {formatIDR(member.basePrice)}
              </span>
            </div>

            {member.enabled && (
              <div className="pt-2 border-t border-[#E2DFD8] flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-[#5A5550] font-medium mr-1">Pilih Size:</span>
                {member.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => updateSize(member.id, sz)}
                    className={`px-3 py-1.5 rounded-none text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                      member.selectedSize === sz
                        ? 'bg-[#111111] text-[#C5A059] border-[#111111] font-semibold'
                        : 'bg-white text-[#111111] border-[#E2DFD8] hover:border-[#111111]'
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
      <div className="p-5 sm:p-6 rounded-none bg-[#111111] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-[#C5A059]/30">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#E2DFD8] block">
            Total Paket ({activeMembers.length} Pcs Busana)
          </span>
          <span className="text-xl sm:text-2xl font-semibold text-[#C5A059]">
            {formatIDR(totalBundlePrice)}
          </span>
        </div>

        <AddToCartButton
          disabled={activeMembers.length === 0}
          lines={bundleLines}
          className="w-full sm:w-auto px-8 py-3.5 rounded-none bg-[#C5A059] hover:bg-[#9E7D3B] text-[#111111] hover:text-white font-semibold text-xs uppercase tracking-[0.18em] transition-all shadow-md text-center disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed"
        >
          TAMBAH {activeMembers.length} BUSANA KE TAS BELANJA
        </AddToCartButton>
      </div>
    </div>
  );
}
