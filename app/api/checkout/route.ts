import {validateLine,lineKey,productIsRequestOnly,resolveLine} from '@/lib/bm/cart';
const fail=(error:string,status=400)=>Response.json({error},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 if(process.env.BM_COMMERCE_ENABLED!=='true')return fail('Checkout is not active in this preview.',503);
 const domain=process.env.SHOPIFY_STORE_DOMAIN,token=process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN,version=process.env.SHOPIFY_API_VERSION;
 if(!domain||!token||!version||!/^[-a-z0-9]+\.myshopify\.com$/.test(domain)||!/^20\d{2}-(01|04|07|10)$/.test(version))return fail('Checkout is not configured.',503);
 const requestOrigin=request.headers.get('origin');if(requestOrigin&&requestOrigin!==new URL(request.url).origin)return fail('Invalid request origin.',403);
 let data:unknown;try{const text=await request.text();if(text.length>65536)return fail('Request too large.',413);data=JSON.parse(text);}catch{return fail('Invalid request.');}
 if(!data||typeof data!=='object')return fail('Invalid request.');
 const d=data as {lines?:unknown[];country?:string;email?:string;locale?:string};
 if(!Array.isArray(d.lines)||!d.lines.length||d.lines.length>100)return fail('Invalid bag.');
 const lines=d.lines.map(validateLine);if(lines.some(x=>!x||productIsRequestOnly(resolveLine(x).product)))return fail('One or more products require confirmation.');
 let mapping:Record<string,string>;try{mapping=JSON.parse(process.env.BM_SHOPIFY_VARIANTS||'{}');}catch{return fail('Variant mapping is not configured.',503);}
 const mapped=lines.map(x=>({merchandiseId:mapping[lineKey(x!)],quantity:x!.quantity}));if(mapped.some(x=>!/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(x.merchandiseId||'')))return fail('A selected product is not connected yet.',409);
 if(!/^[A-Z]{2}$/.test(d.country||''))return fail('Choose a delivery country.');
 if(d.email&&(typeof d.email!=='string'||!/^\S+@[^\s@]+\.[^\s@]+$/.test(d.email)||d.email.length>254))return fail('Invalid email.');
 try{const res=await fetch(`https://${domain}/api/${version}/graphql.json`,{method:'POST',headers:{'Content-Type':'application/json','Shopify-Storefront-Private-Token':token},body:JSON.stringify({query:'mutation CreateCheckout($input: CartInput!) { cartCreate(input: $input) { cart { checkoutUrl } userErrors { field message code } } }',variables:{input:{lines:mapped,buyerIdentity:{countryCode:d.country,...(d.email?{email:d.email}:{})},attributes:[{key:'storefront-language',value:['en','it','lv','ru'].includes(d.locale||'')?d.locale:'en'}]}}}),signal:AbortSignal.timeout(15000)});const result=await res.json() as {data?:{cartCreate?:{cart?:{checkoutUrl?:string};userErrors?:unknown[]}}};const created=result.data?.cartCreate;if(!res.ok||!created?.cart?.checkoutUrl||created.userErrors?.length)return fail('Unable to create checkout. Please contact BM HAIR.',502);const url=new URL(created.cart.checkoutUrl);const allowed=new Set([domain,...(process.env.SHOPIFY_CHECKOUT_HOSTS||'').split(',').map(s=>s.trim()).filter(Boolean)]);if(url.protocol!=='https:'||!allowed.has(url.hostname))return fail('Checkout host is not configured.',503);return Response.json({checkoutUrl:url.toString()},{headers:{'Cache-Control':'no-store'}});}catch{return fail('Checkout is temporarily unavailable.',502);}
}
