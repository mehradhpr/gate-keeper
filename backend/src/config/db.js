const mongoose = require("mongoose");

const connect_to_database = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB Database: ${connection.connection.name}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connect_to_database;
