import APIKEY from "./apikey";

//validate inputCity
const validateInputCity = (city) => {
  return city.length > 0;
};

//Request to Weather api
async function weatherApi(city) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    );
    let data = await response.json();
    return data;
  } catch (err) {
    console.log("err");
  }
}

function getDate() {
    let date = new Date();
  
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }
  
  function getTime() {
    let time = new Date();
    return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  }
  
  function parseTemp(temp) {
    let currentUnit = 0; // 0 - Celsius 1 - Fahrenheit
    let parsedTemp =
      currentUnit === 0 ? Number(temp) - 273.1 : 1.8 * (Number(temp) - 273) + 32;
    return Math.round(parsedTemp * 10) / 10;
  }
  
  function filterData(data) {
    let city = data.name;
    let visibility = data.visibility;
    let airPressure = data.pressure;
    let windSpeed = data.wind.speed;
  
    let {
      temp,
      temp_max: tempMax,
      temp_min: tempMin,
      feels_like: temperatureFelt,
      humidity,
    } = data.main;
  
    let main = data.weather[0].main;
  
    return {
      date: getDate(),
      time: getTime(),
      city,
      visibility: Number(visibility) / 1000,
      airPressure,
      humidity,
      windSpeed,
      temp: parseTemp(temp),
      tempMax: parseTemp(tempMax),
      tempMin: parseTemp(tempMin),
      temperatureFelt: parseTemp(temperatureFelt),
    };
  }
  
  
export { validateInputCity, weatherApi, filterData };
