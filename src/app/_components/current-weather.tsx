import { toFixedTemp } from "@/lib/weather-service/utils";
import { getWeatherIcon as getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { Sparkle, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import SunSetRise from "./sun-set-rise";

function CurrentWeather({
  weather,
}: {
  weather: Pick<WeatherData, "current"> & {
    sunrise: string;
    sunset: string;
    timezone: string;
  };
}) {
  const {
    current: { temp, weatherCode, isDay },
    sunrise,
    sunset,
    timezone,
  } = weather;

  const CurrentWeatherIcon = getWeatherIcon(weatherCode, isDay);
  const t = useTranslations("Home");

  return (
    <>
      <div className="mt-4 py-4 px-6 border rounded-3xl bg-primary text-primary-foreground">
        <div className=" flex items-center justify-between">
          <div className="">
            <div className="flex text-xs items-center gap-1">
              <span className="">{t("weatherNow")}</span>
              {isDay ? (
                <>
                  <Sun className="size-3" />
                  <span>{t("day")}</span>
                </>
              ) : (
                <>
                  <Sparkle className="size-3" />
                  <span>{t("night")}</span>
                </>
              )}
            </div>
            <span className="text-4xl font-black">{toFixedTemp(temp)}</span>
          </div>

          <CurrentWeatherIcon className="size-10" />
        </div>
      </div>
      <div className="p-4">
        <SunSetRise
          timezone={timezone}
          sunset={new Date(sunset!)}
          sunrise={new Date(sunrise!)}
        />
      </div>
    </>
  );
}

export default CurrentWeather;
