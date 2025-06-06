"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toFixedTemp } from "@/lib/weather-service/utils";
import React from "react";
import { RotateCcw } from "lucide-react";
import { isToday } from "date-fns";
import { useWeatherStore } from "@/lib/store/weather-store";
import Location from "@/app/_components/location";
import { useQuery } from "@tanstack/react-query";
import { weatherProviders } from "@/lib/weather-service/providers";
import { getWeatherIcon as getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeatherCharts from "@/app/_components/charts";
import CurrentWeather from "../_components/current-weather";
import { useFormatter, useTranslations } from "next-intl";
import HourlyForecast from "../_components/hourly-forecast";
import { Skeleton } from "@/components/ui/skeleton";
import DailyForecase from "../_components/daily-forecase";

export default function Home() {
  const {
    selectedLocation,
    selectedDate,
    provider,
    language,
    setSelectedDate,
  } = useWeatherStore();

  const { lat, lon } = selectedLocation!;
  const { data, isLoading, refetch, isRefetching, dataUpdatedAt } = useQuery({
    queryKey: ["weather-forecast", selectedLocation!.name],
    queryFn: async () =>
      await weatherProviders[provider].query(lat, lon, language),
    enabled: !!lat && !!lon,
  });

  React.useEffect(() => {
    const handleSelectedDate = () => {
      if (!selectedDate && data?.daily?.length) {
        setSelectedDate(data.daily[0]?.date);
      }
      handleSelectedDate();
      window.addEventListener("focus", handleSelectedDate);
      return () => {
        window.removeEventListener("focus", handleSelectedDate);
      };
    };
  }, [data, selectedDate]);

  const t = useTranslations("Home");
  const format = useFormatter();

  const selectedDay = data?.daily?.find((d) => d.date === selectedDate);
  if (provider !== "open-meteo") return <p>API Key required</p>;
  if (isLoading) return <Skeleton className="w-full size-full" />;

  return (
    <div>
      <div className="fixed top-0 h-4 w-full bg-background z-50" />
      <div className="sticky z-50 top-4 bg-background pb-2">
        <Location timezone={data?.timezone} />
      </div>
      <div className="flex">
        {data && (
          <Button
            onClick={() => refetch()}
            className="ml-auto py-1 h-max"
            disabled={isRefetching}
            size={"xs"}
            variant={"outline"}
          >
            {isRefetching ? (
              t("loading")
            ) : (
              <>
                <span>
                  {format.dateTime(new Date(dataUpdatedAt), {
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  })}
                </span>
                <RotateCcw className="size-3" />
              </>
            )}
          </Button>
        )}
      </div>
      {data?.current && (
        <CurrentWeather
          weather={{
            current: data.current,
            sunrise: data.daily[0]?.sunrise!,
            sunset: data.daily[0]?.sunset!,
          }}
        />
      )}

      <div className="sticky z-50 top-18  py-2 bg-background space-y-2 mt-4  ">
        <div className="flex items-center px-2 ">
          {selectedDate && (
            <div className="flex justify-between w-full items-center gap-2 ">
              <h4 className="text-sm ">
                {format.dateTime(new Date(selectedDate), {
                  day: "numeric",
                  month: "numeric",
                  weekday: "short",
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                })}
              </h4>
              {selectedDay && (
                <div className="text-sm flex items-center gap-1 justify-around ">
                  <span className="">{toFixedTemp(selectedDay.minTemp)}</span>
                  <span>-</span>
                  <span className="">{toFixedTemp(selectedDay.maxTemp)}</span>
                </div>
              )}
            </div>
          )}
        </div>
        {data?.daily && <DailyForecase data={data.daily} />}
      </div>
      {selectedLocation?.id ? (
        <Tabs defaultValue="hourly" className="w-full mt-4">
          <TabsList className="w-full p-0 bg-transparent">
            <TabsTrigger
              className="rounded-full shadow-none data-[state=active]:shadow-none data-[state=active]:border-border"
              value="hourly"
            >
              {t("hourly")}
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-full shadow-none data-[state=active]:shadow-none data-[state=active]:border-border"
            >
              {t("details")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hourly">
            {data?.hourly?.length ? (
              <HourlyForecast data={data?.hourly!} />
            ) : null}
          </TabsContent>
          <TabsContent value="details">
            <WeatherCharts hourly={data?.hourly!} />
          </TabsContent>
        </Tabs>
      ) : (
        <p className="relative z-50 text-center">
          {t("selectLocationToStart")}
        </p>
      )}
    </div>
  );
}
