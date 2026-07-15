"use client";
import { useState } from "react";
import api from "../../../lib/api";

function CreateBlog() {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    coverImage: "",
    tags: "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setBlogData({
      ...blogData,
      [name]: files ? files[0] : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("category", blogData.category);
      formData.append(
        "tags",
        JSON.stringify(blogData.tags.split(",").map((tag) => tag.trim())),
      );

      formData.append("coverImage", blogData.coverImage);

      await api.post("/blogs", formData);

      alert("Blog Created Successfully!");

      setBlogData({
        title: "",
        content: "",
        category: "",
        coverImage: "",
        tags: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create blog");
    }
  };
  return (
    <div className=" max-w-7xl mx-auto mt-5">
      <h1 className="text-5xl text-blue-600 font-bold">Create Your Blog ✍️</h1>
      <form onSubmit={handleSubmit} className="flex gap-10">
        <div className="flex-1 space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={blogData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="content"
            placeholder="Write your blog..."
            rows="14"
            value={blogData.content}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 resize-none"
            required
          />

          <select
            name="category"
            value={blogData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="AI & ML">AI & ML</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Education">Education</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
          </select>

          <input
            type="text"
            name="tags"
            placeholder="HTML, CSS, React..."
            value={blogData.tags}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="w-80">
          <div className="border rounded-xl p-5 shadow">
            <h2 className="font-semibold text-xl mb-4">Cover Image</h2>

            {blogData.coverImage ? (
              <img
                src={URL.createObjectURL(blogData.coverImage)}
                alt="Preview"
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-56 rounded-lg border-2 border-dashed flex items-center justify-center text-gray-500 mb-4">
                No Image Selected
              </div>
            )}
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-center block">
              Choose Cover Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setBlogData({
                    ...blogData,
                    coverImage: e.target.files[0],
                  })
                }
              />
            </label>
          </div>
          <button className="bg-blue-600  mt-10 ml-25 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
