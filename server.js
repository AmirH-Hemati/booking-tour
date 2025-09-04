const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB)
  .then(() => console.log("successfully connected to mongDB"));

app.listen(port, () => {
  console.log(`listen on port http://localhost:${port}`);
});

const fs = require("fs");
const tourModels = require("./models/tourModels");
const userModels = require("./models/userModels");
const reviewModel = require("./models/reviewModel");
const tours = fs.readFileSync("./dev-data/data/tours.json", "utf-8");
const users = fs.readFileSync("./dev-data/data/users.json", "utf-8");
const review = fs.readFileSync("./dev-data/data/reviews.json", "utf-8");
async function addAllData() {
  await tourModels.create(JSON.parse(tours));
  await userModels.create(JSON.parse(users), { validateBeforeSave: false });
  await reviewModel.create(JSON.parse(review));
  console.log("successfully add all data in tour and review and users");
}
async function removeAllData() {
  await tourModels.deleteMany({});
  await userModels.deleteMany({});
  await reviewModel.deleteMany({});
  console.log("successfully delete all data in tour and review and users");
}

// removeAllData();
// addAllData();
