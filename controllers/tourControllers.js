const {
  getAll,
  createOne,
  getOne,
  deleteOne,
  updateOne,
} = require("./handlerFactory");
const Tour = require("../models/tourModels");
exports.getAllTours = getAll(Tour);

exports.createTour = createOne(Tour);

exports.getTour = getOne(Tour, { path: "reviews" });

exports.deleteTour = deleteOne(Tour);

exports.updateTour = updateOne(Tour);
