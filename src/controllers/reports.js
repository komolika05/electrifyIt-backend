const { getReports } = require("./../models/reports");

const reports = {
  get: async (req, res, next) => {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    const reportsModel = getReports();

    const query = {};

    if (fromDate && toDate) {
      query.Date = { $gte: fromDate };
      query.Date = { $lte: toDate };
    }

    const result = await reportsModel.find(query).toArray();
    const reportLabels = [
      "License Plate",
      "Make",
      "VIN",
      "Model",
      "Type",
      "Date",
      "Miles Driven",
    ];

    const rows= result.map((element) => {
      delete element._id;
      const elementArray = Object.values(element)
      return elementArray
    })

    return res.status(200).json({ columns: reportLabels, rows });
  },
};

module.exports = reports;
