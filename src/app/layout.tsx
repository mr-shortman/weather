import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "./providers";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Weather",
  description: "Simple Weather App",
  icons: [{ rel: "icon", url: "/icons/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${geist.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
