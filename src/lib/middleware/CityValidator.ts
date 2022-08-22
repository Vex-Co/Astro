import cities from 'all-the-cities';
import { NextFunction, Request, Response } from 'express';
import { WeatherData } from '../interfaces/Weather';

export class CityValidator {
  static errorResponse: WeatherData = {
    error: 'Could not find your desired city.',
  };
  static validate(req: Request, res: Response, next: NextFunction) {
    // capitalize the city name
    if (req.query.address) {
      const cityName = CityValidator.capitalize(req.query.address as string);
      // Check weather the city name exists
      const c = cities.filter((city) => city.name.match(cityName));
      if (c.length === 0) {
        return res.send(CityValidator.errorResponse);
      } else {
        next();
        return;
      }
    }

    return res.send(CityValidator.errorResponse);
  }

  private static capitalize(text: string) {
    const textArr = text.split(' ').map((value: string, index: number) => {
      return value[0].toUpperCase() + value.slice(1);
    });

    return textArr.join(' ');
  }
}
