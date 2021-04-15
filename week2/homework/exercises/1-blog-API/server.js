const express = require("express");
const app = express();
const fs = require("fs");

const blogs = require("./Blogs");

// YOUR CODE GOES IN HERE
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello World");
});

// Create new blog
app.post("/blogs", (req, res) => {
  // How to get the title and content from the request??
  const title = req.body.title;
  const content = req.body.content;
  // What if the request does not have a title and/or content?
  if (!title || !content) {
    return res.status(400).json({ msg: "Please include a title and content" });
  }
  fs.writeFileSync(title, content);
  res.end("ok");

  blogs.push(title);
});

// Update blog
app.put("/posts/:title", (req, res) => {
  const title = req.params.title;
  const content = req.body.content;
  if (fs.existsSync(title)) {
    if (!title || !content) {
      return res
        .status(400)
        .json({ msg: "Please include a title and content" });
    }
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    // Send response with error message
    res.status(400).json({ msg: `This post does not exist!` });
  }
});

// Delete blog
app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.status(400).json({ msg: `This post does not exist!` });
  }
});
// Read blog
app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.end(post);
  } else {
    res.status(400).json({ msg: `This post does not exist!` });
  }
});

// Gets All blogs
app.get("/blogs", (req, res) => {
  res.end(`${blogs}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
