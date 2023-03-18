require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const cors = require("cors");
const ingredientController = require('./controllers/ingredientController');

const PORT = process.env.PORT || 3025;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("client/build"));
app.use(ingredientController);
app.use(express.static("client/build"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/archimagirus", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});