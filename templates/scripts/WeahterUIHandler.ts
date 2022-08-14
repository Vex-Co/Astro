import { WeatherData } from "./Weather/WeatherData";

export class WeatherUIHandler {
    searchInput = document.getElementById('search-inp') as HTMLInputElement;
    textBox = document.getElementById('text-content');
    error = document.querySelector('.error') as HTMLInputElement;

    showLoading() {
        const loading = document.querySelector('img#loading');
        if (loading) {
            loading.classList.toggle('hide');
        }
    }
    attachEventListner(selectorID:string, callback: (event:MouseEvent) => void) {
        const searchBtn = document.getElementById(selectorID);

        if (searchBtn){
            searchBtn.addEventListener('click', callback);
        }
    }
    showWeather (data: WeatherData) {

        if (this.textBox) {
            // this.textBox.classList.toggle('hide');
            // this.showLoading();
        }
        

        if (data.error) {
            this.showError(data.error);
        }
        else {
            // this.showLoading();
            if (this.textBox) {
                // this.textBox.classList.toggle('hide');
            }
        }
    }
    showError(error: string) {
        // this.showLoading();
        if (this.error) {
            this.error.textContent = error;
            this.error.classList.toggle("hide");
        }
    }
    setParamsToDisplay(data: any) {
        const area = document.getElementById('location');
        const temprature = document.getElementById('temprature');
        const humidity = document.getElementById('humidity');
        const visibility = document.getElementById('visibility');
    
        if (area && temprature && humidity && visibility){
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