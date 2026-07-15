const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
      trim: true,
    },
    email: {
      type: String,
      Required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      Required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
