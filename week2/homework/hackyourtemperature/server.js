const exphbs = require(`express-handlebars`);
const express = require(`express`);
const app = express();

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(`/`, (req, res) => {
  res.render("index");
});

app.post(`/weather`, (req, res) => {
  const cityName = req.body.cityName;
  res.render("index", { cityName: `Your chosen city is: ${cityName}` });
});

app.listen(3000);
