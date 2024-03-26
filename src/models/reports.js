const { getDB } = require("../db/mongo");

function getReports() {
  const db = getDB();
  const reportsCollection = db.collection("reports");
  return reportsCollection;
}

module.exports = { getReports };
