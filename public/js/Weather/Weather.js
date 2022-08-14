var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WeatherUIHandler } from '../WeahterUIHandler.js';
import { WeatherApi } from './api/WeatherApi.js';
export class Weather {
    constructor() {
        this.apiHandler = new WeatherApi;
        this.uiHandler = new WeatherUIHandler;
        // Attach click event with search-btn
        this.uiHandler.attachEventListner('search-btn', (event) => {
            event.preventDefault();
            // Get the cityname from search bar if not, lahore is default city.
            const cityName = this.uiHandler.getInput() || 'Lahore';
            this.searchWeather(cityName);
        });
    }
    searchWeather(cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the weather info from server via api handler
            const data = yield this.apiHandler.fetchWeather(cityName);
            // Update UI based on the data.
            this.uiHandler.updateDisplayCard(data);
            this.uiHandler.showWeather(data);
        });
    }
}
