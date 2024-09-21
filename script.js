const apiKey = "2065e80e8a76f1045304b9ef8ed7595e";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const cityLabel = document.querySelector(".city");
const countryLabel = document.querySelector(".country");
const tempLabel = document.querySelector(".temp");
const humidityLabel = document.querySelector(".humidity");
const windSpeedLabel = document.querySelector(".wind-speed");

const iconMap = {
  Clouds: "images/clouds.png",
  Clear: "images/clear.png",
  Rain: "images/rain.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
  Snow: "images/snow.png",
};


const renderError = function () {
  const html = `        <div class="alert">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            The city you entered doesn't exist.
          </div>`;
    document.body.insertAdjacentHTML("beforebegin", html);
};

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);
  if (!response.ok) renderError();
  const data = await response.json();

  cityLabel.innerHTML = data.name;
  countryLabel.innerHTML = ", " + data.sys.country;
  tempLabel.innerHTML = Math.round(data.main.temp) + "°C";
  humidityLabel.innerHTML = data.main.humidity + "%";
  windSpeedLabel.innerHTML = data.wind.speed + " km/h";
  weatherIcon.src = iconMap[data.weather[0].main] || "images/default.png";

  console.log(data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});


navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

async function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    const city = await getCityFromCoordinates(latitude, longitude);
    console.log(`You are in: ${city}`);
    checkWeather(city);  
}

function errorCallback(error) {
    console.error(error);
    alert('Unable to retrieve location');
}

async function getCityFromCoordinates(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    const city = data.name;
    return city;
}

