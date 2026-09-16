import type { Metadata } from "next";
import {headers} from 'next/headers';
import "./globals.css";

export const metadata: Metadata = {
  title: {default:"BM HAIR — Premium natural hair",template:"%s | BM HAIR"},
  description: "Natural-hair wigs, ponytails and extensions. Professional expertise from Latvia, for women and hair professionals across Europe.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h=await headers();
  const lang=h.get('x-bm-locale')||'en';
  return (
    <html lang={['en','it','lv','ru'].includes(lang)?lang:'en'}>
      <head><link rel="stylesheet" href="/fonts/fonts.css"/><link rel="preload" href="/fonts/font-1.woff" as="font" type="font/woff" crossOrigin="anonymous"/><link rel="preload" href="/fonts/font-3.woff" as="font" type="font/woff" crossOrigin="anonymous"/></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
