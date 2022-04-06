const geocode = require("./utils/geocode"); 
const weather = require("./utils/weather"); 

const cityName = process.argv[2];

if (cityName) {
  geocode(cityName, (error, {lon, lat}) => {
    if (error) {
      console.log(error);
    }  else {
      weather(lon, lat, (error, data) => {
        if (error)  {
          console.log(error);
        } else {
          console.log(`Status: ${data.weather[0].description}`);
          console.log(`Temprature: ${data.main.temp}C`);
          console.log(`Humidity: ${data.main.humidity}%`);
          console.log(`Visibility: ${+data.visibility/1000}km`);
        }
      })
    }
  });
} else {
  console.log("Please give city name as argument.");
}