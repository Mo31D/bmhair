import {NextResponse,type NextRequest} from 'next/server';
export function middleware(request:NextRequest){const locale=request.nextUrl.pathname.split('/')[1];const headers=new Headers(request.headers);headers.set('x-bm-locale',['en','it','lv','ru'].includes(locale)?locale:'en');return NextResponse.next({request:{headers}});}
export const config={matcher:['/((?!api|_next|assets|images|fonts|favicon).*)']};
