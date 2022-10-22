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
}
function search(city) {
  let apiKey = "d51a066fdbb7f2a30b8dc4fd0e3725e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

search("New York");
