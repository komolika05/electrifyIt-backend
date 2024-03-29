const aggregateData = require("../utils/aggregateData");
const { getReports } = require("./../models/reports");

const frequencyTypes = ["daily", "weekly", "monthly", "yearly"];

const reports = {
  get: async (req, res, next) => {
    let frequency = req.query.frequency;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    if (!frequencyTypes.includes(frequency)) {
      frequency = "daily";
    }

    const reportsModel = getReports();

    const query = {};

    if (fromDate && toDate) {
      query.Date = { $gte: fromDate, $lte: toDate };
    }

    const result = await reportsModel.find(query).toArray();

    let reportLabels;

    let rows;
    if (frequency === "daily") {
      reportLabels = [
        "No. ",
        "License Plate",
        "Make",
        "VIN",
        "Model",
        "Type",
        "Date",
        "Miles Driven",
      ];

      rows = result.map((element, index) => {
        delete element._id;
        const elementArray = Object.values(element);
        return [index + 1, ...elementArray];
      });
    } else {
      // aggregate rows and report lables accordingly
      reportLabels = ["Frequency Range", "Total Miles Driven"];
      const aggregatedData = aggregateData(result, frequency);

      rows = Object.entries(aggregatedData);
    }

    return res.status(200).json({ columns: reportLabels, rows });
  },
};

module.exports = reports;
