const { json } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cloudinary = require("cloudinary");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "user created successfully",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password or Signup first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const handleGetProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleUpdateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const id = req.user.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let imageUrl = user.avatar; // keep old avatar

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile-images",
      });

      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }
    user.name = name;
    user.bio = bio;
    user.avatar = imageUrl;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  signup,
  login,
  handleGetProfile,
  handleUpdateProfile,
};
