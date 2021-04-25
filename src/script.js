// Date and time
let currentTime = new Date ();
 
function formatDate(date) {
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

let currentDay = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();
let currentYear = date.getFullYear();

let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
return formattedDate;
}

let updatedDate = document.querySelector("#current-date");
updatedDate.innerHTML = formatDate(currentTime);


function formatTime(time) {
let currentHour = time.getHours();
let currentMinutes = time.getMinutes();
let mins = ('0'+currentMinutes).slice(-2);
let formattedTime = `${currentHour}:${mins}`;
return formattedTime;
}

let updatedTime = document.querySelector("#current-time");
updatedTime.innerHTML = formatTime(currentTime);

 
// Weather (Current Temp)

function searchCity(city){
  let apiKey = "cf62258a4240a831b95a688c2d009d72";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event){
event.preventDefault();
let cityElement = document.querySelector("#search-text");
searchCity(cityElement.value);
}

searchCity("Barcelona");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener ("submit", handleSubmit)

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemp = document.querySelector("#currentTemperature");
  currentTemp.innerHTML = temperature;
  let h2 = document.querySelector("#searched-city");
  h2.innerHTML = `${city}`;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt", "response.data.weather[0].description");
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(){
navigator.geolocation.getCurrentPosition(retrievePosition)
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

