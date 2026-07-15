"use client";

import { useState, useEffect } from "react";
import api from "../../../lib/api";
import { useParams } from "next/navigation";

function BlogDetails() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto pt-10">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-[450px] object-cover rounded-3xl shadow-lg"
        />
      </div>
      <article className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 -mt-20 relative">
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          {blog.category}
        </span>

        <h1 className="text-5xl font-extrabold mt-5 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between mt-8 border-b pb-6">
          <div className="flex items-center gap-4">
            <img
              src={
                blog.author?.avatar ||
                `https://ui-avatars.com/api/?name=${blog.author?.name}`
              }
              className="w-14 h-14 rounded-full"
            />

            <div>
              <p className="font-bold">{blog.author?.name}</p>
              <p className="text-gray-500 text-sm">
                {new Date(blog.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-6 text-lg">
            <span>❤️ {blog.likes.length}</span>

            <span>💬 {blog.comments?.length || 0}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mt-10 leading-9 text-gray-700 whitespace-pre-line">
          {blog.content}
        </div>

        <div className="flex flex-wrap gap-3 mt-12">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 px-4 py-2 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}

export default BlogDetails;
