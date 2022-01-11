const { loadRecordsValidation } = require("./");
const { BadRequestErrorResponse } = require("../utils/responses");

describe("load records validation tests", () => {
  const mockNextFn = jest.fn((err) => {});

  it("should return success if all fields were provided", () => {
    const req = {
      body: {
        startDate: "2016-03-09",
        endDate: "2016-03-10",
        minCount: 1000,
        maxCount: 3000,
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith();
  });

  it("should throw an error if start date is missing", () => {
    const req = {
      body: {
        endDate: "2016-03-10",
        minCount: 1000,
        maxCount: 3000,
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith(new BadRequestErrorResponse(`bad request - "startDate" is required`));
  });

  it("should throw an error if start date is not in the expected format", () => {
    const req = {
      body: {
        startDate: "2016-13-13",
        endDate: "2016-03-10",
        minCount: 1000,
        maxCount: 3000,
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith(
      new BadRequestErrorResponse(`bad request - "startDate" must be in YYYY-MM-DD format`)
    );
  });

  it("should throw an error if end date is missing", () => {
    const req = {
      body: {
        startDate: "2016-03-10",
        minCount: 1000,
        maxCount: 3000,
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith(new BadRequestErrorResponse(`bad request - "endDate" is required`));
  });

  it("should throw an error if start date is not in the expected format", () => {
    const req = {
      body: {
        startDate: "2016-03-10",
        endDate: "2016-13-13",
        minCount: 1000,
        maxCount: 3000,
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith(
      new BadRequestErrorResponse(`bad request - "endDate" must be in YYYY-MM-DD format`)
    );
  });

  it("should throw an error if minCount is missing", () => {
    const req = {
      body: {
        startDate: "2016-03-10",
        endDate: "2016-03-10",
        maxCount: 3000,
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith(new BadRequestErrorResponse(`bad request - "minCount" is required`));
  });

  it("should throw an error if minCount is NaN", () => {
    const req = {
      body: {
        startDate: "2016-03-10",
        endDate: "2016-03-10",
        minCount: "ABC",
        maxCount: 3000,
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith(new BadRequestErrorResponse(`bad request - "minCount" must be a number`));
  });

  it("should throw an error if maxCount is missing", () => {
    const req = {
      body: {
        startDate: "2016-03-10",
        endDate: "2016-03-10",
        minCount: 3000,
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith(new BadRequestErrorResponse(`bad request - "maxCount" is required`));
  });

  it("should throw an error if maxCount is NaN", () => {
    const req = {
      body: {
        startDate: "2016-03-10",
        endDate: "2016-03-10",
        minCount: 3000,
        maxCount: "ABc",
      },
    };

    loadRecordsValidation(req, {}, mockNextFn);

    expect(mockNextFn).toHaveBeenCalledWith(new BadRequestErrorResponse(`bad request - "maxCount" must be a number`));
  });
});
