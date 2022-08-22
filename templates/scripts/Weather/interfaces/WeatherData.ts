export interface WeatherData {
  error?: string;

  // This will return if data found
  city?: string;
  country_tag?: string;
  area?: string;
  status?: string;
  temprature?: number;
  humidity?: number;
  visibility?: number;
}
