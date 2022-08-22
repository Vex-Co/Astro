import request from 'request';
import dotenv from 'dotenv';
import { CoordinatesInterface } from './interfaces/Coords';

// Configuring variables from .env file
dotenv.config();

class Weather {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather?';

  constructor() {}
  get() {}
  buildUrl(coords: CoordinatesInterface) {
    const url = `${this.baseUrl}lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.WEATHER_API}&units=metric`;
  }
}
// const weather = (lon, lat, callback) => {
//   const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f939e508817a2bcb3996e293e5f7c251&units=metric`;
//   request({ url: openWeatherURL, json: true }, (error, weather) => {
//     if (error) {
//       callback("Unable to search get data for that coordinate!");
//     } else {
//       callback(undefined, weather.body);
//     }
//   });
// };

// module.exports = weather;
