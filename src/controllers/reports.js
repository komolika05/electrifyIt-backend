const { getReports } = require("./../models/reports");

const reports = {
  get: async (req, res, next) => {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    const reportsModel = getReports();

    const query = {};

    if (fromDate && toDate) {
      query.date = { $gte: fromDate };
      query.date = { $lte: toDate };
    }

    const result = await reportsModel.find(query).toArray();

    return res.status(200).json(result);
  },
};

module.exports = reports;
