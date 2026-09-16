import fs from 'node:fs';
import path from 'node:path';
import sharp from '../node_modules/.pnpm/sharp@0.35.4_@types+node@22.19.19/node_modules/sharp/dist/index.mjs';
const root=process.argv[2]; if(!root) throw Error('Pass the directory containing the original research manifests and image downloads. Optimized production images are already in public/images.');
const dest=path.resolve('public/images');fs.mkdirSync(dest,{recursive:true});
const catalogue=JSON.parse(fs.readFileSync(root+'/catalog-manifest.json','utf8'));
const care=fs.existsSync(root+'/care-manifest.json')?JSON.parse(fs.readFileSync(root+'/care-manifest.json','utf8')):[];
const selected=[...catalogue,...care].filter(x=>x.status==='downloaded').map(x=>({...x,out:`cat-${x.category_id}-${String(x.sequence).padStart(2,'0')}`}));
const extras={'43-a36ddd7fd270ec9886fa85f17481c4fd.jpg':'editorial-brunette','07-a735f8b04804e6c658dc4f0c82d934d8.jpeg':'editorial-blondes','44-8b6cec8c97e12e93d1e08daf6ef9dac5.jpg':'craftsmanship','46-6a401b2ba2ea73c65ab10d8084c8946f.jpg':'long-blonde','45-2bf5aa60f107ce5019266b51782de43f.jpg':'wavy-result','06-1ac15f58ed49f68dbd5ca4eb6586090c.jpg':'founder'};
for(const [f,n] of Object.entries(extras))if(fs.existsSync(root+'/'+f))selected.push({path:root+'/'+f,out:n,image_url:JSON.parse(fs.readFileSync(root+'/manifest.json','utf8')).find(x=>x.filename===f)?.image_url});
for(const x of selected){if(!fs.existsSync(x.path))continue; await sharp(x.path).rotate().resize({width:x.out.startsWith('editorial')?1500:1000,withoutEnlargement:true}).webp({quality:84}).toFile(dest+'/'+x.out+'.webp');}
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/image-sources.json',JSON.stringify(selected.map(x=>({file:`/images/${x.out}.webp`,source:x.image_url,sourceCategory:x.category_id})),null,2));
console.log(`Prepared ${selected.length} authentic image assets.`);
