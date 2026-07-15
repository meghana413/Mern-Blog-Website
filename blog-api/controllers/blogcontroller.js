const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// const handlecreateBlog = async (req, res) => {
//   try {
//     const { title, content, category } = req.body;

//     const tags = JSON.parse(req.body.tags);

//     let imageUrl = "";

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "blog-images",
//       });

//       imageUrl = result.secure_url;

//       fs.unlinkSync(req.file.path);
//     }

//     const blog = await Blog.create({
//       title,
//       content,
//       category,
//       tags,
//       coverImage: imageUrl,
//       author: req.user.id,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Blog created successfully",
//       blog,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const handlecreateBlog = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    return res.json({
      body: req.body,
      file: req.file,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
const handlegetAllBlogs = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 5 } = req.query;
    const queryparams = {};
    if (search) {
      queryparams.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    if (category) {
      queryparams.category = category;
    }
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const blogs = await Blog.find(queryparams)
      .populate("author", "name email")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);
    const userId = req.user?.id;

    const updatedBlogs = blogs.map((blog) => {
      const liked = userId
        ? blog.likes.some((like) => like.toString() === userId)
        : false;
      return {
        ...blog.toObject(),
        liked,
      };
    });
    const totalBlogs = await Blog.countDocuments(queryparams);
    const totalPages = Math.ceil(totalBlogs / limitNumber);

    res.status(200).json({
      success: true,
      blogCount: totalBlogs,
      blogs: updatedBlogs,
      pageCount: totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

const handleGetBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id)
      .populate("author", "name email")
      .populate("comments.user", "name");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const userId = req.user?.id;

    const liked = userId
      ? blog.likes.some((like) => like.toString() === userId)
      : false;
    return res.status(200).json({
      success: true,
      blog,
      liked,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleUpdateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: true,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runvalidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleDeleteBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    await Blog.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleLikeBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const userId = req.user.id;
    const userAlreadyLiked = blog.likes.some(
      (like) => like.toString() === userId,
    );
    if (userAlreadyLiked) {
      blog.likes = blog.likes.filter((like) => like.toString() !== userId);
      await blog.save();
      return res.status(200).json({
        success: true,
        message: "Blog unliked",
        totalLikes: blog.likes.length,
        userAlreadyLiked: false,
      });
    }

    blog.likes.push(userId);
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog liked",
      totalLikes: blog.likes.length,
      userAlreadyLiked: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleGetMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user.id,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handlecreateBlog,
  handlegetAllBlogs,
  handleGetBlogById,
  handleUpdateBlog,
  handleDeleteBlogById,
  handleLikeBlog,
  handleGetMyBlogs,
};
