require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/posts", require("./routes/api/posts"));

app.get("/", (req, res) => {
  res.send("No");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port + "..."));
