"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toFixedTemp } from "@/lib/weather-service/utils";
import React from "react";
import { CloudRain, Moon, RotateCcw, Sun } from "lucide-react";
import { isToday, isSameDay } from "date-fns";
import { useWeatherStore } from "@/lib/store/weather-store";
import Location from "@/components/location";
import { useQuery } from "@tanstack/react-query";
import { weatherProviders } from "@/lib/weather-service/providers";
import { getWEatherIcon as getWeatherIcon } from "@/lib/weather-service/weather-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeatherCharts from "@/components/weather-charts";

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

  const selectedHourlyForecast = React.useMemo(() => {
    if (!data?.hourly || !selectedDate) return [];

    return data.hourly.filter((h) =>
      isSameDay(new Date(h.time), new Date(selectedDate))
    );
  }, [data, selectedDate]);

  if (provider !== "open-meteo") return <p>API Key required</p>;

  if (isLoading) return <p>Loading...</p>;
  const CurrentWeatherIcon = getWeatherIcon(
    data?.current?.weatherCode!,
    data?.current.isDay!
  );

  return (
    <div>
      <div className="sticky z-50 top-0 bg-background">
        <div
          className="" //"text-primary-foreground bg-primary mask-alpha mask-b-from-primary mask-b-from-50% mask-b-to-transparent h-20"
        >
          <Location timezone={data?.timezone} />
        </div>
      </div>

      {data?.current && (
        <div className="px-4">
          <div className="p-2 border rounded-xl bg-primary text-primary-foreground flex items-center justify-between">
            <div className="">
              <div className="flex text-xs items-center gap-1">
                <span className="">Weather Now</span>
                {data.current?.isDay ? (
                  <>
                    <Sun className="size-3" />
                    <span>Day</span>
                  </>
                ) : (
                  <>
                    <Moon />
                    <span>Night</span>
                  </>
                )}
              </div>
              <span className="text-4xl font-bold">
                {toFixedTemp(data.current?.temp)}
              </span>
            </div>
            <span className="text-5xl">
              <CurrentWeatherIcon />
            </span>
          </div>
        </div>
      )}

      <div className="sticky z-50 top-20  py-2 bg-background space-y-2 px-4">
        <div className="flex items-center px-4 ">
          {selectedDate && (
            <h3 className="text-lg ">
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
              size={"sm"}
              disabled={isRefetching}
              variant={"outline"}
            >
              {isRefetching ? (
                "Loading..."
              ) : (
                <>
                  <span>
                    {Intl.DateTimeFormat(undefined, {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(dataUpdatedAt))}
                  </span>
                  <RotateCcw className="size-4" />
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
                    "bg-card text-card-foreground p-2 rounded-xl border w-32",
                    selectedDate === date && "border-emerald-600  border-2"
                  )}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold text-lg">
                        {isToday(date)
                          ? "Today"
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
        <Tabs defaultValue="hourly" className="w-full px-4">
          <TabsList className="w-full">
            <TabsTrigger className="" value="hourly">
              Hourly
            </TabsTrigger>
            <TabsTrigger value="chart">Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="hourly">
            {data ? (
              <div className="space-y-2">
                <div className=" w-full py-4 bg-background">
                  <h3 className="text-2xl font-bold flex ">Hourly</h3>
                </div>
                {selectedHourlyForecast?.map((h) => {
                  const Icon = getWeatherIcon(h.weatherCode, h.isDay);

                  return (
                    <div
                      key={h.time}
                      className="bg-card text-card-foreground p-4 flex  items-center  rounded-xl border grow w-full"
                    >
                      <p className="text-xl">
                        {new Date(h.time).toLocaleString(undefined, {
                          hour: "numeric",
                        })}
                      </p>
                      <Icon className="text-5xl ml-4" />

                      <div className="ml-auto flex items-center">
                        {h.rainProbability > 0 && (
                          <div className="mr-4 flex text-primary items-center gap-1">
                            <CloudRain className="size-4" />
                            <p>{h.rainProbability}%</p>
                          </div>
                        )}

                        <p className="text-2xl font-bold ">
                          {toFixedTemp(h.temperature)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No Data</p>
            )}
          </TabsContent>
          <TabsContent value="chart">
            <WeatherCharts
              selectedHourly={selectedHourlyForecast}
              hourly={data?.hourly!}
            />
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
