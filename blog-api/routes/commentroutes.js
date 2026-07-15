const express = require("express");
const router = express.Router();

const {
  handleAddComment,
  handleGetComments,
  handleDeleteComment,
  handleEditComment,
} = require("../controllers/commentcontroller");
const { authmiddleware } = require("../middlewares/authmiddleware");

router.post("/:id/comment", authmiddleware, handleAddComment);
router.put("/:id/comment/:commentId", authmiddleware, handleEditComment);
router.get("/:id", handleGetComments);
router.delete("/:id/comment/:commentId", authmiddleware, handleDeleteComment);

module.exports = router;
