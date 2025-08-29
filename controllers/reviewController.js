const {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");
const Review = require("../models/reviewModel");

exports.sendTourUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getAllReviews = getAll(Review);
exports.createReview = createOne(Review);
exports.getReview = getOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
