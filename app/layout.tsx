import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Tiro_Bangla, Cormorant_Garamond } from "next/font/google";
const bangla = Tiro_Bangla({ subsets:["bengali","latin"], weight:"400", variable:"--f-bangla" });
const serif = Cormorant_Garamond({ subsets:["latin"], weight:["400","500","600"], style:["normal","italic"], variable:"--f-serif" });
export const metadata: Metadata = { title:"Shubho Bibaho · Riya & Arjun", description:"You are invited to the wedding of Riya & Arjun · 12 February 2027" };
export const viewport: Viewport = { width:"device-width", initialScale:1, viewportFit:"cover", themeColor:"#2B0A10" };
export default function RootLayout({ children }:{ children:React.ReactNode }) {
  return <html lang="bn"><body className={`${bangla.variable} ${serif.variable}`}>{children}</body></html>;
}
