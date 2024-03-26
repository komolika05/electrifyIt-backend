const express = require("express");
const cors = require("cors");
const { init } = require("./db/mongo.js");

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

(async () => {
  try {
    await init();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error initializing MongoDB:", error);
  }
})();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
