import APIKEY from './../../WeatherApp/src/apikey';

const getWeatherData = async (city) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
    let data = await response.json()
    return data
}

export { getWeatherData }