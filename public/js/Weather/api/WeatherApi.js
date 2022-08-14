var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API } from "./API.js";
export class WeatherApi extends API {
    constructor() {
        super();
        this.baseUrl = '/weather';
    }
    // Fetch Weather from Server.
    fetchWeather(cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            // Preparing URL
            const url = `${this.baseUrl}?address=${cityName}`;
            // Get the data from the fetchData(method) of API(Generic Class).
            const data = yield this.fetchData(url);
            return data;
        });
    }
}
