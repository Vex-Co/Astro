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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
const request_1 = __importDefault(require("request"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Weather {
    constructor() {
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    }
    fetch(coords) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildUrl(coords);
            const res = yield this.request();
            this.setWeather(res);
            return this._weather;
        });
    }
    request() {
        return new Promise((resolve, reject) => {
            (0, request_1.default)({ url: this.url, json: true }, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    resolve(body);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    buildUrl(coords) {
        this.url = `${this.baseUrl}lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.WEATHER_API}&units=metric`;
    }
    setWeather(response) {
        const weather = response;
        if (weather.message) {
            this._weather = {
                error: weather.message,
            };
        }
        else {
            this._weather = {
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
exports.Weather = Weather;
//# sourceMappingURL=Weather.js.map