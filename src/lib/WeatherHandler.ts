import { Geocode } from './APIHandler/Geocode';
import { Weather } from './APIHandler/Weather';
import { WeatherData } from './interfaces/Weather';
import { Request, Response } from 'express';

export class WeatherHandler {
  static weatherAPIHandler: Weather = new Weather();
  static geocodeAPIHandler: Geocode = new Geocode();

  static async getWeather(cityName: string): Promise<WeatherData> {
    // Fetch the geocodes
    const coords = await this.geocodeAPIHandler.fetch(cityName);
    if (coords) {
      const weather = await this.weatherAPIHandler.fetch(coords);

      return weather;
    } else {
      return {
        error: 'Could not find your requested city.',
      };
    }
  }
  static async getWeatherController(req: Request, res: Response) {
    const cityName = req.query.address as string;

    // Check if the city name is given or not
    if (!cityName) {
      return res.send({
        error: 'Please provide address to search.',
      });
    }

    const weahter = await WeatherHandler.getWeather(cityName);

    res.send(weahter);
  }
}
