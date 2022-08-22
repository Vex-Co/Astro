"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherHandler = void 0;
const Geocode_1 = require("./APIHandler/Geocode");
const Weather_1 = require("./APIHandler/Weather");
class WeatherHandler {
    static getWeather(cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            const coords = yield this.geocodeAPIHandler.fetch(cityName);
            if (coords) {
                const weather = yield this.weatherAPIHandler.fetch(coords);
                return weather;
            }
            else {
                return {
                    error: 'Could not find you requested city.',
                };
            }
        });
    }
    static getWeatherController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityName = req.query.address;
            if (!cityName) {
                return res.send({
                    error: 'Please provide address to search.',
                });
            }
            const weahter = yield WeatherHandler.getWeather(cityName);
            res.send(weahter);
        });
    }
}
exports.WeatherHandler = WeatherHandler;
WeatherHandler.weatherAPIHandler = new Weather_1.Weather();
WeatherHandler.geocodeAPIHandler = new Geocode_1.Geocode();
//# sourceMappingURL=WeatherHandler.js.map