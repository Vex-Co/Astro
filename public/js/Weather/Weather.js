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
import { ApiHandler } from './ApiHandler.js';
export class Weather {
    constructor() {
        this.apiHandler = new ApiHandler;
        this.uiHandler = new WeatherUIHandler;
        // Attach click event with search-btn
        this.uiHandler.attachEventListner('search-btn', (event) => {
            event.preventDefault();
            this.searchWeather();
        });
    }
    searchWeather(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchInput = document.getElementById('search-inp');
            const textContent = document.getElementById('text-content');
            const error = document.querySelector('.error');
            if (textContent) {
                // textContent.classList.toggle('hide');
                // this.uiHandler.showLoading();
            }
            let url;
            if (address) {
                url = `/weather?address=${address}`;
            }
            else if (searchInput && searchInput.value) {
                url = `/weather?address=${searchInput.value}`;
            }
            else {
                // To fix
                url = `/weather?address=`;
            }
            const data = yield this.apiHandler.fetchData(url);
            this.setParamsToDisplay(data);
            this.uiHandler.showWeather(data);
        });
    }
    fetchData(url, callback) {
        // this fetch function is builint
        fetch(url).then((response) => {
            response.json().then((data) => {
                callback(data);
            });
        });
    }
    setParamsToDisplay(data) {
        const area = document.getElementById('location');
        const temprature = document.getElementById('temprature');
        const humidity = document.getElementById('humidity');
        const visibility = document.getElementById('visibility');
        if (area && temprature && humidity && visibility) {
            area.innerHTML = `
          ${data.address.charAt(0).toUpperCase() + data.address.slice(1).toLowerCase()}<sup class="symbol">${data.country_tag}</sup>
        `;
            temprature.innerHTML = `
          ${data.temprature.toFixed(0)}<span class="symbol">C°</span>
        `;
            humidity.innerHTML = `
          ${data.humidity}<span class="symbol">%</span>
        `;
            visibility.innerHTML = `
          ${data.visibility}<span class="symbol">km</span>
        `;
        }
    }
}
