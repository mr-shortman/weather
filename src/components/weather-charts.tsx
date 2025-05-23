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

export function TempRainChart({
  data,
}: {
  data: Array<{
    time: string;
    rain: number;
    temp: number;
  }>;
}) {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="items-center pb-4">
        <CardTitle>Temperature / Rain</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            temp: { label: "Temperature" },
            rain: { label: "Rain" },
          }}
          className="mx-auto aspect-square max-h-[250px] "
        >
          <RadarChart
            data={data}
            margin={{
              top: -40,
              bottom: -40,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="time" />
            <PolarGrid />
            <Radar
              dataKey="temp"
              fill="var(--color-destructive)"
              fillOpacity={0.6}
            />
            <Radar
              dataKey="rain"
              fill="var(--color-blue-500)"
              fillOpacity={0.6}
            />
            {/* <XAxis
              dataKey={"time"}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            /> */}
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

type TempChartData = Array<{
  label: string;
  value: number;
}>;

const TemperatureChart = ({ data }: { data: TempChartData }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            label: { color: "var(--color-primary)", label: "Temperature" },
          }}
          className="mx-auto aspect-square max-h-[250px]"
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
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
  selectedHourly,
  hourly,
}: {
  hourly: Array<HourlyForecast>;
  selectedHourly: Array<HourlyForecast>;
}) {
  return (
    <div>
      <TempRainChart
        data={selectedHourly.map(({ temperature, time, rainProbability }) => ({
          time: Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            hour12: false,
          })
            .format(new Date(time))
            .replace("/[A-Za-z]/g", ""),
          temp: temperature,
          rain: rainProbability,
        }))}
      />
      <TemperatureChart
        data={hourly.map(({ temperature, time }) => ({
          label: Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            hour12: false,
          })
            .format(new Date(time))
            .replace("/[A-Za-z]/g", ""),
          value: temperature,
        }))}
      />
    </div>
  );
}
