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
| `cta_url` | Single line text | Destination route (e.g. "/collections/luxury-series", "/collections/premium-series") |

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
| `custom` | `material_furing` | Single line text | Specifies lining & fabric (e.g. "Lapisan Trikot Halus"). |
| `custom` | `filosofi_motif` | Multi-line text / Rich text | Displays historical & philosophical meaning in PDP accordion. |
| `custom` | `model_fit_reference` | Single line text | Sizing cue (e.g. "Model Pria TB 178cm / BB 75kg mengenakan Size L"). |
| `custom` | `tailoring_eligible` | Boolean | True if item can be ordered with custom bespoke tailoring. |
| `custom` | `bundle_eligible` | Boolean | Enables `FamilyBundleBuilder` on Sarimbit PDPs. |
| *(Shopify)* | `category` | TaxonomyCategory | Standard Product Taxonomy / Google Category (`id`, `name`, `fullName`). Auto-determines tax, metafields, and cross-channel listings. |

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
  media(first: 15) {
    nodes {
      mediaContentType
      previewImage {
        url
        altText
        width
        height
      }
      ... on MediaImage {
        id
        image {
          id
          url
          altText
          width
          height
        }
      }
      ... on Video {
        id
        sources {
          url
          mimeType
          format
          height
          width
        }
      }
      ... on ExternalVideo {
        id
        embedUrl
        host
        originUrl
      }
      ... on Model3d {
        id
        sources {
          url
          mimeType
          format
        }
      }
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
```

### 3.1 Normalized Product Media Architecture (`mediaList`)

Hydrogen normalizes diverse Storefront API media nodes into an invariant media structure consumed by galleries, 4:5 video lookbooks, and mini-thumbnails:

```typescript
interface NormalizedMediaItem {
  id: string;
  mediaContentType: 'IMAGE' | 'VIDEO' | 'EXTERNAL_VIDEO' | 'MODEL_3D';
  url: string;               // Direct image URL or primary streaming MP4 URL
  previewImage?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  altText?: string;
  width?: number;
  height?: number;
  sources?: Array<{          // Present on 'VIDEO' and 'MODEL_3D'
    url: string;
    mimeType: string;
    format: string;
    height?: number;
    width?: number;
  }>;
  embedUrl?: string;         // Present on 'EXTERNAL_VIDEO'
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

---

## 5. Article & Blog Editorial Fragment (`ARTICLE_ITEM_FRAGMENT`)

```graphql
fragment ArticleItem on Article {
  id
  title
  handle
  publishedAt
  contentHtml
  excerptHtml
  author: authorV2 {
    name
  }
  image {
    id
    altText
    url
    width
    height
  }
  blog {
    handle
    title
  }
  seo {
    title
    description
  }
}
```

---

## 6. Predictive Search Multi-Entity Contract (`PREDICTIVE_SEARCH_QUERY`)

> **Critical Constraint**:  
> In Shopify Storefront API, the `limit` argument for `predictiveSearch` **MUST be between 1 and 10** (`limit: Int, 1..10`). Any value `> 10` causes a GraphQL runtime exception. The loader clamps all inputs to `Math.min(10, Math.max(1, limit))`.

```graphql
query PredictiveSearch(
  $country: CountryCode
  $language: LanguageCode
  $limit: Int!
  $limitScope: PredictiveSearchLimitScope!
  $searchTerm: String!
  $types: [PredictiveSearchType!]
) @inContext(country: $country, language: $language) {
  predictiveSearch(
    limit: $limit
    limitScope: $limitScope
    query: $searchTerm
    types: $types
  ) {
    products {
      __typename
      id
      title
      handle
      tags
      trackingParameters
      selectedOrFirstAvailableVariant {
        id
        price {
          amount
          currencyCode
        }
        image {
          url
          altText
        }
      }
    }
    collections {
      __typename
      id
      title
      handle
      image {
        url
        altText
      }
      trackingParameters
    }
    articles {
      __typename
      id
      title
      handle
      trackingParameters
    }
    pages {
      __typename
      id
      title
      handle
      trackingParameters
    }
    queries {
      __typename
      text
      styledText
      trackingParameters
    }
  }
}
```

---

## 7. Dynamic Collection Pagination Contract (`COLLECTION_QUERY`)

> **Layout Harmony**:  
> Paginated at **12 items per page** (`pageBy: 12`), matching a 4-column x 3-row grid perfectly without trailing single orphaned cards.

```graphql
query Collection(
  $handle: String!
  $first: Int
  $last: Int
  $startCursor: String
  $endCursor: String
  $sortKey: ProductCollectionSortKeys
  $reverse: Boolean
) {
  collection(handle: $handle) {
    id
    handle
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    products(
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
      sortKey: $sortKey
      reverse: $reverse
    ) {
      nodes {
        ...ProductItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
}
```

---

## 8. Authoritative Store Collections & Taxonomy Schema

> **Tree Taxonomy (Single Source of Truth)**:
> The live Shopify catalog is consolidated into **6 Core Collections** with subcategories handled via URL parameters / tags (`gender`, `sleeve`). Umbrella collection `shop` serves as the catalog master index.

| Collection Title | Handle | ID (`gid://shopify/Collection/...`) | Sub-Categories (URL Filter / Tags) | Description / Tier |
|---|---|---|---|---|
| **Luxury Series** | `luxury-series` | `480517193785` | `pria`, `wanita` &times; `lengan-panjang`, `lengan-pendek` | Kasta I: Sutra Alam ATBM, 100% Batik Indonesia & Lapisan Trikot |
| **Premium Series** | `premium-series` | `480517390393` | `pria`, `wanita` &times; `lengan-panjang`, `lengan-pendek` | Kasta II: Tenun Dobby timbul, 100% Batik Indonesia & Lapisan Trikot |
| **Ekonomi Series** | `ekonomi-series` | `480517455929` | `pria`, `wanita` &times; `lengan-panjang`, `lengan-pendek` | Kasta III: 100% Katun Primisima adem harian |
| **Kain Batik** | `kain` | `480516636729` | Flat (No subcategories) | Temukan beragam pilihan kain batik dengan motif dan warna yang memikat, mulai dari sentuhan klasik hingga desain modern. Cocok untuk kreasi busana personal, seragam, maupun kebutuhan sarimbit, dengan pilihan kain yang dapat disesuaikan dengan gaya dan kebutuhan Anda. |
| **Aksesoris** | `aksesoris` | `480517128249` | Flat (No subcategories) | Blangkon tradisional, selendang adat Jawa |
| **Batik Anak** | `batik-anak` | `480517062713` | `putra`, `putri` &times; `lengan-panjang`, `lengan-pendek` | Setelan surjan anak, kemeja anak, dress katun balita |
| **Shop (All)** | `shop` | `480517488697` | Master catalog umbrella | All active products index |

### SEO Redirection Contract
All 30+ legacy collection handles (including `sarimbit-luxury`, `sarimbit-premium`, `sarimbit-ekonomi`, `sarimbit-exclusive`, `sarimbit-ekonomis`, `batik-wanita`, `batik-pria`, `jarik-kain-batik`, `kain-batik-tulis`, `koleksi-kain`, `kain-batik`, `blangkon-tradisional`, `blus-batik-wanita`, etc.) are permanently 301-redirected in `app/routes/collections.$handle.jsx` to preserve indexing equity.

