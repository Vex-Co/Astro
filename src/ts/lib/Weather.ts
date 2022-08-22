import request from 'request';
import dotenv from 'dotenv';

// Importing interfaces
import { CoordinatesInterface } from './interfaces/Coords';
import { WeatherData } from './interfaces/Weather';

// Configuring variables from .env file
dotenv.config();

class Weather {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather?';
  private url!: string;
  private weather!: WeatherData;

  constructor() {}

  fetch() {
    request({ url: this.url, json: true }, this.setWeather.bind(this));
  }

  private buildUrl(coords: CoordinatesInterface) {
    this.url = `${this.baseUrl}lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.WEATHER_API}&units=metric`;
  }
  // Callback function that will be passed to request function.
  private setWeather(error: any, response: any) {
    const weather = response.body;
    if (weather) {
      this.weather.error = error;
    } else {
      this.weather.country_tag = weather.sys.country;
      this.weather.area = weather.name;
      this.weather.status = weather.weather[0].description;
      this.weather.temprature = weather.main.temp;
      this.weather.humidity = weather.main.humidity;
      this.weather.visibility = +weather.visibility / 1000;
    }
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
