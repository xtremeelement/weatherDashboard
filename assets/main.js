var key = "92c25475de47752abb30290cb7257adb";
var forecastData;
var weatherData;
// var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
cityWeather = document.querySelector(".cityWeather");
forecast = document.querySelector(".forecast");

function queryResult() {
  var city = document.querySelector("#first_name2").value;
  var queryUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`;
  console.log(city);
  fetch(queryUrl2)
    .then(function(response) {
      return response.json();
    })
    .then(function(what) {
      weatherData = what;
      updateWeather();
      getWeather();
    });
}

function getWeather() {
  var city = document.querySelector("#first_name2").value;
  var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${key}`;
  fetch(queryUrl)
    .then(function(something) {
      return something.json();
    })
    .then(function(res) {
      forecastData = res;
      console.log(forecastData);
      console.log(forecastData.list[0].weather[0].icon);
      getForecast();
    });
}

function updateWeather() {
  var currentWeather;
  var icon = weatherData.weather[0].icon;
  var temperature = ((weatherData.main.temp - 273.15) * 9) / 5 + 32;
  var iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
  currentWeather = `
    <h4>${weatherData.weather[0].main}</h4>
    <img src = "${iconUrl}">
    <p>${Math.floor(temperature)}&#8457;</p>
        `;
  cityWeather.innerHTML = currentWeather;
}

function getForecast() {
  var forecastWeather;
  forecast.innerHTML = "";
  var i = 0;
  while (i < 5) {
    var temperature = ((forecastData.list[i].main.temp - 273.15) * 9) / 5 + 32;
    var iconIMG = forecastData.list[0].weather[0].icon;
    var iconUrl = `https://openweathermap.org/img/w/${iconIMG}.png`;
    forecastWeather = `
    <div class="col s2">        
        <h3>${forecastData.list[i].weather[0].main}</h3>
        <img src = "${iconUrl}">
        <p>${Math.floor(temperature)}</p>        
    </div>`;
    forecast.innerHTML += forecastWeather;
    i++;
  }
}
