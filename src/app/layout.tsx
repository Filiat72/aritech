import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aritech CMS",
  description: "Aritech Admin Panel",

  verification: {
    google:
      "7wwdBLF9KeQalVJPBqKjU6ieWbm4MBWihgHy0SmOXP8",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params;

  return (
    <html
      lang={locale ?? "en"}
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", figtree.variable)}
    >
      <body className="min-h-full flex flex-col">
  <Providers>
    {children}
  </Providers>

  <Script id="zoho-salesiq-init" strategy="afterInteractive">
    {`
      window.$zoho = window.$zoho || {};
      $zoho.salesiq = $zoho.salesiq || {
        ready: function() {}
      };
    `}
  </Script>

  <Script
    id="zsiqscript"
    src="https://salesiq.zohopublic.in/widget?wc=siq35b5d58838008420e1f605d94fee6622dfb3113eac433f2a4fbeb1f29c194762"
    strategy="afterInteractive"
  />
</body>
    </html>
  );
}