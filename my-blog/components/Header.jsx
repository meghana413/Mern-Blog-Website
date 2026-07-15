"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div>
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
        <Link href="/" className="tect-2xl font-bold">
          BlogHub
        </Link>
        <div className="flex gap-6">
          <Link href="/">Home</Link>
          {isLoggedIn ? (
            <>
              <Link href="/blogs/create">Create Blog</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/profile">Profile</Link>
              <button onClick={handleLogout} className="text-white-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
