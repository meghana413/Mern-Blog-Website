"use client";
import { useState, useEffect } from "react";
import api from "../../lib/api";
import Link from "next/link";

function Dashboard() {
  const [myBlogs, setMyBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs/myblogs");
      console.log(res.data.blogs[0].tags);
      setMyBlogs(res.data.blogs);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteBlog = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/blogs/${id}`);
      alert("Blog Deleted");
      fetchBlogs();
    } catch (error) {
      alert(error.message || "Delete Failed");
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage all your published blogs.</p>
        </div>
        <Link
          href="/blogs/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Blog
        </Link>
      </div>
      {myBlogs.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold">No blogs found</h2>
          <p className="text-gray-500 mt-2">Start writing your first blog!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                {/* Blog Info */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{blog.title}</h2>
                  <p className="text-blue-600 font-medium mt-2">
                    {blog.category}
                  </p>
                  <p className="text-gray-600 mt-3 break-words">
                    {blog.content.length > 180
                      ? blog.content.slice(0, 180) + "..."
                      : blog.content}
                  </p>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Published on {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3 ml-8">
                  <Link
                    href={`blogs/edit/${blog._id}`}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Dashboard;
