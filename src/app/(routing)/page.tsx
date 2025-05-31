"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toFixedTemp } from "@/lib/weather-service/utils";
import React from "react";
import { CloudRain, Moon, RotateCcw, Sun } from "lucide-react";
import { isToday, isSameDay } from "date-fns";
import { useWeatherStore } from "@/lib/store/weather-store";
import Location from "@/app/_components/location";
import { useQuery } from "@tanstack/react-query";
import { weatherProviders } from "@/lib/weather-service/providers";
import { getWeatherIcon as getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeatherCharts from "@/app/_components/weather-charts";
import CurrentWeather from "../_components/current-weather";
import { useTranslations } from "next-intl";
import HourlyForecast from "../_components/hourly-forecast";

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
  // {
  //     }

  // weatherProviders[provider].query(lat, lon, language);

  React.useEffect(() => {
    if (!selectedDate && data?.daily?.length) {
      setSelectedDate(data.daily[0]?.date);
    }
  }, [data, selectedDate]);

  const t = useTranslations("Home");

  if (provider !== "open-meteo") return <p>API Key required</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="fixed top-0 h-4 w-full bg-background z-50" />
      <div className="sticky z-50 top-4 bg-background pb-2">
        <Location timezone={data?.timezone} />
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
            <h3 className="text-sm ">
              {Intl.DateTimeFormat(undefined, {
                day: "numeric",
                month: "numeric",
                weekday: "short",
              })
                .format(new Date(selectedDate))
                .replaceAll("/", ".")
                .replace(",", "")}
            </h3>
          )}
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
                    {Intl.DateTimeFormat(undefined, {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(dataUpdatedAt))}
                  </span>
                  <RotateCcw className="size-3" />
                </>
              )}
            </Button>
          )}
        </div>
        <div className="flex flex-nowrap overflow-x-auto gap-2 lg:gap-4 pb-2 ">
          {data &&
            data.daily.map(({ date, minTemp, maxTemp, weatherCode }, i) => {
              return (
                <div
                  key={date}
                  className={cn(
                    "p-2 rounded-xl border-2 w-32 cursor-pointer ",
                    selectedDate === date && "border-primary/25"
                  )}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-lg">
                        {isToday(date)
                          ? t("today")
                          : Intl.DateTimeFormat("en-US", {
                              weekday: "short",
                            }).format(new Date(date))}
                        <span className="ml-2">{toFixedTemp(maxTemp)}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Intl.DateTimeFormat(undefined, {
                          day: "2-digit",
                          month: "2-digit",
                        }).format(new Date(date))}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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
          Select a location to get started
        </p>
      )}
    </div>
  );
}
