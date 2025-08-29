const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/userModels");
const AppError = require("../utils/appError");
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jsonwebtoken.sign(
    { id: user.id },
    process.env.JWT_SECRET_CODE,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  res.status(201).json({
    status: "success",
    token,
    data: user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please Provide your email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password!", 401));
  }
  const token = jsonwebtoken.sign(
    { id: user.id },
    process.env.JWT_SECRET_CODE,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  res.status(201).json({
    status: "success",
    token,
    data: user,
  });
});

exports.protected = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not login , please login your account!", 400)
    );
  }

  const decode = await promisify(jsonwebtoken.verify)(
    token,
    process.env.JWT_SECRET_CODE
  );

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return new AppError("You do not have permission to this route", 403);
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  const token = jsonwebtoken.sign(
    { id: user.id },
    process.env.JWT_SECRET_CODE,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  res.status(201).json({
    status: "success",
    token,
    data: user,
  });
});
