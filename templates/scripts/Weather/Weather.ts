import { WeatherUIHandler } from '../UI/WeahterUIHandler';
import { WeatherApi } from './api/WeatherApi';

export class Weather {
  apiHandler= new WeatherApi;
  uiHandler = new WeatherUIHandler;

  constructor() {
    // Attach click event with search-btn
    this.uiHandler.attachEventListner('search-btn', (event) => {
      event.preventDefault();
      
      // Get the cityname from search bar if not, lahore is default city.
      const cityName = this.uiHandler.getInput() || 'Lahore';
      this.searchWeather(cityName);
    });
  }
  async searchWeather(cityName: string) {
    // Get the weather info from server via api handler
    const data = await this.apiHandler.fetchWeather(cityName);

    // Update UI based on the data.
    this.uiHandler.showWeather(data);
  }
}