import request from 'request';
import dotenv from 'dotenv';

// Importing interfaces
import { CoordinatesInterface } from '../interfaces/Coords';
import { WeatherData } from '../interfaces/Weather';
import { API } from './API';

// Configuring variables from .env file
dotenv.config();

export class Weather extends API<WeatherData> {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather?';
  protected url!: string;
  // To remove
  private _weather!: WeatherData;

  async getWeather(coords: CoordinatesInterface) {
    this.buildUrl(coords);
    const res = await this.fetch();

    return res;
  }
  request() {
    return new Promise((resolve: any, reject: any) => {
      request({ url: this.url, json: true }, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

  protected buildUrl(coords: CoordinatesInterface) {
    this.url = `${this.baseUrl}lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.WEATHER_API}&units=metric`;
  }

  // Callback function that will be passed to request function.
  protected parseResponse(response: any): WeatherData {
    // Extracting weather data from response body
    const weather = response;

    if (weather.message) {
      return {
        error: weather.message,
      };
    } else {
      return {
        country_tag: weather.sys.country,
        area: weather.name,
        status: weather.weather[0].description,
        temprature: weather.main.temp,
        humidity: weather.main.humidity,
        visibility: +weather.visibility / 1000,
      };
    }
  }
}
