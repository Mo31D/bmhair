import type {MetadataRoute} from 'next';
import {locales} from '@/lib/bm/i18n';
import {pageURL,publicPaths} from '@/lib/bm/seo';
export default function sitemap():MetadataRoute.Sitemap{return locales.flatMap(l=>publicPaths.map(path=>({url:pageURL(l,path),alternates:{languages:{...Object.fromEntries(locales.map(lang=>[lang,pageURL(lang,path)])),'x-default':pageURL('en',path)}}})));}
