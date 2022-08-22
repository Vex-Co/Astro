import request from 'request';
import dotenv from 'dotenv';
import { API } from './API';
import { CoordinatesInterface } from '../interfaces/Coords';

// Configuring variables from .env file
dotenv.config();

export class Geocode extends API<CoordinatesInterface> {
  private _api: string | undefined = process.env.GEOCODE_API;
  private _baseUrl: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
  protected url!: string;

  // Get the geocode by using api
  public async getGeocode(cityName: string): Promise<CoordinatesInterface> {
    this.buildUrl(cityName);
    const res = await this.fetch();

    return res; // this response is parsed automatically
  }

  protected parseResponse(res: any): CoordinatesInterface {
    const feature = res.features[0];
    if (feature) {
      const coordinations: number[] = feature.geometry.coordinates!;

      // Setting up the coords according to interface
      const coords = {
        lon: coordinations[0],
        lat: coordinations[1],
      };
      return coords;
    } else {
      return {
        error: 'Could Not find your requested location.',
      };
    }
  }

  protected buildUrl(cityName: string) {
    // Making URL For the request, sent to API.
    this.url = `${this._baseUrl}${cityName}.json?access_token=${this._api}`;
  }
}
