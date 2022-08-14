import { WeatherData } from "../WeatherData";
import { API } from "./API";

export class WeatherApi extends API<WeatherData>{
    url: string = '/weather';
    constructor () {
        super();
    }
}