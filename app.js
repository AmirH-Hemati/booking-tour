const path = require("path");
const toursRouter = require("./routes/tourRoutes");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/tours", toursRouter);
module.exports = app;
