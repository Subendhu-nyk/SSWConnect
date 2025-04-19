const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./util/sswconnectDatabase");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

sequelize
  .sync()
  .then(() => {
    app.listen(2000);
    console.log("Database Schema Updated");
  })
  .catch((err) => {
    console.error("error updating database schema:", err);
  });
