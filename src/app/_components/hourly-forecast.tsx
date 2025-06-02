"use client";
import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/lib/store/weather-store";
import { toFixedTemp } from "@/lib/weather-service/utils";
import { getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { addDays, isAfter, isSameDay, isTomorrow } from "date-fns";
import { CloudRain } from "lucide-react";
import { useFormatter, useNow, useTranslations } from "next-intl";
import React from "react";

function HourlyForecast({ data }: { data: Array<HourlyForecast> }) {
  const [expandMore, setExpandMore] = React.useState(false);
  const selectedDate = useWeatherStore((state) => state.selectedDate);
  const now = useNow();
  const selectedHourlyForecast = React.useMemo(() => {
    if (!data || !selectedDate) return [];
    const startOfThisHour = new Date(now.getTime());
    startOfThisHour.setMinutes(0, 0, 0);
    startOfThisHour.setHours(startOfThisHour.getHours() - 1);

    return data.filter(
      (h) =>
        isAfter(h.time, startOfThisHour) &&
        (isSameDay(new Date(h.time), new Date(selectedDate)) ||
          (expandMore &&
            isSameDay(new Date(h.time), addDays(new Date(selectedDate), 1))))
    );
  }, [data, selectedDate, expandMore]);

  const t = useTranslations("Home");
  const format = useFormatter();

  return (
    <div className="space-y-2">
      {selectedHourlyForecast?.map((h) => {
        const Icon = getWeatherIcon(h.weatherCode, h.isDay);

        return (
          <div
            key={h.time}
            className=" p-4 flex  items-center  rounded-xl border grow w-full relative"
          >
            {isSameDay(addDays(selectedDate!, 1), new Date(h.time)) && (
              <div className="absolute -top-2.5 text-xs right-2 w-max px-2 py-px rounded-full border-2 h-max bg-background opacity-50">
                {isTomorrow(new Date(h.time))
                  ? t("tomorrow")
                  : format.dateTime(new Date(h.time), {
                      weekday: "long",
                      timeZone:
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                    })}
              </div>
            )}

            <p className="text-xl">
              {format.dateTime(new Date(h.time), {
                hour: "numeric",
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })}
            </p>

            <div className="ml-auto flex items-center">
              {h.rainProbability > 5 && (
                <div className="mr-4 flex text-primary text-sm items-center gap-1">
                  <CloudRain className="size-3" />
                  <p>{h.rainProbability}%</p>
                </div>
              )}

              <p className="text-xl font-semibold ">
                {toFixedTemp(h.temperature)}
              </p>
              <Icon className="size-8 ml-2" />
            </div>
          </div>
        );
      })}
      <Button
        className="size-max px-4 py-0  text-xs hover:bg-background"
        variant={"ghost"}
        onClick={() => setExpandMore(!expandMore)}
      >
        {expandMore ? t("expandLess") : t("expandMore")}
      </Button>
    </div>
  );
}

export default HourlyForecast;
