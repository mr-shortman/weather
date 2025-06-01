"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  XAxis,
  LineChart,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toFixedTemp } from "@/lib/weather-service/utils";
import { useFormatter, useTranslations } from "next-intl";
import { useWeatherStore } from "@/lib/store/weather-store";
import { isSameDay } from "date-fns";
import { ChartBarHorizontal } from "./bar-chart";
import { ChartLineMultiple } from "./line-chart";

export function TempRainChart({
  data,
}: {
  data: Array<{
    time: string;
    rain: number;
    temp: number;
  }>;
}) {
  const t = useTranslations("Chart");

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="items-center pb-4">
        <CardTitle>{`${t("temp")} / ${t("rain")}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            temp: { label: "Temp °C" },
            rain: { label: "Rain %" },
          }}
          className="mx-auto aspect-square "
        >
          <RadarChart
            data={data}
            margin={{
              top: -40,
              bottom: -20,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    `Time: ${Number(value).toString()}`
                  }
                  indicator="line"
                />
              }
              formatter={(value, name, item, index, payload) => {
                if (name === "temp")
                  return (
                    <div className="flex w-full justify-between items-center relative pl-2">
                      <div
                        style={{
                          backgroundColor: item.color,
                        }}
                        className="w-1 h-3 absolute left-0 rounded-full"
                      />
                      <span>Temp</span>
                      <span>{toFixedTemp(Number(value))}</span>
                    </div>
                  );
                else if (name === "rain")
                  return (
                    <div className="flex w-full justify-between items-center relative pl-2">
                      <div
                        style={{
                          backgroundColor: item.color,
                        }}
                        className="w-1 h-3 absolute left-0 rounded-full"
                      />
                      <span>Rain</span>
                      <span>{`${value}%`}</span>
                    </div>
                  );
                return "unknown";
              }}
            />
            <PolarAngleAxis
              dataKey="time"
              tickFormatter={(value) => Number(value).toString()}
            />
            <PolarGrid />
            <Radar
              label={"test"}
              dataKey="temp"
              fill="var(--color-destructive)"
              fillOpacity={0.6}
            />
            <Radar
              dataKey="rain"
              fill="var(--color-blue-500)"
              fillOpacity={0.6}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default function WeatherCharts({
  hourly,
}: {
  hourly: Array<HourlyForecast>;
}) {
  const selectedDate = useWeatherStore((state) => state.selectedDate);
  const selectedHourly = React.useMemo(() => {
    if (!hourly || !selectedDate) return [];

    return hourly.filter((h) =>
      isSameDay(new Date(h.time), new Date(selectedDate))
    );
  }, [hourly, selectedDate]);
  const format = useFormatter();
  return (
    <div>
      <ChartLineMultiple
        data={selectedHourly.map(({ rainProbability, temperature, time }) => ({
          time: format.dateTime(new Date(time), {
            hour: "numeric",
            hour12: false,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
          temp: temperature,
          rain: rainProbability,
        }))}
      />

      <p className="mt-12 mx-auto text-muted-foreground text-xs text-center ">
        More Charts soon
      </p>
      {/* <TempRainChart
        data={selectedHourly.map(({ temperature, time, rainProbability }) => ({
          time: Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            hour12: false,
          })
            .format(new Date(time))
            .replace(/[A-Za-z]/g, ""),
          temp: temperature,
          rain: rainProbability,
        }))}
      /> */}
      {/* <TemperatureChart
        data={selectedHourly.map(({ temperature, time }) => ({
          label: new Date(time).toLocaleString("en-US", {
            hour: "numeric",
            hour12: false,
          }),
          value: temperature,
        }))}
      /> */}
    </div>
  );
}
