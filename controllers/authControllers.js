const catchAsync = require("../utils/catchAsync");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/userModels");
const AppError = require("../utils/appError");
exports.signup = catchAsync(async (req, res, next) => {
  const user = User.create({
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
  const user = await User.findOnde({ email }).select("+password");
  if (!user || (await user.correctPassword(password, user.password))) {
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
exports.login = catchAsync(async (req, res, next) => {});
