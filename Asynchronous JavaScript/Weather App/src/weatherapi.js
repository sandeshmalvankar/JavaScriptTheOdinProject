import APIKEY from "./../../WeatherApp/src/apikey";
import { round } from "./utils";

const getWeatherData = async (city) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
  );
  let data = await response.json();
  return data;
};

const filterWeatherData = async (data) => {
  let city = data.name;
  let visibility = data.visibility;
  let windSpeed = data.wind.speed;
  let {
    temp,
    temp_max: tempMax,
    temp_min: tempMin,
    feels_like: temperatureFelt,
    pressure: airPressure,
    humidity,
  } = data.main;

  let main = data.weather[0].main;

  return {
    dateTime: new Date().toLocaleString(),
    city,
    visibility: Number(visibility) / 1000,
    airPressure,
    humidity,
    windSpeed,
    temp: round(temp),
    tempMax: round(tempMax),
    tempMin: round(tempMin),
    temperatureFelt: round(temperatureFelt),
    main,
  };
};

export { getWeatherData, filterWeatherData };
