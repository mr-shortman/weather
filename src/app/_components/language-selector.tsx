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

const languages = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "it", label: "Italiano", flag: "🇮🇹" },
];
export default function LanguageSelector() {
  const language = useWeatherStore((state) => state.language);
  const setLanguage = useWeatherStore((state) => state.setLanguage);
  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((l) => (
          <SelectItem
            key={l.value}
            value={l.value}
            onSelect={() => setLanguage(l.value)}
          >
            {l.flag}
            <span className="ml-1">{l.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
