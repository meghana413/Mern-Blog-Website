"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!!");
      router.push("/");
    } catch (error) {
      alert(error.message || "Login Failed");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Login Here!!</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={loginData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
