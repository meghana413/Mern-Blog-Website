const express = require("express");
const upload = require("../middlewares/multer");

const {
  signup,
  login,
  handleGetProfile,
  handleUpdateProfile,
} = require("../controllers/authcontroller");
const { authmiddleware } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authmiddleware, handleGetProfile);
router.put(
  "/profile",
  authmiddleware,
  upload.single("avatar"),
  handleUpdateProfile,
);
module.exports = router;
