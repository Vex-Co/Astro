const request = require("request");

const OWAPI = "f939e508817a2bcb3996e293e5f7c251";
const GCAPI = "pk.eyJ1IjoidmV4MTEyMjMzIiwiYSI6ImNsMW1kcnF3NTBpcnEzZG1tMnJxdzY1NHAifQ.kldgf8YViVjq62vwOg2CGA";

const cityName = "Lahore";

const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${GCAPI}`;
request({url:geoCodeURL, json:true}, (error, response) => {
  // for no internet connection
  if (error) {
      console.log("There is an Error in geoCoding Request!");
  } else if (response.body.features.length === 0) {
    console.log("No City found with this name.");
  } else {
    const coordinates = response.body.features[0].geometry.coordinates;
    const lon = coordinates[0];
    const lat = coordinates[1];
    
    console.log(`Logitude: ${lon}`)
    console.log(`Latitude: ${lat}`)
  }
});

// const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWAPI}&units=metric`;
// request({ url: openWeatherURL, json:true }, (error, weather) => {
//   try {
//     const temprature = weather.body.main.temp_max;
//     console.log(`It is ${+temprature.toFixed(0)} degrees out there.`);
//   } catch (e) {
//     console.log(`There is an Error!`);
//   }
// });