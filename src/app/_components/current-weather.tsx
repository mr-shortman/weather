import { toFixedTemp } from "@/lib/weather-service/utils";
import { getWeatherIcon as getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { Sparkle, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

function CurrentWeather({
  weather,
}: {
  weather: Pick<WeatherData, "current"> & {
    sunrise: string;
    sunset: string;
  };
}) {
  const {
    current: { temp, weatherCode, isDay },
  } = weather;
  const sunrise = new Date(weather.sunrise).getTime(); // e.g. "2025-05-23T04:58:00"
  const sunset = new Date(weather.sunset).getTime(); // e.g. "2025-05-23T20:15:00"
  const now = Date.now();
  let progress = 0;
  if (now > sunrise && now < sunset) {
    progress = ((now - sunrise) / (sunset - sunrise)) * 100;
  } else if (now >= sunset) {
    progress = 100;
  } else {
    progress = 0;
  }
  const CurrentWeatherIcon = getWeatherIcon(weatherCode, isDay);
  const t = useTranslations("Home");

  return (
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
  );
}

export default CurrentWeather;
