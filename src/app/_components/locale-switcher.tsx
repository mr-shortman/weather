"use client";
import { Combobox } from "@/components/combobox";
import { useWeatherStore } from "@/lib/store/weather-store";
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
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
      <SelectTrigger
        className={cn("w-full", isPending && "pointer-events-none opacity-60")}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((l) => (
          <SelectItem key={l.value} value={l.value}>
            {l.flag}
            <span className="ml-1">{l.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
