"use client";
import { useWeatherStore } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";
import { getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { isSameDay, isToday } from "date-fns";
import { useFormatter, useTranslations } from "next-intl";
import React from "react";

const DayCard = ({
  date,
  weatherCode,
  label,
  cb,
}: {
  date: string;
  weatherCode: number;
  label: string;
  cb?: () => void;
}) => {
  const Icon = getWeatherIcon(weatherCode, true);
  const format = useFormatter();
  const selectedDate = useWeatherStore((state) => state.selectedDate);
  const setSelectedDate = useWeatherStore((state) => state.setSelectedDate);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleSelect = () => {
    setSelectedDate(date);
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // prevent vertical scroll
        inline: "start", // align to the start of the horizontal scroll container
      });
    }
    cb?.();
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border-2 w-max cursor-pointer ",
        isSameDay(new Date(selectedDate!), date) && "border-primary/50"
      )}
      onClick={handleSelect}
    >
      <div className="flex items-center">
        <div>
          <div className="flex flex-col px-2 py-1">
            <p className=" h-max justify-between  font-semibold text-lg flex items-center">
              {label}
              <Icon className="size-8" />
            </p>
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-muted-foreground ">
                {format.dateTime(new Date(date), {
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

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
};

export default function DailyForecase({
  data,
}: {
  data: Array<DailyForecast>;
}) {
  const selectedDate = useWeatherStore((state) => state.selectedDate);
  const setSelectedDate = useWeatherStore((state) => state.setSelectedDate);
  const t = useTranslations("Home");
  const format = useFormatter();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToStart = () => {
    scrollContainerRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };
  React.useEffect(() => {
    const handleSelectedDate = () => {
      if (!selectedDate && data?.length) {
        setSelectedDate(data[0]?.date);
      }
    };
    handleSelectedDate();
    window.addEventListener("focus", handleSelectedDate);
    return () => {
      window.removeEventListener("focus", handleSelectedDate);
    };
  }, [data, selectedDate]);
  const today = data.find((item) => isToday(item.date))!;
  return (
    <div className="flex items-center gap-2">
      <div className="pb-2">
        <DayCard
          date={today.date}
          weatherCode={today.weatherCode}
          label={t("today")}
          cb={scrollToStart}
        />
      </div>
      <div
        ref={scrollContainerRef}
        className="flex pb-2 flex-nowrap overflow-x-auto w-full gap-2 lg:gap-4 "
      >
        {data
          .filter((item) => !isToday(item.date))
          .map(({ date, weatherCode }, i) => (
            <DayCard
              key={date}
              date={date}
              label={format.dateTime(new Date(date), {
                weekday: "short",
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })}
              weatherCode={weatherCode}
            />
          ))}
      </div>
    </div>
  );
}
