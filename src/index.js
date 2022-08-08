function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
    console.log(forecast);



  let forecastHTML = `<div class="row">`;

    forecast.forEach(function(forecastDay, index) {
      if (index<6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <div id="forecast-icon">
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="description" width="35">
            </div>
            <div class="forecast-temp">
              <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
              <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>`;}
    });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let apiKey = "245ebd9785e90f4999b1997205619924";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast)
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt",
  `(response.data.weather[0].description)`
  );

  getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "245ebd9785e90f4999b1997205619924";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Boston")
