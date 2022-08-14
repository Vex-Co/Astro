export class Weather {
    static init() {
        const searchBtn = document.getElementById('search-btn');
        // Default location is Lahore
        this.searchWeather("Lahore");
        if (searchBtn) {
            searchBtn.addEventListener('click', (event) => {
                event.preventDefault();
                this.searchWeather();
            });
        }
    }
    static searchWeather(address) {
        const searchInput = document.getElementById('search-inp');
        const textContent = document.getElementById('text-content');
        const error = document.querySelector('.error');
        if (textContent) {
            textContent.classList.toggle('hide');
            this.showLoading();
        }
        let url;
        if (address) {
            url = `../weather?address=${address}`;
        }
        else if (searchInput && searchInput.value) {
            url = `../weather?address=${searchInput.value}`;
        }
        else {
            // To fix
            url = `/weather?address=`;
        }
        this.fetchData(url, (data) => {
            if (data.error) {
                this.showLoading();
                if (error) {
                    error.textContent = data.error;
                    error.classList.toggle("hide");
                }
            }
            else {
                this.showLoading();
                this.setParamsToDisplay(data);
                if (textContent) {
                    textContent.classList.toggle('hide');
                }
            }
        });
    }
    static fetchData(url, callback) {
        // this fetch function is builint
        fetch(url).then((response) => {
            response.json().then((data) => {
                callback(data);
            });
        });
    }
    static setParamsToDisplay(data) {
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
    static showLoading() {
        const loading = document.querySelector('img#loading');
        if (loading) {
            loading.classList.toggle('hide');
        }
    }
}
