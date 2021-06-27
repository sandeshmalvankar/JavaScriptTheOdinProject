import { APIKEY } from "./apikey";
import { createEleWithClass, getElementById, round } from "./utils";

const getHourlyWeatherData = async (lat, lon) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily,current&appid=${APIKEY}`
  );
  let data = await response.json();
  //console.log("hourly data", data);
  return data;
};

const filterHourlyData = async (data) => {
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

const fillHourlyData = (hourlyData) => {
  let hourlyDataSection = getElementById("hourly-data");
  //clear previous loaded data
   hourlyDataSection.innerHTML = ''

  for (const hour of hourlyData) {
    let divCol = createEleWithClass("div", "hour-section");

    let time = createEleWithClass("div", "hourly-data-subitem");
    time.textContent = hour.time;
    divCol.appendChild(time);

    let imageDescription = hour.description.split(" ");
    let hourImage = createEleWithClass("img", "hourly-image");
    let hourImageDiv = createEleWithClass("div", "hourly-data-subitem");
    if (imageDescription[1] == "clouds") {
      hourImage.src = "../src/images/cloud.png";
    } else if (imageDescription[1] == "rain") {
      hourImage.src = "../src/images/rain.png";
    }
    hourImageDiv.appendChild(hourImage);
    divCol.appendChild(hourImageDiv);

    let description = createEleWithClass("div", "hourly-data-subitem");
    description.textContent = hour.description;
    divCol.appendChild(description);

    let temp = createEleWithClass("div", "hourly-data-subitem");
    temp.textContent = hour.temp;
    let C = document.createElement("sub");
    C.textContent = "o";
    temp.appendChild(C);
    divCol.appendChild(temp);

    hourlyDataSection.appendChild(divCol);
  }
};

export { getHourlyWeatherData, filterHourlyData, fillHourlyData };
