const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const url = process.env.URL;
const fetch = require("node-fetch");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is quiz server"
  });
});

app.post("/quiz", (req, res) => {
  if (
    !req.body.noOfQuestions ||
    !req.body.selectedCategory ||
    !req.body.selectedDifficulty
  ) {
    res.status(404).json({ message: "All details were not provided" });
  }
  // console.log(req);
  try {
    fetch(
      `${url}amount=${req.body.noOfQuestions}&category=${req.body.selectedCategory}&difficulty=${req.body.selectedDifficulty}&type=multiple&encode=url3986`
    )
      .then(response => response.json())
      .then(data => {
        res.status(200).send(data);
      })
      .catch(error => res.status(404).json({ error: error }));
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// Setup a global error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    message: err.message,
    error: process.env.NODE_ENV === "production" ? {} : err
  });
});

app.use("*", (req, res) => {
  res.status(404).send({
    message: "page not found"
  });
});

app.listen(port, () => {
  console.log(`app is listening to port, ${port}`);
});
