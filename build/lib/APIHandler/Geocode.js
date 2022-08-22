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
exports.Geocode = void 0;
const request_1 = __importDefault(require("request"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Geocode {
    constructor() {
        this._api = process.env.GEOCODE_API;
        this._baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
    }
    fetch(cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buildUrl(cityName);
            const res = yield this.request();
            this.setCoords(res);
            return this._coords;
        });
    }
    request() {
        return new Promise((resolve, reject) => {
            (0, request_1.default)({ url: this._url, json: true }, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    resolve(body);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    buildUrl(cityName) {
        this._url = `${this._baseUrl}${cityName}.json?access_token=${this._api}`;
    }
    setCoords(response) {
        const feature = response.features[0];
        if (feature) {
            const coordinations = feature.geometry.coordinates;
            const coords = {
                lon: coordinations[0],
                lat: coordinations[1],
            };
            this._coords = coords;
        }
    }
}
exports.Geocode = Geocode;
//# sourceMappingURL=Geocode.js.map