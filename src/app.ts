import path from 'path';
import express from 'express';
import hbs from 'hbs';
import { WeatherHandler } from './lib/WeatherHandler';
import { CityValidator } from './lib/middleware/CityValidator';

const app = express();
const port = process.env.PORT || 3000;

// Configurations
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
app.set('view engine', 'hbs');

// Routes
app.get('', (req, res) => {
  res.render('index');
});

app.get(
  '/weather',
  CityValidator.validate,
  WeatherHandler.getWeatherController
);

app.get('/about', (req, res) => {
  res.render('comming_soon');
});

app.get('/help', (req, res) => {
  res.render('comming_soon');
});

app.listen(port);
