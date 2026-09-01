import React from 'react';

/**
 * Decorative Batik Divider with central Kawung/Truntum motif
 */
export function BatikDivider({ variant = 'gold', className = '' }) {
  const color =
    variant === 'gold'
      ? '#C5A059'
      : variant === 'bronze' || variant === 'soga'
      ? '#9E4719'
      : variant === 'light'
      ? '#FAF7F2'
      : '#161616';

  return (
    <div className={`flex items-center justify-center gap-3 my-4 opacity-80 ${className}`}>
      {/* Left Filigree Line */}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-current opacity-40" />

      {/* Central Batik Kawung / Truntum Motif */}
      <svg
        className="w-6 h-6 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      >
        <rect
          x="9"
          y="9"
          width="6"
          height="6"
          transform="rotate(45 12 12)"
          fill={color}
          fillOpacity="0.15"
        />
        <path d="M12 3C10 7 10 9 12 12C14 9 14 7 12 3Z" fill={color} fillOpacity="0.3" />
        <path d="M12 21C10 17 10 15 12 12C14 15 14 17 12 21Z" fill={color} fillOpacity="0.3" />
        <path d="M3 12C7 10 9 10 12 12C9 14 7 14 3 12Z" fill={color} fillOpacity="0.3" />
        <path d="M21 12C17 10 15 10 12 12C15 14 17 14 21 12Z" fill={color} fillOpacity="0.3" />
        <circle cx="12" cy="12" r="1.5" fill={color} />
      </svg>

      {/* Right Filigree Line */}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-current opacity-40" />
    </div>
  );
}

/**
 * Traditional Batik Corner Filigree for luxury frames & cards
 */
export function BatikCorner({
  position = 'top-left',
  variant = 'gold',
  size = 32,
  className = '',
}) {
  const color = variant === 'gold' ? '#C5A059' : variant === 'soga' ? '#9E4719' : '#1A1A1A';

  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  };

  return (
    <div
      className={`absolute pointer-events-none ${rotations[position] || ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path
          d="M2 2 L20 2 C12 2 8 8 8 16 L8 38"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M5 5 L14 5 C10 5 7 8 7 12 L7 25"
          stroke={color}
          strokeWidth="0.75"
          strokeOpacity="0.6"
          fill="none"
        />
        <circle cx="2" cy="2" r="2" fill={color} />
      </svg>
    </div>
  );
}
