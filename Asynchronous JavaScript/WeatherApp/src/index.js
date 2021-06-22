import APIKEY from "./apikey";
import { validateInputCity, weatherApi, filterData, fillData } from "./api";
import { ctof, ftoc } from "./tempConversion";

//console.log(APIKEY)
let inputCity = document.querySelector("#input-city");
let searchBtn = document.querySelector("#search");
let convert = document.querySelector("#convert");

searchBtn.onclick = () => {
  if (validateInputCity(inputCity.value)) {
    try {
      let weatherData = weatherApi(inputCity.value);
      weatherData.then((data) => fillData(filterData(data)));
    } catch (err) {
      console.log(err);
    }
  } else {
  }
};

convert.onchange = () => {
  if (convert.checked) {
    ctof();
  } else {
    ftoc();
  }
};
