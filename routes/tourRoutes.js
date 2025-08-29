const express = require("express");
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers");
const { getOne } = require("../controllers/handlerFactory");

const router = express.Router();

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getOne).patch(updateTour).delete(deleteTour);

module.exports = router;
