const request = require("request");

const geocode = (city, callback) => {
  const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1IjoidmV4MTEyMjMzIiwiYSI6ImNsMW1kcnF3NTBpcnEzZG1tMnJxdzY1NHAifQ.kldgf8YViVjq62vwOg2CGA`;
  
  request({url:geoCodeURL, json:true}, (error, response) => {
    if (error) { // Connection error
        callback("There is an Error in geoCoding Request!",undefined);
    } else if (response.body.features.length === 0) { // If city not found.
      callback("No City found with this name.", undefined);
    } else {  // On Success
      const coordinates = response.body.features[0].geometry.coordinates;
      const data = {
        lon: coordinates[0],
        lat: coordinates[1]
      };
      callback(undefined, data);
    }
  });
}

module.exports = geocode