import {products, type Product} from './catalog';
export type BagLine={productId:string;variantId:string;shade:string;texture:string;quantity:number};
export const lineKey=(line:BagLine)=>[line.productId,line.variantId,line.shade,line.texture].join('|');
export function validateLine(value:unknown):BagLine|null {
 if(!value||typeof value!=='object') return null;
 const x=value as BagLine; const p=products.find(p=>p.id===x.productId);
 if(!p||p.soldOut||productIsRequestOnly(p)||!p.variants.some(v=>v.id===x.variantId))return null;
 if(p.shades.length&&!p.shades.includes(x.shade))return null;
 if(p.textures.length&&!p.textures.includes(x.texture as 'straight'|'wavy'))return null;
 if(!Number.isInteger(x.quantity)||x.quantity<1||x.quantity>300)return null;
 return {productId:p.id,variantId:x.variantId,shade:p.shades.length?x.shade:'',texture:p.textures.length?x.texture:'',quantity:x.quantity};
}
export function resolveLine(line:BagLine){const product=products.find(p=>p.id===line.productId)!;return{product,variant:product.variants.find(v=>v.id===line.variantId)!};}
export function unitPrice(line:BagLine){return resolveLine(line).variant.price;}
export function productIsRequestOnly(p:Product){return p.id==='wig-dark';}
