import React from 'react';
import {createRoot} from 'react-dom/client';
import Site from '../components/bm/site';
import {locales,type Locale} from '../lib/bm/i18n';
import {allPaths,routeInfo} from '../lib/bm/routes';
const root=createRoot(document.getElementById('root')!);
function show(){let route=location.hash.slice(1)||'/en/';if(!route.startsWith('/'))route='/en/';const segments=route.split('/').filter(Boolean);const locale=locales.includes(segments[0] as Locale)?segments[0] as Locale:'en';const path=segments.slice(1).join('/');const valid=allPaths.includes(path)?path:'';document.documentElement.lang=locale;document.title=`${routeInfo(locale,valid).title} | BM HAIR`;root.render(<Site locale={locale} path={valid}/>);window.scrollTo(0,0);}
window.addEventListener('hashchange',show);
document.addEventListener('click',e=>{const target=e.target as Element;const a=target.closest('a');if(!a)return;const href=a.getAttribute('href')||'';if(/^\/(en|it|lv|ru)(\/|$)/.test(href)){e.preventDefault();if(location.hash.slice(1)===href){window.scrollTo(0,0);return;}location.hash=href;}else if(href.startsWith('#')){e.preventDefault();const element=document.getElementById(href.slice(1));element?.scrollIntoView({behavior:'smooth'});element?.focus();}});
show();
