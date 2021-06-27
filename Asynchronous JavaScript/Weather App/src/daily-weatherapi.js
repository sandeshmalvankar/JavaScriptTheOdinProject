import { APIKEY } from "./apikey";
import { createElement, createEleWithClass, getElementById, round } from "./utils";

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

const fillDailyData = (dailyData) => {
  let dailyDataSection = getElementById("daily-data");
  //clear previous loaded data
  dailyDataSection.innerHTML = "";

  for (const daily of dailyData) {
    let divRow = createEleWithClass("div", "row" ,"daily-data-item");

    let date = createEleWithClass("div", "col");
    date.textContent = daily.date;
    divRow.appendChild(date);

    let day = createEleWithClass("div", "col");
    day.textContent = daily.weekday;
    divRow.appendChild(day);

    let image = createEleWithClass("img", "daily-image");
    if (daily.imageDescription == "clouds") {
        image.src = "../src/images/cloud.png";
    } else if (daily.imageDescription == "rain") {
        image.src = "../src/images/rain.png";
    }
    let imageDiv = createEleWithClass("div", "col");
    imageDiv.appendChild(image);
    divRow.appendChild(imageDiv);

    let description = createEleWithClass("div", "col","daily-description");
    description.textContent = daily.description;
    divRow.appendChild(description);

    let tempMaxMin = createEleWithClass("div", "col" ,"daily-max-min-temp");

    let tempMax = createEleWithClass("div", "col");
    tempMax.textContent = daily.tempMax;
    tempMaxMin.appendChild(tempMax);

    tempMaxMin.textContent += ' / '

    let tempMin = createEleWithClass("div", "col");
    tempMin.textContent = daily.tempMin;
    tempMaxMin.appendChild(tempMin);

    let C = createElement("sub");
    C.textContent = 'o';
    tempMaxMin.appendChild(C);
    divRow.appendChild(tempMaxMin);

    dailyDataSection.appendChild(divRow);
  }
};
export { getDailyWeatherData, filterDailyData, fillDailyData };
