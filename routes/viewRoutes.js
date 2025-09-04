const express = require("express");
const {
  getOverView,
  getTour,
  getLoginForm,
} = require("../controllers/viewControllers");
const router = express.Router();

router.get("/", getOverView);
router.get("/tour/:slug", getTour);
router.get("/login", getLoginForm);
module.exports = router;
