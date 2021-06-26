import { getElementById } from "./utils";
import { getWeatherData } from "./weatherapi";

getElementById("search").onclick = async () => {
    let inputCity = getElementById('input-city')
    let weatherData = await getWeatherData(inputCity.value)
    console.log(weatherData)
};
