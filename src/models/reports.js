const { getDB } = require("../db/mongo");

function getReports() {
  const db = getDB();
  const reportsCollection = db.collection("report");
  return reportsCollection;
}

module.exports = { getReports };
