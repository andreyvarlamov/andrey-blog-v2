require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(() => console.log("Server started on port " + port + "..."));
