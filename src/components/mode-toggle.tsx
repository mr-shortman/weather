"use client";

import * as React from "react";
import { ChevronDown, Moon, Settings2, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, theme, themes } = useTheme();
  const t = useTranslations("Settings.themes");
  return (
    <Select value={theme} onValueChange={setTheme}>
      <Button asChild variant="outline" className="w-full justify-between ">
        <SelectTrigger>
          <div className="flex items-center gap-2 ">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="capitalize">{theme}</span>
            <span className="sr-only">Toggle theme</span>
          </div>
        </SelectTrigger>
      </Button>
      <SelectContent>
        {themes.map((l) => (
          <SelectItem key={l} value={l}>
            {t(l as any)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
