import { getElementById, validateCity } from "./utils";
import { filterWeatherData, getWeatherData } from "./weatherapi";

getElementById("search").onclick = async () => {
  let inputCity = getElementById("input-city");

  try {
    if (!validateCity(inputCity.value)) throw new Error("City cannot be empty");
    const weatherData = await getWeatherData(inputCity.value);
    //console.log(weatherData);
    const filteredData = await filterWeatherData(weatherData);
    //console.log(filteredData);
  } catch (error) {
    console.log(error);
  }
};
