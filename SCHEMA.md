# Schema Contract: Batik Smile Nusantara (Shopify-Native)

> Authoritative data mapping and GraphQL schema contracts for Shopify Storefront API.  
> 100% managed via native Shopify Admin (Metaobjects & Metafields) with zero external CMS dependencies.

---

## 1. Shopify Metaobjects Definitions

### A. `hero_banner` (Hero Sliders & Banners)
Managed at: **Shopify Admin $\rightarrow$ Content $\rightarrow$ Metaobjects $\rightarrow$ Hero Banner**

| Field Key | Type | Description |
|---|---|---|
| `title` | Single line text | Main headline (e.g. "Mahakarya Busana & Sarimbit Nusantara") |
| `subtitle` | Single line text | Sub-narrative (e.g. "Menenun keanggunan motif klasik...") |
| `tier_badge` | Single line text | Badge text (e.g. "Butik Asli Nusantara • Sejak 2007") |
| `featured_image` | File (Image) | Portrait 4:5 lookbook image |
| `cta_label` | Single line text | Button text (e.g. "Jelajahi Koleksi Sarimbit") |
| `cta_url` | Single line text | Destination route (e.g. "/collections/sarimbit-batik-couple") |

### B. `lookbook_spotlight` (Shoppable Hotspot Lookbook)
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
| `custom` | `tier_kasta` | Single line text (`mahakarya` / `signature` / `essential`) | Triggers Dynamic PLP/PDP theme canvas and badge styling. |
| `custom` | `material_furing` | Single line text | Specifies lining & fabric (e.g. "Lapis Furing Katun Hero Halus"). |
| `custom` | `filosofi_motif` | Multi-line text / Rich text | Displays historical & philosophical meaning of the batik motif in PDP accordion. |
| `custom` | `model_fit_reference` | Single line text | Sizing cue (e.g. "Model Pria TB 178cm / BB 75kg mengenakan Size L"). |
| `custom` | `bundle_eligible` | Boolean | Enables `FamilyBundleBuilder` on Sarimbit PDPs. |

---

## 3. Core Storefront API GraphQL Fragments

### Product Fragment (`PRODUCT_FRAGMENT`)
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
  filosofiMetafield: metafield(namespace: "custom", key: "filosofi_motif") {
    value
  }
  furingMetafield: metafield(namespace: "custom", key: "material_furing") {
    value
  }
}
```

---

## 4. Cart Mutation Contract (Batch Family Bundle)

Adding multiple family members simultaneously uses a single atomic `linesAdd` mutation:

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
