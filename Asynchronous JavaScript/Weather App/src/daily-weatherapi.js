import { APIKEY } from "./apikey";
import { round } from "./utils";

const getDailyWeatherData = async (lat, lon) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,current&appid=${APIKEY}`
  );
  let data = await response.json();
  //console.log("daily data", data);
  return data;
};

const filterDailyData = async (data) => {
  let currentDateTime = new Date();
  let dailyData = [];
  let weekDayDate,
    weekday,
    date,
    tempMax,
    tempMin,
    imageDescription,
    description,
    daily;

  for (let i = 1; i < 8; i++) {
    weekDayDate = currentDateTime
      .toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        weekday: "short",
      })
      .split(",");
    currentDateTime.setDate(currentDateTime.getDate() + 1);

    weekday = weekDayDate[0];
    date = weekDayDate[1];

    tempMax = round(data[i].temp.max);
    tempMin = round(data[i].temp.min);

    description = data[i].weather[0].description;
    imageDescription = description.split(" ");
    imageDescription = imageDescription[imageDescription.length - 1];

    daily = { weekday, date, imageDescription, description, tempMax, tempMin };
    dailyData.push(daily);
  }

  return dailyData;
};

export { getDailyWeatherData, filterDailyData };
