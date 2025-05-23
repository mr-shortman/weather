type HourlyForecast = {
  time: string;
  temperature: number;
  weatherCode: number;
  rainProbability: number;
  isDay: boolean;
};

type DailyForecast = {
  date: string;
  minTemp: number;
  maxTemp: number;
  weatherCode: number;
};

type WeatherData = {
  timezone: string;
  current: {
    temp: number;
    isDay: boolean;
    weatherCode: number;
  };
  hourly: HourlyForecast[];
  daily: DailyForecast[];
};

type WeatherProvider = {
  name: string;
  link: string;
  logo: string;
  query: (lat: number, lon: number, lang: string) => Promise<WeatherData>;
};

type WeatherInfo = {
  description: string;
  icon: string;
};

type WeatherLocation = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
};
