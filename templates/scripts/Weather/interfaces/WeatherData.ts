export interface WeatherData {
  error?: string;

  // This will return if data found
  country_tag?: string;
  area?: string;
  status?: string;
  temprature?: number;
  humidity?: number;
  visibility?: number;
}
