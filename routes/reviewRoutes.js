const express = require("express");
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  getReview,
  sendTourUserId,
} = require("../controllers/reviewController");
const { protected } = require("../controllers/authControllers");
const router = express.Router();

router.use(protected);
router.route("/").get(getAllReviews).post(sendTourUserId, createReview);
router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);
module.exports = router;
