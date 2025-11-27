import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Google login handler
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await fetch("https://notes-app-1-3rxs.onrender.com/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }), // 👈 yaha sirf token bhejna hai
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem("token", result.token); // 👈 backend me humne "token" bheja hai
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("isLoggedIn", "true");

        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(result.message || "Google login failed");
        navigate("/register");
      }
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch('https://notes-app-1-3rxs.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("isLoggedIn", "true");

        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
   <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
    <div className="w-full max-w-md bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-8">
      
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
        Welcome to <span className="text-yellow-400">NoteShala</span>
      </h2>
      <p className="text-gray-400 text-center mt-2 text-sm sm:text-base">
        Please login to continue
      </p>

      {/* Normal Login Form */}
      <form className="grid gap-5 mt-8" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-gray-300">Email :</label>
          <input type="email" id="email" name="email" placeholder="Enter your email"
            className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-yellow-400"
            value={data.email} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="password" className="text-gray-300">Password :</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"
            className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-yellow-400"
            value={data.password} onChange={handleChange} />
        </div>

        <button
          className={`bg-yellow-500 hover:bg-yellow-400 text-white py-3 rounded-lg font-semibold transition`}
          disabled={!data.email || !data.password}
          type="submit"
        >
          Login
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center justify-center my-4">
        <div className="h-px w-full bg-gray-700"></div>
        <span className="px-4 text-gray-400 text-sm">OR</span>
        <div className="h-px w-full bg-gray-700"></div>
      </div>

      {/* Google Login Button */}
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Google login failed")}
        />
      </div>

      <p className="text-gray-400 text-center mt-6">
        Don’t have an account?{" "}
        <a href="/register" className="font-semibold text-yellow-400 hover:text-yellow-300">
          Register
        </a>
      </p>
    </div>
   </section>
  );
}

export default Login;
