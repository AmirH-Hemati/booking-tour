const express = require("express");
const {
  getOverView,
  getTour,
  getLoginForm,
} = require("../controllers/viewControllers");
const { protected } = require("../controllers/authControllers");
const router = express.Router();

router.get("/", getOverView);
router.get("/tour/:slug", protected, getTour);
router.get("/login", getLoginForm);
module.exports = router;
