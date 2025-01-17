const express = require("express");
const connect_to_database = require("./config/db")
const auth_routes = require("./modules/auth/auth.routes")
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

app.use("/auth", auth_routes);

module.exports = app;
