"use client";

import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-white">BlogHub</h2>

            <p className="mt-4 text-gray-400 leading-7">
              Write. Share. Inspire.
              <br />A platform where developers and creators share knowledge,
              stories, and experiences.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link href="/" className="block hover:text-blue-400">
                Home
              </Link>

              <Link href="/blogs/create" className="block hover:text-blue-400">
                Create Blog
              </Link>

              <Link href="/myblogs" className="block hover:text-blue-400">
                My Blogs
              </Link>

              <Link href="/profile" className="block hover:text-blue-400">
                Profile
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Built With
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-700 px-3 py-1 rounded-full">
                Next.js
              </span>
              <span className="bg-green-700 px-3 py-1 rounded-full">
                Node.js
              </span>
              <span className="bg-purple-700 px-3 py-1 rounded-full">
                MongoDB
              </span>
              <span className="bg-red-700 px-3 py-1 rounded-full">
                Cloudinary
              </span>
            </div>
          </div>
        </div>
        <hr className="border-gray-700 my-8" />
        <div className="text-center text-gray-500">
          © {new Date().getFullYear()} BlogSphere • Built with ❤️ using Next.js,
          Express & MongoDB
        </div>
      </div>
    </footer>
  );
}
export default Footer;
