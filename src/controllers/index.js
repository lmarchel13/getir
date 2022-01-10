const { Router } = require("express");
const RecordController = require("./records.controller.js");

const router = Router();

router.use("/records", RecordController);

module.exports = router;
