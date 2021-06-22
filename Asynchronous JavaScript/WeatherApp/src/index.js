import APIKEY from './apikey'
import { validateInputCity, weatherApi, filterData , fillData} from './api'

//console.log(APIKEY)
let inputCity = document.querySelector('#input-city')
let searchBtn = document.querySelector('#search')

searchBtn.onclick = () => { 
    if(validateInputCity(inputCity.value)){
        try{
        let weatherData = weatherApi(inputCity.value)
        weatherData.then(data => fillData(filterData(data)))
        } catch (err){
            console.log(err)
        }
    } else {
        
    }
}