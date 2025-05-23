import { openMeteoProvider } from "./open-meteo";
import { tomorrowIoProvider } from "./tomorrow-io";
import { weatherApiComProvider } from "./weather-api";

export const weatherProviders = {
  "open-meteo": openMeteoProvider,
  weatherapi: openMeteoProvider, //weatherApiComProvider,
  tomorrowio: openMeteoProvider, //tomorrowIoProvider,
};

export type WeatherProviderKey = keyof typeof weatherProviders;
