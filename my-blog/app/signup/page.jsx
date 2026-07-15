"use client";
import { useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", formData);
      alert(res.data.message);
      router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };
  return (
    <div className="min-h-screen m-auto flex justify-center items-center bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Create account</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
