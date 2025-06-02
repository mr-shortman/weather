"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWeatherStore } from "@/lib/store/weather-store";
import { weatherProviders } from "@/lib/weather-service/providers";

export default function SelectWeatherProvider() {
  const provider = useWeatherStore((state) => state.provider);
  const setProvider = useWeatherStore((state) => state.setProvider);

  return (
    <Select defaultValue={provider} onValueChange={setProvider}>
      <SelectTrigger className="w-28 flex">
        <SelectValue placeholder="Theme" className="text-xs" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(weatherProviders).map((key) => (
          <SelectItem key={key} value={key}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
