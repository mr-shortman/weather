export async function fetchLocation(lat: number, lon: number, language = "de") {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const data = await response.json();
  console.log(data.address);

  return data
    ? ({
        id: data.place_id,
        name: data.address.neighbourhood ?? data.city,
        country: data.address.country,
        countryCode: data.address.country_code?.toUpperCase(),
        lat,
        lon,
      } satisfies WeatherLocation)
    : undefined;
}
