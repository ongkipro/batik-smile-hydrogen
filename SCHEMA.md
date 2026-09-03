# Schema Contract: Batik Smile Nusantara (Shopify-Native)

> Authoritative data mapping and GraphQL schema contracts for Shopify Storefront API.  
> 100% managed via native Shopify Admin (Metaobjects & Metafields) with zero external CMS dependencies.

---

## 1. Shopify Metaobjects Definitions

> **Graceful Fallback Contract**:  
> Components querying Metaobjects implement defensive fallback logic: if a metaobject definition or entry is not yet created in Shopify Admin, the loader gracefully serves default high-res assets from the repository (`public/banners/`) and curated editorial copy. As soon as the merchant provisions the Metaobjects in Shopify Admin, the storefront automatically renders the live Shopify content with zero code changes.

### A. `hero_banner` (Hero Sliders & Banners)
Managed at: **Shopify Admin $\rightarrow$ Content $\rightarrow$ Metaobjects $\rightarrow$ Hero Banner**

| Field Key | Type | Description |
|---|---|---|
| `title` | Single line text | Main headline (e.g. "Mahakarya Busana & Sarimbit Nusantara") |
| `subtitle` | Single line text | Sub-narrative (e.g. "Menenun keanggunan motif klasik...") |
| `tier_badge` | Single line text | Badge text (e.g. "Butik Asli Nusantara • Sejak 2007") |
| `featured_image` | File (Image) | Portrait 4:5 lookbook image |
| `cta_label` | Single line text | Button text (e.g. "Jelajahi Koleksi Sarimbit") |
| `cta_url` | Single line text | Destination route (e.g. "/collections/sarimbit-exclusive", "/collections/sarimbit-premium") |

### B. `heritage_video` (Craftsmanship Video Section)
Managed at: **Shopify Admin $\rightarrow$ Content $\rightarrow$ Metaobjects $\rightarrow$ Heritage Video**

| Field Key | Type | Description |
|---|---|---|
| `eyebrow` | Single line text | Subtitle (e.g. "PROUDLY MADE IN INDONESIA") |
| `headline` | Single line text | Main title (e.g. "FINEST HANDMADE") |
| `video_url` | Single line text / File | MP4 video stream (canting batik tulis in action) |
| `poster_image` | File (Image) | High-res fallback poster thumbnail |
| `duration_text` | Single line text | Video duration indicator (e.g. "0:18") |

### C. `customer_testimonial` (Love Notes from Our Customer)
Managed at: **Shopify Admin $\rightarrow$ Content $\rightarrow$ Metaobjects $\rightarrow$ Customer Testimonial**

| Field Key | Type | Description |
|---|---|---|
| `quote` | Multi-line text | Customer endorsement text |
| `author_name` | Single line text | Customer full name (e.g. "LIDYA ELISABETH ALVERIN") |
| `city_or_role` | Single line text | Location or event (e.g. "Semarang • Sarimbit Resepsi") |
| `rating` | Integer | Rating score (default 5) |

### D. `lookbook_spotlight` (Shoppable Hotspot Lookbook)
Managed at: **Shopify Admin $\rightarrow$ Content $\rightarrow$ Metaobjects $\rightarrow$ Lookbook Spotlight**

| Field Key | Type | Description |
|---|---|---|
| `lookbook_image` | File (Image) | Full-width family lifestyle photo |
| `hotspots_json` | JSON | Coordinates array: `[{ id, title, price, top, left, product_handle }]` |

---

## 2. Shopify Metafields Definitions (Product Level)

Managed at: **Shopify Admin $\rightarrow$ Settings $\rightarrow$ Custom Data $\rightarrow$ Products**

| Namespace | Key | Type | UI Usage |
|---|---|---|---|
| `custom` | `tier_kasta` | Single line text (`exclusive` / `premium` / `ekonomis`) | Triggers Dynamic PLP/PDP theme canvas (`ProductExclusiveLayout`, `ProductPremiumLayout`), gold badge styling, and bespoke concierge options. |
| `custom` | `product_type_label` | Single line text | Category label for bracketed title: `[OUTER]`, `[KEMEJA PRIA]`, `[SELENDANG]`, `[KAIN TULIS]`. |
| `custom` | `fabric_origin` | Single line text | Artisan regional origin (Pekalongan, Solo, Cirebon, Yogya, Lasem). |
| `custom` | `motif_code` | Single line text | Authentic artisan motif code (e.g. `K-K25L-V-667979`). |
| `custom` | `material_furing` | Single line text | Specifies lining & fabric (e.g. "Lapis Furing Katun Hero Halus"). |
| `custom` | `filosofi_motif` | Multi-line text / Rich text | Displays historical & philosophical meaning in PDP accordion. |
| `custom` | `model_fit_reference` | Single line text | Sizing cue (e.g. "Model Pria TB 178cm / BB 75kg mengenakan Size L"). |
| `custom` | `tailoring_eligible` | Boolean | True if item can be ordered with custom bespoke tailoring. |
| `custom` | `bundle_eligible` | Boolean | Enables `FamilyBundleBuilder` on Sarimbit PDPs. |

---

## 3. Core Storefront API GraphQL Fragments

### Product Details Fragment (`PRODUCT_DETAILS_FRAGMENT`)
```graphql
fragment ProductVariant on ProductVariant {
  id
  title
  availableForSale
  sku
  price {
    amount
    currencyCode
  }
  compareAtPrice {
    amount
    currencyCode
  }
  image {
    id
    url
    altText
    width
    height
  }
  selectedOptions {
    name
    value
  }
}

fragment ProductDetails on Product {
  id
  title
  handle
  descriptionHtml
  description
  featuredImage {
    id
    url
    altText
    width
    height
  }
  images(first: 8) {
    nodes {
      id
      url
      altText
      width
      height
    }
  }
  options {
    name
    optionValues {
      name
      firstSelectableVariant {
        ...ProductVariant
      }
    }
  }
  selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions) {
    ...ProductVariant
  }
  tierMetafield: metafield(namespace: "custom", key: "tier_kasta") {
    value
  }
  typeMetafield: metafield(namespace: "custom", key: "product_type_label") {
    value
  }
  originMetafield: metafield(namespace: "custom", key: "fabric_origin") {
    value
  }
  motifMetafield: metafield(namespace: "custom", key: "motif_code") {
    value
  }
  filosofiMetafield: metafield(namespace: "custom", key: "filosofi_motif") {
    value
  }
  furingMetafield: metafield(namespace: "custom", key: "material_furing") {
    value
  }
  fitMetafield: metafield(namespace: "custom", key: "model_fit_reference") {
    value
  }
  tailoringMetafield: metafield(namespace: "custom", key: "tailoring_eligible") {
    value
  }
}
```

---

## 4. Cart Mutation Contract (Batch Family Bundle & Tailoring Notes)

Adding multiple family members or custom tailoring notes atomically:

```graphql
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```
