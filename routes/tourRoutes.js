const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
} = require("../controllers/tourControllers");
const reviewRouter = require("../routes/reviewRoutes");
const express = require("express");

const router = express.Router();

router.use("/:tourId/review", reviewRouter);
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
