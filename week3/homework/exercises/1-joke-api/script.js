/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */
const fetch = require("node-fetch");
const express = require(`express`);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function printChuckNorrisJoke() {
  try {
    const data = await fetch(`http://api.icndb.com/jokes/random`);
    const response = await data.json();
    const randomJoke = response.value.joke;
    return randomJoke;
  } catch (err) {
    console.log(err);
  }
}

app.get(`/`, async (req, res) => {
  try {
    const randomJoke = await printChuckNorrisJoke();
    res.status(200).send(`<h1>${randomJoke}</h1>`);
  } catch (err) {
    res.status(404).send(`<h1>${err}</h1>`);
  }
});

app.listen(3000);
