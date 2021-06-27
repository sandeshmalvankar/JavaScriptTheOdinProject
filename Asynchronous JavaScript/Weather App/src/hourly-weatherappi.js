import { APIKEY } from "./apikey";
import { round } from "./utils";

const getHourlyWeatherData = async (lat, lon) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily,current&appid=${APIKEY}`
  );
  let data = await response.json();
  //console.log("hourly data", data);
  return data;
};

const filterHourlyData = (data) => {
  let currentTime = new Date();
  let hourlyData = [];
  let time, temp, description, hourData;

  for (let i = 0; i < 24; i++) {
    time = currentTime.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    });
    currentTime.setHours(currentTime.getHours() + 1);

    temp = round(data[i].temp);
    description = data[i].weather[0].description;

    hourData = { time, description, temp };
    hourlyData.push(hourData);
  }

  return hourlyData;
};
export { getHourlyWeatherData, filterHourlyData };
