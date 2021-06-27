import APIKEY from "./../../WeatherApp/src/apikey";
import { getElementById, round } from "./utils";

const getWeatherData = async (city) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
  );
  let data = await response.json();
  //console.log('data',data);
  if(data.cod == 404) throw new Error('City not found')
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

const fillData = ({
  dateTime,
  city,
  visibility,
  airPressure,
  humidity,
  windSpeed,
  temp,
  tempMax,
  tempMin,
  temperatureFelt,
  main,
}) => {
  let display = [
    { key: "city", value: city },
    { key: "date-time", value: dateTime },
    { key: "visibility", value: `${visibility}` },
    { key: "air-pressure", value: `${airPressure}` },
    { key: "humidity", value: `${humidity}` },
    { key: "wind-speed", value: `${windSpeed}` },
    { key: "temp", value: temp },
    { key: "temp-max", value: tempMax },
    { key: "temp-min", value: tempMin },
    { key: "temperature-felt", value: temperatureFelt },
    { key: "main", value: main },
  ];

  display.forEach(({ key, value }) => {
    getElementById(key).textContent = value;
  });
};
export { getWeatherData, filterWeatherData, fillData };
