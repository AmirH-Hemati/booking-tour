const path = require("path");
const toursRouter = require("./routes/tourRoutes");
const express = require("express");
const morgan = require("morgan");
const app = express();
if (process.env.NODE_DEV === "development") {
  app.use(morgan("tiny"));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/tours", toursRouter);
module.exports = app;
