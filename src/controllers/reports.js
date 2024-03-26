const { getReports } = require("./../models/reports");

const reports = {
  get: async (req, res, next) => {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    const reportsModel = getReports();
        
    

    console.log(req);
    return res.status(200).json({ data: [{ message: "hello" }] });
  },
};

module.exports = reports;
