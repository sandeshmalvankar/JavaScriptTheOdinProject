import { APIKEY } from "./apikey";

const getDailyWeatherData = async (lat, lon) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,current&appid=${APIKEY}`
  );
  let data = await response.json();
  //console.log("daily data", data);
  return data;
};

export { getDailyWeatherData };
