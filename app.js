const path = require("path");
const toursRouter = require("./routes/tourRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const viewRouter = require("./routes/viewRoutes");
const usersRouter = require("./routes/userRoutes");
const globalErrorController = require("./controllers/errorController");
const AppError = require("./utils/appError");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.cookies);

  next();
});
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewRouter);
app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use("/api/v1/users", usersRouter);

app.use((req, res, next) => {
  next(new AppError(`cant' find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorController);
module.exports = app;
