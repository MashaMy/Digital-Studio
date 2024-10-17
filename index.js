const compass = document.getElementById('compass');
const needle = document.getElementById('needle');
const loading = document.querySelector('.loading');

let userCoordinates = null;

function calculateBearing(userLat, userLon, kaliningradLat, kaliningradLon) {
  const lat1 = userLat * Math.PI / 180;
  const lon1 = userLon * Math.PI / 180;
  const lat2 = kaliningradLat * Math.PI / 180;
  const lon2 = kaliningradLon * Math.PI / 180;
  const deltaLon = lon2 - lon1;
  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
}

function updateCompass() {
  if (!userCoordinates) {
    loading.textContent = "Определение местоположения...";
    return;
  }

  const kaliningradLat = 54.7000;
  const kaliningradLon = 20.5333;
  const bearing = calculateBearing(userCoordinates.latitude, userCoordinates.longitude, kaliningradLat, kaliningradLon);

  needle.style.transform = `rotate(${bearing}deg)`;
  loading.textContent = "";
}

function success(position) {
  userCoordinates = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  updateCompass();
}

function error(err) {
  loading.textContent = "Ошибка определения местоположения: " + err.message;
}

navigator.geolocation.getCurrentPosition(success, error);