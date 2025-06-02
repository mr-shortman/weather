"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toFixedTemp } from "@/lib/weather-service/utils";

export const description = "A multiple line chart";

const chartConfig = {
  temp: {
    label: "Temp",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ChartData = Array<{
  time: string;
  temp: number;
  rain: number;
}>;
export function ChartLineMultiple({ data }: { data: ChartData }) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent labelFormatter={(value) => `Time: ${value}`} />
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
        <Line
          dataKey="temp"
          type="monotone"
          stroke="var(--destructive)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="rain"
          type="monotone"
          stroke="var(--primary)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
