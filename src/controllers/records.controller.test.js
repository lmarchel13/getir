const request = require("supertest");
const { initDatabaseConnection } = require("../models");
const app = require("../app");

describe("Records controller", () => {
  beforeAll(() => initDatabaseConnection(() => {}));

  it("success", async () => {
    const payload = {
      startDate: "2016-03-09",
      endDate: "2016-03-10",
      minCount: 1000,
      maxCount: 3000,
    };

    await request(app)
      .post("/records")
      .send(payload)
      .expect(200)
      .expect(function (res) {
        const { code, msg, records } = res.body;

        expect(code).toBe(0);
        expect(msg).toBe("success");
        expect(records.length).toBeGreaterThan(0);
      });
  });

  it("bad request", async () => {
    const payload = {
      endDate: "2016-03-10",
      minCount: 1000,
      maxCount: 3000,
    };

    await request(app)
      .post("/records")
      .send(payload)
      .expect(400)
      .expect(function (res) {
        const { code, msg, records } = res.body;

        expect(code).toBe(400);
        expect(msg).toBe('bad request - "startDate" is required');
        expect(records.length).toBe(0);
      });
  });

  it("success but no records", async () => {
    const payload = {
      startDate: "2016-03-10",
      endDate: "2016-03-10",
      minCount: 0,
      maxCount: 0,
    };

    await request(app)
      .post("/records")
      .send(payload)
      .expect(404)
      .expect(function (res) {
        const { code, msg, records } = res.body;

        expect(code).toBe(404);
        expect(msg).toBe("not found");
        expect(records.length).toBe(0);
      });
  });
});
