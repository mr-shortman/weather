import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
