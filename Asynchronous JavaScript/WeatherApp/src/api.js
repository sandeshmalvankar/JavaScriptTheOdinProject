import APIKEY from "./apikey";

//validate inputCity
const validateInputCity = (city) => {
  return city.length > 0;
};

const round = (int) => {
  return Math.round(int)
}

//Request to Weather api
async function weatherApi(city) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
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

function filterData(data) {
  let city = data.name;
  let visibility = data.visibility;
  let windSpeed = data.wind.speed;

  let {
    temp,
    temp_max: tempMax,
    temp_min: tempMin,
    feels_like: temperatureFelt,
    pressure: airPressure ,
    humidity,
  } = data.main;

  let main = data.weather[0].main;

  return {
    date: getDate().toString(),
    time: getTime().toString(),
    city,
    visibility: Number(visibility) / 1000,
    airPressure,
    humidity,
    windSpeed,
    temp: round(temp),
    tempMax: round(tempMax),
    tempMin: round(tempMin),
    temperatureFelt: round(temperatureFelt),
    main
  };
}

function fillData({
  date,
  time,
  city,
  visibility,
  airPressure,
  humidity,
  windSpeed,
  temp,
  tempMax,
  tempMin,
  temperatureFelt,
  main
}) {
  let display = [
      { key: "#city", value : city }, 
      { key: "#date", value : date }, 
      { key: "#time", value : time }, 
      { key: "#visibility", value : `${visibility}` }, 
      { key: "#air-pressure", value : `${airPressure}` }, 
      { key: "#humidity", value : `${humidity}`}, 
      { key: "#wind-speed", value : `${windSpeed}` }, 
      { key: "#temp", value : temp }, 
      { key: "#temp-max", value : tempMax },
      { key: "#temp-min", value : tempMin }, 
      { key: "#temperature-felt", value : temperatureFelt },  
      { key: "#main", value : main }, 
    ];
    display.forEach(({key, value}) => {
        //console.log(document.querySelector(key))
        //console.log(value)
        document.querySelector(key).textContent = value
    })
}

export { validateInputCity, weatherApi, filterData, fillData };
