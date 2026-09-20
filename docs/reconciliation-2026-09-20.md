# Work / Sites and GitHub reconciliation

- Saved Sites source: `6b9d0b8` (existing project `appgprj_6aa97c151988819186de2a0f6d650b09`, unpublished).
- Original GitHub upload: `46917dc65ddea9b340c85b4ad56da4e0ad3b66dd`.
- GitHub main inspected and fetched: `17aae3808f7d80668c7b4871ba80dddbd238ec80`.
- Five subsequent commits already preserve the Cloudflare preview origin, Shopify audit, product map, complete 423-variant map and server-side checkout configuration/buyer-IP forwarding.

The existing local export matches the original upload. The saved Sites product UI, catalogue, four languages, imagery and editorial content were already included in that upload. There are no missing product implementation changes to restore from the older Work copy.

Differences from Sites are intentional hosting adaptations: Cloudflare build/configuration and public-preview wording replace Sites-only infrastructure. Reintroducing the older checkout or hosting files would discard newer work, so none are copied back.

Reconciliation retains all newer GitHub commits and corrects obsolete environment/handoff instructions that still requested an environment-based variant mapping. No catalogue, price, SKU, availability, inventory or mapping changes are made. Both `BM_COMMERCE_ENABLED` and `BM_INDEXABLE` remain false.

GitHub main remains the deployable implementation. Sites keeps its existing project identity and hosting helpers; its shared application files are synchronized from the reconciled GitHub implementation. Cloudflare remains the selected preview host; no Sites publication, domain or DNS change is requested.

The Shopify Headless plan restriction remains a launch blocker. Do not enable commerce until an eligible plan allows a valid private Storefront token and the owner-approved catalogue, inventory, shipping, taxes and end-to-end checkout have been verified.
