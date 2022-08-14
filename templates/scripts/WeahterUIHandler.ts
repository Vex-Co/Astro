import { WeatherData } from "./Weather/WeatherData";

export class WeatherUIHandler {
    searchInput = document.getElementById('search-inp') as HTMLInputElement;
    card = document.getElementById('text-content');
    error = document.querySelector('.error');

    // Card Elements
    area = document.getElementById('location');
    temprature = document.getElementById('temprature');
    humidity = document.getElementById('humidity');
    visibility = document.getElementById('visibility');

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
        // When there error property set by the server.
        if (data.error) {
            this.showError(data.error);
        }
        else {
            this.updateDisplayCard(data);
        }
    }
    showError(error: string) {
        // this.showLoading();
        if (this.error) {
            this.error.textContent = error;
            this.hideContent(this.error);
        }
    }
    updateDisplayCard(data: WeatherData) {
        if (this.area && this.temprature && this.humidity && this.visibility){
            this.area.innerHTML = `
              ${data.address.charAt(0).toUpperCase() + data.address.slice(1).toLowerCase()}<sup class="symbol">${data.country_tag}</sup>
            `;
            this.temprature.innerHTML = `
              ${data.temprature.toFixed(0)}<span class="symbol">C°</span>
            `;
            this.humidity.innerHTML = `
              ${data.humidity}<span class="symbol">%</span>
            `;
            this.visibility.innerHTML = `
              ${data.visibility}<span class="symbol">km</span>
            `;
        }
    }
    // Hide Content
    hideContent(element: Element) {
        element?.classList.add('hide')
    }
    // Show Content
    showContent(element: HTMLElement) {
        element?.classList.remove('hide')
    }
    // Get the input from search bar
    getInput():string | undefined {
        const cityName = this.searchInput.value;

        if (cityName)
            return cityName;
        else
            return undefined;
    }
}