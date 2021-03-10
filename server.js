const express = require("express");
const http = require("http");

const cors = require("cors");
const { json } = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(json());
app.use(cors());
app.use(require("./routes"));

mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
});

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("App is listening on port " + PORT);
});

module.exports = app;
