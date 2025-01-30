const mongoose = require("mongoose");

const connect_to_database = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MongoDB connection URL is missing. Please provide it.");
      return;
    }

    console.log("Attempting to connect to MongoDB Database...");
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB Database: ${connection.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.log(
      "Failed to connect to MongoDB. Please check your connection settings and try again."
    );
  }
};

module.exports = connect_to_database;
