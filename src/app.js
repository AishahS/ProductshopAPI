const express = require("express");
const cors = require("cors");
const slugify = require("slugify");
//cookies
var cookies = require("./cookies");
const app = express();
app.use(cors());
app.use(express.json());
//routes
app.get("/cookies", (req, res) => {
  res.json(cookies);
});

//delete
app.delete("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const foundcookie = cookies.find((cookie) => cookie.id == cookieId);
  if (foundcookie) {
    cookies = cookies.filter((cookie) => cookie.id != cookieId);
    res.status(204).json({ message: "cookie has been deleted" });
  } else {
    res.status(404).json({ message: "cookie not found" });
  }
});

// add new cookie
app.post("/cookies", (req, res) => {
  console.log(req.body);
  const _slug = slugify(req.body.name, { lower: true });
  const newCookie = {
    ...req.body,
    id: cookies[cookies.length - 1].id + 1,
    slug: _slug,
  };
  cookies.push(newCookie);
  res.status(201).json(newCookie);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
