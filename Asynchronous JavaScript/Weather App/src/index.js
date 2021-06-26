import { getElementById, validateCity } from "./utils";
import { getWeatherData } from "./weatherapi";

getElementById("search").onclick = async () => {
  let inputCity = getElementById("input-city");

  try {
    if (!validateCity(inputCity.value)) throw new Error("City cannot be empty");
    let weatherData = await getWeatherData(inputCity.value);
    console.log(weatherData);
  } catch (error) {
    console.log(error);
  }
};
