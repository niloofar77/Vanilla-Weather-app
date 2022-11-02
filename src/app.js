function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHtml = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHtml =
        forcastHtml +
        `
   
              <div class="col-2">
                <div class="weather-forcast-date">${formatDay(
                  forcastDay.dt
                )}</div>
                <img src="http://openweathermap.org/img/wn/${
                  forcastDay.weather[0].icon
                }@2x.png" alt="" width="42" />
                <div class="weather-forcast-temprature">
                  <span class="weather-forcast-temprature-max"> ${Math.round(
                    forcastDay.temp.max
                  )} </span>
                  <span class="weather-forcast-temprature-min">${Math.round(
                    forcastDay.temp.min
                  )}</span>
                </div>
              </div>
           
         `;
    }
  });

  forcastHtml = forcastHtml + "  </div>";

  forcastElement.innerHTML = forcastHtml;
}
function getForcast(coordinates) {
  console.log(coordinates.lat);
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${};`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temprature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemprature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemprature);

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForcast(response.data.coord);
}
function search(city) {
  // let apiKey = "a6a83d0066503tdd340bfof35ff4dbe0";
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}
function displayFahrenheitTemprature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temprature");
  celsiusLinkElement.classList.remove("active");
  fahrenheitLinkElement.classList.add("active");
  let fahrenheiTemprature = (celsiusTemprature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemprature);
}
function displayCelsiusTemprature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temprature");
  celsiusLinkElement.classList.add("active");
  fahrenheitLinkElement.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemprature);
}
let celsiusTemprature = null;
let form = document.querySelector("#search-form");
console.log(form);
form.addEventListener("submit", handleSubmit);
let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", displayFahrenheitTemprature);
let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", displayCelsiusTemprature);

search("Lisbon");
