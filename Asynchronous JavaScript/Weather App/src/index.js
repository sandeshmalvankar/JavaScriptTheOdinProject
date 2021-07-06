import {
  fillDailyData,
  filterDailyData,
  getDailyWeatherData,
} from "./daily-weatherapi";
import {
  fillHourlyData,
  filterHourlyData,
  getHourlyWeatherData,
} from "./hourly-weatherappi";
import { convertToC, convertToF } from "./tempConversion";
import {
  createEleWithClass,
  displayErrorMessage,
  getElementById,
  validateCity,
} from "./utils";
import { fillData, filterWeatherData, getWeatherData } from "./weatherapi";

getElementById("search").onclick = async () => {
  let inputCity = getElementById("input-city");
  getElementById("match-list").innerHTML = "";
  try {
    //const cityData = await cityName(inputCity.value);
    //console.log(cityData);
    if (!validateCity(inputCity.value)) throw new Error("City cannot be empty");
    const weatherData = await getWeatherData(inputCity.value);
    //console.log(weatherData);
    let { lon, lat } = weatherData.coord;
    //console.log(lon + ' '+lat)
    const filteredData = await filterWeatherData(weatherData);
    //console.log(filteredData);
    fillData(filteredData);

    const hourlyWeatherData = await getHourlyWeatherData(lat, lon);
    //console.log(hourlyWeatherData.hourly);
    //console.log(filterHourlyData(hourlyWeatherData.hourly));
    let filteredHourlyData = await filterHourlyData(hourlyWeatherData.hourly);
    fillHourlyData(filteredHourlyData);

    const dailyWeatherData = await getDailyWeatherData(lat, lon);
    //console.log(dailyWeatherData.daily)
    let filteredDailyData = await filterDailyData(dailyWeatherData.daily);
    //console.log(filteredDailyData)
    fillDailyData(filteredDailyData);
    inputCity.value = "";
  } catch (error) {
    //console.log(error);
    displayErrorMessage(error.message);
  }
};

//convert ctof and ftoc switch
getElementById("convert").onchange = () => {
  if (convert.checked) {
    convertToF();
  } else {
    convertToC();
  }
};

const searchCity = async (search) => {
  //console.log('city input ',search)
  const res = await fetch("../src/cities.json");
  const cities = await res.json();
  //console.log(cities)

  let matches = cities.filter((city) => {
    const regex = new RegExp(`^${search}`, "gi");
    return city.name.match(regex);
  });

  if (search.length == 0) {
    matches = [];
    getElementById("match-list").innerHTML = "";
  }
  //console.log(matches)
  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    let matchList = getElementById("match-list");
    matches.map((match) => {
      let div = createEleWithClass("div", "form-control");
      div.textContent = `${match.name}, ${match.state}`;
      matchList.appendChild(div);
      div.addEventListener("click", (e) => {
        //console.log(e.target.textContent)
        getElementById("input-city").value = e.target.textContent;
        getElementById("match-list").innerHTML = "";
      });
    });
  }
};

getElementById("input-city").addEventListener("input", (e) => {
  getElementById("match-list").innerHTML = "";
  searchCity(e.target.value);
});
