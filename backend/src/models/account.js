const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true},
  last_name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Account", accountSchema);