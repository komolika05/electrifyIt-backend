const express = require("express");
const cors = require("cors");
const { init } = require("./db/mongo.js");

const seedInitialData = require("./utils/seedData.js");

const reports = require("./controllers/reports");

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

(async () => {
  try {
    await init();

    console.log("MongoDB connected successfully");

    await seedInitialData();
  } catch (error) {
    console.error("Error initializing MongoDB:", error);
  }
})();

app.get("/reports", reports.get);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
