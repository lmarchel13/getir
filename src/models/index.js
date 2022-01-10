const mongoose = require("mongoose");

const Record = require("./record.model.js");

const { DATABASE_URL } = require("../config");

const initDatabaseConnection = async () => {
  return mongoose
    .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.info("Connected successfully to database");
    })
    .catch((err) => {
      console.error(`Could not connected to database: ${err.message}`);
      process.exit(1);
    });
};

module.exports = {
  initDatabaseConnection,
  Record,
};
