const {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");
const Review = require("../models/reviewModel");

exports.getAllReviews = createOne(Review);
exports.createReview = getAll(Review);
exports.getReview = getOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
