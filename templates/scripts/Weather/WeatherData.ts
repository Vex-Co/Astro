export interface WeatherData {
    // optional because sometime weather data not found.
    error?: string,
  
    // This will return if data found
    address: string,
    country_tag: string,
    area: string,
    status: string,
    temprature: number,
    humidity: number,
    visibility: number
}