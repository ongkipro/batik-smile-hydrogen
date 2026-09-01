# Design System & Guidelines: Batik Smile Nusantara

> Luxury Heritage & Anti-Slop Design System for Shopify Hydrogen.  
> Governed by `design-taste` (Storefront Mode, VAR: 5, MOT: 4, DEN: 4).

---

## 1. Color Palette & Emotional Tone

We avoid the sterile, flat `#FFFFFF` and harsh pure blacks. The palette is inspired by traditional Javanese textile dyeing (Soga & Tarum Indigo) combined with warm natural Mori cloth:

| Token Name | Hex Code | Tailwind Token | Semantic Usage |
|---|---|---|---|
| **Mori Linen** | `#FAF8F5` | `bg-[#FAF8F5]` | Default surface / canvas (warm, organic, high-end). |
| **Pure Mori** | `#FFFFFF` | `bg-white` | Elevated card & container backgrounds. |
| **Obsidian Charcoal** | `#141414` | `text-[#141414]` | Primary typography, headers, dark buttons. |
| **Soga Bata Matang** | `#8B3A14` | `text-[#8B3A14]` / `bg-[#9E4719]` | Primary brand accent, primary CTA, price highlights. |
| **Antique Gold** | `#C5A059` | `text-[#C5A059]` | Filigree dividers, Kasta I Mahakarya badges, luxury accents. |
| **Tarum Indigo** | `#14213D` | `bg-[#14213D]` | Kasta II Signature Elegance theme canvas. |
| **Obsidian Deep** | `#0F0F0F` | `bg-[#0F0F0F]` | Kasta I Mahakarya Heritage theme canvas. |
| **Emerald Trust** | `#059669` | `text-emerald-700` / `bg-emerald-50` | Objection snapping badges & WhatsApp consultation buttons. |

---

## 2. Typography Hierarchy

```
Display & Editorial Headers: Cormorant Garamond (Serif, Elegant, Authoritative)
  ├── text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight (Hero Titles)
  ├── text-2xl sm:text-3xl lg:text-4xl font-serif font-bold (Section Titles)
  └── text-xl sm:text-2xl font-serif font-semibold (Card Titles)

Body Text, Microcopy, & Prices: Plus Jakarta Sans (Modern Geometric Sans)
  ├── text-sm sm:text-base font-sans leading-relaxed (Body Narrative)
  ├── text-xs font-semibold uppercase tracking-wider (Buttons & Badges)
  └── text-lg sm:text-xl font-bold font-sans (Price Figures)
```

---

## 3. Visual Layout Rhythms & Anti-Slop Rules

1. **Strict Portrait 4:5 Media Aspect Ratio (`aspect-[4/5]`)**:
   All model lookbooks, catalog grids, and PDP galleries use `aspect-[4/5]` to preserve natural vertical garment proportions.
2. **Hairline Borders over Box Shadow**:
   Use `1px border-neutral-200/80` or `1px border-white/10` with generous whitespace (`py-24 md:py-32`) instead of heavy, murky CSS drop-shadows (`shadow-2xl`).
3. **Editorial Asymmetry (VAR: 5)**:
   - Split layout Hero (Left: narrative & actions, Right: 4:5 portrait model card).
   - Bento-style layout for the 3-Tier experience.
   - Interactive hotspot pins on lifestyle family lookbook photos.
4. **Objection Snapping**:
   Never bury reassurance in collapsed tabs. Place trust cues right next to the decision:
   - Next to price: *Batik Asli Jawa Tengah • Lapis Furing Hero Halus*
   - Next to size picker: *Model TB 178cm/BB 75kg mengenakan Size L • Garansi Tukar Size 100%*
   - Below primary CTA: *Tanya Konsultan via WhatsApp (Auto-attached product)*

---

## 4. Component Directory & Ownership

- `app/components/HeroEditorial.jsx`: Master Split Editorial Hero.
- `app/components/TierExperience.jsx`: Interactive 3-Tier Switcher.
- `app/components/ShoppableLookbook.jsx`: Hotspot family photoshoot lookbook.
- `app/components/CraftsmanshipZoom.jsx`: 3 Macro trust proof cards.
- `app/components/FamilyBundleBuilder.jsx`: Multi-variant PDP bundle selector.
- `app/components/StickyMobileBar.jsx`: Floating smart mobile purchase bar.
- `app/components/BatikOrnaments.jsx`: SVG Kawung/Truntum filigree & corner brackets.
- `app/components/AnnouncementBar.jsx`: Soga top notification bar.
- `app/components/MegaMenu.jsx`: Desktop 4-column mega menu with lookbook preview.
- `app/components/MobileNavigation.jsx`: Sticky bottom mobile navigation bar.
