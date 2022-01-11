const { RecordService } = require("./");
const { Record: RecordModel } = require("../models");

describe("Records Service", () => {
  const payload = {
    startDate: "2016-03-10",
    endDate: "2016-03-11",
    minCount: 100,
    maxCount: 200,
  };

  it("should return an array of records if success", async () => {
    const response = { key: "abc", createdAt: new Date(), totalCount: 10 };
    const model = {
      aggregate: jest.fn(function () {
        return this;
      }),
      project: jest.fn(function () {
        return this;
      }),
      match: jest.fn(() => [response]),
    };

    const service = RecordService(model);
    const records = await service.Load(payload);

    expect(records.length).toBeGreaterThan(0);
    expect(records[0]).toEqual(response);
  });
  it("should return an empty array if nothing was found", async () => {
    const model = {
      aggregate: jest.fn(function () {
        return this;
      }),
      project: jest.fn(function () {
        return this;
      }),
      match: jest.fn(() => []),
    };

    const service = RecordService(model);
    const records = await service.Load(payload);

    expect(records.length).toBe(0);
  });

  it("should handler error if anything goes wrong in the model", async () => {
    const model = {
      aggregate: jest.fn(function () {
        throw new Error("some model error");
      }),
    };

    const service = RecordService(model);
    try {
      await service.Load(payload);
    } catch (error) {
      expect(error.message).toEqual("some model error");
    }
  });
});
