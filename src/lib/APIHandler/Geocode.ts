import request from 'request';
import dotenv from 'dotenv';
import { CoordinatesInterface } from '../interfaces/Coords';

// Configuring variables from .env file
dotenv.config();

export class Geocode {
  private _api: string | undefined = process.env.GEOCODE_API;
  private _baseUrl: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
  private _url!: string;
  private _coords!: CoordinatesInterface;

  async fetch(cityName: string): Promise<CoordinatesInterface> {
    this.buildUrl(cityName);

    const res = await this.request();
    this.setCoords(res);

    return this._coords;
  }
  request() {
    return new Promise((resolve: any, reject: any) => {
      request({ url: this._url, json: true }, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }

  private buildUrl(cityName: string) {
    // Making URL For the request, sent to API.
    this._url = `${this._baseUrl}${cityName}.json?access_token=${this._api}`;
  }

  // callback function that will be passed to request to set the coords.
  private setCoords(response: any) {
    const feature = response.features[0];
    if (feature) {
      const coordinations: number[] = feature.geometry.coordinates!;

      // Setting up the coords according to interface
      const coords = {
        lon: coordinations[0],
        lat: coordinations[1],
      };
      this._coords = coords;
    }
  }
}
