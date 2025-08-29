const path = require("path");
const toursRouter = require("./routes/tourRoutes");
const usersRouter = require("./routes/userRoutes");
const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const app = express();
if (process.env.NODE_DEV === "development") {
  app.use(morgan("tiny"));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/tours", toursRouter);

app.use("/api/v1/users", usersRouter);

app.use((req, res, next) => {
  next(new AppError(`cant' find ${req.originalUrl} on this server!`, 400));
});

module.exports = app;
