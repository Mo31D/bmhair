import assert from 'node:assert/strict';
import {POST} from '../app/api/checkout/route';
import {products} from '../lib/bm/catalog';
import {lineKey,validateLine} from '../lib/bm/cart';
import {shopifyVariantMap} from '../lib/bm/shopify-variant-map';

const keys:string[]=[];let eligible=0;
for(const p of products)for(const v of p.variants)for(const shade of p.shades.length?p.shades:[''])for(const texture of p.textures.length?p.textures:['']){
  const line={productId:p.id,variantId:v.id,shade,texture,quantity:1};const key=lineKey(line);keys.push(key);
  assert.match(shopifyVariantMap[key]||'',/^gid:\/\/shopify\/ProductVariant\/\d+$/,key);
  if(validateLine(line))eligible++;
}
assert.equal(products.length,24);assert.equal(keys.length,423);assert.equal(eligible,412);
assert.deepEqual(Object.keys(shopifyVariantMap).sort(),keys.sort());
assert.equal(new Set(Object.values(shopifyVariantMap)).size,423);

const envKeys=['BM_COMMERCE_ENABLED','SHOPIFY_STORE_DOMAIN','SHOPIFY_API_VERSION','SHOPIFY_STOREFRONT_PRIVATE_TOKEN','SHOPIFY_CHECKOUT_HOSTS'];
const previous=Object.fromEntries(envKeys.map(k=>[k,process.env[k]]));
const originalFetch=globalThis.fetch;
const sample={productId:'ponytail',variantId:'60',shade:'1/613',texture:'wavy',quantity:2};
const payload={lines:[sample],country:'IT',email:'qa@example.invalid',locale:'it'};
let calls=0;let last:RequestInit|undefined;let checkoutUrl='https://knuap5-wt.myshopify.com/checkouts/test';let upstreamErrors:unknown[]=[];
let checks=0;
// Every Shopify call is intercepted; these tests cannot create a real cart/order.
globalThis.fetch=async(_input,init)=>{calls++;last=init;return Response.json({data:{cartCreate:{cart:{checkoutUrl},userErrors:upstreamErrors}}});};
async function check(body:unknown,status:number,headers:Record<string,string>={}){
  const result=await POST(new Request('https://preview.invalid/api/checkout',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://preview.invalid',...headers},body:JSON.stringify(body)}));
  assert.equal(result.status,status);assert.equal(result.headers.get('Cache-Control'),'no-store');checks++;return result;
}
try{
  process.env.BM_COMMERCE_ENABLED='false';await check(payload,503);assert.equal(calls,0);
  process.env.BM_COMMERCE_ENABLED='true';delete process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;await check(payload,503);
  Object.assign(process.env,{SHOPIFY_STORE_DOMAIN:'knuap5-wt.myshopify.com',SHOPIFY_API_VERSION:'2026-07',SHOPIFY_STOREFRONT_PRIVATE_TOKEN:'test-only-never-transmitted',SHOPIFY_CHECKOUT_HOSTS:''});
  await check(payload,403,{Origin:'https://foreign.invalid'});
  await check({...payload,country:'ZZ'},400);await check({...payload,country:['IT']},400);
  await check({...payload,email:123},400);await check({...payload,email:'invalid'},400);
  await check(null,400);await check({...payload,lines:[]},400);
  for(const change of [{quantity:1.5},{quantity:301},{shade:'invented'},{variantId:'unknown'},{productId:'wig-dark',variantId:'one'},{productId:'couture-silk-primer',variantId:'standard'}])await check({...payload,lines:[{...sample,...change}]},400);
  await check({...payload,padding:'a'.repeat(66000)},413);assert.equal(calls,0);
  const valid=await check(payload,200,{'CF-Connecting-IP':'192.0.2.10'});
  assert.equal((await valid.json() as {checkoutUrl:string}).checkoutUrl,checkoutUrl);
  const request=JSON.parse(String(last?.body));
  assert.equal(request.variables.input.lines[0].merchandiseId,shopifyVariantMap[lineKey(sample)]);
  assert.equal(request.variables.input.lines[0].quantity,2);
  assert.equal(new Headers(last?.headers).get('Shopify-Storefront-Buyer-IP'),'192.0.2.10');
  for(const url of ['http://knuap5-wt.myshopify.com/checkouts/test','https://foreign.invalid/checkouts/test','https://user@knuap5-wt.myshopify.com/checkouts/test','https://knuap5-wt.myshopify.com:8443/checkouts/test']){checkoutUrl=url;await check(payload,503);}
  checkoutUrl='https://knuap5-wt.myshopify.com/checkouts/test';upstreamErrors=[{message:'Unavailable'}];await check(payload,502);
  console.log(JSON.stringify({checkoutChecks:checks,mappedVariants:keys.length,eligibleVariants:eligible,network:'mocked; no external commerce calls',failures:[]}));
}finally{
  globalThis.fetch=originalFetch;
  for(const key of envKeys){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}
}
