# BM HAIR — source-of-truth inventory

Audit date: 15 September 2026. Separate redesign. Existing site, domains and customer accounts unchanged.

## Evidence
- Owner brief: BM HAIR own brand and manufacturing, two salons in Latvia, ready-made products plus custom wigs; Latvia strongest market; business in Finland/Georgia; new Italian partners. No founder names, dates, certifications or market size verified.
- Official Russian homepage: http://bmhair.shop/ (public HTTP returned 200; HTTPS failed certificate validation in the audit environment). Official Latvian counterpart linked from homepage: http://lv.bmhair.shop/.
- Website: SIA Beauty Mafia ISL; Mihoelsa 47, Daugavpils, Latvia; +371 28237807; bmhair.lv@gmail.com; official Instagram beauty_mafia_iwoman; Facebook MafiaDaugavpils. No verified postal code, VAT ID or registered company number.
- Customer brand BM HAIR; Beauty Mafia/iWoman supporting business history. Avoid unverified founder biographies or formation dates.
- Official content preserved in docs/source. Product/article detail content was retrieved from the published Bitrix modal.php read endpoint using public catalogue identifiers, not a private API.
- Live source categories: 1810 Slavic capsule extensions; 1822 Slavic cut hair; 1846 European cut hair (RU only); 1820 ponytails; 1821 clip-ins; 1960 mono clip-ins; 1847 dark wigs/hairpieces; 1848 light wigs/hairpieces. Fifteen ESTEL care catalogue entries (not BM HAIR formulas).
- Current catalogue explicitly marks several care products sold out. Retain those states. Hair stock counts are not exposed; do not invent stock quantities or scarcity.
- Prices are published-source prices, including source discounted prices; no artificial discount, sale countdown or comparison price will be advertised. Owner must reconfirm before payments.
- Sources say hand made ponytails/clip-ins, natural Slavic hair; wigs use natural hair and breathable adjustable mesh. Do not globally call every product Slavic, Remy, unprocessed, sustainably sourced or European-made. European describes brand location/market, not origin of all hair.
- Source uses misspelling Rami and claims retained cuticle. Avoid unsupported certified Remy guarantee. Source describes coloured hair, which contradicts a blanket virgin/unprocessed claim.

## Shipping and guarantee
- Latvia: free Omniva within stated size (39 × 38 × 64 cm) and weight (~30 kg) limits; 3–5 working days AFTER processing. Processing 1–2 working days for stocked orders. Source says up to 10 working days for orders with unavailable items, with advance communication; do not add this to the other estimate as a guaranteed total.
- Europe: DPD; rate and time depend on country and order, confirmed manually today. No fabricated flat European tariff or promised transit time.
- Free iWoman pickup; notification first; hold 7 days; order number required.
- Existing payment process: 100% bank-card transfer after order confirmation. Replace with hosted card/wallet checkout when connected.
- Source commercial hair guarantee: 14 days; homepage start phrase is incomplete, while LV product terms say after purchase. This inconsistency requires a single approved policy. Prior contact/photos/video, then inspection at Mihoelsa 47. Response within 10 working days of receiving goods. Full/partial refund for accepted manufacturing defect, source discretion linked to usage/purchase date.
- Source exclusions: improper installation/care, colouring/modification, excessive heat; special-colour fading; short return hairs at weft seam; dry/split ends; sale goods; broader liability disclaimers. Preserve the full original for legal review, do not present blanket exclusions as valid limits on EU rights.
- Legal contradictions: marketing permits colouring while guarantee excludes it; site says no returns for all hair products and no guarantees for sale goods; statutory EU rights cannot be replaced by 14-day commercial wording. Final terms require Latvian/EU legal sign-off.

## SEO evidence
- RU document approx 379 KB HTML; LV approx 358 KB. One H1, nine H2 each. Products and five education articles loaded in modal popups with no distinct href. Navigation mostly fragments.
- Zero canonical, zero hreflang and zero JSON-LD in either homepage. RU 52 image tags: 44 empty alt / 8 missing; LV 50: 43 empty / 7 missing. Viewport explicitly disables user zoom.
- HTTP robots.txt and sitemap.xml both return 404. HTTPS endpoint certificate error observed. No Search Console access: actual Google coverage, search volumes, query rankings, traffic and field Core Web Vitals are unknown. Site search found homepage, not an exhaustive indexed URL count.
- Latvian version retains Russian interface fragments and omits European cut-hair family. New language routes share one catalogue. No evidence establishing bmhair.co.uk as an official business domain.

## Reversible decisions
- Wigs, ponytails and clip-ins lead B2C; natural hair retains a full collection and pro route. Revenue priority to be confirmed later.
- English master; English/Italian/Latvian/Russian separately authored dictionaries, URL routes and metadata. No auto-translation widget or forced geolocation. Native-speaker review still required before launch.
- Premium editorial typography, plum accent, pale rose/white surfaces and authentic original photography. No AI product or customer images.
- No fake review ratings or aggregate review schema. Real existing reviews paraphrased, attributed as summaries of source testimonials.
- Preview noindex. Production SEO enabled only with approved canonical domain and launch switch.

## Final retrieval reconciliation
All 55 published product/article modal payloads linked from RU/LV homepages were retrieved successfully, including 22 retries. Latvian product shipping on older care pages says 1–3 working days, while the current homepage/hair pages say 3–5; the preview uses the latter and flags confirmation before launch. LV dark wig text lists shades 3.0, 6.0 and 6.74 at €199 but one general selector; exact sellable SKU remains unconfirmed.
