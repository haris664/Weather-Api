const apiKey = '52242a7b53e46644d662c726ecc77efe';

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
  .then(data => {
    console.log(data)
  })
}