import locations from './locations.js';

const camera = document.querySelector('a-camera');

// function getUserLocation() {
    const userLatitude = camera.getAttribute('gps-camera').latitude;
    const userLongitude = camera.getAttribute('gps-camera').longitude;

    console.log("User Location:", userLatitude, userLongitude);
// }

// return getUserLocation();

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

import locations from 'locations.js'; // Assuming locations.js is in the same directory

function calculateDistancesAndHighlight(userLatitude, userLongitude) {
    locations.forEach(location => {
        const distance = calculateDistance(userLatitude, userLongitude, location.latitude, location.longitude);
        const radiusThreshold = 500; 

        if (distance <= radiusThreshold) {
            const marker = document.createElement('a-text');
            marker.setAttribute('value', location.name);
            marker.setAttribute('position', `${location.longitude} ${location.latitude} 1`); 
            marker.setAttribute('scale', '2 2 2');
            document.querySelector('a-scene').appendChild(marker);
        }
    });
}