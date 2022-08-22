"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoCode = void 0;
const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
class GeoCode {
    _token = process.env.GEOCODE_TOKEN;
    _baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
    _city;
    constructor(city) {
        if (city) {
            this._city = encodeURIComponent(city);
        }
        else {
            this._city = "";
        }
    }
    get(callback) {
        const url = `${this._baseUrl}${this._city}.json?access_token=${this._token}`;
        request({ url: url, json: true }, callback);
    }
}
exports.GeoCode = GeoCode;
const geocode = new GeoCode("lahore");
geocode.get((error, response) => {
    const features = response.body.features;
    if (features) {
        const coordinations = features[0].geometry.coordinates;
        const coords = {
            lon: coordinations[0],
            lat: coordinations[1],
        };
    }
});
