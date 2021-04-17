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
let formattedTime = `${currentHour}:${currentMinutes}`;
return formattedTime;
}

let updatedTime = document.querySelector("#current-time");
updatedTime.innerHTML = formatTime(currentTime);

 
// Weather (Current Temp)

function searchCity(event){
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let apiKey = "cf62258a4240a831b95a688c2d009d72";
  let units = "metric";
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  let h2 = document.querySelector("#searched-city");
  h2.innerHTML = `${city}`;

axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener ("submit", searchCity)

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemp = document.querySelector("#currentTemperature");
  currentTemp.innerHTML = temperature;
    let h2 = document.querySelector("#searched-city");
  h2.innerHTML = `${city}`;
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

