"use client";
import React from "react";
import { usePWAInstall } from "@/lib/hook/use-pwa-install";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
function InstallButton() {
  const { installPrompt, isAppInstalled, promptInstall } = usePWAInstall();
  const t = useTranslations("Settings.pwa");
  if (isAppInstalled)
    return (
      <p>
        <span className="text-lg pl-2">✅</span> {t("appInstalled")}
      </p>
    );
  if (!installPrompt)
    return (
      <p className="text-sm text-center text-destructive">
        <span className="text-lg">🫤</span> {t("browserNotSupported")}
      </p>
    );

  return <Button onClick={promptInstall}>Install App</Button>;
}

export default InstallButton;
