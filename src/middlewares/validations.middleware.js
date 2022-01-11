const JoiImport = require("joi");
const JoiDateExtension = require("@joi/date");
const { BadRequestErrorResponse } = require("../utils/responses");

const Joi = JoiImport.extend(JoiDateExtension);

const DATE_FORMAT = "YYYY-MM-DD";

const loadRecordSchema = Joi.object().keys({
  startDate: Joi.date().format(DATE_FORMAT).required(),
  endDate: Joi.date().format(DATE_FORMAT).required(),
  minCount: Joi.number().required(),
  maxCount: Joi.number().required(),
});

const loadRecordsValidation = (req, _, next) => {
  const { error } = loadRecordSchema.validate(req.body);

  if (error) {
    const err = error.details[0].message;
    console.error("Error validating request payload:", err);
    return next(new BadRequestErrorResponse(`bad request - ${err}`));
  }

  next();
};

module.exports = {
  loadRecordsValidation,
};
