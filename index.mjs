import locations from './locations.mjs'; // Import location data

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
    const marker = document.createElement('a-entity'); // Use a-entity for combining elements

    // Create a child element for the icon
    const iconImage = document.createElement('a-image');
    iconImage.setAttribute('src', location.icon); // Set icon path from location object
    iconImage.setAttribute('position', '0 0 -0.5'); // Adjust icon position relative to text
    iconImage.setAttribute('scale', '0.5 0.5 0.5'); // Adjust icon size

    // Create a child element for the text
    const textLabel = document.createElement('a-text');
    textLabel.setAttribute('value', location.name);
    textLabel.setAttribute('align', 'center'); // Center align text
    textLabel.setAttribute('scale', '1.5 1.5 1.5'); // Adjust text size

    // Append both child elements to the marker entity
    marker.appendChild(iconImage);
    marker.appendChild(textLabel);

    marker.setAttribute('look-at', '[gps-camera]');
    document.querySelector('a-scene').appendChild(marker);
    }
}

function calculateDistancesAndHighlight() {
    const userLatitude = camera.getAttribute('gps-camera').latitude;
    const userLongitude = camera.getAttribute('gps-camera').longitude;
    const radiusThreshold = 50; // Meters

    locations.forEach(location => {
    createMarker(location, userLatitude, userLongitude, radiusThreshold);
});
}

getUserLocation();
calculateDistancesAndHighlight();