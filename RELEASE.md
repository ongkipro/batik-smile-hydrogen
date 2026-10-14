# Release Specification & Ledger: Batik Smile Nusantara

> Authoritative release truth, semantic risk assessment, and rollback protocol.  
> Status: Active Ledger.

---

## 1. Active Release Manifest

- **Release ID**: `REL-20261014-PRODUCTION-SYNC`
- **Base Commit**: `01a368c` (`HEAD`)
- **Target Environment**: Production (`Shopify Oxygen Global Edge` — `https://batiksmile.com`)
- **Declared Risk**: `R2` (Storefront UI/UX, Route Loaders, Real-Time CacheShort Sync & Cart Drawer Streamlining)
- **Review Risk**: `R2`
- **Effective Release Risk**: `R2`
- **Independent Review**: `PASSED`
- **Readiness Status**: `VERIFIED_IN_PRODUCTION`

---

## 2. Risk Classification Reference

| Risk Tier | Scope & Impact | Review Requirements | Approval Gates |
|---|---|---|---|
| **R0** | Non-executable documentation, markdown specs, static design tokens. | Local audit against repo rules. | Standard commit. |
| **R1** | Isolated UI components, Tailwind styling, non-critical static pages. | Local lint & build verification. | Component tests pass. |
| **R2** | Route loaders, Storefront API fragments, slide-over drawer cart logic. | Independent reviewer audit + build verification. | Full cart flow pass. |
| **R3** | Checkout handoff, customer session cookies, payment routing, production secrets. | Independent Opus review + delivery ledger signoff. | Production gate pass. |
| **R4** | Destructive migrations, domain cutovers, live database structural changes. | Independent Opus XHigh review + explicit user approval. | Formal approval gate. |

---

## 3. Rollback & Recovery Protocol

In the event of an edge deployment failure or catastrophic edge regression:

### Oxygen Instant Rollback
```bash
# Rollback to the previous stable Oxygen deployment version
npx shopify hydrogen rollback --deployment-id <previous_successful_deployment_id>
```

### Git Repository Rollback
```bash
# Revert the faulty merge/commit cleanly without rewriting public history
git revert -m 1 <faulty_commit_hash>
git push origin main
```

---

## 4. Verification & Release Gate Checklist

- [x] All canonical Markdown specifications verified and cross-referenced with zero drift.
- [x] Official brand logo asset copied to `public/brand/batik-smile-logo.png`.
- [x] Quiet Luxury editorial banner assets generated and stored in `public/banners/`.
- [x] 6 Core Collections (`luxury-series`, `premium-series`, `ekonomi-series`, `kain`, `batik-anak`, `aksesoris`) verified with full-bleed cinematic heroes and 30+ legacy 301 redirects.
- [x] Official showroom names (**Batik Smile Sampokong** & **Batik Smile Sukun**) with Google Maps deep-links and retired pages (`/pages/layanan-seragam`, `/pages/fasilitas-store`) 301-redirected to `/pages/lokasi-toko`.
- [x] Official WhatsApp SVG geometry, green circular floating concierge button (`#25D366`), **Kain Batik** editorial copy, and clean minimalist Cart Drawer verified.
- [x] Framework build and lint verification (`npm run lint` 0 errors, `npm run build` exits with code 0).
- [x] Storefront API GraphQL query cost verified (< 250 points) with `CacheShort()` real-time synchronization.
- [x] Post-deploy edge probes pass 100% in `OBSERVABILITY.md` (GitHub Actions run `38468914337` green).
