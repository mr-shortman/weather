"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { locales, languages, type Locale } from "@/i18n/config";
import { useRouter as useAppRouter } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useAppRouter(); // This is the i18n-aware router
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextLocale: Locale) => {
    // Strip the current locale from the path
    const segments = pathname.split("/");
    const pathWithoutLocale = "/" + segments.slice(2).join("/");

    // Push new locale path
    startTransition(() => {
      router.replace(pathWithoutLocale, { locale: nextLocale });
      router.refresh();
    });
  };

  return (
    <Select disabled={isPending} value={locale} onValueChange={handleChange}>
      <Button
        asChild
        variant="outline"
        className="w-full justify-between  relative"
      >
        <SelectTrigger>
          {isPending ? (
            <Icons.loading className=" text-muted-foreground absolute size-full" />
          ) : (
            <SelectValue />
          )}
        </SelectTrigger>
      </Button>
      <SelectContent>
        {languages.map((l) => (
          <SelectItem value={l.value} key={l.value}>
            {l.flag}
            <span className="ml-1">{l.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
