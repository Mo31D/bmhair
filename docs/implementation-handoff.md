> Historical build/audit handoff. The project has now been exported for direct Cloudflare Workers hosting. Follow the root README and `CLOUDFLARE.md` for current setup. The optional commerce adapter remains inactive.

# BM HAIR — implementation and launch handoff

16 September 2026. Separate, unpublished redesign. No change to bmhair.shop, DNS, existing orders or accounts.

## What is complete

A working Sites/Vinext storefront with 53 distinct page routes in English, Italian, Latvian and Russian (212 localized routes), 24 catalogue records, six collections, six educational articles, custom requests, professional enquiries, customer support and draft policy pages. The same React implementation produces a standalone HTML review copy; its hash navigation is for offline review only. The actual Sites implementation has server-rendered, crawlable language URLs.

The visual identity uses plum, white and pale rose, Cormorant Garamond headings and Manrope interface text. All 59 product/editorial images come from BM HAIR's original site; there are no generated product photographs or fabricated customers. Images are optimized WebP. Locally hosted WOFF fonts avoid third-party font requests. Reduced motion, visible keyboard focus, skip navigation, labelled controls and accessible dialog primitives are included.

BM HAIR is the customer-facing master brand. Beauty Mafia/iWoman appear only where company history, contact or collection matters. Wigs, ponytails and clip-ins lead the consumer path. Extensions remain a complete professional collection. This priority is a reversible strategic assumption, not a claim about category revenue.

## Evidence and content

The full audit inventory and factual distinctions are in `source-of-truth.md`; original RU/LV extracts are in `source/`. Exact image source URLs are in `image-sources.json`. All 55 linked product/article modal payloads across the two official language sites were retrieved. Twenty-three original catalogue entries become 24 product records because one wig entry contains two distinct product presentations. Hair care is correctly attributed to ESTEL.

