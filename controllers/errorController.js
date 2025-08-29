const AppError = require("../utils/appError");

function sendErrorDev(err, res) {
  return res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    stack: err.stack,
    error: err,
  });
}

function sendErrorPro(error, res) {
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      satatus: error.status,
      message: error.message,
    });
  }
  console.log("⛔⛔⛔ INTERNAL ERROR ⛔⛔⛔");
  console.log(error);
  return res.status(500).json({
    status: "error",
    message: "Something is very wrong!",
  });
}
function handelCastErrorDB(error) {
  const message = `Invalid ${error.path} : ${error.value}`;
  return new AppError(message, 400);
}
function handelDublicateErrorDB(error) {
  const message = `Name is duplicate , Please choose another name`;

  return new AppError(message, 400);
}
function handelValidationErrorDB(error) {
  //   const errors = Object.values(error).map((error) => error.message);
  const message = `Invalid input data . ${error.message}`;
  return new AppError(message, 400);
}
module.exports = (err, req, res, next) => {
  console.log(process.env.NODE_ENV);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);
    if (error.name === "CastError") error = handelCastErrorDB(error);
    if (error.name === "ValidationError")
      error = handelValidationErrorDB(error);
    if (error.code === 11000) error = handelDublicateErrorDB(error);

    sendErrorPro(error, res);
  }
};
