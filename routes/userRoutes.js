const express = require("express");
const {
  signup,
  login,
  updatePassword,
  protected,
  restrictTo,
} = require("../controllers/authControllers");
const {
  updateMe,
  deleteMe,
  getUser,
  getMe,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(protected);
router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", updateMe);
router.delete("/deleteMe", deleteMe);

router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
