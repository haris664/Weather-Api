const apiKey = '52242a7b53e46644d662c726ecc77efe';
const todayWeatherEle = document.querySelector('.current-conditions');
const forecastEle = document.querySelector('.forecast');
const forecastWeather =[];
const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition,showError);
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude,longitude);
}

function showError(error) {
  console.log(error.message)
}

function getWeather(latitude,longitude) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
  .then(resp => {
    if(resp.ok) {
      return resp.json();
    } else {
      throw new Error('something went wrong');
    }
  })
  .then(currentWeather => {
    todayWeatherEle.textContent = '';
    todayWeatherEle.insertAdjacentHTML('afterbegin', `
    <h2>Current Conditions</h2>
    <img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png" />
    <div class="current">
      <div class="temp">${Math.round(currentWeather.main.temp)}&deg;C</div>
      <div class="condition">${currentWeather.weather[0].description}</div>
    </div>
    `)
  })

  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
  .then(response => {
    if(response.ok) {
      return response.json();
    } else {
      throw new Error('there is something wrong');
    }
  })
  .then(forecast => {
    forecast.list.forEach(weekDays => {
      const findDay = new Date(weekDays.dt_txt);
      const dates = forecastWeather.find(findDate => findDate.date.getDay() === findDay.getDay());

      if (dates === undefined) {
        forecastWeather.push({
          high: Math.round(weekDays.main.temp),
          low: Math.round(weekDays.main.temp),
          icon: weekDays.weather[0].icon,
          description: weekDays.weather[0].description,
          date:findDay,
        })
      } else {
        if (findDay.getHours() === 15) {
          dates.icon = weekDays.weather[0].icon;
          dates.description = weekDays.weather[0].description;
        }

        if (dates.low > Math.round(weekDays.main.temp)) {
          dates.low = Math.round(weekDays.main.temp);
        } else if (dates.high < Math.round(weekDays.main.temp)) {
          dates.high = Math.round(weekDays.main.temp)
        }
      }
    })
  })
  .then(()=> {
    displayWeekWeather();
  })
}

function displayWeekWeather() {
  forecastEle.innerHTML = '';
  console.log(forecastWeather)

}