const apiKey = '52242a7b53e46644d662c726ecc77efe';

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition,showError);
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude,longitude)
}

function showError(error) {
  console.log(error.message)
}