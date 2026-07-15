const Blog = require("../models/Blog");
const Comment = require("../models/comment");

const handleAddComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const newComment = {
      user: req.user.id,
      comment: req.body.comment,
    };

    blog.comments.push(newComment);

    await blog.save();

    await blog.populate("comments.user", "name");

    return res.status(200).json({
      success: true,
      comments: blog.comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleGetComments = async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await Comment.find({ blog: id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleEditComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const comment = blog.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    comment.comment = req.body.comment;

    await blog.save();

    await blog.populate("comments.user", "name avatar");

    return res.status(200).json({
      success: true,
      comments: blog.comments,
      message: "Comment updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleDeleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const comment = blog.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    comment.deleteOne();

    await blog.save();

    await blog.populate("comments.user", "name avatar");

    return res.status(200).json({
      success: true,
      comments: blog.comments,
      message: "Comment deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  handleAddComment,
  handleGetComments,
  handleDeleteComment,
  handleEditComment,
};
