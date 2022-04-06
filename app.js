const geocode = require("./utils/geocode"); 
const weather = require("./utils/weather"); 

geocode("Islamabad", (error, data) => {
  if (error) {
    console.log(error);
  }  else {
    weather(data.lon, data.lat, (error, data) => {
      if (error)  {
        console.log(error);
      } else {
        console.log(data);
      }
    })
  }
});