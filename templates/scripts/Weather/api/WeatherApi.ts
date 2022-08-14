import { WeatherData } from "../WeatherData";
import { API } from "./API";

export class WeatherApi extends API<WeatherData>{
    baseUrl: string = '/weather';
    constructor () {
        super();
    }
    // Fetch Weather from Server.
    async fetchWeather(cityName: string): Promise<WeatherData> {
        // Preparing URL
        const url = `${this.baseUrl}?address=${cityName}`;

        // Get the data from the fetchData(method) of API(Generic Class).
        const data:WeatherData = await this.fetchData(url);
        return data;
    }
}