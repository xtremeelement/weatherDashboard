var key = "92c25475de47752abb30290cb7257adb";
var city = "orlando";
var queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${key}`;
var queryUrl2 = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`;
var data;
var data2;

// var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
cityWeather = document.querySelector(".cityWeather");
forecast = document.querySelector(".forecast");

function queryResult() {
  fetch(queryUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      data = res;
      console.log(data);
      console.log(data.list[0].weather[0].icon);
      getWeather();
    });
}

function getWeather() {
  fetch(queryUrl2)
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      data2 = res;
      updateWeather();
    });
  getForecast();
}

function updateWeather() {
  var currentWeather;
  var icon = data2.weather[0].icon;
  var temperature = ((data2.main.temp - 273.15) * 9) / 5 + 32;
  var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
  currentWeather = `
    <h4>${data2.weather[0].main}</h4>
    <img src = "${iconUrl}">
    <p>${Math.floor(temperature)}&#8457;</p>
        `;
  cityWeather.innerHTML = currentWeather;
}

function getForecast() {
  var forecastWeather;

  for (var i = 0; i < 5; i++) {
    var temperature = ((data.list[i].main.temp - 273.15) * 9) / 5 + 32;
    var iconIMG = data.list[0].weather[0].icon;
    var iconUrl = `http://openweathermap.org/img/w/${iconIMG}.png`;
    forecastWeather = `
    <div class="col s2>
        <h3>${data.list[i].weather[i].main}</h3>
        <img src = "${iconUrl}">
        <p>${temperature}</p>
    </div>`;
    forecast.innerHTML = forecastWeather;
  }
}
