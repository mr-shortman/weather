import LocaleSwitcher from "@/app/_components/locale-switcher";
import SelectWeatherProvider from "@/app/_components/select-weather-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function SettingsPage() {
  const t = useTranslations("Settings");
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <Button asChild variant={"outline"}>
          <Link href={"/"}>
            <ArrowLeft />
            <span>{t("goBack")}</span>
          </Link>
        </Button>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm pl-2">{t("language")}</h3>
        <LocaleSwitcher />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm pl-2">{t("theme")}</h3>
        <ModeToggle />
      </div>
      {/* <div className="space-y-2">
        <h3 className="text-sm pl-2">Provider</h3>
        <SelectWeatherProvider />
      </div> */}
      {/* <div className="p-2 rounded-md border"></div> */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 100 }).map((_, i) => {
          const Icon = getWeatherIcon(i, true);
          return (
            <div
              key={i}
              className="p-2 rounded-md border flex items-center justify-center"
            >
              <Icon className="size-10" />
            </div>
          );
        })}
      </div>
    </>
  );
}
