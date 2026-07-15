"use client";

import { useState } from "react";
import api from "../lib/api";
import Link from "next/link";

function BlogCard({ blog, onComment }) {
  const [liked, setLiked] = useState(blog.liked);
  const [likes, setLikes] = useState(blog.likes?.length || 0);
  const handleLike = async () => {
    try {
      const res = await api.post(`/blogs/${blog._id}/like`);

      setLiked(res.data.userAlreadyLiked);
      console.log(res.data.userAlreadyLiked);
      setLikes(res.data.totalLikes);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to like blog");
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
    }
  };

  return (
    <div className="flex gap-6 max-w-7xl mx-auto p-6 mb-6 border rounded-2xl shadow hover:-translate-y-2 transition-all duration-300">
      <img
        src={blog.coverImage || "https://placehold.co/180x180"}
        alt={blog.title}
        className="w-40 h-40 rounded-lg object-cover flex-shrink-0"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">{blog.title}</h2>

              <p className="text-gray-500 mt-1">By {blog.author?.name}</p>
            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
              {blog.category}
            </span>
          </div>

          <p className="mt-4 text-gray-600 break-words">
            {blog.content.length > 150
              ? blog.content.substring(0, 150) + "..."
              : blog.content}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div>
            <button onClick={handleLike} className="text-xl">
              {liked ? `❤️${likes}` : `🤍${likes}`}
            </button>
            <button
              onClick={onComment}
              className="text-xl hover:text-blue-600 transition"
            >
              💬 {blog.comments?.length || 0}
            </button>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Link
            href={`/blogs/${blog._id}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
