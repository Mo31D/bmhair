"use client";
import {createContext,useContext,useState,useEffect,useCallback,type ReactNode} from 'react';
import {translate,type Locale,type Word} from '@/lib/bm/i18n';
import {lineKey,validateLine,type BagLine} from '@/lib/bm/cart';
type Context={locale:Locale;path:string;t:(key:Word)=>string;href:(path?:string)=>string;bag:BagLine[];add:(line:BagLine)=>void;change:(key:string,quantity:number)=>void;bagOpen:boolean;setBagOpen:(open:boolean)=>void;hydrated:boolean};
const C=createContext<Context|null>(null);
export function BMProvider({locale,path,children}:{locale:Locale;path:string;children:ReactNode}){
 const [bag,setBag]=useState<BagLine[]>([]);const[hydrated,setHydrated]=useState(false);const[bagOpen,setBagOpen]=useState(false);
 useEffect(()=>{try{const data=JSON.parse(localStorage.getItem('bmhair-bag-v1')||'[]');if(Array.isArray(data))setBag(data.slice(0,100).map(validateLine).filter((x):x is BagLine=>!!x));}catch{}setHydrated(true);},[]);
 useEffect(()=>{if(hydrated){try{localStorage.setItem('bmhair-bag-v1',JSON.stringify(bag));}catch{}}},[bag,hydrated]);
 const add=useCallback((line:BagLine)=>{const valid=validateLine(line);if(!valid)return;setBag(old=>{const index=old.findIndex(x=>lineKey(x)===lineKey(valid));return index<0?[...old,valid]:old.map((x,i)=>i===index?{...x,quantity:Math.min(300,x.quantity+valid.quantity)}:x);});setBagOpen(true);},[]);
 const change=useCallback((key:string,quantity:number)=>setBag(old=>quantity<=0?old.filter(x=>lineKey(x)!==key):old.map(x=>lineKey(x)===key?{...x,quantity:Math.max(1,Math.min(300,Math.floor(quantity)||1))}:x)),[]);
 return <C.Provider value={{locale,path,t:key=>translate(locale,key),href:(p='')=>`/${locale}${p?'/'+p.replace(/^\//,''):''}/`.replace(/\/$/,p?'':'/'),bag,add,change,bagOpen,setBagOpen,hydrated}}>{children}</C.Provider>;
}
export const useBM=()=>{const v=useContext(C);if(!v)throw Error('Missing BMProvider');return v;};
export function asset(path:string){return typeof window!=='undefined'?(window as Window&{__BM_ASSETS__?:Record<string,string>}).__BM_ASSETS__?.[path]||path:path;}
export function navigate(path:string){if((window as Window&{__BM_OFFLINE__?:boolean}).__BM_OFFLINE__)window.location.hash=path;else window.location.assign(path);}
