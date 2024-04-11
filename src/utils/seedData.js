const reportsData = require("./data.js");
const { getReports } = require("./../models/reports");

async function seedInitialData() {
  const reportsModel = await getReports();

  const existingData = await reportsModel.findOne({});

  if (!existingData) {
    const res = await reportsModel.insertMany(reportsData);
    console.log(res);
  }

  console.log("Initial data seeded to the db");
}

module.exports = seedInitialData;
