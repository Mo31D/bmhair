import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {products,productImagesForShade} from '../lib/bm/catalog';
import {shadePhotos,shadePhotosFor} from '../lib/bm/shade-photos';
import {validateLine,unitPrice,lineKey} from '../lib/bm/cart';
import {shopifyVariantMap} from '../lib/bm/shopify-variant-map';
const provenance=JSON.parse(fs.readFileSync('docs/shade-photo-provenance.json','utf8'));
let pairs=0;
for(const[productId,entries]of Object.entries(shadePhotos)){
 const p=products.find(p=>p.id===productId);assert.ok(p,productId);
 for(const[shade,photos]of Object.entries(entries)){
  pairs++;assert.ok(p.shades.includes(shade),`${productId}/${shade}`);
  for(const photo of photos){const bytes=fs.readFileSync('public'+photo.src);assert.equal(bytes.toString('ascii',0,4),'RIFF',photo.src);const digest=createHash('sha256').update(bytes).digest('hex');assert.ok(provenance.mapping[productId][shade].some((e:{publishedSha256:string})=>e.publishedSha256===digest),'Photo checksum changed');assert.ok(fs.existsSync('public'+photo.src),photo.src);assert.ok(provenance.mapping[productId][shade].some((e:{printedCode:string;webPath:string})=>e.printedCode===shade&&e.webPath===photo.src),`Unproven photo: ${photo.src}`);}
  assert.equal(productImagesForShade(p,shade)[0],photos[0].src);
 }
 for(const shade of p.shades.filter(s=>!entries[s]))assert.deepEqual(productImagesForShade(p,shade),p.images,'Unverified shades must use the collection gallery');
}
assert.equal(pairs,36);
assert.ok(shadePhotosFor('capsules','9.0','wavy')[0].src.endsWith('1810-06.webp'));
assert.ok(shadePhotosFor('capsules','9.0','straight')[0].src.endsWith('1810-07.webp'));
for(const quantity of [150,260,300]){
 const line={productId:'capsules',variantId:'40',shade:'9.0',texture:'wavy',quantity};
 assert.equal(validateLine(line)?.quantity,quantity);assert.equal(unitPrice(line)*quantity,2.25*quantity);assert.match(shopifyVariantMap[lineKey(line)],/^gid:\/\/shopify\/ProductVariant\/\d+$/);
}
console.log(JSON.stringify({verifiedShadePairs:pairs,capsuleQuantities:[150,260,300],failures:[]}));
