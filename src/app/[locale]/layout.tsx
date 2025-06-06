import Navbar from "@/app/_components/navbar";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import React from "react";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <main className="p-4 space-y-4  min-h-screen w-full">{children}</main>
    </div>
  );
}

export default Layout;
