const express = require("express");
const cors = require("cors");
const http = require("http");
const { HTTPStatusCode } = require("./utils/responses");

const { initDatabaseConnection } = require("./models");
const controllers = require("./controllers");

const app = express();

// Start database connection
initDatabaseConnection();

// Middlewares
app.use(cors());
app.use(express.json());

// Start controllers
app.use(controllers);

// Error handler for uncaught error
app.use(function (err, _, res, _) {
  const code = +err.code === 0 ? HTTPStatusCode.OK : err.code;
  return res.status(code).send(err);
});

// Start server
const server = http.createServer(app);

module.exports = server;
