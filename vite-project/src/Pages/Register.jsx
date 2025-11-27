import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // ✅ Google Register Handler
    const handleGoogleRegister = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const decoded = jwtDecode(token);

            console.log("Google Register User:", decoded);

            // Backend call
            const res = await fetch("https://notes-app-1-3rxs.onrender.com/api/auth/google-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify({ token }), // backend ko token bhej rahe hain
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("Google Registration Successful!");
                navigate("/"); // register ke baad homepage ya dashboard
            } else {
                toast.error(result.message || "Google Registration Failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in Google Register!");
        }
    };

    // ✅ Input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // ✅ Normal Register
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch('https://notes-app-1-3rxs.onrender.com/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("Registration successful!");
                navigate("/login");
            } else {
                toast.error(result.message || "Registration failed.");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.error(err);
        }
    };

    const validValue =
        data.name && data.email && data.password &&
        data.confirmPassword && data.password === data.confirmPassword;

    return (
        <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
            <div className="text-gray-900 w-full max-w-lg mx-auto rounded-xl p-8 bg-gray-900 border border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-yellow-400 mb-2 text-center">Welcome to NoteShala</h2>
                <p className="text-gray-300 text-center mb-6">Create your account</p>

                <form className="grid gap-5" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="grid gap-1">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">Name :</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoFocus
                            className="bg-gray-800 text-gray-100 p-3 border border-gray-600 rounded-lg outline-none focus:border-yellow-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="grid gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="bg-gray-800 text-gray-100 p-3 border border-gray-600 rounded-lg outline-none focus:border-yellow-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="grid gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300">Password :</label>
                        <div className="bg-gray-800 p-3 border border-gray-600 rounded-lg flex items-center focus-within:border-yellow-400">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full bg-transparent text-gray-100 outline-none"
                            />
                            <div onClick={() => setShowPassword((prev) => !prev)} className="cursor-pointer text-gray-400 hover:text-yellow-400">
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="grid gap-1">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password :</label>
                        <div className="bg-gray-800 p-3 border border-gray-600 rounded-lg flex items-center focus-within:border-yellow-400">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter your confirm password"
                                className="w-full bg-transparent text-gray-100 outline-none"
                            />
                            <div onClick={() => setShowConfirmPassword((prev) => !prev)} className="cursor-pointer text-gray-400 hover:text-yellow-400">
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    {/* Google Register */}
                    <div className="mt-4 flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleRegister}
                            onError={() => console.log("Google Register Failed")}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={!validValue}
                        className={`${validValue ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-500 cursor-not-allowed"} text-black font-semibold py-2 rounded-lg transition duration-300`}
                    >
                        Register
                    </button>
                </form>

                <p className="text-gray-300 text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-yellow-400 hover:text-yellow-500">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
