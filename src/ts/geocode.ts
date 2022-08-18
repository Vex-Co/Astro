const request = require("request");
const dotenv = require("dotenv");

// Configuring variables from .env file
dotenv.config();

interface CoordinatesInterface {
  lon: number;
  lat: number;
}

export class GeoCode {
  private _token: string | undefined = process.env.GEOCODE_TOKEN;
  private _baseUrl: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
  private _city: string;

  constructor(city?: string) {
    if (city) {
      this._city = encodeURIComponent(city);
    } else {
      this._city = "";
    }
  }

  get(callback: (err: any, res: any) => void) {
    // Making URL For the request, sent to API.
    const url: string = `${this._baseUrl}${this._city}.json?access_token=${this._token}`;

    request({ url: url, json: true }, callback);
  }
}

const geocode = new GeoCode("lahore");

geocode.get((error: any, response: any) => {
  const features = response.body.features;
  if (features) {
    const coordinations: number[] = features[0].geometry.coordinates!;

    // Setting up the coords according to interface
    const coords = {
      lon: coordinations[0],
      lat: coordinations[1],
    };
  }
});

// const geocode = (city, callback) => {
//   const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//     city
//   )}.json?access_token=pk.eyJ1IjoidmV4MTEyMjMzIiwiYSI6ImNsMW1kcnF3NTBpcnEzZG1tMnJxdzY1NHAifQ.kldgf8YViVjq62vwOg2CGA`;

//   request({ url: geoCodeURL, json: true }, (error, response) => {
//     if (error) {
//       // Connection error
//       callback("There is an Error in geoCoding Request!", undefined);
//     } else if (
//       !response.body.hasOwnProperty("features") ||
//       response.body.features.length === 0
//     ) {
//       // If city not found.
//       callback("No City found with this name.", undefined);
//     } else {
//       // On Success
//       const coordinates = response.body.features[0].geometry.coordinates;
//       const data = {
//         lon: coordinates[0],
//         lat: coordinates[1],
//       };
//       callback(undefined, data);
//     }
//   });
// };

// module.exports = geocode;
