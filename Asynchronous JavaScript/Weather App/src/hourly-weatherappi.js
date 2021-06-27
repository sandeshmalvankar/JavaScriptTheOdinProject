import { APIKEY } from "./apikey";

const getHourlyWeatherData = async (lat, lon) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily,current&appid=${APIKEY}`
  );
  let data = await response.json();
  console.log("hourly data", data);
  return data;
};

export { getHourlyWeatherData };