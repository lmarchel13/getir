const Joi = require("joi");
const { BadRequestErrorResponse } = require("../utils/responses");

const loadRecordSchema = Joi.object().keys({
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  minCount: Joi.number().required(),
  maxCount: Joi.number().required(),
});

const loadRecordsValidation = (req, _, next) => {
  const { error } = loadRecordSchema.validate(req.body);

  if (error) {
    console.error("Error validating request payload:", error);

    throw next(new BadRequestErrorResponse(`bad request - ${error}`));
  }

  next();
};

module.exports = {
  loadRecordsValidation,
};
