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
import { useTranslations } from "next-intl";
import { useWeatherStore } from "@/lib/store/weather-store";
import { isSameDay } from "date-fns";

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

const TemperatureChart = ({
  data,
}: {
  data: Array<{
    label: string;
    value: number;
  }>;
}) => {
  const t = useTranslations("Chart");
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>{t("temp")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: { color: "var(--color-primary)", label: "Temp" },
          }}
          className="mx-auto aspect-square"
        >
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.replace(0, 3)}
            />
            <YAxis
              dataKey="value"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={36}
              tickFormatter={(value) => toFixedTemp(value)}
              // tickFormatter={(value) => value.replace(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(val) => (
                    <>
                      <div className="flex justify-between items-center w-full">
                        <span>Temp</span>
                        <span>{toFixedTemp(Number(val))}</span>

                        <span>{toFixedTemp(Number(val))}</span>
                      </div>
                    </>
                  )}
                />
              }
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

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
  return (
    <div>
      <TempRainChart
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
      />
      <TemperatureChart
        data={selectedHourly.map(({ temperature, time }) => ({
          label: new Date(time).toLocaleString("en-US", {
            hour: "numeric",
            hour12: false,
          }),
          value: temperature,
        }))}
      />
    </div>
  );
}
