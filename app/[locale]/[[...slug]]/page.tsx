import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Site from '@/components/bm/site';
import {locales,type Locale} from '@/lib/bm/i18n';
import {allPaths,routeInfo} from '@/lib/bm/routes';
import {pageURL,indexable,pageSchema} from '@/lib/bm/seo';
type Props={params:Promise<{locale:string;slug?:string[]}>};
function parse(p:{locale:string;slug?:string[]}){const path=(p.slug||[]).join('/');if(!locales.includes(p.locale as Locale)||!allPaths.includes(path))notFound();return{locale:p.locale as Locale,path};}
export async function generateMetadata({params}:Props):Promise<Metadata>{const{locale,path}=parse(await params);const info=routeInfo(locale,path);const description=info.description.length>158?info.description.slice(0,156).replace(/\s+\S*$/,'')+'…':info.description;const index=indexable()&&!['cart','checkout','account'].includes(path);return{title:info.title,description,alternates:{canonical:pageURL(locale,path),languages:{...Object.fromEntries(locales.map(l=>[l,pageURL(l,path)])),'x-default':pageURL('en',path)}},robots:{index,follow:index},openGraph:{title:`${info.title} | BM HAIR`,description,url:pageURL(locale,path),siteName:'BM HAIR',locale:{en:'en_GB',it:'it_IT',lv:'lv_LV',ru:'ru_RU'}[locale],type:'website'}};}
export default async function Page({params}:Props){const{locale,path}=parse(await params);const commerceEnabled=process.env.BM_COMMERCE_ENABLED==='true';return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(pageSchema(locale,path)).replace(/</g,'\\u003c')}}/><Site locale={locale} path={path} commerceEnabled={commerceEnabled}/></>;}
