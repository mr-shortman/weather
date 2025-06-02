"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { setUserLocale } from "@/i18n/service";
import { languages, type Locale } from "@/i18n/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const locale = useLocale();
  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
      router.refresh();
    });
  }

  return (
    <Select value={locale} onValueChange={onChange}>
      <Button asChild variant="outline" className="w-full justify-between ">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Button>
      <SelectContent>
        {languages.map((l) => (
          <SelectItem key={l.value} value={l.value} className="">
            {l.flag}
            <span className="ml-1">{l.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
