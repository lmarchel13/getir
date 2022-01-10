const mongoose = require("mongoose");

const NAME = "Record";

module.exports = mongoose.model(
  NAME,
  new mongoose.Schema({
    key: { type: String },
    createdAt: { type: Date },
    value: { type: String },
    counts: { type: [Number] },
  })
);
