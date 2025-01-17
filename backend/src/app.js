const express = require("express");
const connect_to_database = require("./config/db")
require("dotenv").config();
const app = express();
connect_to_database();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);
});

app.post("/auth/register", (req, res) => {
  console.log(req.body);
})

module.exports = app;
