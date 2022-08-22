import { WeatherUI } from './UI/WeahterUI';
import { WeatherApi } from './api/WeatherApi';

export class Weather {
  apiHandler = new WeatherApi();
  uiHandler = new WeatherUI();

  init() {
    // Attach click event with search-btn
    this.uiHandler.attachEventListner('search-btn', (event) => {
      event.preventDefault();

      this.uiHandler.showLoading();
      // Get the cityname from search bar if not, lahore is default city.
      const cityName = this.uiHandler.getInput();
      if (cityName) {
        this.searchWeather(cityName);
      } else {
        this.uiHandler.showError('Please Provide city name.');
      }
    });
  }
  async searchWeather(cityName: string | undefined) {
    if (cityName) {
      // Get the weather info from server via api handler
      const data = await this.apiHandler.fetchWeather(cityName);

      // Update UI based on the data.
      this.uiHandler.showWeather(data);
    }
  }
}
