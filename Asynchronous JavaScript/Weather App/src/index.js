import { fillDailyData, filterDailyData, getDailyWeatherData } from "./daily-weatherapi";
import {
  fillHourlyData,
  filterHourlyData,
  getHourlyWeatherData,
} from "./hourly-weatherappi";
import { convertToC, convertToF } from "./tempConversion";
import { displayErrorMessage, getElementById, validateCity } from "./utils";
import { fillData, filterWeatherData, getWeatherData } from "./weatherapi";

getElementById("search").onclick = async () => {
  let inputCity = getElementById("input-city");

  try {
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
