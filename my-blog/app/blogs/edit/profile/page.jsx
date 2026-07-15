"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function EditProfile() {
  const router = useRouter();

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: null,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");

      setFormData({
        name: res.data.user.name,
        bio: res.data.user.bio || "",
        avatar: null,
      });

      setPreview(
        res.data.user.avatar ||
          `https://ui-avatars.com/api/?name=${res.data.user.name}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("bio", formData.bio);

      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }
      await api.put("/auth/profile", data);
      alert("Profile Updated Successfully!");
      router.push("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-14">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-center mb-10">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center">
            <img
              src={
                preview ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || "User")}`
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />

            <label className="mt-5 cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
              Choose New Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="font-semibold mb-2 block">Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold mb-2 block">Bio</label>

            <textarea
              rows={6}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Tell everyone something about yourself..."
            />
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl text-lg font-semibold hover:scale-[1.02] transition">
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
