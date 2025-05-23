import LanguageSelector from "@/app/_components/language-selector";
import SelectWeatherProvider from "@/app/_components/select-weather-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SettingsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <Button asChild variant={"outline"}>
          <Link href={"/"}>
            <ArrowLeft />
            <span>Go Back</span>
          </Link>
        </Button>
      </div>
      {/* <div className="space-y-2">
        <h3 className="text-sm pl-2">Language</h3>
        <LanguageSelector />
      </div> */}
      {/* <div className="space-y-2">
        <h3 className="text-sm pl-2">Provider</h3>
        <SelectWeatherProvider />
      </div> */}
      {/* <div className="p-2 rounded-md border"></div> */}
    </>
  );
}
