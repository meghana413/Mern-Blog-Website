const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      Required: true,
      trim: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      Required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      Required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Comment", commentSchema);
