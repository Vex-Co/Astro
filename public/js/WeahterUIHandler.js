export class WeatherUIHandler {
    constructor() {
        this.searchInput = document.getElementById('search-inp');
        this.textBox = document.getElementById('text-content');
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
    showError(error) {
        // this.showLoading();
        if (this.error) {
            this.error.textContent = error;
            this.error.classList.toggle("hide");
        }
    }
}
