const express = require("express");
const router = express.Router();

const {
  handlecreateBlog,
  handlegetAllBlogs,
  handleGetBlogById,
  handleUpdateBlog,
  handleDeleteBlogById,
  handleLikeBlog,
  handleGetMyBlogs,
} = require("../controllers/blogController");
const {
  authmiddleware,
  optionalAuth,
} = require("../middlewares/authmiddleware");

const upload = require("../middlewares/multer");

router
  .post("/", authmiddleware, upload.single("coverImage"), handlecreateBlog)
  .post("/:id/like", authmiddleware, handleLikeBlog);
router
  .get("/", optionalAuth, handlegetAllBlogs)
  .get("/myblogs", authmiddleware, handleGetMyBlogs)
  .get("/:id", optionalAuth, handleGetBlogById);
router.put("/:id", authmiddleware, handleUpdateBlog);
router.delete("/:id", authmiddleware, handleDeleteBlogById);
module.exports = router;
