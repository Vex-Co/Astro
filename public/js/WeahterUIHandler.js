export class WeatherUIHandler {
    constructor() {
        this.searchInput = document.getElementById('search-inp');
        this.card = document.getElementById('text-content');
        this.error = document.querySelector('.error');
    }
    showLoading() {
        const loading = document.querySelector('img#loading');
        if (loading) {
            loading.classList.toggle('hide');
        }
    }
    attachEventListner(selectorID, callback) {
        const searchBtn = document.getElementById(selectorID);
        if (searchBtn) {
            searchBtn.addEventListener('click', callback);
        }
    }
    showWeather(data) {
        if (this.card) {
            // this.card.classList.toggle('hide');
            // this.showLoading();
        }
        if (data.error) {
            this.showError(data.error);
        }
        else {
            // this.showLoading();
            if (this.card) {
                // this.card.classList.toggle('hide');
            }
        }
    }
    showError(error) {
        // this.showLoading();
        if (this.error) {
            this.error.textContent = error;
            this.error.classList.toggle("hide");
        }
    }
    updateDisplayCard(data) {
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
    // Hide display-card
    hideCardContent() {
        var _a;
        (_a = this.card) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
    }
    // Show display-card
    showCardContent() {
        var _a;
        (_a = this.card) === null || _a === void 0 ? void 0 : _a.classList.remove('hide');
    }
    // Get the input from search bar
    getInput() {
        const cityName = this.searchInput.value;
        if (cityName)
            return cityName;
        else
            return undefined;
    }
}
