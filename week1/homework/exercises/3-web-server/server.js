/**
 * Exercise 3: Create an HTTP web server
 */
const { readFileSync } = require(`fs`);
var http = require("http");

//create a server
let server = http.createServer(function (req, res) {
  if (req.url === "/") {
    const homePage = readFileSync("./index.html");
    res.writeHead(200, { "content-type": "text/html" });
    res.end(homePage);
  } else if (req.url === "/index.js") {
    const javaScript = readFileSync("./index.js");
    res.writeHead(200, { "content-type": "application/javascript" });
    res.end(javaScript);
  } else if (req.url === "/style.css") {
    const style = readFileSync("./style.css");
    res.writeHead(200, { "content-type": "text/css" });
    res.end(style);
  } else {
    res.writeHead(404);
    res.end(`This page does not exist!`);
  }
});

server.listen(3000); // The server starts to listen on port 3000
