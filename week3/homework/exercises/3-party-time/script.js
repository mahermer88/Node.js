/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */
const exphbs = require(`express-handlebars`);
const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function makeReservation(details) {
  try {
    const data = await fetch(
      `https://reservation100-sandbox.mxapps.io/api/reservations`,
      {
        method: `post`,
        body: JSON.stringify(details),
        headers: { "Content-Type": "application/json" },
      }
    );
    const response = await data.json();
    return response.message;
  } catch (err) {
    throw err;
  }
}

// Create Home page
app.get(`/`, (req, res) => {
  res.render("index");
});

// Create new reservation
app.post("/reservations", async (req, res) => {
  try {
    // What if the request does not have a title and/or content?
    if (!req.body || !req.body.name || !req.body.numberOfPeople) {
      return res.status(400).render("index", {
        message:
          "Please include a valid name and number of people you plan to bring",
      });
    }
    const message = await makeReservation(req.body);
    res.status(200).render("index", { message });
  } catch (err) {
    return res.status(404).render("index", {
      message: err,
    });
  }
});

app.listen(3000);
