"use client";
import {BMProvider} from './context';
import {Header,Footer} from './shell';
import {AgentTools} from './agent-tools';
import {Home} from './home';
import {Collection,ProductPage} from './catalogue';
import {CustomPage,ProfessionalPage} from './enquiry';
import {GuidePage,AboutPage,QualityPage,ReviewsPage,ContactPage,PolicyPage} from './editorial';
import {CartPage,CheckoutPage,AccountPage} from './commerce';
import {Empty,Action} from './common';
import {products,type Category} from '@/lib/bm/catalog';
import {articles} from '@/lib/bm/content';
import {policies} from '@/lib/bm/policies';
import {type Locale,translate} from '@/lib/bm/i18n';
export default function Site({locale='en',path='',commerceEnabled=false}:{locale:Locale;path:string;commerceEnabled?:boolean}){let body:React.ReactNode;const p=path.startsWith('products/')?products.find(x=>x.slug===path.slice(9)):undefined;const a=path.startsWith('guide/')?articles.find(x=>x.slug===path.slice(6)):undefined;
 if(path==='')body=<Home/>;else if(path==='shop')body=<Collection/>;else if(path.startsWith('collections/'))body=<Collection key={path} category={path.slice(12) as Category}/>;else if(p)body=<ProductPage key={p.id} product={p}/>;else if(a)body=<GuidePage article={a}/>;else if(path==='guide')body=<GuidePage/>;else if(path==='custom')body=<CustomPage/>;else if(path==='professionals')body=<ProfessionalPage/>;else if(path==='quality')body=<QualityPage/>;else if(path==='about')body=<AboutPage/>;else if(path==='reviews')body=<ReviewsPage/>;else if(path==='contact')body=<ContactPage/>;else if(path==='cart')body=<CartPage/>;else if(path==='checkout')body=<CheckoutPage commerceEnabled={commerceEnabled}/>;else if(path==='account')body=<AccountPage/>;else if(policies[path])body=<PolicyPage slug={path}/>;else body=<Empty title={translate(locale,'notFound')}><Action to="">{translate(locale,'goHome')}</Action></Empty>;
 return <BMProvider locale={locale} path={path}><AgentTools/><Header/><main id="main" tabIndex={-1}>{body}</main><Footer/></BMProvider>;}
