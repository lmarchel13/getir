const { Record: RecordModel } = require("../models");

module.exports = {
  Load: async ({ startDate, endDate, minCount, maxCount }) => {
    const columns = {
      _id: 0,
      key: "$key",
      createdAt: "$createdAt",
      totalCount: { $sum: "$counts" },
    };

    const filter = {
      createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) },
      totalCount: { $gte: minCount, $lte: maxCount },
    };

    return RecordModel.aggregate().project(columns).match(filter);
  },
};
