# Direct Cloudflare Workers deployment

The GitHub export removes Sites-specific hosting registration and sign-in helpers from the deployment. The original saved Sites project is preserved separately. The storefront, authentic assets, translations, catalogue, cart and SEO route structure are retained.

## Dashboard settings

| Setting | Value |
| --- | --- |
| Product | Cloudflare Workers with Git integration |
| Repository | Mo31D/bmhair |
| Branch | main |
| Root directory | Repository root |
| Worker name | bmhair (must match wrangler.jsonc) |
| Build command | pnpm run build |
| Deploy command | pnpm run deploy |
| Node version | 22, minimum 22.13.0 |
| Install | pnpm install --frozen-lockfile (detected from packageManager and lockfile) |
| Pages output directory | Not applicable |

`pnpm build` uses Vinext and the Cloudflare Vite plugin. The output includes `dist/server/index.js`, `dist/server/wrangler.json` and `dist/client`. Deploy the generated Worker configuration, not the standalone HTML review copy and not a static-only assets directory.

The first deployment does not need D1, R2, Shopify or payment secrets. Images and fonts are already included. The owner is completing the Cloudflare connection manually; this export does not deploy or modify DNS.

## Origin and environment

Once Cloudflare gives you the worker URL, add a `SITE_URL` entry in the `vars` object of `wrangler.jsonc`, using that exact HTTPS origin with no trailing slash, and redeploy. Until supplied, the development fallback is `http://localhost:5173`; indexing remains disabled. Wrangler owns configured non-secret vars, so put durable changes in this file rather than relying on dashboard edits that a later deploy can overwrite.

Keep these values for design review:

```json
{
  "BM_INDEXABLE": "false",
  "BM_COMMERCE_ENABLED": "false"
}
```

`SITE_URL` is read on the server for canonical URLs, language alternates, schema and the sitemap. Do not enable indexing until it contains the approved public domain, redirects and policies have been checked, and the owner authorizes launch.

Noindex and robots rules are not privacy controls. The repository is public, and workers.dev is normally accessible to visitors. For a restricted website preview, configure Cloudflare Access for your account before sharing the URL. The storefront does not inherit ChatGPT Sites owner-only access on Cloudflare.

## Commerce boundary

The checkout adapter is optional and inactive. It currently targets Shopify; migrating hosting does not create a custom commerce database or Stripe integration. Keep `BM_COMMERCE_ENABLED=false` until a production backend has authoritative inventory/prices, shipping/tax rules and successful payment validation. Reference photographs in enquiry forms remain local and are not uploaded; the visitor reviews an email draft before sending. There is no production customer login yet.

`SHOPIFY_STORE_DOMAIN=knuap5-wt.myshopify.com` and `SHOPIFY_API_VERSION=2026-07` are now committed as non-secret Worker variables. The verified 423-variant mapping is committed in `lib/bm/shopify-variant-map.ts`; it contains only Shopify GIDs and no credentials.

`SHOPIFY_STOREFRONT_PRIVATE_TOKEN` must be added as a Cloudflare Secret, never to GitHub, `wrangler.jsonc`, browser code or `.env.example`. The checkout adapter now forwards the Cloudflare buyer IP to Shopify for server-side Storefront API traffic. Keep `BM_COMMERCE_ENABLED=false` until the token is installed and end-to-end checkout testing is complete.

## Validation completed before upload

- TypeScript check and production build.
- Wrangler deployment dry-run, without publishing.
- Source route checks covering all 212 localized routes, internal links, images, language alternates, noindex, sitemap generation and disabled payments.
- Cloudflare-specific origin configuration replaces the old Sites origin.

The actual Cloudflare account, GitHub installation permission and deployed URL still require the owner's dashboard setup. After the first deployment, verify home, a product, language switching, cart, `/robots.txt` and `/sitemap.xml` on that real URL. A saved GitHub commit alone does not produce a live website.

References: [Cloudflare Vinext guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/), [GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/), [Workers build settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).
