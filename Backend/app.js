const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
// app.use(express.json());
app.use(express.json({
  strict: true,
  verify: (req, res, buf) => {
    if (buf.length === 0) {
      throw new Error('Empty body');
    }
  }
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./models");
const sequelize = require("./util/sswconnectDatabase");
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require ("./routes/departmentRoutes")
const designationRoutes = require ("./routes/designationRoutes")
const templateRoutes = require('./routes/templateRoutes');

app.use(userRoutes);
app.use(departmentRoutes)
app.use(designationRoutes)
app.use(templateRoutes);
app.get("/", (req, res) => {
  res.send("University Dashboard API is running ");
});

const PORT = process.env.PORT || 3000;
sequelize
  .sync()
  .then(() => {
    console.log("Database Schema Updated");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("error updating database schema:", err);
  });
