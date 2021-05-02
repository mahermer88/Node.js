const axios = require(`axios`).default;
const exphbs = require(`express-handlebars`);
const API_KEY = require("./sources/keys.json");
const express = require(`express`);
const app = express();

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(`/`, (req, res) => {
  res.status(200).render("index");
});

app.post(`/weather`, (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    res.status(404).render("index", {
      error: "City is not found!, Please include valid city name!",
    });
  }

  axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`
  )
    .then((response) => response.data)
    .then((data) => {
      const infoList = [
        `City: ${data.name} - ${data.sys.country}`,
        `Weather:  ${data.weather[0].description}`,
        `Temperature: ${data.main.temp} (${data.main.temp_min} - ${data.main.temp_max})`,
        `Humidity: ${data.main.humidity}`,
        `Wind-speed: ${data.wind.speed}`,
      ];
      res.status(200).render("index", { infoList });
    })
    .catch((error) => {
      res.status(404).render("index", {
        error: "City is not found!, Please include valid city name!",
      });
    });
});

app.listen(3000);
