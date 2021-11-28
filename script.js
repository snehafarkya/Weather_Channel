const input = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const wetherDataDiv = document.querySelector('.weather-data')

searchBtn.addEventListener('click', getData);

function getData() {
  const inputData = input.value; //inputData = city Name
  if (!inputData) {
    return;
  }
  getWeatherData(inputData);
}

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da87f98bcec4705ad454710515489861`;
  const res = await fetch(url);
  console.log(res);
  if (res.status !== 200) {
    renderError();
    return;
  }
  const data = await res.json();
  // console.log(data)
  const temp = data.main.temp
  const tempMax = data.main.temp_max
  const tempMin = data.main.temp_min
  const pressure = data.main.pressure
  const humidity = data.main.humidity
  const weatherType = data.weather[0].main;
  const cityName = data.name;
  console.log(temp, tempMax, tempMin, pressure, humidity, weatherType, cityName)
  renderMarkup(temp, tempMax, tempMin, pressure, humidity, weatherType, cityName)
}

function renderMarkup(temp, tempMax, tempMin, pressure, humidity, weatherType, cityName) {
  wetherDataDiv.innerHTML = `<div class="data-left">
    <div class="left-img">
      <img src="./img/${weatherType}.svg" alt="" />
    </div>
    <div class="data-temp">
      <h2>${(temp - 273.15).toFixed(0)} °C</h2>
    </div>
    <div class="data-main">
      <p>${weatherType}</p>
    </div>
    <div class="data-city">
      <p>${cityName}</p>
    </div>
  </div>
  <!-- RIGHT -->
  <div class="data-right">
    <div>
      <p>Max Temp : <span>${tempMax}°C</span></p>
    </div>
    <div>
      <p>Min Temp : <span>${tempMin}°C</span></p>
    </div>
    <div>
      <p>Pressure : <span>${pressure} hPA</span></p>
    </div>
    <div>
      <p>Humidity : <span>${humidity} %</span></p>
    </div>
  </div>`
}

function renderError() {
  wetherDataDiv.style.display = "flex"
  wetherDataDiv.innerHTML = `<h1 class="error">Something went wrong</h1>`
}
function renderSpinner() {
    wetherDataDiv.style.display = "flex"
    getWeatherData.innerHTML = `<div class="spinner">
<img src="https://raw.githubusercontent.com/bilal-23/Weather-App/75905d0c16854d4bbaa5f7b728be797fee653f49/src/img/loading.svg" alt="">
</div> `
}