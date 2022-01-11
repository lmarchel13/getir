module.exports = (RecordModel) => ({
  Load: async ({ startDate, endDate, minCount, maxCount }) => {
    try {
      return RecordModel.aggregate()
        .project({
          _id: 0,
          key: "$key",
          createdAt: "$createdAt",
          totalCount: { $sum: "$counts" },
        })
        .match({
          createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) },
          totalCount: { $gte: minCount, $lte: maxCount },
        });
    } catch (error) {
      console.error("Error while loading records from database:", error);
      throw error;
    }
  },
});
