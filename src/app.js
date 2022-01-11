const express = require("express");
const cors = require("cors");
const { HTTPStatusCode } = require("./utils/responses");
const controllers = require("./controllers");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Start controllers
app.use(controllers);

// Error handler for uncaught error
app.use(function (err, req, res, next) {
  const code = +err.code === 0 ? HTTPStatusCode.OK : err.code;
  return res.status(code).send(err);
});

module.exports = app;
