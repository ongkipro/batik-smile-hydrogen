# Observability & Monitoring Probes: Batik Smile Nusantara

> Authoritative specification for edge health checks, Core Web Vitals, API monitoring, and smoke testing.  
> Status: Canonical Record.

---

## 1. Edge Runtime & Health Check Probes

Deployed to **Shopify Oxygen Global Edge Network** (Cloudflare Workers runtime).

| Probe Name | Target Endpoint | Evaluation Method | Expected Status / Threshold | Criticality |
|---|---|---|---|---|
| **Edge Liveness** | `GET /` | HTTP GET via Anycast Edge | HTTP `200 OK`, `content-type: text/html` | High (P0) |
| **Robots Contract** | `GET /robots.txt` | Text Verification | HTTP `200 OK`, contains `Sitemap:` | Medium (P1) |
| **Sitemap Index** | `GET /sitemap.xml` | XML Validation | HTTP `200 OK`, valid XML sitemap | Medium (P1) |
| **Storefront API Health** | `POST /` (GraphQL loader) | Subrequest Profiler | Subrequest latency `< 120ms` | High (P0) |
| **Cart Cookie Roundtrip** | `POST /cart` (Mutation) | Session verification | Valid opaque session cookie preserved | High (P0) |

---

## 2. Core Web Vitals & Performance Budget

Batik Smile Nusantara enforces strict quiet-luxury performance budgets to ensure instant mobile browsing:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE WEB VITALS BUDGET                          │
│                                                                        │
│   Metric                Budget Target         Critical Threshold       │
│   Largest Contentful    < 1.5s                > 2.5s (FAIL)            │
│   Paint (LCP)                                                          │
│   Cumulative Layout     < 0.02                > 0.08 (FAIL)            │
│   Shift (CLS)                                                          │
│   Interaction to Next   < 80ms                > 200ms (FAIL)           │
│   Paint (INP)                                                          │
│   Time to First Byte    < 80ms                > 200ms (FAIL)           │
│   (TTFB Anycast)                                                       │
└────────────────────────────────────────────────────────────────────────┘
```

### Google PageSpeed Insights (PSI) Performance Targets:
- **Mobile Target**: **90 – 98 / 100** (Simulated Moto G Power on slow 4G network).
- **Desktop Target**: **98 – 100 / 100** (Cable connection, sub-second rendering).

### Core Web Vitals & Edge Engineering Rules:
1. **Zero Layout Shift (CLS < 0.02)**:
   - All product card containers enforce hardcoded `aspect-[4/5]`.
   - Hero and banner media enforce `aspect-video` (`16:9`) or explicit CSS dimensions.
   - Zero unsized dynamic advertisements or shifting promo banners.
2. **Sub-Second LCP (LCP < 1.5s Mobile / < 0.8s Desktop)**:
   - Hero LCP image applies `fetchpriority="high"` and `loading="eager"`.
   - Shopify CDN automatically serves WebP/AVIF format with exact device width transforms.
   - Web font subsets (`Instrument Sans` and `Cormorant Garamond`) preloaded in `<head>` with `font-display: swap`.
3. **Instant Responsiveness (INP < 80ms / TBT < 50ms)**:
   - Ultra-lean client bundle (< 180kb gzipped total JavaScript).
   - Island hydration: Static text and product grids render purely via edge SSR; client islands only hydrate interactive elements (Drawer Cart, Family Bundle Builder, Predictive Search).
   - React Router v7 optimistic UI actions for instant 0ms cart updates.
4. **Oxygen Edge Optimization (TTFB < 80ms)**:
   - Global Anycast edge network with sub-50ms routing from Southeast Asia (Singapore / Jakarta edge nodes).
   - Static collection and product detail subrequests leverage Oxygen `CacheLong()` (`max-age=3600`, `stale-while-revalidate=86400`).
   - Zero heavy Node.js runtime bloat; 100% compliant with Cloudflare V8 Workers runtime.

---

## 3. Storefront API Cost & Caching Directives

1. **Static Data Caching**:
   - Collections, Metaobjects, and Product detail queries utilize Oxygen `CacheLong()` (`max-age=3600`, `stale-while-revalidate=86400`).
2. **Dynamic Data Directives**:
   - Cart, Customer Account, and Search queries utilize `CacheNone()` or `CacheShort()` (`max-age=1`).
3. **GraphQL Query Cost Budget**:
   - Single page subrequests must not exceed 250 GraphQL query points.
   - Images fetched via Storefront API must include Shopify CDN width and format transforms (`crop: 'center', maxWidth: 1200, format: 'webp'`).

---

## 4. Post-Deployment Smoke Test Protocol (`release-check`)

Execute these verification checks immediately following an Oxygen deployment:

```bash
# 1. Edge Availability & HTTP 200 Check
curl -I -sS https://batiksmile.com | grep -E "HTTP|content-type|x-request-id"

# 2. Critical Route Verification
curl -s -o /dev/null -w "%{http_code}\n" https://batiksmile.com/
curl -s -o /dev/null -w "%{http_code}\n" https://batiksmile.com/collections/sarimbit-exclusive
curl -s -o /dev/null -w "%{http_code}\n" https://batiksmile.com/collections/sarimbit-premium
curl -s -o /dev/null -w "%{http_code}\n" https://batiksmile.com/collections/kain-batik-tulis
curl -s -o /dev/null -w "%{http_code}\n" https://batiksmile.com/pages/lokasi-toko
curl -s -o /dev/null -w "%{http_code}\n" https://batiksmile.com/pages/layanan-seragam

# 3. Security Headers Verification
curl -I -sS https://batiksmile.com | grep -E "strict-transport-security|x-content-type-options|x-frame-options"
```
