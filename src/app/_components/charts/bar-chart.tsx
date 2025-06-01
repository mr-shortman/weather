"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toFixedTemp } from "@/lib/weather-service/utils";

export const description = "A horizontal bar chart";

const chartConfig = {
  temp: {
    label: "Temp",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type ChartData = Array<{
  time: string;
  temp: number;
}>;

export function ChartBarHorizontal({ data }: { data: ChartData }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-96">
      <BarChart accessibilityLayer data={data} layout="vertical" className="">
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="time"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="temp" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="temp"
          layout="vertical"
          fill="var(--destructive)"
          radius={4}
        >
          <LabelList
            dataKey="time"
            position="insideLeft"
            offset={8}
            className="fill-(--destructive-foreground)"
            fontSize={10}
          />
          <LabelList
            formatter={(value: any) => toFixedTemp(value)}
            dataKey="temp"
            position="right"
            offset={8}
            className=""
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
