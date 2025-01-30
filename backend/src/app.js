const express = require("express");
const connect_to_database = require("./config/db");
const auth_routes = require("./modules/auth/auth.routes");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/auth", auth_routes);

const initApp = async () => {
  await connect_to_database();
};

module.exports = { app, initApp };
