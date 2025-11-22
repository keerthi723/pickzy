const app = require("./app");
const cors = require("cors");
const path = require("path");
const connectDatabase = require("./config/database");

connectDatabase();
// CORS Configuration for production
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://pickzy-frontend.onrender.com",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "X-Requested-With",
    ],
    exposedHeaders: ["Set-Cookie"],
  })
);
app.options("*", cors());

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server listening to port :${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
// unhandledrejection-eg:catch error is removed in database so if error occurred it would be unhandlederror
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to unhandled rejection");
  server.close(() => {
    // whenever we give server.close -server only stop but not the node so we use process
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");
  server.close(() => {
    process.exit(1);
  });
});
// console.log(a);if undefined variable error will be handled by uncaughtexception.
