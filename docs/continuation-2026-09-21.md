# BM HAIR continuation — 21 September 2026

## Saved checkpoints

- Resumed the existing working trees at `6c05d44bbb705af0bc4594944b1f8decea75373e`. A fresh fetch found no newer remote commits. The prior reconciliation was retained.
- Early tested checkpoint pushed to main: `621ae64ff2803596546117e6923f2e487755122f` (quantity totals, request-only pricing, unique quantity controls, shared checkout countries, redirect validation and mocked checkout QA).
- This update adds 36 verified product/shade relationships across six existing products, with 18 additional compressed authentic images. Source evidence, exclusions and published checksums are in `shade-photo-provenance.json`.
- Shade/texture selection prioritizes a verified reference when one exists. Unverified codes retain the collection gallery. Photography does not prove stock, construction or exact length. No commercial options were added.
- Capsule quantity guidance uses the recorded BM HAIR source for 50, 60 and 70 cm. No quantity is invented for 40 cm; the stylist confirms the amount.
- Fixed narrow Russian partner headings and linked partner/custom field labels to their controls. Existing partner fields were preserved.

## Validation

- TypeScript, production build, `pnpm qa`, and Cloudflare Wrangler deployment dry run passed.
- Source QA: 212 localized routes, 8,940 internal links, 916 image elements, 200 sitemap entries, metadata/hreflang/noindex, disabled payments.
- Commerce QA: all 423 existing Shopify mappings, 412 currently eligible configurations, 22 mocked endpoint checks. No live Shopify call, cart, checkout or order was created.
- Shade QA: explicit code provenance, asset existence/checksums, safe unverified fallback and texture ordering. All WebP assets decoded successfully after validation.
- Capsule UI: 150 × €2.25 = €337.50; bag quantity changed to 260 = €585 and survived reload. Mobile 150 × €2.60 = €390; distinct configurations remained separate.
- Responsive browser review: Italian product 375 px, Russian product 320 px; English partner 375 px, Russian partner 320 px, Italian partner 1024 px and Latvian partner 768 px. No horizontal document overflow after the partner fix.
- Partner review retains name, email, business, city, social profile, country, business type and interest. Tested with synthetic data; no email sent.

## Continue only when needed

1. Verify the latest GitHub main and Cloudflare build before new edits. Preserve concurrent changes.
2. Shopify trial still blocks Headless credentials. Keep `BM_COMMERCE_ENABLED=false` until a valid private Storefront token and an authorized end-to-end checkout test are possible.
3. Owner confirmation remains necessary for final catalogue/stock/SKUs and ambiguous shade aliases. These are documented in the provenance file; do not infer them from old photos.
4. Keep indexing disabled and the final domain/DNS unchanged. Work/Sites retains its existing project identity and infrastructure; Cloudflare remains the deployment target.
