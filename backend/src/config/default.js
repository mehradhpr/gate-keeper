module.exports = {
  serverConfig: {
    port: 5000,
  },
  database: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1h",
  },
};
