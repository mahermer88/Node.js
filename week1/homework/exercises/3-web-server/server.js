/**
 * Exercise 3: Create an HTTP web server
 */
const { readFileSync } = require(`fs`);
const homePage = readFileSync("./index.html");
const JavaScript = readFileSync("./index.js");
const style = readFileSync("./style.css");

var http = require("http");

//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(homePage);
  } else if (req.url === "/index.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.end(JavaScript);
  } else if (req.url === "/style.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.end(style);
  }
});

server.listen(3000); // The server starts to listen on port 3000
