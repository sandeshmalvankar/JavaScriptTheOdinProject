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

export { validateInputCity, weatherApi };
