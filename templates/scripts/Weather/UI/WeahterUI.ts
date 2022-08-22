import { WeatherData } from '../interfaces/index';

export class WeatherUI {
  searchInput = document.getElementById('search-inp') as HTMLInputElement;
  textContentElem = document.getElementById('text-content') as HTMLElement;
  error = document.querySelector('.error') as HTMLElement;
  loadingImg = document.querySelector('img#loading') as HTMLElement;

  // Card Elements
  area = document.getElementById('location');
  temprature = document.getElementById('temprature');
  humidity = document.getElementById('humidity');
  visibility = document.getElementById('visibility');

  showLoading() {
    if (this.loadingImg) {
      this.hideContent(this.textContentElem);
      this.showContent(this.loadingImg);
      this.hideContent(this.error);
    }
  }
  attachEventListner(
    selectorID: string,
    callback: (event: MouseEvent) => void
  ) {
    const searchBtn = document.getElementById(selectorID);

    if (searchBtn) {
      searchBtn.addEventListener('click', callback);
    }
  }
  showWeather(data: WeatherData) {
    // When there error property set by the server.
    if (data.error) {
      this.showError(data.error);
    } else {
      this.updateDisplayCard(data);
    }
  }
  showError(error: string) {
    if (this.error) {
      this.hideContent(this.loadingImg);
      this.error.textContent = error;
      this.showContent(this.error);
    }
  }
  updateDisplayCard(data: WeatherData) {
    if (this.area && this.temprature && this.humidity && this.visibility) {
      if (data.area) {
        this.area.innerHTML = `
                  ${
                    data.area.charAt(0).toUpperCase() +
                    data.area.slice(1).toLowerCase()
                  }<sup class="symbol">${data.country_tag}</sup>
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
  // Hide Content
  hideContent(element: Element) {
    element?.classList.add('hide');
  }
  // Show Content
  showContent(element: Element) {
    element?.classList.remove('hide');
  }
  // Get the input from search bar
  getInput(): string | undefined {
    const cityName = this.searchInput.value;

    if (cityName) return cityName;
    else return undefined;
  }
}
