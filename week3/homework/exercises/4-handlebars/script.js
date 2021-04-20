/**
 * 4. Fun with Handlebars
 *
 * Write a javascript function that simulates playing the game cards against humanity.
 * The code should choose a subject and a punchline at random,
 * then replace them in a sentence using handlebars.
 *
 * Hints:
 * - Check the handlebars npm page for examples and documentation
 */

const Handlebars = require("handlebars");

function drawCard(subjects, punchlines) {
  const cardData = {
    subject: getRandomElement(subjects),
    punchline: getRandomElement(punchlines),
  };
  return cardData;
}

function getRandomElement(array) {
  const randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
}

const subjects = [
  "shark",
  "popcorn",
  "poison",
  "fork",
  "cherry",
  "toothbrush",
  "cannon",
];

const punchlines = [
  "watch movie with",
  "spread some love",
  "put on cake",
  "clean toilets",
  "go to the moon",
  "achieve world piece",
  "help people learn programing",
];

const card = "{{subject}} is great to {{punchline}}";
const template = Handlebars.compile(card);
const result = template(drawCard(subjects, punchlines));
console.log(result);
