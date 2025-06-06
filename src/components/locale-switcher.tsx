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
import { languages, type Locale } from "@/i18n/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LocaleSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  function onChange(value: string) {
    const locale = value as Locale;

    fetch("/api/set-locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    }).then(() => {
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
