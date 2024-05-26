alert("Hello")
import location from './locations.js'; 

const camera = document.querySelector('a-camera');

function getUserLocation() {
    const userLatitude = camera.getAttribute('gps-camera').latitude;
    const userLongitude = camera.getAttribute('gps-camera').longitude;

    console.log(`User Location: Latitude: ${userLatitude}, Longitude: ${userLongitude}`);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = radians(lat1);
    const φ2 = radians(lat2);
    const Δφ = φ2 - φ1;
    const Δλ = radians(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(radians(φ1)) * Math.cos(radians(φ2)) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function radians(degrees) {
  return degrees * Math.PI / 180;
}

function createMarker(location, userLatitude, userLongitude, radiusThreshold) {
    const distance = calculateDistance(userLatitude, userLongitude, location.latitude, location.longitude);

    if (distance <= radiusThreshold) {
    const marker = document.createElement('a-text');
    marker.setAttribute('value', location.name);
    marker.setAttribute('position', `${location.longitude} ${location.latitude} 1`); // Adjust Z-axis position as needed
    marker.setAttribute('scale', '2 2 2'); // Adjust text size as needed
    marker.setAttribute('look-at', '[gps-camera]'); // Look at the camera
    document.querySelector('a-scene').appendChild(marker);
}
}

function calculateDistancesAndHighlight() {
    const userLatitude = camera.getAttribute('gps-camera').latitude;
    const userLongitude = camera.getAttribute('gps-camera').longitude;
    const radiusThreshold = 50; 

    locations.forEach(location => {
    createMarker(location, userLatitude, userLongitude, radiusThreshold);
});
}

getUserLocation();
calculateDistancesAndHighlight(); // Call the function after getting user location
