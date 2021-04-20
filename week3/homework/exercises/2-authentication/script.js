/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
const fetch = require("node-fetch");
const exphbs = require(`express-handlebars`);
const express = require(`express`);
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function printBooks() {
  try {
    const data = await fetch(
      `https://restapiabasicauthe-sandbox.mxapps.io/api/books`,
      { headers: { Authorization: "Basic YWRtaW46aHZnWDhLbFZFYQ==" } }
    );
    const response = await data.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

app.get(`/`, async (req, res) => {
  const books = await printBooks();
  res.render(`index`, { books });
});

app.listen(3000);
