"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../lib/api";

function profilePage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUserData(res.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const EditProfile = async (id) => {
    try {
      await api.put("/auth/profile");
      fetchProfile();
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!userData) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-lg p-10">
        <div className="flex items-center gap-8">
          <img
            src={
              userData.avatar ||
              "https://ui-avatars.com/api/?name=" + userData.name
            }
            alt={userData.name}
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <h1 className="text-4xl font-bold">{userData.name}</h1>
            <p className="text-gray-500 mt-2">{userData.email}</p>
            <p className="mt-6 text-gray-700">
              {userData.bio || "No bio added yet."}
            </p>
          </div>
          <div>
            <Link
              href="/blogs/edit/profile"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg ml-30"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profilePage;
