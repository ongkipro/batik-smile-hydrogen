# Release Specification & Ledger: Batik Smile Nusantara

> Authoritative release truth, semantic risk assessment, and rollback protocol.  
> Status: Active Ledger.

---

## 1. Active Release Manifest

- **Release ID**: `REL-20260903-SPECS-V2`
- **Base Commit**: `HEAD`
- **Target Environment**: Production (`Shopify Oxygen Global Edge`)
- **Declared Risk**: `R0` (Architecture & Specification Verification)
- **Review Risk**: `R0`
- **Effective Release Risk**: `R0` (Documentation, Design Tokens, & Static Asset Baseline)
- **Independent Review**: `PENDING`
- **Readiness Status**: `READY_FOR_SCAFFOLDING`

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

- [x] All 6 canonical Markdown specifications verified and cross-referenced with zero drift.
- [x] Official brand logo asset copied to `public/brand/batik-smile-logo.png`.
- [x] Three Quiet Luxury editorial banner assets generated and stored in `public/banners/`.
- [x] Dual-engine commerce architecture verified (RTW 3-Tier + Raw Fabric & Bespoke Tailoring).
- [x] Verified company profile details incorporated (Simongan Flagship 3 Floors & Banyumanik store).
- [ ] Framework scaffolding verification (`npm run build` exits with code 0).
- [ ] Storefront API GraphQL query cost verified (< 250 points).
- [ ] Post-deploy edge probes pass 100% in `OBSERVABILITY.md`.
