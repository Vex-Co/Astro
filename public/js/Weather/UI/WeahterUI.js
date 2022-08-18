export class WeatherUI {
    constructor() {
        this.searchInput = document.getElementById('search-inp');
        this.textContentElem = document.getElementById('text-content');
        this.error = document.querySelector('.error');
        this.loadingImg = document.querySelector('img#loading');
        this.area = document.getElementById('location');
        this.temprature = document.getElementById('temprature');
        this.humidity = document.getElementById('humidity');
        this.visibility = document.getElementById('visibility');
    }
    showLoading() {
        if (this.loadingImg) {
            this.hideContent(this.textContentElem);
            this.showContent(this.loadingImg);
            this.hideContent(this.error);
        }
    }
    attachEventListner(selectorID, callback) {
        const searchBtn = document.getElementById(selectorID);
        if (searchBtn) {
            searchBtn.addEventListener('click', callback);
        }
    }
    showWeather(data) {
        if (data.error) {
            this.showError(data.error);
        }
        else {
            this.updateDisplayCard(data);
        }
    }
    showError(error) {
        if (this.error) {
            this.hideContent(this.loadingImg);
            this.error.textContent = error;
            this.showContent(this.error);
        }
    }
    updateDisplayCard(data) {
        if (this.area && this.temprature && this.humidity && this.visibility) {
            if (data.address) {
                this.area.innerHTML = `
                  ${data.address.charAt(0).toUpperCase() + data.address.slice(1).toLowerCase()}<sup class="symbol">${data.country_tag}</sup>
                `;
            }
            if (data.temprature) {
                this.temprature.innerHTML = `
                  ${data.temprature.toFixed(0)}<span class="symbol">C°</span>
                `;
            }
            if (data.temprature) {
                this.humidity.innerHTML = `
                  ${data.humidity}<span class="symbol">%</span>
                `;
            }
            if (data.visibility) {
                this.visibility.innerHTML = `
                  ${data.visibility}<span class="symbol">km</span>
                `;
            }
            this.hideContent(this.error);
            this.hideContent(this.loadingImg);
            this.showContent(this.textContentElem);
        }
    }
    hideContent(element) {
        element === null || element === void 0 ? void 0 : element.classList.add('hide');
    }
    showContent(element) {
        element === null || element === void 0 ? void 0 : element.classList.remove('hide');
    }
    getInput() {
        const cityName = this.searchInput.value;
        if (cityName)
            return cityName;
        else
            return undefined;
    }
}
