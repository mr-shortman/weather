const API_KEY = process.env.WEATHERAPI_KEY;

export const weatherApiComProvider: WeatherProvider = {
  name: "WeatherAPI.com",
  link: "",
  logo: "",
  query(lat, lon, lang) {
    return {};
  },
};
