const http = require("http");
const { app, initApp } = require("./app");
const { serverConfig } = require("./config/default");

const PORT = serverConfig.port;
const server = http.createServer(app);

initApp()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });

// Handle termination signals to gracefully shut down the server
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

// Handle uncaught exceptions and promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
