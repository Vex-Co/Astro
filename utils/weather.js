
const request = require("request");

const weather = (lon,lat, callback) => {
  const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f939e508817a2bcb3996e293e5f7c251&units=metric`;
  request({ url: openWeatherURL, json:true }, (error, weather) => {
    if(error) {
      callback("Unable to search get data for that coordinate!");
    } else {
      callback(undefined, weather.body);
    }
  });
}

module.exports = weather
