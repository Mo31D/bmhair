import type {MetadataRoute} from 'next';
import {origin,indexable} from '@/lib/bm/seo';
export default function robots():MetadataRoute.Robots{return{rules:indexable()?{userAgent:'*',allow:'/',disallow:['/api/','/*/cart','/*/checkout','/*/account']}:{userAgent:'*',disallow:'/'},sitemap:`${origin()}/sitemap.xml`};}
