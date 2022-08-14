import { WeatherData } from './WeatherData' // Interface
import { WeatherUIHandler } from '../WeahterUIHandler';
import { WeatherApi } from './api/WeatherApi';
export class Weather {
  apiHandler= new WeatherApi;
  uiHandler = new WeatherUIHandler;

  constructor() {
    // Attach click event with search-btn
    this.uiHandler.attachEventListner('search-btn', (event) => {
      event.preventDefault();
      // to fix
      this.searchWeather('karachi');
    });
  }
  async searchWeather(address:string) {
    const data = await this.apiHandler.fetchData(address);

    this.uiHandler.setParamsToDisplay(data);
    this.uiHandler.showWeather(data);
  }
}