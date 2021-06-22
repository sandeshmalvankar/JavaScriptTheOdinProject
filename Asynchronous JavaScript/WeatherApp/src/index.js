import APIKEY from './apikey'
import { validateInputCity, weatherApi, filterData } from './api'

//console.log(APIKEY)
let inputCity = document.querySelector('#input-city')
let searchBtn = document.querySelector('#search')

searchBtn.onclick = () => { 
    if(validateInputCity(inputCity.value)){
        let weatherData = weatherApi(inputCity.value)
        weatherData.then(data => console.log(filterData(data)))
    }
}