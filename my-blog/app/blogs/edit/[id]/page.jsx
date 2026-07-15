"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

function EditBlog() {
  const { id } = useParams();
  const router = useRouter();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    coverImage: "",
    tags: "",
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);

      const blog = res.data.blog;

      setBlogData({
        title: blog.title,
        content: blog.content,
        category: blog.category,
        coverImage: blog.coverImage || "",
        tags: blog.tags ? blog.tags.join(", ") : "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load blog");
    }
  };

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/blogs/${id}`, {
        ...blogData,
        tags: blogData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      });

      alert("Blog Updated Successfully!");

      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          rows="10"
          value={blogData.content}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
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
          placeholder="react, node, mongodb"
          value={blogData.tags}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          value={blogData.coverImage}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
