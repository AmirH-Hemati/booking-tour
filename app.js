const path = require("path");
const toursRouter = require("./routes/tourRoutes");
// const usersRouter = require("./routes/userRoutes");
const globalErrorController = require("./controllers/errorController");
const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/tours", toursRouter);

// app.use("/api/v1/users", usersRouter);

app.use((req, res, next) => {
  next(new AppError(`cant' find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorController);
module.exports = app;
