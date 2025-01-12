const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.status(200).json({message: "Test Info", success: true})
})

module.exports = app;