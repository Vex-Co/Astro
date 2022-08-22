"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const hbs_1 = __importDefault(require("hbs"));
const WeatherHandler_1 = require("./lib/WeatherHandler");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.set('views', path_1.default.join(__dirname, '../templates/views'));
hbs_1.default.registerPartials(path_1.default.join(__dirname, '../templates/partials'));
app.set('view engine', 'hbs');
app.get('', (req, res) => {
    res.render('index');
});
app.get('/weather', WeatherHandler_1.WeatherHandler.getWeatherController);
app.get('/about', (req, res) => {
    res.render('comming_soon');
});
app.get('/help', (req, res) => {
    res.render('comming_soon');
});
app.listen(port);
//# sourceMappingURL=app.js.map