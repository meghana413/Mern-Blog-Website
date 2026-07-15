"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Blogcard from "@/components/Blogcard";
import CommentSidebar from "@/components/CommentSidebar";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openComments, setOpenComments] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs", {
        params: {
          search,
          category,
          page,
          limit: 5,
        },
      });

      setBlogs(res.data.blogs);
      setPageCount(res.data.pageCount);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, category, page]);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  return (
    <main>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-3">Discover Amazing Stories</h1>

          <p className="text-xl text-blue-100 max-w-2xl">
            Read blogs from developers, creators and writers around the world.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex gap-4 flex-col md:flex-row">
          <input
            type="text"
            placeholder="🔍 Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-4 md:w-64"
          >
            <option value="">All Categories</option>
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
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>

        <div className="space-y-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Blogcard
                key={blog._id}
                blog={blog}
                onComment={() => {
                  setSelectedBlog(blog);
                  setOpenComments(true);
                }}
              />
            ))
          ) : (
            <h2 className="text-center text-gray-500 text-xl">
              No blogs found.
            </h2>
          )}
        </div>

        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-10 h-10 rounded-full ${
                page === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={page === pageCount}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-lg ${
              page === pageCount
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </section>

      <CommentSidebar
        open={openComments}
        blog={selectedBlog}
        onClose={() => setOpenComments(false)}
      />
    </main>
  );
}

export default Home;
