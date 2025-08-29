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
exports.getAllReviews = createOne(Review);
exports.createReview = getAll(Review);
exports.getReview = getOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
