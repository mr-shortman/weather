import { useWeatherStore } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";
import { getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { isToday } from "date-fns";
import { useFormatter, useTranslations } from "next-intl";
import type { format } from "path";
import React from "react";

export default function DailyForecase({
  data,
}: {
  data: Array<DailyForecast>;
}) {
  const selectedDate = useWeatherStore((state) => state.selectedDate);
  const setSelectedDate = useWeatherStore((state) => state.setSelectedDate);
  const t = useTranslations("Home");
  const format = useFormatter();

  return (
    <div className="flex flex-nowrap overflow-x-auto w-full gap-2 lg:gap-4 pb-2 ">
      {data.map(({ date, maxTemp, weatherCode }, i) => {
        const Icon = getWeatherIcon(weatherCode, true);
        return (
          <div
            key={date}
            className={cn(
              "rounded-xl border-2 w-32 cursor-pointer ",
              selectedDate === date && "border-primary/50"
            )}
            onClick={() => setSelectedDate(date)}
          >
            <div className="flex items-center">
              <div>
                <div className="flex flex-col px-2 py-1">
                  <p className=" h-max justify-between  font-semibold text-lg flex items-center">
                    {isToday(date)
                      ? t("today")
                      : format.dateTime(new Date(date), {
                          timeZone:
                            Intl.DateTimeFormat().resolvedOptions().timeZone,

                          weekday: "short",
                        })}
                    <Icon className="size-8" />
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-muted-foreground ">
                      {format.dateTime(new Date(date), {
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,

                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
