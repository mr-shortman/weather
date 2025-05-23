"use client";
import { api } from "@/trpc/react";

export const tomorrowIoProvider: WeatherProvider = {
  name: "Tomorrow.io",
  link: "",
  logo: "",
  query(lat, lon, lang) {
    const query = api.weather.getTomorrowIoForecast.useQuery({
      lat,
      lon,
      lang,
    });
    return {
      data: query.data,
      refetch: query.refetch,
      isLoading: query.isLoading,
      isRefetching: query.isRefetching,
      dataUpdatedAt: new Date(query.dataUpdatedAt),
    } as WeatherProviderQuery;
  },
};
