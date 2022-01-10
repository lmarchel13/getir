const { Router } = require("express");
const { RecordService } = require("../services");
const { loadRecordsValidation } = require("../middlewares");
const {
  HTTPStatusCode,
  NotFoundErrorResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} = require("../utils/responses");

const router = Router();

router.post("/", loadRecordsValidation, async (req, res) => {
  try {
    const { startDate, endDate, minCount, maxCount } = req.body;
    console.debug(
      "Request payload received to load records:",
      JSON.stringify({ startDate, endDate, minCount, maxCount })
    );

    const records = await RecordService.Load({
      startDate,
      endDate,
      minCount,
      maxCount,
    });

    if (!records.length) return res.status(HTTPStatusCode.NotFound).send(new NotFoundErrorResponse());

    console.info("Records loaded successfully:", JSON.stringify({ total: records.length }));

    return res.send(new SuccessResponse(records));
  } catch (error) {
    console.error("Error while loading records:", error);

    return res.status(HTTPStatusCode.InternalServerError).send(new InternalServerErrorResponse());
  }
});

module.exports = router;