The source is [BM HAIR's Russian site](http://bmhair.shop/) and its linked [Latvian site](http://lv.bmhair.shop/), plus the owner's explicit brief. The relationship of bmhair.co.uk to this business could not be established; it is not used. Founder names, founding dates, certifications, VAT number and exact legal registration number remain unverified. Testimonials are attributed summaries of genuine source reviews, without invented ratings or review schema.

## Architecture and commerce choice

Recommended production arrangement: keep the distinctive Sites storefront and use Shopify as the managed catalogue, inventory, order, tax/shipping configuration and hosted checkout backend. This balances the required editorial design with established merchant operations. It adds an API integration and its maintenance cost; if minimizing maintenance becomes the overriding priority, port this visual system to a Shopify theme instead.

| Option | Fit for BM HAIR | Maintenance and cost implications |
| --- | --- | --- |
| Sites + Shopify | Strong editorial control; one merchant system for products, orders and checkout; language routes remain under our control | Hosting and Shopify subscription, processing fees, any chosen apps, plus a maintained Storefront API adapter |
| Shopify theme | Suitable catalogue/checkout with fewer integration boundaries | Subscription, processing and selected apps; less independent frontend control |
| WooCommerce | Flexible ownership and content; can support this catalogue | Hosting, extensions, backups, updates and security are merchant/developer responsibilities |
| Custom/Medusa | Flexible custom workflows and wholesale logic | Higher integration and operational burden; not justified by the currently verified needs |

Compare the final merchant quote rather than headline plan prices. Subscription, market features, B2B entitlements, apps and transaction costs must be checked at purchase. Reference: [Shopify pricing](https://www.shopify.com/pricing), [WooCommerce pricing](https://woocommerce.com/pricing/) and [Medusa pricing](https://medusajs.com/pricing/). No platform account was purchased or created.

A server-side `POST /api/checkout` adapter is implemented and disabled by default. It validates selections, resolves server-owned variant IDs, creates a Shopify cart and returns an allowlisted HTTPS checkout URL. There is no card-entry form in this site. Shopify documents the [cart and checkout flow](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage). Final amounts and stock must come from Shopify, never from the preview catalogue.

The preview has a working local bag, option selection, quantities and localized order review. It does not reserve stock, take payment, create an order or create an account. Request forms validate and generate a reviewable email draft; nothing is sent automatically. Reference images remain on the visitor's device and must be attached to the email by the visitor. For launch, a transactional form endpoint and private attachment storage are preferable to email drafts; add delivery monitoring and the approved retention policy.

### Minimum production integration

1. Open/configure the owner's Shopify merchant store. Verify business and payout details there. Populate real SKU identifiers, option combinations, tax treatment, weights, live inventory and product images. Confirm whether the €199 dark wig represents one or several sellable styles; it is request-only in this preview. Confirm wig/hair-piece dimensions and construction where missing.
2. Replace the snapshot catalogue with an authoritative Storefront API catalogue feed, using caching with a documented freshness limit and product/inventory updates. Retain editorial copy and language keys. Add accurate Offer/availability structured data only from that feed. The present checkout adapter alone does not synchronize catalogue prices or inventory.
3. Map each validated `productId|variantId|shade|texture` key to the real Shopify ProductVariant GID. Configure `BM_SHOPIFY_VARIANTS` server-side. Do not map unconfirmed combinations. API secrets must remain server-side in Sites runtime settings.
4. Configure `SHOPIFY_STORE_DOMAIN`, a supported `SHOPIFY_API_VERSION`, `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` and exact `SHOPIFY_CHECKOUT_HOSTS`. Check current Shopify requirements for buyer-IP forwarding, API throttling and multilingual checkout. Only enable `BM_COMMERCE_ENABLED` after sandbox order/refund and rate tests succeed.
5. Configure Latvia Omniva eligibility and pickup, then country/weight rules for DPD, taxes and destinations outside the EU. Georgia, UK, Norway and Switzerland need explicit customs/tax terms. No international tariff or transit promise has been invented.
6. Connect hosted customer accounts and order status; implement partner/contact/custom form delivery, privacy notices and retention. Do not build a replacement booking system.
7. Test merchant sandbox flows for successful/declined payments, unavailable variants, stale prices, delivery restrictions, address errors and refunds on supported phones. Run one merchant-approved live order only after explicit authorization.

For Latvia merchants, Shopify's [payment-method guidance](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/latvia/payment-methods) documents card and wallet options. Apple Pay and Google Pay are planned, subject to merchant activation, device and customer eligibility. PayPal needs separate merchant configuration if selected. Do not promise every payment method to every country.

B2B currently has a dedicated credibility and enquiry journey. Wholesale prices, minimum order quantities, territory exclusivity and distributor terms are not invented. Select actual B2B account/pricing features after those commercial rules are agreed. The existing CRM can later receive consent-aware customer and order updates through authenticated webhooks with idempotency, retries and failure logs; no salon appointment dependency is introduced.

## SEO audit and migration

| Observed problem on the source site | Rebuild response |
| --- | --- |
| Products/articles live in one-page modal panels | Dedicated server-rendered collection, product and guide routes |
| No canonical or hreflang in either homepage | Self-canonical URLs and reciprocal EN/IT/LV/RU + x-default alternates |
| No JSON-LD | Organization, BreadcrumbList, Product and Article schema, without fabricated offers or ratings |
| Empty/missing image alt attributes | Descriptive alt text on catalogue/editorial images |
| HTTP robots.txt and sitemap.xml returned 404 | Dedicated metadata routes, 200 public localized sitemap entries |
| Russian text remains in parts of the Latvian UI | Explicit editable dictionaries and copy for all four languages |
| Zoom disabled; dense content and manual payment | Responsive interface, normal zoom, product option selection and hosted-checkout integration boundary |
| HTTPS certificate validation failed in the audit environment | Certificate renewal and canonical HTTPS verification required on the eventual approved domain |

The original HTML was about 379 KB in Russian and 358 KB in Latvian. Both homepages had one H1 and nine H2 headings. No canonical, hreflang or JSON-LD was detected. RU had 52 image tags (44 empty and eight missing alt); LV had 50 (43 empty and seven missing). These are source observations, not claims about Google's entire index.

No Search Console, analytics, field Core Web Vitals or verified keyword-volume account was available. Search discovery found the homepage; a complete indexed URL count and current rankings cannot be inferred from this. No traffic uplift or Lighthouse score is claimed. Performance measures implemented include compressed images, image dimensions, lazy loading, a prioritized hero, local compressed fonts and reduced-motion support. Real LCP, INP and CLS require measurement after an approved deployment.

The 53 routes include home, shop, six collections, 24 products, custom, professionals, guide and six articles, quality, story, reviews, shipping, guarantee, returns, privacy, terms, contact, cart, checkout and account. Cart/checkout/account stay out of the sitemap and out of indexing. EN is the international fallback; language changes preserve the current page. English slugs remain shared beneath `/en/`, `/it/`, `/lv/`, `/ru/` for maintainability. Localized slug aliases can be added later with a central route map and redirects; translated content and metadata already exist. See [Google's localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

Preview crawling is intentionally disabled. At launch, set the approved HTTPS origin, verify redirects/canonicals, enable `BM_INDEXABLE`, submit the sitemap and verify Search Console. The expected Sites URL in `.env.example` is an origin placeholder for this registered project, not proof that it is published. Do not point production canonicals at an unpublished address.

Before replacing the old site, export actual indexed URLs and backlinks. Map Russian root to `/ru/` and Latvian root to `/lv/`, then map any discovered legacy detail URLs to their exact equivalents. Fragment-only old modal navigation has no independently redirectable HTTP path. Do not redirect every removed URL to the homepage. No production redirect or DNS change has been made.

## Legal and customer promise

The short Quality Promise and detailed source-based guarantee are separate. The 14-day source commercial promise does not replace statutory rights. The original start-date inconsistency (homepage incomplete versus LV product wording after purchase), blanket hair-return exclusion, sale-item exclusions and colouring/guarantee conflict require Latvian/EU review. Keep the source record available to counsel.

The [EU consumer guidance](https://europa.eu/youreurope/citizens/consumers/shopping/guarantees/index_en.htm) explains legal guarantees and distance-purchase withdrawal rights. The preview does not decide whether a specific hair item qualifies for a hygiene or custom-made exemption. Obtain advice on seals, handling, diminished value, custom specifications, defect remedies and local-language disclosures before selling. Confirm legal registration, VAT status, complete address and policy contact. Cookie/analytics consent must be revisited if nonessential analytics, marketing or embeds are added; none are in this preview.

## Remaining owner decisions and assets

- Approve category priority, current price/VAT basis, stock and exact variant combinations; supply missing wig/hair-piece specifications. Source values are dated catalogue evidence, not a live stock feed.
- Approve the commerce account, payment methods and country-specific delivery/tax rules; confirm Omniva's free-parcel conditions and the conflicting older delivery estimates.
- Supply full legal identity and obtain approved guarantee, returns, privacy and sale terms. Confirm the intended start of the extra 14-day promise.
- Approve rights to existing photos/reviews and commission current product photography: consistent fronts/backs, cap/attachment detail, each real shade/length, neutral-light swatches and mobile portrait crops. Native-speaker review of IT/LV/RU and domain email setup are launch refinements. The only currently verified email remains bmhair.lv@gmail.com.

## QA and scope limits

`qa-source.json` records successful server rendering of all 212 routes, one H1 each, 8,940 internal link instances, 916 image instances, asset existence, unique per-language metadata, five language alternates, preview noindex and cart/payment guards. TypeScript and the production build passed.

Browser checks covered desktop home, product selection, 2 × €359 = €718 bag calculation, cart persistence, the payment preview, language changes, mobile menu and Italian partner form, Russian 320px layout, custom form validation/review and catalogue search. A 4px narrow-screen overflow was fixed. The self-contained HTML was opened in the browser: product navigation, add-to-bag, checkout and EN→IT language switching preserved the bag. No email was sent and no order was placed.

The browser's WebMCP modelContext was unavailable; optional feature-detected tools remain inactive in that browser. Browser access to `/robots.txt` was blocked by its client; the generators are covered by source checks, not a claimed HTTP crawl. No application console errors were observed in the earlier interactive checks; unrelated browser-extension log errors were excluded. There is no device-lab, screen-reader or live merchant certification claim. Complete production-domain crawl, accessibility and measured performance checks after an approved deployment.
