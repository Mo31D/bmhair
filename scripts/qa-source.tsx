import React from 'react';
import {renderToString} from 'react-dom/server';
import fs from 'node:fs';
import Site from '../components/bm/site';
import {allPaths,routeInfo} from '../lib/bm/routes';
import {locales} from '../lib/bm/i18n';
import {products} from '../lib/bm/catalog';
import {validateLine,unitPrice} from '../lib/bm/cart';
import {generateMetadata} from '../app/[locale]/[[...slug]]/page';
import {POST} from '../app/api/checkout/route';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
const fail:string[]=[];let links=0,images=0;
const pages=locales.flatMap(l=>allPaths.map(path=>({locale:l,path})));
const set=new Set(pages.map(p=>`/${p.locale}/${p.path}`.replace(/\/$/,'')));
const titles=new Set<string>(),descriptions=new Set<string>();
for(const p of pages){
 const html=renderToString(<Site {...p}/>); const h1=(html.match(/<h1[ >]/g)||[]).length;
 if(h1!==1)fail.push(`${p.locale}/${p.path}: ${h1} H1s`);
 for(const m of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)/g)){links++;if(!set.has(m[1].replace(/\/$/,'')))fail.push('Unknown internal link '+m[1]);}
 for(const m of html.matchAll(/<img\b[^>]*>/g)){images++;const src=m[0].match(/src="([^"?]*)/)?.[1];const alt=m[0].match(/alt="([^"]*)/)?.[1];if(!alt)fail.push('Missing alt '+p.path);if(src?.startsWith('/')&&!fs.existsSync('public'+src))fail.push('Missing asset '+src);}
 const md=await generateMetadata({params:Promise.resolve({locale:p.locale,slug:p.path?p.path.split('/'):[]})});
 const key=p.locale+':'+String(md.title);if(titles.has(key))fail.push('Duplicate title '+key);titles.add(key);
 if(!md.description)fail.push('Missing description '+p.path);if(descriptions.has(p.locale+':'+String(md.description)))fail.push('Duplicate description '+p.locale+'/'+p.path);descriptions.add(p.locale+':'+String(md.description));
 if(Object.keys(md.alternates?.languages||{}).length!==5)fail.push('Missing hreflang '+p.path);
 if((md.robots as {index?:boolean})?.index!==false)fail.push('Preview indexed '+p.path);
}
const sample={productId:'ponytail',variantId:'60',shade:'1/613',texture:'wavy',quantity:2};
if(!validateLine(sample)||unitPrice(sample)*2!==718)fail.push('Variant price failed');
for(const bad of [{...sample,quantity:-1},{...sample,shade:'invented'},{...sample,variantId:'bad'},{...sample,productId:'wig-dark'},null])if(validateLine(bad))fail.push('Invalid bag accepted');
const response=await POST(new Request('https://preview.invalid/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lines:[sample]})}));if(response.status!==503)fail.push('Preview payment was not blocked');
const siteMap=sitemap();if(siteMap.length!==200||new Set(siteMap.map(x=>x.url)).size!==200)fail.push('Sitemap URLs are missing or duplicated');
if(siteMap.some(x=>Object.keys(x.alternates?.languages||{}).length!==5||/\/(cart|checkout|account)\/?$/.test(x.url)))fail.push('Invalid sitemap alternates or private route');
if((robots().rules as {disallow?:string}).disallow!=='/')fail.push('Preview robots must block crawling');
const bytes=fs.readdirSync('public/images').filter(s=>s.endsWith('.webp')).reduce((n,f)=>n+fs.statSync('public/images/'+f).size,0);
const report={at:new Date().toISOString(),pages:pages.length,uniquePageTypes:allPaths.length,products:products.length,internalLinks:links,imageElements:images,optimizedImageBytes:bytes,sitemapURLs:siteMap.length,checks:['SSR rendering','one H1','internal route targets','image existence and alt','metadata uniqueness','five hreflang entries','preview noindex','cart option validation and price','payments disabled','sitemap generator and preview robots'],failures:[...new Set(fail)]};
fs.writeFileSync('docs/qa-source.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(fail.length)process.exitCode=1;
