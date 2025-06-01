import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { TRPCReactProvider } from "@/trpc/react";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";

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
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <NextIntlClientProvider
            timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
