import {products,categories,categoryWords,categoryDescriptions,findProduct} from './catalog';
import {articles,homeCopy,story} from './content';
import {policies} from './policies';
import {translate,type Locale,type Word,M} from './i18n';
export const simpleRoutes=['','shop','custom','quality','professionals','guide','about','reviews','shipping','guarantee','returns','contact','account','cart','checkout','privacy','terms'];
export const allPaths=[...simpleRoutes,...categories.map(c=>`collections/${c}`),...products.map(p=>`products/${p.slug}`),...articles.map(a=>`guide/${a.slug}`)];
export function routeInfo(locale:Locale,path:string){
 const p=path.startsWith('products/')?findProduct(path.slice(9)):undefined;if(p)return {title:p.name[locale],description:`${p.name[locale]}. ${p.description[locale]}`,image:p.images[0]};
 const a=path.startsWith('guide/')?articles.find(a=>a.slug===path.slice(6)):undefined;if(a)return {title:a.title[locale],description:a.summary[locale],image:a.image};
 const c=path.startsWith('collections/')?categories.find(c=>c===path.slice(12)):undefined;if(c)return{title:translate(locale,categoryWords[c]),description:categoryDescriptions[c][locale]};
 if(policies[path])return {title:policies[path].title[locale],description:policies[path].intro[locale]};
 const words:Record<string,Word>={'':'naturalHair',shop:'all',custom:'custom',quality:'quality',professionals:'pro',guide:'guide',about:'about',reviews:'results',contact:'contact',account:'account',cart:'bag',checkout:'orderReview'};
 const desc=path==='shop'?M('Discover BM HAIR wigs, ponytails, clip-ins, natural Slavic and European hair, and professional ESTEL care. Compare lengths, shades and prices.','Scopri parrucche, code, extension a clip, capelli slavi ed europei BM HAIR e cura professionale ESTEL. Confronta lunghezze, tonalità e prezzi.','Atklāj BM HAIR parūkas, zirgastes, matus ar sprādzēm, slāvu un Eiropas matus un ESTEL kopšanu. Salīdzini garumus, toņus un cenas.','Выберите парики, хвосты, заколки, славянские и европейские волосы BM HAIR и уход ESTEL. Сравните длину, оттенки и цены.')[locale]:path==='about'?story.intro[locale]:path==='custom'?homeCopy.customText[locale]:path==='professionals'?homeCopy.proText[locale]:path==='guide'?homeCopy.guideIntro[locale]:path==='quality'?homeCopy.qualityText[locale]:path==='reviews'?translate(locale,'sourceReviews'):path==='contact'?translate(locale,'formIntro'):path==='account'?translate(locale,'accountText'):path==='cart'?translate(locale,'emptyHint'):path==='checkout'?translate(locale,'previewCheckout'):homeCopy.intro[locale];
 return {title:path===''?M('Premium natural hair, wigs & extensions','Capelli naturali, parrucche ed extension','Dabīgie mati, parūkas un pieaudzējamie mati','Натуральные волосы, парики и пряди')[locale]:translate(locale,words[path]||'notFound'),description:desc};
}
