# Shopify integration audit

Generated: 2026-09-19

The connected BM HAIR Shopify trial store matches the existing custom storefront catalogue structurally.

## Verified

- Active Shopify products: 24
- Shopify variants: 423
- Product coverage: complete
- Variant-count mismatches: 0
- Price mismatches against the existing catalogue: 0
- Missing SKU variants: 344
  - Slavic capsule extensions: 176
  - Slavic cut hair: 168
- Inventory quantity currently equals 1 on all 423 variants. Treat these as preview/test stock, not confirmed live inventory.
- 10 ESTEL products remain marked sold-out in the existing local catalogue.
- Dark natural-hair wig remains request-only.
- Under the current storefront rules, 412 variants are structurally eligible for checkout and 11 are intentionally excluded.

## Architecture

Do not replace the existing BM HAIR catalogue, translations, taxonomy, SEO structure or product-page UX.

Use Shopify underneath the current storefront for commerce data and checkout.

## Before enabling commerce

1. Confirm real inventory instead of the current placeholder quantity 1.
2. Confirm or assign the 344 missing SKUs.
3. Confirm whether the 10 locally sold-out ESTEL products should remain unavailable.
4. Keep the dark wig request-only unless BM HAIR confirms a sellable configuration.
5. Configure Shopify Storefront API credentials in Cloudflare secrets/variables.
6. Connect the existing storefront selections to Shopify variant IDs.
7. Run a full test checkout.
8. Only then set BM_COMMERCE_ENABLED=true.
