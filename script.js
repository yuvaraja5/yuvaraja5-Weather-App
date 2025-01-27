let searchInp = document.querySelector('.weather_search');
let city = document.querySelector('.weather_city');
let day = document.querySelector('.weather_day');
let humidity = document.querySelector('.weather_humidity');
let wind = document.querySelector('.weather_wind');
let pressure = document.querySelector('.weather_pressure');
let image = document.querySelector('.weather_image');
let temperature = document.querySelector('.weather_temperature>.value');





let weatherAPIKey = '';
let weatherBaseEndpoint = 'https://developer.accuweather.com/';

let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
}

searchInp.addEventListener('keydown', async (e) =>{
    if(e.keyCode === 13){
        let weather = await getWeatherByCityName(searchInp.value);
        updateCurrentWeather(weather);
    }
})

let updateCurrentWeather = (data) => {
    city.textContent = data.name + ',' + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135) {
        windDirection = 'East';
    }
    else if(deg > 135 && deg <= 225) {
        windDirection = 'South';
    }
    else if(deg > 225 && deg <= 315) {
        windDirection = 'West';
    }
    else {
        windDirection = 'North';}
    wind.textContent = windDirection + ', ' + data.wind.speed;
    temperature.textContent = data.main.temp > 0 ?
                                 '+' + Math.round(data.main.temp) : 
                                 Math.round(data.main.temp);
}
let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-EN', {'weekday':'long'});
}